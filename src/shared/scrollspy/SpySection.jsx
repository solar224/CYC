import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { useScrollSpy } from "./ScrollSpyProvider";

export function SpySection({ id, title, level = 2, children, sx }) {
    const ref = useRef(null);
    const { register, unregister, headerOffset } = useScrollSpy();

    useEffect(() => {
        if (!id) return;
        register({ id, title: title || id, level, el: ref.current });
        return () => unregister(id);
    }, [id, title, level, register, unregister]);

    return (
        <Box
            id={id}
            ref={ref}
            sx={{ scrollMarginTop: `${headerOffset}px`, ...sx }}  // 讓內建捲動也不被 Header 擋住
        >
            {children}
        </Box>
    );
}
