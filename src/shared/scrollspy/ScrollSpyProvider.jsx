// D:\CYC\src\shared\scrollspy
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { appTokens } from "../../theme/tokens";

const Ctx = createContext(null);

export function ScrollSpyProvider({
    children,
    headerOffset = appTokens.layout.scrollSpyOffset,
    rootMargin = `-${appTokens.layout.scrollSpyOffset}px 0px -60% 0px`,
}) {
    const [sections, setSections] = useState([]);          // [{id,title,level,el}]
    const [activeId, setActiveId] = useState(null);
    const mapRef = useRef(new Map());                      // id -> { id,title,level, el }

    const register = useCallback((item) => {
        mapRef.current.set(item.id, item);
        setSections(Array.from(mapRef.current.values()));
    }, []);

    const unregister = useCallback((id) => {
        mapRef.current.delete(id);
        setSections(Array.from(mapRef.current.values()));
    }, []);

    // Observe visible section
    useEffect(() => {
        if (!sections.length) return;
        const io = new IntersectionObserver((entries) => {
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
            if (visible[0]) setActiveId(visible[0].target.id);
        }, { root: null, rootMargin, threshold: [0, 1] });

        sections.forEach(s => s.el && io.observe(s.el));
        return () => io.disconnect();
    }, [sections, rootMargin]);

    const scrollTo = useCallback((id) => {
        const item = mapRef.current.get(id);
        if (!item?.el) return;
        const y = item.el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        setActiveId(id);
    }, [headerOffset]);

    const value = useMemo(() => ({ sections, activeId, register, unregister, scrollTo, headerOffset }),
        [sections, activeId, register, unregister, scrollTo, headerOffset]);

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useScrollSpy = () => {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useScrollSpy must be used inside <ScrollSpyProvider>");
    return ctx;
};
