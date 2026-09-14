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
| `pnpm check:build`     | Verify that the site can be built                |
| `pnpm check:links`     | Verify that built pages do not contain internal dead links |
| `pnpm check:images`    | Verify that internal image assets referenced by built pages are reachable |
| `pnpm check:site`      | Run all automated site checks                    |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## Automated checks

### GitHub Actions

Pull requests and pushes to `main` run `/home/runner/work/burikaigi.github.io/burikaigi.github.io/.github/workflows/ci.yml`, which verifies:

- the site builds successfully
- built pages do not contain internal dead links
- internal image assets referenced by built pages can be fetched successfully

### Local PC

1. Install dependencies

   ```bash
   corepack enable
   corepack pnpm install
   ```

2. Run each check

   ```bash
   corepack pnpm check:build
   corepack pnpm check:links
   corepack pnpm check:images
   ```

3. Or run everything at once

   ```bash
   corepack pnpm check:site
   ```

4. If your environment can access external sites and you also want to verify outbound links, run:

   ```bash
   CHECK_EXTERNAL_LINKS=1 corepack pnpm check:links
   ```
