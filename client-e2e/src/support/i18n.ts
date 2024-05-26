import {
  getTranslation,
  Translation,
  TranslationNamespace,
} from 'client-translations';

export function translate(key: Translation) {
  if (typeof key !== 'string') {
    return '?';
  }
  const index = key.indexOf('.');
  const namespace = key.slice(0, index);
  const keyName = key.slice(index + 1);

  return getTranslation('fr', namespace as TranslationNamespace, keyName);
}
