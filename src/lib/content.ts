import { getCollection } from 'astro:content';
import type { Locale } from '../data/profile';
import { localizedPath } from './i18n';

export type Section = 'blogs' | 'projects';

export async function publishedEntries(section: Section) {
  const entries = await getCollection(section, ({ data }) => !data.draft);
  const paths = new Set<string>();
  const translations = new Set<string>();
  for (const entry of entries) {
    const path = entryPath(section, entry.data);
    const translation = `${entry.data.locale}:${entry.data.translationKey}`;
    if (paths.has(path) || translations.has(translation)) {
      throw new Error(`Duplicate content path or translation key: ${entry.id}`);
    }
    paths.add(path);
    translations.add(translation);
  }
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function entryPath(section: Section, data: { locale: Locale; slug: string }) {
  return localizedPath(data.locale, `${section}/${data.slug}`);
}

export function formatDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
  }).format(date);
}
