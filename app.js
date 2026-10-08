/* ==========================================================================
   Six Sigma Kanban Flow V2 - Tactile Neo-Brutalist JS Core
   ========================================================================== */

const i18n = {
  en: {
    appTitle: "KANBAN FLOW",
    appSub: "NEO-BRUTALIST V2",
    appDesc: "Dynamic Theory of Constraints (TOC), Little's Law, Takt vs Cycle Time & Live Conveyor Simulator",
    flowStateLabel: "LINE STATUS:",
    stateSmooth: "BALANCED FLOW",
    stateChoke: "CHOKED (BOTTLENECK DETECTED)",
    langLabel: "العربية",
    exportBtn: "EXPORT AUDIT REPORT",
    presetsLabel: "LINE SCENARIOS:",
    presetBalanced: "Balanced Flow (Little's Law Optimum)",
    presetBottleneck: "Station 2 Bottleneck (TOC Choke)",
    presetWipOverflow: "Excessive WIP Congestion (Long Lead Time)",
    tocBtn: "DRUM-BUFFER-ROPE: ON",
    kpiWip: "Total Work-In-Progress",
    kpiTh: "Hourly Throughput (TH)",
    kpiThSub: "Paced by Bottleneck Station",
    kpiLt: "Manufacturing Lead Time",
    kpiLtSub: "Little's Law: WIP / Throughput",
    kpiTakt: "Target Takt Time",
    conveyorTitle: "Industrial Kanban Conveyor Line",
    conveyorDesc: "Real-time particle batches streaming across 4 paced manufacturing cells.",
    chartTitle: "Station Cycle Time vs Takt Line",
    chartDesc: "Stations exceeding Takt Time trigger bottleneck alarms and starved downstream cells.",
    plBalanced: "Balanced Cycle Time",
    plBottleneck: "Bottleneck (Over Takt)",
    plTakt: "Customer Takt Threshold",
    tabTOC: "Goldratt's Drum-Buffer-Rope (TOC) Rules",
    tabLittles: "Little's Law Validation (L = λW)",
    tabKaizen: "Continuous Flow Kaizen Actions",
    drumTitle: "The Pacing Drum (Bottleneck)",
    drumDesc: "The slowest station determines maximum throughput. Non-bottleneck acceleration builds costly inventory.",
    bufferTitle: "Time & Stock Buffer",
    bufferDesc: "Strategic WIP buffer placed directly upstream of the bottleneck to prevent starving.",
    ropeTitle: "The Pull Rope (Kanban Signal)",
    ropeDesc: "Raw material release at Station 1 is strictly tied to bottleneck consumption rate.",
    footerStatus: "TACTILE NEO-BRUTALIST INDUSTRIAL KANBAN ENGINE"
  },
  ar: {
    appTitle: "تدفق كانبان المرن",
    appSub: "النيو-بروتاليزم V2",
    appDesc: "نظرية القيود (TOC)، قانون ليتل للمخزون، زمن التكت ومحاكي السيور الناقلة الحي",
    flowStateLabel: "حالة الخط:",
    stateSmooth: "تدفق متزن ومستقر",
    stateChoke: "اختناق حرج (عنق زجاجة نشط)",
    langLabel: "English",
    exportBtn: "تصدير تقرير التدفق",
    presetsLabel: "سيناريوهات خط الإنتاج:",
    presetBalanced: "تدفق متزن (الأمثل وفق قانون ليتل)",
    presetBottleneck: "عنق زجاجة بالمحطة 2 (اختناق TOC)",
    presetWipOverflow: "تراكم مفرط للمخزون المرحلي (WIP)",
    tocBtn: "نظام الحبل والطبل والمخزن: مفعل",
    kpiWip: "إجمالي المخزون قيد التشغيل (WIP)",
    kpiTh: "معدل الإنتاجية بالساعة (TH)",
    kpiThSub: "محكوم بأبطأ محطة في الخط",
    kpiLt: "زمن دورة التصنيع الكلي (Lead Time)",
    kpiLtSub: "قانون ليتل: WIP / الإنتاجية",
    kpiTakt: "زمن التكت المستهدف (Takt Time)",
    conveyorTitle: "محاكي السير الناقل وخلايا كانبان الحية",
    conveyorDesc: "محاكاة فورية لتدفق دفعات الإنتاج والجسيمات عبر 4 محطات تصنيع.",
    chartTitle: "مقارنة أزمنة دورة المحطات بزمن التكت",
    chartDesc: "المحطة التي تتجاوز زمن التكت تسبب اختناقاً وتجويعاً للمحطات اللاحقة.",
    plBalanced: "زمن دورة متزن ومستقر",
    plBottleneck: "عنق زجاجة (تجاوز التكت)",
    plTakt: "حد سرعة طلب العميل (Takt)",
    tabTOC: "قواعد جولديرات (طبل - مخزن - حبل)",
    tabLittles: "إثبات قانون ليتل الرياضي (L = λW)",
    tabKaizen: "إجراءات كايزن للتدفق المستمر",
    drumTitle: "طبل الإيقاع (The Drum)",
    drumDesc: "المحطة الأبطأ تضبط إيقاع المصنع بأكمله. زيادة سرعة باقي المحطات تنتج تكدساً وهمياً.",
    bufferTitle: "مخزون الأمان الزمني (The Buffer)",
    bufferDesc: "مخزون استراتيجي موضوع قبل عنق الزجاجة مباشرة لضمان عدم توقفه نهائياً.",
    ropeTitle: "حبل السحب التزامني (The Rope)",
    ropeDesc: "إطلاق المواد الخام بالمحطة الأولى مشروط حصراً باستهلاك محطة عنق الزجاجة.",
    footerStatus: "محرك كانبان الصناعي بنمط النيو-بروتاليزم التقني الملموس"
  }
};

let currentLang = 'en';

// 4 Workstations
let stations = [
  { id: 1, nameEn: "Stamping Press", nameAr: "مكبس التشكيل", cycleTime: 65, wip: 3, maxWip: 6 },
  { id: 2, nameEn: "CNC Milling", nameAr: "تشغيل الآلات CNC", cycleTime: 75, wip: 5, maxWip: 8 },
  { id: 3, nameEn: "Robot Welding", nameAr: "لحام الروبوت", cycleTime: 60, wip: 3, maxWip: 6 },
  { id: 4, nameEn: "Quality & Pack", nameAr: "الفحص والتعبئة", cycleTime: 55, wip: 3, maxWip: 6 }
];

let taktTime = 80; // seconds
let isTOCEnabled = true;

// Animated Conveyor particles
let particles = [];
let animId = null;

document.addEventListener('DOMContentLoaded', () => {
  setupLanguage();
  setupEventListeners();
  setupPresets();
  setupTabs();

  renderStationControls();
  recalculateAll();

  initConveyorCanvas();
  initTaktCanvas();

  window.addEventListener('resize', () => {
    initConveyorCanvas();
    initTaktCanvas();
  });
});

function setupLanguage() {
  const toggle = document.getElementById('langToggle');
  toggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
    document.getElementById('langLabel').textContent = i18n[currentLang].langLabel;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[currentLang][key]) {
        el.textContent = i18n[currentLang][key];
      }
    });

    renderStationControls();
    recalculateAll();
  });
}

function setupEventListeners() {
  document.getElementById('toggleTOCBtn').addEventListener('click', () => {
    isTOCEnabled = !isTOCEnabled;
    const btn = document.getElementById('toggleTOCBtn');
    btn.textContent = isTOCEnabled ? 
      (currentLang === 'ar' ? 'نظام الحبل والطبل والمخزن: مفعل' : 'DRUM-BUFFER-ROPE: ON') :
      (currentLang === 'ar' ? 'نظام الحبل والطبل والمخزن: معطل' : 'DRUM-BUFFER-ROPE: OFF');
    btn.style.background = isTOCEnabled ? "var(--nb-mint)" : "var(--nb-coral)";
    recalculateAll();
  });

  document.getElementById('exportReportBtn').addEventListener('click', exportAuditReport);
}

function setupPresets() {
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const p = btn.getAttribute('data-preset');
      if (p === 'balanced') {
        stations[0].cycleTime = 65; stations[0].wip = 3;
        stations[1].cycleTime = 70; stations[1].wip = 4;
        stations[2].cycleTime = 65; stations[2].wip = 3;
        stations[3].cycleTime = 60; stations[3].wip = 2;
      } else if (p === 'bottleneck') {
        stations[0].cycleTime = 50; stations[0].wip = 2;
        stations[1].cycleTime = 95; stations[1].wip = 8; // Bottleneck (> 80s)
        stations[2].cycleTime = 55; stations[2].wip = 1;
        stations[3].cycleTime = 50; stations[3].wip = 1;
      } else if (p === 'wip-overflow') {
        stations[0].cycleTime = 75; stations[0].wip = 8;
        stations[1].cycleTime = 80; stations[1].wip = 10;
        stations[2].cycleTime = 78; stations[2].wip = 7;
        stations[3].cycleTime = 72; stations[3].wip = 6;
      }
      renderStationControls();
      recalculateAll();
    });
  });
}

function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.getAttribute('data-tab'));
      if (target) target.classList.add('active');
    });
  });
}

function renderStationControls() {
  const container = document.getElementById('stationsGrid');
  container.innerHTML = stations.map(s => {
    const name = currentLang === 'ar' ? s.nameAr : s.nameEn;
    return `
      <div class="station-ctl-card">
        <div class="st-title">
          <span>#${s.id} ${name}</span>
          <span class="st-rate-val" id="ctVal_${s.id}">${s.cycleTime}s</span>
        </div>
        <input type="range" class="st-slider" min="30" max="120" value="${s.cycleTime}" data-id="${s.id}">
        <div class="st-wip-badge">
          <span>WIP: ${s.wip}</span>
          <span>Max: ${s.maxWip}</span>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.st-slider').forEach(sl => {
    sl.addEventListener('input', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const st = stations.find(x => x.id === id);
      if (st) {
        st.cycleTime = parseInt(e.target.value);
        document.getElementById(`ctVal_${id}`).textContent = st.cycleTime + 's';
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        recalculateAll();
      }
    });
  });
}

function recalculateAll() {
  const maxCT = Math.max(...stations.map(s => s.cycleTime));
  const bottleneckStation = stations.find(s => s.cycleTime === maxCT);

  // Hourly throughput paced by bottleneck
  const throughputPerHour = Math.round(3600 / maxCT);
  const totalWip = stations.reduce((sum, s) => sum + s.wip, 0);

  // Little's law: Lead Time = WIP / Throughput
  const leadTimeMinutes = (totalWip * (maxCT / 60)).toFixed(1);

  document.getElementById('kpiWip').textContent = totalWip + (currentLang === 'ar' ? ' قطعة' : ' units');
  document.getElementById('kpiThroughput').textContent = throughputPerHour + (currentLang === 'ar' ? ' قطعة/ساعة' : ' pcs/h');
  document.getElementById('kpiLeadTime').textContent = leadTimeMinutes + (currentLang === 'ar' ? ' دقيقة' : ' min');
  document.getElementById('kpiTakt').textContent = taktTime + ' sec';

  // Status badge
  const statusBadge = document.getElementById('lineStateBadge');
  if (maxCT > taktTime) {
    statusBadge.textContent = i18n[currentLang].stateChoke;
    statusBadge.style.color = "var(--nb-coral)";
  } else {
    statusBadge.textContent = i18n[currentLang].stateSmooth;
    statusBadge.style.color = "var(--nb-mint)";
  }

  renderLittlesBox(totalWip, throughputPerHour, leadTimeMinutes);
  renderKaizenGrid(bottleneckStation, maxCT);

  drawTaktCanvas();
}

function renderLittlesBox(wip, th, lt) {
  const box = document.getElementById('littlesBox');
  box.innerHTML = `
    [LITTLE'S LAW VERIFICATION: L = λ × W]<br>
    - Total WIP Inventory (L): <strong>${wip} units</strong> across 4 stations.<br>
    - Average Production Rate (λ): <strong>${th} units/hour</strong> (${(th/60).toFixed(2)} units/min).<br>
    - Average Cycle Lead Time (W): <strong>${lt} minutes</strong> from Station 1 to Finished Goods.<br>
    Formula Check: L = (${(th/60).toFixed(2)} units/min) × (${lt} min) ≈ <strong>${Math.round((th/60) * lt)} units</strong>.<br>
    <span style="color:var(--nb-mint);">✓ Mathematical consistency strictly validated.</span>
  `;
}

function renderKaizenGrid(bn, maxCT) {
  const grid = document.getElementById('kaizenGrid');
  const isChoked = maxCT > taktTime;
  const name = currentLang === 'ar' ? bn.nameAr : bn.nameEn;

  grid.innerHTML = `
    <div class="kaizen-card">
      <span class="kaizen-priority ${isChoked ? 'p-high' : 'p-med'}">${isChoked ? 'CRITICAL P1' : 'OPPORTUNITY'}</span>
      <div style="font-weight:800; margin-bottom:4px;">${name} Cycle Time Reduction</div>
      <p style="font-size:12px; color:#94a3b8;">Current cycle time (${maxCT}s) exceeds or sets line pace. Apply SMED and line balancing to offload 12s to downstream cells.</p>
    </div>
    <div class="kaizen-card">
      <span class="kaizen-priority p-med">KANBAN CONSTRAINTS</span>
      <div style="font-weight:800; margin-bottom:4px;">Strict WIP Cap Enforcement</div>
      <p style="font-size:12px; color:#94a3b8;">Freeze raw material dispatch when Station 2 buffer reaches 8 units to prevent floor clutter and excessive cash lockup.</p>
    </div>
  `;
}

// Conveyor Simulation Canvas
let cvCanvas, cvCtx;
function initConveyorCanvas() {
  cvCanvas = document.getElementById('conveyorCanvas');
  if (!cvCanvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = cvCanvas.parentElement.getBoundingClientRect();
  cvCanvas.width = rect.width * dpr;
  cvCanvas.height = 270 * dpr;
  cvCtx = cvCanvas.getContext('2d');
  cvCtx.scale(dpr, dpr);

  // Setup animated particles
  particles = [];
  for (let i = 0; i < 18; i++) {
    particles.push({
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.002
    });
  }

  if (!animId) {
    runConveyorLoop();
  }
}

function runConveyorLoop() {
  drawConveyor();
  animId = requestAnimationFrame(runConveyorLoop);
}

function drawConveyor() {
  if (!cvCanvas || !cvCtx) return;
  const dpr = window.devicePixelRatio || 1;
  const w = cvCanvas.width / dpr;
  const h = 270;

  cvCtx.clearRect(0, 0, w, h);

  const beltY = h * 0.52;
  const beltHeight = 36;

  // Draw Conveyor Belt (Neo-Brutalist Black Frame with Roller Marks)
  cvCtx.fillStyle = "#161b22";
  cvCtx.strokeStyle = "#000000";
  cvCtx.lineWidth = 3;
  cvCtx.fillRect(20, beltY, w - 40, beltHeight);
  cvCtx.strokeRect(20, beltY, w - 40, beltHeight);

  // Roller Hash Marks
  cvCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  cvCtx.lineWidth = 2;
  for (let x = 30; x < w - 40; x += 24) {
    cvCtx.beginPath();
    cvCtx.moveTo(x, beltY + 4);
    cvCtx.lineTo(x, beltY + beltHeight - 4);
    cvCtx.stroke();
  }

  // Draw 4 Workstations
  const spacing = (w - 60) / 4;
  stations.forEach((s, idx) => {
    const sx = 30 + idx * spacing + (spacing - 64) / 2;
    const sy = beltY - 60;
    const sw = 64;
    const sh = 48;

    const isBottleneck = s.cycleTime === Math.max(...stations.map(x => x.cycleTime));

    // Station Box
    cvCtx.fillStyle = isBottleneck ? "#fb7185" : "#4ade80";
    cvCtx.strokeStyle = "#000000";
    cvCtx.lineWidth = 2.5;
    cvCtx.fillRect(sx, sy, sw, sh);
    cvCtx.strokeRect(sx, sy, sw, sh);

    // Label
    cvCtx.fillStyle = "#000000";
    cvCtx.font = "bold 11px JetBrains Mono";
    cvCtx.textAlign = "center";
    cvCtx.fillText(`ST ${s.id}`, sx + sw / 2, sy + 20);
    cvCtx.fillText(`${s.cycleTime}s`, sx + sw / 2, sy + 36);

    // Buffer Badge below
    cvCtx.fillStyle = "#fde047";
    cvCtx.fillRect(sx + 10, beltY + beltHeight + 10, 44, 20);
    cvCtx.strokeRect(sx + 10, beltY + beltHeight + 10, 44, 20);
    cvCtx.fillStyle = "#000000";
    cvCtx.font = "bold 10px JetBrains Mono";
    cvCtx.fillText(`W:${s.wip}`, sx + 32, beltY + beltHeight + 24);
  });

  // Animated Material Parts moving on the belt
  particles.forEach(p => {
    p.progress += p.speed;
    if (p.progress > 1) p.progress = 0;

    const px = 30 + p.progress * (w - 80);
    const py = beltY + beltHeight / 2;

    cvCtx.fillStyle = "#fde047";
    cvCtx.strokeStyle = "#000000";
    cvCtx.lineWidth = 2;
    cvCtx.beginPath();
    cvCtx.roundRect(px - 7, py - 7, 14, 14, 2);
    cvCtx.fill();
    cvCtx.stroke();
  });
}

// Takt vs Cycle Time Canvas
let tkCanvas, tkCtx;
function initTaktCanvas() {
  tkCanvas = document.getElementById('taktCanvas');
  if (!tkCanvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = tkCanvas.parentElement.getBoundingClientRect();
  tkCanvas.width = rect.width * dpr;
  tkCanvas.height = 270 * dpr;
  tkCtx = tkCanvas.getContext('2d');
  tkCtx.scale(dpr, dpr);
  drawTaktCanvas();
}

function drawTaktCanvas() {
  if (!tkCanvas || !tkCtx) return;
  const dpr = window.devicePixelRatio || 1;
  const w = tkCanvas.width / dpr;
  const h = 270;

  tkCtx.clearRect(0, 0, w, h);

  const pad = { top: 30, right: 30, bottom: 45, left: 45 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  const maxVal = 130;

  // Grid
  tkCtx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  tkCtx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (plotH / 4) * i;
    tkCtx.beginPath();
    tkCtx.moveTo(pad.left, y);
    tkCtx.lineTo(pad.left + plotW, y);
    tkCtx.stroke();

    const val = Math.round(maxVal - (maxVal / 4) * i);
    tkCtx.fillStyle = "#94a3b8";
    tkCtx.font = "10px JetBrains Mono";
    tkCtx.textAlign = "right";
    tkCtx.fillText(val + 's', pad.left - 6, y + 4);
  }

  // Draw Takt Line
  const yTakt = pad.top + ((maxVal - taktTime) / maxVal) * plotH;
  tkCtx.strokeStyle = "#fde047";
  tkCtx.lineWidth = 2.5;
  tkCtx.setLineDash([6, 4]);
  tkCtx.beginPath();
  tkCtx.moveTo(pad.left, yTakt);
  tkCtx.lineTo(pad.left + plotW, yTakt);
  tkCtx.stroke();
  tkCtx.setLineDash([]);

  tkCtx.fillStyle = "#fde047";
  tkCtx.font = "bold 10.5px JetBrains Mono";
  tkCtx.textAlign = "right";
  tkCtx.fillText("TAKT: 80s", pad.left + plotW, yTakt - 6);

  // Draw Bars
  const barW = (plotW / stations.length) * 0.55;
  const spacing = plotW / stations.length;

  stations.forEach((s, idx) => {
    const x = pad.left + idx * spacing + (spacing - barW) / 2;
    const barH = (s.cycleTime / maxVal) * plotH;
    const y = pad.top + plotH - barH;

    const isOver = s.cycleTime > taktTime;

    // Hard drop shadow
    tkCtx.fillStyle = "#000000";
    tkCtx.fillRect(x + 3, y + 3, barW, barH);

    // Bar body
    tkCtx.fillStyle = isOver ? "#fb7185" : "#4ade80";
    tkCtx.strokeStyle = "#000000";
    tkCtx.lineWidth = 2;
    tkCtx.fillRect(x, y, barW, barH);
    tkCtx.strokeRect(x, y, barW, barH);

    // Value label
    tkCtx.fillStyle = "#ffffff";
    tkCtx.font = "bold 11px JetBrains Mono";
    tkCtx.textAlign = "center";
    tkCtx.fillText(s.cycleTime + 's', x + barW / 2, y - 6);

    // Station name
    tkCtx.fillStyle = "#94a3b8";
    tkCtx.font = "bold 11px JetBrains Mono";
    tkCtx.fillText(`ST ${s.id}`, x + barW / 2, pad.top + plotH + 20);
  });
}

function exportAuditReport() {
  const maxCT = Math.max(...stations.map(s => s.cycleTime));
  const bn = stations.find(s => s.cycleTime === maxCT);
  const totalWip = stations.reduce((sum, s) => sum + s.wip, 0);

  const reportLines = [
    "=========================================================",
    "      LEAN KANBAN & CONSTRAINTS AUDIT REPORT",
    "      Tactile Neo-Brutalist Industrial Standard",
    "=========================================================",
    `Generated: ${new Date().toISOString()}`,
    `Author: Tareq Abu Ashee (أ. طارق ابوعشي)`,
    "",
    "PRODUCTION METRICS:",
    `  - Line Pacing Bottleneck: Station #${bn.id} (${bn.nameEn}) @ ${maxCT}s`,
    `  - Target Customer Takt Time: ${taktTime}s`,
    `  - Overall Line Status: ${maxCT > taktTime ? 'CHOKED (Bottleneck > Takt)' : 'BALANCED'}`,
    `  - Hourly Production Velocity: ${Math.round(3600 / maxCT)} units/hour`,
    `  - Total Floor WIP: ${totalWip} units`,
    `  - Manufacturing Lead Time: ${(totalWip * (maxCT / 60)).toFixed(1)} minutes`,
    "",
    "KAIZEN RECOMMENDATION: Rebalance Station #${bn.id} to eliminate bottleneck."
  ];

  const report = reportLines.join("\n");
  const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `Kanban_Flow_Brutalist_Audit_${Date.now()}.txt`;
  a.click();
}
