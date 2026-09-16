import { ui } from './translations';
import { dataI18n } from './data';
import type { Locale } from './config';

type Dict = Record<string, unknown>;

// ドット記法のキー（例: "access.title"）をネスト辞書から取り出す
// 文字列だけでなく配列・オブジェクトもそのまま返す
function lookup(dict: Dict, key: string): unknown {
  const parts = key.split('.');
  let node: unknown = dict;
  for (const p of parts) {
    if (node && typeof node === 'object' && p in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return node;
}

export function useTranslations(lang: Locale) {
  const dict: Dict = (ui[lang] ?? ui.ja) as Dict;
  function t(key: string): any {
    const v = lookup(dict, key);
    if (v !== undefined) return v;
    const f = lookup(ui.ja as Dict, key);
    if (f !== undefined) return f;
    return key;
  }
  return { t };
}

// 構造化データのローカライズ。slug を持つアイテム（routes / attractions /
// restaurants / audienceRoutes）は slug をキーに、配列データ（faq /
// quickFacts / visitorServices / history / seasonal など）はインデックスで差し替え。
type SlugKind = 'routes' | 'attractions' | 'restaurants' | 'audienceRoutes';
type ListKind = 'faq' | 'quickFacts' | 'visitorServices' | 'history';

export function localize<T extends { slug?: string }>(kind: SlugKind, item: T, lang: Locale): T {
  if (lang === 'ja' || !item.slug) return item;
  const byLocale = (dataI18n as any)[lang];
  if (!byLocale) return item;
  const map = byLocale[kind]?.[item.slug];
  return map ? { ...item, ...map } : item;
}

export function localizeList<T>(kind: ListKind, list: T[], lang: Locale): T[] {
  if (lang === 'ja') return list;
  const arr = (dataI18n as any)[lang]?.[kind] as Partial<T>[] | undefined;
  if (!arr) return list;
  return list.map((it, i) => ({ ...it, ...(arr[i] ?? {}) }));
}

// ルートパスにロケール接頭辞を付ける（ja は接頭辞なし）。
export function localePath(href: string, lang: Locale): string {
  if (!href.startsWith('/')) return href;
  if (lang === 'ja') return href;
  if (href === '/') return `/${lang}`;
  return `/${lang}${href}`;
}
