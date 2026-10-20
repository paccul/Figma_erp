// ============================================================
// GARDA ERP — Screen & Token Generator (Compact UI-Driven)
// Butuh: manifest.json (dengan "ui":"ui.html"), ui.html, tokens.json
// ============================================================

const GARDA_TOKENS = {
  "bg/canvas":            { dark: "#000000", light: "#F8FAFC" },
  "bg/surface-1":         { dark: "#030712", light: "#FFFFFF" },
  "bg/surface-2":         { dark: "#111827", light: "#F1F5F9" },
  "bg/surface-3":         { dark: "#1F2937", light: "#E2E8F0" },
  "border/default":       { dark: "#374151", light: "#CBD5E1" },
  "text/primary":         { dark: "#F9FAFB", light: "#0F172A" },
  "text/secondary":       { dark: "#9CA3AF", light: "#475569" },
  "accent/primary":       { dark: "#F59E0B", light: "#D97706" },
  "accent/hover":         { dark: "#D97706", light: "#B45309" },
  "accent/text-on-amber": { dark: "#000000", light: "#FFFFFF" },
  "focus/ring":           { dark: "#F59E0B", light: "#D97706" },
  "status/success":       { dark: "#10B981", light: "#059669" },
  "status/warning":       { dark: "#F59E0B", light: "#D97706" },
  "status/danger":        { dark: "#F87171", light: "#DC2626" },
  "status/info":          { dark: "#38BDF8", light: "#0369A1" }
};

let C; // diisi per-mode oleh initTokensFor()

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
  const num = parseInt(hex, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255
  };
}

async function getCollection() {
  try {
    const cols = await figma.variables.getLocalVariableCollectionsAsync();
    return cols.find(c => c.name === "Garda Theme Tokens") || null;
  } catch (e) {
    return null;
  }
}

async function initTokensFor(mode) {
  const col = await getCollection();
  const varMap = {};
  if (col) {
    try {
      const vars = await figma.variables.getLocalVariablesAsync();
      for (const v of vars) if (v.variableCollectionId === col.id) varMap[v.name] = v;
    } catch (e) {}
  }
  const mk = (name) => {
    const rgb = hexToRgb(GARDA_TOKENS[name][mode]);
    const v = varMap[name] || null;
    return v
      ? { type: "SOLID", color: rgb, boundVariables: { color: v } }
      : { type: "SOLID", color: rgb };
  };
  C = {
    bgCanvas: mk("bg/canvas"),
    surface1: mk("bg/surface-1"),
    surface2: mk("bg/surface-2"),
    surface3: mk("bg/surface-3"),
    border: mk("border/default"),
    borderLight: mk("border/default"),
    textPrimary: mk("text/primary"),
    textSecondary: mk("text/secondary"),
    accent: mk("accent/primary"),
    accentHover: mk("accent/hover"),
    accentTextOnAmber: mk("accent/text-on-amber"),
    success: mk("status/success"),
    danger: mk("status/danger"),
    warning: mk("status/warning"),
    info: mk("status/info"),
    black: { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
    white: { type: "SOLID", color: { r: 1, g: 1, b: 1 } }
  };
}


// ============================================================
// ENTERPRISE SVG VECTOR ICON REGISTRY (NO EMOJIS)
// ============================================================
const ICONS = {
  shield: '<path d="M12 2L4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  search: '<path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="2"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2"/>',
  filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2"/><polyline points="7 10 12 15 17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>',
  check: '<polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  alert: '<path d="M12 3L2 21h20L12 3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><line x1="12" y1="10" x2="12" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17.5" r="1" fill="currentColor"/>',
  calendar: '<rect width="18" height="18" x="3" y="4" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/><path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" stroke-width="2"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2"/>',
  userCheck: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/><polyline points="16 11 18 13 22 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  building: '<rect width="16" height="20" x="4" y="2" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M9 22v-4h6v4" stroke="currentColor" stroke-width="2"/><path d="M8 6h.01" stroke="currentColor" stroke-width="2"/><path d="M16 6h.01" stroke="currentColor" stroke-width="2"/><path d="M8 10h.01" stroke="currentColor" stroke-width="2"/><path d="M16 10h.01" stroke="currentColor" stroke-width="2"/>',
  mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>',
  package: '<path d="m7.5 4.27 9 5.15" stroke="currentColor" stroke-width="2"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" stroke="currentColor" stroke-width="2"/><path d="m3.3 7 8.7 5 8.7-5" stroke="currentColor" stroke-width="2"/><path d="M12 22V12" stroke="currentColor" stroke-width="2"/>',
  fileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" stroke="currentColor" stroke-width="2"/><path d="M14 2v4a2 2 0 0 0 2 2h4" stroke="currentColor" stroke-width="2"/><path d="M10 9H8" stroke="currentColor" stroke-width="2"/><path d="M16 13H8" stroke="currentColor" stroke-width="2"/><path d="M16 17H8" stroke="currentColor" stroke-width="2"/>',
  dollarSign: '<line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-width="2"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="2"/>',
  barChart: '<path d="M3 3v18h18" stroke="currentColor" stroke-width="2"/><path d="M18 17V9" stroke="currentColor" stroke-width="2"/><path d="M13 17V5" stroke="currentColor" stroke-width="2"/><path d="M8 17v-3" stroke="currentColor" stroke-width="2"/>',
  bookOpen: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="currentColor" stroke-width="2"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="currentColor" stroke-width="2"/>',
  settings: '<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="2" fill="none"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2"/>',
  chevronRight: '<polyline points="9 18 15 12 9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  chevronDown: '<polyline points="6 9 12 15 18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
};

function hexColor(color) {
  if (!color || !color.color) return "#9CA3AF";
  const r = Math.round((color.color.r || 0) * 255).toString(16).padStart(2, '0');
  const g = Math.round((color.color.g || 0) * 255).toString(16).padStart(2, '0');
  const b = Math.round((color.color.b || 0) * 255).toString(16).padStart(2, '0');
  return '#' + r + g + b;
}

function drawIcon(name, size = 16, colorPaint = null, parent = null, x = 0, y = 0) {
  const hex = hexColor(colorPaint);
  const rawSvg = ICONS[name] || ICONS.shield;
  const svgStr = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" color="' + hex + '" xmlns="http://www.w3.org/2000/svg">' + rawSvg + '</svg>';
  try {
    if (figma.createNodeFromSvg) {
      const node = figma.createNodeFromSvg(svgStr);
      node.name = "icon-" + name;
      if (parent) {
        parent.appendChild(node);
        node.x = x;
        node.y = y;
      }
      return node;
    }
  } catch (e) {}
  // Fallback geometric frame
  const f = frame("icon-" + name, size, size, colorPaint, parent, x, y, 3);
  return f;
}

let loadedRegular = false;
let loadedBold = false;
async function ensureFonts() {
  if (!loadedRegular) { await figma.loadFontAsync({ family: "Inter", style: "Regular" }); loadedRegular = true; }
  if (!loadedBold) { await figma.loadFontAsync({ family: "Inter", style: "Bold" }); loadedBold = true; }
}

async function txt(str, size, bold, color, parent, x, y) {
  await ensureFonts();
  const t = figma.createText();
  t.characters = str || "";
  t.fontSize = size;
  t.fontName = { family: "Inter", style: bold ? "Bold" : "Regular" };
  const paint = (color && color.type === "SOLID")
    ? { type: "SOLID", color: color.color, ...(color.boundVariables ? { boundVariables: color.boundVariables } : {}) }
    : { type: "SOLID", color: color };
  t.fills = [paint];
  if (parent) { parent.appendChild(t); t.x = x !== undefined ? x : 0; t.y = y !== undefined ? y : 0; }
  return t;
}

function frame(name, w, h, bg, parent, x, y, radius, strokeColor) {
  const f = figma.createFrame();
  f.name = name;
  f.resize(w, h);
  f.fills = bg ? [bg] : [];
  if (radius) f.cornerRadius = radius;
  if (strokeColor) { f.strokes = [strokeColor]; f.strokeWeight = 1; f.strokeAlign = "INSIDE"; }
  if (parent) { parent.appendChild(f); f.x = x !== undefined ? x : 0; f.y = y !== undefined ? y : 0; }
  return f;
}

// ANTI-SLOP: Tactical status pill with 6px circular dot indicator (NO EMOJIS)
async function badge(text, textColor, bgColor, parent, x, y) {
  const dotColor = textColor || C.accent;
  const pill = frame("StatusPill", 96, 22, bgColor || C.surface2, parent, x, y, 11, dotColor);
  frame("Dot", 6, 6, dotColor, pill, 8, 8, 3);
  const t = await txt(text.toUpperCase(), 9.5, true, textColor || C.textPrimary, pill, 20, 5);
  pill.resize(Math.max(t.width + 28, 64), 22);
  return pill;
}

// ANTI-SLOP: Native Vector Checkbox (NO UNICODE EMOJIS)
async function drawCheckbox(checked, label, parent, x, y) {
  const row = frame("CheckboxRow", 260, 22, null, parent, x, y);
  const box = frame("Box", 16, 16, checked ? C.accent : null, row, 0, 3, 4, checked ? null : C.border);
  if (checked) {
    drawIcon("check", 12, C.black, box, 2, 2);
  }
  await txt(label, 11, false, C.textPrimary, row, 24, 3);
  return row;
}

// ANTI-SLOP: Professional Form Field with helper and clean borders
async function fieldBox(label, placeholder, w, parent, x, y, isError, errorMsg) {
  await txt(label, 11, false, isError ? C.danger : C.textSecondary, parent, x, y);
  const box = frame("InputBox", w, 38, C.surface2, parent, x, y + 18, 6, isError ? C.danger : C.border);
  if (placeholder) {
    await txt(placeholder, 11, false, isError ? C.textPrimary : C.textSecondary, box, 12, 11);
  }
  if (isError && errorMsg) {
    const errRow = frame("ErrRow", w, 18, null, parent, x, y + 60);
    frame("ErrDot", 5, 5, C.danger, errRow, 0, 4, 3);
    await txt(errorMsg, 10, false, C.danger, errRow, 10, 1);
  }
  return box;
}

// ANTI-SLOP: KPI Metric Card with vector icon and trend indicator
async function drawKpiCard(label, val, subText, subColor, iconName, parent, x, y, w = 212, h = 100) {
  const kc = frame("KpiCard", w, h, C.surface1, parent, x, y, 8, C.border);
  await txt(label.toUpperCase(), 9.5, true, C.textSecondary, kc, 14, 14);
  drawIcon(iconName || "barChart", 16, C.accent, kc, w - 30, 12);
  await txt(val, 18, true, C.textPrimary, kc, 14, 38);
  
  const subRow = frame("SubRow", w - 28, 20, null, kc, 14, 72);
  frame("Dot", 5, 5, subColor || C.accent, subRow, 0, 7, 3);
  await txt(subText, 10, true, subColor || C.textSecondary, subRow, 10, 3);
  return kc;
}

// ANTI-SLOP: Global App Shell with Geometric Logo, Vector Navigation, Breadcrumbs & Search
async function buildShell(parent, screenId, screenTitle, screenModule, screenRoute) {
  const sidebar = frame("Sidebar", 260, 900, C.surface1, parent, 0, 0, 0, C.border);
  
  // Header: Geometric Brand Emblem (No emoji)
  const emblem = frame("Emblem", 32, 32, C.accent, sidebar, 20, 20, 6);
  drawIcon("shield", 18, C.black, emblem, 7, 7);
  
  await txt("GARDA", 15, true, C.textPrimary, sidebar, 60, 20);
  const erpPill = frame("ErpPill", 32, 16, null, sidebar, 118, 21, 3, C.accent);
  await txt("ERP", 9, true, C.accent, erpPill, 6, 2);
  
  await txt("SIO: 088/MBS-POLRI/BUJP-2026", 9, false, C.textSecondary, sidebar, 60, 38);

  const menus = [
    { name: "Dashboard Eksekutif", mod: "Dashboard", icon: "barChart" },
    { name: "Operasional Personel", mod: "Operasional", icon: "users" },
    { name: "Rekrutmen PSB", mod: "Rekrutmen", icon: "userCheck" },
    { name: "Logistik & Gudang", mod: "Logistik", icon: "package" },
    { name: "Keuangan Operasional", mod: "Keuangan", icon: "fileText" },
    { name: "Akuntansi Inti", mod: "Akuntansi", icon: "bookOpen" },
    { name: "Laporan Keuangan SAK", mod: "Laporan", icon: "barChart" },
    { name: "Pengaturan Sistem", mod: "Pengaturan", icon: "settings" }
  ];

  await txt("KOMANDO OPERASIONAL", 9, true, C.textSecondary, sidebar, 20, 76);

  let my = 96;
  for (let idx = 0; idx < menus.length; idx++) {
    if (idx === 4) {
      await txt("FINANSIAL & AKUNTANSI", 9, true, C.textSecondary, sidebar, 20, my + 8);
      my += 26;
    } else if (idx === 7) {
      await txt("SISTEM & LEGALITAS", 9, true, C.textSecondary, sidebar, 20, my + 8);
      my += 26;
    }
    const m = menus[idx];
    const isAct = screenModule.toLowerCase().includes(m.mod.toLowerCase().slice(0, 4));
    const mItem = frame("Menu", 220, 36, isAct ? C.surface2 : null, sidebar, 20, my, 6);
    if (isAct) frame("ActiveBar", 3, 20, C.accent, mItem, 0, 8, 2);
    drawIcon(m.icon, 15, isAct ? C.accent : C.textSecondary, mItem, 12, 10);
    await txt(m.name, 11, isAct, isAct ? C.accent : C.textSecondary, mItem, 36, 11);
    my += 38;
  }

  // Profile Card (Bottom Sidebar)
  const userBox = frame("UserBox", 220, 56, C.surface2, sidebar, 20, 900 - 74, 6, C.border);
  const avatar = frame("Avt", 32, 32, C.surface3, userBox, 10, 12, 16, C.accent);
  await txt("BS", 11, true, C.accent, avatar, 8, 8);
  await txt("Mayor (Purn) Bambang S.", 11, true, C.textPrimary, userBox, 48, 11);
  const statusLine = frame("Stat", 140, 16, null, userBox, 48, 29);
  frame("LiveDot", 5, 5, C.success, statusLine, 0, 5, 3);
  await txt("Admin Sistem  •  Sesi Aktif", 9.5, false, C.textSecondary, statusLine, 9, 2);

  // Topbar
  const topbar = frame("TopNavbar", 1440 - 260, 64, C.surface1, parent, 260, 0, 0, C.border);
  
  // Breadcrumbs
  const breadcrumb = frame("Breadcrumb", 300, 24, null, topbar, 28, 20);
  await txt("GARDA ERP", 10.5, true, C.accent, breadcrumb, 0, 4);
  drawIcon("chevronRight", 12, C.textSecondary, breadcrumb, 64, 6);
  await txt(screenModule.toUpperCase(), 10.5, false, C.textSecondary, breadcrumb, 80, 4);
  drawIcon("chevronRight", 12, C.textSecondary, breadcrumb, 80 + (screenModule.length * 6.5) + 6, 6);
  await txt(screenId, 10.5, true, C.textPrimary, breadcrumb, 80 + (screenModule.length * 6.5) + 22, 4);

  // Global Search Box with vector search icon and [Ctrl + K] pill
  const searchBox = frame("GlobalSearch", 320, 36, C.surface2, topbar, 340, 14, 6, C.border);
  drawIcon("search", 14, C.textSecondary, searchBox, 10, 11);
  await txt("Cari personel, No. KTA, site, jurnal...", 10.5, false, C.textSecondary, searchBox, 32, 11);
  const kbd = frame("Kbd", 46, 20, C.surface3, searchBox, 320 - 54, 8, 4, C.border);
  await txt("Ctrl K", 9, true, C.textSecondary, kbd, 8, 4);

  // Right Utility Items: Korbinmas Sync + Period + Notification
  const syncPill = frame("SyncPill", 136, 26, C.surface2, topbar, (1440 - 260) - 340, 19, 13, C.border);
  frame("Dot", 6, 6, C.success, syncPill, 8, 10, 3);
  await txt("KORBINMAS AKTIF", 9, true, C.success, syncPill, 19, 7);

  const periodPill = frame("PeriodPill", 110, 26, C.surface2, topbar, (1440 - 260) - 194, 19, 6, C.border);
  drawIcon("calendar", 13, C.textSecondary, periodPill, 8, 7);
  await txt("OKT 2026", 9.5, true, C.textPrimary, periodPill, 26, 7);

  const notifBtn = frame("NotifBtn", 32, 32, C.surface2, topbar, (1440 - 260) - 74, 16, 6, C.border);
  drawIcon("bell", 16, C.textSecondary, notifBtn, 8, 8);
  frame("UnreadDot", 6, 6, C.danger, notifBtn, 20, 6, 3);

  // Main Page Content Area
  const content = frame("MainContent", 1440 - 260, 900 - 64, C.bgCanvas, parent, 260, 64);
  
  // Page Title & Header Bar
  await txt(screenId + " — " + screenTitle, 18, true, C.textPrimary, content, 32, 22);
  const subMeta = frame("SubMeta", 800, 20, null, content, 32, 48);
  await txt("Rute: " + screenRoute + "  •  Kepatuhan: Perpol No. 4/2020  •  Standar SAK BUJP", 11, false, C.textSecondary, subMeta, 0, 2);

  // Context Action Buttons (Top Right of Page Content)
  const actBar = frame("ActBar", 260, 32, null, content, (1440 - 260) - 292, 24);
  const expBtn = frame("ExpBtn", 100, 32, C.surface2, actBar, 0, 0, 6, C.border);
  drawIcon("download", 13, C.textSecondary, expBtn, 8, 9);
  await txt("Ekspor", 10.5, true, C.textPrimary, expBtn, 26, 9);

  const newBtn = frame("NewBtn", 140, 32, C.accent, actBar, 110, 0, 6);
  drawIcon("plus", 13, C.black, newBtn, 10, 9);
  await txt("Tambah Data", 10.5, true, C.black, newBtn, 28, 9);

  return content;
}

// 1. AUTH-01
async function render_AUTH_01(c) {
  const card = frame("Card", 460, 480, C.surface1, c, 340, 80, 8, C.border);
  await txt("PORTAL LOGIN GARDA ERP", 16, true, C.accent, card, 32, 28);
  await txt("Sistem Terpadu Komando Operasional & Finansial BUJP", 12, false, C.textSecondary, card, 32, 54);
  const w1 = frame("W1", 396, 42, C.surface2, card, 32, 90, 6, C.danger);
  await txt("HTTP 429: Batas percobaan login terlampaui (5x/menit). Akses IP dikunci 60 detik.", 10, true, C.danger, w1, 12, 13);
  const w2 = frame("W2", 396, 42, C.surface2, card, 32, 140, 6, C.warning);
  await txt("Akun Nonaktif: Status is_active=false. Silakan hubungi Administrator Sistem.", 10, true, C.warning, w2, 12, 13);
  await fieldBox("Email Korporat / NIK Admin*", "admin.ops@garda-security.co.id", 396, card, 32, 196);
  await fieldBox("Kata Sandi*", "••••••••••••••••", 396, card, 32, 268);
  await txt("Ingat Sesi Perangkat", 11, false, C.textSecondary, card, 32, 344);
  await txt("Lupa Kata Sandi?", 11, true, C.accent, card, 320, 344);
  const btn = frame("Btn", 396, 44, C.accent, card, 32, 380, 6);
  await txt("Masuk ke Portal Garda ERP", 13, true, C.black, btn, 110, 14);
}

// 2. DASH-01
async function render_DASH_01(c) {
  const kpis = [
    { l: "Personel Satpam Aktif", v: "482 Orang", s: "14 KTA Kedaluwarsa <= 30 Hari", c: C.warning },
    { l: "Lokasi Jaga (Sites)", v: "38 Lokasi", s: "24 Perusahaan Klien Mitra", c: C.textSecondary },
    { l: "Permintaan BKO", v: "3 Menunggu", s: "Butuh Persetujuan Manajer Ops", c: C.warning },
    { l: "Piutang Jatuh Tempo", v: "Rp 412.500.000", s: "7 Invoice Lewat Jatuh Tempo", c: C.danger },
    { l: "Logistik Gudang", v: "6 Item Kritis", s: "Di Bawah Batas Minimum Stok", c: C.danger }
  ];
  let kx = 32;
  for (const k of kpis) {
    const kc = frame("KC", 212, 100, C.surface1, c, kx, 86, 8, C.border);
    await txt(k.l, 11, false, C.textSecondary, kc, 14, 12);
    await txt(k.v, 17, true, C.textPrimary, kc, 14, 36);
    await txt(k.s, 10, true, k.c, kc, 14, 70);
    kx += 226;
  }
  const pL = frame("PL", 680, 580, C.surface1, c, 32, 206, 8, C.border);
  await txt("Peringatan Dini KTA Polri Kedaluwarsa (<= 30 Hari)", 13, true, C.warning, pL, 20, 18);
  const rows = [
    { n: "Bripka (Purn) Hendra Wijaya", kta: "21.09.112098", s: "Pos Menara Astra", d: "9 Hari Lagi", c: C.danger },
    { n: "Sertu (Purn) Agus Santoso", kta: "21.09.114502", s: "Pabrik Unilever Cikarang", d: "16 Hari Lagi", c: C.warning },
    { n: "Serda Joko Susilo", kta: "21.09.115890", s: "Gudang Logistik Cakung", d: "24 Hari Lagi", c: C.warning },
    { n: "Supriyadi Pratama", kta: "21.09.116701", s: "Mall Grand Indonesia", d: "27 Hari Lagi", c: C.warning }
  ];
  let ry = 58;
  for (const r of rows) {
    const row = frame("R", 640, 50, C.surface2, pL, 20, ry, 6);
    await txt(r.n, 12, true, C.textPrimary, row, 14, 10);
    await txt(`No. KTA: ${r.kta}  •  Penempatan: ${r.s}`, 10, false, C.textSecondary, row, 14, 28);
    await badge(r.d, r.c, C.surface3, row, 520, 14);
    ry += 58;
  }
  const pR = frame("PR", 412, 580, C.surface1, c, 736, 206, 8, C.border);
  await txt("Antrean Persetujuan BKO & SLA Shift", 13, true, C.textPrimary, pR, 20, 18);
  await txt("Pemenuhan Shift Hari Ini: Pagi 100% | Siang 98% | Malam 100%", 10, false, C.success, pR, 20, 38);
  const bkos = [
    { n: "BKO KTT ASEAN", s: "Menara Astra → JCC Senayan", c: "12 Personel", st: "Pending" },
    { n: "BKO Pengawalan VIP", s: "Gudang Cakung → Bandara", c: "4 Personel", st: "Pending" },
    { n: "BKO Siaga Banjir", s: "Pabrik Unilever → Pos 2", c: "6 Personel", st: "Approved" }
  ];
  let by = 70;
  for (const b of bkos) {
    const br = frame("BR", 372, 60, C.surface2, pR, 20, by, 6);
    await txt(b.n, 12, true, C.textPrimary, br, 14, 10);
    await txt(b.s, 10, false, C.textSecondary, br, 14, 28);
    await badge(b.st, b.st === "Pending" ? C.warning : C.success, C.surface3, br, 260, 18);
    by += 68;
  }
}

// 3. SEC-01
async function render_SEC_01(c) {
  const t = frame("T", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("Master Database Personel Satpam (482 Terdaftar)", 14, true, C.textPrimary, t, 20, 20);
  const head = frame("Th", 1076, 36, C.surface2, t, 20, 56, 4);
  const cols = ["FOTO & NAMA", "JABATAN", "SITE LOKASI", "GADA & IJAZAH", "NO KTA POLRI", "EXP KTA", "STATUS"];
  const xs = [14, 230, 390, 560, 740, 880, 990];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const sps = [
    { n: "Bripka (Purn) Hendra Wijaya", j: "Danru Pos Utama", s: "Menara Astra", g: "Gada Madya (GM-21)", k: "21.09.112098", e: "28/10/2026", st: "Aktif", al: true },
    { n: "Sertu (Purn) Agus Santoso", j: "Chief Security", s: "Pabrik Unilever", g: "Gada Utama (GU-19)", k: "21.09.114502", e: "04/11/2026", st: "Aktif", al: true },
    { n: "Serda Joko Susilo", j: "Anggota Satpam", s: "Gudang Cakung", g: "Gada Pratama (GP-23)", k: "21.09.115890", e: "12/11/2026", st: "Aktif", al: false },
    { n: "Bambang Pamungkas", j: "Anggota Satpam", s: "Grand Indonesia", g: "Gada Pratama (GP-24)", k: "21.09.118921", e: "18/05/2028", st: "Aktif", al: false },
    { n: "Dedi Kurniawan", j: "Anggota Satpam", s: "Pabrik Indofood", g: "Belum Ada", k: "21.09.120112", e: "05/01/2027", st: "Cuti", al: false }
  ];
  let py = 100;
  for (const s of sps) {
    const row = frame("PRow", 1076, 50, C.surface2, t, 20, py, 4);
    await txt(s.n, 11, true, C.textPrimary, row, xs[0], 16);
    await txt(s.j, 11, false, C.textPrimary, row, xs[1], 16);
    await txt(s.s, 11, false, C.accent, row, xs[2], 16);
    await txt(s.g, 10, false, C.textSecondary, row, xs[3], 16);
    await txt(s.k, 11, true, C.textPrimary, row, xs[4], 16);
    await badge(s.e, s.al ? C.danger : C.textSecondary, C.surface3, row, xs[5], 14);
    await badge(s.st, C.success, C.surface3, row, xs[6], 14);
    py += 56;
  }
}

// 4. SEC-02A
async function render_SEC_02A(c) {
  const f = frame("F", 1116, 730, C.surface1, c, 32, 86, 8, C.border);
  await txt("SEC-02A: Input Personil Baru — 19 Field Wajib Database Induk", 14, true, C.textPrimary, f, 24, 20);
  await txt("SEKSI 1: IDENTITAS PRIBADI", 11, true, C.accent, f, 24, 60);
  await fieldBox("1. NIK KTP (16 Digit)*", "3201123456780001", 240, f, 24, 80);
  await fieldBox("2. Nama Lengkap*", "Bripka (Purn) Hendra Wijaya", 240, f, 280, 80);
  await fieldBox("3. Tempat Lahir*", "Bogor", 160, f, 536, 80);
  await fieldBox("4. Tanggal Lahir*", "14/08/1984", 160, f, 712, 80);
  await fieldBox("5. Gender*", "Laki-laki", 180, f, 888, 80);
  await fieldBox("6. Alamat Domisili*", "Jl. Raya Cibinong No. 42 RT 02/05", 500, f, 24, 150);
  await fieldBox("7. No. Telepon / WhatsApp*", "0812-9876-5432", 240, f, 540, 150);
  await fieldBox("8. Email*", "hendra.wijaya@gmail.com", 280, f, 796, 150);
  await txt("SEKSI 2: LEGALITAS KEPOLISIAN & GADA", 11, true, C.accent, f, 24, 226);
  await fieldBox("9. No. KTA Polri*", "21.09.112098", 240, f, 24, 246);
  await fieldBox("10. Masa Berlaku KTA*", "28/10/2026", 240, f, 280, 246);
  await fieldBox("11. Tingkat Gada*", "Gada Madya", 240, f, 536, 246);
  await fieldBox("12. No. Ijazah Gada*", "POL-GM/2021/IX/0042", 280, f, 792, 246);
  await txt("SEKSI 3: PENUGASAN OPERASIONAL", 11, true, C.accent, f, 24, 322);
  await fieldBox("13. Jabatan*", "Danru", 240, f, 24, 342);
  await fieldBox("14. Tgl Bergabung*", "01/03/2022", 240, f, 280, 342);
  await fieldBox("15. Status*", "Aktif", 240, f, 536, 342);
  await fieldBox("16. Lokasi Site ID*", "STE-001 (Menara Astra)", 280, f, 792, 342);
  await txt("SEKSI 4: REKENING PAYROLL & BERKAS", 11, true, C.accent, f, 24, 418);
  await fieldBox("17. Bank Payroll*", "BCA", 240, f, 24, 438);
  await fieldBox("18. No. Rekening*", "8720-1928-3011", 240, f, 280, 438);
  await fieldBox("19. Unggah Pas Foto PDL*", "foto_hendra.jpg (Tervalidasi)", 500, f, 536, 438);
  const sBtn = frame("SBtn", 260, 44, C.accent, f, 24, 580, 6);
  await txt("Daftarkan Personil Satpam Baru", 12, true, C.black, sBtn, 36, 14);
}

// 5. SEC-02B
async function render_SEC_02B(c) {
  const f = frame("F", 1116, 730, C.surface1, c, 32, 86, 8, C.border);
  await txt("SEC-02B: Edit Data Personil & Riwayat Mutasi Penempatan", 14, true, C.textPrimary, f, 24, 20);
  await fieldBox("Nama Lengkap", "Bripka (Purn) Hendra Wijaya", 340, f, 24, 60);
  await fieldBox("Nomor KTA Polri", "21.09.112098", 260, f, 380, 60);
  await fieldBox("Masa Berlaku KTA", "28/10/2026 (Perlu Perpanjangan)", 340, f, 660, 60, true, "KTA kedaluwarsa dalam 9 hari!");
  await txt("RIWAYAT MUTASI PENEMPATAN POS JAGA", 11, true, C.accent, f, 24, 150);
  const mBox = frame("MBox", 1068, 160, C.surface2, f, 24, 174, 6);
  const mRows = [
    { s: "Pos Komando Menara Astra Sudirman", j: "Danru", p: "01/01/2024 - Sekarang", st: "Aktif Saat Ini" },
    { s: "Pabrik Unilever Cikarang Pos 2", j: "Danru Pengganti", p: "01/06/2023 - 31/12/2023", st: "Mutasi Selesai" },
    { s: "Gudang Logistik Cakung", j: "Anggota Satpam", p: "01/03/2022 - 31/05/2023", st: "Promosi ke Danru" }
  ];
  let my = 12;
  for (const mr of mRows) {
    await txt(`${mr.s}  •  Jabatan: ${mr.j}  •  Periode: ${mr.p}`, 11, false, C.textPrimary, mBox, 16, my);
    await badge(mr.st, mr.st.includes("Aktif") ? C.success : C.textSecondary, C.surface1, mBox, 900, my - 4);
    my += 44;
  }
  const sBtn = frame("SBtn", 260, 44, C.accent, f, 24, 400, 6);
  await txt("Simpan Perubahan & Mutasi", 12, true, C.black, sBtn, 48, 14);
}

// 6. SEC-03
async function render_SEC_03(c) {
  const t = frame("T", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("Master Data Perusahaan Klien Mitra Kontrak BUJP", 14, true, C.textPrimary, t, 20, 20);
  const head = frame("Th", 1076, 36, C.surface2, t, 20, 56, 4);
  const cols = ["KODE", "NAMA PERUSAHAAN MITRA", "NPWP PERUSAHAAN", "PIC PENANGGUNG JAWAB", "NO TELP PIC", "TOTAL SITES", "EXP KONTRAK", "STATUS"];
  const xs = [14, 100, 340, 540, 720, 850, 930, 1020];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const clients = [
    { c: "KLN-001", n: "PT Astra Agro Lestari Tbk", p: "01.312.456.7-042.000", pic: "Ir. Budi Hartono", hp: "0811-2345-6789", s: "4 Sites", exp: "31/12/2027", st: "Aktif" },
    { c: "KLN-002", n: "PT Unilever Indonesia Tbk", p: "01.889.123.4-051.000", pic: "Dewi Lestari, S.T.", hp: "0812-3456-7890", s: "6 Sites", exp: "15/10/2027", st: "Aktif" },
    { c: "KLN-003", n: "PT Indofood CBP Sukses Makmur", p: "01.554.890.1-012.000", pic: "Hendra Gunawan", hp: "0813-4567-8901", s: "5 Sites", exp: "30/06/2028", st: "Aktif" },
    { c: "KLN-004", n: "PT Bank Mandiri (Persero) Tbk", p: "01.112.334.5-091.000", pic: "Rian Pratama", hp: "0814-5678-9012", s: "12 Cabang", exp: "31/12/2026", st: "Aktif" }
  ];
  let cy = 100;
  for (const cl of clients) {
    const row = frame("CRow", 1076, 50, C.surface2, t, 20, cy, 4);
    await txt(cl.c, 11, true, C.accent, row, xs[0], 16);
    await txt(cl.n, 11, true, C.textPrimary, row, xs[1], 16);
    await txt(cl.p, 10, false, C.textSecondary, row, xs[2], 16);
    await txt(cl.pic, 11, false, C.textPrimary, row, xs[3], 16);
    await txt(cl.hp, 10, false, C.textSecondary, row, xs[4], 16);
    await txt(cl.s, 11, true, C.accent, row, xs[5], 16);
    await txt(cl.exp, 10, false, C.textSecondary, row, xs[6], 16);
    await badge(cl.st, C.success, C.surface3, row, xs[7], 14);
    cy += 56;
  }
}

// 7. SEC-04
async function render_SEC_04(c) {
  const f = frame("F", 840, 620, C.surface1, c, 32, 86, 8, C.border);
  await txt("SEC-04: Registrasi Klien Baru (Tepat 7 Field Kontrak)", 14, true, C.textPrimary, f, 28, 24);
  await fieldBox("1. Nama Perusahaan (company_name)*", "PT Astra Agro Lestari Tbk", 780, f, 28, 70);
  await fieldBox("2. NPWP Perusahaan 16 Digit (npwp)*", "01.312.456.7-042.000", 380, f, 28, 144);
  await fieldBox("3. Alamat Penagihan Faktur (billing_address)*", "Menara Astra Lt. 18, Jl. Jend. Sudirman Kav 5-6", 780, f, 28, 218);
  await fieldBox("4. Nama PIC Klien (pic_name)*", "Ir. Budi Hartono, M.M.", 380, f, 28, 292);
  await fieldBox("5. Nomor Telepon PIC (pic_phone)*", "0811-2345-6789", 380, f, 428, 292);
  await fieldBox("6. Email Resmi PIC (pic_email)*", "budi.hartono@astra-agro.co.id", 380, f, 28, 366);
  await fieldBox("7. Tanggal Berakhir Kontrak (contract_end_date)*", "31/12/2027", 380, f, 428, 366);
  const btn = frame("B", 240, 44, C.accent, f, 28, 460, 6);
  await txt("Simpan & Terbitkan Kontrak", 12, true, C.black, btn, 36, 14);
}

// 8. SEC-05
async function render_SEC_05(c) {
  const t = frame("T", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("Master Lokasi Pos Jaga Pengamanan (38 Sites Aktif)", 14, true, C.textPrimary, t, 20, 20);
  const head = frame("Th", 1076, 36, C.surface2, t, 20, 56, 4);
  const cols = ["KODE", "NAMA POS JAGA (SITE)", "KLIEN MITRA", "KOORDINAT GPS", "KUOTA SHIFT", "TARIF / PERSONEL", "STATUS"];
  const xs = [14, 100, 360, 560, 740, 880, 1000];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const sites = [
    { c: "STE-001", n: "Pos Komando Menara Astra", k: "PT Astra Agro Lestari", gps: "-6.208821, 106.822532", q: "8 Orang / Shift", r: "Rp 6.800.000", st: "Aktif" },
    { c: "STE-002", n: "Pabrik Unilever Cikarang", k: "PT Unilever Indonesia", gps: "-6.312901, 107.142890", q: "12 Orang / Shift", r: "Rp 6.500.000", st: "Aktif" },
    { c: "STE-003", n: "Gudang Logistik Cakung", k: "PT Indofood CBP", gps: "-6.175401, 106.945112", q: "6 Orang / Shift", r: "Rp 6.200.000", st: "Aktif" },
    { c: "STE-004", n: "Kantor Pusat Mandiri Gatot Subroto", k: "PT Bank Mandiri", gps: "-6.234102, 106.821098", q: "10 Orang / Shift", r: "Rp 7.000.000", st: "Aktif" }
  ];
  let sy = 100;
  for (const s of sites) {
    const row = frame("SRow", 1076, 50, C.surface2, t, 20, sy, 4);
    await txt(s.c, 11, true, C.accent, row, xs[0], 16);
    await txt(s.n, 11, true, C.textPrimary, row, xs[1], 16);
    await txt(s.k, 10, false, C.textSecondary, row, xs[2], 16);
    await txt(s.gps, 10, false, C.info, row, xs[3], 16);
    await txt(s.q, 11, false, C.textPrimary, row, xs[4], 16);
    await txt(s.r, 11, true, C.accent, row, xs[5], 16);
    await badge(s.st, C.success, C.surface3, row, xs[6], 14);
    sy += 56;
  }
}

// 9. SEC-06
async function render_SEC_06(c) {
  const f = frame("F", 840, 620, C.surface1, c, 32, 86, 8, C.border);
  await txt("SEC-06: Tambah Lokasi Jaga Baru (Tepat 7 Field Operasional)", 14, true, C.textPrimary, f, 28, 24);
  await fieldBox("1. Relasi Klien Mitra (client_id)*", "PT Astra Agro Lestari Tbk (KLN-001)", 780, f, 28, 70);
  await fieldBox("2. Nama Lokasi / Site (name)*", "Pos Komando Menara Astra Sudirman", 780, f, 28, 144);
  await fieldBox("3. Alamat Lengkap Pos Jaga (address)*", "Lobby Utama & Basemen B1-B3, Jl. Jend Sudirman Kav 5", 780, f, 28, 218);
  await fieldBox("4. Koordinat GPS (latitude, longitude)*", "-6.208821, 106.822532", 380, f, 28, 292);
  await fieldBox("5. Kuota Personel per Shift (required_personnel)*", "8 Personel / Shift", 380, f, 428, 292);
  await fieldBox("6. Tarif Bulanan per Personel (monthly_rate)*", "Rp 6.800.000 / Personel", 380, f, 28, 366);
  await fieldBox("7. Status Operasional (status)*", "Active (Aktif)", 380, f, 428, 366);
  const btn = frame("B", 240, 44, C.accent, f, 28, 460, 6);
  await txt("Simpan Lokasi Pos Jaga", 12, true, C.black, btn, 44, 14);
}

// 10. SEC-07
async function render_SEC_07(c) {
  const card = frame("C", 1116, 680, C.surface1, c, 32, 86, 8, C.border);
  await txt("SEC-07: Master Checkpoint & Stiker QR Patroli Satpam", 14, true, C.textPrimary, card, 24, 20);
  const pBtn = frame("PB", 240, 36, C.accent, card, 1116 - 264, 20, 6);
  await txt("Ekspor / Cetak Stiker QR (PDF)", 11, true, C.black, pBtn, 24, 10);
  const cps = [
    { o: "#1", c: "CP-AST-01", n: "Pintu Masuk Lobby Barat", l: "Lantai Dasar", h: "sha256:7f83b1657ff1fc53b92dc18148a1d65d" },
    { o: "#2", c: "CP-AST-02", n: "Pintu Darurat Basemen B2", l: "Basemen B2 Zona C", h: "sha256:88d4266fd4e6338d13b845fcf289579d" },
    { o: "#3", c: "CP-AST-03", n: "Gardu Trafo & Genset", l: "Basemen B3 Sentral", h: "sha256:99a831e14571de4a23b98217cf29412a" }
  ];
  let cy = 76;
  for (const cp of cps) {
    const box = frame("CP", 1068, 120, C.surface2, card, 24, cy, 6, C.border);
    const qr = frame("QR", 90, 90, C.surface3, box, 16, 15, 6);
    await txt("■ ■ ■\n■ □ ■\n■ ■ ■", 12, true, C.accent, qr, 20, 18);
    await txt(`Urutan Rute: ${cp.o}  •  Kode Titik: ${cp.c}`, 13, true, C.textPrimary, box, 124, 20);
    await txt(`Nama Checkpoint: ${cp.n}`, 12, false, C.textPrimary, box, 124, 44);
    await txt(`Area: ${cp.l}  •  QR Hash: ${cp.h}`, 10, false, C.textSecondary, box, 124, 70);
    await badge("STATUS: AKTIF", C.success, C.surface1, box, 920, 20);
    cy += 134;
  }
}

// 11. SEC-08
async function render_SEC_08(c) {
  const card = frame("C", 1116, 680, C.surface1, c, 32, 86, 8, C.border);
  await txt("SEC-08: Jadwal Jaga (Rostering Grid) — Pos Menara Astra (Okt 2026)", 14, true, C.textPrimary, card, 24, 20);
  await txt("Legenda: [P] Pagi (07:00-15:00) | [S] Siang (15:00-23:00) | [M] Malam (23:00-07:00) | [OFF] Libur", 11, false, C.accent, card, 24, 42);
  const head = frame("H", 1068, 36, C.surface2, card, 24, 76, 4);
  await txt("PERSONEL SATPAM", 10, true, C.textSecondary, head, 14, 12);
  let dx = 220;
  for (let d = 1; d <= 14; d++) {
    await txt(`TGL ${d}`, 9, true, C.textSecondary, head, dx, 12);
    dx += 58;
  }
  const sats = [
    { n: "Bripka Hendra (Danru)", p: ["P", "P", "S", "S", "M", "M", "OFF", "P", "P", "S", "S", "M", "M", "OFF"] },
    { n: "Agus Santoso", p: ["S", "S", "M", "M", "OFF", "P", "P", "S", "S", "M", "M", "OFF", "P", "P"] },
    { n: "Joko Susilo", p: ["M", "M", "OFF", "P", "P", "S", "S", "M", "M", "OFF", "P", "P", "S", "S"] },
    { n: "Bambang P.", p: ["OFF", "P", "P", "S", "S", "M", "M", "OFF", "P", "P", "S", "S", "M", "M"] }
  ];
  let gy = 118;
  for (const s of sats) {
    const srow = frame("SR", 1068, 44, C.surface2, card, 24, gy, 4);
    await txt(s.n, 10, true, C.textPrimary, srow, 14, 14);
    let px = 220;
    for (const sh of s.p) {
      let col = sh === "P" ? C.info : sh === "S" ? C.warning : sh === "M" ? C.danger : C.textSecondary;
      await badge(sh, col, C.surface1, srow, px, 10);
      px += 58;
    }
    gy += 50;
  }
  const qrow = frame("QR", 1068, 44, C.surface3, card, 24, gy + 10, 4);
  await txt("PEMENUHAN KUOTA SLA (8/8)", 10, true, C.success, qrow, 14, 14);
  let qx = 220;
  for (let d = 1; d <= 14; d++) {
    await txt("100%", 10, true, C.success, qrow, qx + 8, 14);
    qx += 58;
  }
}

// 12. SEC-09
async function render_SEC_09(c) {
  const f = frame("F", 840, 560, C.surface1, c, 32, 86, 8, C.border);
  await txt("SEC-09: Plotting Jadwal Baru & Deteksi Bentrok Shift", 14, true, C.textPrimary, f, 28, 24);
  await fieldBox("Pilih Pos Jaga (Site)*", "STE-001 (Menara Astra Sudirman)", 780, f, 28, 70);
  await fieldBox("Pilih Personel Satpam*", "Bripka (Purn) Hendra Wijaya", 380, f, 28, 144);
  await fieldBox("Pilih Shift Jaga*", "Shift Pagi (07:00 - 15:00)", 380, f, 428, 144);
  await fieldBox("Tanggal Penugasan*", "25/10/2026", 380, f, 28, 218);
  await fieldBox("Status Penugasan*", "Scheduled (Terjadwal)", 380, f, 428, 218);
  const alert = frame("Alt", 780, 50, C.surface2, f, 28, 300, 6, C.danger);
  await txt("Peringatan: KONFLIK JADWAL: UNIQUE(personnel_id, date) — Hendra Wijaya telah diplot pada shift lain di tanggal ini!", 11, true, C.danger, alert, 16, 16);
  const btn = frame("B", 240, 44, C.accent, f, 28, 390, 6);
  await txt("Simpan Jadwal Penugasan", 12, true, C.black, btn, 38, 14);
}

// 13. SEC-10
async function render_SEC_10(c) {
  const t = frame("T", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("SEC-10: Persetujuan BKO (Bantuan Kendali Operasi) Darurat", 14, true, C.textPrimary, t, 20, 20);
  const head = frame("Th", 1076, 36, C.surface2, t, 20, 56, 4);
  const cols = ["NAMA PERSONEL", "SITE ASAL", "SITE TUJUAN BKO", "RENTANG TANGGAL", "ALASAN PENUGASAN", "STATUS", "AKSI ATOMIK"];
  const xs = [14, 200, 380, 560, 740, 910, 990];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const bkos = [
    { n: "Bripka Hendra Wijaya", o: "Menara Astra", tg: "JCC Senayan KTT", d: "20/10 - 24/10/2026", r: "Pengamanan VVIP KTT", st: "Pending" },
    { n: "Serda Joko Susilo", o: "Gudang Cakung", tg: "Bandara Soetta", d: "22/10 - 25/10/2026", r: "Pengawalan Logistik Emas", st: "Pending" },
    { n: "Bambang Pamungkas", o: "Grand Indonesia", tg: "Lobby Menara", d: "18/10 - 19/10/2026", r: "BKO Unjuk Rasa", st: "Approved" }
  ];
  let by = 100;
  for (const b of bkos) {
    const row = frame("BRow", 1076, 50, C.surface2, t, 20, by, 4);
    await txt(b.n, 11, true, C.textPrimary, row, xs[0], 16);
    await txt(b.o, 10, false, C.textSecondary, row, xs[1], 16);
    await txt(b.tg, 11, false, C.accent, row, xs[2], 16);
    await txt(b.d, 10, false, C.textSecondary, row, xs[3], 16);
    await txt(b.r, 10, false, C.textPrimary, row, xs[4], 16);
    await badge(b.st, b.st === "Pending" ? C.warning : C.success, C.surface3, row, xs[5], 14);
    const actBtn = frame("ABtn", 74, 24, b.st === "Pending" ? C.accent : C.surface3, row, xs[6], 13, 4);
    await txt(b.st === "Pending" ? "Setujui" : "Selesai", 10, true, b.st === "Pending" ? C.black : C.textSecondary, actBtn, 14, 5);
    by += 56;
  }
}

// 14. PSB-01
async function render_PSB_01(c) {
  const t = frame("T", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("PSB-01: Penerimaan Satpam Baru (Pipeline Seleksi)", 14, true, C.textPrimary, t, 20, 20);
  const head = frame("Th", 1076, 36, C.surface2, t, 20, 56, 4);
  const cols = ["NIK & NAMA PELAMAR", "GENDER", "NO TELP", "GADA", "SKOR KESAMAPTAAN", "TAHAPAN SELEKSI", "STATUS KONVERSI"];
  const xs = [14, 260, 360, 500, 640, 800, 950];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const apps = [
    { n: "Fajar Nugraha (3201198822001)", g: "Pria", hp: "0812-9988-7766", gd: "Gada Pratama", sk: "88.5 / 100", th: "Wawancara", st: "Siap Konversi" },
    { n: "Irfan Maulana (3201198822045)", g: "Pria", hp: "0813-1122-3344", gd: "Belum Ada", sk: "92.0 / 100", th: "Tes Fisik", st: "Diproses" },
    { n: "Siti Rahayu (3201198822089)", g: "Wanita", hp: "0815-4455-6677", gd: "Gada Pratama", sk: "95.0 / 100", th: "Diterima", st: "Dikonversi (SEC-02)" }
  ];
  let ay = 100;
  for (const a of apps) {
    const row = frame("ARow", 1076, 50, C.surface2, t, 20, ay, 4);
    await txt(a.n, 11, true, C.textPrimary, row, xs[0], 16);
    await txt(a.g, 11, false, C.textSecondary, row, xs[1], 16);
    await txt(a.hp, 10, false, C.textSecondary, row, xs[2], 16);
    await txt(a.gd, 10, false, C.textPrimary, row, xs[3], 16);
    await txt(a.sk, 11, true, C.accent, row, xs[4], 16);
    await badge(a.th, C.info, C.surface3, row, xs[5], 14);
    await badge(a.st, a.st.includes("Dikonversi") ? C.success : C.warning, C.surface3, row, xs[6], 14);
    ay += 56;
  }
}

// 15. PSB-02
async function render_PSB_02(c) {
  const f = frame("F", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("PSB-02: Evaluasi Kandidat & Konversi Satu-Klik ke Personel Satpam", 14, true, C.textPrimary, f, 24, 20);
  const pL = frame("PL", 520, 540, C.surface2, f, 24, 60, 6);
  await txt("VERIFIKASI BERKAS FISIK PELAMAR", 11, true, C.accent, pL, 20, 20);
  const docs = [
    " KTP Asli & Kartu Keluarga (Terverifikasi Dukcapil)",
    " SKCK Aktif dari Polres Setempat (Bebas Kriminal)",
    " Surat Bebas Narkoba & Sehat Jasmani RS Bhayangkara",
    " Ijazah Formal Terakhir (SMA/SMK Negeri 1 Bogor)",
    " Ijazah Pelatihan Gada Pratama Mabes Polri"
  ];
  let dy = 50;
  for (const d of docs) {
    await txt(d, 11, false, C.textPrimary, pL, 20, dy);
    dy += 36;
  }
  const pR = frame("PR", 520, 540, C.surface2, f, 568, 60, 6);
  await txt("HASIL UJIAN SELEKSI & KONVERSI", 11, true, C.accent, pR, 20, 20);
  await fieldBox("Skor Kesamaptaan Fisik (Lari, Push-up, Sit-up)*", "92.5 / 100 (Sangat Baik)", 480, pR, 20, 50);
  await fieldBox("Catatan Wawancara Penguji*", "Disiplin tinggi, mantan anggota paskibra, loyal", 480, pR, 20, 130);
  const cBtn = frame("CBtn", 480, 50, C.accent, pR, 20, 230, 6);
  await txt("Konversi ke Draf Personil Satpam Baru (SEC-02)", 12, true, C.black, cBtn, 60, 16);
  await txt("Otomatis menduplikasi seluruh biodata pelamar ke master personil tanpa entri ulang.", 10, false, C.textSecondary, pR, 20, 290);
}

// 16. LOG-01
async function render_LOG_01(c) {
  const card = frame("C", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("LOG-01: Gudang Logistik Pusat & Perlengkapan Jaga", 14, true, C.textPrimary, card, 24, 20);
  await txt("Valuasi: Rp 184.250.000  •  6 Item di Bawah Batas Minimum", 11, false, C.warning, card, 24, 42);
  const head = frame("H", 1068, 36, C.surface2, card, 24, 76, 4);
  const cols = ["KODE", "NAMA BARANG", "KATEGORI", "UKURAN", "STOK SAAT INI", "MINIMUM", "HARGA SATUAN", "STATUS"];
  const xs = [14, 140, 360, 520, 620, 750, 860, 970];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const items = [
    { c: "SRG-PDL-01", n: "Seragam PDL Satpam Lengkap", cat: "Seragam PDL", sz: "L", stk: "12 Stel", min: "25 Stel", pr: "Rp 275.000", al: true },
    { c: "SRG-PDH-02", n: "Seragam PDH Putih", cat: "Seragam PDH", sz: "XL", stk: "8 Stel", min: "20 Stel", pr: "Rp 240.000", al: true },
    { c: "SPT-BOT-01", n: "Sepatu Boot Tactical", cat: "Sepatu Boot", sz: "42", stk: "5 Pasang", min: "15 Pasang", pr: "Rp 350.000", al: true },
    { c: "ALT-BRG-01", n: "Borgol Baja Standard", cat: "Borgol", sz: "All Size", stk: "42 Pcs", min: "10 Pcs", pr: "Rp 85.000", al: false },
    { c: "ALT-TKT-01", n: "Tongkat T Fiber", cat: "Tongkat T", sz: "60 cm", stk: "35 Pcs", min: "10 Pcs", pr: "Rp 65.000", al: false },
    { c: "COM-HT-01", n: "Handy Talky Dual Band", cat: "Handy Talky", sz: "Unit", stk: "18 Unit", min: "8 Unit", pr: "Rp 650.000", al: false }
  ];
  let wy = 120;
  for (const it of items) {
    const row = frame("WRow", 1068, 48, C.surface2, card, 24, wy, 4);
    await txt(it.c, 11, true, C.textPrimary, row, xs[0], 14);
    await txt(it.n, 11, false, C.textPrimary, row, xs[1], 14);
    await txt(it.cat, 10, false, C.textSecondary, row, xs[2], 14);
    await txt(it.sz, 10, false, C.textSecondary, row, xs[3], 14);
    await txt(it.stk, 11, true, it.al ? C.danger : C.textPrimary, row, xs[4], 14);
    await txt(it.min, 10, false, C.textSecondary, row, xs[5], 14);
    await txt(it.pr, 11, false, C.accent, row, xs[6], 14);
    await badge(it.al ? "KRITIS" : "AMAN", it.al ? C.danger : C.success, C.surface3, row, xs[7], 12);
    wy += 56;
  }
}

// 17. LOG-02
async function render_LOG_02(c) {
  const f = frame("F", 840, 680, C.surface1, c, 32, 86, 8, C.border);
  await txt("LOG-02: Registrasi Item Perlengkapan Baru (Tepat 9 Field)", 14, true, C.textPrimary, f, 28, 24);
  await fieldBox("1. Kode Item Unik (code)*", "SRG-PDL-XXL", 380, f, 28, 70);
  await fieldBox("2. Nama Barang (name)*", "Seragam PDL Satpam Ukuran Jumbo", 380, f, 428, 70);
  await fieldBox("3. Kategori Perlengkapan (category)*", "Seragam PDL", 380, f, 28, 144);
  await fieldBox("4. Satuan Unit (unit)*", "Stel", 180, f, 428, 144);
  await fieldBox("5. Ukuran (size)*", "XXL", 180, f, 628, 144);
  await fieldBox("6. Kuantitas Stok Awal (initial_stock)*", "50 Stel", 380, f, 28, 218);
  await fieldBox("7. Batas Stok Minimum (minimum_stock)*", "15 Stel", 380, f, 428, 218);
  await fieldBox("8. Harga Satuan Perolehan (unit_price)*", "Rp 290.000 / Stel", 380, f, 28, 292);
  await fieldBox("9. Keterangan / Spesifikasi (notes)*", "Bahan ripstop serat baja anti sobek standard Mabes Polri", 780, f, 28, 366);
  const btn = frame("B", 240, 44, C.accent, f, 28, 460, 6);
  await txt("Simpan Item Logistik", 12, true, C.black, btn, 54, 14);
}

// 18. LOG-03
async function render_LOG_03(c) {
  const card = frame("C", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("LOG-03: Kartu Stok (Stock Card Ledger) — SRG-PDL-01", 14, true, C.textPrimary, card, 24, 20);
  await txt("Mutasi Kronologis Saldo Berjalan (Running Balance)", 11, false, C.accent, card, 24, 42);
  const head = frame("H", 1068, 36, C.surface2, card, 24, 76, 4);
  const cols = ["TANGGAL", "NO REFERENSI", "JENIS MUTASI", "PENERIMA / ALOKASI", "MASUK", "KELUAR", "SALDO AKHIR"];
  const xs = [14, 180, 360, 540, 740, 850, 960];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const mv = [
    { t: "19/10/2026 09:30", r: "DST-2026-10-042", ty: "Keluar (Distribusi)", a: "Personel: Hendra Wijaya", in: "-", out: "2 Stel", b: "12 Stel" },
    { t: "15/10/2026 14:00", r: "DST-2026-10-019", ty: "Keluar (Distribusi)", a: "Site Menara Astra", in: "-", out: "10 Stel", b: "14 Stel" },
    { t: "01/10/2026 08:00", r: "PO-2026-09-088", ty: "Masuk (Pembelian)", a: "Supplier Garmen Mandiri", in: "+50 Stel", out: "-", b: "24 Stel" }
  ];
  let my = 120;
  for (const m of mv) {
    const row = frame("MRow", 1068, 48, C.surface2, card, 24, my, 4);
    await txt(m.t, 10, false, C.textSecondary, row, xs[0], 16);
    await txt(m.r, 11, true, C.textPrimary, row, xs[1], 16);
    await badge(m.ty, m.ty.includes("Keluar") ? C.danger : C.success, C.surface3, row, xs[2], 12);
    await txt(m.a, 11, false, C.textPrimary, row, xs[3], 16);
    await txt(m.in, 11, true, C.success, row, xs[4], 16);
    await txt(m.out, 11, true, C.danger, row, xs[5], 16);
    await txt(m.b, 12, true, C.accent, row, xs[6], 16);
    my += 56;
  }
}

// 19. LOG-04
async function render_LOG_04(c) {
  const f = frame("F", 840, 620, C.surface1, c, 32, 86, 8, C.border);
  await txt("LOG-04: Edit Barang Logistik & Penyesuaian Safety Stock", 14, true, C.textPrimary, f, 28, 24);
  await fieldBox("Kode Item (Terkunci)", "SRG-PDL-01", 380, f, 28, 70);
  await fieldBox("Nama Barang", "Seragam PDL Satpam Lengkap Atribut", 380, f, 428, 70);
  await fieldBox("Batas Minimum Safety Stock*", "25 Stel", 380, f, 28, 144);
  await fieldBox("Harga Satuan Perolehan*", "Rp 275.000 / Stel", 380, f, 428, 144);
  await fieldBox("Catatan Logistik*", "Periksa berkala kualitas jahitan kopel dan kancing seragam", 780, f, 28, 218);
  const btn = frame("B", 240, 44, C.accent, f, 28, 300, 6);
  await txt("Simpan Perubahan Barang", 12, true, C.black, btn, 42, 14);
}

// 20. LOG-05
async function render_LOG_05(c) {
  const f = frame("F", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("LOG-05: Distribusi Perlengkapan Jaga & Auto-Journaling Beban", 14, true, C.textPrimary, f, 24, 20);
  await fieldBox("Alokasi Pengeluaran*", "Kepada Pos Jaga: Menara Astra Sudirman", 420, f, 24, 60);
  await fieldBox("Nama Penerima / Danru*", "Bripka (Purn) Hendra Wijaya", 300, f, 460, 60);
  await fieldBox("Tanggal Distribusi*", "19/10/2026", 280, f, 780, 60);
  const head = frame("H", 1068, 36, C.surface2, f, 24, 140, 4);
  await txt("ITEM LOGISTIK", 10, true, C.textSecondary, head, 16, 12);
  await txt("STOK TERSEDIA", 10, true, C.textSecondary, head, 360, 12);
  await txt("KUANTITAS KELUAR", 10, true, C.textSecondary, head, 540, 12);
  await txt("HARGA SATUAN", 10, true, C.textSecondary, head, 740, 12);
  await txt("SUBTOTAL BEBAN", 10, true, C.textSecondary, head, 920, 12);
  const r1 = frame("R1", 1068, 44, C.surface2, f, 24, 184, 4);
  await txt("Seragam PDL Lengkap (SRG-PDL-01)", 11, true, C.textPrimary, r1, 16, 14);
  await txt("14 Stel", 11, false, C.textSecondary, r1, 360, 14);
  await txt("2 Stel", 11, true, C.accent, r1, 540, 14);
  await txt("Rp 275.000", 11, false, C.textPrimary, r1, 740, 14);
  await txt("Rp 550.000", 12, true, C.accent, r1, 920, 14);
  const jBox = frame("JBox", 1068, 80, C.surface2, f, 24, 250, 6, C.info);
  await txt("INTEGRASI AKUNTANSI OTOMATIS (RPC process_distribution_with_journal):", 11, true, C.info, jBox, 16, 16);
  await txt("Debit: Beban Perlengkapan Satpam (Akun 51200) — Rp 550.000\nKredit: Persediaan Logistik Gudang (Akun 11300) — Rp 550.000", 11, false, C.textPrimary, jBox, 16, 38);
  const btn = frame("B", 260, 44, C.accent, f, 24, 360, 6);
  await txt("Eksekusi Distribusi & Posting Jurnal", 12, true, C.black, btn, 24, 14);
}

// 21. FIN-01
async function render_FIN_01(c) {
  const t = frame("T", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("FIN-01: Daftar Tagihan Invoice Klien Mitra BUJP", 14, true, C.textPrimary, t, 20, 20);
  const head = frame("Th", 1076, 36, C.surface2, t, 20, 56, 4);
  const cols = ["NO INVOICE", "KLIEN MITRA", "PERIODE", "JATUH TEMPO", "SUBTOTAL", "PPN 11%", "TOTAL TAGIHAN", "STATUS", "AKSI"];
  const xs = [14, 160, 360, 480, 600, 720, 830, 950, 1020];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const invs = [
    { no: "INV/2026/10/001", k: "PT Astra Agro Lestari", p: "Okt 2026", d: "25/11/2026", sub: "Rp 136.000.000", ppn: "Rp 14.960.000", tot: "Rp 148.240.000", st: "Unpaid" },
    { no: "INV/2026/10/002", k: "PT Unilever Indonesia", p: "Okt 2026", d: "15/11/2026", sub: "Rp 180.000.000", ppn: "Rp 19.800.000", tot: "Rp 196.200.000", st: "Paid" },
    { no: "INV/2026/09/088", k: "PT Indofood CBP", p: "Sep 2026", d: "10/10/2026", sub: "Rp 98.000.000", ppn: "Rp 10.780.000", tot: "Rp 106.820.000", st: "Overdue" }
  ];
  let iy = 100;
  for (const iv of invs) {
    const row = frame("IRow", 1076, 50, C.surface2, t, 20, iy, 4);
    await txt(iv.no, 11, true, C.accent, row, xs[0], 16);
    await txt(iv.k, 11, true, C.textPrimary, row, xs[1], 16);
    await txt(iv.p, 10, false, C.textSecondary, row, xs[2], 16);
    await txt(iv.d, 10, false, C.textSecondary, row, xs[3], 16);
    await txt(iv.sub, 10, false, C.textPrimary, row, xs[4], 16);
    await txt(iv.ppn, 10, false, C.textSecondary, row, xs[5], 16);
    await txt(iv.tot, 11, true, C.accent, row, xs[6], 16);
    await badge(iv.st, iv.st === "Paid" ? C.success : iv.st === "Overdue" ? C.danger : C.warning, C.surface3, row, xs[7], 14);
    await txt("PDF", 11, true, C.info, row, xs[8], 16);
    iy += 56;
  }
}

// 22. FIN-02
async function render_FIN_02(c) {
  const f = frame("F", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("FIN-02: Buat Tagihan Baru — Agregasi Personel x Tarif Kontrak", 14, true, C.textPrimary, f, 24, 20);
  await fieldBox("Klien Mitra*", "PT Astra Agro Lestari Tbk", 400, f, 24, 60);
  await fieldBox("Periode Bulan*", "Oktober 2026", 280, f, 444, 60);
  await fieldBox("Jatuh Tempo*", "25/11/2026", 280, f, 744, 60);
  const head = frame("H", 1068, 36, C.surface2, f, 24, 140, 4);
  await txt("LOKASI POS JAGA (SITE)", 10, true, C.textSecondary, head, 16, 12);
  await txt("PERSONEL SATPAM", 10, true, C.textSecondary, head, 380, 12);
  await txt("TARIF BULANAN / ORANG", 10, true, C.textSecondary, head, 600, 12);
  await txt("SUBTOTAL", 10, true, C.textSecondary, head, 840, 12);
  const r1 = frame("R1", 1068, 44, C.surface2, f, 24, 184, 4);
  await txt("Pos Komando Menara Astra Sudirman", 11, true, C.textPrimary, r1, 16, 14);
  await txt("12 Personel", 11, false, C.accent, r1, 380, 14);
  await txt("Rp 6.800.000", 11, false, C.textSecondary, r1, 600, 14);
  await txt("Rp 81.600.000", 12, true, C.textPrimary, r1, 840, 14);
  const tBox = frame("TBox", 480, 160, C.surface2, f, 612, 280, 6, C.border);
  await txt("Subtotal:               Rp 136.000.000", 11, false, C.textPrimary, tBox, 20, 20);
  await txt("+ PPN 11%:              Rp  14.960.000", 11, true, C.accent, tBox, 20, 50);
  await txt("- Potongan PPh 23 (2%): Rp   2.720.000", 11, false, C.danger, tBox, 20, 80);
  await txt("TOTAL TAGIHAN:          Rp 148.240.000", 13, true, C.success, tBox, 20, 115);
  const btn = frame("B", 340, 44, C.accent, f, 612, 460, 6);
  await txt("Terbitkan Invoice & Auto-Posting Jurnal →", 12, true, C.black, btn, 30, 14);
}

// 23. FIN-03
async function render_FIN_03(c) {
  const f = frame("F", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("FIN-03: Penggajian Personil (Payroll) — Periode Oktober 2026", 14, true, C.textPrimary, f, 24, 20);
  const kpis = [
    { l: "Total Gaji Pokok", v: "Rp 1.928.000.000" },
    { l: "Tunjangan Jabatan", v: "Rp 142.000.000" },
    { l: "Total Lembur", v: "Rp 88.500.000" },
    { l: "Potongan BPJS & Pajak", v: "Rp 114.200.000" },
    { l: "Total Net Payroll", v: "Rp 2.044.300.000" }
  ];
  let kx = 24;
  for (const k of kpis) {
    const kc = frame("KC", 200, 70, C.surface2, f, kx, 60, 6);
    await txt(k.l, 10, false, C.textSecondary, kc, 12, 12);
    await txt(k.v, 13, true, C.accent, kc, 12, 34);
    kx += 214;
  }
  const head = frame("H", 1068, 36, C.surface2, f, 24, 150, 4);
  const cols = ["NAMA & NIK", "SITE JAGA", "GAJI POKOK", "TUNJANGAN", "LEMBUR", "BPJS (1%+3%)", "PPH 21", "NET SALARY"];
  const xs = [14, 220, 360, 480, 600, 720, 840, 950];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const ps = [
    { n: "Bripka Hendra (Danru)", s: "Menara Astra", gp: "Rp 5.200.000", tj: "Rp 800.000", lm: "Rp 450.000", bp: "Rp 208.000", pp: "Rp 65.000", net: "Rp 6.177.000" },
    { n: "Agus Santoso (Chief)", s: "Pabrik Unilever", gp: "Rp 5.500.000", tj: "Rp 1.500.000", lm: "Rp 200.000", bp: "Rp 220.000", pp: "Rp 110.000", net: "Rp 6.870.000" },
    { n: "Joko Susilo (Anggota)", s: "Gudang Cakung", gp: "Rp 5.067.381", tj: "Rp 0", lm: "Rp 600.000", bp: "Rp 202.695", pp: "Rp 45.000", net: "Rp 5.419.686" }
  ];
  let py = 194;
  for (const p of ps) {
    const row = frame("PRow", 1068, 44, C.surface2, f, 24, py, 4);
    await txt(p.n, 11, true, C.textPrimary, row, xs[0], 14);
    await txt(p.s, 10, false, C.textSecondary, row, xs[1], 14);
    await txt(p.gp, 11, false, C.textPrimary, row, xs[2], 14);
    await txt(p.tj, 11, false, C.textSecondary, row, xs[3], 14);
    await txt(p.lm, 11, false, C.info, row, xs[4], 14);
    await txt(p.bp, 10, false, C.danger, row, xs[5], 14);
    await txt(p.pp, 10, false, C.danger, row, xs[6], 14);
    await txt(p.net, 12, true, C.success, row, xs[7], 14);
    py += 50;
  }
  const btn = frame("B", 300, 44, C.accent, f, 24, 380, 6);
  await txt("Posting Gaji ke Jurnal Umum →", 12, true, C.black, btn, 44, 14);
}

// 24. ACC-01
async function render_ACC_01(c) {
  const t = frame("T", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("ACC-01: Bagan Akun Standar (Chart of Accounts BUJP)", 14, true, C.textPrimary, t, 20, 20);
  const head = frame("Th", 1076, 36, C.surface2, t, 20, 56, 4);
  const cols = ["KODE AKUN", "NAMA AKUN BUKU BESAR", "KLASIFIKASI", "SALDO NORMAL", "STATUS PROTEKSI"];
  const xs = [14, 160, 460, 680, 860];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const coas = [
    { c: "11100", n: "Kas & Rekening Operasional Bank", cl: "Aset Lancar", sn: "Debit", pr: true },
    { c: "11200", n: "Piutang Usaha Tagihan Klien", cl: "Aset Lancar", sn: "Debit", pr: true },
    { c: "11300", n: "Persediaan Perlengkapan Logistik", cl: "Aset Lancar", sn: "Debit", pr: true },
    { c: "21100", n: "Utang Gaji & Upah Satpam", cl: "Liabilitas", sn: "Kredit", pr: true },
    { c: "21200", n: "Utang Iuran BPJS Ketenagakerjaan", cl: "Liabilitas", sn: "Kredit", pr: true },
    { c: "21400", n: "Utang PPN Keluaran", cl: "Liabilitas", sn: "Kredit", pr: true },
    { c: "41100", n: "Pendapatan Jasa Pengamanan Pos Jaga", cl: "Pendapatan", sn: "Kredit", pr: true },
    { c: "51100", n: "Beban Gaji & Lembur Personel Satpam", cl: "Beban Pokok", sn: "Debit", pr: true },
    { c: "51200", n: "Beban Seragam & Perlengkapan Jaga", cl: "Beban Pokok", sn: "Debit", pr: true }
  ];
  let cy = 100;
  for (const a of coas) {
    const row = frame("CRow", 1076, 44, C.surface2, t, 20, cy, 4);
    await txt(a.c, 11, true, C.accent, row, xs[0], 14);
    await txt(a.n, 11, true, C.textPrimary, row, xs[1], 14);
    await txt(a.cl, 10, false, C.textSecondary, row, xs[2], 14);
    await txt(a.sn, 11, false, a.sn === "Debit" ? C.info : C.warning, row, xs[3], 14);
    await badge("AKUN SISTEM", C.accent, C.surface3, row, xs[4], 11);
    cy += 50;
  }
}

// 25. ACC-02
async function render_ACC_02(c) {
  const f = frame("F", 840, 560, C.surface1, c, 32, 86, 8, C.border);
  await txt("ACC-02: Tambah Akun Baru (Tepat 6 Field Akuntansi)", 14, true, C.textPrimary, f, 28, 24);
  await fieldBox("1. Kode Akun Unik 5-Digit (code)*", "51300", 380, f, 28, 70);
  await fieldBox("2. Nama Akun (name)*", "Beban Pelatihan & Sertifikasi Gada", 380, f, 428, 70);
  await fieldBox("3. Kategori Klasifikasi (category)*", "Beban Operasional", 380, f, 28, 144);
  await fieldBox("4. Saldo Normal (normal_balance)*", "Debit", 380, f, 428, 144);
  await fieldBox("5. Akun Induk (parent_id)", "50000 - Beban Operasional Pusat", 380, f, 28, 218);
  await fieldBox("6. Status Akun (is_active)*", "Aktif (Dapat Digunakan Jurnal)", 380, f, 428, 218);
  const btn = frame("B", 240, 44, C.accent, f, 28, 300, 6);
  await txt("Simpan Akun COA Baru", 12, true, C.black, btn, 48, 14);
}

// 26. ACC-03
async function render_ACC_03(c) {
  const t = frame("T", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("ACC-03: Riwayat Jurnal Umum Double-Entry (Immutable Posted)", 14, true, C.textPrimary, t, 20, 20);
  const head = frame("Th", 1076, 36, C.surface2, t, 20, 56, 4);
  const cols = ["NO BUKTI JURNAL", "TANGGAL", "DESKRIPSI TRANSAKSI", "SUMBER", "SITE POS JAGA", "TOTAL NILAI", "STATUS POSTED"];
  const xs = [14, 180, 300, 580, 720, 880, 990];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const jrs = [
    { no: "JRN-2026-10-042", d: "19/10/2026", desc: "Posting Tagihan Invoice Astra Agro", s: "Invoice", st: "Menara Astra", tot: "Rp 148.240.000" },
    { no: "JRN-2026-10-041", d: "19/10/2026", desc: "Distribusi Seragam PDL BKO", s: "Logistik", st: "Menara Astra", tot: "Rp 550.000" },
    { no: "JRN-2026-10-040", d: "15/10/2026", desc: "Penggajian Satpam Tahap I", s: "Payroll", st: "Seluruh Site", tot: "Rp 2.044.300.000" }
  ];
  let jy = 100;
  for (const j of jrs) {
    const row = frame("JRow", 1076, 50, C.surface2, t, 20, jy, 4);
    await txt(j.no, 11, true, C.accent, row, xs[0], 16);
    await txt(j.d, 10, false, C.textSecondary, row, xs[1], 16);
    await txt(j.desc, 11, false, C.textPrimary, row, xs[2], 16);
    await badge(j.s, C.info, C.surface3, row, xs[3], 14);
    await txt(j.st, 10, false, C.textSecondary, row, xs[4], 16);
    await txt(j.tot, 11, true, C.textPrimary, row, xs[5], 16);
    await badge("IMMUTABLE", C.success, C.surface3, row, xs[6], 14);
    jy += 56;
  }
}

// 27. ACC-04
async function render_ACC_04(c) {
  const f = frame("F", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("ACC-04: Entri Jurnal Manual & Live Balance Checker", 14, true, C.textPrimary, f, 24, 20);
  await fieldBox("No Bukti Voucher*", "JRN/2026/10/0104", 260, f, 24, 60);
  await fieldBox("Tanggal Jurnal*", "19/10/2026", 240, f, 300, 60);
  await fieldBox("Keterangan*", "Alokasi Seragam & Sepatu BKO Astra", 528, f, 560, 60);
  const head = frame("H", 1068, 36, C.surface2, f, 24, 140, 4);
  await txt("AKUN REKENING (COA)", 10, true, C.textSecondary, head, 16, 12);
  await txt("MEMO BARIS", 10, true, C.textSecondary, head, 400, 12);
  await txt("DEBIT (RP)", 10, true, C.textSecondary, head, 720, 12);
  await txt("KREDIT (RP)", 10, true, C.textSecondary, head, 900, 12);
  const r1 = frame("R1", 1068, 44, C.surface2, f, 24, 184, 4);
  await txt("51200 - Beban Perlengkapan Satpam", 11, true, C.textPrimary, r1, 16, 14);
  await txt("Alokasi seragam BKO", 10, false, C.textSecondary, r1, 400, 14);
  await txt("Rp 15.000.000", 11, true, C.accent, r1, 720, 14);
  await txt("Rp 0", 11, false, C.textSecondary, r1, 900, 14);
  const r2 = frame("R2", 1068, 44, C.surface2, f, 24, 234, 4);
  await txt("11300 - Persediaan Logistik", 11, true, C.textPrimary, r2, 16, 14);
  await txt("Pengeluaran gudang logistik", 10, false, C.textSecondary, r2, 400, 14);
  await txt("Rp 0", 11, false, C.textSecondary, r2, 720, 14);
  await txt("Rp 15.000.000", 11, true, C.accent, r2, 900, 14);
  const bBar = frame("BBar", 1068, 54, C.surface2, f, 24, 300, 6, C.success);
  await txt("TOTAL DEBIT: Rp 15.000.000", 12, true, C.textPrimary, bBar, 20, 18);
  await txt("TOTAL KREDIT: Rp 15.000.000", 12, true, C.textPrimary, bBar, 340, 18);
  await txt("SELISIH: Rp 0 (SEIMBANG & VALID)", 12, true, C.success, bBar, 640, 18);
  const btn = frame("B", 260, 44, C.accent, f, 24, 380, 6);
  await txt("Posting Jurnal Double-Entry", 12, true, C.black, btn, 38, 14);
}

// 28. RPT-01
async function render_RPT_01(c) {
  const card = frame("C", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("RPT-01: Buku Besar (General Ledger) — Akun 11200 Piutang Usaha", 14, true, C.textPrimary, card, 24, 20);
  const head = frame("H", 1068, 36, C.surface2, card, 24, 60, 4);
  const cols = ["TANGGAL", "NO BUKTI", "KETERANGAN TRANSAKSI", "MUTASI DEBIT", "MUTASI KREDIT", "SALDO AKHIR"];
  const xs = [14, 160, 340, 620, 780, 930];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const lgs = [
    { t: "01/10/2026", b: "SALDO-AWAL", k: "Saldo Awal Piutang Usaha", d: "-", c: "-", s: "Rp 320.000.000" },
    { t: "10/10/2026", b: "JRN-10-012", k: "Penerimaan Pelunasan PT Unilever", d: "-", c: "Rp 100.000.000", s: "Rp 220.000.000" },
    { t: "19/10/2026", b: "JRN-10-042", k: "Tagihan Invoice Baru PT Astra", d: "Rp 148.240.000", c: "-", s: "Rp 368.240.000" }
  ];
  let ly = 104;
  for (const l of lgs) {
    const row = frame("LRow", 1068, 48, C.surface2, card, 24, ly, 4);
    await txt(l.t, 10, false, C.textSecondary, row, xs[0], 16);
    await txt(l.b, 11, true, C.accent, row, xs[1], 16);
    await txt(l.k, 11, false, C.textPrimary, row, xs[2], 16);
    await txt(l.d, 11, true, C.success, row, xs[3], 16);
    await txt(l.c, 11, true, C.danger, row, xs[4], 16);
    await txt(l.s, 12, true, C.textPrimary, row, xs[5], 16);
    ly += 56;
  }
}

// 29. RPT-02
async function render_RPT_02(c) {
  const card = frame("C", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("RPT-02: Buku Pembantu Piutang & Aging Schedule Klien", 14, true, C.textPrimary, card, 24, 20);
  const ag1 = frame("A1", 340, 70, C.surface2, card, 24, 60, 6);
  await txt("Lancar (0 - 30 Hari)", 11, false, C.textSecondary, ag1, 16, 12);
  await txt("Rp 320.000.000", 15, true, C.success, ag1, 16, 36);
  const ag2 = frame("A2", 340, 70, C.surface2, card, 388, 60, 6);
  await txt("Kurang Lancar (31 - 60 Hari)", 11, false, C.textSecondary, ag2, 16, 12);
  await txt("Rp 68.500.000", 15, true, C.warning, ag2, 16, 36);
  const ag3 = frame("A3", 340, 70, C.surface2, card, 752, 60, 6);
  await txt("Macet (> 60 Hari)", 11, false, C.textSecondary, ag3, 16, 12);
  await txt("Rp 24.000.000", 15, true, C.danger, ag3, 16, 36);
  const sync = frame("Sync", 1068, 44, C.surface2, card, 24, 150, 6, C.success);
  await txt("REKONSILIASI SINKRON: Total Saldo Buku Pembantu (Rp 412.500.000) == Saldo Akun 11200 Buku Besar", 11, true, C.success, sync, 20, 14);
}

// 30. RPT-03
async function render_RPT_03(c) {
  const card = frame("C", 1116, 720, C.surface1, c, 32, 86, 8, C.border);
  await txt("RPT-03: Laporan Laba Rugi SAK BUJP — Periode Oktober 2026", 14, true, C.textPrimary, card, 24, 20);
  const rpts = [
    { t: "I. PENDAPATAN JASA PENGAMANAN (41100)", v: "Rp 3.277.600.000", b: true, c: C.textPrimary },
    { t: "II. BEBAN POKOK PENDAPATAN (HPP JASA)", v: "(Rp 2.279.000.000)", b: true, c: C.textPrimary },
    { t: "   - Beban Gaji Pokok Satpam UMP/UMK (51100)", v: "Rp 1.928.000.000", b: false, c: C.textSecondary },
    { t: "   - Beban Tunjangan Danru & Lembur Operasional", v: "Rp   230.500.000", b: false, c: C.textSecondary },
    { t: "   - Beban Iuran BPJS Ketenagakerjaan & Kesehatan", v: "Rp    78.400.000", b: false, c: C.textSecondary },
    { t: "   - Beban Seragam & Perlengkapan Satpam (51200)", v: "Rp    42.100.000", b: false, c: C.textSecondary },
    { t: "LABA KOTOR (GROSS PROFIT) — 30.46%", v: "Rp   998.600.000", b: true, c: C.accent },
    { t: "III. BEBAN OPERASIONAL KANTOR PUSAT & PSB", v: "(Rp   384.200.000)", b: true, c: C.textPrimary },
    { t: "LABA BERSIH TAHUN BERJALAN (NET INCOME) — 18.74%", v: "Rp   614.400.000", b: true, c: C.success }
  ];
  let ry = 60;
  for (const r of rpts) {
    const isSum = r.t.includes("LABA");
    const rf = frame("RF", 1068, 38, isSum ? C.surface2 : null, card, 24, ry, isSum ? 4 : 0);
    await txt(r.t, isSum ? 12 : 11, r.b, isSum ? r.c : C.textPrimary, rf, 16, 11);
    await txt(r.v, isSum ? 13 : 11, r.b, r.c, rf, 860, 11);
    ry += 42;
  }
}

// 31. RPT-04
async function render_RPT_04(c) {
  const card = frame("C", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("RPT-04: Laporan Posisi Keuangan (Neraca SAK BUJP)", 14, true, C.textPrimary, card, 24, 20);
  const pA = frame("PA", 520, 480, C.surface2, card, 24, 60, 6);
  await txt("ASET (AKTIVA)", 13, true, C.accent, pA, 20, 16);
  await txt("Kas & Bank:                     Rp 1.840.000.000\nPiutang Usaha Tagihan Klien:    Rp   412.500.000\nPersediaan Seragam & Alat Jaga: Rp   184.250.000\nAset Tetap (Mobil Patroli & HT):Rp 2.413.250.000\n-------------------------------------------------\nTOTAL ASET:                     Rp 4.850.000.000", 11, true, C.textPrimary, pA, 20, 50);
  const pL = frame("PL", 520, 480, C.surface2, card, 568, 60, 6);
  await txt("LIABILITAS & EKUITAS (PASIVA)", 13, true, C.accent, pL, 20, 16);
  await txt("Utang Gaji Satpam:              Rp 1.120.000.000\nUtang BPJS & Pajak:             Rp   200.000.000\nUtang Usaha Logistik:           Rp   300.000.000\nModal Disetor:                  Rp 2.000.000.000\nSaldo Laba & Laba Berjalan:     Rp 1.230.000.000\n-------------------------------------------------\nTOTAL LIABILITAS & EKUITAS:     Rp 4.850.000.000", 11, true, C.textPrimary, pL, 20, 50);
  const val = frame("Val", 1068, 44, C.surface2, card, 24, 560, 6, C.success);
  await txt("PERSAMAAN AKUNTANSI VALID: Total Aset (Rp 4.850.000.000) == Total Liabilitas & Ekuitas (Rp 4.850.000.000)", 11, true, C.success, val, 20, 14);
}

// 32. RPT-05
async function render_RPT_05(c) {
  const card = frame("C", 1116, 680, C.surface1, c, 32, 86, 8, C.border);
  await txt("RPT-05: Laporan Perubahan Ekuitas BUJP (Tahun Berjalan)", 14, true, C.textPrimary, card, 24, 20);
  const eqLines = [
    { t: "Saldo Modal Disetor Awal Periode (01 Jan 2026)", v: "Rp 2.000.000.000" },
    { t: "Tambahan Setoran Modal Pemegang Saham", v: "Rp           0" },
    { t: "+ Laba Bersih Tahun Berjalan (Net Income RPT-03)", v: "Rp   614.400.000" },
    { t: "- Pengurangan Dividen / Prive Direksi", v: "(Rp  100.000.000)" },
    { t: "SALDO EKUITAS AKHIR PERIODE (31 OKT 2026)", v: "Rp 3.230.000.000" }
  ];
  let ey = 70;
  for (const el of eqLines) {
    const isTot = el.t.includes("SALDO EKUITAS AKHIR");
    const ef = frame("EF", 1068, 44, isTot ? C.surface2 : null, card, 24, ey, isTot ? 4 : 0);
    await txt(el.t, 12, isTot, isTot ? C.accent : C.textPrimary, ef, 20, 14);
    await txt(el.v, 13, true, isTot ? C.success : C.textPrimary, ef, 860, 14);
    ey += 50;
  }
}

// 33. RPT-06
async function render_RPT_06(c) {
  const card = frame("C", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("RPT-06: Laporan Arus Kas Metode Tidak Langsung (Indirect Method)", 14, true, C.textPrimary, card, 24, 20);
  const cfs = [
    { t: "I. ARUS KAS DARI AKTIVITAS OPERASIONAL", v: "Rp 710.000.000", b: true },
    { t: "   - Laba Bersih Periode Berjalan", v: "Rp 614.400.000", b: false },
    { t: "   - Penyusutan Aset Kendaraan Patroli", v: "Rp  45.000.000", b: false },
    { t: "   - Penurunan Piutang & Kenaikan Kas", v: "Rp  50.600.000", b: false },
    { t: "II. ARUS KAS DARI AKTIVITAS INVESTASI", v: "(Rp 120.000.000)", b: true },
    { t: "   - Pembelian Unit HT & Perlengkapan Jaga", v: "(Rp 120.000.000)", b: false },
    { t: "III. ARUS KAS DARI AKTIVITAS PENDANAAN", v: "(Rp 100.000.000)", b: true },
    { t: "KENAIKAN BERSIH KAS & BANK", v: "Rp 490.000.000", b: true },
    { t: "SALDO KAS & BANK AKHIR (SESUAI NERACA 11100)", v: "Rp 1.840.000.000", b: true }
  ];
  let cy = 60;
  for (const cf of cfs) {
    const isSum = cf.t.includes("KENAIKAN") || cf.t.includes("SALDO KAS");
    const cff = frame("CFF", 1068, 38, isSum ? C.surface2 : null, card, 24, cy, isSum ? 4 : 0);
    await txt(cf.t, isSum ? 12 : 11, cf.b, isSum ? C.accent : C.textPrimary, cff, 20, 11);
    await txt(cf.v, isSum ? 13 : 11, cf.b, isSum ? C.success : C.textPrimary, cff, 860, 11);
    cy += 42;
  }
}

// 34. RPT-07
async function render_RPT_07(c) {
  const card = frame("C", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("RPT-07: Analisa Akuntansi Manajemen — Profitabilitas per Pos Jaga", 14, true, C.textPrimary, card, 24, 20);
  await txt("Rumus: Margin Site = Invoice Site - Gaji Satpam Site - Biaya Logistik Site", 11, false, C.accent, card, 24, 42);
  const head = frame("H", 1068, 36, C.surface2, card, 24, 76, 4);
  const cols = ["KODE & NAMA SITE", "KLIEN MITRA", "PERSONEL", "TAGIHAN INVOICE", "BEBAN GAJI", "KONTRIBUSI LABA", "MARGIN (%)", "STATUS"];
  const xs = [14, 240, 420, 520, 680, 820, 940, 1000];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const sites = [
    { s: "Menara Astra Sudirman", k: "PT Astra Agro", p: "12 Org", inv: "Rp 81.600.000", g: "Rp 55.200.000", laba: "Rp 26.400.000", m: "32.35%", st: "Optimal" },
    { s: "Pabrik Unilever Pos 2", k: "PT Unilever", p: "16 Org", inv: "Rp 104.000.000", g: "Rp 72.000.000", laba: "Rp 32.000.000", m: "30.76%", st: "Optimal" },
    { s: "Gudang Logistik Cakung", k: "PT Indofood", p: "6 Org", inv: "Rp 37.200.000", g: "Rp 32.400.000", laba: "Rp  4.800.000", m: "12.90%", st: "Evaluasi" }
  ];
  let sy = 120;
  for (const st of sites) {
    const row = frame("SRow", 1068, 48, C.surface2, card, 24, sy, 4);
    await txt(st.s, 11, true, C.textPrimary, row, xs[0], 16);
    await txt(st.k, 10, false, C.textSecondary, row, xs[1], 16);
    await txt(st.p, 11, false, C.accent, row, xs[2], 16);
    await txt(st.inv, 11, false, C.textPrimary, row, xs[3], 16);
    await txt(st.g, 11, false, C.textSecondary, row, xs[4], 16);
    await txt(st.laba, 11, true, C.success, row, xs[5], 16);
    await txt(st.m, 11, true, C.accent, row, xs[6], 16);
    await badge(st.st, st.st === "Optimal" ? C.success : C.warning, C.surface3, row, xs[7], 13);
    sy += 56;
  }
}

// 35. RPT-08
async function render_RPT_08(c) {
  const card = frame("C", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("RPT-08: Balanced Scorecard (BSC) Eksekutif BUJP", 14, true, C.textPrimary, card, 24, 20);
  const q1 = frame("Q1", 520, 240, C.surface2, card, 24, 60, 6);
  await txt("1. PERSPEKTIF FINANSIAL", 12, true, C.accent, q1, 20, 16);
  await txt("• Net Profit Margin: 18.74% (Target: 18%) → ON TRACK\n• Current Ratio Likuiditas: 2.99x → AMAN\n• Kolektibilitas Invoice: 92% → LANCAR", 11, false, C.textPrimary, q1, 20, 50);
  const q2 = frame("Q2", 520, 240, C.surface2, card, 568, 60, 6);
  await txt("2. PERSPEKTIF PELANGGAN & KLIEN MITRA", 12, true, C.accent, q2, 20, 16);
  await txt("• Tingkat Retensi Mitra: 96% (23/24 Klien) → EXCELLENT\n• Pertumbuhan Sites Aktif: +12% YoY → TERCAPAI\n• Keluhan Klien Lapangan: 0 Kasus Mayor", 11, false, C.textPrimary, q2, 20, 50);
  const q3 = frame("Q3", 520, 240, C.surface2, card, 24, 320, 6);
  await txt("3. PERSPEKTIF PROSES BISNIS OPERASIONAL", 12, true, C.accent, q3, 20, 16);
  await txt("• SLA Pemenuhan Kuota Shift: 99.4% (Target 100%)\n• Kepatuhan Scan QR Patroli: 97.8% → TINGGI\n• Respon Cepat Insiden BKO: < 2 Jam", 11, false, C.textPrimary, q3, 20, 50);
  const q4 = frame("Q4", 520, 240, C.surface2, card, 568, 320, 6);
  await txt("4. PERSPEKTIF PEMBELAJARAN & KEPATUHAN POLRI", 12, true, C.accent, q4, 20, 16);
  await txt("• Kualifikasi Gada: Pratama 84% | Madya 12% | Utama 4%\n• Kepatuhan Masa Berlaku KTA Polri: 97.1% Aktif\n• Evaluasi Pelatihan Fisik: Rutin Triwulan", 11, false, C.textPrimary, q4, 20, 50);
}

// 36. SET-01
async function render_SET_01(c) {
  const f = frame("F", 1116, 730, C.surface1, c, 32, 86, 8, C.border);
  await txt("SET-01: Parameter Identitas Institusi BUJP (Tepat 22 Input Konfigurasi)", 14, true, C.textPrimary, f, 24, 20);
  await txt("SEKSI 1: LEGALITAS & KEPOLISIAN", 11, true, C.accent, f, 24, 60);
  await fieldBox("1. Nama Resmi PT BUJP*", "PT Garda Nusantara Pengamanan", 340, f, 24, 80);
  await fieldBox("2. No Izin Mabes Polri*", "SIO/2026/MBS-POLRI/BUJP-088", 260, f, 380, 80);
  await fieldBox("3. Exp Izin Mabes*", "31/12/2030", 180, f, 660, 80);
  await fieldBox("4. NPWP BUJP*", "01.234.567.8-012.000", 220, f, 860, 80);
  await fieldBox("5. NIB / SIUP*", "9120001234567", 260, f, 24, 150);
  await fieldBox("6. Alamat Kantor Pusat*", "Gedung Garda Komando Lt. 5, Jl. Gatot Subroto Kav 88, Jakarta Selatan", 500, f, 300, 150);
  await fieldBox("7. Telepon*", "021-555-8888", 160, f, 820, 150);
  await fieldBox("8. Email Resmi*", "sekretariat@garda-security.co.id", 260, f, 24, 220);
  await fieldBox("9. Website*", "https://garda-security.co.id", 240, f, 300, 220);
  await fieldBox("10. Kota*", "Jakarta Selatan", 180, f, 560, 220);
  await fieldBox("11. Kode Pos*", "12930", 120, f, 760, 220);
  await fieldBox("12. Logo Resmi URL*", "logo_garda_hd.png", 180, f, 900, 220);
  await txt("SEKSI 2: PEJABAT PENANDATANGAN DOKUMEN", 11, true, C.accent, f, 24, 290);
  await fieldBox("13. Direktur Utama*", "Mayjen (Purn) Soedirman", 260, f, 24, 310);
  await fieldBox("14. Jabatan*", "Direktur Utama", 240, f, 300, 310);
  await fieldBox("15. Manajer Keuangan*", "Dra. Siti Rahmawati, Ak.", 260, f, 560, 310);
  await fieldBox("16. Manajer Ops*", "Mayor (Purn) Bambang S.", 240, f, 840, 310);
  await txt("SEKSI 3: PAJAK, BPJS & PREFIX PENOMORAN", 11, true, C.accent, f, 24, 380);
  await fieldBox("17. Tarif PPN*", "11.00%", 140, f, 24, 400);
  await fieldBox("18. PPh 23*", "2.00%", 140, f, 180, 400);
  await fieldBox("19. BPJS Kes*", "1.00%", 140, f, 340, 400);
  await fieldBox("20. BPJS TK*", "3.00%", 140, f, 500, 400);
  await fieldBox("21. Prefix Invoice*", "INV/GARDA/{YYYY}/{MM}/", 220, f, 660, 400);
  await fieldBox("22. Prefix Jurnal*", "JRN/{YYYY}/{MM}/", 180, f, 900, 400);
  const btn = frame("B", 240, 44, C.accent, f, 24, 520, 6);
  await txt("Simpan Konfigurasi Master BUJP", 12, true, C.black, btn, 24, 14);
}

// 37. SET-02
async function render_SET_02(c) {
  const card = frame("C", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("SET-02: Visual Struktur Organisasi Komando BUJP", 14, true, C.textPrimary, card, 24, 20);
  const l1 = frame("L1", 280, 80, C.surface2, card, 418, 70, 8, C.accent);
  await txt("Mayjen (Purn) Soedirman", 12, true, C.textPrimary, l1, 16, 16);
  await txt("Direktur Utama BUJP", 10, true, C.accent, l1, 16, 36);
  const m1 = frame("M1", 240, 70, C.surface2, card, 120, 200, 6, C.border);
  await txt("Mayor (Purn) Bambang S.", 11, true, C.textPrimary, m1, 14, 12);
  await txt("Manajer Operasional & BKO", 9, true, C.info, m1, 14, 30);
  const m2 = frame("M2", 240, 70, C.surface2, card, 438, 200, 6, C.border);
  await txt("Dra. Siti Rahmawati, Ak.", 11, true, C.textPrimary, m2, 14, 12);
  await txt("Manajer Keuangan & Akuntansi", 9, true, C.success, m2, 14, 30);
  const m3 = frame("M3", 240, 70, C.surface2, card, 756, 200, 6, C.border);
  await txt("Kapten (Purn) M. Ridwan", 11, true, C.textPrimary, m3, 14, 12);
  await txt("Manajer Logistik & Gudang", 9, true, C.warning, m3, 14, 30);
  const c1 = frame("C1", 280, 70, C.surface2, card, 100, 330, 6, C.border);
  await txt("Sertu Agus Santoso (Chief)", 11, true, C.textPrimary, c1, 14, 12);
  await txt("Chief Security Wilayah Sudirman", 9, false, C.textSecondary, c1, 14, 30);
  const d1 = frame("D1", 280, 70, C.surface2, card, 100, 440, 6, C.border);
  await txt("Bripka Hendra Wijaya (Danru)", 11, true, C.textPrimary, d1, 14, 12);
  await txt("Danru Pos Menara Astra (24 Satpam)", 9, false, C.textSecondary, d1, 14, 30);
}

// 38. SET-03
async function render_SET_03(c) {
  const t = frame("T", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("SET-03: Manajemen Pengguna & Proteksi Self-Lockout", 14, true, C.textPrimary, t, 20, 20);
  const head = frame("Th", 1076, 36, C.surface2, t, 20, 56, 4);
  const cols = ["NAMA LENGKAP", "EMAIL KORPORAT", "ROLE AKSES", "STATUS", "LOGIN TERAKHIR", "AKSI KEAMANAN"];
  const xs = [14, 240, 480, 680, 800, 930];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const us = [
    { n: "Mayor (Purn) Bambang S.", e: "admin.ops@garda-security.co.id", r: "Administrator Sistem", st: "Aktif", l: "Hari Ini 14:20", me: true },
    { n: "Dra. Siti Rahmawati, Ak.", e: "siti.rahmawati@garda-security.co.id", r: "Akuntan", st: "Aktif", l: "Kemarin 18:00", me: false },
    { n: "Kapten M. Ridwan", e: "ridwan.log@garda-security.co.id", r: "Staf Logistik", st: "Aktif", l: "18/10 11:15", me: false }
  ];
  let uy = 100;
  for (const u of us) {
    const row = frame("URow", 1076, 50, C.surface2, t, 20, uy, 4);
    await txt(u.n, 11, true, C.textPrimary, row, xs[0], 16);
    await txt(u.e, 10, false, C.textSecondary, row, xs[1], 16);
    await badge(u.r, C.accent, C.surface3, row, xs[2], 14);
    await badge(u.st, C.success, C.surface3, row, xs[3], 14);
    await txt(u.l, 10, false, C.textSecondary, row, xs[4], 16);
    if (u.me) {
      const lockBtn = frame("LBtn", 130, 24, C.surface3, row, xs[5], 13, 4);
      await txt("Akun Sendiri", 10, false, C.textSecondary, lockBtn, 12, 5);
    } else {
      const actBtn = frame("ABtn", 90, 24, C.danger, row, xs[5], 13, 4);
      await txt("Nonaktifkan", 10, true, C.white, actBtn, 14, 5);
    }
    uy += 56;
  }
}

// 39. SET-04
async function render_SET_04(c) {
  const f = frame("F", 740, 520, C.surface1, c, 32, 86, 8, C.border);
  await txt("SET-04: Tambah Pengguna Baru (Tepat 5 Field)", 14, true, C.textPrimary, f, 28, 24);
  await fieldBox("1. Nama Lengkap (full_name)*", "Lettu (Purn) Teguh Santoso", 680, f, 28, 70);
  await fieldBox("2. Email Korporat (email)*", "teguh.ops@garda-security.co.id", 680, f, 28, 144);
  await fieldBox("3. Kata Sandi Awal*", "••••••••••••••••", 320, f, 28, 218);
  await fieldBox("4. Penetapan Role (role_id)*", "Manajer Operasional", 320, f, 388, 218);
  await fieldBox("5. Status Akun (is_active)*", "Aktif", 320, f, 28, 292);
  const btn = frame("B", 240, 44, C.accent, f, 28, 380, 6);
  await txt("Buat Akun Pengguna", 12, true, C.black, btn, 56, 14);
}

// 40. SET-05
async function render_SET_05(c) {
  const t = frame("T", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("SET-05: Manajemen Role & Izin Granular (RBAC)", 14, true, C.textPrimary, t, 20, 20);
  const head = frame("Th", 1076, 36, C.surface2, t, 20, 56, 4);
  const cols = ["NAMA ROLE SISTEM", "TIPE", "DESKRIPSI TANGGUNG JAWAB", "CAKUPAN MODUL", "TOTAL USER", "AKSI"];
  const xs = [14, 220, 340, 720, 880, 990];
  for (let i = 0; i < cols.length; i++) await txt(cols[i], 10, true, C.textSecondary, head, xs[i], 12);
  const rls = [
    { n: "Administrator Sistem", t: "SYSTEM", d: "Akses komando penuh seluruh modul dan database", c: "8/8 Modul", u: "2 Staf" },
    { n: "Manajer Operasional", t: "SYSTEM", d: "Kelola personel satpam, roster, dan approval BKO", c: "3/8 Modul", u: "4 Staf" },
    { n: "Akuntan & Finance", t: "SYSTEM", d: "Kelola tagihan invoice, payroll gaji, dan jurnal", c: "4/8 Modul", u: "3 Staf" },
    { n: "Staf Logistik", t: "SYSTEM", d: "Kelola gudang seragam, kartu stok, dan distribusi", c: "2/8 Modul", u: "2 Staf" }
  ];
  let ry = 100;
  for (const r of rls) {
    const row = frame("RRow", 1076, 50, C.surface2, t, 20, ry, 4);
    await txt(r.n, 11, true, C.textPrimary, row, xs[0], 16);
    await badge(r.t, C.accent, C.surface3, row, xs[1], 14);
    await txt(r.d, 10, false, C.textSecondary, row, xs[2], 16);
    await txt(r.c, 11, true, C.info, row, xs[3], 16);
    await txt(r.u, 11, false, C.textPrimary, row, xs[4], 16);
    await txt("Edit Matriks", 11, true, C.accent, row, xs[5], 16);
    ry += 56;
  }
}

// 41 & 42. SET-06 / SET-07
async function render_SET_06_07(c, isEdit) {
  const f = frame("F", 1116, 730, C.surface1, c, 32, 86, 8, C.border);
  await txt(isEdit ? "SET-07: Edit Matriks Izin Role (Tepat 18 Input Pengaturan)" : "SET-06: Buat Role Baru — Matriks 16 Checkbox Granular", 14, true, C.textPrimary, f, 24, 20);
  await fieldBox("1. Nama Role (name)*", isEdit ? "Manajer Operasional Lapangan" : "Role Staf Koordinator Wilayah", 500, f, 24, 60);
  await fieldBox("2. Deskripsi Role (description)*", "Wewenang plotting shift, mutasi personil, dan penugasan BKO", 500, f, 560, 60);
  await txt("MATRIKS 16 CHECKBOX IZIN GRANULAR (8 MODUL x 2 KOLOM AKSI)", 11, true, C.accent, f, 24, 150);
  const head = frame("H", 1068, 36, C.surface2, f, 24, 174, 4);
  await txt("MODUL BISNIS BUJP", 10, true, C.textSecondary, head, 16, 12);
  await txt("IZIN LIHAT (can_view)", 10, true, C.textSecondary, head, 500, 12);
  await txt("IZIN KELOLA/INPUT (can_manage)", 10, true, C.textSecondary, head, 800, 12);
  const mods = [
    { n: "1. Operasional Pengamanan (security)", v: true, m: true },
    { n: "2. Rekrutmen Satpam (recruitment)", v: true, m: false },
    { n: "3. Logistik & Gudang (logistics)", v: true, m: false },
    { n: "4. Keuangan Operasional (finance)", v: false, m: false },
    { n: "5. Akuntansi Inti (accounting)", v: false, m: false },
    { n: "6. Laporan Keuangan SAK (reports)", v: true, m: false },
    { n: "7. Manajemen Pengguna (users)", v: false, m: false },
    { n: "8. Konfigurasi Institusi (institution)", v: false, m: false }
  ];
  let my = 216;
  for (const m of mods) {
    const row = frame("MRow", 1068, 44, C.surface2, f, 24, my, 4);
    await txt(m.n, 11, true, C.textPrimary, row, 16, 14);
    await txt(m.v ? "View Diizinkan" : "Akses Ditolak", 11, false, m.v ? C.success : C.textSecondary, row, 500, 14);
    await txt(m.m ? "Manage Diizinkan" : "Akses Ditolak", 11, false, m.m ? C.accent : C.textSecondary, row, 800, 14);
    my += 50;
  }
  const btn = frame("B", 240, 44, C.accent, f, 24, 640, 6);
  await txt("Simpan Matriks Izin Role", 12, true, C.black, btn, 44, 14);
}

// 43. SET-08
async function render_SET_08(c) {
  const card = frame("C", 1116, 700, C.surface1, c, 32, 86, 8, C.border);
  await txt("SET-08: Manajemen Backup & Danger Zone Disaster Recovery", 14, true, C.textPrimary, card, 24, 20);
  const top = frame("Top", 1068, 70, C.surface2, card, 24, 60, 6, C.border);
  await txt("Database PostgreSQL: 428 MB  •  Enkripsi: AES-256 Valid  •  Backup Terakhir: Hari Ini 04:00 WIB", 11, true, C.success, top, 20, 26);
  const bBtn = frame("BBtn", 240, 38, C.accent, top, 800, 16, 6);
  await txt("Trigger Backup Snapshot", 11, true, C.black, bBtn, 36, 12);
  await txt("RIWAYAT SNAPSHOT CADANGAN TERVERIFIKASI", 11, true, C.accent, card, 24, 150);
  const bTable = frame("BTable", 1068, 120, C.surface2, card, 24, 174, 6);
  await txt("SNP-2026-10-19-0400  •  428.4 MB  •  Automated Daily Cron  •  Status: VERIFIED", 11, false, C.textPrimary, bTable, 20, 20);
  await txt("SNP-2026-10-18-0400  •  426.1 MB  •  Automated Daily Cron  •  Status: VERIFIED", 11, false, C.textPrimary, bTable, 20, 66);
  const dzone = frame("DZone", 1068, 220, C.surface2, card, 24, 320, 6, C.danger);
  await txt("ZONA KRITIS: RESTORE DATABASE DARI SNAPSHOT", 13, true, C.danger, dzone, 24, 20);
  await txt("Proses ini akan menimpa seluruh data operasional dan keuangan. Pengaman ketat aktif.", 11, false, C.textSecondary, dzone, 24, 46);
  await fieldBox("Ketik ulang nama institusi secara persis:*", "PT GARDA NUSANTARA PENGAMANAN", 600, dzone, 24, 76);
  const resBtn = frame("ResBtn", 280, 44, C.danger, dzone, 650, 94, 6);
  await txt("Konfirmasi Eksekusi Restore Database", 12, true, C.white, resBtn, 48, 14);
}

// ============================================================
// MAIN CONTROLLER — ALL 42 SCREENS
// ============================================================
const ALL_SCREENS = [
  { id: "AUTH-01", t: "Portal Login BUJP", m: "Autentikasi", r: "/login", fn: render_AUTH_01 },
  { id: "DASH-01", t: "Dashboard Operasional Eksekutif", m: "Dashboard", r: "/dashboard", fn: render_DASH_01 },
  { id: "SEC-01", t: "Data Personil Security", m: "Operasional", r: "/security/personnel", fn: render_SEC_01 },
  { id: "SEC-02A", t: "Input Personil Baru (19 Field)", m: "Operasional", r: "/security/personnel/new", fn: render_SEC_02A },
  { id: "SEC-02B", t: "Edit Data Personil", m: "Operasional", r: "/security/personnel/edit/[id]", fn: render_SEC_02B },
  { id: "SEC-03", t: "Data Klien Mitra", m: "Operasional", r: "/security/clients", fn: render_SEC_03 },
  { id: "SEC-04", t: "Registrasi Klien Baru (7 Field)", m: "Operasional", r: "/security/clients/new", fn: render_SEC_04 },
  { id: "SEC-05", t: "Data Lokasi Jaga (Sites)", m: "Operasional", r: "/security/sites", fn: render_SEC_05 },
  { id: "SEC-06", t: "Tambah Lokasi Jaga (7 Field)", m: "Operasional", r: "/security/sites/new", fn: render_SEC_06 },
  { id: "SEC-07", t: "Master Checkpoint & QR Patroli", m: "Operasional", r: "/security/checkpoints", fn: render_SEC_07 },
  { id: "SEC-08", t: "Jadwal Jaga (Rostering Grid)", m: "Operasional", r: "/security/roster", fn: render_SEC_08 },
  { id: "SEC-09", t: "Plotting Jadwal Baru", m: "Operasional", r: "/security/roster/new", fn: render_SEC_09 },
  { id: "SEC-10", t: "Persetujuan BKO Request", m: "Operasional", r: "/security/bko-requests", fn: render_SEC_10 },
  { id: "PSB-01", t: "Data Pelamar PSB", m: "Rekrutmen PSB", r: "/psb/admin/applicants", fn: render_PSB_01 },
  { id: "PSB-02", t: "Detail Kandidat & Konversi", m: "Rekrutmen PSB", r: "/psb/admin/applicant-detail", fn: render_PSB_02 },
  { id: "LOG-01", t: "Gudang Logistik Pusat", m: "Logistik & Gudang", r: "/logistics/warehouse", fn: render_LOG_01 },
  { id: "LOG-02", t: "Registrasi Item Baru (9 Field)", m: "Logistik & Gudang", r: "/logistics/items/new", fn: render_LOG_02 },
  { id: "LOG-03", t: "Kartu Stok (Stock Card Ledger)", m: "Logistik & Gudang", r: "/logistics/items/detail/[id]", fn: render_LOG_03 },
  { id: "LOG-04", t: "Edit Barang Logistik", m: "Logistik & Gudang", r: "/logistics/items/edit/[id]", fn: render_LOG_04 },
  { id: "LOG-05", t: "Distribusi Perlengkapan Jaga", m: "Logistik & Gudang", r: "/logistics/distribution", fn: render_LOG_05 },
  { id: "FIN-01", t: "Tagihan Klien (Invoicing)", m: "Keuangan Operasional", r: "/finance/invoices", fn: render_FIN_01 },
  { id: "FIN-02", t: "Buat Invoice Tagihan Baru", m: "Keuangan Operasional", r: "/finance/invoice/new", fn: render_FIN_02 },
  { id: "FIN-03", t: "Penggajian Personil (Payroll)", m: "Keuangan Operasional", r: "/finance/payroll", fn: render_FIN_03 },
  { id: "ACC-01", t: "Chart of Accounts (COA)", m: "Akuntansi Inti", r: "/finance/accounting/coa", fn: render_ACC_01 },
  { id: "ACC-02", t: "Tambah Akun Baru (6 Field)", m: "Akuntansi Inti", r: "/finance/accounting/coa/new", fn: render_ACC_02 },
  { id: "ACC-03", t: "Daftar Jurnal Umum", m: "Akuntansi Inti", r: "/finance/accounting/journals", fn: render_ACC_03 },
  { id: "ACC-04", t: "Input Jurnal Manual Double-Entry", m: "Akuntansi Inti", r: "/finance/accounting/journals/new", fn: render_ACC_04 },
  { id: "RPT-01", t: "Buku Besar (General Ledger)", m: "Laporan & Analisa", r: "/finance/accounting/reports/ledger", fn: render_RPT_01 },
  { id: "RPT-02", t: "Buku Pembantu Piutang Usaha", m: "Laporan & Analisa", r: "/finance/accounting/reports/receivables", fn: render_RPT_02 },
  { id: "RPT-03", t: "Laporan Laba Rugi SAK BUJP", m: "Laporan & Analisa", r: "/finance/accounting/reports/income-statement", fn: render_RPT_03 },
  { id: "RPT-04", t: "Posisi Keuangan (Neraca)", m: "Laporan & Analisa", r: "/finance/accounting/reports/balance-sheet", fn: render_RPT_04 },
  { id: "RPT-05", t: "Laporan Perubahan Ekuitas", m: "Laporan & Analisa", r: "/finance/accounting/reports/equity-changes", fn: render_RPT_05 },
  { id: "RPT-06", t: "Laporan Arus Kas (Indirect)", m: "Laporan & Analisa", r: "/finance/accounting/reports/cash-flow", fn: render_RPT_06 },
  { id: "RPT-07", t: "Analisa Manajemen (Site Profitability)", m: "Laporan & Analisa", r: "/finance/accounting/reports/management-analysis", fn: render_RPT_07 },
  { id: "RPT-08", t: "Balanced Scorecard (BSC) BUJP", m: "Laporan & Analisa", r: "/finance/accounting/reports/balanced-scorecard", fn: render_RPT_08 },
  { id: "SET-01", t: "Identitas & Organisasi (22 Field)", m: "Pengaturan Sistem", r: "/settings/institution", fn: render_SET_01 },
  { id: "SET-02", t: "Visual Struktur Organisasi", m: "Pengaturan Sistem", r: "/settings/org-chart", fn: render_SET_02 },
  { id: "SET-03", t: "Manajemen Pengguna Sistem", m: "Pengaturan Sistem", r: "/settings/users", fn: render_SET_03 },
  { id: "SET-04", t: "Tambah Pengguna Baru (5 Field)", m: "Pengaturan Sistem", r: "/settings/users/new", fn: render_SET_04 },
  { id: "SET-05", t: "Manajemen Role & Izin (RBAC)", m: "Pengaturan Sistem", r: "/settings/roles", fn: render_SET_05 },
  { id: "SET-06", t: "Buat Role Baru (18 Field)", m: "Pengaturan Sistem", r: "/settings/roles/new", fn: (c) => render_SET_06_07(c, false) },
  { id: "SET-07", t: "Edit Role & Izin (18 Field)", m: "Pengaturan Sistem", r: "/settings/roles/edit/[id]", fn: (c) => render_SET_06_07(c, true) },
  { id: "SET-08", t: "Manajemen Backup & Restore", m: "Pengaturan Sistem", r: "/settings/backup", fn: render_SET_08 }
];

// ============================================================
// CONTROLLER & RUNNER — 42 LAYAR BUJP & LOCAL VARIABLES
// ============================================================
function findScreen(id) {
  return ALL_SCREENS.find(s => s.id.toUpperCase() === id.toUpperCase());
}

async function setupVariables() {
  try {
    if (!figma.variables || !figma.variables.createVariableCollection) {
      figma.notify("Perhatian: Versi Figma Anda belum mendukung Local Variables API.");
      return;
    }
    let col = await getCollection();
    let darkModeId, lightModeId;
    if (!col) {
      col = figma.variables.createVariableCollection("Garda Theme Tokens");
      col.renameMode(col.modes[0].modeId, "Dark");
      darkModeId = col.modes[0].modeId;
      lightModeId = col.addMode("Light");
    } else {
      darkModeId = col.modes.find(m => m.name.toLowerCase().includes("dark"))?.modeId || col.modes[0].modeId;
      let lightMode = col.modes.find(m => m.name.toLowerCase().includes("light"));
      if (!lightMode) {
        lightModeId = col.addMode("Light");
      } else {
        lightModeId = lightMode.modeId;
      }
    }

    const existingVars = await figma.variables.getLocalVariablesAsync();
    const existingMap = {};
    for (const v of existingVars) {
      if (v.variableCollectionId === col.id) existingMap[v.name] = v;
    }

    let createdCount = 0;
    for (const [name, vals] of Object.entries(GARDA_TOKENS)) {
      let v = existingMap[name];
      if (!v) {
        v = figma.variables.createVariable(name, col, "COLOR");
        createdCount++;
      }
      v.setValueForMode(darkModeId, hexToRgb(vals.dark));
      v.setValueForMode(lightModeId, hexToRgb(vals.light));
    }
    const totalCount = Object.keys(GARDA_TOKENS).length;
    figma.notify(`Setup Variables Berhasil: ${totalCount} tokens (${createdCount} baru) terdaftar di "Garda Theme Tokens"!`);
    figma.ui.postMessage({ type: 'status', message: `${totalCount} Local Variables aktif di Figma!` });
  } catch (err) {
    figma.notify(`Gagal setup variables: ${err.message}`);
  }
}

async function renderSingleScreen(sc, mode, x, y) {
  await initTokensFor(mode);
  const f = figma.createFrame();
  f.name = `[${sc.id}] ${sc.t} — ${mode.toUpperCase()}`;
  f.resize(1440, 900);
  f.x = x;
  f.y = y;
  f.fills = [C.bgCanvas];
  f.clipsContent = true;

  const contentArea = await buildShell(f, sc.id, sc.t, sc.m, sc.r);
  await sc.fn(contentArea);
  return f;
}

async function generateOne(sc, themeMode = "both") {
  await ensureFonts();
  const FRAME_WIDTH = 1440, GAP_X = 100;
  const modes = themeMode === "both" ? ["dark", "light"] : [themeMode];

  // Bersihkan frame lama milik layar ini agar tidak tumpang tindih
  const toRemove = [];
  for (const n of figma.currentPage.children) {
    if (n.name.startsWith(`[${sc.id}]`)) toRemove.push(n);
  }
  for (const n of toRemove) n.remove();

  const created = [];
  for (let idx = 0; idx < modes.length; idx++) {
    const mode = modes[idx];
    const x = idx * (FRAME_WIDTH + GAP_X);
    const y = 0;
    const f = await renderSingleScreen(sc, mode, x, y);
    created.push(f);
  }

  figma.viewport.scrollAndZoomIntoView(created);
  figma.notify(`[${sc.id}] ${sc.t} (${themeMode.toUpperCase()}) selesai dibuat.`);
  figma.ui.postMessage({ type: 'done', message: `Layar ${sc.id} selesai dibuat!` });
}

async function generateAll(themeMode = "both") {
  await ensureFonts();
  const FRAME_WIDTH = 1440, FRAME_HEIGHT = 900, GAP_X = 100, GAP_Y = 120;

  // Bersihkan frame Garda ERP sebelumnya agar rapi
  const toRemove = [];
  for (const n of figma.currentPage.children) {
    if (ALL_SCREENS.some(sc => n.name.startsWith(`[${sc.id}]`))) {
      toRemove.push(n);
    }
  }
  for (const n of toRemove) n.remove();

  const total = ALL_SCREENS.length;
  for (let i = 0; i < total; i++) {
    const sc = ALL_SCREENS[i];
    figma.ui.postMessage({
      type: "progress",
      current: i + 1,
      total: total,
      id: sc.id,
      title: sc.t
    });

    if (themeMode === "both") {
      // Row by row: Dark di kiri (x=0), Light di kanan (x=1540), y bertambah teratur tanpa tumpang tindih
      const y = i * (FRAME_HEIGHT + GAP_Y);
      await renderSingleScreen(sc, "dark", 0, y);
      await renderSingleScreen(sc, "light", FRAME_WIDTH + GAP_X, y);
    } else {
      // Grid 4 kolom untuk tema tunggal
      const col = i % 4;
      const row = Math.floor(i / 4);
      const x = col * (FRAME_WIDTH + GAP_X);
      const y = row * (FRAME_HEIGHT + GAP_Y);
      await renderSingleScreen(sc, themeMode, x, y);
    }

    // Jeda 20ms agar Figma render responsif & progress bar terupdate
    await new Promise(resolve => setTimeout(resolve, 20));
  }

  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
  figma.notify(`Sukses! Seluruh ${total} layar Garda ERP berhasil dibuat.`);
  figma.ui.postMessage({ type: "done", message: `Selesai! Seluruh ${total} layar BUJP berhasil dibuat.` });
}

figma.showUI(__html__, { width: 380, height: 460, title: "Garda ERP — Generator Mockup" });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'setup-variables') {
    await setupVariables();
  } else if (msg.type === 'generate') {
    const sc = findScreen(msg.id);
    if (!sc) {
      figma.notify(`Layar "${msg.id}" tidak ditemukan.`);
      return;
    }
    await generateOne(sc, msg.theme || 'both');
  } else if (msg.type === 'generate-all') {
    await generateAll(msg.theme || 'both');
  }
};

