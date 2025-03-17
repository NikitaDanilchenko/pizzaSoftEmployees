export function sortEmployees<T extends Record<K, string>, K extends keyof T>(
  employees: T[],
  field: K,
  order: "ASC" | "DESC",
): T[] {
  const sorted = [...employees];

  if (field === "birthday") {
    const parseDate = (s: string): number => {
      const [day, month, year] = s.split(".");
      return new Date(+year, +month - 1, +day).getTime();
    };
    sorted.sort((a, b) => {
      const aTime = parseDate(a[field]);
      const bTime = parseDate(b[field]);
      return order === "ASC" ? aTime - bTime : bTime - aTime;
    });
  } else {
    sorted.sort((a, b) => {
      const aVal = a[field].toLowerCase();
      const bVal = b[field].toLowerCase();
      if (aVal < bVal) return order === "ASC" ? -1 : 1;
      if (aVal > bVal) return order === "ASC" ? 1 : -1;
      return 0;
    });
  }
  return sorted;
}
