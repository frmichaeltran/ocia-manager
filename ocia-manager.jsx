import { useState, useEffect, useRef } from "react";

const COLORS = {
  navy: "#3D2C6B",
  gold: "#9B7FD4",
  goldLight: "#DDD0F5",
  cream: "#F7F4FC",
  white: "#FFFFFF",
  muted: "#7B6FA0",
  border: "#DDD5EE",
  danger: "#B84040",
  success: "#2E7D5A",
  info: "#5B3FBE",
};

const GOOGLE_FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');`;

const css = `
  ${GOOGLE_FONTS}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Source Sans 3', sans-serif; background: ${COLORS.cream}; color: ${COLORS.navy}; }
  h1,h2,h3,h4 { font-family: 'Playfair Display', serif; }

  .app { display: flex; height: 100vh; overflow: hidden; }

  /* Sidebar */
  .sidebar { width: 220px; background: ${COLORS.navy}; display: flex; flex-direction: column; flex-shrink: 0; }
  .sidebar-logo { padding: 24px 20px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .sidebar-logo .parish { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${COLORS.gold}; margin-bottom: 4px; }
  .sidebar-logo h2 { font-family: 'Playfair Display', serif; color: ${COLORS.white}; font-size: 16px; line-height: 1.3; }
  .sidebar-logo .badge { display: inline-block; margin-top: 6px; background: ${COLORS.goldLight}; color: ${COLORS.navy}; font-size: 9px; font-weight: 600; letter-spacing: 1px; padding: 2px 8px; border-radius: 20px; text-transform: uppercase; }
  .sidebar-nav { flex: 1; padding: 16px 0; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 20px; cursor: pointer; color: rgba(255,255,255,0.6); font-size: 14px; font-weight: 400; transition: all 0.15s; border-left: 3px solid transparent; }
  .nav-item:hover { color: ${COLORS.white}; background: rgba(255,255,255,0.05); }
  .nav-item.active { color: ${COLORS.white}; background: rgba(155,127,212,0.18); border-left-color: ${COLORS.gold}; font-weight: 500; }
  .nav-item .nav-icon { font-size: 16px; width: 18px; text-align: center; }
  .sidebar-footer { padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.08); }
  .role-switch { display: flex; background: rgba(255,255,255,0.07); border-radius: 8px; padding: 3px; gap: 2px; }
  .role-btn { flex: 1; padding: 5px 0; text-align: center; font-size: 11px; font-weight: 500; border-radius: 6px; cursor: pointer; color: rgba(255,255,255,0.5); transition: all 0.15s; letter-spacing: 0.5px; }
  .role-btn.active { background: ${COLORS.gold}; color: ${COLORS.white}; }

  /* Main */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .topbar { background: ${COLORS.white}; border-bottom: 1px solid ${COLORS.border}; padding: 14px 28px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
  .topbar-title { font-family: 'Playfair Display', serif; font-size: 20px; color: ${COLORS.navy}; }
  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .avatar { width: 34px; height: 34px; border-radius: 50%; background: ${COLORS.navy}; color: ${COLORS.goldLight}; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; font-family: 'Playfair Display', serif; cursor: pointer; }
  .content { flex: 1; overflow-y: auto; padding: 28px; }

  /* Cards */
  .card { background: ${COLORS.white}; border: 1px solid ${COLORS.border}; border-radius: 12px; padding: 20px; }
  .card-sm { padding: 14px 18px; }

  /* Stat cards */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card { background: ${COLORS.white}; border: 1px solid ${COLORS.border}; border-radius: 12px; padding: 18px 20px; }
  .stat-label { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${COLORS.muted}; margin-bottom: 6px; }
  .stat-value { font-family: 'Playfair Display', serif; font-size: 28px; color: ${COLORS.navy}; }
  .stat-sub { font-size: 12px; color: ${COLORS.muted}; margin-top: 2px; }

  /* Buttons */
  .btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: none; transition: all 0.15s; font-family: 'Source Sans 3', sans-serif; }
  .btn-primary { background: ${COLORS.navy}; color: ${COLORS.white}; }
  .btn-primary:hover { background: #263a60; }
  .btn-gold { background: ${COLORS.gold}; color: ${COLORS.white}; }
  .btn-gold:hover { background: #8166c0; }
  .btn-outline { background: transparent; color: ${COLORS.navy}; border: 1px solid ${COLORS.border}; }
  .btn-outline:hover { background: ${COLORS.cream}; }
  .btn-danger { background: transparent; color: ${COLORS.danger}; border: 1px solid #e8c0c0; }
  .btn-danger:hover { background: #fdf0f0; }
  .btn-sm { padding: 5px 11px; font-size: 12px; }

  /* Table */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th { text-align: left; padding: 10px 14px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: ${COLORS.muted}; border-bottom: 1px solid ${COLORS.border}; font-weight: 500; background: ${COLORS.cream}; }
  td { padding: 12px 14px; border-bottom: 1px solid ${COLORS.border}; color: ${COLORS.navy}; vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: ${COLORS.cream}; }

  /* Badges */
  .badge-stage { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 500; }
  .stage-pre { background: #FEF3C7; color: #92400E; }
  .stage-cat { background: #DBEAFE; color: #1E40AF; }
  .stage-pe { background: #EDE9FE; color: #5B21B6; }
  .stage-mys { background: #D1FAE5; color: #065F46; }

  /* Progress bar */
  .progress-bar { height: 6px; background: ${COLORS.border}; border-radius: 3px; overflow: hidden; }
  .progress-fill { height: 100%; background: ${COLORS.gold}; border-radius: 3px; transition: width 0.3s; }

  /* Modal */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
  .modal { background: ${COLORS.white}; border-radius: 16px; width: 520px; max-width: 100%; max-height: 85vh; overflow-y: auto; }
  .modal-header { padding: 22px 24px 0; display: flex; align-items: flex-start; justify-content: space-between; }
  .modal-header h3 { font-family: 'Playfair Display', serif; font-size: 20px; color: ${COLORS.navy}; }
  .modal-body { padding: 20px 24px 24px; }
  .modal-footer { padding: 0 24px 22px; display: flex; justify-content: flex-end; gap: 8px; }
  .close-btn { background: none; border: none; font-size: 20px; cursor: pointer; color: ${COLORS.muted}; line-height: 1; padding: 2px 6px; border-radius: 4px; }
  .close-btn:hover { background: ${COLORS.cream}; }

  /* Form */
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.8px; color: ${COLORS.muted}; margin-bottom: 5px; }
  .form-input { width: 100%; padding: 9px 12px; border: 1px solid ${COLORS.border}; border-radius: 8px; font-size: 14px; font-family: 'Source Sans 3', sans-serif; color: ${COLORS.navy}; background: ${COLORS.cream}; outline: none; transition: border 0.15s; }
  .form-input:focus { border-color: ${COLORS.gold}; background: ${COLORS.white}; }
  select.form-input { cursor: pointer; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  /* Announcements */
  .announcement { border-left: 3px solid ${COLORS.gold}; padding: 14px 16px; background: ${COLORS.white}; border-radius: 0 8px 8px 0; margin-bottom: 12px; border: 1px solid ${COLORS.border}; border-left: 3px solid ${COLORS.gold}; }
  .ann-meta { font-size: 11px; color: ${COLORS.muted}; margin-bottom: 4px; }
  .ann-body { font-size: 14px; color: ${COLORS.navy}; line-height: 1.5; }

  /* Materials */
  .material-item { display: flex; align-items: center; gap: 14px; padding: 12px 16px; border: 1px solid ${COLORS.border}; border-radius: 10px; background: ${COLORS.white}; margin-bottom: 10px; }
  .material-icon { width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .material-info { flex: 1; min-width: 0; }
  .material-name { font-size: 14px; font-weight: 500; color: ${COLORS.navy}; }
  .material-meta { font-size: 12px; color: ${COLORS.muted}; margin-top: 2px; }

  /* Calendar */
  .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
  .cal-day-header { text-align: center; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: ${COLORS.muted}; padding: 8px 0; }
  .cal-day { min-height: 64px; border: 1px solid ${COLORS.border}; border-radius: 6px; padding: 6px; background: ${COLORS.white}; }
  .cal-day.other-month { background: ${COLORS.cream}; opacity: 0.5; }
  .cal-day.today { border-color: ${COLORS.gold}; }
  .cal-date { font-size: 12px; font-weight: 500; margin-bottom: 3px; }
  .cal-event { font-size: 10px; background: ${COLORS.navy}; color: ${COLORS.white}; border-radius: 3px; padding: 1px 5px; margin-bottom: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: pointer; }

  /* Section headers */
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .section-header h2 { font-size: 22px; }

  /* Search */
  .search-input { padding: 8px 12px 8px 36px; border: 1px solid ${COLORS.border}; border-radius: 8px; font-size: 13px; background: ${COLORS.cream}; outline: none; transition: border 0.15s; width: 220px; font-family: 'Source Sans 3', sans-serif; }
  .search-input:focus { border-color: ${COLORS.gold}; background: ${COLORS.white}; }
  .search-wrap { position: relative; }
  .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: ${COLORS.muted}; font-size: 14px; }

  /* Notification dot */
  .notif { width: 8px; height: 8px; background: ${COLORS.gold}; border-radius: 50%; display: inline-block; }

  /* Checkbox */
  input[type=checkbox] { accent-color: ${COLORS.navy}; width: 15px; height: 15px; cursor: pointer; }

  /* Empty state */
  .empty { text-align: center; padding: 48px 20px; color: ${COLORS.muted}; }
  .empty-icon { font-size: 36px; margin-bottom: 12px; opacity: 0.4; }
  .empty p { font-size: 14px; }

  /* Student view specific */
  .welcome-banner { background: ${COLORS.navy}; border-radius: 14px; padding: 24px 28px; color: ${COLORS.white}; margin-bottom: 24px; position: relative; overflow: hidden; }
  .welcome-banner::before { content: '✝'; position: absolute; right: 24px; top: 50%; transform: translateY(-50%); font-size: 80px; opacity: 0.08; }
  .welcome-banner h2 { font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 4px; }
  .welcome-banner p { font-size: 14px; opacity: 0.7; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 3px; }

  @media (max-width: 900px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .two-col { grid-template-columns: 1fr; }
  }
`;

// ─── Data helpers ───────────────────────────────────────────────────────────

const STAGES = ["Pre-Catechumenate", "Catechumenate", "Purification & Enlightenment", "Mystagogy"];
const STAGE_SHORT = ["Pre-Cat", "Catechumenate", "P&E", "Mystagogy"];
const STAGE_CLASS = ["stage-pre", "stage-cat", "stage-pe", "stage-mys"];

function stageClass(s) { return STAGE_CLASS[STAGES.indexOf(s)] || "stage-pre"; }

const SEED_STUDENTS = [
  { id: 1, name: "Maria Santos", email: "maria.santos@email.com", phone: "972-555-0101", stage: "Catechumenate", attendance: 85, notes: "Sponsored by John D.", joined: "2025-09-10" },
  { id: 2, name: "James Okafor", email: "james.okafor@email.com", phone: "972-555-0102", stage: "Pre-Catechumenate", attendance: 70, notes: "Recently moved from Lagos", joined: "2026-01-15" },
  { id: 3, name: "Linda Chen", email: "linda.chen@email.com", phone: "972-555-0103", stage: "Catechumenate", attendance: 92, notes: "", joined: "2025-09-10" },
  { id: 4, name: "Roberto Diaz", email: "rdiaz@email.com", phone: "972-555-0104", stage: "Purification & Enlightenment", attendance: 96, notes: "Elect — Easter Vigil ready", joined: "2024-09-05" },
  { id: 5, name: "Aisha Williams", email: "aisha.w@email.com", phone: "972-555-0105", stage: "Catechumenate", attendance: 78, notes: "Sponsor: Deacon Tom", joined: "2025-09-10" },
  { id: 6, name: "Patrick Murphy", email: "pmurphy@email.com", phone: "972-555-0106", stage: "Mystagogy", attendance: 100, notes: "Baptized Easter 2025", joined: "2024-09-01" },
  { id: 7, name: "Fatima Al-Hassan", email: "fatima.h@email.com", phone: "972-555-0107", stage: "Pre-Catechumenate", attendance: 60, notes: "Just inquiring", joined: "2026-03-01" },
  { id: 8, name: "David Kim", email: "dkim@email.com", phone: "972-555-0108", stage: "Catechumenate", attendance: 88, notes: "", joined: "2025-09-10" },
];

const SEED_ANNOUNCEMENTS = [
  { id: 1, title: "Easter Vigil Rehearsal", body: "All elect please attend the Easter Vigil rehearsal on Friday, April 4th at 7:00 pm in the main church. Bring your sponsor!", date: "2026-05-29", urgent: true },
  { id: 2, title: "Session this Wednesday", body: "This Wednesday we will cover the Sacrament of Baptism. Please read Chapter 12 in your OCIA workbook beforehand.", date: "2026-06-01", urgent: false },
  { id: 3, title: "Retreat Day — June 21", body: "Our annual retreat will be held on Saturday, June 21st. All catechumens are strongly encouraged to attend. Lunch is provided.", date: "2026-05-20", urgent: false },
];

const SEED_MATERIALS = [
  { id: 1, name: "OCIA Workbook (Official)", type: "pdf", url: "https://www.usccb.org/sites/default/files/flipbooks/catechism/", category: "Textbook" },
  { id: 2, name: "Catechism of the Catholic Church", type: "link", url: "https://www.usccb.org/sites/default/files/flipbooks/catechism/", category: "Reference" },
  { id: 3, name: "Week 5 — The Creed Slides", type: "drive", url: "https://drive.google.com/", category: "Slides" },
  { id: 4, name: "Prayer Booklet for Catechumens", type: "pdf", url: "https://drive.google.com/", category: "Prayer" },
  { id: 5, name: "Diocese of Fort Worth OCIA Guide", type: "link", url: "https://fwdioc.org", category: "Reference" },
];

const SEED_EVENTS = [
  { id: 1, title: "OCIA Session", date: "2026-06-04", type: "class" },
  { id: 2, title: "OCIA Session", date: "2026-06-11", type: "class" },
  { id: 3, title: "OCIA Session", date: "2026-06-18", type: "class" },
  { id: 4, title: "Retreat Day", date: "2026-06-21", type: "retreat" },
  { id: 5, title: "OCIA Session", date: "2026-06-25", type: "class" },
  { id: 6, title: "Rite of Welcome", date: "2026-07-06", type: "rite" },
];

function useStorage(key, seed) {
  const [data, setData] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : seed;
    } catch { return seed; }
  });
  const save = (v) => { setData(v); try { localStorage.setItem(key, JSON.stringify(v)); } catch {} };
  return [data, save];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StageTag({ stage }) {
  return <span className={`badge-stage ${stageClass(stage)}`}>{stage}</span>;
}

function MaterialIcon({ type }) {
  const icons = { pdf: { bg: "#FEE2E2", icon: "📄" }, drive: { bg: "#DBEAFE", icon: "🔗" }, link: { bg: "#D1FAE5", icon: "🌐" } };
  const t = icons[type] || icons.link;
  return <div className="material-icon" style={{ background: t.bg }}>{t.icon}</div>;
}

function Modal({ title, onClose, children, footer }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

// ─── Admin Views ─────────────────────────────────────────────────────────────

function AdminDashboard({ students, announcements, events }) {
  const stages = STAGES.map(s => ({ name: s, count: students.filter(x => x.stage === s).length }));
  const avgAtt = students.length ? Math.round(students.reduce((a, b) => a + b.attendance, 0) / students.length) : 0;
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Catechumens</div>
          <div className="stat-value">{students.length}</div>
          <div className="stat-sub">Active in program</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg. Attendance</div>
          <div className="stat-value">{avgAtt}%</div>
          <div className="stat-sub">This term</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Ready for Rites</div>
          <div className="stat-value">{students.filter(s => s.stage === "Purification & Enlightenment").length}</div>
          <div className="stat-sub">P&E stage</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Mystagogy</div>
          <div className="stat-value">{students.filter(s => s.stage === "Mystagogy").length}</div>
          <div className="stat-sub">Newly initiated</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div className="card">
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>Journey Progress</h3>
          {stages.map((s, i) => (
            <div key={s.name} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span className={`badge-stage ${STAGE_CLASS[i]}`}>{STAGE_SHORT[i]}</span>
                <span style={{ fontSize: 13, color: COLORS.muted }}>{s.count} students</span>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${students.length ? (s.count / students.length) * 100 : 0}%` }} /></div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>Upcoming Events</h3>
          {upcoming.length === 0 && <div className="empty"><p>No upcoming events</p></div>}
          {upcoming.map(ev => (
            <div key={ev.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ background: COLORS.navy, color: COLORS.goldLight, borderRadius: 8, padding: "6px 10px", textAlign: "center", minWidth: 44, flexShrink: 0 }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>{new Date(ev.date + "T12:00:00").toLocaleString("en", { month: "short" })}</div>
                <div style={{ fontSize: 18, fontFamily: "Playfair Display, serif", fontWeight: 700, lineHeight: 1 }}>{new Date(ev.date + "T12:00:00").getDate()}</div>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{ev.title}</div>
                <div style={{ fontSize: 12, color: COLORS.muted, textTransform: "capitalize" }}>{ev.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16, marginBottom: 14 }}>Recent Announcements</h3>
        {announcements.slice(0, 2).map(a => (
          <div key={a.id} className="announcement">
            <div className="ann-meta">{a.date} {a.urgent && <span style={{ color: COLORS.danger, fontWeight: 600 }}>· Urgent</span>}</div>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 3 }}>{a.title}</div>
            <div className="ann-body">{a.body}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function AdminStudents({ students, setStudents }) {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const filtered = students.filter(s =>
    (stageFilter === "All" || s.stage === stageFilter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()))
  );

  const openAdd = () => { setForm({ name: "", email: "", phone: "", stage: "Pre-Catechumenate", attendance: 100, notes: "" }); setModal("add"); };
  const openEdit = (s) => { setForm({ ...s }); setModal("edit"); };
  const openView = (s) => { setForm({ ...s }); setModal("view"); };

  const save = () => {
    if (!form.name || !form.email) return;
    if (modal === "add") setStudents([...students, { ...form, id: Date.now(), joined: new Date().toISOString().slice(0, 10) }]);
    else setStudents(students.map(s => s.id === form.id ? form : s));
    setModal(null);
  };

  const remove = (id) => { if (confirm("Remove this student?")) setStudents(students.filter(s => s.id !== id)); };

  return (
    <>
      <div className="section-header">
        <h2>Catechumens</h2>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input className="search-input" placeholder="Search students…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="form-input" style={{ width: 180 }} value={stageFilter} onChange={e => setStageFilter(e.target.value)}>
            <option>All</option>
            {STAGES.map(s => <option key={s}>{s}</option>)}
          </select>
          <button className="btn btn-primary" onClick={openAdd}>+ Add Student</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Stage</th>
                <th>Attendance</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7}><div className="empty"><div className="empty-icon">👤</div><p>No students found</p></div></td></tr>
              )}
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.navy, color: COLORS.goldLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
                        {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <span style={{ fontWeight: 500 }}>{s.name}</span>
                    </div>
                  </td>
                  <td><a href={`mailto:${s.email}`} style={{ color: COLORS.info, textDecoration: "none" }}>{s.email}</a></td>
                  <td><a href={`tel:${s.phone}`} style={{ color: COLORS.navy, textDecoration: "none" }}>{s.phone}</a></td>
                  <td><StageTag stage={s.stage} /></td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="progress-bar" style={{ width: 60 }}><div className="progress-fill" style={{ width: `${s.attendance}%` }} /></div>
                      <span style={{ fontSize: 12, color: COLORS.muted }}>{s.attendance}%</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: COLORS.muted, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.notes}</td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="btn btn-outline btn-sm" onClick={() => openView(s)}>View</button>
                      <button className="btn btn-outline btn-sm" onClick={() => openEdit(s)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => remove(s.id)}>✕</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(modal === "add" || modal === "edit") && (
        <Modal title={modal === "add" ? "Add Catechumen" : "Edit Student"} onClose={() => setModal(null)}
          footer={<><button className="btn btn-outline" onClick={() => setModal(null)}>Cancel</button><button className="btn btn-primary" onClick={save}>Save</button></>}>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" /></div>
            <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={form.phone || ""} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="972-555-0100" /></div>
          </div>
          <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={form.email || ""} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" /></div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Stage</label>
              <select className="form-input" value={form.stage || STAGES[0]} onChange={e => setForm({ ...form, stage: e.target.value })}>
                {STAGES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group"><label className="form-label">Attendance %</label><input className="form-input" type="number" min="0" max="100" value={form.attendance || 0} onChange={e => setForm({ ...form, attendance: Number(e.target.value) })} /></div>
          </div>
          <div className="form-group"><label className="form-label">Notes</label><textarea className="form-input" rows={3} value={form.notes || ""} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Sponsor name, background, special notes…" style={{ resize: "vertical" }} /></div>
        </Modal>
      )}

      {modal === "view" && (
        <Modal title="Student Profile" onClose={() => setModal(null)}
          footer={<><button className="btn btn-outline" onClick={() => { setModal(null); setTimeout(() => openEdit(form), 50); }}>Edit</button><button className="btn btn-primary" onClick={() => setModal(null)}>Close</button></>}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: COLORS.navy, color: COLORS.goldLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
              {form.name?.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div><div style={{ fontFamily: "Playfair Display, serif", fontSize: 20 }}>{form.name}</div><StageTag stage={form.stage} /></div>
          </div>
          {[["Email", form.email], ["Phone", form.phone], ["Joined", form.joined], ["Attendance", `${form.attendance}%`]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 14 }}>
              <span style={{ color: COLORS.muted }}>{k}</span><span style={{ fontWeight: 500 }}>{v}</span>
            </div>
          ))}
          {form.notes && <div style={{ marginTop: 14, padding: 12, background: COLORS.cream, borderRadius: 8, fontSize: 13, color: COLORS.muted }}>{form.notes}</div>}
        </Modal>
      )}
    </>
  );
}

function AdminAnnouncements({ announcements, setAnnouncements }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});

  const openAdd = () => { setForm({ title: "", body: "", urgent: false }); setModal(true); };
  const save = () => {
    if (!form.title || !form.body) return;
    setAnnouncements([{ ...form, id: Date.now(), date: new Date().toISOString().slice(0, 10) }, ...announcements]);
    setModal(false);
  };
  const remove = (id) => { if (confirm("Delete this announcement?")) setAnnouncements(announcements.filter(a => a.id !== id)); };

  return (
    <>
      <div className="section-header">
        <h2>Announcements</h2>
        <button className="btn btn-primary" onClick={openAdd}>+ New Announcement</button>
      </div>
      {announcements.map(a => (
        <div key={a.id} className="announcement">
          <div className="ann-meta">{a.date} {a.urgent && <span style={{ color: COLORS.danger, fontWeight: 600 }}>· Urgent</span>}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div><div style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>{a.title}</div><div className="ann-body">{a.body}</div></div>
            <button className="btn btn-danger btn-sm" style={{ marginLeft: 12, flexShrink: 0 }} onClick={() => remove(a.id)}>Delete</button>
          </div>
        </div>
      ))}
      {announcements.length === 0 && <div className="empty"><div className="empty-icon">📢</div><p>No announcements yet</p></div>}

      {modal && (
        <Modal title="New Announcement" onClose={() => setModal(false)}
          footer={<><button className="btn btn-outline" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>Post</button></>}>
          <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Session this Wednesday…" /></div>
          <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" rows={4} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} placeholder="Details…" style={{ resize: "vertical" }} /></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" id="urgent" checked={form.urgent} onChange={e => setForm({ ...form, urgent: e.target.checked })} />
            <label htmlFor="urgent" style={{ fontSize: 14, cursor: "pointer" }}>Mark as urgent</label>
          </div>
        </Modal>
      )}
    </>
  );
}

function AdminMaterials({ materials, setMaterials }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});

  const openAdd = () => { setForm({ name: "", type: "pdf", url: "", category: "" }); setModal(true); };
  const save = () => {
    if (!form.name || !form.url) return;
    setMaterials([...materials, { ...form, id: Date.now() }]);
    setModal(false);
  };
  const remove = (id) => { if (confirm("Remove this material?")) setMaterials(materials.filter(m => m.id !== id)); };

  return (
    <>
      <div className="section-header">
        <h2>Materials & Downloads</h2>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Material</button>
      </div>
      {materials.map(m => (
        <div key={m.id} className="material-item">
          <MaterialIcon type={m.type} />
          <div className="material-info">
            <div className="material-name">{m.name}</div>
            <div className="material-meta">{m.category} · {m.type.toUpperCase()}</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <a href={m.url} target="_blank" rel="noreferrer"><button className="btn btn-outline btn-sm">Open ↗</button></a>
            <button className="btn btn-danger btn-sm" onClick={() => remove(m.id)}>✕</button>
          </div>
        </div>
      ))}
      {materials.length === 0 && <div className="empty"><div className="empty-icon">📁</div><p>No materials yet</p></div>}

      {modal && (
        <Modal title="Add Material" onClose={() => setModal(false)}
          footer={<><button className="btn btn-outline" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>Save</button></>}>
          <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="OCIA Workbook Ch. 5" /></div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="pdf">PDF</option>
                <option value="drive">Google Drive</option>
                <option value="link">Website Link</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">Category</label><input className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Slides, Prayer, Reference…" /></div>
          </div>
          <div className="form-group"><label className="form-label">URL / Link</label><input className="form-input" type="url" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="https://…" /></div>
        </Modal>
      )}
    </>
  );
}

function AdminCalendar({ events, setEvents }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const todayStr = today.toISOString().slice(0, 10);

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, other: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, other: false });
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - firstDay - daysInMonth + 1, other: true });

  const eventsForDay = (d) => {
    const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    return events.filter(e => e.date === ds);
  };

  const openAdd = () => { setForm({ title: "", date: todayStr, type: "class" }); setModal(true); };
  const save = () => { if (!form.title || !form.date) return; setEvents([...events, { ...form, id: Date.now() }]); setModal(false); };
  const remove = (id) => setEvents(events.filter(e => e.id !== id));

  const monthName = viewDate.toLocaleString("en", { month: "long", year: "numeric" });
  const upcoming = events.filter(e => e.date >= todayStr).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <div className="section-header">
        <h2>Class Calendar</h2>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Event</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 17 }}>{monthName}</h3>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn btn-outline btn-sm" onClick={() => setViewDate(new Date(year, month - 1, 1))}>‹ Prev</button>
              <button className="btn btn-outline btn-sm" onClick={() => setViewDate(new Date(year, month + 1, 1))}>Next ›</button>
            </div>
          </div>
          <div className="cal-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d} className="cal-day-header">{d}</div>)}
            {cells.map((c, i) => {
              const ds = c.other ? null : `${year}-${String(month + 1).padStart(2, "0")}-${String(c.day).padStart(2, "0")}`;
              const evs = c.other ? [] : eventsForDay(c.day);
              return (
                <div key={i} className={`cal-day ${c.other ? "other-month" : ""} ${ds === todayStr ? "today" : ""}`}>
                  <div className="cal-date" style={{ color: ds === todayStr ? COLORS.gold : COLORS.navy }}>{c.day}</div>
                  {evs.map(ev => <div key={ev.id} className="cal-event" title={ev.title}>{ev.title}</div>)}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="card">
            <h3 style={{ fontSize: 15, marginBottom: 14 }}>Upcoming</h3>
            {upcoming.length === 0 && <p style={{ fontSize: 13, color: COLORS.muted }}>No upcoming events</p>}
            {upcoming.map(ev => (
              <div key={ev.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{ev.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>{ev.date} · {ev.type}</div>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => remove(ev.id)} style={{ fontSize: 11, padding: "3px 8px" }}>✕</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modal && (
        <Modal title="Add Event" onClose={() => setModal(false)}
          footer={<><button className="btn btn-outline" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>Save</button></>}>
          <div className="form-group"><label className="form-label">Event Title</label><input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="OCIA Session, Rite of Welcome…" /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="class">Class Session</option>
                <option value="rite">Rite / Liturgy</option>
                <option value="retreat">Retreat</option>
                <option value="meeting">Meeting</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

// ─── Student Views ───────────────────────────────────────────────────────────

function StudentDashboard({ student, announcements, events }) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);

  return (
    <>
      <div className="welcome-banner">
        <h2>Welcome back, {student.name.split(" ")[0]} ✝</h2>
        <p style={{ marginTop: 4 }}>Your journey: <strong style={{ color: COLORS.goldLight }}>{student.stage}</strong></p>
      </div>

      <div className="two-col" style={{ marginBottom: 20 }}>
        <div className="card">
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: COLORS.navy, color: COLORS.goldLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
              {student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 18 }}>{student.name}</div>
              <StageTag stage={student.stage} />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 5 }}>Attendance this term</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="progress-bar" style={{ flex: 1 }}><div className="progress-fill" style={{ width: `${student.attendance}%` }} /></div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{student.attendance}%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 8 }}>Your OCIA journey</div>
          {STAGES.map((s, i) => {
            const done = STAGES.indexOf(student.stage) > i;
            const current = s === student.stage;
            return (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: done ? COLORS.success : current ? COLORS.gold : COLORS.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: done || current ? COLORS.white : COLORS.muted, flexShrink: 0 }}>
                  {done ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: 13, fontWeight: current ? 500 : 400, color: current ? COLORS.navy : done ? COLORS.muted : COLORS.muted }}>{s}</span>
                {current && <span style={{ fontSize: 10, background: COLORS.goldLight, color: COLORS.navy, padding: "1px 7px", borderRadius: 10, fontWeight: 600 }}>Current</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <h3 style={{ fontSize: 16, marginBottom: 14 }}>Latest Announcements</h3>
          {announcements.slice(0, 3).map(a => (
            <div key={a.id} className="announcement">
              <div className="ann-meta">{a.date} {a.urgent && <span style={{ color: COLORS.danger, fontWeight: 600 }}>· Urgent</span>}</div>
              <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 3 }}>{a.title}</div>
              <div className="ann-body">{a.body}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ fontSize: 16, marginBottom: 14 }}>Upcoming Sessions</h3>
          {upcoming.map(ev => (
            <div key={ev.id} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
              <div style={{ background: COLORS.cream, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "6px 10px", textAlign: "center", minWidth: 44, flexShrink: 0 }}>
                <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: COLORS.muted }}>{new Date(ev.date + "T12:00:00").toLocaleString("en", { month: "short" })}</div>
                <div style={{ fontSize: 18, fontFamily: "Playfair Display, serif", fontWeight: 700, color: COLORS.navy, lineHeight: 1 }}>{new Date(ev.date + "T12:00:00").getDate()}</div>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{ev.title}</div>
                <div style={{ fontSize: 12, color: COLORS.muted, textTransform: "capitalize" }}>{ev.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function StudentMaterials({ materials }) {
  const cats = [...new Set(materials.map(m => m.category))];
  return (
    <>
      <div className="section-header"><h2>Materials & Resources</h2></div>
      {cats.map(cat => (
        <div key={cat} style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, color: COLORS.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1, fontFamily: "Source Sans 3, sans-serif", fontWeight: 500 }}>{cat}</h3>
          {materials.filter(m => m.category === cat).map(m => (
            <div key={m.id} className="material-item">
              <MaterialIcon type={m.type} />
              <div className="material-info">
                <div className="material-name">{m.name}</div>
                <div className="material-meta">{m.type === "pdf" ? "PDF Document" : m.type === "drive" ? "Google Drive" : "External Link"}</div>
              </div>
              <a href={m.url} target="_blank" rel="noreferrer">
                <button className="btn btn-gold btn-sm">Open ↗</button>
              </a>
            </div>
          ))}
        </div>
      ))}
      {materials.length === 0 && <div className="empty"><div className="empty-icon">📚</div><p>No materials uploaded yet</p></div>}
    </>
  );
}

function StudentAnnouncements({ announcements }) {
  return (
    <>
      <div className="section-header"><h2>Announcements</h2></div>
      {announcements.map(a => (
        <div key={a.id} className="announcement">
          <div className="ann-meta">{a.date} {a.urgent && <span style={{ color: COLORS.danger, fontWeight: 600 }}>· Urgent</span>}</div>
          <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>{a.title}</div>
          <div className="ann-body">{a.body}</div>
        </div>
      ))}
      {announcements.length === 0 && <div className="empty"><div className="empty-icon">📢</div><p>No announcements yet</p></div>}
    </>
  );
}

// ─── Root App ────────────────────────────────────────────────────────────────

export default function App() {
  const [students, setStudents] = useStorage("ocia_students", SEED_STUDENTS);
  const [announcements, setAnnouncements] = useStorage("ocia_announcements", SEED_ANNOUNCEMENTS);
  const [materials, setMaterials] = useStorage("ocia_materials", SEED_MATERIALS);
  const [events, setEvents] = useStorage("ocia_events", SEED_EVENTS);
  const [role, setRole] = useState("admin");
  const [page, setPage] = useState("dashboard");
  const [studentId, setStudentId] = useState(SEED_STUDENTS[0].id);

  const student = students.find(s => s.id === studentId) || students[0];

  const adminNav = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "students", label: "Catechumens", icon: "👥" },
    { id: "announcements", label: "Announcements", icon: "📢" },
    { id: "materials", label: "Materials", icon: "📚" },
    { id: "calendar", label: "Calendar", icon: "📅" },
  ];

  const studentNav = [
    { id: "dashboard", label: "My Journey", icon: "✝" },
    { id: "announcements", label: "Announcements", icon: "📢" },
    { id: "materials", label: "Materials", icon: "📚" },
  ];

  const nav = role === "admin" ? adminNav : studentNav;

  const titles = {
    dashboard: role === "admin" ? "Overview" : "My Journey",
    students: "Catechumens",
    announcements: "Announcements",
    materials: "Materials & Downloads",
    calendar: "Class Calendar",
  };

  const switchRole = (r) => { setRole(r); setPage("dashboard"); };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="sidebar">
          <div className="sidebar-logo">
            <div className="parish">St. Catherine of Siena</div>
            <h2>OCIA<br />Program</h2>
            <span className="badge">Carrollton, TX</span>
          </div>

          <div className="sidebar-nav">
            {nav.map(item => (
              <div key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            {role === "student" && students.length > 0 && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>Viewing as</div>
                <select style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: COLORS.white, padding: "5px 8px", fontSize: 12, cursor: "pointer" }}
                  value={studentId} onChange={e => setStudentId(Number(e.target.value))}>
                  {students.map(s => <option key={s.id} value={s.id} style={{ color: COLORS.navy }}>{s.name}</option>)}
                </select>
              </div>
            )}
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>View as</div>
            <div className="role-switch">
              <div className={`role-btn ${role === "admin" ? "active" : ""}`} onClick={() => switchRole("admin")}>Teacher</div>
              <div className={`role-btn ${role === "student" ? "active" : ""}`} onClick={() => switchRole("student")}>Student</div>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="topbar">
            <div className="topbar-title">{titles[page]}</div>
            <div className="topbar-right">
              <span style={{ fontSize: 13, color: COLORS.muted }}>
                {role === "admin" ? "Teacher View" : student?.name}
              </span>
              <div className="avatar">
                {role === "admin" ? "T" : student?.name?.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
            </div>
          </div>

          <div className="content">
            {role === "admin" && page === "dashboard" && <AdminDashboard students={students} announcements={announcements} events={events} />}
            {role === "admin" && page === "students" && <AdminStudents students={students} setStudents={setStudents} />}
            {role === "admin" && page === "announcements" && <AdminAnnouncements announcements={announcements} setAnnouncements={setAnnouncements} />}
            {role === "admin" && page === "materials" && <AdminMaterials materials={materials} setMaterials={setMaterials} />}
            {role === "admin" && page === "calendar" && <AdminCalendar events={events} setEvents={setEvents} />}

            {role === "student" && page === "dashboard" && <StudentDashboard student={student} announcements={announcements} events={events} />}
            {role === "student" && page === "announcements" && <StudentAnnouncements announcements={announcements} />}
            {role === "student" && page === "materials" && <StudentMaterials materials={materials} />}
          </div>
        </div>
      </div>
    </>
  );
}
