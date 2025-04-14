export const i18nProvider = {
    translate: (_key: string, _options?: Record<string, unknown>): string => "",
    changeLocale: (_locale: string): Promise<void> => Promise.resolve(), // Đổi 'locale' thành '_locale'
    getLocale: (): string => "en",
    getLocales: (): { locale: string; name: string }[] => [
        { locale: "en", name: "English" },
    ],
};
