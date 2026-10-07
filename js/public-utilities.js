/* Public Utilities page: search, filters, tables, modal, category nav, Ollama hook */

const PU_PAGE = { bank: 1, ngo: 1, bankSize: 10, ngoSize: 10 };

function puEscape(text) {
  return String(text == null ? "" : text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function puDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function puTelHref(phone) {
  const raw = String(phone || "").trim();
  if (!raw) return "";
  const digits = puDigits(raw);
  if (!digits) return "";
  if (raw.charAt(0) === "+" || digits.length > 10) return "tel:" + raw.replace(/\s+/g, "");
  if (raw.charAt(0) === "0") return "tel:" + digits;
  if (digits.length === 10) return "tel:+91" + digits;
  return "tel:" + digits;
}

function puWaHref(phone) {
  const digits = puDigits(phone);
  if (digits.length === 10) return "https://wa.me/91" + digits;
  if (digits.length === 11 && digits.charAt(0) === "0") return "https://wa.me/91" + digits.slice(1);
  if (digits.length >= 11 && digits.length <= 13) return "https://wa.me/" + digits;
  return "";
}

function puPhoneLinks(phones, className) {
  if (!phones || !phones.length) return '<span class="pu-na">' + PU_NA + "</span>";
  return phones.map(function (p) {
    const href = puTelHref(p);
    if (!href) return puEscape(p);
    return '<a class="' + (className || "pu-phone") + '" href="' + href + '">' + puEscape(p) + "</a>";
  }).join(" / ");
}

function puEmailLinks(emails) {
  if (!emails || !emails.length) return '<span class="pu-na">' + PU_NA + "</span>";
  return emails.map(function (e) {
    return '<a class="pu-mail" href="mailto:' + puEscape(e) + '">' + puEscape(e) + "</a>";
  }).join("<br>");
}

function puWaLinks(numbers) {
  if (!numbers || !numbers.length) return '<span class="pu-na">' + PU_NA + "</span>";
  return numbers.map(function (n) {
    const href = puWaHref(n);
    if (!href) return puEscape(n);
    return '<a class="pu-wa" href="' + href + '" target="_blank" rel="noopener noreferrer">' + puEscape(n) + "</a>";
  }).join(" / ");
}

function puMapsHref(address) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address);
}

function puHaystack() {
  const args = Array.prototype.slice.call(arguments);
  return args.join(" ").toLowerCase();
}

function puMatches(query, text) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return true;
  return puHaystack(text).indexOf(q) !== -1;
}

function getFilteredBanks() {
  const q = (document.getElementById("bankQuery") || {}).value || "";
  const bank = (document.getElementById("bankFilter") || {}).value || "";
  return PU_BANKS.filter(function (row) {
    const text = [row.mandal, row.village, row.bank, row.phone].join(" ");
    const hitQ = puMatches(q, text);
    const hitB = !bank || row.bank === bank;
    return hitQ && hitB;
  });
}

function getFilteredNgos() {
  const q = (document.getElementById("ngoQuery") || {}).value || "";
  const loc = (document.getElementById("ngoFilter") || {}).value || "";
  return PU_NGOS.filter(function (row) {
    const text = [row.name, (row.phones || []).join(" "), (row.whatsapp || []).join(" "), (row.emails || []).join(" "), row.website || ""].join(" ");
    const hitQ = puMatches(q, text);
    const hitL = !loc || row.name.toLowerCase().indexOf(loc.toLowerCase()) !== -1;
    return hitQ && hitL;
  });
}

function renderBankFilter() {
  const sel = document.getElementById("bankFilter");
  if (!sel) return;
  const names = [];
  PU_BANKS.forEach(function (row) {
    if (names.indexOf(row.bank) === -1) names.push(row.bank);
  });
  names.sort();
  sel.innerHTML = '<option value="">All banks</option>' + names.map(function (n) {
    return '<option value="' + puEscape(n) + '">' + puEscape(n) + "</option>";
  }).join("");
}

function renderNgoFilter() {
  const sel = document.getElementById("ngoFilter");
  if (!sel) return;
  const places = ["Paderu", "Araku", "Ananthagiri", "Hukumpeta", "Koyyuru", "Peddabayalu", "Dumbriguda", "Polavaram", "Visakhapatnam", "Anakapalli"];
  sel.innerHTML = '<option value="">All locations</option>' + places.map(function (p) {
    return '<option value="' + puEscape(p) + '">' + puEscape(p) + "</option>";
  }).join("");
}

function renderPager(id, page, totalPages, onChangeName) {
  const el = document.getElementById(id);
  if (!el) return;
  if (totalPages <= 1) {
    el.innerHTML = "";
    return;
  }
  let html = "";
  html += '<button type="button" class="pu-page-btn"' + (page <= 1 ? " disabled" : "") + ' onclick="' + onChangeName + '(' + (page - 1) + ')">Prev</button>';
  for (let i = 1; i <= totalPages; i++) {
    html += '<button type="button" class="pu-page-btn' + (i === page ? " is-current" : "") + '" onclick="' + onChangeName + '(' + i + ')">' + i + "</button>";
  }
  html += '<button type="button" class="pu-page-btn"' + (page >= totalPages ? " disabled" : "") + ' onclick="' + onChangeName + '(' + (page + 1) + ')">Next</button>';
  el.innerHTML = html;
}

function setBankPage(page) {
  PU_PAGE.bank = page;
  renderBanksTable();
}

function setNgoPage(page) {
  PU_PAGE.ngo = page;
  renderNgoDirectory();
}

function renderBanksTable() {
  const rows = getFilteredBanks();
  const totalPages = Math.max(1, Math.ceil(rows.length / PU_PAGE.bankSize));
  if (PU_PAGE.bank > totalPages) PU_PAGE.bank = 1;
  const start = (PU_PAGE.bank - 1) * PU_PAGE.bankSize;
  const slice = rows.slice(start, start + PU_PAGE.bankSize);
  const tbody = document.getElementById("bankTableBody");
  const cards = document.getElementById("bankCards");
  const count = document.getElementById("bankCount");
  if (count) count.textContent = rows.length + " of " + PU_BANKS.length + " branches";
  if (!tbody) return;
  if (!slice.length) {
    tbody.innerHTML = '<tr><td colspan="5">No matching bank branch.</td></tr>';
    if (cards) cards.innerHTML = '<p class="pu-empty">No matching bank branch.</p>';
    renderPager("bankPager", 1, 1, "setBankPage");
    return;
  }
  tbody.innerHTML = slice.map(function (row) {
    return "<tr>" +
      "<td>" + row.si + "</td>" +
      "<td>" + puEscape(row.mandal) + "</td>" +
      "<td>" + puEscape(row.village) + "</td>" +
      "<td>" + puEscape(row.bank) + "</td>" +
      "<td>" + puPhoneLinks([row.phone]) + ' <a class="pu-call-sm" href="' + puTelHref(row.phone) + '">Call</a></td>' +
      "</tr>";
  }).join("");
  if (cards) {
    cards.innerHTML = slice.map(function (row) {
      return '<article class="pu-mobile-card">' +
        "<h3>" + puEscape(row.bank) + "</h3>" +
        "<p><strong>Mandal:</strong> " + puEscape(row.mandal) + "</p>" +
        "<p><strong>Village:</strong> " + puEscape(row.village) + "</p>" +
        "<p><strong>SI.No:</strong> " + row.si + "</p>" +
        '<p><a class="pu-btn pu-btn-call" href="' + puTelHref(row.phone) + '">Call ' + puEscape(row.phone) + "</a></p>" +
        "</article>";
    }).join("");
  }
  renderPager("bankPager", PU_PAGE.bank, totalPages, "setBankPage");
}

function renderColleges() {
  const wrap = document.getElementById("collegeGrid");
  if (!wrap) return;
  wrap.innerHTML = PU_COLLEGES.map(function (c) {
    const firstTel = puTelHref(c.phones[0]);
    return '<article class="pu-college" data-service="college-' + c.si + '">' +
      '<button type="button" class="pu-college-hit" onclick="openUtilityModal(\'college-' + c.si + '\')">' +
      '<span class="pu-ico" aria-hidden="true">🎓</span>' +
      "<h3>" + puEscape(c.name) + "</h3>" +
      "<p>" + puEscape(c.location) + "</p>" +
      "</button>" +
      '<a class="pu-btn pu-btn-call" href="' + firstTel + '">Call now</a>' +
      "</article>";
  }).join("");
}

function renderNgoDirectory() {
  const rows = getFilteredNgos();
  const totalPages = Math.max(1, Math.ceil(rows.length / PU_PAGE.ngoSize));
  if (PU_PAGE.ngo > totalPages) PU_PAGE.ngo = 1;
  const start = (PU_PAGE.ngo - 1) * PU_PAGE.ngoSize;
  const slice = rows.slice(start, start + PU_PAGE.ngoSize);
  const tbody = document.getElementById("ngoTableBody");
  const cards = document.getElementById("ngoCards");
  const count = document.getElementById("ngoCount");
  if (count) count.textContent = rows.length + " of " + PU_NGOS.length + " organisations";
  if (!tbody) return;
  if (!slice.length) {
    tbody.innerHTML = '<tr><td colspan="5">No matching NGO.</td></tr>';
    if (cards) cards.innerHTML = '<p class="pu-empty">No matching NGO.</p>';
    renderPager("ngoPager", 1, 1, "setNgoPage");
    return;
  }
  tbody.innerHTML = slice.map(function (row) {
    return "<tr>" +
      "<td>" + row.si + "</td>" +
      "<td>" + puEscape(row.name) + "</td>" +
      "<td>" + puPhoneLinks(row.phones) + "</td>" +
      "<td>" + puWaLinks(row.whatsapp) + "</td>" +
      "<td>" + puEmailLinks(row.emails) + (row.website ? '<br><a href="' + puEscape(row.website) + '" target="_blank" rel="noopener noreferrer">' + puEscape(row.website.replace(/^https?:\/\//, "")) + "</a>" : "") + "</td>" +
      "</tr>";
  }).join("");
  if (cards) {
    cards.innerHTML = slice.map(function (row) {
      return '<article class="pu-mobile-card">' +
        "<p class=\"pu-si\">#" + row.si + "</p>" +
        "<h3>" + puEscape(row.name) + "</h3>" +
        "<p><strong>Contact:</strong> " + puPhoneLinks(row.phones) + "</p>" +
        "<p><strong>WhatsApp:</strong> " + puWaLinks(row.whatsapp) + "</p>" +
        "<p><strong>Email:</strong> " + puEmailLinks(row.emails) + "</p>" +
        "</article>";
    }).join("");
  }
  renderPager("ngoPager", PU_PAGE.ngo, totalPages, "setNgoPage");
}

function getServiceRecord(id) {
  if (id.indexOf("college-") === 0) {
    const si = Number(id.split("-")[1]);
    const c = PU_COLLEGES.filter(function (x) { return x.si === si; })[0];
    if (!c) return null;
    return { name: c.name, address: c.location, phones: c.phones, email: PU_NA, website: PU_NA };
  }
  if (id === "apePDCL") return { name: PU_ELECTRICITY.name, address: PU_ELECTRICITY.address + ", PIN " + PU_ELECTRICITY.pin, phones: PU_ELECTRICITY.phones, email: PU_ELECTRICITY.email, website: PU_NA };
  if (id === "gghPaderu") return { name: PU_HOSPITAL.name, address: PU_HOSPITAL.address, phones: PU_HOSPITAL.phones, email: PU_HOSPITAL.email, website: PU_NA };
  if (id === "paderuPO") return { name: PU_POST.name, address: PU_POST.address + ", PIN " + PU_POST.pin, phones: PU_POST.phones, email: PU_POST.email, website: PU_POST.website, websiteLabel: PU_POST.websiteLabel };
  if (id === "asrPolice") return { name: PU_POLICE.name, address: PU_POLICE.office + ", " + PU_POLICE.address + ", PIN " + PU_POLICE.pin, phones: PU_POLICE.phones, email: PU_POLICE.email, website: PU_NA };
  return null;
}

function openUtilityModal(id) {
  const rec = getServiceRecord(id);
  const modal = document.getElementById("puModal");
  const body = document.getElementById("puModalBody");
  if (!rec || !modal || !body) return;
  const emailHtml = rec.email && rec.email !== PU_NA
    ? '<a href="mailto:' + puEscape(rec.email) + '">' + puEscape(rec.email) + "</a>"
    : '<span class="pu-na">' + PU_NA + "</span>";
  const webHtml = rec.website && rec.website !== PU_NA
    ? '<a href="' + puEscape(rec.website) + '" target="_blank" rel="noopener noreferrer">' + puEscape(rec.websiteLabel || rec.website) + "</a>"
    : '<span class="pu-na">' + PU_NA + "</span>";
  const callBtn = rec.phones && rec.phones[0]
    ? '<a class="pu-btn pu-btn-call" href="' + puTelHref(rec.phones[0]) + '">Call</a>'
    : "";
  const mailBtn = rec.email && rec.email !== PU_NA
    ? '<a class="pu-btn pu-btn-mail" href="mailto:' + puEscape(rec.email) + '">Email</a>'
    : "";
  body.innerHTML =
    "<h3>" + puEscape(rec.name) + "</h3>" +
    "<p><strong>Address:</strong> " + puEscape(rec.address) + "</p>" +
    "<p><strong>Contact:</strong> " + puPhoneLinks(rec.phones) + "</p>" +
    "<p><strong>Email:</strong> " + emailHtml + "</p>" +
    "<p><strong>Website:</strong> " + webHtml + "</p>" +
    '<div class="pu-modal-actions">' + callBtn + mailBtn + "</div>";
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeUtilityModal() {
  const modal = document.getElementById("puModal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function scrollToUtility(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function searchPublicServices(query) {
  const q = (query || "").trim().toLowerCase();
  const out = [];
  if (!q) return out;
  PU_BANKS.forEach(function (row) {
    const text = puHaystack(row.mandal, row.village, row.bank, row.phone, "bank");
    if (text.indexOf(q) !== -1) {
      out.push({ type: "Bank", title: row.bank + " — " + row.village, detail: row.mandal + " | " + row.phone, href: "#banks", phone: row.phone });
    }
  });
  PU_COLLEGES.forEach(function (c) {
    const text = puHaystack(c.name, c.location, (c.phones || []).join(" "), "college degree");
    if (text.indexOf(q) !== -1) {
      out.push({ type: "Degree College", title: c.name, detail: c.location + " | " + c.phones.join(" / "), href: "#colleges", phone: c.phones[0], modal: "college-" + c.si });
    }
  });
  const elecText = puHaystack(PU_ELECTRICITY.name, PU_ELECTRICITY.address, PU_ELECTRICITY.email, PU_ELECTRICITY.phones.join(" "), "electricity apepdcl power");
  if (elecText.indexOf(q) !== -1) {
    out.push({ type: "Electricity", title: PU_ELECTRICITY.name, detail: PU_ELECTRICITY.phones[0], href: "#electricity", phone: PU_ELECTRICITY.phones[0], modal: "apePDCL" });
  }
  const hospText = puHaystack(PU_HOSPITAL.name, PU_HOSPITAL.address, PU_HOSPITAL.email, PU_HOSPITAL.phones.join(" "), "hospital medical ggh");
  if (hospText.indexOf(q) !== -1) {
    out.push({ type: "Hospital", title: PU_HOSPITAL.name, detail: PU_HOSPITAL.phones.join(" / "), href: "#hospital", phone: PU_HOSPITAL.phones[0], modal: "gghPaderu" });
  }
  const postText = puHaystack(PU_POST.name, PU_POST.address, PU_POST.email, PU_POST.phones.join(" "), "post office india post");
  if (postText.indexOf(q) !== -1) {
    out.push({ type: "Post Office", title: PU_POST.name, detail: PU_POST.pin + " | " + PU_POST.phones[0], href: "#post-office", phone: PU_POST.phones[0], modal: "paderuPO" });
  }
  PU_NGOS.forEach(function (row) {
    const text = puHaystack(row.name, (row.phones || []).join(" "), (row.emails || []).join(" "), "ngo");
    if (text.indexOf(q) !== -1) {
      out.push({ type: "NGO", title: row.name, detail: (row.phones && row.phones[0]) || PU_NA, href: "#ngos", phone: row.phones && row.phones[0] });
    }
  });
  const polText = puHaystack(PU_POLICE.name, PU_POLICE.office, PU_POLICE.address, PU_POLICE.email, PU_POLICE.phones.join(" "), "police sp");
  if (polText.indexOf(q) !== -1) {
    out.push({ type: "Police", title: PU_POLICE.name, detail: PU_POLICE.phones[0], href: "#police", phone: PU_POLICE.phones[0], modal: "asrPolice" });
  }
  return out;
}

function renderGlobalSearch() {
  const input = document.getElementById("puGlobalSearch");
  const box = document.getElementById("puSearchResults");
  if (!input || !box) return;
  const q = input.value.trim();
  if (!q) {
    box.hidden = true;
    box.innerHTML = "";
    return;
  }
  const hits = searchPublicServices(q);
  box.hidden = false;
  if (!hits.length) {
    box.innerHTML = "<p>No matching public service in this directory.</p>";
    return;
  }
  box.innerHTML = "<p>" + hits.length + " matching service" + (hits.length === 1 ? "" : "s") + "</p>" +
    hits.slice(0, 40).map(function (h) {
      const open = h.modal
        ? "openUtilityModal('" + h.modal + "')"
        : "scrollToUtility('" + h.href.replace("#", "") + "')";
      const call = h.phone ? ' <a class="pu-call-sm" href="' + puTelHref(h.phone) + '">Call</a>' : "";
      return '<article class="pu-hit"><span>' + puEscape(h.type) + "</span><button type=\"button\" onclick=\"" + open + "\">" +
        puEscape(h.title) + "</button><p>" + puEscape(h.detail) + call + "</p></article>";
    }).join("");
}

function buildUtilitiesContext() {
  const banks = PU_BANKS.map(function (r) {
    return r.si + ". " + r.bank + ", " + r.village + ", " + r.mandal + ", " + r.phone;
  }).join("\n");
  const colleges = PU_COLLEGES.map(function (c) {
    return c.name + " (" + c.location + ") " + c.phones.join(" / ");
  }).join("\n");
  const ngos = PU_NGOS.map(function (n) {
    return n.si + ". " + n.name + " | " + (n.phones.join(" / ") || PU_NA) + " | " + (n.emails.join(" / ") || PU_NA);
  }).join("\n");
  return [
    "PUBLIC UTILITIES — Alluri Sitharama Raju District",
    "BANKS:\n" + banks,
    "DEGREE COLLEGES:\n" + colleges,
    "APEPDCL Circle Office: " + PU_ELECTRICITY.address + " Email " + PU_ELECTRICITY.email + " Phone " + PU_ELECTRICITY.phones.join(" / ") + " PIN " + PU_ELECTRICITY.pin,
    "Government General Hospital, Paderu: " + PU_HOSPITAL.address + " Contact " + PU_HOSPITAL.phones.join(" / ") + " Email " + PU_HOSPITAL.email,
    "Paderu Sub Post Office: " + PU_POST.address + " PIN " + PU_POST.pin + " Contact " + PU_POST.phones.join(" / ") + " Email " + PU_POST.email + " Website " + PU_POST.website,
    "POLICE: " + PU_POLICE.name + " " + PU_POLICE.office + " " + PU_POLICE.address + " Email " + PU_POLICE.email + " Phone " + PU_POLICE.phones.join(" / ") + " PIN " + PU_POLICE.pin,
    "NGOs:\n" + ngos
  ].join("\n\n");
}

async function askOllama(question) {
  const lang = typeof getLang === "function" ? getLang() : "en";
  if (typeof askOllamaAPI !== "function") {
    return { success: false, error: "Ollama connector is not loaded. Add OLLAMA_CONFIG in js/ollama.js later." };
  }
  return askOllamaAPI(question, buildUtilitiesContext(), lang);
}

function matchPublicUtilitiesKnowledge(query) {
  const q = (query || "").toLowerCase();
  if (!q) return null;
  const hits = searchPublicServices(q.replace(/lo |enti|unnayi|em |contact|number|phone/g, " ").trim() || q);
  const wantsBank = /bank|apgvb|sbi|hdfc|uco|dccb|pnb/.test(q);
  const wantsCollege = /college|degree|araku valley lo degree/.test(q);
  const wantsHosp = /hospital|ggh|vaidyam/.test(q);
  const wantsElec = /apepdcl|electric|current|power/.test(q);
  const wantsPost = /post office|indiapost|tpaal/.test(q);
  const wantsNgo = /ngo/.test(q);
  const wantsPolice = /police|sp_asr|100/.test(q) && /police|sp|office/.test(q);
  if (wantsHosp) {
    return PU_HOSPITAL.name + ", " + PU_HOSPITAL.address + ". Contact: " + PU_HOSPITAL.phones.join(" / ") + ". Email: " + PU_HOSPITAL.email;
  }
  if (wantsElec) {
    return PU_ELECTRICITY.name + ", " + PU_ELECTRICITY.address + ". Phone: " + PU_ELECTRICITY.phones[0] + ". Email: " + PU_ELECTRICITY.email + ". PIN: " + PU_ELECTRICITY.pin;
  }
  if (wantsPolice) {
    return PU_POLICE.name + ", " + PU_POLICE.office + ", " + PU_POLICE.address + ". Phone: " + PU_POLICE.phones[0] + ". Email: " + PU_POLICE.email;
  }
  if (wantsPost) {
    return PU_POST.name + ", " + PU_POST.address + ". PIN: " + PU_POST.pin + ". Contact: " + PU_POST.phones[0] + ". Email: " + PU_POST.email;
  }
  if (wantsCollege) {
    const loc = /araku/.test(q) ? "araku" : /paderu/.test(q) ? "paderu" : /chinthapalli|chintapalli/.test(q) ? "chinthapalli" : /koyyuru/.test(q) ? "koyyuru" : "";
    const list = PU_COLLEGES.filter(function (c) {
      return !loc || (c.name + " " + c.location).toLowerCase().indexOf(loc) !== -1;
    });
    return list.map(function (c) { return c.name + " — " + c.phones.join(" / "); }).join("\n");
  }
  if (wantsBank) {
    const loc = /paderu/.test(q) ? "paderu" : /araku/.test(q) ? "araku" : "";
    const list = PU_BANKS.filter(function (r) {
      const blob = (r.mandal + " " + r.village + " " + r.bank).toLowerCase();
      if (/apgvb/.test(q) && r.bank.toLowerCase() !== "apgvb") return false;
      if (loc && blob.indexOf(loc) === -1) return false;
      return true;
    });
    return list.length ? list.map(function (r) { return r.bank + ", " + r.village + " (" + r.mandal + ") — " + r.phone; }).join("\n") : null;
  }
  if (wantsNgo) {
    const loc = /araku/.test(q) ? "araku" : /paderu/.test(q) ? "paderu" : "";
    const list = PU_NGOS.filter(function (n) {
      return !loc || n.name.toLowerCase().indexOf(loc) !== -1;
    }).slice(0, 12);
    return list.map(function (n) { return n.name + " — " + (n.phones.join(" / ") || PU_NA); }).join("\n");
  }
  if (hits.length) {
    return hits.slice(0, 8).map(function (h) { return h.type + ": " + h.title + " — " + h.detail; }).join("\n");
  }
  return null;
}

function customiseUtilitiesChatbot() {
  const title = document.querySelector("#chatbotWidget .chat-header-title h4");
  const sub = document.querySelector("#chatbotWidget .chat-header-title .subtitle");
  const launcher = document.getElementById("chatbotLauncher");
  if (title) title.textContent = "ASR District Public Utilities Assistant";
  if (sub) sub.textContent = "Banks, colleges, hospital, NGOs and police directory";
  if (launcher) launcher.setAttribute("aria-label", "Open ASR District Public Utilities Assistant");
  const chips = document.getElementById("chatChipsRow");
  if (chips) {
    const qs = [
      "Paderu lo banks em unnayi?",
      "Araku Valley lo degree colleges em unnayi?",
      "Paderu hospital contact number enti?",
      "NGOs in Araku Valley",
      "APEPDCL office contact details",
      "Police office phone number"
    ];
    chips.innerHTML = qs.map(function (q) {
      return '<button type="button" class="chip-btn" onclick="askSuggestedQuestion(' + JSON.stringify(q) + ')">' + puEscape(q) + "</button>";
    }).join("");
  }
}

function hookUtilitiesChatbot() {
  if (typeof matchLocalKnowledge === "function") {
    const original = matchLocalKnowledge;
    window.matchLocalKnowledge = function (query, lang) {
      const local = matchPublicUtilitiesKnowledge(query);
      if (local) return local;
      return original(query, lang);
    };
  }
  if (typeof sendUserChatMessage === "function") {
    const originalSend = sendUserChatMessage;
    window.sendUserChatMessage = async function () {
      const input = document.getElementById("chatInput");
      if (!input) return originalSend();
      const question = input.value.trim();
      if (!question) return;
      input.value = "";
      addUserMessage(question);
      showTypingIndicator();
      const L = typeof getLang === "function" ? getLang() : "en";
      const result = await askOllama(question);
      removeTypingIndicator();
      if (result && result.success) {
        addBotMessage(result.text, result.source);
        return;
      }
      const localMatch = matchPublicUtilitiesKnowledge(question);
      if (localMatch) {
        addBotMessage(localMatch, "Source: Public Utilities directory (Ollama offline)");
        return;
      }
      const fallback = L === "en"
        ? "I could not find that information in the Public Utilities directory. Please verify it from the concerned official government department at Paderu."
        : "ఈ సమాచారం పబ్లిక్ యుటిలిటీస్ డైరెక్టరీలో లేదు. దయచేసి పాడేరులోని సంబంధిత ప్రభుత్వ కార్యాలయంలో నిర్ధారించుకోండి.";
      addBotMessage(fallback, null);
    };
  }
}

function initPublicUtilitiesPage() {
  renderBankFilter();
  renderNgoFilter();
  renderBanksTable();
  renderColleges();
  renderNgoDirectory();

  const bankQ = document.getElementById("bankQuery");
  const bankF = document.getElementById("bankFilter");
  if (bankQ) bankQ.addEventListener("input", function () { PU_PAGE.bank = 1; renderBanksTable(); });
  if (bankF) bankF.addEventListener("change", function () { PU_PAGE.bank = 1; renderBanksTable(); });

  const ngoQ = document.getElementById("ngoQuery");
  const ngoF = document.getElementById("ngoFilter");
  if (ngoQ) ngoQ.addEventListener("input", function () { PU_PAGE.ngo = 1; renderNgoDirectory(); });
  if (ngoF) ngoF.addEventListener("change", function () { PU_PAGE.ngo = 1; renderNgoDirectory(); });

  const globalForm = document.getElementById("puSearchForm");
  const globalInput = document.getElementById("puGlobalSearch");
  if (globalForm) {
    globalForm.addEventListener("submit", function (e) {
      e.preventDefault();
      renderGlobalSearch();
    });
  }
  if (globalInput) globalInput.addEventListener("input", renderGlobalSearch);

  const modal = document.getElementById("puModal");
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeUtilityModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeUtilityModal();
  });

  hookUtilitiesChatbot();
  setTimeout(customiseUtilitiesChatbot, 500);
}

document.addEventListener("DOMContentLoaded", initPublicUtilitiesPage);
