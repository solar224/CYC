import { useMemo } from "react";
import { getEventsBetween } from "../shared/calendar/eventStore";

export default function useCalendarEvents(startISO, endISO) {
  const allEvents = useMemo(() => {
    return getEventsBetween(startISO, endISO).sort((a, b) => new Date(a.start) - new Date(b.start));
  }, [startISO, endISO]);

  const allDayEvents = useMemo(() => allEvents.filter((event) => !!event.allDay), [allEvents]);
  const timedEvents = useMemo(() => allEvents.filter((event) => !event.allDay), [allEvents]);

  return {
    allEvents,
    allDayEvents,
    timedEvents,
  };
}
