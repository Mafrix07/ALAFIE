/**
 * ==============================================================================
 * ALAFIÈ — LOGIQUE JAVASCRIPT DU PROTOTYPE (Mobile & Web)
 * Architecture : Vanilla JS modulaire, réactive et conforme aux Skills
 * Sans altération de la logique métier : Fiches médicales, Rappels, Observance,
 * Prévention des risques, Lecteur audio langues locales & Scanner boîte.
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// 1. GÉNÉRATEURS DE VISUELS GALÉNIQUES 3D SVG (Rendu réaliste des médicaments)
// ------------------------------------------------------------------------------
const DRUG_VISUALS = {
  // Comprimé sécable rond blanc avec rainure centrale et éclairage 3D
  tablet: `
    <svg viewBox="0 0 100 100" class="med-thumb-svg" aria-label="Comprimé rond sécable">
      <defs>
        <radialGradient id="tabGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="70%" stop-color="#e2e8e5"/>
          <stop offset="100%" stop-color="#bcc7c2"/>
        </radialGradient>
        <filter id="tabShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#063d32" flood-opacity="0.18"/>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="38" fill="url(#tabGrad)" filter="url(#tabShadow)"/>
      <!-- Rainure de sécabilité -->
      <line x1="50" y1="20" x2="50" y2="80" stroke="#a4b2ac" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Reflet de lumière supérieur -->
      <path d="M 28 32 A 32 32 0 0 1 72 32" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.8" stroke-linecap="round"/>
    </svg>
  `,

  // Gélule bicolore (Amoxicilline : jaune d'or / bordeaux ou ambre / ivoire)
  capsule: `
    <svg viewBox="0 0 100 100" class="med-thumb-svg" aria-label="Gélule bicolore">
      <defs>
        <linearGradient id="capTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5d47a"/>
          <stop offset="100%" stop-color="#c59b27"/>
        </linearGradient>
        <linearGradient id="capBot" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e36b64"/>
          <stop offset="100%" stop-color="#9e2a24"/>
        </linearGradient>
        <filter id="capShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#063d32" flood-opacity="0.2"/>
        </filter>
      </defs>
      <g transform="rotate(45 50 50)" filter="url(#capShadow)">
        <!-- Moitié supérieure -->
        <path d="M 36 30 A 14 14 0 0 1 64 30 L 64 50 L 36 50 Z" fill="url(#capTop)"/>
        <!-- Moitié inférieure -->
        <path d="M 36 50 L 64 50 L 64 70 A 14 14 0 0 1 36 70 Z" fill="url(#capBot)"/>
        <!-- Anneau de jonction -->
        <rect x="34" y="48.5" width="32" height="3" rx="1.5" fill="#ffffff" opacity="0.5"/>
        <!-- Reflet de surface -->
        <path d="M 40 24 L 40 76" stroke="#ffffff" stroke-width="2.5" opacity="0.6" stroke-linecap="round"/>
      </g>
    </svg>
  `,

  // Comprimé oblong pelliculé rose (Ibuprofène)
  oblong: `
    <svg viewBox="0 0 100 100" class="med-thumb-svg" aria-label="Comprimé oblong">
      <defs>
        <linearGradient id="obGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fedce5"/>
          <stop offset="60%" stop-color="#f5a3b7"/>
          <stop offset="100%" stop-color="#d66883"/>
        </linearGradient>
        <filter id="obShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#063d32" flood-opacity="0.18"/>
        </filter>
      </defs>
      <rect x="22" y="38" width="56" height="24" rx="12" fill="url(#obGrad)" transform="rotate(-30 50 50)" filter="url(#obShadow)"/>
      <line x1="30" y1="46" x2="70" y2="46" stroke="#ffffff" stroke-width="2.5" opacity="0.7" stroke-linecap="round" transform="rotate(-30 50 50)"/>
    </svg>
  `,

  // Pastille effervescente orange vitaminée
  effervescent: `
    <svg viewBox="0 0 100 100" class="med-thumb-svg" aria-label="Comprimé effervescent">
      <defs>
        <radialGradient id="effGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#ffe6c9"/>
          <stop offset="70%" stop-color="#f7a759"/>
          <stop offset="100%" stop-color="#cf6a17"/>
        </radialGradient>
        <filter id="effShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#063d32" flood-opacity="0.18"/>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="36" fill="url(#effGrad)" filter="url(#effShadow)"/>
      <!-- Micro-reliefs effervescents -->
      <circle cx="42" cy="40" r="2.5" fill="#ffffff" opacity="0.6"/>
      <circle cx="58" cy="46" r="3.5" fill="#ffffff" opacity="0.5"/>
      <circle cx="48" cy="62" r="2" fill="#ffffff" opacity="0.7"/>
      <circle cx="36" cy="56" r="3" fill="#ffffff" opacity="0.4"/>
      <path d="M 28 34 A 30 30 0 0 1 72 34" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.75" stroke-linecap="round"/>
    </svg>
  `
};

// ------------------------------------------------------------------------------
// 2. DONNÉES CLINIQUES OFFICIELLES (VALIDÉES PAR PHARMACIEN)
// ------------------------------------------------------------------------------
const DRUGS_DATA = {
  paracetamol: {
    id: "paracetamol",
    name: "Paracétamol 500 mg",
    dci: "Paracetamolum",
    form: "Comprimé sécable",
    visualType: "tablet",
    thumbClass: "thumb-blue",
    category: "douleur",
    classDesc: "Antalgique & antipyrétique de première intention",
    indication: "Traitement symptomatique des douleurs légères à modérées (maux de tête, maux de dents, courbatures, règles) et des états fébriles.",
    posology: "<strong>Adulte et enfant > 27 kg :</strong> 1 à 2 comprimés par prise, espacés d'au moins 4 heures. Ne jamais dépasser 3 000 mg (6 comprimés) par jour sans avis médical.",
    administration: "Par voie orale avec un grand verre d'eau. Peut être pris indifféremment pendant ou en dehors des repas.",
    precautions: [
      "Contre-indiqué formellement en cas d'insuffisance hépatique sévère (maladie grave du foie).",
      "Vérifiez l'absence de paracétamol dans vos autres spécialités (ex: sirops contre le rhume) pour éviter tout surdosage toxique.",
      "Éviter la prise conjointe d'alcool."
    ],
    generics: ["Doliprane®", "Efferalgan®", "Dafalgan®", "Paracétamol Biogaran"],
    sideEffects: "Très rares aux doses prescrites : réactions cutanées allergiques (démangeaisons, rougeurs). En cas d'apparition, arrêter le traitement."
  },
  amoxicilline: {
    id: "amoxicilline",
    name: "Amoxicilline 1 g",
    dci: "Amoxicillinum",
    form: "Comprimé dispersible",
    visualType: "capsule",
    thumbClass: "thumb-cream",
    category: "antibiotique",
    classDesc: "Antibiotique majeur (Famille des Bêta-lactamines / Pénicillines)",
    indication: "Traitement d'infections bactériennes confirmées : angines bactériennes, bronchites, otites, pneumopathies, infections dentaires ou urinaires.",
    posology: "<strong>Adulte :</strong> 1 g matin et soir (ou 1 g 3 fois/jour selon ordonnance). Respectez impérativement la durée complète prescrite, même si les symptômes disparaissent.",
    administration: "À avaler avec de l'eau ou à disperser dans un verre d'eau, de préférence au début des repas pour une meilleure tolérance stomacale.",
    precautions: [
      "CONTRE-INDICATION ABSOLUE en cas d'allergie déclarée aux pénicillines ou aux céphalosporines.",
      "Ne jamais réutiliser un reste d'antibiotique sans nouvel avis médical (risque d'antibiorésistance).",
      "Arrêt immédiat en cas d'éruption cutanée ou de gonflement du visage."
    ],
    generics: ["Clamoxyl®", "Amoxicilline Arrow", "Amoxicilline Sandoz", "Hiconcil®"],
    sideEffects: "Fréquents : légers désagréments digestifs (diarrhées bénignes, nausées). Exceptionnels mais graves : choc anaphylactique allergique."
  },
  ibuprofene: {
    id: "ibuprofene",
    name: "Ibuprofène 400 mg",
    dci: "Ibuprofenum",
    form: "Comprimé pelliculé",
    visualType: "oblong",
    thumbClass: "thumb-pink",
    category: "anti-inflammatoire",
    classDesc: "Anti-inflammatoire non stéroïdien (AINS) & Antalgique",
    indication: "Traitement de courte durée des douleurs aiguës (maux de tête, traumatismes articulaires, règles douloureuses) et de la fièvre.",
    posology: "<strong>Adulte :</strong> 1 comprimé (400 mg) par prise, à renouveler si besoin après 6 à 8 heures. Ne jamais dépasser 1 200 mg (3 comprimés) par 24h. Limiter à 3 à 5 jours sans ordonnance.",
    administration: "À prendre impérativement au cours d'un repas ou avec une collation pour protéger la paroi de l'estomac.",
    precautions: [
      "Contre-indiqué en cas d'ulcère gastrique, d'insuffisance rénale et chez la femme enceinte dès le 6e mois.",
      "Ne JAMAIS associer à un autre AINS ni à de l'aspirine.",
      "À proscrire en cas de varicelle."
    ],
    generics: ["Advil®", "Nurofen®", "Antarène®", "Ibuprofène Mylan"],
    sideEffects: "Brûlures d'estomac, nausées, vertiges. À surveiller : saignements digestifs lors de prises prolongées."
  },
  vitamine_c: {
    id: "vitamine_c",
    name: "Vitamine C 500 mg",
    dci: "Acidum ascorbicum",
    form: "Comprimé à croquer",
    visualType: "effervescent",
    thumbClass: "thumb-orange",
    category: "vitamine",
    classDesc: "Complément vitaminique & Défenses immunitaires",
    indication: "Traitement d'appoint de l'asthénie fonctionnelle (fatigue passagère) et prévention des carences en acide ascorbique.",
    posology: "<strong>Adulte :</strong> 1 comprimé par jour le matin ou le midi. Éviter la prise après 16h pour ne pas perturber l'endormissement.",
    administration: "À croquer ou sucer, idéalement au cours du petit-déjeuner.",
    precautions: [
      "Prudence chez les patients sujets aux calculs rénaux oxaliques.",
      "Ne pas dépasser 15 jours sans réévaluation médicale si la fatigue perdure."
    ],
    generics: ["Laroscorbine®", "Upsa C®", "Vitascorbol®"],
    sideEffects: "À fortes doses (> 1 g/jour) : troubles digestifs légers, sensation de nervosité."
  }
};

// ------------------------------------------------------------------------------
// 3. ÉTAT DE L'APPLICATION & MULTIPROFIL (MODE AIDANT)
// ------------------------------------------------------------------------------
let currentProfile = "self"; // "self" (Moi) ou "parent" (Maman)

const PROFILES_DATA = {
  self: {
    name: "Mario-Francisco",
    avatar: "MF",
    label: "Moi",
    reminders: [
      { id: 1, time: "08:00", name: "Paracétamol 500 mg", dose: "1 comprimé · après le repas", done: true },
      { id: 2, time: "12:00", name: "Amoxicilline 1 g", dose: "1 comprimé dispersible · au début du repas", done: false },
      { id: 3, time: "18:00", name: "Vitamine C 500 mg", dose: "1 comprimé · à croquer", done: false }
    ],
    allergies: ["Pénicilline", "Aspirine (AINS)"],
    hasAlert: true
  },
  parent: {
    name: "Maman (Aidant)",
    avatar: "MA",
    label: "Maman",
    reminders: [
      { id: 101, time: "07:30", name: "Amlodipine 5 mg", dose: "1 comprimé · le matin", done: true },
      { id: 102, time: "12:30", name: "Metformine 850 mg", dose: "1 comprimé · pendant le repas", done: true },
      { id: 103, time: "19:30", name: "Metformine 850 mg", dose: "1 comprimé · pendant le repas", done: false }
    ],
    allergies: ["Sulfamides"],
    hasAlert: false
  }
};

let userReminders = [...PROFILES_DATA.self.reminders];
let activeDrugKey = "paracetamol";

// ------------------------------------------------------------------------------
// 4. NAVIGATION MULTI-PLATEFORME FLUIDE
// ------------------------------------------------------------------------------
const SCREEN_TITLES = {
  home: "Accueil · Tableau de bord",
  medicaments: "Fiches Médicaments",
  "drug-detail": "Fiche Médicament",
  rappels: "Mes Rappels",
  securite: "Sécurité & Profil",
  pharmacies: "Pharmacies de garde",
  contact: "Avis Pharmacien"
};

const screens = document.querySelectorAll(".screen-flow");
const dockBtns = document.querySelectorAll(".dock-btn");
const sidebarMenuItems = document.querySelectorAll(".menu-item");

function showScreen(screenId) {
  screens.forEach(s => s.classList.toggle("active-screen", s.id === screenId));

  // Sync barre mobile + sidebar desktop
  dockBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.screen === screenId));
  sidebarMenuItems.forEach(item => item.classList.toggle("active", item.dataset.screen === screenId));

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Clics nav mobile et desktop
document.querySelectorAll("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.go));
});
dockBtns.forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.screen));
});
sidebarMenuItems.forEach(item => {
  item.addEventListener("click", () => showScreen(item.dataset.screen));
});

// Retour catalogue depuis fiche détaillée
document.querySelector("#btn-back-to-catalog")?.addEventListener("click", () => {
  showScreen("medicaments");
});

// ------------------------------------------------------------------------------
// 5. GESTION DU PROFIL AIDANT / MULTIPATIENT
// ------------------------------------------------------------------------------
function switchProfile(profileKey) {
  currentProfile = profileKey;
  const p = PROFILES_DATA[profileKey];

  userReminders = [...p.reminders];

  // Mise à jour de l'UI
  const activeProfileName = document.querySelector("#active-profile-name");
  const avatarLabel = document.querySelector("#avatar-label");
  const profileTagLabel = document.querySelector("#profile-tag-label");

  if (activeProfileName) activeProfileName.textContent = p.name;
  if (avatarLabel) avatarLabel.textContent = p.avatar;
  if (profileTagLabel) profileTagLabel.textContent = p.label;

  // Toggle pills desktop
  document.querySelectorAll("#desktop-profile-toggle .toggle-pill").forEach(pill => {
    pill.classList.toggle("active", pill.dataset.profile === profileKey);
  });

  updateStatsAndTimeline();
  notify(`Profil actif : ${p.name}`);
}

// Toggle mobile au clic sur l'avatar topbar
document.querySelector("#btn-toggle-profile")?.addEventListener("click", () => {
  const nextProfile = currentProfile === "self" ? "parent" : "self";
  switchProfile(nextProfile);
});

// Toggle desktop
document.querySelectorAll("#desktop-profile-toggle .toggle-pill").forEach(pill => {
  pill.addEventListener("click", () => {
    switchProfile(pill.dataset.profile);
  });
});

// ------------------------------------------------------------------------------
// 6. CATALOGUE DES MÉDICAMENTS (RENDU 3D & FILTRAGE)
// ------------------------------------------------------------------------------
const medicationsDeck = document.querySelector("#medications-deck");
const medSearchInput = document.querySelector("#med-search-input");
const categoryFilterPills = document.querySelectorAll("#category-filters-track .filter-pill");
let activeCategoryFilter = "all";

function renderMedicationsDeck(queryStr = "") {
  if (!medicationsDeck) return;

  const q = queryStr.toLowerCase().trim();
  const list = Object.values(DRUGS_DATA);

  const filtered = list.filter(drug => {
    const matchCat = activeCategoryFilter === "all" || drug.category === activeCategoryFilter;
    const matchQ = !q || 
      drug.name.toLowerCase().includes(q) || 
      drug.dci.toLowerCase().includes(q) || 
      drug.classDesc.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  if (filtered.length === 0) {
    medicationsDeck.innerHTML = `
      <div style="text-align:center; padding:36px 16px; background:#fff; border-radius:16px; border:1px solid rgba(6,61,50,0.08);">
        <span style="font-size:32px; display:block; margin-bottom:8px;">🔍</span>
        <strong style="color:var(--text-headline);">Aucun résultat correspondant</strong>
        <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">Essayez le nom de la molécule (DCI) ou une autre catégorie.</p>
      </div>
    `;
    return;
  }

  medicationsDeck.innerHTML = filtered.map(drug => `
    <article class="med-card-premium" data-id="${drug.id}">
      <div class="med-visual-thumb ${drug.thumbClass}">
        ${DRUG_VISUALS[drug.visualType] || DRUG_VISUALS.tablet}
      </div>
      <div class="med-meta-col">
        <b>${drug.name}</b>
        <span class="med-dci-line">DCI : <em>${drug.dci}</em> · ${drug.form}</span>
      </div>
      <span class="med-lead-arrow">›</span>
    </article>
  `).join("");

  medicationsDeck.querySelectorAll(".med-card-premium").forEach(card => {
    card.addEventListener("click", () => {
      openDrugSheet(card.dataset.id);
    });
  });
}

medSearchInput?.addEventListener("input", e => {
  renderMedicationsDeck(e.target.value);
});

categoryFilterPills.forEach(pill => {
  pill.addEventListener("click", () => {
    categoryFilterPills.forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    activeCategoryFilter = pill.dataset.filter;
    renderMedicationsDeck(medSearchInput ? medSearchInput.value : "");
  });
});

// ------------------------------------------------------------------------------
// 7. FICHE MÉDICAMENT DÉTAILLÉE (DRUG DETAIL SCREEN)
// ------------------------------------------------------------------------------
function openDrugSheet(drugId) {
  const drug = DRUGS_DATA[drugId];
  if (!drug) return;

  activeDrugKey = drugId;

  // Injection textuelle
  document.querySelector("#detail-title-name").textContent = drug.name;
  document.querySelector("#detail-dci-name").textContent = drug.dci;
  document.querySelector("#detail-form-tag").textContent = drug.form;
  document.querySelector("#detail-class-line").textContent = drug.classDesc;
  document.querySelector("#detail-indication-text").textContent = drug.indication;
  document.querySelector("#detail-posology-text").innerHTML = drug.posology;
  document.querySelector("#detail-admin-text").textContent = drug.administration;
  document.querySelector("#detail-side-effects-text").textContent = drug.sideEffects;

  // Visuel galénique HD SVG
  const visualBox = document.querySelector("#detail-visual-box");
  if (visualBox) {
    visualBox.innerHTML = DRUG_VISUALS[drug.visualType] || DRUG_VISUALS.tablet;
  }

  // Précautions checklist
  const precList = document.querySelector("#detail-precautions-list");
  if (precList) {
    precList.innerHTML = drug.precautions.map(p => `<li>${p}</li>`).join("");
  }

  // Génériques
  const genericsMosaic = document.querySelector("#detail-generics-mosaic");
  if (genericsMosaic) {
    genericsMosaic.innerHTML = drug.generics.map(g => `<span class="generic-pill-chip">${g}</span>`).join("");
  }

  // Nom dans la modale de planification
  document.querySelector("#modal-drug-title").textContent = `Ajouter ${drug.name}`;

  // Réinitialiser le lecteur audio
  resetAudioPlayer();

  showScreen("drug-detail");
}

// ------------------------------------------------------------------------------
// 8. LECTEUR AUDIO EN LANGUES LOCALES (INCLUSION V2)
// ------------------------------------------------------------------------------
let isAudioPlaying = false;
let audioTimer = null;
let audioSeconds = 0;

const btnPlayAudio = document.querySelector("#btn-play-audio");
const playIcon = document.querySelector("#play-icon");
const waveformBars = document.querySelector("#waveform-bars");
const audioTimeLabel = document.querySelector("#audio-time-label");
const audioLangSelector = document.querySelector("#audio-lang-selector");
const currentLangPill = document.querySelector("#current-lang-pill");

function resetAudioPlayer() {
  isAudioPlaying = false;
  clearInterval(audioTimer);
  audioSeconds = 0;
  if (playIcon) playIcon.textContent = "▶";
  if (waveformBars) waveformBars.classList.remove("is-playing");
  if (audioTimeLabel) audioTimeLabel.textContent = "0:00";
}

btnPlayAudio?.addEventListener("click", () => {
  isAudioPlaying = !isAudioPlaying;

  if (isAudioPlaying) {
    playIcon.textContent = "❚❚";
    waveformBars.classList.add("is-playing");
    notify(`Lecture audio en ${audioLangSelector.value.toUpperCase()} démarrée`);

    audioTimer = setInterval(() => {
      audioSeconds++;
      const mins = Math.floor(audioSeconds / 60);
      const secs = String(audioSeconds % 60).padStart(2, "0");
      if (audioTimeLabel) audioTimeLabel.textContent = `${mins}:${secs}`;

      if (audioSeconds >= 45) {
        resetAudioPlayer();
        notify("Fin de la notice audio.");
      }
    }, 1000);
  } else {
    resetAudioPlayer();
  }
});

audioLangSelector?.addEventListener("change", (e) => {
  const selectedText = e.target.options[e.target.selectedIndex].text.split(" ")[0];
  if (currentLangPill) currentLangPill.textContent = selectedText;
  resetAudioPlayer();
  notify(`Langue audio modifiée : ${selectedText}`);
});

// ------------------------------------------------------------------------------
// 9. OBSERVANCE & TIMELINE DES RAPPELS
// ------------------------------------------------------------------------------
const remindersTrack = document.querySelector("#reminders-timeline-track");
const adherenceStatusPhrase = document.querySelector("#adherence-status-phrase");
const dialNumText = document.querySelector("#dial-num-text");
const dialCircleFill = document.querySelector("#dial-circle-fill");
const celebrateStrip = document.querySelector("#celebrate-strip");

const metricRatio = document.querySelector("#metric-ratio");
const metricPercentage = document.querySelector("#metric-percentage");
const metricFillGreen = document.querySelector("#metric-fill-green");
const metricFillGold = document.querySelector("#metric-fill-gold");
const upcomingDoseCard = document.querySelector("#upcoming-dose-card");
const nextDoseTimeHour = document.querySelector("#next-dose-time-hour");
const nextDoseName = document.querySelector("#next-dose-name");
const nextDoseInstruction = document.querySelector("#next-dose-instruction");
const menuRemindersBadge = document.querySelector("#menu-reminders-badge");

function updateStatsAndTimeline() {
  const total = userReminders.length;
  const doneCount = userReminders.filter(r => r.done).length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  // Calcul du stroke-dashoffset du cadran (circonférence ~213)
  const offset = 213 - (213 * (pct / 100));
  if (dialCircleFill) dialCircleFill.style.strokeDashoffset = offset;
  if (dialNumText) dialNumText.textContent = `${pct}%`;
  if (adherenceStatusPhrase) {
    adherenceStatusPhrase.textContent = `${doneCount} prise${doneCount > 1 ? "s" : ""} sur ${total} effectuée${doneCount > 1 ? "s" : ""}`;
  }

  // Bannière célébration
  if (celebrateStrip) {
    celebrateStrip.style.display = (total > 0 && doneCount === total) ? "flex" : "none";
  }

  // Métriques Accueil
  if (metricRatio) metricRatio.textContent = `${doneCount} / ${total}`;
  if (metricPercentage) metricPercentage.textContent = `${pct}%`;
  if (metricFillGreen) metricFillGreen.style.width = `${pct}%`;
  if (metricFillGold) metricFillGold.style.width = `${pct}%`;
  if (menuRemindersBadge) menuRemindersBadge.textContent = String(total);

  // Prochaine dose
  const nextPending = userReminders.find(r => !r.done);
  if (upcomingDoseCard) {
    if (nextPending) {
      upcomingDoseCard.style.display = "flex";
      if (nextDoseTimeHour) nextDoseTimeHour.textContent = nextPending.time;
      if (nextDoseName) nextDoseName.textContent = nextPending.name;
      if (nextDoseInstruction) nextDoseInstruction.textContent = nextPending.dose;
    } else {
      upcomingDoseCard.style.display = "none";
    }
  }

  // Rendu de la timeline
  if (remindersTrack) {
    if (userReminders.length === 0) {
      remindersTrack.innerHTML = `
        <div style="text-align:center; padding:30px; background:#fff; border-radius:16px;">
          <p style="color:var(--text-muted);">Aucun rappel programmé pour ce profil.</p>
        </div>
      `;
      return;
    }

    remindersTrack.innerHTML = userReminders.map(item => `
      <div class="timeline-unit ${item.done ? "is-validated" : ""}" data-id="${item.id}">
        <div class="unit-time-col">${item.time}</div>
        <div class="unit-info-col">
          <strong class="unit-drug-name">${item.name}</strong>
          <span class="unit-dose-legend">${item.dose}</span>
        </div>
        <button class="btn-unit-check" aria-label="Valider la prise">${item.done ? "✓" : ""}</button>
        <button class="btn-unit-del" aria-label="Supprimer le rappel">🗑</button>
      </div>
    `).join("");

    remindersTrack.querySelectorAll(".timeline-unit").forEach(row => {
      const id = parseInt(row.dataset.id, 10);

      row.querySelector(".btn-unit-check").addEventListener("click", () => {
        const item = userReminders.find(r => r.id === id);
        if (item) {
          item.done = !item.done;
          notify(item.done ? `Prise de ${item.name} confirmée !` : `Prise de ${item.name} remise en attente`);
          updateStatsAndTimeline();
        }
      });

      row.querySelector(".btn-unit-del").addEventListener("click", (e) => {
        e.stopPropagation();
        userReminders = userReminders.filter(r => r.id !== id);
        notify("Rappel retiré");
        updateStatsAndTimeline();
      });
    });
  }
}

// Clic rapide sur l'accueil : "✓ Pris"
document.querySelector("#btn-quick-take-home")?.addEventListener("click", () => {
  const nextPending = userReminders.find(r => !r.done);
  if (nextPending) {
    nextPending.done = true;
    notify(`Prise de ${nextPending.name} enregistrée !`);
    updateStatsAndTimeline();
  }
});

// ------------------------------------------------------------------------------
// 10. PLANIFICATEUR DE TRAITEMENT (MODAL BOTTOM SHEET)
// ------------------------------------------------------------------------------
const treatmentModal = document.querySelector("#treatment-modal");
const btnCloseModal = document.querySelector("#btn-close-modal");
const btnCancelModal = document.querySelector("#btn-cancel-modal");
const addTreatmentForm = document.querySelector("#add-treatment-form");

function openTreatmentModal(drugKey = activeDrugKey) {
  const drug = DRUGS_DATA[drugKey] || DRUGS_DATA.paracetamol;
  document.querySelector("#modal-drug-title").textContent = `Ajouter ${drug.name}`;
  if (treatmentModal) treatmentModal.style.display = "flex";
}

function closeTreatmentModal() {
  if (treatmentModal) treatmentModal.style.display = "none";
}

document.querySelector("#btn-add-to-plan-top")?.addEventListener("click", () => openTreatmentModal());
document.querySelector("#btn-add-to-plan-bottom")?.addEventListener("click", () => openTreatmentModal());
document.querySelector("#btn-add-reminder-standalone")?.addEventListener("click", () => openTreatmentModal("paracetamol"));

btnCloseModal?.addEventListener("click", closeTreatmentModal);
btnCancelModal?.addEventListener("click", closeTreatmentModal);

treatmentModal?.addEventListener("click", (e) => {
  if (e.target === treatmentModal) closeTreatmentModal();
});

addTreatmentForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const drug = DRUGS_DATA[activeDrugKey] || DRUGS_DATA.paracetamol;
  const dose = document.querySelector("#modal-dose-input").value;
  const time = document.querySelector("#modal-time-input").value || "08:00";
  const moment = document.querySelector("#modal-moment-input").value;

  const newReminder = {
    id: Date.now(),
    time: time,
    name: drug.name,
    dose: `${dose} · ${moment}`,
    done: false
  };

  userReminders.push(newReminder);
  userReminders.sort((a, b) => a.time.localeCompare(b.time));

  closeTreatmentModal();
  updateStatsAndTimeline();
  notify(`Rappel programmé : ${drug.name} à ${time} !`);
  showScreen("rappels");
});

// ------------------------------------------------------------------------------
// 11. SIMULATEUR SCANNER CODE-BARRES BOÎTE (PROTOTYPE V2)
// ------------------------------------------------------------------------------
const scannerModal = document.querySelector("#scanner-modal");
const btnOpenScanner = document.querySelector("#btn-open-scanner");
const btnTriggerScanInline = document.querySelector("#btn-trigger-scan-inline");
const btnCloseScanner = document.querySelector("#btn-close-scanner");
const btnOpenScannedDrug = document.querySelector("#btn-open-scanned-drug");

function openScanner() {
  if (scannerModal) scannerModal.style.display = "flex";
}

function closeScanner() {
  if (scannerModal) scannerModal.style.display = "none";
}

btnOpenScanner?.addEventListener("click", openScanner);
btnTriggerScanInline?.addEventListener("click", openScanner);
btnCloseScanner?.addEventListener("click", closeScanner);

scannerModal?.addEventListener("click", (e) => {
  if (e.target === scannerModal) closeScanner();
});

btnOpenScannedDrug?.addEventListener("click", () => {
  closeScanner();
  notify("Boîte d'Amoxicilline 1 g identifiée !");
  openDrugSheet("amoxicilline");
});

// ------------------------------------------------------------------------------
// 12. GESTION DES ALLERGIES
// ------------------------------------------------------------------------------
const allergyModal = document.querySelector("#allergy-modal");
const btnAddAllergyModal = document.querySelector("#btn-add-allergy-modal");
const btnCloseAllergyModal = document.querySelector("#btn-close-allergy-modal");
const btnCancelAllergyModal = document.querySelector("#btn-cancel-allergy-modal");
const addAllergyForm = document.querySelector("#add-allergy-form");
const allergiesMosaic = document.querySelector("#allergies-mosaic");

btnAddAllergyModal?.addEventListener("click", () => {
  if (allergyModal) allergyModal.style.display = "flex";
});

function closeAllergyModal() {
  if (allergyModal) allergyModal.style.display = "none";
}

btnCloseAllergyModal?.addEventListener("click", closeAllergyModal);
btnCancelAllergyModal?.addEventListener("click", closeAllergyModal);

allergyModal?.addEventListener("click", (e) => {
  if (e.target === allergyModal) closeAllergyModal();
});

addAllergyForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = document.querySelector("#new-allergy-input").value.trim();
  if (val && allergiesMosaic) {
    const tag = document.createElement("span");
    tag.className = "allergy-tag";
    tag.innerHTML = `<span>Allergie : ${val}</span><button class="btn-tag-close" title="Supprimer">×</button>`;
    tag.querySelector(".btn-tag-close").addEventListener("click", () => {
      tag.remove();
      notify(`Allergie "${val}" retirée`);
    });
    allergiesMosaic.appendChild(tag);
    notify(`Allergie "${val}" enregistrée localement`);
    closeAllergyModal();
    document.querySelector("#new-allergy-input").value = "";
  }
});

document.querySelectorAll(".allergy-tag .btn-tag-close").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.target.closest(".allergy-tag")?.remove();
    notify("Allergie retirée du profil local");
  });
});

// ------------------------------------------------------------------------------
// 13. FORMULAIRE D'AVIS DU PHARMACIEN
// ------------------------------------------------------------------------------
const pharmacistForm = document.querySelector("#pharmacist-question-form");
pharmacistForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  notify("Votre question a bien été transmise à l'équipe officinale Alafiè. Réponse sous 24h.");
  pharmacistForm.reset();
  setTimeout(() => showScreen("home"), 1300);
});

// ------------------------------------------------------------------------------
// 14. SYSTÈME DE TOAST CAPSULE HAUTE FIDÉLITÉ
// ------------------------------------------------------------------------------
const toastCapsule = document.querySelector("#toast-capsule");
const toastTextContent = document.querySelector("#toast-text-content");
let toastTimeout = null;

function notify(message) {
  if (!toastCapsule || !toastTextContent) return;
  toastTextContent.textContent = message;
  toastCapsule.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastCapsule.classList.remove("show");
  }, 2400);
}

window.notify = notify;

// ------------------------------------------------------------------------------
// INITIALISATION AU CHARGEMENT DU DOM
// ------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderMedicationsDeck();
  updateStatsAndTimeline();
});
