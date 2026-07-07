// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ポートフォリオ vol.2「稜馬のアトリエ」＝ Vercel でルート配信。
// 公開URL: https://ryoma-atelier.vercel.app （vol.1 の ryoo-ma638.github.io とは別物）
// ※ base 不要＝/works・/yumiki/ 等の絶対パスがそのまま動く。
export default defineConfig({
  site: 'https://ryoma-atelier.vercel.app',
  integrations: [
    sitemap({
      // 非公式ファンサイトはサイトマップから除外（noindex 方針）
      filter: (page) => !page.includes('/yumiki'),
    }),
  ],
});
