import FrHomeTranslations from './fr/home.json';
import FrPwaInstallTranslations from './fr/pwa_install.json';
import { I18nTranslation, TranslationFile } from './translationHelper';

export const locales = ['fr'] as const;
export const translationNamespaces = ['home', 'pwa_install'] as const;

export type TranslationNamespace = (typeof translationNamespaces)[number];
export type Locale = (typeof locales)[number];

export type HomeTranslation = I18nTranslation<typeof FrHomeTranslations>;

const translationsFR = {
  home: FrHomeTranslations,
  pwa_install: FrPwaInstallTranslations,
} satisfies Record<TranslationNamespace, TranslationFile>;

export type NamespaceTranslations<Namespace extends TranslationNamespace> =
  I18nTranslation<(typeof translationsFR)[Namespace]>;

function getTranslationFromObject(
  source: TranslationFile,
  translationKey: string,
): string {
  if (!translationKey) {
    return '### Unknown translation ###';
  }
  const splitKey = translationKey.split('.', 2);
  console.log({ translationKey, splitKey });
  if (splitKey.length <= 1) {
    return source[splitKey[0]] as string;
  }

  return getTranslationFromObject(
    source[splitKey[0]] as TranslationFile,
    splitKey[1],
  );
}

export type Translation = keyof {
  [Namespace in TranslationNamespace as `${Namespace}.${NamespaceTranslations<Namespace>}`]: true;
};

export function getTranslation<Namespace extends TranslationNamespace>(
  locale: Locale,
  namespace: Namespace,
  translation: string,
): string | never {
  switch (locale) {
    case 'fr':
      return getTranslationFromObject(translationsFR[namespace], translation);
  }
}
