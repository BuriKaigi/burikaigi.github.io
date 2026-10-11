# burikaigi

Burikaigiの公式用ページ

## 🚀 Project Structure

Astroによって構築されたプロジェクトです

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:3000`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 🚀 デプロイ

### 本番

`main` ブランチへの push で GitHub Actions から GitHub Pages にデプロイされます（`.github/workflows/deploy.yml`）。

### プレビュー環境

レビュー用のプレビュー環境は、手元から Cloudflare Workers Previews にデプロイします。
プレビュー環境には `X-Robots-Tag: noindex` を付けているため、検索エンジンにはインデックスされません。
ただし URL を知っていれば誰でも閲覧できます。

#### 事前準備

1. BuriKaigi の Cloudflare アカウントにメンバーとして招待してもらう
2. Cloudflare にログインする

```sh
pnpm dlx wrangler@4.149.0 login
```

#### デプロイ

プレビューしたいブランチで実行します。プレビュー名には現在のブランチ名が使われます。

```sh
pnpm preview:deploy
```

出力された URL を Discord で共有してください。同じブランチで再実行すると、同じ URL の内容が更新されます。

#### 削除

レビューが終わったら、該当ブランチで実行して削除します。

```sh
pnpm preview:delete
```

削除し忘れたものは、Preview が上限数（Free プランで 100）を超えたときに古いものから自動で削除されます。
