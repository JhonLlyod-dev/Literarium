import dayjs from "dayjs";

export function formatLocalDateTime(localDateTime) {
  const dt = dayjs(localDateTime);

  if (!dt.isValid()) {
    return {
      date: "—",
      time: "—",
    };
  }

  return {
    date: dt.format("MMMM D, YYYY"), // e.g., November 12, 2025
    time: dt.format("hh:mm A"),      // e.g., 09:54 PM
  };
}

