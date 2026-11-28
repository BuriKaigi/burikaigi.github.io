import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// スポンサーロゴの大きさを、縦横比に関係なく見た目の面積がそろうように決める。
// ビルド時に public 配下の画像ヘッダから縦横比を読み、幅（枠の内側に対する %）を返す。

type Size = { width: number; height: number };

const pngSize = (b: Buffer): Size | null =>
  b.toString('ascii', 1, 4) === 'PNG' ? { width: b.readUInt32BE(16), height: b.readUInt32BE(20) } : null;

// SOF マーカー（0xC0〜0xCF のうち DHT/JPG/DAC を除く）を探して寸法を読む
const jpegSize = (b: Buffer): Size | null => {
  if (b[0] !== 0xff || b[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) return null;
    const marker = b[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
};

const svgSize = (text: string): Size | null => {
  const vb = text.match(/viewBox\s*=\s*["']\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/);
  return vb ? { width: Number(vb[1]), height: Number(vb[2]) } : null;
};

export const imageSize = (buf: Buffer, path: string): Size | null =>
  path.toLowerCase().endsWith('.svg') ? svgSize(buf.toString('utf8')) : (pngSize(buf) ?? jpegSize(buf));

/**
 * 縦横比（幅/高さ）から、枠の内側の幅に対するロゴの幅（%）を返す。
 * 幅 ∝ √縦横比 にすると面積が一定になる。base は正方形のロゴの幅。
 * 枠からはみ出す分は CSS の max-width / max-height で抑える。
 */
export const logoWidthPercent = (aspect: number, base = 42): number =>
  Math.min(100, Math.round(base * Math.sqrt(aspect) * 10) / 10);

/** public 配下のロゴ（/images/...）の縦横比。外部 URL や読めない形式は null */
export const logoAspect = (logo: string): number | null => {
  if (!logo.startsWith('/')) return null;
  const path = join(process.cwd(), 'public', logo);
  const size = imageSize(readFileSync(path), path);
  return size && size.width > 0 && size.height > 0 ? size.width / size.height : null;
};
