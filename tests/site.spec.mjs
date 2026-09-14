import { test, expect } from '@playwright/test';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const okStatuses = new Set([200, 201, 202, 204, 301, 302, 303, 307, 308, 401, 403, 405, 429]);
const shouldCheckExternalLinks = process.env.CHECK_EXTERNAL_LINKS === '1';
const skippedExternalHosts = new Set([
  'x.com',
  'www.x.com',
  'twitter.com',
  'www.twitter.com',
  'facebook.com',
  'www.facebook.com',
  'instagram.com',
  'www.instagram.com',
  'linkedin.com',
  'www.linkedin.com',
]);

async function walkHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walkHtmlFiles(fullPath);
    }

    return entry.isFile() && entry.name.endsWith('.html') ? [fullPath] : [];
  }));

  return files.flat();
}

async function getSiteRoutes() {
  const htmlFiles = await walkHtmlFiles(distDir);

  return htmlFiles
    .map((file) => path.relative(distDir, file).replaceAll(path.sep, '/'))
    .map((relativePath) => {
      if (relativePath === 'index.html') return '/';
      if (relativePath.endsWith('/index.html')) {
        return `/${relativePath.slice(0, -'index.html'.length)}`;
      }
      return `/${relativePath}`;
    })
    .sort();
}

function shouldSkipLink(rawHref) {
  return (
    !rawHref ||
    rawHref.startsWith('mailto:') ||
    rawHref.startsWith('tel:') ||
    rawHref.startsWith('#')
  );
}

function normalizeForCheck(href, baseURL) {
  const url = new URL(href, baseURL);
  url.hash = '';
  return url.toString();
}

function extractAttributeValues(html, tagName, attributeName) {
  const pattern = new RegExp(`<${tagName}\\b[^>]*\\b${attributeName}=(["'])(.*?)\\1`, 'gi');
  const values = [];

  for (const match of html.matchAll(pattern)) {
    values.push(match[2]);
  }

  return values;
}

test.describe.configure({ mode: 'serial' });

test('ビルド済みページにデッドリンクがないこと', async ({ request, baseURL }) => {
  const routes = await getSiteRoutes();
  const checked = new Set();
  const failures = [];

  for (const route of routes) {
    const response = await request.get(new URL(route, baseURL).toString(), {
      failOnStatusCode: false,
      maxRedirects: 10,
      timeout: 20_000,
    });
    expect(response.ok(), `${route} が正常に表示できません`).toBeTruthy();

    const hrefs = extractAttributeValues(await response.text(), 'a', 'href');

    for (const href of hrefs) {
      if (shouldSkipLink(href)) continue;
      if (href.startsWith('javascript:')) {
        failures.push(`${route}: 危険なリンク ${href}`);
        continue;
      }

      const target = normalizeForCheck(href, new URL(route, baseURL).toString());
      if (checked.has(target)) continue;
      checked.add(target);

      const targetUrl = new URL(target);
      const isInternal = targetUrl.origin === baseURL;
      if (!isInternal && !shouldCheckExternalLinks) {
        continue;
      }
      if (!isInternal && skippedExternalHosts.has(targetUrl.hostname)) {
        continue;
      }

      try {
        const responseForLink = await request.get(target, {
          failOnStatusCode: false,
          maxRedirects: 10,
          timeout: 20_000,
        });

        if (!okStatuses.has(responseForLink.status())) {
          failures.push(`${route}: ${target} -> ${responseForLink.status()}`);
        }
      } catch (error) {
        failures.push(`${route}: ${target} -> ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }

  expect(failures, failures.join('\n')).toEqual([]);
});

test('ビルド済みページの画像が正しく表示されること', async ({ request, baseURL }) => {
  const routes = await getSiteRoutes();
  const images = new Set();
  const failures = [];

  for (const route of routes) {
    const response = await request.get(new URL(route, baseURL).toString(), {
      failOnStatusCode: false,
      maxRedirects: 10,
      timeout: 20_000,
    });
    expect(response.ok(), `${route} が正常に表示できません`).toBeTruthy();

    const srcs = extractAttributeValues(await response.text(), 'img', 'src');
    for (const src of srcs) {
      if (!src) continue;
      const imageUrl = normalizeForCheck(src, new URL(route, baseURL).toString());
      if (!shouldCheckExternalLinks && new URL(imageUrl).origin !== baseURL) {
        continue;
      }
      images.add(imageUrl);
    }
  }

  for (const imageUrl of images) {
    try {
      const response = await request.get(imageUrl, {
        failOnStatusCode: false,
        maxRedirects: 10,
        timeout: 20_000,
      });
      const contentType = response.headers()['content-type'] ?? '';

      if (!okStatuses.has(response.status())) {
        failures.push(`${imageUrl} -> ${response.status()}`);
        continue;
      }

      if (!contentType.startsWith('image/')) {
        failures.push(`${imageUrl} -> content-type: ${contentType || 'missing'}`);
      }
    } catch (error) {
      failures.push(`${imageUrl} -> ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  expect(failures, failures.join('\n')).toEqual([]);
});
