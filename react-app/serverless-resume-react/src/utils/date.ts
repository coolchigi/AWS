const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-01-10" -> "Jan 10, 2026" and "2026-09" -> "Sep 2026".
// Parsed by hand: new Date("2026-01-10") is UTC midnight, which shows as Jan 9 in Ottawa.
export function formatPostDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || month > 12) return date;
  const name = MONTHS[month - 1];
  return day ? `${name} ${day}, ${year}` : `${name} ${year}`;
}
