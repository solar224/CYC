import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // 主組件
import dayGridPlugin from "@fullcalendar/daygrid"; // 月視圖
import timeGridPlugin from "@fullcalendar/timegrid"; // 時間軸視圖
import interactionPlugin from "@fullcalendar/interaction"; // 點擊與拖放互動

const MyCalendar = () => {
    const [events, setEvents] = useState([
        // 全天事件
        { title: "公司年度聚餐", start: "2025-01-15", allDay: true },

        // 特定時間段事件
        { title: "產品會議", start: "2025-01-20T10:00:00", end: "2025-01-20T11:30:00" },
        { title: "運動時間", start: "2025-01-20T18:00:00", end: "2025-01-20T19:00:00" },

        // 不同背景顏色（自定義分類）
        { title: "專案截止日期", start: "2025-01-22", allDay: true, color: "red" },
        { title: "線上會議", start: "2025-01-23T14:00:00", end: "2025-01-23T15:30:00", color: "green" },

        // 跨多日的事件
        { title: "出差（上海）", start: "2025-01-25", end: "2025-01-28", allDay: true },

        // 重複事件（模擬每周會議）
        { title: "每周團隊會議", start: "2025-01-16T09:00:00", end: "2025-01-16T10:00:00", daysOfWeek: [4] },

        // 個人備註
        { title: "牙醫預約", start: "2025-01-19T15:00:00", end: "2025-01-19T15:30:00", color: "blue" },

        // 帶有說明的事件
        { title: "年度規劃報告", start: "2025-01-30T09:00:00", end: "2025-01-30T11:00:00", description: "提交年度規劃報告" },

        // 無特定結束時間的事件
        { title: "閱讀時間", start: "2025-01-20T20:00:00" },
    ]);


    const handleDateClick = (info) => {
        alert(`您點擊了日期：${info.dateStr}`);
    };
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth" // 初始視圖 (月視圖)
            events={events} // 傳遞事件
            editable={true} // 啟用事件的拖放編輯
            selectable={true} // 啟用點擊選取
            dateClick={handleDateClick} // 日期點擊事件
            headerToolbar={{
                left: "prev,next today", // 左側按鈕
                center: "title", // 中間標題
                right: "dayGridMonth,timeGridWeek,timeGridDay", // 右側按鈕
            }}
        />
    );
};

export default MyCalendar;
