export const formatDate = (date: Date, locale: string = 'en-US') => {
  // Map app locales to BCP 47 language tags
  const supportedLocale = locale === 'es' ? 'es-MX' : 'en-US';
  return new Intl.DateTimeFormat(supportedLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
