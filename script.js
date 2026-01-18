// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ===== Footer Year =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Contact Form (Copy to Clipboard) =====
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const text =
`Hello Pantho,

Name: ${name}
Email: ${email}

Message:
${message}
`;

    navigator.clipboard.writeText(text).then(() => {
      alert("Copied! Now paste it into your email and send to panthochaki12@gmail.com");
      form.reset();
    }).catch(() => {
      alert("Copy failed. Please manually copy your message.");
    });
  });
}

// ===== Theme Toggle (Dark/Light) =====
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") applyTheme(saved);
  else applyTheme("dark");
})();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

// ===== Projects Modal =====
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalSub = document.getElementById("modalSub");
const modalPoints = document.getElementById("modalPoints");

function openModal(data) {
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  modalImage.src = data.image;
  modalImage.alt = data.title;
  modalTitle.textContent = data.title;
  modalSub.textContent = `${data.brand} • ${data.tags}`;

  modalPoints.innerHTML = "";
  data.points.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    modalPoints.appendChild(li);
  });
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".project").forEach(card => {
  card.addEventListener("click", () => {
    const title = card.dataset.title || "Project";
    const brand = card.dataset.brand || "";
    const tags = card.dataset.tags || "";
    const image = card.dataset.image || "";
    const pointsRaw = card.dataset.points || "";
    const points = pointsRaw.split("|").map(s => s.trim()).filter(Boolean);
    openModal({ title, brand, tags, image, points });
  });
});

if (modalClose) modalClose.addEventListener("click", closeModal);

if (modal) {
  modal.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.dataset && t.dataset.close === "true") closeModal();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.classList.contains("open")) closeModal();
});

// ===== Workflow interactive detail =====
const wfData = {
  1: {
    title: "Buyer Brief",
    text: "Interpret buyer tech pack, performance targets (GSM/stretch/recovery), construction requirements, and feasibility risks before development.",
    chips: ["Tech pack", "Performance target", "Feasibility"]
  },
  2: {
    title: "Structure Build (iPolaris)",
    text: "Create structure layout, zoning, artwork alignment, and technical selections to match fit + performance goals while staying production-friendly.",
    chips: ["Zoning", "Artwork", "Structure logic"]
  },
  3: {
    title: "Machine Program (TOP-2V)",
    text: "Build stable machine logic, carrier behavior, stitch density control, and program corrections to ensure clean knitting and consistent output.",
    chips: ["Program stability", "Density", "Run consistency"]
  },
  4: {
    title: "Knit & Measure",
    text: "Knit samples, verify measurements, tube width, GSM, and stretch behavior. Identify defects and correct program/material parameters.",
    chips: ["Measurement", "Defect check", "Calibration"]
  },
  5: {
    title: "Dye Evaluation",
    text: "Coordinate dyeing and check post-dye changes in GSM, stretch, hand-feel, and dimensional stability. Adjust settings to hit targets.",
    chips: ["Post-dye", "Stability", "Target match"]
  },
  6: {
    title: "Fit Refinement",
    text: "Implement fit feedback: compression distribution, stitch tuning, and construction improvements. Iterate until size-set approval readiness.",
    chips: ["Fit", "Compression", "Refinement loop"]
  },
  7: {
    title: "Size-set & Bulk Support",
    text: "Finalize tech approval, handover programs, and provide ongoing bulk troubleshooting to maintain consistent quality and production speed.",
    chips: ["Handover", "Bulk support", "Consistency"]
  }
};

const wfSteps = document.querySelectorAll(".wf-step");
const wfTitle = document.getElementById("wfDetailTitle");
const wfText = document.getElementById("wfDetailText");
const wfChips = document.getElementById("wfDetailChips");

function renderWf(stepNum){
  const d = wfData[stepNum];
  if (!d || !wfTitle || !wfText || !wfChips) return;

  wfTitle.textContent = d.title;
  wfText.textContent = d.text;

  wfChips.innerHTML = "";
  d.chips.forEach(c => {
    const span = document.createElement("span");
    span.className = "pill";
    span.textContent = c;
    wfChips.appendChild(span);
  });
}

wfSteps.forEach(btn => {
  btn.addEventListener("click", () => {
    wfSteps.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    renderWf(btn.dataset.step);
  });
});

// initial render
renderWf(1);
