import { nanoid } from "nanoid";
import raw from "../../data/events.json";

const LS_KEY = "myCalendar.userEvents";

/** 讀靜態 + 使用者事件（localStorage），id 相同則以使用者版本覆蓋 */
export function getAllEvents() {
  const base = Array.isArray(raw) ? raw : [];
  let user = [];
  try { user = JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch {}
  const map = new Map(base.map(e => [e.id, e]));
  user.forEach(e => map.set(e.id, e));
  return Array.from(map.values());
}

/** 取區間事件（含整天事件 + 每週重複展開到 endISO） */
export function getEventsBetween(startISO, endISO) {
  const rangeStart = new Date(startISO).getTime();
  const rangeEnd = new Date(endISO).getTime();

  const out = [];

  for (const e of getAllEvents()) {
    if (e.repeatWeekly) {
      out.push(...expandWeekly(e, rangeStart, rangeEnd));
    } else {
      const s = new Date(e.start).getTime();
      const ee = new Date(e.end || e.start).getTime();
      if (ee >= rangeStart && s <= rangeEnd) out.push(e);
    }
  }
  return out;
}

const DAY_MS  = 24 * 60 * 60 * 1000;
const WEEK_MS = 7  * DAY_MS;

function computeOccurrenceDurationMs(ev, s0, e0) {
  if (ev.allDay) return DAY_MS;

  const raw = Math.max(0, e0 - s0);
  if (raw > 36 * 60 * 60 * 1000) {
    // end 看起來是 repeat-until，用時分秒決定每次長度
    const until = new Date(e0);

    const endSameDay = new Date(s0);
    endSameDay.setHours(
      until.getHours(),
      until.getMinutes(),
      until.getSeconds(),
      until.getMilliseconds()
    );

    let dur = endSameDay.getTime() - s0;
    if (dur <= 0) dur += DAY_MS; // 跨夜
    return dur;
  }
  return raw || 1; // 至少 1ms 避免 0 長度
}

/** 把一個事件以每週頻率展開，直到 viewEnd 與 repeat-until（取較早者） */
function expandWeekly(ev, viewStart, viewEnd) {
  const s0 = new Date(ev.start).getTime();
  const untilMs = new Date(ev.end || ev.start).getTime(); // ← 把 end 當 repeat-until
  const occDur = computeOccurrenceDurationMs(ev, s0, untilMs);

  // 只需要展開到這個界線
  const hardEnd = Math.min(viewEnd, untilMs);

  // 從第一個可能與畫面相交的週期開始
  let k = Math.max(0, Math.floor((viewStart - s0) / WEEK_MS));

  const out = [];
  // 合理上限避免意外死迴圈
  const maxLoops = Math.ceil((hardEnd - s0) / WEEK_MS) + 3;
  let loops = 0;

  while (loops++ < Math.max(1, maxLoops)) {
    const occStart = s0 + k * WEEK_MS;
    const occEnd   = occStart + occDur;

    // 若這個實例已經超過 until 或 viewEnd 就停
    if (occStart > hardEnd) break;
    if (occEnd > untilMs) { // 這筆會超過 repeat-until，不產生並結束
      break;
    }

    // 與畫面有交集才輸出
    if (occEnd >= viewStart) {
      const { startStr, endStr } = formatOccurrence(ev, occStart, occEnd);
      out.push({
        ...ev,
        id: `${ev.id}#${k}`,
        start: startStr,
        end: endStr,
      });
    }

    k += 1;
  }

  return out;
}


/** 依事件型別維持輸出格式（allDay 用 YYYY-MM-DD，其他用 ISO） */
function formatOccurrence(ev, sMs, eMs) {
  if (ev.allDay) {
    const startStr = new Date(sMs).toISOString().slice(0, 10);
    // allDay 也保留原本的天數跨度（通常 start==end 代表單日）
    const endStr = new Date(eMs).toISOString().slice(0, 10);
    return { startStr, endStr };
  } else {
    // 用 ISO（UTC Z）；在瀏覽器會依本地時區顯示正確本地時間
    return { startStr: new Date(sMs).toISOString(), endStr: new Date(eMs).toISOString() };
  }
}

/** 下面三個只寫入 localStorage，不改動原始 JSON */
export function addEvent(partial) {
  const list = getUserEvents();
  const evt = { id: nanoid(10), allDay: false, ...partial };
  list.push(evt);
  localStorage.setItem(LS_KEY, JSON.stringify(list));
  return evt;
}
export function updateEvent(id, patch) {
  const list = getUserEvents().map(e => (e.id === id ? { ...e, ...patch } : e));
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}
export function deleteEvent(id) {
  const list = getUserEvents().filter(e => e.id !== id);
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}
function getUserEvents() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
  catch { return []; }
}
