export const locales = ['ja', 'en', 'zh-tw', 'ko'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ja';

// パス prefix（デフォルトロケールは prefix なし）
export const localePrefixes: Record<Locale, string> = {
  ja: '',
  en: 'en',
  'zh-tw': 'zh-tw',
  ko: 'ko',
};

// <html lang> に使う値（zh-tw は Hant 表記）
export const htmlLangMap: Record<Locale, string> = {
  ja: 'ja',
  en: 'en',
  'zh-tw': 'zh-Hant',
  ko: 'ko',
};

// OGP の locale
export const ogLocaleMap: Record<Locale, string> = {
  ja: 'ja_JP',
  en: 'en_US',
  'zh-tw': 'zh_TW',
  ko: 'ko_KR',
};

// 言語切替 UI 用ラベル
export const localeLabels: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
  'zh-tw': '繁體中文',
  ko: '한국어',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
