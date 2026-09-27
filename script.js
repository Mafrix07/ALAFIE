/**
 * ==============================================================================
 * ALAFIÈ — LOGIQUE JAVASCRIPT DU PROTOTYPE MOBILE
 * Navigation adaptative, Catalogue de médicaments, Fiches détaillées,
 * Planificateur de rappels, Sécurité & Avis Pharmacien.
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// 1. DONNÉES DÉMONSTRATION MÉDICALES (VALIDÉES PHARMACIEN)
// ------------------------------------------------------------------------------
const DRUGS_DATA = {
  paracetamol: {
    id: "paracetamol",
    name: "Paracétamol 500 mg",
    dci: "Paracetamolum",
    form: "Comprimé",
    iconColor: "med-icon-blue",
    category: "douleur",
    classDesc: "Antalgique et antipyrétique de référence",
    indication: "Traitement symptomatique des douleurs d'intensité légère à modérée (maux de tête, douleurs dentaires, courbatures) et des états fébriles.",
    posology: "Adulte et enfant > 27 kg : 1 à 2 comprimés par prise, espacés d'au moins 4 heures. Ne jamais dépasser 3 000 mg (6 comprimés) par jour sans avis médical.",
    administration: "Par voie orale avec un grand verre d'eau. Peut être pris indifféremment pendant ou en dehors des repas.",
    precautions: [
      "Contre-indiqué formellement en cas de maladie grave du foie (insuffisance hépatique).",
      "Vérifiez l'absence de paracétamol dans vos autres médicaments en cours pour éviter tout surdosage toxique.",
      "Ne pas consommer d'alcool pendant le traitement."
    ],
    generics: ["Doliprane®", "Efferalgan®", "Dafalgan®", "Paracétamol Biogaran"],
    sideEffects: "Très rares aux doses recommandées : démangeaisons ou éruptions cutanées allergiques. En cas de doute, interrompez la prise."
  },
  amoxicilline: {
    id: "amoxicilline",
    name: "Amoxicilline 1 g",
    dci: "Amoxicillinum",
    form: "Comprimé dispersible",
    iconColor: "med-icon-cream",
    category: "antibiotique",
    classDesc: "Antibiotique majeur (Famille des Bêta-lactamines / Pénicillines)",
    indication: "Traitement d'infections bactériennes confirmées : angines bactériennes, bronchites, otites, pneumopathies, infections urinaires ou dentaires.",
    posology: "Adulte : 1 g matin et soir (ou selon prescription exacte). Respectez impérativement la durée complète prescrite par le médecin, même en cas de guérison apparente.",
    administration: "À avaler ou à disperser dans un demi-verre d'eau, de préférence au début d'un repas pour optimiser la tolérance digestive.",
    precautions: [
      "CONTRE-INDICATION ABSOLUE en cas d'allergie connue aux pénicillines ou aux bêta-lactamines.",
      "Ne jamais réutiliser sans nouvel avis médical (risque majeur d'antibiorésistance).",
      "Arrêt immédiat si éruption cutanée, démangeaisons ou gonflement du visage."
    ],
    generics: ["Clamoxyl®", "Amoxicilline Arrow", "Amoxicilline Sandoz", "Hiconcil®"],
    sideEffects: "Fréquents : légers troubles digestifs (diarrhée, nausées). Rares mais urgents : réactions allergiques cutanées généralisées."
  },
  ibuprofene: {
    id: "ibuprofene",
    name: "Ibuprofène 400 mg",
    dci: "Ibuprofenum",
    form: "Comprimé pelliculé",
    iconColor: "med-icon-pink",
    category: "anti-inflammatoire",
    classDesc: "Anti-inflammatoire non stéroïdien (AINS) & Antalgique",
    indication: "Traitement de courte durée des douleurs aiguës (maux de tête, douleurs dentaires, règles douloureuses, courbatures) et de la fièvre.",
    posology: "Adulte : 1 comprimé (400 mg) par prise, à renouveler si nécessaire après 6 à 8 heures. Ne jamais dépasser 1 200 mg (3 comprimés) par 24h. Limiter à 3 jours sans ordonnance.",
    administration: "À prendre impérativement au milieu d'un repas ou avec une collation pour protéger la muqueuse gastrique.",
    precautions: [
      "Contre-indiqué en cas d'ulcère de l'estomac, d'asthme déclenché par l'aspirine ou de maladie rénale.",
      "Strictement interdit à partir du 6e mois de grossesse.",
      "Ne jamais associer à un autre AINS ni à de l'aspirine."
    ],
    generics: ["Advil®", "Nurofen®", "Antarène®", "Ibuprofène Mylan"],
    sideEffects: "Troubles gastriques possibles (brûlures d'estomac, nausées). Exceptionnels mais graves : ulcère ou saignement digestif."
  },
  vitamine_c: {
    id: "vitamine_c",
    name: "Vitamine C 500 mg",
    dci: "Acidum ascorbicum",
    form: "Comprimé à croquer",
    iconColor: "med-icon-orange",
    category: "vitamine",
    classDesc: "Complément vitaminique & Antiasthénique",
    indication: "Traitement d'appoint de la fatigue passagère (asthénie fonctionnelle) et prévention des carences en acide ascorbique.",
    posology: "Adulte : 1 comprimé par jour, à croquer ou à sucer. Prendre de préférence le matin ou le midi.",
    administration: "Prendre au petit-déjeuner. Éviter la prise en fin de journée (effet stimulant sur le sommeil).",
    precautions: [
      "À utiliser avec précaution chez les personnes sujettes aux calculs rénaux oxaliques.",
      "Ne pas poursuivre au-delà de 15 jours sans avis soignant si la fatigue persiste."
    ],
    generics: ["Laroscorbine®", "Upsa C®", "Vitascorbol®"],
    sideEffects: "À doses excessives (> 1 g/jour) : troubles digestifs bénins, légère agitation."
  }
};

// ------------------------------------------------------------------------------
// 2. ÉTAT INITIAL DES RAPPELS DU JOUR
// ------------------------------------------------------------------------------
let userReminders = [
  { id: 1, time: "08:00", name: "Paracétamol 500 mg", dose: "1 comprimé · après le repas", done: true },
  { id: 2, time: "12:00", name: "Amoxicilline 1 g", dose: "1 comprimé · avec de l'eau", done: false },
  { id: 3, time: "18:00", name: "Vitamine C 500 mg", dose: "1 comprimé · au petit-déjeuner", done: false }
];

let activeDrugKey = "paracetamol";

// ------------------------------------------------------------------------------
// 3. NAVIGATION MULTI-ÉCRANS
// ------------------------------------------------------------------------------
const SCREEN_TITLES = {
  home: "Accueil",
  medicaments: "Fiches Médicaments",
  "drug-detail": "Fiche Médicament",
  rappels: "Mes Rappels",
  securite: "Sécurité & Profil",
  pharmacies: "Pharmacies de garde",
  contact: "Avis Pharmacien"
};

const screens = document.querySelectorAll(".screen-view");
const bottomNavBtns = document.querySelectorAll(".bnav-btn");
const sidebarNavBtns = document.querySelectorAll(".nav-btn");
const pageTitleEl = document.querySelector("#page-title");

function showScreen(screenId) {
  screens.forEach(s => s.classList.toggle("active-screen", s.id === screenId));

  // Mise à jour de l'état actif sur les deux barres de navigation
  bottomNavBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.screen === screenId));
  sidebarNavBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.screen === screenId));

  // Titre d'en-tête
  if (pageTitleEl) {
    pageTitleEl.textContent = SCREEN_TITLES[screenId] || "Alafiè";
  }

  // Remonter en haut de page en douceur
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Clics sur les boutons de navigation et raccourcis data-go
document.querySelectorAll("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.go));
});
bottomNavBtns.forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.screen));
});
sidebarNavBtns.forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.screen));
});

// Bouton retour depuis la fiche détaillée
document.querySelector("#btn-back-to-meds")?.addEventListener("click", () => {
  showScreen("medicaments");
});

// ------------------------------------------------------------------------------
// 4. RENDU & FILTRAGE DU CATALOGUE MÉDICAMENTS
// ------------------------------------------------------------------------------
const medListContainer = document.querySelector("#med-list-container");
const medSearchInput = document.querySelector("#med-search-input");
const filterChips = document.querySelectorAll("#filter-chips .chip");
let currentCategoryFilter = "all";

function renderMedList(searchQuery = "") {
  if (!medListContainer) return;

  const query = searchQuery.toLowerCase().trim();
  const drugsArray = Object.values(DRUGS_DATA);

  const filtered = drugsArray.filter(drug => {
    const matchesCategory = currentCategoryFilter === "all" || drug.category === currentCategoryFilter;
    const matchesSearch = !query || 
      drug.name.toLowerCase().includes(query) || 
      drug.dci.toLowerCase().includes(query) ||
      drug.classDesc.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    medListContainer.innerHTML = `
      <div style="text-align:center; padding:30px 15px; color:var(--alafie-muted);">
        <span style="font-size:32px; display:block; margin-bottom:8px;">🔍</span>
        <b>Aucun médicament trouvé</b>
        <p style="font-size:12px; margin-top:4px;">Vérifiez l'orthographe ou essayez la DCI.</p>
      </div>
    `;
    return;
  }

  medListContainer.innerHTML = filtered.map(drug => `
    <article class="med-card" data-key="${drug.id}">
      <div class="med-icon-box ${drug.iconColor}">💊</div>
      <div class="med-main-info">
        <b>${drug.name}</b>
        <span class="med-dci-sub">DCI : ${drug.dci} · ${drug.form}</span>
      </div>
      <span class="med-arrow">›</span>
    </article>
  `).join("");

  // Attacher les écouteurs sur chaque carte
  medListContainer.querySelectorAll(".med-card").forEach(card => {
    card.addEventListener("click", () => {
      openDrugDetail(card.dataset.key);
    });
  });
}

// Recherche instantanée
medSearchInput?.addEventListener("input", e => {
  renderMedList(e.target.value);
});

// Filtres par famille
filterChips.forEach(chip => {
  chip.addEventListener("click", () => {
    filterChips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    currentCategoryFilter = chip.dataset.filter;
    renderMedList(medSearchInput ? medSearchInput.value : "");
  });
});

// ------------------------------------------------------------------------------
// 5. AFFICHAGE DE LA FICHE DÉTAILLÉE (DRUG DETAIL SCREEN)
// ------------------------------------------------------------------------------
function openDrugDetail(drugKey) {
  const drug = DRUGS_DATA[drugKey];
  if (!drug) return;

  activeDrugKey = drugKey;

  document.querySelector("#detail-med-name").textContent = drug.name;
  document.querySelector("#detail-med-dci").textContent = drug.dci;
  document.querySelector("#detail-form-badge").textContent = drug.form;
  document.querySelector("#detail-med-class").textContent = drug.classDesc;
  document.querySelector("#detail-indication").textContent = drug.indication;
  document.querySelector("#detail-posology").innerHTML = drug.posology;
  document.querySelector("#detail-administration").textContent = drug.administration;
  document.querySelector("#detail-side-effects").textContent = drug.sideEffects;

  // Précautions
  const precContainer = document.querySelector("#detail-precautions");
  if (precContainer) {
    precContainer.innerHTML = drug.precautions.map(p => `<li>${p}</li>`).join("");
  }

  // Équivalents génériques
  const genContainer = document.querySelector("#detail-generics");
  if (genContainer) {
    genContainer.innerHTML = drug.generics.map(g => `<span class="generic-chip">${g}</span>`).join("");
  }

  // Mise à jour du titre modal
  document.querySelector("#modal-drug-title").textContent = `Ajouter ${drug.name}`;

  showScreen("drug-detail");
}

// ------------------------------------------------------------------------------
// 6. GESTION DES RAPPELS & CALCUL D'OBSERVANCE
// ------------------------------------------------------------------------------
const reminderTimeline = document.querySelector("#reminder-timeline");
const adherenceCircle = document.querySelector("#adherence-percentage");
const adherenceCounterText = document.querySelector("#adherence-counter-text");
const celebrationBanner = document.querySelector("#celebration-banner");

// Éléments de l'écran d'accueil
const statDosesRatio = document.querySelector("#stat-doses-ratio");
const statAdherencePct = document.querySelector("#stat-adherence-pct");
const statBarFill = document.querySelector("#stat-bar-fill");
const statBarGold = document.querySelector("#stat-bar-gold");
const nextDoseWidget = document.querySelector("#next-dose-widget");
const nextDoseMed = document.querySelector("#next-dose-med");
const nextDoseTime = document.querySelector("#next-dose-time");

function updateStatsAndTimeline() {
  const total = userReminders.length;
  const doneCount = userReminders.filter(r => r.done).length;
  const percentage = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  // Mise à jour sur l'écran Rappels
  if (adherenceCircle) adherenceCircle.textContent = `${percentage}%`;
  if (adherenceCounterText) adherenceCounterText.textContent = `${doneCount} prise${doneCount > 1 ? "s" : ""} sur ${total} effectuée${doneCount > 1 ? "s" : ""}`;

  // Afficher / masquer la bannière de célébration
  if (celebrationBanner) {
    celebrationBanner.style.display = (total > 0 && doneCount === total) ? "flex" : "none";
  }

  // Mise à jour sur l'écran Accueil
  if (statDosesRatio) statDosesRatio.textContent = `${doneCount} / ${total}`;
  if (statAdherencePct) statAdherencePct.textContent = `${percentage}%`;
  if (statBarFill) statBarFill.style.width = `${percentage}%`;
  if (statBarGold) statBarGold.style.width = `${percentage}%`;

  // Prochaine prise restante
  const nextPending = userReminders.find(r => !r.done);
  if (nextDoseWidget && nextDoseMed && nextDoseTime) {
    if (nextPending) {
      nextDoseWidget.style.display = "flex";
      nextDoseMed.textContent = nextPending.name;
      nextDoseTime.textContent = `Aujourd'hui à ${nextPending.time} · ${nextPending.dose}`;
    } else {
      nextDoseWidget.style.display = "none";
    }
  }

  // Rendu de la timeline
  if (reminderTimeline) {
    reminderTimeline.innerHTML = userReminders.map(item => `
      <div class="timeline-item ${item.done ? "is-done" : ""}" data-id="${item.id}">
        <span class="time-badge">${item.time}</span>
        <div class="timeline-content">
          <strong class="dose-title">${item.name}</strong>
          <span class="dose-instruction">${item.dose}</span>
        </div>
        <button class="btn-check-dose" aria-label="Valider la prise">${item.done ? "✓" : ""}</button>
        <button class="btn-delete-dose" aria-label="Supprimer">🗑</button>
      </div>
    `).join("");

    // Écouteurs sur les items
    reminderTimeline.querySelectorAll(".timeline-item").forEach(row => {
      const id = parseInt(row.dataset.id, 10);
      
      // Coche / décoche
      row.querySelector(".btn-check-dose").addEventListener("click", () => {
        const item = userReminders.find(r => r.id === id);
        if (item) {
          item.done = !item.done;
          notify(item.done ? `Prise de ${item.name} validée !` : `Prise de ${item.name} annulée`);
          updateStatsAndTimeline();
        }
      });

      // Suppression
      row.querySelector(".btn-delete-dose").addEventListener("click", (e) => {
        e.stopPropagation();
        userReminders = userReminders.filter(r => r.id !== id);
        notify("Rappel supprimé");
        updateStatsAndTimeline();
      });
    });
  }
}

// Action rapide sur l'accueil : "✓ Marquer pris"
document.querySelector("#btn-quick-take")?.addEventListener("click", () => {
  const nextPending = userReminders.find(r => !r.done);
  if (nextPending) {
    nextPending.done = true;
    notify(`Prise de ${nextPending.name} enregistrée !`);
    updateStatsAndTimeline();
  }
});

// ------------------------------------------------------------------------------
// 7. MODALE DE CONFIGURATION DU TRAITEMENT & RAPPEL
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

document.querySelector("#btn-open-treatment-modal")?.addEventListener("click", () => openTreatmentModal());
document.querySelector("#btn-open-treatment-modal-bottom")?.addEventListener("click", () => openTreatmentModal());
document.querySelector("#btn-trigger-add-reminder")?.addEventListener("click", () => openTreatmentModal("paracetamol"));

btnCloseModal?.addEventListener("click", closeTreatmentModal);
btnCancelModal?.addEventListener("click", closeTreatmentModal);

treatmentModal?.addEventListener("click", (e) => {
  if (e.target === treatmentModal) closeTreatmentModal();
});

addTreatmentForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const drug = DRUGS_DATA[activeDrugKey] || DRUGS_DATA.paracetamol;
  const dose = document.querySelector("#modal-dose-input").value;
  const time = document.querySelector("#modal-time-input").value || "14:00";
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
  notify(`Rappel ajouté : ${drug.name} à ${time} !`);
  showScreen("rappels");
});

// ------------------------------------------------------------------------------
// 8. ÉCRAN SÉCURITÉ : ALLERGIES & ANTÉCÉDENTS
// ------------------------------------------------------------------------------
document.querySelector("#btn-add-allergy")?.addEventListener("click", () => {
  const input = prompt("Entrez une nouvelle substance allergène (Ex: Aspirine, Sulfamides) :");
  if (input && input.trim()) {
    const container = document.querySelector("#allergy-tags-container");
    const pill = document.createElement("span");
    pill.className = "allergy-pill";
    pill.innerHTML = `<span>Allergie : ${input.trim()}</span><button class="btn-tag-remove" title="Supprimer">×</button>`;
    pill.querySelector(".btn-tag-remove").addEventListener("click", () => {
      pill.remove();
      notify("Allergie supprimée du profil local");
    });
    container.appendChild(pill);
    notify(`Allergie "${input.trim()}" enregistrée localement`);
  }
});

document.querySelectorAll(".allergy-pill .btn-tag-remove").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.target.closest(".allergy-pill")?.remove();
    notify("Allergie retirée du profil");
  });
});

// ------------------------------------------------------------------------------
// 9. FORMULAIRE CONTACT PHARMACIEN
// ------------------------------------------------------------------------------
const pharmacistForm = document.querySelector("#pharmacist-question-form");
pharmacistForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const contact = document.querySelector("#user-contact").value;
  notify("Votre question a bien été transmise à notre équipe. Réponse sous 24h.");
  pharmacistForm.reset();
  setTimeout(() => showScreen("home"), 1200);
});

// ------------------------------------------------------------------------------
// 10. TOAST NOTIFICATIONS LÉGÈRES
// ------------------------------------------------------------------------------
const appToast = document.querySelector("#app-toast");
const toastMsg = document.querySelector("#toast-message");
let toastTimer = null;

function notify(message) {
  if (!appToast || !toastMsg) return;
  toastMsg.textContent = message;
  appToast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    appToast.classList.remove("show");
  }, 2400);
}

// Rendre accessible globalement pour les boutons inline (ex: détails pharmacie)
window.notify = notify;

// ------------------------------------------------------------------------------
// INITIALISATION AU CHARGEMENT DU DOM
// ------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderMedList();
  updateStatsAndTimeline();
});
