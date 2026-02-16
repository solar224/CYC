import { Box, Typography, Select, MenuItem, Divider, IconButton, Tooltip, TextField } from "@mui/material";
import { Delete, ContentCopy, FlipToFront, FlipToBack, Lock, LockOpen, ShowChart, Timeline, AccountTree } from "@mui/icons-material";
import { useEditor, useEditorDispatch, ACTION } from "../EditorContext";
import { COLORS_PALETTE, FONT_FAMILIES } from "../constants";
import { measureText } from "../elements/textRenderer";
import { nanoid } from "nanoid";

export default function Inspector() {
  const { state } = useEditor();
  const dispatch = useEditorDispatch();
  const { elements, selectedIds, appState } = state;
  const isDark = appState.theme === "dark";

  const selected = elements.filter((el) => selectedIds.has(el.id));
  const single = selected.length === 1 ? selected[0] : null;

  const updateSelected = (updates) => {
    dispatch({ type: ACTION.PUSH_HISTORY });
    const u = [...selectedIds].map((id) => ({ id, changes: updates }));
    dispatch({ type: ACTION.UPDATE_ELEMENTS, updates: u });
  };

  if (selected.length === 0) {
    return (
      <Box
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
          width: 240,
          bgcolor: isDark ? "rgba(30,30,46,0.92)" : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderRadius: 3,
          boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.12)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          px: 3,
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", lineHeight: 1.6 }}>
          選取元素以檢視屬性
        </Typography>
      </Box>
    );
  }

  return (
    <InspectorShell isDark={isDark}>
      <Box sx={{ p: 1.5 }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 1 }}>
          {selected.length > 1 ? `${selected.length} elements` : single?.type}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
        <LabelRow label="Stroke">
          <ColorPicker
            value={single?.strokeColor || "#1e1e1e"}
            onChange={(c) => updateSelected({ strokeColor: c })}
            isDark={isDark}
          />
        </LabelRow>

        <LabelRow label="Fill">
          <ColorPicker
            value={single?.fillColor || "transparent"}
            onChange={(c) => updateSelected({ fillColor: c })}
            isDark={isDark}
          />
        </LabelRow>

        <LabelRow label="Width">
          <NumericInput
            value={single?.strokeWidth ?? 2}
            min={0.5} max={20} step={0.5}
            onChange={(v) => updateSelected({ strokeWidth: v })}
            isDark={isDark}
          />
        </LabelRow>

        <LabelRow label="Roughness">
          <NumericInput
            value={single?.roughness ?? 1}
            min={0} max={3} step={0.5}
            onChange={(v) => updateSelected({ roughness: v })}
            isDark={isDark}
          />
        </LabelRow>

        <LabelRow label="Opacity">
          <NumericInput
            value={single?.opacity ?? 1}
            min={0} max={1} step={0.05} decimals={2}
            onChange={(v) => updateSelected({ opacity: v })}
            isDark={isDark}
          />
        </LabelRow>

        {single?.type === "text" && (
          <>
            <Divider />
            <LabelRow label="Font">
              <Select
                size="small"
                value={single.fontFamily || FONT_FAMILIES[0].value}
                onChange={(e) => {
                  const newFamily = e.target.value;
                  const ms = measureText(single.text || "", single.fontSize || 20, newFamily);
                  updateSelected({ fontFamily: newFamily, width: ms.width, height: ms.height });
                }}
                sx={{ flex: 1, fontSize: 12 }}
              >
                {FONT_FAMILIES.map((f) => (
                  <MenuItem key={f.value} value={f.value} sx={{ fontSize: 12 }}>
                    {f.label}
                  </MenuItem>
                ))}
              </Select>
            </LabelRow>
            <LabelRow label="Size">
              <FontSizeInput
                value={single.fontSize || 20}
                onChange={(v) => {
                  const ms = measureText(single.text || "", v, single.fontFamily || "Caveat, cursive, sans-serif");
                  updateSelected({ fontSize: v, width: ms.width, height: ms.height });
                }}
                isDark={isDark}
              />
            </LabelRow>
          </>
        )}

        {single && (single.type === "line" || single.type === "arrow") && (
          <>
            <Divider />
            <LabelRow label="Style">
              <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
                {[
                  { value: "straight", icon: <ShowChart sx={{ fontSize: 16 }} />, tip: "Straight" },
                  { value: "curve", icon: <Timeline sx={{ fontSize: 16 }} />, tip: "Curve" },
                  { value: "elbow", icon: <AccountTree sx={{ fontSize: 16 }} />, tip: "Elbow" },
                ].map((opt) => (
                  <Tooltip key={opt.value} title={opt.tip}>
                    <IconButton
                      size="small"
                      onClick={() => updateSelected({ lineType: opt.value })}
                      sx={{
                        border: (single.lineType || "straight") === opt.value
                          ? "2px solid #4a7dff"
                          : `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
                        borderRadius: 1,
                        p: 0.5,
                      }}
                    >
                      {opt.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>
            </LabelRow>
          </>
        )}

        {single && single.type === "arrow" && (
          <>
            <Divider />
            <LabelRow label="Arrow Start">
              <Select
                size="small"
                value={single.startArrowhead || "none"}
                onChange={(e) =>
                  updateSelected({
                    startArrowhead: e.target.value === "none" ? null : e.target.value,
                  })
                }
                sx={{ flex: 1, fontSize: 12 }}
              >
                <MenuItem value="none" sx={{ fontSize: 12 }}>None</MenuItem>
                <MenuItem value="arrow" sx={{ fontSize: 12 }}>Arrow</MenuItem>
              </Select>
            </LabelRow>
            <LabelRow label="Arrow End">
              <Select
                size="small"
                value={single.endArrowhead || "none"}
                onChange={(e) =>
                  updateSelected({
                    endArrowhead: e.target.value === "none" ? null : e.target.value,
                  })
                }
                sx={{ flex: 1, fontSize: 12 }}
              >
                <MenuItem value="none" sx={{ fontSize: 12 }}>None</MenuItem>
                <MenuItem value="arrow" sx={{ fontSize: 12 }}>Arrow</MenuItem>
              </Select>
            </LabelRow>
          </>
        )}
      </Box>

      <Divider />

      <Box sx={{ p: 1, display: "flex", justifyContent: "center", gap: 0.5 }}>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            onClick={() => {
              dispatch({ type: ACTION.PUSH_HISTORY });
              dispatch({ type: ACTION.DELETE_ELEMENTS, ids: [...selectedIds] });
            }}
          >
            <Delete sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Duplicate">
          <IconButton size="small" onClick={() => duplicateSelected(state, dispatch)}>
            <ContentCopy sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bring to front">
          <IconButton
            size="small"
            onClick={() => {
              const maxZ = Math.max(...elements.map((e) => e.zIndex || 0));
              updateSelected({ zIndex: maxZ + 1 });
            }}
          >
            <FlipToFront sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Send to back">
          <IconButton
            size="small"
            onClick={() => {
              const minZ = Math.min(...elements.map((e) => e.zIndex || 0));
              updateSelected({ zIndex: minZ - 1 });
            }}
          >
            <FlipToBack sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={single?.locked ? "Unlock" : "Lock"}>
          <IconButton
            size="small"
            onClick={() => updateSelected({ locked: !single?.locked })}
          >
            {single?.locked ? <Lock sx={{ fontSize: 18 }} /> : <LockOpen sx={{ fontSize: 18 }} />}
          </IconButton>
        </Tooltip>
      </Box>
    </InspectorShell>
  );
}

function InspectorShell({ children, isDark }) {
  return (
    <Box
      sx={{
        position: "absolute",
        right: 12,
        top: 12,
        width: 220,
        bgcolor: isDark ? "rgba(30,30,46,0.92)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderRadius: 3,
        boxShadow: isDark
          ? "0 4px 24px rgba(0,0,0,0.5)"
          : "0 4px 24px rgba(0,0,0,0.12)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        zIndex: 10,
        maxHeight: "calc(100% - 80px)",
        overflowY: "auto",
        "&::-webkit-scrollbar": { width: 4 },
        "&::-webkit-scrollbar-thumb": {
          bgcolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
          borderRadius: 2,
        },
      }}
    >
      {children}
    </Box>
  );
}

function LabelRow({ label, children }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="caption" sx={{ minWidth: 60, fontSize: 11, opacity: 0.7 }}>
        {label}
      </Typography>
      {children}
    </Box>
  );
}

function ColorPicker({ value, onChange, isDark }) {
  return (
    <Box sx={{ display: "flex", gap: 0.3, flexWrap: "wrap", flex: 1 }}>
      {COLORS_PALETTE.slice(0, 9).map((c) => (
        <Box
          key={c}
          onClick={() => onChange(c)}
          sx={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            bgcolor: c === "transparent" ? "transparent" : c,
            border:
              c === value
                ? "2px solid #4a7dff"
                : c === "transparent"
                  ? `1px dashed ${isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}`
                  : `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
            cursor: "pointer",
            transition: "transform 0.1s",
            "&:hover": { transform: "scale(1.2)" },
          }}
        />
      ))}
    </Box>
  );
}

/**
 * Generic numeric input with +/− buttons and direct text entry.
 * Supports decimals and step increments.
 */
function NumericInput({ value, min = 0, max = 999, step = 1, decimals = 1, onChange, isDark }) {
  const display = typeof value === "number" ? (Number.isInteger(value) && decimals <= 0 ? value : value.toFixed(decimals)) : value;

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    if (raw === "" || raw === ".") return;
    const num = Math.max(min, Math.min(max, parseFloat(raw)));
    if (!isNaN(num)) onChange(num);
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === "ArrowUp") {
      e.preventDefault();
      onChange(Math.min(max, parseFloat((value + step).toFixed(6))));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onChange(Math.max(min, parseFloat((value - step).toFixed(6))));
    }
  };

  const bump = (dir) => {
    const next = parseFloat((value + step * dir).toFixed(6));
    onChange(Math.max(min, Math.min(max, next)));
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "2px", flex: 1 }}>
      <IconButton size="small" onClick={() => bump(-1)} sx={{ width: 22, height: 22, fontSize: 14 }}>−</IconButton>
      <TextField
        size="small"
        value={display}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        inputProps={{
          style: { textAlign: "center", fontSize: 12, padding: "4px 2px", width: 40 },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 28,
            "& fieldset": { borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)" },
          },
        }}
      />
      <IconButton size="small" onClick={() => bump(1)} sx={{ width: 22, height: 22, fontSize: 14 }}>+</IconButton>
    </Box>
  );
}

const FONT_SIZE_PRESETS = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60, 72, 96];

function FontSizeInput({ value, onChange, isDark }) {
  const handleInputChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    if (raw === "") return;
    const num = Math.max(1, Math.min(999, parseInt(raw, 10)));
    onChange(num);
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === "ArrowUp") {
      e.preventDefault();
      onChange(Math.min(999, value + 1));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onChange(Math.max(1, value - 1));
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flex: 1 }}>
      <TextField
        size="small"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        inputProps={{
          style: {
            textAlign: "center",
            fontSize: 12,
            padding: "4px 4px",
            width: 36,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 28,
            "& fieldset": {
              borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
            },
          },
        }}
      />
      <Select
        size="small"
        value=""
        displayEmpty
        onChange={(e) => {
          if (e.target.value !== "") onChange(Number(e.target.value));
        }}
        renderValue={() => "▾"}
        sx={{
          minWidth: 28,
          height: 28,
          fontSize: 10,
          "& .MuiSelect-select": { p: "2px 4px", textAlign: "center" },
          "& fieldset": {
            borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
          },
        }}
        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
      >
        {FONT_SIZE_PRESETS.map((s) => (
          <MenuItem key={s} value={s} sx={{ fontSize: 12, minHeight: 28 }}>
            {s}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

function duplicateSelected(state, dispatch) {
  const { elements, selectedIds } = state;
  const selected = elements.filter((el) => selectedIds.has(el.id));
  if (selected.length === 0) return;

  dispatch({ type: ACTION.PUSH_HISTORY });
  const newIds = [];
  for (const el of selected) {
    const newId = nanoid();
    const newEl = {
      ...JSON.parse(JSON.stringify(el)),
      id: newId,
      x: el.x + 20,
      y: el.y + 20,
      seed: Math.floor(Math.random() * 2147483647),
      versionNonce: Math.floor(Math.random() * 2147483647),
      zIndex: (el.zIndex || 0) + 1,
    };
    // Strip bindings from duplicated elements (they reference old shape IDs)
    if (newEl.binding) {
      newEl.binding = { start: null, end: null };
    }
    dispatch({ type: ACTION.ADD_ELEMENT, element: newEl });
    newIds.push(newId);
  }
  dispatch({ type: ACTION.SET_SELECTION, ids: newIds });
}
