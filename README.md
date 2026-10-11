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
環境は 1 つだけで、どのブランチからデプロイしても同じ環境の内容が上書きされます。

`workers.dev` の Preview URL には Cloudflare が自動で `X-Robots-Tag: noindex` を付けるため、検索エンジンにはインデックスされません。
ただし URL を知っていれば誰でも閲覧できます。

#### 事前準備

1. BuriKaigi の Cloudflare アカウントにメンバーとして招待してもらう
2. Cloudflare にログインする

```sh
pnpm dlx wrangler@4.149.0 login
```

#### デプロイ

確認したいブランチで実行します。

```sh
pnpm preview:deploy
```

デプロイ時に出力される URL を Discord で周知してください。
複数人が続けてデプロイすると、後からデプロイした内容で上書きされます。

#### 削除

通常は削除する必要はありません。環境ごと消したい場合は次を実行します。

```sh
pnpm preview:delete
```
