#!/usr/bin/env node
// usage: node save.mjs <scrape の raw 出力ファイル> <出力ディレクトリ>
// scrape.js の結果を sponsors.json とロゴファイルに分けて書き出し、未登録項目を一覧表示する。
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

// fortee のプラン名 → src/data/2027/sponsorPlans.ts の id
const PLAN_IDS = {
  氷見ブリ: 'himi-buri',
  売切氷見ブリ: 'himi-buri',
  ブリ: 'buri',
  ガンド: 'gando',
  フクラギ: 'fukuragi',
  コヅクラ: 'kozukura',
};

const EXT_BY_TYPE = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/svg+xml': '.svg',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

// --raw の出力は JSON 文字列リテラルで返ることがあるので、文字列の間はパースし続ける
export const parseRaw = raw => {
  let v = raw.trim();
  while (typeof v === 'string') v = JSON.parse(v);
  return v;
};

export const logoExt = logo =>
  extname(logo.filename || '').toLowerCase() || EXT_BY_TYPE[(logo.contentType || '').split(';')[0]] || '.bin';

export const toRecord = s => ({
  forteeId: s.forteeId,
  name: s.name,
  kana: s.kana,
  appliedAt: s.appliedAt ?? null,
  url: s.url,
  plans: s.plans,
  planIds: s.plans.map(p => PLAN_IDS[p] ?? null),
  sns: s.sns,
  x: s.sns.find(x => x.type === 'twitter')?.handle.replace(/^@/, '') ?? null,
  pr: s.pr,
  logos: s.logos.map((l, i) => ({
    file: l.ok ? `logos/${s.forteeId}${s.logos.length > 1 ? `-${i + 1}` : ''}${logoExt(l)}` : null,
    originalFilename: l.filename,
    contentType: l.contentType,
  })),
});

export const missingFields = r =>
  [
    !r.url && 'URL',
    r.plans.length === 0 && 'プラン',
    r.planIds.includes(null) && 'プラン対応表に無いプラン',
    !r.x && 'SNS',
    !r.pr && '概要文',
    r.logos.length === 0 && 'ロゴ',
    r.logos.some(l => !l.file) && 'ロゴ取得失敗',
  ].filter(Boolean);

const main = () => {
  const [, , input, outDir] = process.argv;
  if (!input || !outDir) {
    console.error('usage: node save.mjs <raw.json> <outDir>');
    process.exit(1);
  }
  const data = parseRaw(readFileSync(input, 'utf8'));
  mkdirSync(join(outDir, 'logos'), { recursive: true });

  const records = data.sponsors.map(toRecord);
  data.sponsors.forEach((s, i) =>
    s.logos.forEach((l, j) => {
      const file = records[i].logos[j].file;
      if (file) writeFileSync(join(outDir, file), Buffer.from(l.base64, 'base64'));
    }),
  );
  writeFileSync(
    join(outDir, 'sponsors.json'),
    JSON.stringify({ event: data.event, fetchedAt: data.fetchedAt, sponsors: records }, null, 2) + '\n',
  );

  console.log(`${records.length} 件を ${outDir} に保存しました`);
  for (const r of records) {
    const miss = missingFields(r);
    console.log(`- ${r.name} [${r.plans.join(',')}]${miss.length ? ` 未登録: ${miss.join(' / ')}` : ''}`);
  }
};

main();
