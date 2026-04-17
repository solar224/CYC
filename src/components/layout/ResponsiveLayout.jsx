import React from "react";
import useResponsiveDevice from "../../hooks/useResponsiveDevice";

function renderSlot(slot, device) {
    if (!slot) {
        return null;
    }

    if (React.isValidElement(slot)) {
        return slot;
    }

    if (typeof slot === "function") {
        return slot(device);
    }

    const SlotComponent = slot;
    return <SlotComponent {...device} />;
}

export default function ResponsiveLayout({ mobile, desktop, fallback = null }) {
    const device = useResponsiveDevice();
    const selectedSlot = device.layoutKind === "desktop" ? desktop : mobile;

    return renderSlot(selectedSlot, device) ?? fallback;
}
