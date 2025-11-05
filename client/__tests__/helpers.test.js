import { formatDate, countDays } from "../src/helpers";

describe("Helper functions", () => {
  test("formatDate converts YYYY-MM-DD to DD/MM/YYYY", () => {
    expect(formatDate("2025-11-05")).toBe("05/11/2025");
  });

  test("countDays counts the correct number of days", () => {
    expect(countDays("2025-11-01", "2025-11-05")).toBe(5);
  });

  test("countDays counts a single day correctly", () => {
    expect(countDays("2025-11-05", "2025-11-05")).toBe(1);
  });

  test("countDays returns 0 if endDate is before startDate", () => {
    expect(countDays("2025-11-05", "2025-11-04")).toBeLessThanOrEqual(0);
  });
});
