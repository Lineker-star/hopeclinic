/** Return translated field value from a Supabase row, falling back to English. */
export function getTranslated(
  item: Record<string, unknown>,
  field: string,
  locale: string,
): string {
  if (locale === 'en') return (item[field] as string) ?? '';

  const translations = item[`${field}_translations`] as Record<string, string> | null;
  if (translations?.[locale]) return translations[locale];

  // Fallback to English
  return (item[field] as string) ?? '';
}
