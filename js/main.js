/* ============ 編集する設定はここだけ / EDIT SETTINGS HERE ============ */
const CONFIG = {
  // ADD YOUR EMAIL HERE
  email: "arker120617@gmail.com",
  // ADD YOUR PHONE NUMBER HERE
  phone: "090-3843-1199",
  // ADD YOUR SNS URLs HERE (空欄ならボタン非表示)
  github: "", linkedin: "", instagram: "https://www.instagram.com/dare_ak2060/",
  location: "Japan",
  // CONTACT FORM: Formspreeで作成したURL (例: https://formspree.io/f/xxxxxxxx)
  formEndpoint: ""
};

// ADD YOUR PROJECT HERE: Web作品 (githubとdemoのURLは後から入力)
const WEB_PROJECTS = [
  { name: "Personal Portfolio Website", image: "images/projects/portfolio.jpg", tech: "HTML / CSS / JavaScript", github: "", demo: "",
    desc: "自分のスキル・経験・制作実績を紹介するレスポンシブWebサイト。" },
  { name: "Restaurant Landing Page", image: "images/projects/restaurant.jpg", tech: "HTML / CSS / JavaScript", github: "", demo: "",
    desc: "飲食店を想定したモダンなランディングページ。" },
  { name: "Travel Website", image: "images/projects/travel.jpg", tech: "HTML / CSS / JavaScript", github: "", demo: "",
    desc: "旅行・写真という自分の興味を活かした旅行紹介サイト。" }
];
// ADD YOUR PHOTO HERE: 画像を images/photography/ に置き、1行追加 (cat: Portrait / Landscape / Street / Event / Travel)
const PHOTOS = [
  // { src: "images/photography/portrait-01.jpg", alt: "人物写真の説明", cat: "Portrait" },
];
// ADD YOUR VIDEO HERE: url はYouTube埋め込みURL (https://www.youtube.com/embed/動画ID) または videos/内のmp4
// cat: Wedding / Event / Promotion / Short Film / Creative Video
const VIDEOS = [
  // { title: "動画タイトル", cat: "Event", thumb: "images/projects/video-01.jpg", url: "https://www.youtube.com/embed/XXXXXXXXXXX", desc: "説明" },
];
/* ====================================================================== */

const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// SNS / Contact info
const sns = [["GitHub", CONFIG.github], ["LinkedIn", CONFIG.linkedin], ["Instagram", CONFIG.instagram]].filter(x => x[1]);
$("#socialHero").innerHTML = $("#socialFooter").innerHTML = sns.map(([n, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${n}</a></li>`).join("");
const rows = [["メール", CONFIG.email, "mailto:" + CONFIG.email], ["電話", CONFIG.phone, "tel:" + CONFIG.phone.replace(/\s/g, "")],
  ["GitHub", CONFIG.github, CONFIG.github], ["LinkedIn", CONFIG.linkedin, CONFIG.linkedin], ["Instagram", CONFIG.instagram && "@dare_ak2060", CONFIG.instagram], ["所在地", CONFIG.location, ""]];
$("#contactInfo").innerHTML = rows.map(([l, v, h]) => `<li><span>${l}</span>${!v ? '<em class="muted">未設定</em>' : h ? `<a href="${esc(h)}">${esc(v)}</a>` : esc(v)}</li>`).join("");

// Web projects
$("#webGrid").innerHTML = WEB_PROJECTS.map(p => `<article class="card">
  <div class="thumb"><span>画像準備中</span><img src="${esc(p.image)}" alt="${esc(p.name)}のスクリーンショット" loading="lazy" onerror="this.remove()"></div>
  <h4>${esc(p.name)}</h4><p>${esc(p.desc)}</p><p><small>${esc(p.tech)}</small></p>
  <div class="links">${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>` : '<span class="muted">GitHub 準備中</span>'}${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : '<span class="muted">Demo 準備中</span>'}</div></article>`).join("");

// Photos + lightbox
const lb = $("#lightbox"), lbImg = $("img", lb);
$("#photoGrid").innerHTML = PHOTOS.length ? PHOTOS.map(p => `<figure><img src="${esc(p.src)}" alt="${esc(p.alt)}" loading="lazy"><figcaption>${esc(p.cat)}</figcaption></figure>`).join("")
  : '<p class="muted">写真は準備中です。js/main.js の PHOTOS に追加すると表示されます。</p>';
$("#photoGrid").addEventListener("click", e => { const i = e.target.closest("img"); if (i) { lbImg.src = i.src; lbImg.alt = i.alt; lb.hidden = false; } });
const closeLb = () => { lb.hidden = true; lbImg.removeAttribute("src"); };
lb.addEventListener("click", e => { if (e.target !== lbImg) closeLb(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLb(); });

// Videos (click thumbnail to play)
$("#videoGrid").innerHTML = VIDEOS.length ? VIDEOS.map((v, i) => `<article class="card"><button class="thumb" data-i="${i}" aria-label="${esc(v.title)}を再生">
  <img src="${esc(v.thumb || "")}" alt="${esc(v.title)}のサムネイル" loading="lazy" onerror="this.remove()">▶ 再生</button><h4>${esc(v.title)}</h4><p>${esc(v.cat)}${v.desc ? " / " + esc(v.desc) : ""}</p></article>`).join("")
  : '<p class="muted">映像作品は準備中です。js/main.js の VIDEOS に追加すると表示されます。</p>';
$("#videoGrid").addEventListener("click", e => {
  const b = e.target.closest("button[data-i]"); if (!b) return;
  const u = VIDEOS[b.dataset.i].url;
  b.innerHTML = /\.(mp4|webm)$/i.test(u) ? `<video src="${esc(u)}" controls autoplay style="width:100%;height:100%"></video>`
    : `<iframe src="${esc(u + (u.includes("?") ? "&" : "?") + "autoplay=1")}" title="動画" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
});

// Filters
document.querySelectorAll(".filters button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".filters button").forEach(x => x.classList.toggle("active", x === b));
  document.querySelectorAll("[data-g]").forEach(g => g.classList.toggle("hide", b.dataset.f !== "all" && g.dataset.g !== b.dataset.f));
}));

// Theme / mobile menu
const root = document.documentElement;
$("#themeBtn").onclick = () => { const t = root.dataset.theme === "dark" ? "light" : "dark"; root.dataset.theme = t; try { localStorage.setItem("theme", t); } catch (e) {} };
const menu = $("#menu"), burger = $("#burger");
burger.onclick = () => burger.setAttribute("aria-expanded", menu.classList.toggle("open"));
menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });

// Active nav + fade-in
const links = [...menu.querySelectorAll("a")];
const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.hash === "#" + e.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => spy.observe(s));
const fade = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); fade.unobserve(e.target); } }), { threshold: .08 });
document.querySelectorAll(".reveal").forEach(el => fade.observe(el));

// Contact form (Formspree)
$("#form").addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target, msg = $("#formMsg");
  if (!CONFIG.formEndpoint) { msg.textContent = "フォームが未設定です。js/main.js の CONFIG.formEndpoint にFormspreeのURLを設定してください。"; console.error("CONFIG.formEndpoint is empty."); return; }
  if (!f.reportValidity()) return;
  msg.textContent = "送信中...";
  try {
    const r = await fetch(CONFIG.formEndpoint, { method: "POST", body: new FormData(f), headers: { Accept: "application/json" } });
    if (!r.ok) throw 0;
    f.reset(); msg.textContent = "送信しました。ありがとうございます。";
  } catch { msg.textContent = "送信に失敗しました。時間をおいて再度お試しください。"; }
});
