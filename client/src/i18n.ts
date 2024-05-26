import { derived, writable } from 'svelte/store';
import {
  getTranslation,
  Locale,
  Translation,
  TranslationNamespace,
} from 'client-translations';

export const locale = writable<Locale>('fr');

export const t = derived(locale, ($locale) => (key: Translation) => {
  const index = key.indexOf('.');
  const namespace = key.slice(0, index);
  const keyName = key.slice(index + 1);

  return getTranslation($locale, namespace as TranslationNamespace, keyName);
});
