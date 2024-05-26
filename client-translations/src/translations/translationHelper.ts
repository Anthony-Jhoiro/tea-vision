export type TranslationFile = { [Key: string]: string | TranslationFile };

type _I18nTranslation<T extends TranslationFile | string> = T extends string
  ? ''
  : keyof {
      [Key in keyof T as Key extends `${infer KeyName}`
        ? // @ts-ignore
          `.${KeyName}${_I18nTranslation<T[Key]>}`
        : '~~']: true;
    };

export type I18nTranslation<T extends TranslationFile> = keyof {
  [Key in keyof T as Key extends `${infer KeyName}`
    ? `${KeyName}${_I18nTranslation<T[Key]>}`
    : '~~']: true;
};
