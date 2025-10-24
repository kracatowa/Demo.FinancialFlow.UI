export function validateCsvContent(text: string): string | null {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) {
    return "CSV must contain at least a header and one data row.";
  }
  if (!lines[0].includes(";") && !lines[0].includes(",")) {
    return "CSV header must use ';', ',' as separator.";
  }
  if (!lines[1].includes(";") && !lines[1].includes(",")) {
    return "CSV must have at least one data row with ';', ',' as separator.";
  }
  return null;
}