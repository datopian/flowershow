export function formatDate(dateUTC) {
  return new Date(dateUTC).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
