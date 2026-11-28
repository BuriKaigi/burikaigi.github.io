// playwright-cli run-code --filename=... で実行する。
// 事前に fortee のスポンサー一覧（/<event>/organizer/sponsor）を開いた状態で実行すること。
// イベントのパスは現在の URL から取るので、年が変わってもこのファイルは変更不要。
// 読み取り専用：edit ページやフォーム送信には触れない。
// 戻り値は JSON 文字列（ロゴは base64 で埋め込む）。ファイルへの書き出しは save.mjs が担う。
async page => {
  const m = page.url().match(/^(https:\/\/fortee\.jp\/[^/]+)\/organizer\/sponsor/);
  if (!m) throw new Error(`スポンサー一覧ページを開いてから実行してください（現在: ${page.url()}）`);
  const base = m[1];
  const origin = 'https://fortee.jp';

  await page.goto(`${base}/organizer/sponsor`);
  if (page.url().includes('/login')) throw new Error('未ログインです。ブラウザで fortee にログインしてください');

  const ids = await page.evaluate(() => [
    ...new Set(
      [...document.querySelectorAll('a[href*="/organizer/sponsor/view/"]')].map(a =>
        a.getAttribute('href').split('/').pop(),
      ),
    ),
  ]);

  const sponsors = [];
  for (const id of ids) {
    await page.goto(`${base}/organizer/sponsor/view/${id}`);
    const info = await page.evaluate(() => {
      const text = el => (el ? el.textContent.trim() : null);
      const card = document.querySelector('.basic-info')?.closest('.row');
      const name = text(card?.querySelector('.service-name .fs-4'));
      const kana = text(card?.querySelector('.service-name .text-muted'));
      const urlA = card?.querySelector('.basic-info .url a');
      // SNS: .basic-info 内の .url 以外の行（現状 fortee の入力欄は Twitter のみ）
      const sns = [...(card?.querySelectorAll('.basic-info > div:not(.url)') ?? [])]
        .map(row => {
          const a = row.querySelector('a');
          return a ? { type: row.className.split(' ')[0], handle: a.textContent.trim(), url: a.href } : null;
        })
        .filter(Boolean);
      const prIcon = card?.querySelector('.fa-bullhorn');
      const pr = prIcon ? text(prIcon.closest('.d-flex')?.querySelector('.text-wrap')) : null;
      const planKey = [...document.querySelectorAll('.key')].find(k => k.textContent.trim() === 'スポンサープラン');
      const plans = [...(planKey?.parentElement.querySelectorAll('.value [data-plan-uuid]') ?? [])].map(b =>
        b.textContent.trim(),
      );
      // 申込日時「2026/09/28 13:43」（JST）を ISO 8601 にする
      const appliedKey = [...document.querySelectorAll('.key')].find(k => k.textContent.trim() === '申込日時');
      // 時は 1 桁のこともある（例: 2026/09/25 8:30）
      const am = appliedKey?.nextElementSibling?.textContent
        .trim()
        .match(/^(\d{4})\/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{2})$/);
      const p2 = v => v.padStart(2, '0');
      const appliedAt = am ? `${am[1]}-${p2(am[2])}-${p2(am[3])}T${p2(am[4])}:${am[5]}:00+09:00` : null;
      return { name, kana, url: urlA ? urlA.href : null, sns, pr: pr || null, plans, appliedAt };
    });

    await page.goto(`${base}/organizer/sponsor/files/${id}`);
    const logoLinks = await page.evaluate(() => {
      const card = [...document.querySelectorAll('.card.file-list')].find(
        c => c.querySelector('.card-title')?.textContent.trim() === '掲載ロゴ',
      );
      return [...(card?.querySelectorAll('.entity[data-deleted="false"] h4 a') ?? [])].map(a => ({
        filename: a.getAttribute('title') || a.textContent.trim(),
        href: a.getAttribute('href'),
      }));
    });

    const logos = [];
    for (const l of logoLinks) {
      const res = await page.request.get(origin + l.href);
      logos.push({
        filename: l.filename,
        contentType: res.headers()['content-type'] ?? null,
        ok: res.ok(),
        base64: res.ok() ? (await res.body()).toString('base64') : null,
      });
    }

    sponsors.push({ forteeId: id, ...info, logos });
  }

  await page.goto(`${base}/organizer/sponsor`);
  return JSON.stringify({ event: base, fetchedAt: new Date().toISOString(), sponsors });
}
