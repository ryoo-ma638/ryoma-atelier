// @ts-check
import { defineConfig } from 'astro/config';

// GitHub ユーザーサイト（ryoo-ma638.github.io）としてルート配信。
// → base 不要。/works や /yumiki/ などの絶対パスのリンクがそのまま動く。
// ポートフォリオ:  https://ryoo-ma638.github.io/
// 弓木サイト:      https://ryoo-ma638.github.io/yumiki/
export default defineConfig({
  site: 'https://ryoo-ma638.github.io',
});
