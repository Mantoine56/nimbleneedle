const LONG_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatLongDate(date: string) {
  return LONG_DATE_FORMATTER.format(new Date(`${date}T00:00:00Z`));
}

export function formatShortDate(date: string) {
  return SHORT_DATE_FORMATTER.format(new Date(`${date}T00:00:00Z`));
}
