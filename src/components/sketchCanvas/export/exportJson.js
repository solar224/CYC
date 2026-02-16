export function exportToJson(elements, appState) {
  const data = {
    type: "sketchcanvas",
    version: 1,
    source: window.location.href,
    elements: elements,
    appState: {
      theme: appState.theme,
      grid: appState.grid,
      zoom: appState.zoom,
      scrollX: appState.scrollX,
      scrollY: appState.scrollY,
    },
  };
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "untitled.sketchcanvas.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function importFromJson(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (data.type === "sketchcanvas" && Array.isArray(data.elements)) {
      return {
        elements: data.elements,
        appState: data.appState || {},
      };
    }
    if (Array.isArray(data.elements)) {
      return {
        elements: data.elements,
        appState: data.appState || {},
      };
    }
    throw new Error("Invalid format");
  } catch (e) {
    console.error("Import failed:", e);
    return null;
  }
}
