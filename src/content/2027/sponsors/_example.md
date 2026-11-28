---
# スポンサー 1 社 = 1 ファイル。このファイルをコピーして、先頭の _ を外したファイル名で保存する（例: sakura.md）。
# _ で始まるファイルは読み込まれない。項目は src/content.config.ts の sponsors2027 を参照。
name: 株式会社サンプル
pageSlug: sample # 必須。詳細ページの URL（/sponsors/sample/）。Webサイトのドメインから決め（example.co.jp → example）、一度決めたら変えない
appliedAt: 2026-09-10T23:46:00+09:00 # 任意。fortee の申込日時。プラン内はこの順に並ぶ
plan: buri # himi-buri / buri / gando / fukuragi / kozukura / supporter（src/data/2027/sponsorPlans.ts）
logo: /images/2027/sponsors/sample.svg # 任意。public/images/2027/sponsors/ に置いたロゴ。省略すると名前を文字で表示
url: https://example.com/ # 任意。詳細ページに出すWebサイト
x: example # 任意。@ は不要
order: 0 # 任意。同じプラン内の並び順（昇順）。同じ値なら appliedAt 順
hidden: true # 任意。true ならサイトに出さない。ロゴ未着のときに使い、ロゴを置いたら logo を書いてこの行を消す
---

ここに紹介文を書く（スポンサー詳細ページに出す）。
