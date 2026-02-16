import { useState } from "react";
import {
  Box, Button, Menu, MenuItem, ListItemIcon, ListItemText,
  Divider, Typography, IconButton, Tooltip,
} from "@mui/material";
import {
  InsertDriveFileOutlined, FileUploadOutlined, FileDownloadOutlined,
  ImageOutlined, Undo, Redo,
  SelectAll, DeleteOutline, GridOn, GridOff,
  Fullscreen,
  KeyboardOutlined, ArrowBack,
} from "@mui/icons-material";
import { useEditor, useEditorDispatch, ACTION } from "../EditorContext";
import { exportToPng } from "../export/exportPng";
import { exportToSvg } from "../export/exportSvg";
import { exportToJson, importFromJson } from "../export/exportJson";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const { state } = useEditor();
  const dispatch = useEditorDispatch();
  const navigate = useNavigate();
  const { appState, elements, selectedIds, history } = state;
  const isDark = appState.theme === "dark";

  const [fileAnchor, setFileAnchor] = useState(null);
  const [editAnchor, setEditAnchor] = useState(null);
  const [viewAnchor, setViewAnchor] = useState(null);
  const [helpAnchor, setHelpAnchor] = useState(null);

  const handleNewFile = () => {
    setFileAnchor(null);
    if (elements.length > 0 && !window.confirm("Create new file? Unsaved changes will be lost.")) return;
    dispatch({ type: ACTION.LOAD_SCENE, elements: [], appState: {} });
  };

  const handleImport = () => {
    setFileAnchor(null);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,.sketchcanvas.json,.excalidraw";
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = importFromJson(ev.target.result);
        if (result) {
          dispatch({ type: ACTION.LOAD_SCENE, ...result });
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleExportPng = () => {
    setFileAnchor(null);
    exportToPng(elements, { bgColor: isDark ? "#1e1e2e" : "#ffffff" });
  };

  const handleExportSvg = () => {
    setFileAnchor(null);
    exportToSvg(elements, { bgColor: isDark ? "#1e1e2e" : "#ffffff" });
  };

  const handleExportJson = () => {
    setFileAnchor(null);
    exportToJson(elements, appState);
  };

  const handleUndo = () => {
    setEditAnchor(null);
    dispatch({ type: ACTION.UNDO });
  };

  const handleRedo = () => {
    setEditAnchor(null);
    dispatch({ type: ACTION.REDO });
  };

  const handleSelectAll = () => {
    setEditAnchor(null);
    dispatch({ type: ACTION.SET_SELECTION, ids: elements.map((e) => e.id) });
  };

  const handleDeleteSelected = () => {
    setEditAnchor(null);
    if (selectedIds.size > 0) {
      dispatch({ type: ACTION.PUSH_HISTORY });
      dispatch({ type: ACTION.DELETE_ELEMENTS, ids: [...selectedIds] });
    }
  };

  const toggleGrid = () => {
    setViewAnchor(null);
    dispatch({ type: ACTION.SET_APP_STATE, updates: { grid: !appState.grid } });
  };

  

  const toggleFullscreen = () => {
    setViewAnchor(null);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const menuSx = {
    "& .MuiPaper-root": {
      bgcolor: isDark ? "rgba(30,30,46,0.96)" : "rgba(255,255,255,0.98)",
      backdropFilter: "blur(12px)",
      borderRadius: 2,
      border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
      boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.12)",
      minWidth: 200,
    },
  };

  const menuItemSx = { fontSize: 13, py: 0.75 };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 48,
        display: "flex",
        alignItems: "center",
        px: 1,
        gap: 0.25,
        bgcolor: isDark ? "rgba(30,30,46,0.85)" : "rgba(255,255,255,0.88)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
        zIndex: 20,
      }}
    >
      <Tooltip title="返回工具列表">
        <IconButton size="small" onClick={() => navigate("/tools")} sx={{ mr: 0.5 }}>
          <ArrowBack sx={{ fontSize: 20 }} />
        </IconButton>
      </Tooltip>

      <MenuButton label="File" onClick={(e) => setFileAnchor(e.currentTarget)} isDark={isDark} />
      <Menu anchorEl={fileAnchor} open={!!fileAnchor} onClose={() => setFileAnchor(null)} sx={menuSx}>
        <MenuItem onClick={handleNewFile} sx={menuItemSx}>
          <ListItemIcon><InsertDriveFileOutlined sx={{ fontSize: 18 }} /></ListItemIcon>
          <ListItemText>New</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleImport} sx={menuItemSx}>
          <ListItemIcon><FileUploadOutlined sx={{ fontSize: 18 }} /></ListItemIcon>
          <ListItemText>Import JSON...</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleExportPng} sx={menuItemSx}>
          <ListItemIcon><ImageOutlined sx={{ fontSize: 18 }} /></ListItemIcon>
          <ListItemText>Export PNG</ListItemText>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>Ctrl+Shift+E</Typography>
        </MenuItem>
        <MenuItem onClick={handleExportSvg} sx={menuItemSx}>
          <ListItemIcon><FileDownloadOutlined sx={{ fontSize: 18 }} /></ListItemIcon>
          <ListItemText>Export SVG</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleExportJson} sx={menuItemSx}>
          <ListItemIcon><FileDownloadOutlined sx={{ fontSize: 18 }} /></ListItemIcon>
          <ListItemText>Export JSON</ListItemText>
        </MenuItem>
      </Menu>

      <MenuButton label="Edit" onClick={(e) => setEditAnchor(e.currentTarget)} isDark={isDark} />
      <Menu anchorEl={editAnchor} open={!!editAnchor} onClose={() => setEditAnchor(null)} sx={menuSx}>
        <MenuItem onClick={handleUndo} disabled={history.undoStack.length === 0} sx={menuItemSx}>
          <ListItemIcon><Undo sx={{ fontSize: 18 }} /></ListItemIcon>
          <ListItemText>Undo</ListItemText>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>Ctrl+Z</Typography>
        </MenuItem>
        <MenuItem onClick={handleRedo} disabled={history.redoStack.length === 0} sx={menuItemSx}>
          <ListItemIcon><Redo sx={{ fontSize: 18 }} /></ListItemIcon>
          <ListItemText>Redo</ListItemText>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>Ctrl+Y</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSelectAll} sx={menuItemSx}>
          <ListItemIcon><SelectAll sx={{ fontSize: 18 }} /></ListItemIcon>
          <ListItemText>Select All</ListItemText>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>Ctrl+A</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteSelected} disabled={selectedIds.size === 0} sx={menuItemSx}>
          <ListItemIcon><DeleteOutline sx={{ fontSize: 18 }} /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>Del</Typography>
        </MenuItem>
      </Menu>

      <MenuButton label="View" onClick={(e) => setViewAnchor(e.currentTarget)} isDark={isDark} />
      <Menu anchorEl={viewAnchor} open={!!viewAnchor} onClose={() => setViewAnchor(null)} sx={menuSx}>
        <MenuItem onClick={toggleGrid} sx={menuItemSx}>
          <ListItemIcon>{appState.grid ? <GridOn sx={{ fontSize: 18 }} /> : <GridOff sx={{ fontSize: 18 }} />}</ListItemIcon>
          <ListItemText>{appState.grid ? "Hide Grid" : "Show Grid"}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={toggleFullscreen} sx={menuItemSx}>
          <ListItemIcon><Fullscreen sx={{ fontSize: 18 }} /></ListItemIcon>
          <ListItemText>Fullscreen</ListItemText>
        </MenuItem>
      </Menu>

      <MenuButton label="Help" onClick={(e) => setHelpAnchor(e.currentTarget)} isDark={isDark} />
      <Menu anchorEl={helpAnchor} open={!!helpAnchor} onClose={() => setHelpAnchor(null)} sx={menuSx}>
        <MenuItem onClick={() => setHelpAnchor(null)} sx={menuItemSx}>
          <ListItemIcon><KeyboardOutlined sx={{ fontSize: 18 }} /></ListItemIcon>
          <ListItemText>Keyboard Shortcuts</ListItemText>
        </MenuItem>
        <Box sx={{ px: 2, py: 1 }}>
          <ShortcutRow keys="V" desc="Select" />
          <ShortcutRow keys="R" desc="Rectangle" />
          <ShortcutRow keys="O" desc="Ellipse" />
          <ShortcutRow keys="D" desc="Diamond" />
          <ShortcutRow keys="L" desc="Line" />
          <ShortcutRow keys="A" desc="Arrow" />
          <ShortcutRow keys="P" desc="Pen" />
          <ShortcutRow keys="T" desc="Text" />
          <ShortcutRow keys="E" desc="Eraser" />
          <ShortcutRow keys="Space+Drag" desc="Pan" />
          <ShortcutRow keys="Ctrl+Z" desc="Undo" />
          <ShortcutRow keys="Ctrl+Y" desc="Redo" />
          <ShortcutRow keys="Ctrl+A" desc="Select All" />
          <ShortcutRow keys="Del" desc="Delete" />
          <ShortcutRow keys="Ctrl+Shift+E" desc="Export PNG" />
        </Box>
      </Menu>

      <Box sx={{ flex: 1 }} />

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mr: 1 }}>
        <Tooltip title="Undo (Ctrl+Z)">
          <span>
            <IconButton size="small" onClick={handleUndo} disabled={history.undoStack.length === 0}>
              <Undo sx={{ fontSize: 18 }} />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Redo (Ctrl+Y)">
          <span>
            <IconButton size="small" onClick={handleRedo} disabled={history.redoStack.length === 0}>
              <Redo sx={{ fontSize: 18 }} />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
}

function MenuButton({ label, onClick, isDark }) {
  return (
    <Button
      size="small"
      onClick={onClick}
      sx={{
        minWidth: "auto",
        px: 1.5,
        py: 0.5,
        fontSize: 13,
        fontWeight: 500,
        textTransform: "none",
        color: isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.7)",
        borderRadius: 1.5,
        "&:hover": {
          bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
        },
      }}
    >
      {label}
    </Button>
  );
}

function ShortcutRow({ keys, desc }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.25, minWidth: 180 }}>
      <Typography variant="caption" sx={{ opacity: 0.6, fontSize: 11 }}>{desc}</Typography>
      <Typography variant="caption" sx={{ fontFamily: "monospace", fontSize: 11, opacity: 0.8 }}>{keys}</Typography>
    </Box>
  );
}
