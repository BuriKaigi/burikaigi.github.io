---
name: fetch-fortee-sponsors
description: fortee のオーガナイザ画面から BuriKaigi のスポンサー情報（名前 / URL / プラン / SNS / 概要文(PR) / 申込日時 / 掲載ロゴ）を一括取得し、JSON とロゴファイルに保存する。「スポンサー情報を取得して」「fortee からスポンサーを更新」「スポンサーのロゴを落として」「スポンサー情報をリフレッシュ」などと言われたら使う。
---

# fortee スポンサー情報の取得

fortee のオーガナイザ画面（要ログイン）から全スポンサーの情報を読み取り、ローカルに保存する。
**読み取り専用**。edit ページを開いたり、フォームを送信したりしない。

## 前提

- `playwright-cli` が使えること。無ければ `npm install -g @playwright/cli@latest` で入れる（https://github.com/microsoft/playwright-cli）
- Google Chrome が入っていること（`--browser=chrome` で使う）
- 実行する人が、そのイベントの fortee オーガナイザ権限を持っていること
- 以下の `<年>` は開催年（例: BuriKaigi 2027 なら 2027）。fortee のイベントパスは `burikaigi-<年>`

## 取得元と項目

| 項目 | 取得元 |
| --- | --- |
| 名前 / よみがな / URL / SNS / 概要文 | 詳細ページ `/<event>/organizer/sponsor/view/<id>` の上部カード |
| スポンサープラン / 申込日時 | 同ページの「スポンサープラン」「申込日時」 |
| ロゴ | ファイルページ `/<event>/organizer/sponsor/files/<id>` の「掲載ロゴ」カード（全ファイル） |

- 概要文は fortee の「PR」欄に当たる。
- SNS は fortee の入力欄が「公式Twitterアカウント」だけなので、実質 X のハンドルのみ（scrape.js も Twitter / X の行だけを拾う）。
- 窓口担当者・請求先などの個人情報は取得しない。

## 手順

`open` はリポジトリの外の一時ディレクトリで実行する（Claude Code ならセッションの scratchpad）。playwright-cli は、`open` を実行したディレクトリに `.playwright-cli/`（スナップショットとログ）を作り、そのセッションの間はそこに書き続ける。

1. ブラウザを開く。永続プロファイルなので、2 回目以降はログイン済みのことが多い。
   ```bash
   EVENT=burikaigi-<年>
   playwright-cli -s=fortee open https://fortee.jp/$EVENT/organizer/sponsor --headed --persistent --browser=chrome
   ```
   すでに開いている場合は `playwright-cli -s=fortee goto https://fortee.jp/$EVENT/organizer/sponsor`。
2. 出力の `Page URL` が `/login` ならユーザーにログインしてもらい、完了の連絡を待つ。ログイン操作は代行しない。
3. スクレイプを実行する。イベントのパスは現在の URL から取るので、1 で開いたページのまま実行する。
   ```bash
   SK=<repo>/.claude/skills/fetch-fortee-sponsors
   playwright-cli -s=fortee --raw run-code --filename=$SK/scrape.js > <一時ディレクトリ>/raw.json
   ```
   ロゴを base64 で埋め込むため、raw.json は数十 MB になることがある。
4. 保存する。出力先はリポジトリの外の日付付きディレクトリにする（ロゴの元ファイルは数十 MB になることがあるので、リポジトリに置かない）。
   ```bash
   node $SK/save.mjs <一時ディレクトリ>/raw.json <作業ディレクトリ>/<YYYY-MM-DD>-fortee-sponsors
   ```
   これで `sponsors.json` と `logos/<forteeId>[-n].<ext>` が作られ、未登録項目の一覧が標準出力に出る。
5. ユーザーに報告する。
   - 件数と、スポンサーごとの未登録項目（URL / SNS / 概要文 / ロゴ）
   - 概要文が仮の文言になっているもの（例:「後日入力します」のような文言）。save.mjs は検出しないので、sponsors.json を目で確認して挙げる
   - ロゴが複数あるもの、Web で使えない形式（.ai / .eps など）しかないもの
   - 前回の取得結果があれば、差分（追加・削除・変更）

## sponsors.json の形式

```jsonc
{
  "event": "https://fortee.jp/<event>",
  "fetchedAt": "...",
  "sponsors": [{
    "forteeId": "uuid",
    "name": "株式会社サンプル", "kana": "かぶしきがいしゃさんぷる",
    "appliedAt": "2026-01-23T13:45:00+09:00", // 申込日時（JST）。取れなければ null
    "url": "https://...",            // 未登録なら null
    "plans": ["ブリ"],                // fortee のプラン名
    "planIds": ["buri"],              // src/data/<年>/sponsorPlans.ts の id。対応が無ければ null
    "sns": [{ "type": "twitter", "handle": "@xxx", "url": "..." }],
    "x": "xxx",                       // @ なし。未登録なら null
    "pr": "概要文",                   // 未登録なら null
    "logos": [{ "file": "logos/<id>.png", "originalFilename": "...", "contentType": "image/png" }]
  }]
}
```

プラン名の対応表は `save.mjs` の `PLAN_IDS` にある。年が変わったら `src/data/<年>/sponsorPlans.ts` の id と突き合わせて更新し、fortee 側でプランが増えたら追記する。

## サイトへの反映（別作業）

このスキルは取得までを担当する。サイトへの反映は、ユーザーに指示されてから行う。

- スポンサー 1 社 = `src/content/<年>/sponsors/<pageSlug>.md`。frontmatter の先頭に `# fortee: <forteeId>` コメントがあるので、sponsors.json とはこれで突き合わせる。
- 新しいスポンサーには `pageSlug` を付ける。Web サイトのドメインから決める（`www.example.co.jp/recruit` → `example`。サブドメインやパスは外す）。社名と結びつかない、既存と紛らわしいなど判断に迷う場合は、候補を挙げてユーザーに確認する。詳細ページの URL `/sponsors/<pageSlug>/` になるので、既存のスポンサーの pageSlug は変えない。重複するとビルドが失敗する。md のファイル名も pageSlug にそろえる。
- 項目名を `slug` にしない（Astro の glob ローダーがエントリ ID として使い、同じ値のエントリが黙って上書きされる）。
- `appliedAt` に sponsors.json の申込日時を入れる。プラン内の並びはこの順（`order` は付けない）。
- ロゴは `public/images/<年>/sponsors/<pageSlug>.<ext>` に置き、`logo:` に書く。.ai / .eps しかない場合は、.svg / .png があるものを選ぶ（無ければユーザーに相談）。
- ロゴがまだ無いスポンサーは `hidden: true` を付けてデータだけ用意する（`getSponsors` で除外される）。ロゴが届いたら、ロゴを置いて `logo:` を書き、`hidden` の行を消す。
- 概要文（PR）は md の本文に入れる。仮の文言（「後日入力します」など）は入れない。
- 反映後は `pnpm build` を実行し、`dist/index.html` の `#sponsors` に意図したロゴだけが出ていることを確認する。

## うまく動かないとき

- `未ログインです` で止まる: ブラウザでログインしてもらってから 3 をやり直す。
- `スポンサー一覧ページを開いてから実行してください` で止まる: 1 の URL を開き直してから 3 をやり直す。
- 項目が null ばかりになる: fortee の画面構造が変わった可能性がある。`playwright-cli -s=fortee goto <詳細ページ>` で開き、`.basic-info` / `.service-name` / `.card.file-list` のセレクタを確認して scrape.js を直す。
