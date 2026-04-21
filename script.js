const STORAGE_KEY = "house-connected-home-v1";
const STORAGE_SYNC_KEY = "house-connected-home-sync-v1";
const ADMIN_PASSWORD_KEY = "house-admin-password-v1";
const ADMIN_ACCESS_KEY = "house-admin-access-v1";
const PROFILE_SESSION_KEY = "house-active-profile-session-v1";
const STATE_API_URL = "/api/state";
const SESSION_API_URL = "/api/session";
const DEFAULT_ADMIN_PASSWORD = "dracaufeu";
const SHARED_STATE_KEYS = [
  "lastSavedAt",
  "tasks",
  "shopping",
  "ingredients",
  "recipes",
  "meals",
  "calendar",
  "vacations",
  "projects",
];

const PROFILE_MAP = {
  thomas: {
    id: "thomas",
    name: "Thomas",
    accent: "Sauvegarde, bricolage, logistique",
  },
  christelle: {
    id: "christelle",
    name: "Christelle",
    accent: "Cuisine, organisation, ambiance",
  },
};

const DEFAULT_STATE = {
  lastSavedAt: null,
  currentView: "dashboard",
  activeProfile: "thomas",
  calendarDisplay: "calendar",
  calendarMode: "year",
  calendarYear: new Date().getFullYear(),
  calendarMonth: new Date().getMonth(),
  showIngredientComposer: false,
  recipeDraftIngredients: [],
  tasks: [
    {
      id: "task-canape",
      title: "Valider le devis du canape",
      dueDate: "2026-04-24",
      status: "open",
      owner: "christelle",
      profiles: ["thomas", "christelle"],
      category: "Projet",
      sourceType: "project",
      sourceId: "project-salon",
    },
    {
      id: "task-lisbonne",
      title: "Preparer la valise cabine",
      dueDate: "2026-05-08",
      status: "open",
      owner: "thomas",
      profiles: ["thomas", "christelle"],
      category: "Vacances",
      sourceType: "vacation",
      sourceId: "vac-lisbonne",
    },
    {
      id: "task-vaisselle",
      title: "Vider le lave-vaisselle",
      dueDate: "2026-04-21",
      status: "open",
      owner: "thomas",
      profiles: ["thomas"],
      category: "Maison",
      sourceType: "none",
      sourceId: null,
    },
    {
      id: "task-ampoules",
      title: "Commander les ampoules pour la cuisine",
      dueDate: "2026-04-22",
      status: "done",
      owner: "christelle",
      profiles: ["christelle"],
      category: "Maison",
      sourceType: "shopping",
      sourceId: "shop-ampoules",
    },
  ],
  shopping: [
    {
      id: "shop-tomates",
      title: "Tomates",
      quantity: "6",
      purchased: false,
      owner: "christelle",
      profiles: ["thomas", "christelle"],
      sourceType: "meal",
      sourceId: "meal-lasagnes",
      ingredientId: "ing-tomates",
      foodType: "Legumes",
    },
    {
      id: "shop-basilic",
      title: "Basilic",
      quantity: "1 botte",
      purchased: false,
      owner: "christelle",
      profiles: ["thomas", "christelle"],
      sourceType: "meal",
      sourceId: "meal-lasagnes",
      ingredientId: "ing-basilic",
      foodType: "Herbes",
    },
    {
      id: "shop-ampoules",
      title: "Ampoules cuisine",
      quantity: "4",
      purchased: true,
      owner: "christelle",
      profiles: ["christelle"],
      sourceType: "house",
      sourceId: null,
      ingredientId: null,
      foodType: "Maison",
    },
    {
      id: "shop-guirlande",
      title: "Guirlande exterieure",
      quantity: "1",
      purchased: false,
      owner: "thomas",
      profiles: ["thomas", "christelle"],
      sourceType: "project",
      sourceId: "project-terrasse",
      ingredientId: null,
      foodType: "Maison",
    },
  ],
  ingredients: [
    { id: "ing-tomates", name: "Tomates", storage: "frais", foodType: "Legumes", unit: "unites", stockQuantity: "0" },
    { id: "ing-basilic", name: "Basilic", storage: "frais", foodType: "Herbes", unit: "grammes", stockQuantity: "0" },
    { id: "ing-mozzarella", name: "Mozzarella", storage: "frais", foodType: "Produits laitiers", unit: "unites", stockQuantity: "0" },
    { id: "ing-pates-lasagnes", name: "Pates a lasagnes", storage: "placard", foodType: "Epicerie", unit: "grammes", stockQuantity: "0" },
    { id: "ing-pois-chiches", name: "Pois chiches", storage: "placard", foodType: "Legumineuses", unit: "grammes", stockQuantity: "0" },
    { id: "ing-concombre", name: "Concombre", storage: "frais", foodType: "Legumes", unit: "unites", stockQuantity: "0" },
    { id: "ing-feta", name: "Feta", storage: "frais", foodType: "Produits laitiers", unit: "grammes", stockQuantity: "0" },
  ],
  recipes: [
    {
      id: "recipe-lasagnes",
      name: "Lasagnes du dimanche",
      dishType: "Plat",
      ingredientEntries: [
        { ingredientId: "ing-tomates", quantity: "6" },
        { ingredientId: "ing-basilic", quantity: "1 botte" },
        { ingredientId: "ing-mozzarella", quantity: "2 boules" },
        { ingredientId: "ing-pates-lasagnes", quantity: "1 boite" },
      ],
    },
    {
      id: "recipe-salade",
      name: "Salade batch du midi",
      dishType: "Entree",
      ingredientEntries: [
        { ingredientId: "ing-pois-chiches", quantity: "1 bocal" },
        { ingredientId: "ing-concombre", quantity: "1" },
        { ingredientId: "ing-feta", quantity: "200 g" },
      ],
    },
  ],
  meals: [
    {
      id: "meal-lasagnes",
      title: "Lasagnes du dimanche",
      recipeId: "recipe-lasagnes",
      scheduledDate: "2026-04-26",
      slot: "soir",
      profiles: ["thomas", "christelle"],
      mealType: "Repas",
      prepared: false,
    },
    {
      id: "meal-batch",
      title: "Salade batch du midi",
      recipeId: "recipe-salade",
      scheduledDate: "2026-04-22",
      slot: "midi",
      profiles: ["thomas", "christelle"],
      mealType: "Repas",
      prepared: false,
    },
  ],
  calendar: [
    {
      id: "event-parents",
      title: "Diner chez les parents",
      date: "2026-04-25",
      type: "Perso",
      profiles: ["thomas", "christelle"],
      sourceType: "none",
      sourceId: null,
    },
    {
      id: "event-voiture",
      title: "Revision voiture",
      date: "2026-04-23",
      type: "Logistique",
      profiles: ["thomas"],
      sourceType: "task",
      sourceId: "task-vaisselle",
    },
  ],
  vacations: [
    {
      id: "vac-lisbonne",
      destination: "Lisbonne",
      startDate: "2026-05-09",
      endDate: "2026-05-13",
      budget: 850,
      profiles: ["thomas", "christelle"],
      linkedProjectId: "project-roadbook",
    },
  ],
  projects: [
    {
      id: "project-terrasse",
      title: "Terrasse printemps",
      lead: "thomas",
      profiles: ["thomas", "christelle"],
      status: "En cours",
      deadline: "2026-05-02",
      linkedVacationId: null,
      note: "Installer les nouvelles lumieres et finir le coin repas.",
    },
    {
      id: "project-roadbook",
      title: "Roadbook Lisbonne",
      lead: "christelle",
      profiles: ["thomas", "christelle"],
      status: "Planification",
      deadline: "2026-05-05",
      linkedVacationId: "vac-lisbonne",
      note: "Centraliser les restos, adresses et transferts aeroport.",
    },
    {
      id: "project-salon",
      title: "Refonte salon",
      lead: "christelle",
      profiles: ["christelle"],
      status: "Decision",
      deadline: "2026-04-30",
      linkedVacationId: null,
      note: "Comparer canape, tapis et rangement discret.",
    },
  ],
};

const heroTitle = document.querySelector("#heroTitle");
const heroSubtitle = document.querySelector("#heroSubtitle");
const heroMeta = document.querySelector("#heroMeta");
const pageContent = document.querySelector("#pageContent");
const currentDate = document.querySelector("#currentDate");
const profileSwitch = document.querySelector("#profileSwitch");
const profileSwitchWrap = profileSwitch ? profileSwitch.closest(".profile-switch-wrap") : null;
const navButtons = Array.from(document.querySelectorAll(".nav-link"));
const adminFab = document.querySelector(".admin-fab");
const workspace = document.querySelector(".workspace");
const isCalendarPage = document.body.dataset.page === "calendar";
const isRecipePage = document.body.dataset.page === "recipe";
const isIngredientPage = document.body.dataset.page === "ingredient";
const isStockPage = document.body.dataset.page === "stock";
const isAdminPage = document.body.dataset.page === "admin";
const isAdminIngredientsPage = document.body.dataset.page === "admin-ingredients";
const isAdminRecipesPage = document.body.dataset.page === "admin-recipes";

const stateSync = {
  isSaving: false,
  hasPendingSave: false,
  saveTimerId: null,
  authRequired: false,
  authEnabled: false,
  isAuthenticated: false,
  lastRemoteSyncAt: "",
  lastSharedFingerprint: "",
};

let state = normalizeState(clone(DEFAULT_STATE));
let ui = {
  modal: null,
  stockSearchTerm: "",
  ingredientLibrarySearchTerm: "",
  mealRecipeSearchTerm: "",
};
stateSync.lastSharedFingerprint = buildSharedStateFingerprint(getSharedStateSnapshot(state));

init();

async function init() {
  hydrateActiveProfileFromSession();
  ensureDefaultAdminPassword();
  renderCurrentDate();
  bindGlobalEvents();
  ensureMobilePageNav();
  if (profileSwitchWrap) {
    profileSwitchWrap.hidden = true;
  }
  render();
  await hydrateState();
}

function bindGlobalEvents() {
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const { view } = button.dataset;
      openView(view);
    });
  });

  document.addEventListener("click", handleActionClick);
  document.addEventListener("input", handleInputChange);
  document.addEventListener("submit", handleFormSubmit);
  document.addEventListener("visibilitychange", handleVisibilityPersistence);
  window.addEventListener("pagehide", handleVisibilityPersistence);
  window.addEventListener("beforeunload", handleVisibilityPersistence);
}

function handleInputChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) {
    return;
  }

  if (target.id === "mealRecipeSearch") {
    ui.mealRecipeSearchTerm = clean(target.value);
  }
}

function handleVisibilityPersistence(event) {
  if (
    event?.type === "visibilitychange" &&
    typeof document !== "undefined" &&
    document.visibilityState &&
    document.visibilityState !== "hidden"
  ) {
    return;
  }

  persistLocalState(state);
  persistRemoteStateOnHide();
}

function ensureMobilePageNav() {
  if (!workspace || document.querySelector("#mobilePageNav")) {
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.id = "mobilePageNav";
  wrapper.className = "mobile-page-nav";
  wrapper.innerHTML = `
    <label class="mobile-page-nav-label" for="mobilePageSelect">Aller a une page</label>
    <select id="mobilePageSelect" class="mobile-page-nav-select" aria-label="Aller a une page"></select>
  `;
  workspace.insertBefore(wrapper, workspace.firstChild);

  const select = wrapper.querySelector("#mobilePageSelect");
  if (select) {
    select.addEventListener("change", (event) => {
      const nextView = event.target.value;
      if (!nextView) {
        return;
      }
      openView(nextView);
    });
  }
}

function openView(view) {
  if (!view) {
    return;
  }

  if (view === "calendar-page") {
    window.location.href = "./calendar.html";
    return;
  }

  if (view === "recipe-page") {
    window.location.href = "./recipe.html";
    return;
  }

  if (view === "ingredient-page") {
    window.location.href = "./ingredient.html";
    return;
  }

  if (view === "stock-page") {
    window.location.href = "./stock.html";
    return;
  }

  if (
    view === "admin-page" ||
    view === "admin-ingredients-page" ||
    view === "admin-recipes-page"
  ) {
    requestAdminAccess(view);
    return;
  }

  state.currentView = view;
  saveState();

  if (
    isCalendarPage ||
    isRecipePage ||
    isIngredientPage ||
    isStockPage ||
    isAdminPage ||
    isAdminIngredientsPage ||
    isAdminRecipesPage
  ) {
    window.location.href = "./index.html";
    return;
  }

  render();
}

function renderMobilePageOptions() {
  const options = [
    { value: "dashboard", label: "Tableau de bord" },
    { value: "tasks", label: "Taches a faire" },
    { value: "shopping", label: "Liste de courses" },
    { value: "cuisine", label: "Cuisine" },
    { value: "calendar-page", label: "Calendrier" },
    { value: "vacations", label: "Vacances" },
    { value: "projects", label: "Projets" },
  ];

  if (state.activeProfile === "thomas") {
    options.push({ value: "admin-page", label: "Admin" });
  }

  return options
    .map(
      (option) =>
        `<option value="${option.value}">${escapeHtml(option.label)}</option>`
    )
    .join("");
}

function getCurrentMobileView() {
  if (isCalendarPage) {
    return "calendar-page";
  }

  if (isRecipePage || isIngredientPage || isStockPage) {
    return "cuisine";
  }

  if (isAdminPage || isAdminIngredientsPage || isAdminRecipesPage) {
    return "admin-page";
  }

  return state.currentView || "dashboard";
}

function updateMobilePageNav() {
  const select = document.querySelector("#mobilePageSelect");
  if (!select) {
    return;
  }

  select.innerHTML = renderMobilePageOptions();
  select.value = getCurrentMobileView();
}

function hydrateActiveProfileFromSession() {
  const storedProfile = window.sessionStorage.getItem(PROFILE_SESSION_KEY);
  if (storedProfile && PROFILE_MAP[storedProfile]) {
    state.activeProfile = storedProfile;
  }
}

function hasProfileSelection() {
  const storedProfile = window.sessionStorage.getItem(PROFILE_SESSION_KEY);
  return Boolean(storedProfile && PROFILE_MAP[storedProfile]);
}

function setProfileSelection(profileId) {
  if (!PROFILE_MAP[profileId]) {
    return;
  }

  state.activeProfile = profileId;
  window.sessionStorage.setItem(PROFILE_SESSION_KEY, profileId);

  if (state.activeProfile !== "thomas") {
    clearAdminAccess();
  }
}

function handleActionClick(event) {
  const trigger = event.target.closest("[data-action]");
  if (!trigger) {
    return;
  }

  const { action, id, view, mode, offset, month, year, display } = trigger.dataset;

  if (action === "toggle-task") {
    state.tasks = state.tasks.map((task) =>
      task.id === id
        ? { ...task, status: task.status === "done" ? "open" : "done" }
        : task
    );
  }

  if (action === "delete-task" && id) {
    deleteTask(id);
    saveState();
    render();
    return;
  }

  if (action === "toggle-shopping") {
    toggleShoppingPurchase(id);
  }

  if (action === "add-meal-shopping") {
    addMealIngredientsToShopping(id);
  }

  if (action === "open-calendar-page") {
    window.location.href = "./calendar.html";
    return;
  }

  if (action === "open-recipe-page") {
    window.location.href = "./recipe.html";
    return;
  }

  if (action === "open-ingredient-page") {
    window.location.href = "./ingredient.html";
    return;
  }

  if (action === "open-stock-page") {
    window.location.href = "./stock.html";
    return;
  }

  if (action === "download-shopping-pdf") {
    const weekSelect =
      document.querySelector("#shoppingWeekSelect") ||
      document.querySelector("#dashboardShoppingWeekSelect");
    const selectedWeekKey = clean(weekSelect ? weekSelect.value : "");
    downloadShoppingWeekPdf(selectedWeekKey);
    return;
  }

  if (action === "open-admin-gate") {
    requestAdminAccess("admin-page");
    return;
  }

  if (action === "toggle-meal-prepared" && id) {
    toggleMealPrepared(id);
    saveState();
    render();
    return;
  }

  if (action === "delete-meal" && id) {
    openDeleteModal("meal", id);
    render();
    return;
  }

  if (action === "open-recipe-pdf" && id) {
    openRecipePdf(id);
    return;
  }

  if (action === "delete-shopping" && id) {
    deleteShoppingItem(id);
    saveState();
    render();
    return;
  }

  if (action === "delete-calendar-event" && id) {
    deleteCalendarEvent(id);
    saveState();
    render();
    return;
  }

  if (
    action === "open-admin-page" ||
    action === "open-admin-ingredients-page" ||
    action === "open-admin-recipes-page"
  ) {
    if (state.activeProfile !== "thomas") {
      return;
    }

    const targetView =
      action === "open-admin-page"
        ? "admin-page"
        : action === "open-admin-ingredients-page"
          ? "admin-ingredients-page"
          : "admin-recipes-page";

    if (hasAdminAccess()) {
      navigateToAdminTarget(targetView);
    } else {
      requestAdminAccess(targetView);
    }
    return;
  }

  if (action === "toggle-ingredient-composer") {
    state.showIngredientComposer = !state.showIngredientComposer;
  }

  if (action === "add-draft-ingredient") {
    const searchField = document.querySelector("#recipeIngredientSearch");
    const quantityField = document.querySelector("#recipeIngredientQuantity");
    const ingredientName = clean(searchField ? searchField.value : "");
    const quantity = clean(quantityField ? quantityField.value : "") || "1";
    const ingredient = findIngredientByName(ingredientName);

    if (!ingredient) {
      window.alert("Cet ingredient n'existe pas encore dans la base. Ajoutez-le d'abord depuis le bouton Ajouter un ingredient.");
      return;
    }

    const existingEntry = state.recipeDraftIngredients.find(
      (entry) => entry.ingredientId === ingredient.id
    );

    if (existingEntry) {
      existingEntry.quantity = quantity;
    } else {
      state.recipeDraftIngredients.push({
        ingredientId: ingredient.id,
        quantity,
      });
    }

    if (searchField) {
      searchField.value = "";
    }
    if (quantityField) {
      quantityField.value = "";
    }
  }

  if (action === "remove-draft-ingredient" && id) {
    state.recipeDraftIngredients = state.recipeDraftIngredients.filter(
      (entry) => entry.ingredientId !== id
    );
  }

  if (action === "switch-view" && view) {
    state.currentView = view;
  }

  if (action === "calendar-display" && display) {
    state.calendarDisplay = display;
  }

  if (action === "calendar-mode" && mode) {
    state.calendarMode = mode;
  }

  if (action === "open-month") {
    state.calendarDisplay = "calendar";
    state.calendarMode = "month";
    state.calendarMonth = Number(month);
    state.calendarYear = Number(year);
  }

  if (action === "back-to-year") {
    state.calendarDisplay = "calendar";
    state.calendarMode = "year";
  }

  if (action === "calendar-year") {
    state.calendarYear += Number(offset || 0);
  }

  if (action === "calendar-month") {
    const nextMonth = state.calendarMonth + Number(offset || 0);
    if (nextMonth < 0) {
      state.calendarMonth = 11;
      state.calendarYear -= 1;
    } else if (nextMonth > 11) {
      state.calendarMonth = 0;
      state.calendarYear += 1;
    } else {
      state.calendarMonth = nextMonth;
    }
  }

  if (action === "open-linked-view") {
    openView(view || "calendar");
    return;
  }

  if (action === "choose-profile" && trigger.dataset.profile) {
    setProfileSelection(trigger.dataset.profile);
    ui.modal = null;
    saveState();
    render();
    return;
  }

  if (action === "open-calendar-composer") {
    ui.calendarComposerOpen = true;
    render();
    window.requestAnimationFrame(() => {
      const composer = document.querySelector("#calendarComposer");
      if (composer) {
        composer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    return;
  }

  if (action === "close-calendar-composer") {
    ui.calendarComposerOpen = false;
    render();
    return;
  }

  if (action === "edit-ingredient" && id) {
    openIngredientEditModal(id);
    render();
    return;
  }

  if (action === "delete-ingredient" && id) {
    openDeleteModal("ingredient", id);
    render();
    return;
  }

  if (action === "edit-recipe" && id) {
    openRecipeEditModal(id);
    render();
    return;
  }

  if (action === "delete-recipe" && id) {
    openDeleteModal("recipe", id);
    render();
    return;
  }

  if (action === "edit-vacation" && id) {
    openVacationEditModal(id);
    render();
    return;
  }

  if (action === "delete-vacation" && id) {
    openDeleteModal("vacation", id);
    render();
    return;
  }

  if (action === "edit-project" && id) {
    openProjectEditModal(id);
    render();
    return;
  }

  if (action === "delete-project" && id) {
    openDeleteModal("project", id);
    render();
    return;
  }

  if (action === "close-modal") {
    ui.modal = null;
    render();
    return;
  }

  if (action === "confirm-delete" && ui.modal?.kind === "confirm-delete") {
    if (ui.modal.entityType === "ingredient") {
      deleteIngredient(ui.modal.id);
    }

    if (ui.modal.entityType === "recipe") {
      deleteRecipe(ui.modal.id);
    }

    if (ui.modal.entityType === "meal") {
      deleteMeal(ui.modal.id);
    }

    if (ui.modal.entityType === "vacation") {
      deleteVacation(ui.modal.id);
    }

    if (ui.modal.entityType === "project") {
      deleteProject(ui.modal.id);
    }

    ui.modal = null;
    saveState();
    render();
    return;
  }

  if (action === "cancel-delete") {
    ui.modal = null;
    render();
    return;
  }

  if (action === "add-edit-recipe-entry") {
    syncRecipeModalDraft();
    if (ui.modal?.kind === "edit-recipe") {
      ui.modal.entries.push({ ingredientId: "", quantity: "1" });
      render();
    }
    return;
  }

  if (action === "remove-edit-recipe-entry") {
    syncRecipeModalDraft();
    if (ui.modal?.kind === "edit-recipe") {
      ui.modal.entries = ui.modal.entries.filter((_, index) => String(index) !== String(id));
      render();
    }
    return;
  }

  saveState();
  render();
}

async function handleFormSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  const formId = form.id;
  if (!formId && !form.dataset.formType) {
    return;
  }

  event.preventDefault();
  const data = new FormData(form);

  if (formId === "houseAccessForm") {
    const password = clean(data.get("password"));
    if (!password) {
      window.alert("Entrez le mot de passe maison.");
      return;
    }

    const sessionResult = await unlockHouseSession(password);
    if (!sessionResult.ok) {
      window.alert(sessionResult.error || "Mot de passe maison incorrect.");
      return;
    }

    stateSync.authRequired = false;
    stateSync.authEnabled = Boolean(sessionResult.protected);
    stateSync.isAuthenticated = true;
    ui.modal = null;
    await hydrateState();
    if (stateSync.hasPendingSave) {
      queueRemoteStateSave(true);
    }
    return;
  }

  if (formId === "taskForm") {
    state.tasks.unshift({
      id: uid("task"),
      title: clean(data.get("title")),
      dueDate: clean(data.get("dueDate")),
      status: "open",
      owner: state.activeProfile,
      profiles: ["thomas", "christelle"],
      category: clean(data.get("category")) || "Maison",
      sourceType: "none",
      sourceId: null,
    });
  }

  if (formId === "shoppingForm") {
    const ingredient = findIngredientByName(data.get("title"));
    state.shopping.unshift({
      id: uid("shop"),
      title: clean(data.get("title")),
      quantity: clean(data.get("quantity")) || "1",
      purchased: false,
      owner: state.activeProfile,
      profiles: ["thomas", "christelle"],
      sourceType: "none",
      sourceId: null,
      ingredientId: ingredient ? ingredient.id : null,
      foodType: ingredient ? ingredient.foodType : "Autres",
      weekKey: getWeekInfo(todayDateKey()).key,
    });
  }

  if (form.dataset.formType === "shopping-quantity-update") {
    const shoppingId = form.dataset.shoppingId;
    if (!shoppingId) {
      return;
    }

    updateShoppingQuantity(shoppingId, clean(data.get("quantity")) || "1");
  }

  if (formId === "ingredientLibrarySearchForm") {
    ui.ingredientLibrarySearchTerm = clean(data.get("search"));
    render();
    return;
  }

  if (formId === "stockSearchForm") {
    ui.stockSearchTerm = clean(data.get("search"));
    render();
    return;
  }

  if (formId === "mealForm") {
    const recipe = findRecipeByQuery(clean(data.get("recipeQuery")));
    if (!recipe) {
      window.alert("Choisissez une recette existante.");
      return;
    }

    const meal = {
      id: uid("meal"),
      title: recipe.name,
      recipeId: recipe.id,
      scheduledDate: clean(data.get("scheduledDate")),
      slot: clean(data.get("slot")) || "soir",
      profiles: ["thomas", "christelle"],
      mealType: clean(data.get("mealType")) || "Repas",
      prepared: false,
    };
    state.meals.unshift(meal);
    addMealIngredientsToShopping(meal.id);
    ui.mealRecipeSearchTerm = "";
  }

  if (formId === "cookedForm") {
    const entryType = clean(data.get("entryType")) || "recipe";
    const recipeId = clean(data.get("recipeId"));
    const ingredientId = clean(data.get("ingredientId"));
    const quantity = clean(data.get("quantity")) || "1";

    if (entryType === "recipe") {
      const recipe = state.recipes.find((entry) => entry.id === recipeId);
      if (!recipe) {
        window.alert("Choisissez une recette pour deduire son stock.");
        return;
      }

      getRecipeIngredientEntries(recipe).forEach((entry) => {
        adjustIngredientStock(entry.ingredientId, entry.quantity || "0", "decrease");
      });
    } else {
      const ingredient = state.ingredients.find((entry) => entry.id === ingredientId);
      if (!ingredient) {
        window.alert("Choisissez un ingredient a deduire du stock.");
        return;
      }

      adjustIngredientStock(ingredient.id, quantity, "decrease");
    }
  }

  if (formId === "calendarForm") {
    const relation = parseRelationValue(data.get("relation"));
    state.calendar.unshift({
      id: uid("event"),
      title: clean(data.get("title")),
      date: clean(data.get("date")),
      type: clean(data.get("type")) || "Maison",
      profiles: selectionToProfiles(data.get("profiles")),
      sourceType: relation.sourceType,
      sourceId: relation.sourceId,
    });
    ui.calendarComposerOpen = false;
  }

  if (formId === "ingredientForm") {
    const name = clean(data.get("name"));
    if (!name) {
      return;
    }

    if (!findIngredientByName(name)) {
      state.ingredients.unshift({
        id: uid("ingredient"),
        name,
        storage: clean(data.get("storage")) || "placard",
        foodType: clean(data.get("foodType")) || "Autres",
        unit: clean(data.get("unit")) || "unites",
        stockQuantity: normalizeQuantityString(clean(data.get("stockQuantity")) || "0"),
      });
    }
  }

  if (formId === "recipeForm") {
    if (!state.recipeDraftIngredients.length) {
      window.alert("Ajoutez au moins un ingredient a la recette.");
      return;
    }

    state.recipes.unshift({
      id: uid("recipe"),
      name: clean(data.get("name")),
      dishType: clean(data.get("dishType")) || "Plat",
      ingredientEntries: clone(state.recipeDraftIngredients),
    });

    state.recipeDraftIngredients = [];
  }

  if (form.dataset.formType === "stock-update") {
    const ingredientId = form.dataset.ingredientId;
    if (!ingredientId) {
      return;
    }

    state.ingredients = state.ingredients.map((ingredient) =>
      ingredient.id === ingredientId
        ? {
            ...ingredient,
            stockQuantity: normalizeQuantityString(clean(data.get("stockQuantity")) || "0"),
          }
        : ingredient
    );
  }

  if (formId === "adminPasswordSetupForm") {
    const password = clean(data.get("password"));
    const confirmPassword = clean(data.get("confirmPassword"));
    if (!password || password !== confirmPassword) {
      window.alert("Les mots de passe ne correspondent pas.");
      return;
    }

    window.localStorage.setItem(ADMIN_PASSWORD_KEY, password);
    grantAdminAccess();
    const target = ui.modal?.targetView || "admin-page";
    ui.modal = null;
    navigateToAdminTarget(target);
    return;
  }

  if (formId === "adminPasswordAuthForm") {
    const password = clean(data.get("password"));
    if (password !== getAdminPassword()) {
      window.alert("Mot de passe incorrect.");
      return;
    }

    grantAdminAccess();
    const target = ui.modal?.targetView || "admin-page";
    ui.modal = null;
    navigateToAdminTarget(target);
    return;
  }

  if (formId === "editIngredientForm" && ui.modal?.kind === "edit-ingredient") {
    const ingredientId = ui.modal.id;
    applyIngredientEdit(ingredientId, {
      name: clean(data.get("name")),
      storage: clean(data.get("storage")) || "placard",
      foodType: clean(data.get("foodType")) || "Autres",
      unit: clean(data.get("unit")) || "unites",
    });
    ui.modal = null;
    saveState();
    render();
    return;
  }

  if (formId === "editRecipeForm" && ui.modal?.kind === "edit-recipe") {
    const recipeId = ui.modal.id;
    const entries = [];
    const ingredientFields = Array.from(form.querySelectorAll("[data-role='recipe-ingredient']"));
    const quantityFields = Array.from(form.querySelectorAll("[data-role='recipe-quantity']"));

    ingredientFields.forEach((field, index) => {
      const ingredientId = clean(field.value);
      const quantity = clean(quantityFields[index]?.value) || "1";
      if (!ingredientId) {
        return;
      }
      entries.push({ ingredientId, quantity });
    });

    if (!entries.length) {
      window.alert("Ajoutez au moins un ingredient.");
      return;
    }

    const pdfFile = data.get("pdfFile");
    const removePdf = data.get("removePdf") === "on";
    const nextPdfDataUrl =
      pdfFile instanceof File && pdfFile.size > 0 ? await readFileAsDataUrl(pdfFile) : undefined;

    applyRecipeEdit(recipeId, {
      name: clean(data.get("name")),
      dishType: clean(data.get("dishType")) || "Plat",
      ingredientEntries: entries,
      pdfDataUrl: removePdf ? null : nextPdfDataUrl,
      pdfName: removePdf ? null : nextPdfDataUrl && pdfFile instanceof File ? pdfFile.name : undefined,
    });
    ui.modal = null;
    saveState();
    render();
    return;
  }

  if (formId === "editVacationForm" && ui.modal?.kind === "edit-vacation") {
    applyVacationEdit(ui.modal.id, {
      destination: clean(data.get("destination")),
      startDate: clean(data.get("startDate")),
      endDate: clean(data.get("endDate")),
      budget: Number(data.get("budget")) || 0,
    });
    ui.modal = null;
    saveState();
    render();
    return;
  }

  if (formId === "editProjectForm" && ui.modal?.kind === "edit-project") {
    applyProjectEdit(ui.modal.id, {
      title: clean(data.get("title")),
      lead: clean(data.get("lead")) || "both",
      status: clean(data.get("status")) || "En cours",
      deadline: clean(data.get("deadline")),
      note: clean(data.get("note")) || "",
    });
    ui.modal = null;
    saveState();
    render();
    return;
  }

  if (formId === "vacationForm") {
    const vacation = {
      id: uid("vac"),
      destination: clean(data.get("destination")),
      startDate: clean(data.get("startDate")),
      endDate: clean(data.get("endDate")),
      budget: Number(data.get("budget")) || 0,
      profiles: ["thomas", "christelle"],
      linkedProjectId: null,
    };
    state.vacations.unshift(vacation);
    state.calendar.unshift({
      id: uid("event"),
      title: `Depart - ${vacation.destination}`,
      date: vacation.startDate,
      type: "Vacances",
      profiles: vacation.profiles,
      sourceType: "vacation",
      sourceId: vacation.id,
    });
    state.calendar.unshift({
      id: uid("event"),
      title: `Retour - ${vacation.destination}`,
      date: vacation.endDate,
      type: "Vacances",
      profiles: vacation.profiles,
      sourceType: "vacation",
      sourceId: vacation.id,
    });
  }

  if (formId === "projectForm") {
    const project = {
      id: uid("project"),
      title: clean(data.get("title")),
      lead: clean(data.get("lead")) || state.activeProfile,
      profiles: ["thomas", "christelle"],
      status: clean(data.get("status")) || "En cours",
      deadline: clean(data.get("deadline")),
      linkedVacationId: null,
      note: clean(data.get("note")) || "",
    };
    state.projects.unshift(project);
  }

  saveState();
  form.reset();
  render();
}

function render() {
  const didUpdateTasks = reconcileTasksForToday();

  if (!hasProfileSelection()) {
    ui.modal = {
      kind: "profile-gate",
    };
  }

  document.body.dataset.themeProfile = state.activeProfile;
  if (state.activeProfile !== "thomas") {
    clearAdminAccess();
  }
  if (adminFab) {
    adminFab.hidden = state.activeProfile !== "thomas";
  }

  if (didUpdateTasks) {
    saveState();
  }

  if (isCalendarPage) {
    heroTitle.textContent = "Calendrier";
    heroSubtitle.textContent =
      "Une vraie page calendrier pour naviguer dans l'annee, ouvrir un mois et rejoindre ensuite la bonne page de l'application.";
    heroMeta.innerHTML = `
      <span class="tag">${escapeHtml(PROFILE_MAP[state.activeProfile].name)} actif</span>
      <button class="ghost-button" type="button" data-action="open-linked-view" data-view="dashboard">
        Retour au tableau de bord
      </button>
    `;
    profileSwitch.innerHTML = renderProfileSwitch();
    pageContent.innerHTML = renderCalendarDedicatedPage();
  } else if (isRecipePage) {
    heroTitle.textContent = "Nouvelle recette";
    heroSubtitle.textContent =
      "Construisez votre base de recettes avec des ingredients relies a votre base locale, puis reutilisez-les pour planifier vos repas.";
    heroMeta.innerHTML = `
      <span class="tag">${state.recipes.length} recettes en base</span>
      <button class="ghost-button" type="button" data-action="open-linked-view" data-view="cuisine">
        Retour a la cuisine
      </button>
    `;
    profileSwitch.innerHTML = renderProfileSwitch();
    pageContent.innerHTML = renderRecipePage();
  } else if (isIngredientPage) {
    heroTitle.textContent = "Nouvel ingredient";
    heroSubtitle.textContent =
      "Ajoutez un ingredient a votre base avec son type, son rangement et un stock de depart si besoin.";
    heroMeta.innerHTML = `
      <span class="tag">${state.ingredients.length} ingredients en base</span>
      <button class="ghost-button" type="button" data-action="open-linked-view" data-view="cuisine">
        Retour a la cuisine
      </button>
    `;
    profileSwitch.innerHTML = renderProfileSwitch();
    pageContent.innerHTML = renderIngredientPage();
  } else if (isStockPage) {
    heroTitle.textContent = "Stock";
    heroSubtitle.textContent =
      "Suivez ce que vous avez deja a la maison, classe par type d'ingredient et synchronise avec les courses et les repas prepares.";
    heroMeta.innerHTML = `
      <span class="tag">${state.ingredients.length} ingredients suivis</span>
      <button class="ghost-button" type="button" data-action="open-linked-view" data-view="cuisine">
        Retour a la cuisine
      </button>
    `;
    profileSwitch.innerHTML = renderProfileSwitch();
    pageContent.innerHTML = renderStockPage();
  } else if (isAdminPage) {
    if (state.activeProfile !== "thomas") {
      renderAdminRestricted();
      return;
    }
    if (!hasAdminAccess()) {
      renderAdminLocked();
      return;
    }
    heroTitle.textContent = "Admin";
    heroSubtitle.textContent =
      "Accedez a la gestion des donnees pour ouvrir l'espace ingredients ou l'espace recettes.";
    heroMeta.innerHTML = `
      <span class="tag">${state.ingredients.length} ingredients</span>
      <span class="tag">${state.recipes.length} recettes</span>
      <button class="ghost-button" type="button" data-action="open-linked-view" data-view="dashboard">
        Retour a l'app
      </button>
    `;
    profileSwitch.innerHTML = renderProfileSwitch();
    pageContent.innerHTML = renderAdminPage();
  } else if (isAdminIngredientsPage) {
    if (state.activeProfile !== "thomas") {
      renderAdminRestricted();
      return;
    }
    if (!hasAdminAccess()) {
      renderAdminLocked();
      return;
    }
    heroTitle.textContent = "Admin / Ingredients";
    heroSubtitle.textContent =
      "Modifiez ou supprimez les ingredients par type d'aliment, sans afficher toute la base d'un coup.";
    heroMeta.innerHTML = `
      <span class="tag">${state.ingredients.length} ingredients</span>
      <button class="ghost-button" type="button" data-action="open-admin-page">
        Retour a la gestion des donnees
      </button>
    `;
    profileSwitch.innerHTML = renderProfileSwitch();
    pageContent.innerHTML = renderAdminIngredientsPage();
  } else if (isAdminRecipesPage) {
    if (state.activeProfile !== "thomas") {
      renderAdminRestricted();
      return;
    }
    if (!hasAdminAccess()) {
      renderAdminLocked();
      return;
    }
    heroTitle.textContent = "Admin / Recettes";
    heroSubtitle.textContent =
      "Modifiez le nom, le type de plat, les ingredients et les quantites, ou supprimez une recette complete.";
    heroMeta.innerHTML = `
      <span class="tag">${state.recipes.length} recettes</span>
      <button class="ghost-button" type="button" data-action="open-admin-page">
        Retour a la gestion des donnees
      </button>
    `;
    profileSwitch.innerHTML = renderProfileSwitch();
    pageContent.innerHTML = renderAdminRecipesPage();
  } else {
    const view = getViewConfig(state.currentView);
    heroTitle.textContent = view.title;
    heroSubtitle.textContent = view.subtitle;
    heroMeta.innerHTML = renderHeroMeta();
    profileSwitch.innerHTML = renderProfileSwitch();
    pageContent.innerHTML = view.render();
  }

  navButtons.forEach((button) => {
    const targetView = isCalendarPage
      ? "calendar-page"
      : isRecipePage
        ? "cuisine"
        : isIngredientPage
          ? "cuisine"
        : isStockPage
          ? "cuisine"
        : isAdminPage
          ? null
        : isAdminIngredientsPage
          ? null
        : isAdminRecipesPage
          ? null
        : state.currentView;
    button.classList.toggle("active", button.dataset.view === targetView);
  });

  updateMobilePageNav();
  animateReveal();
  renderModal();
}

function getViewConfig(viewId) {
  const currentProfile = PROFILE_MAP[state.activeProfile];
  const partner = PROFILE_MAP[getPartnerId(state.activeProfile)];

  const configs = {
    dashboard: {
      title: "Tableau de bord",
      subtitle: `Vue croisee pour ${currentProfile.name} et ${partner.name} : tout ce qui bouge dans la maison, les courses, les repas, le calendrier et les projets.`,
      render: renderDashboardView,
    },
    tasks: {
      title: "Taches a faire",
      subtitle: `Les actions du quotidien et les chantiers plus longs, relies aux projets, aux vacances et aux courses.`,
      render: renderTasksView,
    },
    shopping: {
      title: "Liste de courses",
      subtitle: `Une liste vivante qui se nourrit de la cuisine, des besoins maison et des projets en cours.`,
      render: renderShoppingView,
    },
    cuisine: {
      title: "Cuisine",
      subtitle: `Planification des repas, ingredients partages et passage automatique vers la liste de courses.`,
      render: renderCuisineView,
    },
    calendar: {
      title: "Calendrier",
      subtitle: `Agenda unifie avec les rendez-vous, repas planifies, echeances et moments communs.`,
      render: renderCalendarView,
    },
    vacations: {
      title: "Vacances",
      subtitle: `Les sejours relies au calendrier, aux taches de preparation et aux projets utiles avant le depart.`,
      render: renderVacationsView,
    },
    projects: {
      title: "Projets",
      subtitle: `Les idees maison et les chantiers plus longs avec leurs taches, leurs achats et leurs echeances.`,
      render: renderProjectsView,
    },
  };

  return configs[viewId] || configs.dashboard;
}

function renderHeroMeta() {
  const currentProfile = PROFILE_MAP[state.activeProfile];
  const partner = PROFILE_MAP[getPartnerId(state.activeProfile)];
  const sharedTasks = getRelevant(state.tasks).filter(
    (task) => task.status === "open" && task.profiles.length > 1
  ).length;

  return `
    <span class="tag">${currentProfile.name} actif</span>
    <span class="tag">${partner.name} connecte</span>
    <span class="tag">${sharedTasks} taches partagees en cours</span>
  `;
}

function renderProfileSwitch() {
  return "";
}

function renderDashboardView() {
  const relevantVacations = getRelevant(state.vacations)
    .slice()
    .sort(sortByDate("startDate"));
  const nextVacation = relevantVacations[0];
  const todayItems = getDashboardTodayItems();
  const todayTasks = getTodayTasksForActiveProfile();
  const exportableWeeks = getExportableShoppingGroups();
  const currentWeekKey = getWeekInfo(todayDateKey()).key;
  const preferredWeek = exportableWeeks.find((entry) => entry.key === currentWeekKey) || exportableWeeks[0] || null;

  return `
    <div class="metrics-strip">
      ${renderMetric("Prochaines vacances", nextVacation ? nextVacation.destination : "Aucune", nextVacation ? `Prochain depart dans ${daysUntil(nextVacation.startDate)} jours` : "Aucun voyage programme")}
    </div>

    <div class="two-column">
      <section class="panel reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Aujourd'hui</h3>
            <p class="section-copy">Seulement les evenements agenda et projets prevus aujourd'hui pour ce profil.</p>
          </div>
          <button class="ghost-button" type="button" data-action="open-calendar-page">Vue calendrier</button>
        </div>
        <div class="list">
          ${todayItems.length ? todayItems.map(renderTimelineRow).join("") : renderEmpty("Aucun evenement agenda ni projet prevu aujourd'hui.")}
        </div>
      </section>

      <section class="panel reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Taches du jour</h3>
            <p class="section-copy">Les taches du jour associees au profil actif.</p>
          </div>
          <button class="ghost-button" type="button" data-action="switch-view" data-view="tasks">Voir les taches</button>
        </div>
        <div class="list">
          ${todayTasks.length ? todayTasks.map(renderTaskRow).join("") : renderEmpty("Aucune tache prevue aujourd'hui.")}
        </div>
      </section>
    </div>

    <section class="panel reveal">
      <div class="section-head">
        <div>
          <h3 class="section-title">Courses de la semaine</h3>
          <p class="section-copy">Telechargez le PDF de la liste de courses de la semaine a partager ou imprimer.</p>
        </div>
        <button class="ghost-button" type="button" data-action="switch-view" data-view="shopping">Voir les courses</button>
      </div>
      <div class="inline-stats shopping-export-tools">
        <select id="dashboardShoppingWeekSelect" ${exportableWeeks.length ? "" : "disabled"}>
          ${
            exportableWeeks.length
              ? exportableWeeks
                  .map(
                    (week) => `
                      <option value="${week.key}" ${preferredWeek && week.key === preferredWeek.key ? "selected" : ""}>
                        Semaine du ${week.startLabel} au ${week.endLabel}
                      </option>
                    `
                  )
                  .join("")
              : '<option value="">Aucune semaine disponible</option>'
          }
        </select>
        <button class="action-button" type="button" data-action="download-shopping-pdf" ${exportableWeeks.length ? "" : "disabled"}>
          PDF de la semaine
        </button>
        <span class="source-pill">
          ${preferredWeek ? `${preferredWeek.totalCount} article${preferredWeek.totalCount > 1 ? "s" : ""}` : "Pas encore de courses"}
        </span>
      </div>
    </section>
  `;
}

function getDashboardTodayItems() {
  const today = todayDateKey();

  return buildUnifiedTimeline()
    .filter((item) => item.date === today && (item.bucket === "Agenda" || item.bucket === "Projet"))
    .sort(sortByDate("date"));
}

function getTodayTasksForActiveProfile() {
  const today = todayDateKey();

  return getRelevant(state.tasks)
    .filter((task) => task.dueDate === today && task.status === "open")
    .slice()
    .sort(sortByDate("dueDate"));
}

function renderCompactActionButtons(entityType, id) {
  return `
    <div class="inline-stats">
      <button class="ghost-button" type="button" data-action="edit-${entityType}" data-id="${id}">
        Modifier
      </button>
      <button class="ghost-button" type="button" data-action="delete-${entityType}" data-id="${id}">
        Supprimer
      </button>
    </div>
  `;
}

function renderVacationsView() {
  const relevantVacations = getRelevant(state.vacations).slice().sort(sortByDate("startDate"));

  return `
    <div class="content-split">
      <section class="composer reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Ajouter un sejour</h3>
            <p class="section-copy">Le voyage s'inscrit dans le calendrier et pourra se lier ensuite a un projet ou a des taches.</p>
          </div>
        </div>
        <form id="vacationForm">
          <div class="form-grid">
            <div class="field full">
              <label for="vacation-destination">Destination</label>
              <input id="vacation-destination" name="destination" required placeholder="Ex. Amsterdam" />
            </div>
            <div class="field">
              <label for="vacation-start">Depart</label>
              <input id="vacation-start" name="startDate" type="date" required />
            </div>
            <div class="field">
              <label for="vacation-end">Retour</label>
              <input id="vacation-end" name="endDate" type="date" required />
            </div>
            <div class="field">
              <label for="vacation-budget">Budget estime</label>
              <input id="vacation-budget" name="budget" type="number" min="0" placeholder="900" />
            </div>
          </div>
          <div class="form-actions">
            <button class="action-button" type="submit">Ajouter le sejour</button>
          </div>
        </form>
      </section>

      <section class="panel reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Sejours a venir</h3>
            <p class="section-copy">${relevantVacations.length} projet${relevantVacations.length > 1 ? "s" : ""} de vacances relie${relevantVacations.length > 1 ? "s" : ""} au quotidien.</p>
          </div>
        </div>
        <div class="entity-grid">
          ${relevantVacations.length ? relevantVacations.map(renderVacationEntity).join("") : renderEmpty("Aucune vacances enregistree pour le moment.")}
        </div>
      </section>
    </div>
  `;
}

function renderProjectsView() {
  const relevantProjects = getRelevant(state.projects).slice().sort(sortByDate("deadline"));

  return `
    <div class="content-split">
      <section class="composer reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Ajouter un projet</h3>
            <p class="section-copy">La base de coordination pour relier taches, vacances et achats dans un seul endroit.</p>
          </div>
        </div>
        <form id="projectForm">
          <div class="form-grid">
            <div class="field full">
              <label for="project-title">Projet</label>
              <input id="project-title" name="title" required placeholder="Ex. refaire l'entree" />
            </div>
            <div class="field">
              <label for="project-lead">Responsable</label>
              <select id="project-lead" name="lead">
                <option value="thomas">Thomas</option>
                <option value="christelle">Christelle</option>
                <option value="both">Thomas et Christelle</option>
              </select>
            </div>
            <div class="field">
              <label for="project-status">Statut</label>
              <select id="project-status" name="status">
                <option>En cours</option>
                <option>Planification</option>
                <option>Decision</option>
                <option>Termine</option>
              </select>
            </div>
            <div class="field">
              <label for="project-deadline">Echeance</label>
              <input id="project-deadline" name="deadline" type="date" required />
            </div>
            <div class="field full">
              <label for="project-note">Note</label>
              <textarea id="project-note" name="note" rows="4" placeholder="Ce qui doit avancer, les idees a garder, les arbitrages a faire..."></textarea>
            </div>
          </div>
          <div class="form-actions">
            <button class="action-button" type="submit">Ajouter le projet</button>
          </div>
        </form>
      </section>

      <section class="panel reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Portefeuille maison</h3>
            <p class="section-copy">${relevantProjects.length} projet${relevantProjects.length > 1 ? "s" : ""} dans le radar, relies au reste de l'app.</p>
          </div>
        </div>
        <div class="entity-grid">
          ${relevantProjects.length ? relevantProjects.map(renderProjectEntity).join("") : renderEmpty("Aucun projet maison pour l'instant.")}
        </div>
      </section>
    </div>
  `;
}

function renderTasksView() {
  const relevantTasks = getRelevant(state.tasks).slice().sort(sortByDate("dueDate"));
  const openTasks = relevantTasks.filter((task) => task.status === "open");

  return `
    <div class="content-split">
      <section class="composer reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Ajouter une tache</h3>
            <p class="section-copy">Associez-la a un projet, a un voyage ou laissez-la en simple tache maison.</p>
          </div>
        </div>
        <form id="taskForm">
          <div class="form-grid">
            <div class="field full">
              <label for="task-title">Tache</label>
              <input id="task-title" name="title" required placeholder="Ex. reserver le plombier" />
            </div>
            <div class="field">
              <label for="task-due-date">Date</label>
              <input id="task-due-date" name="dueDate" type="date" required />
            </div>
            <div class="field">
              <label for="task-category">Categorie</label>
              <select id="task-category" name="category">
                <option>Maison</option>
                <option>Projet</option>
                <option>Vacances</option>
                <option>Logistique</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button class="action-button" type="submit">Ajouter la tache</button>
          </div>
        </form>
      </section>

      <section class="panel reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">File active</h3>
            <p class="section-copy">${openTasks.length} taches ouvertes pour ${PROFILE_MAP[state.activeProfile].name}, dont ${openTasks.filter((task) => task.profiles.length > 1).length} partagees.</p>
          </div>
        </div>
        <div class="list">
          ${relevantTasks.length ? relevantTasks.map(renderTaskRow).join("") : renderEmpty("Aucune tache enregistree pour le moment.")}
        </div>
      </section>
    </div>
  `;
}

function renderShoppingView() {
  const relevantItems = getRelevant(state.shopping);
  const groupedShopping = buildShoppingGroups(relevantItems);
  const exportableWeeks = groupedShopping.filter((group) =>
    group.categories.some((category) => category.items.some((item) => item.ingredientId))
  );

  return `
    <div class="content-split">
      <section class="composer reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Ajouter un achat</h3>
            <p class="section-copy">Rattachez-le a un repas, a un projet ou gardez une entree libre.</p>
          </div>
        </div>
        <form id="shoppingForm">
          <div class="form-grid">
            <div class="field full">
              <label for="shopping-title">Produit</label>
              <input id="shopping-title" name="title" required placeholder="Ex. huile d'olive" />
            </div>
            <div class="field">
              <label for="shopping-quantity">Quantite</label>
              <input id="shopping-quantity" name="quantity" placeholder="Ex. 2 bouteilles" />
            </div>
          </div>
          <div class="form-actions">
            <button class="action-button" type="submit">Ajouter a la liste</button>
          </div>
        </form>
      </section>

      <section class="panel reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Liste par semaine</h3>
            <p class="section-copy">${relevantItems.filter((item) => !item.purchased).length} achats restants, regroupes par semaine puis par type d'aliment.</p>
          </div>
          <div class="inline-stats shopping-export-tools">
            <span class="source-pill">Liste de la semaine</span>
            <select id="shoppingWeekSelect" ${exportableWeeks.length ? "" : "disabled"}>
              ${
                exportableWeeks.length
                  ? exportableWeeks
                      .map(
                        (group) => `
                          <option value="${group.key}">Semaine du ${escapeHtml(group.startLabel)} au ${escapeHtml(group.endLabel)}</option>
                        `
                      )
                      .join("")
                  : '<option value="">Aucune semaine exportable</option>'
              }
            </select>
            <button class="ghost-button" type="button" data-action="download-shopping-pdf" ${exportableWeeks.length ? "" : "disabled"}>
              Telecharger PDF
            </button>
          </div>
        </div>
        <div class="shopping-week-list">
          ${groupedShopping.length ? groupedShopping.map(renderShoppingWeekGroup).join("") : renderEmpty("La liste de courses est vide.")}
        </div>
      </section>
    </div>
  `;
}

function renderCuisineView() {
  const relevantMeals = getRelevant(state.meals).slice().sort(sortByDate("scheduledDate"));
  const recipes = state.recipes.slice().sort((left, right) => left.name.localeCompare(right.name, "fr"));
  const mealWeekGroups = buildCuisineMealWeekGroups(relevantMeals);

  return `
    <div class="content-split">
      <section class="composer reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Planifier un repas</h3>
            <p class="section-copy">Choisissez un plat dans votre base, la date et le moment de la journee.</p>
          </div>
          <div class="inline-stats">
            <button class="ghost-button" type="button" data-action="open-recipe-page">+ Recette</button>
            <button class="ghost-button" type="button" data-action="open-ingredient-page">+ Ingredient</button>
            <button class="ghost-button" type="button" data-action="open-stock-page">Stock</button>
          </div>
        </div>
        ${renderMealPlannerForm(recipes)}
        ${renderCookedUsageForm(recipes)}
      </section>

      <section class="panel reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Semaine en cuisine</h3>
            <p class="section-copy">${relevantMeals.length} repas planifies, relies aux courses et maintenant au stock de la maison.</p>
          </div>
        </div>
        <div class="cuisine-tree-wrap">
          ${
            mealWeekGroups.length
              ? renderCuisineMealTree(mealWeekGroups)
              : renderEmpty("Aucun repas n'est programme pour l'instant.")
          }
        </div>
      </section>
    </div>
  `;
}

function buildCuisineMealWeekGroups(meals) {
  const weekMap = new Map();

  meals.forEach((meal) => {
    const weekInfo = getWeekInfo(meal.scheduledDate);
    if (!weekMap.has(weekInfo.key)) {
      weekMap.set(weekInfo.key, {
        ...weekInfo,
        mealsCount: 0,
        daysMap: new Map(),
      });
    }

    const weekGroup = weekMap.get(weekInfo.key);
    weekGroup.mealsCount += 1;

    if (!weekGroup.daysMap.has(meal.scheduledDate)) {
      weekGroup.daysMap.set(meal.scheduledDate, {
        date: meal.scheduledDate,
        label: formatLongDate(meal.scheduledDate),
        meals: [],
      });
    }

    weekGroup.daysMap.get(meal.scheduledDate).meals.push(meal);
  });

  return Array.from(weekMap.values())
    .sort((left, right) => left.key.localeCompare(right.key))
    .map((weekGroup) => ({
      key: weekGroup.key,
      startLabel: weekGroup.startLabel,
      endLabel: weekGroup.endLabel,
      mealsCount: weekGroup.mealsCount,
      days: Array.from(weekGroup.daysMap.values())
        .sort((left, right) => left.date.localeCompare(right.date))
        .map((dayGroup) => ({
          ...dayGroup,
          meals: dayGroup.meals.slice().sort((left, right) => {
            const slotOrder = ["matin", "midi", "soir"];
            const leftIndex = slotOrder.indexOf(left.slot);
            const rightIndex = slotOrder.indexOf(right.slot);
            return leftIndex - rightIndex;
          }),
        })),
    }));
}

function renderCuisineMealTree(weekGroups) {
  const totalMeals = weekGroups.reduce((count, weekGroup) => count + weekGroup.mealsCount, 0);

  return `
    <details class="shopping-group reveal cuisine-root-group" open>
      <summary class="shopping-group-summary">
        <span>Cuisine / Semaine en cuisine</span>
        <span class="tag">${totalMeals} recette${totalMeals > 1 ? "s" : ""}</span>
      </summary>
      <div class="cuisine-week-list">
        ${weekGroups.map(renderCuisineWeekGroup).join("")}
      </div>
    </details>
  `;
}

function renderCuisineWeekGroup(weekGroup) {
  return `
    <details class="shopping-group reveal cuisine-week-group">
      <summary class="shopping-group-summary">
        <span>Semaine du ${escapeHtml(weekGroup.startLabel)} au ${escapeHtml(weekGroup.endLabel)}</span>
        <span class="tag">${weekGroup.mealsCount}</span>
      </summary>
      <div class="cuisine-day-list">
        ${weekGroup.days.map(renderCuisineDayGroup).join("")}
      </div>
    </details>
  `;
}

function renderCuisineDayGroup(dayGroup) {
  return `
    <details class="shopping-subgroup cuisine-day-group">
      <summary class="shopping-subgroup-summary">
        <span>${escapeHtml(dayGroup.label)}</span>
        <span class="tag">${dayGroup.meals.length}</span>
      </summary>
      <div class="entity-grid cuisine-meal-grid">
        ${dayGroup.meals.map((meal) => renderMealEntity(meal, false)).join("")}
      </div>
    </details>
  `;
}

function renderMealPlannerForm(recipes) {
  return `
    <form id="mealForm">
      <div class="form-grid">
        <div class="field full">
          <label for="mealRecipeSearch">Recette</label>
          <input
            id="mealRecipeSearch"
            name="recipeQuery"
            list="recipeSuggestions"
            value="${escapeHtmlAttribute(ui.mealRecipeSearchTerm)}"
            placeholder="Ecrire pour rechercher la recette"
            required
          />
          <datalist id="recipeSuggestions">
            ${recipes
              .map(
                (recipe) => `
                  <option value="${escapeHtml(recipe.name)}">${escapeHtml(recipe.dishType)}</option>
                `
              )
              .join("")}
          </datalist>
        </div>
        <div class="field">
          <label for="meal-date">Date</label>
          <input id="meal-date" name="scheduledDate" type="date" required />
        </div>
        <div class="field">
          <label for="meal-slot">Moment</label>
          <select id="meal-slot" name="slot">
            <option value="matin">Matin</option>
            <option value="midi">Midi</option>
            <option value="soir" selected>Soir</option>
          </select>
        </div>
      </div>
      <div class="form-actions">
        <button class="action-button" type="submit">Ajouter le repas</button>
      </div>
    </form>
  `;
}

function renderCookedUsageForm(recipes) {
  return `
    <div class="section-divider"></div>
    <div class="section-head section-head-tight">
      <div>
        <h3 class="section-title">J'ai cuisine</h3>
        <p class="section-copy">Declarez une recette faite hors planning ou l'usage ponctuel d'un ingredient pour deduire le stock.</p>
      </div>
    </div>
    <form id="cookedForm">
      <div class="form-grid">
        <div class="field">
          <label for="cooked-entry-type">Deduction via</label>
          <select id="cooked-entry-type" name="entryType">
            <option value="recipe">Recette complete</option>
            <option value="ingredient">Ingredient seul</option>
          </select>
        </div>
        <div class="field full">
          <label for="cooked-recipe">Recette</label>
          <select id="cooked-recipe" name="recipeId">
            <option value="">Choisir une recette</option>
            ${recipes
              .map(
                (recipe) => `
                  <option value="${recipe.id}">${escapeHtml(recipe.name)} · ${escapeHtml(recipe.dishType)}</option>
                `
              )
              .join("")}
          </select>
        </div>
        <div class="field">
          <label for="cooked-ingredient">Ingredient</label>
          <select id="cooked-ingredient" name="ingredientId">
            <option value="">Choisir un ingredient</option>
            ${renderIngredientChoiceOptions()}
          </select>
        </div>
        <div class="field">
          <label for="cooked-quantity">Quantite retiree</label>
          <input id="cooked-quantity" name="quantity" placeholder="Ex. 2, 200 g, 1 litre" />
        </div>
      </div>
      <div class="form-actions">
        <button class="action-button" type="submit">Deduir du stock</button>
      </div>
    </form>
  `;
}

function renderIngredientPage() {
  const filteredIngredients = getFilteredIngredients(ui.ingredientLibrarySearchTerm);
  return `
    <div class="content-split">
      <section class="composer reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Creer un ingredient</h3>
            <p class="section-copy">Ajoutez-le une fois a la base, puis reutilisez-le dans les recettes, les courses et le stock.</p>
          </div>
        </div>
        <form id="ingredientForm">
          <div class="form-grid">
            <div class="field full">
              <label for="ingredient-name-page">Nom</label>
              <input id="ingredient-name-page" name="name" required placeholder="Ex. citron vert" />
            </div>
            <div class="field">
              <label for="ingredient-storage-page">Type de produit</label>
              <select id="ingredient-storage-page" name="storage">
                <option value="frais">Produit frais</option>
                <option value="placard">Produit de placard</option>
              </select>
            </div>
            <div class="field">
              <label for="ingredient-food-type-page">Type d'ingredient</label>
              <select id="ingredient-food-type-page" name="foodType">
                ${renderFoodTypeOptions()}
              </select>
            </div>
            <div class="field">
              <label for="ingredient-unit-page">Unite</label>
              <select id="ingredient-unit-page" name="unit">
                ${renderMeasurementUnitOptions("unites")}
              </select>
            </div>
            <div class="field full">
              <label for="ingredient-stock-page">Stock de depart</label>
              <input id="ingredient-stock-page" name="stockQuantity" placeholder="Ex. 3, 200 g, 1 botte" />
            </div>
          </div>
          <div class="form-actions">
            <button class="action-button" type="submit">Enregistrer l'ingredient</button>
          </div>
        </form>
      </section>

      <section class="panel reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Base ingredients</h3>
            <p class="section-copy">${filteredIngredients.length} ingredient${filteredIngredients.length > 1 ? "s" : ""} visibles dans votre base.</p>
          </div>
        </div>
        <form id="ingredientLibrarySearchForm">
          <div class="form-grid">
            <div class="field full">
              <label for="ingredientLibrarySearchInput">Rechercher un ingredient</label>
              <input id="ingredientLibrarySearchInput" name="search" value="${escapeHtmlAttribute(ui.ingredientLibrarySearchTerm)}" placeholder="Ex. tomate, feta, basilic" />
            </div>
          </div>
          <div class="form-actions">
            <button class="ghost-button" type="submit">Rechercher</button>
          </div>
        </form>
        <div class="entity-grid">
          ${filteredIngredients.length ? filteredIngredients.map(renderIngredientSummaryEntity).join("") : renderEmpty("Aucun ingredient ne correspond a votre recherche.")}
        </div>
      </section>
    </div>
  `;
}

function renderStockPage() {
  const groups = buildIngredientTypeGroups(ui.stockSearchTerm);
  const trackedIngredients = state.ingredients.filter((ingredient) => normalizeQuantityString(ingredient.stockQuantity || "0") !== "0").length;

  return `
    <section class="panel reveal">
      <div class="section-head">
        <div>
          <h3 class="section-title">Stock par type</h3>
          <p class="section-copy">${trackedIngredients} ingredient${trackedIngredients > 1 ? "s" : ""} ont deja un stock non nul. Cocher une course augmente le stock, preparer un repas le diminue.</p>
        </div>
      </div>
      <form id="stockSearchForm">
        <div class="form-grid">
          <div class="field full">
            <label for="stockSearchInput">Rechercher un ingredient</label>
            <input id="stockSearchInput" name="search" value="${escapeHtmlAttribute(ui.stockSearchTerm)}" placeholder="Ex. tomate, riz, lait" />
          </div>
        </div>
        <div class="form-actions">
          <button class="ghost-button" type="submit">Rechercher</button>
        </div>
      </form>
      <div class="shopping-week-list">
        ${groups.length ? groups.map(renderStockGroup).join("") : renderEmpty("Aucun ingredient ne correspond a votre recherche.")}
      </div>
    </section>
  `;
}

function renderRecipePage() {
  const recipes = state.recipes.slice().sort((left, right) => left.name.localeCompare(right.name, "fr"));

  return `
    <div class="content-split">
      <section class="composer reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Creer une recette</h3>
            <p class="section-copy">Donnez un nom, choisissez le type de plat puis composez la recette avec les ingredients de votre base.</p>
          </div>
        </div>
        <form id="recipeForm">
          <div class="form-grid">
            <div class="field full">
              <label for="recipe-name">Nom de la recette</label>
              <input id="recipe-name" name="name" required placeholder="Ex. tarte tomates feta" />
            </div>
            <div class="field">
              <label for="recipe-type">Type de plat</label>
              <select id="recipe-type" name="dishType">
                <option>Entree</option>
                <option selected>Plat</option>
                <option>Dessert</option>
                <option>Boisson</option>
              </select>
            </div>
            <div class="field full">
              <label for="recipeIngredientSearch">Ajouter un ingredient</label>
              <div class="inline-form-row">
                <input
                  id="recipeIngredientSearch"
                  list="ingredientSuggestions"
                  placeholder="Commencez a taper un ingredient"
                />
                <input
                  id="recipeIngredientQuantity"
                  placeholder="Quantite"
                />
                <button class="ghost-button" type="button" data-action="add-draft-ingredient">
                  Ajouter
                </button>
              </div>
              <datalist id="ingredientSuggestions">
                ${state.ingredients
                  .slice()
                  .sort((left, right) => left.name.localeCompare(right.name, "fr"))
                  .map((ingredient) => `<option value="${escapeHtml(ingredient.name)}"></option>`)
                  .join("")}
              </datalist>
            </div>
          </div>
          <div class="draft-list">
            ${
              state.recipeDraftIngredients.length
                ? state.recipeDraftIngredients
                    .map((ingredientId) => renderDraftIngredient(ingredientId))
                    .join("")
                : renderEmpty("Aucun ingredient dans la recette pour l'instant.")
            }
          </div>
          <div class="form-actions">
            <button class="ghost-button" type="button" data-action="open-ingredient-page">Ajouter un ingredient a la base</button>
            <button class="action-button" type="submit">Enregistrer la recette</button>
          </div>
        </form>
      </section>

      <section class="panel reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Recettes existantes</h3>
            <p class="section-copy">${recipes.length} recette${recipes.length > 1 ? "s" : ""} disponibles dans la base.</p>
          </div>
        </div>
        <div class="entity-grid">
          ${recipes.length ? recipes.map(renderRecipeEntity).join("") : renderEmpty("Aucune recette en base.")}
        </div>
      </section>
    </div>
  `;
}

function renderAdminPage() {
  return `
    <section class="panel reveal">
      <div class="section-head">
        <div>
          <h3 class="section-title">Gestion des donnees</h3>
          <p class="section-copy">Choisissez l'espace que vous voulez administrer.</p>
        </div>
      </div>
      <div class="two-column admin-entry-grid">
        <article class="entity reveal">
          <div class="entity-top">
            <div>
              <h4 class="entity-title">Ingredients</h4>
              <p class="entity-copy">${state.ingredients.length} ingredients classes par type d'aliment.</p>
            </div>
            <button class="action-button" type="button" data-action="open-admin-ingredients-page">
              Ouvrir
            </button>
          </div>
        </article>
        <article class="entity reveal">
          <div class="entity-top">
            <div>
              <h4 class="entity-title">Recettes</h4>
              <p class="entity-copy">${state.recipes.length} recettes modifiables en detail.</p>
            </div>
            <button class="action-button" type="button" data-action="open-admin-recipes-page">
              Ouvrir
            </button>
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderAdminIngredientsPage() {
  const groupedIngredients = buildIngredientTypeGroups();
  return `
    <section class="panel reveal">
      <div class="section-head">
        <div>
          <h3 class="section-title">Ingredients</h3>
          <p class="section-copy">Les ingredients sont regroupes par type pour eviter d'afficher toute la base d'un seul coup.</p>
        </div>
      </div>
      <div class="shopping-week-list">
        ${groupedIngredients.length ? groupedIngredients.map(renderAdminIngredientGroup).join("") : renderEmpty("Aucun ingredient en base.")}
      </div>
    </section>
  `;
}

function renderAdminRecipesPage() {
  const recipes = state.recipes.slice().sort((left, right) => left.name.localeCompare(right.name, "fr"));
  return `
    <section class="panel reveal">
      <div class="section-head">
        <div>
          <h3 class="section-title">Recettes</h3>
          <p class="section-copy">Modifiez le nom, le type de plat, les ingredients et leurs quantites directement depuis le bouton Modifier.</p>
        </div>
      </div>
      <div class="entity-grid">
        ${recipes.length ? recipes.map(renderAdminRecipeRow).join("") : renderEmpty("Aucune recette en base.")}
      </div>
    </section>
  `;
}

function renderAdminRestricted() {
  heroTitle.textContent = "Admin";
  heroSubtitle.textContent = "Acces reserve au profil Thomas.";
  heroMeta.innerHTML = `
    <button class="ghost-button" type="button" data-action="open-linked-view" data-view="dashboard">
      Retour a l'app
    </button>
  `;
  profileSwitch.innerHTML = renderProfileSwitch();
  pageContent.innerHTML = `
    <section class="panel reveal">
      <div class="empty-state">Le cadenas et l'administration ne sont accessibles que depuis le profil Thomas.</div>
    </section>
  `;
  animateReveal();
  renderModal();
}

function renderAdminLocked() {
  heroTitle.textContent = "Admin verrouille";
  heroSubtitle.textContent = "Saisissez le mot de passe via le cadenas pour ouvrir l'administration.";
  heroMeta.innerHTML = `
    <button class="ghost-button" type="button" data-action="open-linked-view" data-view="dashboard">
      Retour a l'app
    </button>
  `;
  profileSwitch.innerHTML = renderProfileSwitch();
  pageContent.innerHTML = `
    <section class="panel reveal">
      <div class="section-head">
        <div>
          <h3 class="section-title">Acces protege</h3>
          <p class="section-copy">L'espace admin reste verrouille tant que le mot de passe n'a pas ete saisi depuis le cadenas.</p>
        </div>
      </div>
      <div class="form-actions">
        <button class="action-button" type="button" data-action="open-admin-gate">Ouvrir avec mot de passe</button>
      </div>
    </section>
  `;
  animateReveal();
  renderModal();
}

function renderModal() {
  let modalRoot = document.querySelector("#modalRoot");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = "modalRoot";
    document.body.appendChild(modalRoot);
  }

  modalRoot.innerHTML = ui.modal ? buildModalContent() : "";
}

function buildModalContent() {
  if (!ui.modal) {
    return "";
  }

  if (ui.modal.kind === "profile-gate") {
    return `
      <div class="modal-backdrop">
        <div class="modal-card modal-card-compact">
          <div class="section-head">
            <div>
              <h3 class="section-title">Profils</h3>
            </div>
          </div>
          <div class="profile-entry-grid">
            ${Object.values(PROFILE_MAP)
              .map(
                (profile) => `
                  <button class="profile-entry-button profile-entry-button-${profile.id}" type="button" data-action="choose-profile" data-profile="${profile.id}">
                    <span class="profile-entry-name">${escapeHtml(profile.name)}</span>
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
  }

  if (ui.modal.kind === "house-access-auth") {
    return `
      <div class="modal-backdrop">
        <div class="modal-card">
          <div class="section-head">
            <div>
              <h3 class="section-title">Debloquer la synchro maison</h3>
              <p class="section-copy">Entrez le mot de passe maison pour acceder aux donnees partagees stockees sur votre base Vercel.</p>
            </div>
          </div>
          <form id="houseAccessForm">
            <div class="form-grid">
              <div class="field full">
                <label for="house-access-password">Mot de passe maison</label>
                <input id="house-access-password" name="password" type="password" required />
              </div>
            </div>
            <div class="form-actions">
              <button class="action-button" type="submit">Ouvrir la synchro</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (ui.modal.kind === "admin-password-setup") {
    return `
      <div class="modal-backdrop">
        <div class="modal-card">
          <div class="section-head">
            <div>
              <h3 class="section-title">Definir le mot de passe admin</h3>
              <p class="section-copy">Ce mot de passe sera demande a chaque clic sur le cadenas.</p>
            </div>
            <button class="ghost-button" type="button" data-action="close-modal">Fermer</button>
          </div>
          <form id="adminPasswordSetupForm">
            <div class="form-grid">
              <div class="field full">
                <label for="admin-password">Mot de passe</label>
                <input id="admin-password" name="password" type="password" required />
              </div>
              <div class="field full">
                <label for="admin-password-confirm">Confirmation</label>
                <input id="admin-password-confirm" name="confirmPassword" type="password" required />
              </div>
            </div>
            <div class="form-actions">
              <button class="action-button" type="submit">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (ui.modal.kind === "admin-password-auth") {
    return `
      <div class="modal-backdrop">
        <div class="modal-card">
          <div class="section-head">
            <div>
              <h3 class="section-title">Mot de passe admin</h3>
              <p class="section-copy">Saisissez le mot de passe pour acceder a l'administration.</p>
            </div>
            <button class="ghost-button" type="button" data-action="close-modal">Fermer</button>
          </div>
          <form id="adminPasswordAuthForm">
            <div class="form-grid">
              <div class="field full">
                <label for="admin-password-auth">Mot de passe</label>
                <input id="admin-password-auth" name="password" type="password" required />
              </div>
            </div>
            <div class="form-actions">
              <button class="action-button" type="submit">Ouvrir l'admin</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (ui.modal.kind === "edit-ingredient") {
    const ingredient = state.ingredients.find((entry) => entry.id === ui.modal.id);
    if (!ingredient) {
      return "";
    }

    return `
      <div class="modal-backdrop">
        <div class="modal-card">
          <div class="section-head">
            <div>
              <h3 class="section-title">Modifier l'ingredient</h3>
              <p class="section-copy">Mettez a jour le nom, le stockage et le type d'ingredient.</p>
            </div>
            <button class="ghost-button" type="button" data-action="close-modal">Fermer</button>
          </div>
          <form id="editIngredientForm">
            <div class="form-grid">
              <div class="field full">
                <label for="edit-ingredient-name">Nom</label>
                <input id="edit-ingredient-name" name="name" value="${escapeHtmlAttribute(ingredient.name)}" required />
              </div>
              <div class="field">
                <label for="edit-ingredient-storage">Type de produit</label>
                <select id="edit-ingredient-storage" name="storage">
                  <option value="frais" ${ingredient.storage === "frais" ? "selected" : ""}>Produit frais</option>
                  <option value="placard" ${ingredient.storage === "placard" ? "selected" : ""}>Produit de placard</option>
                </select>
              </div>
              <div class="field">
                <label for="edit-ingredient-food-type">Type d'ingredient</label>
                <select id="edit-ingredient-food-type" name="foodType">
                  ${renderFoodTypeOptions(ingredient.foodType || "Autres")}
                </select>
              </div>
              <div class="field">
                <label for="edit-ingredient-unit">Unite</label>
                <select id="edit-ingredient-unit" name="unit">
                  ${renderMeasurementUnitOptions(ingredient.unit || "unites")}
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button class="action-button" type="submit">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (ui.modal.kind === "edit-recipe") {
    const recipe = state.recipes.find((entry) => entry.id === ui.modal.id);
    if (!recipe) {
      return "";
    }

    return `
      <div class="modal-backdrop">
        <div class="modal-card modal-card-wide">
          <div class="section-head">
            <div>
              <h3 class="section-title">Modifier la recette</h3>
              <p class="section-copy">Modifiez le nom, le type de plat, les ingredients et leurs quantites.</p>
            </div>
            <button class="ghost-button" type="button" data-action="close-modal">Fermer</button>
          </div>
          <form id="editRecipeForm">
            <div class="form-grid">
              <div class="field full">
                <label for="edit-recipe-name">Nom</label>
                <input id="edit-recipe-name" name="name" value="${escapeHtmlAttribute(ui.modal.name || recipe.name)}" required />
              </div>
              <div class="field">
                <label for="edit-recipe-dish-type">Type de plat</label>
                <select id="edit-recipe-dish-type" name="dishType">
                  <option ${ui.modal.dishType === "Entree" ? "selected" : ""}>Entree</option>
                  <option ${ui.modal.dishType === "Plat" ? "selected" : ""}>Plat</option>
                  <option ${ui.modal.dishType === "Dessert" ? "selected" : ""}>Dessert</option>
                  <option ${ui.modal.dishType === "Boisson" ? "selected" : ""}>Boisson</option>
                </select>
              </div>
              <div class="field full">
                <label for="edit-recipe-pdf">PDF de la recette</label>
                <input id="edit-recipe-pdf" name="pdfFile" type="file" accept="application/pdf" />
                ${
                  recipe.pdfDataUrl
                    ? `<span class="muted">PDF actuel : ${escapeHtml(recipe.pdfName || "document.pdf")}</span>`
                    : '<span class="muted">Aucun PDF associe pour le moment.</span>'
                }
              </div>
              ${
                recipe.pdfDataUrl
                  ? `
                    <div class="field full">
                      <label>
                        <input name="removePdf" type="checkbox" />
                        Retirer le PDF actuel
                      </label>
                    </div>
                  `
                  : ""
              }
            </div>
            <div class="modal-entry-list">
              ${ui.modal.entries
                .map(
                  (entry, index) => `
                    <div class="modal-entry-row">
                      <select data-role="recipe-ingredient">
                        <option value="">Choisir un ingredient</option>
                        ${state.ingredients
                          .slice()
                          .sort((left, right) => left.name.localeCompare(right.name, "fr"))
                          .map(
                            (ingredient) => `
                              <option value="${ingredient.id}" ${ingredient.id === entry.ingredientId ? "selected" : ""}>
                                ${escapeHtml(ingredient.name)}
                              </option>
                            `
                          )
                          .join("")}
                      </select>
                      <input data-role="recipe-quantity" value="${escapeHtmlAttribute(entry.quantity || "1")}" placeholder="Quantite" />
                      <button class="ghost-button" type="button" data-action="remove-edit-recipe-entry" data-id="${index}">
                        Retirer
                      </button>
                    </div>
                  `
                )
                .join("")}
            </div>
            <div class="form-actions">
              <button class="ghost-button" type="button" data-action="add-edit-recipe-entry">Ajouter un ingredient</button>
              <button class="action-button" type="submit">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (ui.modal.kind === "edit-vacation") {
    const vacation = state.vacations.find((entry) => entry.id === ui.modal.id);
    if (!vacation) {
      return "";
    }

    return `
      <div class="modal-backdrop">
        <div class="modal-card">
          <div class="section-head">
            <div>
              <h3 class="section-title">Modifier le sejour</h3>
              <p class="section-copy">Mettez a jour les dates, la destination et le budget sans perdre les liens utiles.</p>
            </div>
            <button class="ghost-button" type="button" data-action="close-modal">Fermer</button>
          </div>
          <form id="editVacationForm">
            <div class="form-grid">
              <div class="field full">
                <label for="edit-vacation-destination">Destination</label>
                <input id="edit-vacation-destination" name="destination" value="${escapeHtmlAttribute(vacation.destination)}" required />
              </div>
              <div class="field">
                <label for="edit-vacation-start">Depart</label>
                <input id="edit-vacation-start" name="startDate" type="date" value="${escapeHtmlAttribute(vacation.startDate)}" required />
              </div>
              <div class="field">
                <label for="edit-vacation-end">Retour</label>
                <input id="edit-vacation-end" name="endDate" type="date" value="${escapeHtmlAttribute(vacation.endDate)}" required />
              </div>
              <div class="field">
                <label for="edit-vacation-budget">Budget estime</label>
                <input id="edit-vacation-budget" name="budget" type="number" min="0" value="${escapeHtmlAttribute(vacation.budget || 0)}" />
              </div>
            </div>
            <div class="form-actions">
              <button class="action-button" type="submit">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (ui.modal.kind === "edit-project") {
    const project = state.projects.find((entry) => entry.id === ui.modal.id);
    if (!project) {
      return "";
    }

    return `
      <div class="modal-backdrop">
        <div class="modal-card">
          <div class="section-head">
            <div>
              <h3 class="section-title">Modifier le projet</h3>
              <p class="section-copy">Modifiez le titre, le responsable, le statut, l'echeance et la note du projet.</p>
            </div>
            <button class="ghost-button" type="button" data-action="close-modal">Fermer</button>
          </div>
          <form id="editProjectForm">
            <div class="form-grid">
              <div class="field full">
                <label for="edit-project-title">Projet</label>
                <input id="edit-project-title" name="title" value="${escapeHtmlAttribute(project.title)}" required />
              </div>
              <div class="field">
                <label for="edit-project-lead">Responsable</label>
                <select id="edit-project-lead" name="lead">
                  <option value="thomas" ${project.lead === "thomas" ? "selected" : ""}>Thomas</option>
                  <option value="christelle" ${project.lead === "christelle" ? "selected" : ""}>Christelle</option>
                  <option value="both" ${project.lead === "both" ? "selected" : ""}>Thomas et Christelle</option>
                </select>
              </div>
              <div class="field">
                <label for="edit-project-status">Statut</label>
                <select id="edit-project-status" name="status">
                  <option ${project.status === "En cours" ? "selected" : ""}>En cours</option>
                  <option ${project.status === "Planification" ? "selected" : ""}>Planification</option>
                  <option ${project.status === "Decision" ? "selected" : ""}>Decision</option>
                  <option ${project.status === "Termine" ? "selected" : ""}>Termine</option>
                </select>
              </div>
              <div class="field">
                <label for="edit-project-deadline">Echeance</label>
                <input id="edit-project-deadline" name="deadline" type="date" value="${escapeHtmlAttribute(project.deadline)}" required />
              </div>
              <div class="field full">
                <label for="edit-project-note">Note</label>
                <textarea id="edit-project-note" name="note" rows="4">${escapeHtml(project.note || "")}</textarea>
              </div>
            </div>
            <div class="form-actions">
              <button class="action-button" type="submit">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (ui.modal.kind === "confirm-delete") {
    return `
      <div class="modal-backdrop">
        <div class="modal-card">
          <div class="section-head">
            <div>
              <h3 class="section-title">Confirmer la suppression</h3>
              <p class="section-copy">${escapeHtml(ui.modal.message)}</p>
            </div>
          </div>
          <div class="form-actions">
            <button class="ghost-button" type="button" data-action="cancel-delete">Annuler</button>
            <button class="action-button" type="button" data-action="confirm-delete">Supprimer</button>
          </div>
        </div>
      </div>
    `;
  }

  return "";
}

function renderCalendarView() {
  const relevantEvents = getRelevant(state.calendar)
    .filter((eventItem) => eventItem.sourceType !== "meal")
    .slice()
    .sort(sortByDate("date"));
  const timeline = buildUnifiedTimeline();

  return `
    <div class="content-split">
      ${renderCalendarComposerSection(true)}

      <section class="panel reveal">
        <div class="section-head">
          <div>
            <h3 class="section-title">Agenda visuel</h3>
            <p class="section-copy">Basculez entre une lecture liste et une vraie vue calendrier annuelle, puis zoomez sur un mois en un clic.</p>
          </div>
          <div class="inline-stats">
            <button
              class="toggle-button ${state.calendarDisplay === "calendar" ? "is-active" : ""}"
              type="button"
              data-action="calendar-display"
              data-display="calendar"
            >
              Vue calendrier
            </button>
            <button
              class="toggle-button ${state.calendarDisplay === "list" ? "is-active" : ""}"
              type="button"
              data-action="calendar-display"
              data-display="list"
            >
              Vue liste
            </button>
          </div>
        </div>
        ${
          state.calendarDisplay === "calendar"
            ? renderCalendarPlanner(timeline)
            : renderCalendarListView(timeline, relevantEvents)
        }
      </section>
    </div>
  `;
}

function renderCalendarComposerSection(isVisible) {
  if (!isVisible) {
    return "";
  }

  return `
    <section class="composer reveal" id="calendarComposer">
      <div class="section-head">
        <div>
          <h3 class="section-title">Ajouter un evenement</h3>
          <p class="section-copy">Le calendrier centralise vos rendez-vous et peut rester lie aux autres espaces.</p>
        </div>
        ${isCalendarPage ? '<button class="ghost-button" type="button" data-action="close-calendar-composer">Fermer</button>' : ""}
      </div>
      <form id="calendarForm">
        <div class="form-grid">
          <div class="field full">
            <label for="calendar-title">Evenement</label>
            <input id="calendar-title" name="title" required placeholder="Ex. rendez-vous banque" />
          </div>
          <div class="field">
            <label for="calendar-date">Date</label>
            <input id="calendar-date" name="date" type="date" required />
          </div>
          <div class="field">
            <label for="calendar-type">Type</label>
            <select id="calendar-type" name="type">
              <option>Maison</option>
              <option>Perso</option>
              <option>Logistique</option>
              <option>Cuisine</option>
              <option>Vacances</option>
            </select>
          </div>
          <div class="field">
            <label for="calendar-profiles">Pour qui ?</label>
            <select id="calendar-profiles" name="profiles">
              ${renderProfileOptions()}
            </select>
          </div>
          <div class="field">
            <label for="calendar-relation">Lien</label>
            <select id="calendar-relation" name="relation">
              ${renderRelationOptions(["project", "vacation", "task"])}
            </select>
          </div>
        </div>
        <div class="form-actions">
          <button class="action-button" type="submit">Ajouter a l'agenda</button>
        </div>
      </form>
    </section>
  `;
}

function renderMetric(label, value, detail) {
  return `
    <article class="metric reveal">
      <p class="metric-label">${escapeHtml(label)}</p>
      <p class="metric-value">${escapeHtml(value)}</p>
      <p class="metric-detail">${escapeHtml(detail)}</p>
    </article>
  `;
}

function renderConnectedHighlight({ title, copy, meta }) {
  return `
    <article class="list-row reveal">
      <div class="row-top">
        <h4 class="row-title">${escapeHtml(title)}</h4>
        <span class="tag">Connecte</span>
      </div>
      <p class="row-copy">${escapeHtml(copy)}</p>
      <div class="row-bottom">
        <span class="source-pill">${escapeHtml(meta)}</span>
      </div>
    </article>
  `;
}

function renderTaskRow(task) {
  const isLate = Boolean(task.isLate) && task.status !== "done";
  return `
    <article class="list-row reveal ${isLate ? "list-row-late" : ""}">
      <div class="row-top">
        <div>
          <h4 class="row-title">${escapeHtml(task.title)}</h4>
          <p class="row-copy">Echeance le ${formatShortDate(task.dueDate)} · ${escapeHtml(task.category)}</p>
        </div>
        <div class="inline-stats">
          <button class="toggle-button" type="button" data-action="toggle-task" data-id="${task.id}">
            ${task.status === "done" ? "Reouvrir" : "Marquer fait"}
          </button>
          <button class="ghost-button" type="button" data-action="delete-task" data-id="${task.id}">
            Annuler
          </button>
        </div>
      </div>
      <div class="row-bottom">
        <span class="status-pill ${task.status === "done" ? "status-done" : isLate ? "status-late" : "status-open"}">
          ${task.status === "done" ? "Terminee" : isLate ? "Retard" : "A faire"}
        </span>
      </div>
    </article>
  `;
}

function renderShoppingRow(item) {
  return `
    <article class="list-row reveal">
      <div class="row-top">
        <div>
          <h4 class="row-title">${escapeHtml(item.title)}</h4>
          <p class="row-copy">${item.ingredientId ? `Ingredient · ${escapeHtml(formatMeasurementUnit(itemUnitLabel(item)))} · ` : ""}Quantite : ${escapeHtml(item.quantity)}</p>
        </div>
        <div class="inline-stats">
          <button class="toggle-button" type="button" data-action="toggle-shopping" data-id="${item.id}">
            ${item.purchased ? "A reprendre" : "Coche"}
          </button>
          <button class="ghost-button" type="button" data-action="delete-shopping" data-id="${item.id}">
            Supprimer
          </button>
        </div>
      </div>
      <form data-form-type="shopping-quantity-update" data-shopping-id="${item.id}">
        <div class="form-grid" style="margin-top: 0.8rem;">
          <div class="field full">
            <label for="shopping-quantity-${item.id}">Modifier la quantite</label>
            <input id="shopping-quantity-${item.id}" name="quantity" value="${escapeHtmlAttribute(item.quantity || "1")}" />
          </div>
        </div>
        <div class="form-actions">
          <button class="action-button" type="submit">Mettre a jour</button>
        </div>
      </form>
      <div class="row-bottom">
        <span class="status-pill ${item.purchased ? "status-bought" : "status-open"}">
          ${item.purchased ? "Pris" : "A acheter"}
        </span>
      </div>
    </article>
  `;
}

function renderShoppingWeekGroup(group) {
  return `
    <details class="shopping-group reveal" open>
      <summary class="shopping-group-summary">
        <span>Semaine du ${escapeHtml(group.startLabel)} au ${escapeHtml(group.endLabel)}</span>
        <span class="tag">${group.totalCount} article${group.totalCount > 1 ? "s" : ""}</span>
      </summary>
      <div class="shopping-type-list">
        ${group.categories.map(renderShoppingCategoryGroup).join("")}
      </div>
    </details>
  `;
}

function renderShoppingCategoryGroup(categoryGroup) {
  return `
    <details class="shopping-subgroup">
      <summary class="shopping-subgroup-summary">
        <span>${escapeHtml(categoryGroup.foodType)}</span>
        <span class="tag">${categoryGroup.items.length}</span>
      </summary>
      <div class="list shopping-items-list">
        ${categoryGroup.items.map(renderShoppingRow).join("")}
      </div>
    </details>
  `;
}

function renderMealEntity(meal, compact) {
  const ingredients = getMealIngredients(meal);
  const recipe = getRecipeByMeal(meal);
  const unlistedItems = ingredients.filter((ingredient) => !hasShoppingItemForIngredient(meal.id, ingredient));
  const pendingItems = ingredients.filter((ingredient) => !isIngredientValidated(meal.id, ingredient));
  const hasRecipePdf = Boolean(recipe && recipe.pdfDataUrl);
  return `
    <article class="entity reveal meal-entity">
      <div class="entity-top">
        <div>
          <h4 class="entity-title">${escapeHtml(recipe ? recipe.name : meal.title)}</h4>
          <p class="entity-copy">${escapeHtml(recipe ? recipe.dishType : meal.mealType)} · ${formatShortDate(meal.scheduledDate)}${meal.prepared ? " · prepare" : ""}</p>
        </div>
        ${
          compact
            ? `<span class="tag">${pendingItems.length ? `Attention ${pendingItems.length}` : "Cuisine"}</span>`
            : `
              <div class="inline-stats">
                ${
                  hasRecipePdf
                    ? `<button class="icon-button" type="button" data-action="open-recipe-pdf" data-id="${meal.id}" title="Ouvrir le PDF de la recette" aria-label="Ouvrir le PDF de la recette">🍲</button>`
                    : ""
                }
                <button class="toggle-button ${meal.prepared ? "is-active" : ""}" type="button" data-action="toggle-meal-prepared" data-id="${meal.id}">
                  ${meal.prepared ? "Prepar&eacute;" : "Marquer pr&eacute;par&eacute;"}
                </button>
                <button class="ghost-button" type="button" data-action="delete-meal" data-id="${meal.id}">
                  Supprimer
                </button>
              </div>
            `
        }
      </div>
      <div class="inline-stats">
        <span class="source-pill">${ingredients.length} ingredient${ingredients.length > 1 ? "s" : ""}</span>
        <span class="source-pill">${pendingItems.length} a valider</span>
        ${pendingItems.length ? `<span class="warning-pill" title="Certains ingredients ne sont pas encore valides dans la liste de courses">!</span>` : ""}
      </div>
      <details class="ingredients-disclosure">
        <summary class="ingredients-summary">
          <span>Ingredients</span>
          ${pendingItems.length ? `<span class="warning-inline" aria-hidden="true">!</span>` : ""}
        </summary>
        <div class="tag-list ingredients-list">
          ${ingredients
            .map((ingredient) => {
              const validated = isIngredientValidated(meal.id, ingredient);
              const listed = hasShoppingItemForIngredient(meal.id, ingredient);
              return `
                <span class="tag ${validated ? "ingredient-validated" : "ingredient-pending"}">
                  ${escapeHtml(ingredient)}
                  ${
                    validated
                      ? ""
                      : listed
                        ? '<span class="ingredient-mark">!</span>'
                        : '<span class="ingredient-mark">+</span>'
                  }
                </span>
              `;
            })
            .join("")}
        </div>
      </details>
      ${
        !compact && unlistedItems.length
          ? `<p class="entity-copy">Des ingredients ne sont pas encore ajoutes aux courses : ${escapeHtml(unlistedItems.join(", "))}.</p>`
          : ""
      }
      ${
        !compact && meal.prepared
          ? `<p class="entity-copy">Le stock a deja ete deduit pour ce repas. Recliquez sur le bouton si vous voulez annuler cette preparation.</p>`
          : ""
      }
      <div class="entity-foot meal-entity-footer">
        <span class="source-pill">${escapeHtml(recipe ? recipe.dishType : meal.mealType)}</span>
        <span class="meal-slot-pill">${escapeHtml(formatMealSlot(meal.slot).toUpperCase())}</span>
      </div>
    </article>
  `;
}

function renderIngredientSummaryEntity(ingredient) {
  return `
    <article class="entity reveal">
      <div class="entity-top">
        <div>
          <h4 class="entity-title">${escapeHtml(ingredient.name)}</h4>
          <p class="entity-copy">${escapeHtml(formatIngredientStorage(ingredient.storage))} · ${escapeHtml(ingredient.foodType)} · ${escapeHtml(formatMeasurementUnit(ingredient.unit || "unites"))}</p>
        </div>
        <span class="tag">Stock ${escapeHtml(normalizeQuantityString(ingredient.stockQuantity || "0"))}</span>
      </div>
    </article>
  `;
}

function renderStockGroup(group) {
  return `
    <details class="shopping-group reveal">
      <summary class="shopping-group-summary">
        <span>${escapeHtml(group.foodType)}</span>
        <span class="tag">${group.ingredients.length}</span>
      </summary>
      <div class="entity-grid shopping-items-list">
        ${group.ingredients.map(renderStockRow).join("")}
      </div>
    </details>
  `;
}

function renderStockRow(ingredient) {
  return `
    <article class="entity reveal">
      <form id="stockUpdateForm-${ingredient.id}" data-form-type="stock-update" data-ingredient-id="${ingredient.id}">
        <div class="entity-top">
          <div>
            <h4 class="entity-title">${escapeHtml(ingredient.name)}</h4>
            <p class="entity-copy">${escapeHtml(formatIngredientStorage(ingredient.storage))} · ${escapeHtml(ingredient.foodType)} · ${escapeHtml(formatMeasurementUnit(ingredient.unit || "unites"))}</p>
          </div>
          <span class="tag">${escapeHtml(normalizeQuantityString(ingredient.stockQuantity || "0"))}</span>
        </div>
        <div class="form-grid" style="margin-top: 1rem;">
          <div class="field full">
            <label for="stock-input-${ingredient.id}">Stock actuel</label>
            <input id="stock-input-${ingredient.id}" name="stockQuantity" value="${escapeHtmlAttribute(normalizeQuantityString(ingredient.stockQuantity || "0"))}" placeholder="Ex. 3, 200 g, 1 botte" />
          </div>
        </div>
        <div class="form-actions">
          <button class="action-button" type="submit">Mettre a jour</button>
        </div>
      </form>
    </article>
  `;
}

function renderRecipeEntity(recipe) {
  const ingredients = getRecipeIngredientNames(recipe);
  return `
    <article class="entity reveal">
      <div class="entity-top">
        <div>
          <h4 class="entity-title">${escapeHtml(recipe.name)}</h4>
          <p class="entity-copy">${escapeHtml(recipe.dishType)} · ${ingredients.length} ingredient${ingredients.length > 1 ? "s" : ""}</p>
        </div>
        <span class="tag">Recette</span>
      </div>
      <details class="ingredients-disclosure">
        <summary class="ingredients-summary">
          <span>Ingredients</span>
        </summary>
        <div class="tag-list ingredients-list">
          ${ingredients.map((ingredient) => `<span class="tag">${escapeHtml(ingredient)}</span>`).join("")}
        </div>
      </details>
    </article>
  `;
}

function renderDraftIngredient(ingredientId) {
  const ingredient = state.ingredients.find((entry) => entry.id === ingredientId.ingredientId);
  if (!ingredient) {
    return "";
  }

  return `
    <article class="draft-item">
      <div>
        <strong>${escapeHtml(ingredient.name)}</strong>
        <span>${escapeHtml(ingredientId.quantity)} · ${escapeHtml(formatIngredientStorage(ingredient.storage))} · ${escapeHtml(ingredient.foodType)}</span>
      </div>
      <button
        class="ghost-button"
        type="button"
        data-action="remove-draft-ingredient"
        data-id="${ingredient.id}"
      >
        Retirer
      </button>
    </article>
  `;
}

function renderAdminIngredientRow(ingredient) {
  const usageCount = state.recipes.filter((recipe) =>
    (recipe.ingredientEntries || []).some((entry) => entry.ingredientId === ingredient.id)
  ).length;
  return `
    <article class="entity reveal">
      <div class="entity-top">
        <div>
          <h4 class="entity-title">${escapeHtml(ingredient.name)}</h4>
          <p class="entity-copy">${escapeHtml(formatIngredientStorage(ingredient.storage))} · ${escapeHtml(ingredient.foodType)} · ${escapeHtml(formatMeasurementUnit(ingredient.unit || "unites"))} · stock ${escapeHtml(normalizeQuantityString(ingredient.stockQuantity || "0"))} · utilise dans ${usageCount} recette${usageCount > 1 ? "s" : ""}</p>
        </div>
        <div class="inline-stats">
          <button class="ghost-button" type="button" data-action="edit-ingredient" data-id="${ingredient.id}">
            Modifier
          </button>
          <button class="ghost-button" type="button" data-action="delete-ingredient" data-id="${ingredient.id}">
            Supprimer
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderAdminIngredientGroup(group) {
  return `
    <details class="shopping-group reveal">
      <summary class="shopping-group-summary">
        <span>${escapeHtml(group.foodType)}</span>
        <span class="tag">${group.ingredients.length}</span>
      </summary>
      <div class="entity-grid shopping-items-list">
        ${group.ingredients.map(renderAdminIngredientRow).join("")}
      </div>
    </details>
  `;
}

function renderAdminRecipeRow(recipe) {
  const plannedMeals = state.meals.filter((meal) => meal.recipeId === recipe.id).length;
  return `
    <article class="entity reveal">
      <div class="entity-top">
        <div>
          <h4 class="entity-title">${escapeHtml(recipe.name)}</h4>
          <p class="entity-copy">${escapeHtml(recipe.dishType)} · ${(recipe.ingredientEntries || []).length} ingredient${(recipe.ingredientEntries || []).length > 1 ? "s" : ""} · ${plannedMeals} repas planifie${plannedMeals > 1 ? "s" : ""}${recipe.pdfDataUrl ? " · PDF joint" : ""}</p>
        </div>
        <div class="inline-stats">
          <button class="ghost-button" type="button" data-action="edit-recipe" data-id="${recipe.id}">
            Modifier
          </button>
          <button class="ghost-button" type="button" data-action="delete-recipe" data-id="${recipe.id}">
            Supprimer
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderProjectEntity(project) {
  const projectTasks = state.tasks.filter((task) => task.sourceType === "project" && task.sourceId === project.id);
  const doneTasks = projectTasks.filter((task) => task.status === "done").length;
  const linkedShopping = state.shopping.filter(
    (item) => item.sourceType === "project" && item.sourceId === project.id
  ).length;
  const progress = projectTasks.length ? Math.round((doneTasks / projectTasks.length) * 100) : 12;
  const linkedVacation =
    project.linkedVacationId &&
    state.vacations.find((vacation) => vacation.id === project.linkedVacationId);

  return `
    <article class="entity reveal">
      <div class="entity-top">
        <div>
          <h4 class="entity-title">${escapeHtml(project.title)}</h4>
          <p class="entity-copy">${escapeHtml(project.status)} · echeance ${formatShortDate(project.deadline)} · pilote ${escapeHtml(getLeadLabel(project.lead))}</p>
        </div>
        <div class="inline-stats">
          <span class="status-pill ${project.status === "Termine" ? "status-done" : "status-open"}">${escapeHtml(project.status)}</span>
          ${renderCompactActionButtons("project", project.id)}
        </div>
      </div>
      <p class="entity-copy">${escapeHtml(project.note || "Pas de note pour l'instant.")}</p>
      <div class="progress-line" aria-hidden="true">
        <span class="progress-fill" style="width: ${progress}%"></span>
      </div>
      <div class="entity-foot">
        ${renderProfilePills(project.profiles)}
        <span class="source-pill">${projectTasks.length} taches reliees</span>
        <span class="source-pill">${linkedShopping} achats relies</span>
        ${linkedVacation ? `<span class="source-pill">Vacances - ${escapeHtml(linkedVacation.destination)}</span>` : ""}
      </div>
    </article>
  `;
}

function renderVacationEntity(vacation) {
  const linkedProject =
    vacation.linkedProjectId &&
    state.projects.find((project) => project.id === vacation.linkedProjectId);
  const relatedTasks = state.tasks.filter(
    (task) => task.sourceType === "vacation" && task.sourceId === vacation.id
  ).length;

  return `
    <article class="entity reveal">
      <div class="entity-top">
        <div>
          <h4 class="entity-title">${escapeHtml(vacation.destination)}</h4>
          <p class="entity-copy">Du ${formatShortDate(vacation.startDate)} au ${formatShortDate(vacation.endDate)} · depart dans ${daysUntil(vacation.startDate)} jours</p>
        </div>
        <div class="inline-stats">
          <span class="tag">${formatCurrency(vacation.budget)}</span>
          ${renderCompactActionButtons("vacation", vacation.id)}
        </div>
      </div>
      <div class="entity-foot">
        ${renderProfilePills(vacation.profiles)}
        <span class="source-pill">${relatedTasks} taches de preparation</span>
        ${linkedProject ? `<span class="source-pill">Projet - ${escapeHtml(linkedProject.title)}</span>` : '<span class="source-pill">Pas encore de projet lie</span>'}
      </div>
    </article>
  `;
}

function renderTimelineRow(item) {
  return `
    <article class="list-row reveal">
      <div class="row-top">
        <div>
          <h4 class="row-title">${escapeHtml(item.title)}</h4>
          <p class="row-copy">${escapeHtml(item.label)} · ${formatShortDate(item.date)}</p>
        </div>
        <div class="inline-stats">
          <span class="tag">${escapeHtml(item.bucket)}</span>
          ${renderEventJumpButton(item)}
        </div>
      </div>
      <div class="row-bottom">
        ${renderProfilePills(item.profiles)}
        ${item.meta ? `<span class="source-pill">${escapeHtml(item.meta)}</span>` : ""}
      </div>
    </article>
  `;
}

function renderCalendarEventRow(eventItem) {
  const timelineItem = {
    title: eventItem.title,
    date: eventItem.date,
    label: eventItem.type,
    bucket: "Agenda",
    profiles: eventItem.profiles,
    meta: getSourceLabel(eventItem.sourceType, eventItem.sourceId),
    targetView: resolveTargetView(eventItem.sourceType, "calendar-page"),
  };

  return `
    <article class="list-row reveal">
      <div class="row-top">
        <div>
          <h4 class="row-title">${escapeHtml(eventItem.title)}</h4>
          <p class="row-copy">${escapeHtml(eventItem.type)} · ${formatShortDate(eventItem.date)}</p>
        </div>
        <div class="inline-stats">
          <span class="tag">Agenda</span>
          ${renderEventJumpButton(timelineItem)}
          <button class="ghost-button" type="button" data-action="delete-calendar-event" data-id="${eventItem.id}">
            Supprimer
          </button>
        </div>
      </div>
      <div class="row-bottom">
        ${renderProfilePills(eventItem.profiles)}
        <span class="source-pill">${escapeHtml(getSourceLabel(eventItem.sourceType, eventItem.sourceId))}</span>
      </div>
    </article>
  `;
}

function renderProfilePills(profiles) {
  return profiles
    .map(
      (profileId) =>
        `<span class="profile-pill">${escapeHtml(PROFILE_MAP[profileId].name)}</span>`
    )
    .join("");
}

function renderRelationOptions(types) {
  const options = [{ value: "none", label: "Sans lien" }];

  if (types.includes("project")) {
    state.projects.forEach((project) => {
      options.push({
        value: `project:${project.id}`,
        label: `Projet - ${project.title}`,
      });
    });
  }

  if (types.includes("vacation")) {
    state.vacations.forEach((vacation) => {
      options.push({
        value: `vacation:${vacation.id}`,
        label: `Vacances - ${vacation.destination}`,
      });
    });
  }

  if (types.includes("meal")) {
    state.meals.forEach((meal) => {
      options.push({
        value: `meal:${meal.id}`,
        label: `Cuisine - ${meal.title}`,
      });
    });
  }

  if (types.includes("shopping")) {
    state.shopping.forEach((item) => {
      options.push({
        value: `shopping:${item.id}`,
        label: `Courses - ${item.title}`,
      });
    });
  }

  if (types.includes("task")) {
    state.tasks.forEach((task) => {
      options.push({
        value: `task:${task.id}`,
        label: `Tache - ${task.title}`,
      });
    });
  }

  return options
    .map(
      (option) => `
        <option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>
      `
    )
    .join("");
}

function renderIngredientChoiceOptions(selectedId) {
  return state.ingredients
    .slice()
    .sort((left, right) => left.name.localeCompare(right.name, "fr"))
    .map(
      (ingredient) => `
        <option value="${ingredient.id}" ${ingredient.id === selectedId ? "selected" : ""}>
          ${escapeHtml(ingredient.name)} · ${escapeHtml(ingredient.foodType)}
        </option>
      `
    )
    .join("");
}

function renderProfileOptions() {
  return `
    <option value="both">Thomas & Christelle</option>
    <option value="thomas">Thomas</option>
    <option value="christelle">Christelle</option>
  `;
}

function renderEmpty(message) {
  return `<div class="empty-state">${escapeHtml(message)}</div>`;
}

function renderCalendarPlanner(timeline) {
  return `
    <div class="calendar-shell">
      <div class="calendar-toolbar">
        <div class="inline-stats">
          <button class="ghost-button" type="button" data-action="calendar-year" data-offset="-1">
            Annee precedente
          </button>
          <span class="calendar-period">${state.calendarYear}</span>
          <button class="ghost-button" type="button" data-action="calendar-year" data-offset="1">
            Annee suivante
          </button>
        </div>
        ${
          state.calendarMode === "month"
            ? `
              <div class="inline-stats">
                <button class="ghost-button" type="button" data-action="calendar-month" data-offset="-1">
                  Mois precedent
                </button>
                <button class="calendar-accent-button" type="button" data-action="back-to-year">
                  Retour
                </button>
                <button class="ghost-button" type="button" data-action="calendar-month" data-offset="1">
                  Mois suivant
                </button>
              </div>
            `
            : `
              <div class="inline-stats">
                <span class="source-pill">Cliquez sur un mois pour zoomer</span>
              </div>
            `
        }
      </div>
      ${
        state.calendarMode === "month"
          ? renderMonthCalendar(timeline, state.calendarYear, state.calendarMonth)
          : renderYearCalendar(timeline, state.calendarYear)
      }
    </div>
  `;
}

function renderCalendarDedicatedPage() {
  const timeline = buildUnifiedTimeline();
  const relevantEvents = getRelevant(state.calendar)
    .filter((eventItem) => eventItem.sourceType !== "meal")
    .slice()
    .sort(sortByDate("date"));

  return `
    ${renderCalendarComposerSection(Boolean(ui.calendarComposerOpen))}
    <section class="panel reveal">
      ${renderCalendarPlanner(timeline)}
    </section>
    <section class="panel reveal">
      <div class="section-head">
        <div>
          <h3 class="section-title">Prochains evenements</h3>
          <p class="section-copy">Une liste rapide des prochains rendez-vous et echeances lies a la maison.</p>
        </div>
      </div>
      <div class="list">
        ${timeline.slice(0, 10).length ? timeline.slice(0, 10).map(renderTimelineRow).join("") : renderEmpty("Le calendrier est encore vide.")}
      </div>
      <div class="section-head" style="margin-top: 1rem;">
        <div>
          <h3 class="section-title">Evenements saisis</h3>
          <p class="section-copy">${relevantEvents.length} entree${relevantEvents.length > 1 ? "s" : ""} enregistree${relevantEvents.length > 1 ? "s" : ""} manuellement.</p>
        </div>
      </div>
      <div class="list">
        ${relevantEvents.length ? relevantEvents.map(renderCalendarEventRow).join("") : renderEmpty("Aucun evenement saisi manuellement.")}
      </div>
    </section>
    <button class="calendar-plus-button" type="button" data-action="open-calendar-composer" aria-label="Ajouter un evenement">+</button>
  `;
}

function renderCalendarListView(timeline, relevantEvents) {
  return `
    <div class="list">
      ${timeline.length ? timeline.map(renderTimelineRow).join("") : renderEmpty("Le calendrier est encore vide.")}
    </div>
    <div class="section-head" style="margin-top: 1rem;">
      <div>
        <h3 class="section-title">Evenements saisis</h3>
        <p class="section-copy">${relevantEvents.length} entree${relevantEvents.length > 1 ? "s" : ""} enregistree${relevantEvents.length > 1 ? "s" : ""} manuellement.</p>
      </div>
    </div>
    <div class="list">
      ${relevantEvents.length ? relevantEvents.map(renderCalendarEventRow).join("") : renderEmpty("Aucun evenement saisi manuellement.")}
    </div>
  `;
}

function renderYearCalendar(timeline, year) {
  const months = Array.from({ length: 12 }, (_, monthIndex) => {
    const events = getEventsForMonth(timeline, year, monthIndex);
    return { monthIndex, events };
  });

  return `
    <div class="month-overview-grid">
      ${months
        .map(
          ({ monthIndex, events }) => `
            <button
              class="month-card reveal"
              type="button"
              data-action="open-month"
              data-year="${year}"
              data-month="${monthIndex}"
            >
              <div class="month-card-top">
                <div>
                  <p class="eyebrow">${getMonthName(monthIndex, "short")}</p>
                  <h4 class="entity-title">${getMonthName(monthIndex, "long")}</h4>
                </div>
                <span class="tag">${events.length} evt</span>
              </div>
              <div class="month-card-preview">
                ${
                  events.length
                    ? events
                        .slice(0, 3)
                        .map(
                          (item) => `
                            <span class="month-preview-line">
                              <strong>${formatDayNumber(item.date)}</strong>
                              ${escapeHtml(item.title)}
                            </span>
                          `
                        )
                        .join("")
                    : '<span class="muted">Aucun evenement pour ce mois.</span>'
                }
              </div>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderMonthCalendar(timeline, year, month) {
  const days = buildMonthGrid(year, month);
  const monthEvents = getEventsForMonth(timeline, year, month);

  return `
    <div class="month-zoom">
      <div class="section-head">
        <div>
          <p class="eyebrow">Vue simple</p>
          <h3 class="section-title">${getMonthName(month, "long")} ${year}</h3>
          <p class="section-copy">${monthEvents.length} evenement${monthEvents.length > 1 ? "s" : ""} sur ce mois. Cliquez sur un evenement pour ouvrir sa page.</p>
        </div>
      </div>
      <div class="month-grid-header">
        ${["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
          .map((dayLabel) => `<span>${dayLabel}</span>`)
          .join("")}
      </div>
      <div class="month-grid">
        ${days
          .map((day) => {
            if (!day.inMonth) {
              return `<div class="day-cell is-muted"></div>`;
            }

            const dayEvents = getEventsForDay(timeline, day.dateKey);
            return `
              <article class="day-cell ${dayEvents.length ? "has-events" : ""}">
                <div class="day-head">
                  <span class="day-number">${day.dayNumber}</span>
                  ${dayEvents.length ? `<span class="day-count">${dayEvents.length}</span>` : ""}
                </div>
                <div class="day-events">
                  ${
                    dayEvents.length
                      ? dayEvents
                          .slice(0, 3)
                          .map(
                            (item) => `
                              <button
                                class="calendar-event-chip"
                                type="button"
                                data-action="open-linked-view"
                                data-view="${item.targetView}"
                              >
                                <span>${escapeHtml(item.title)}</span>
                                <small>${escapeHtml(item.bucket)}</small>
                              </button>
                            `
                          )
                          .join("")
                      : '<span class="muted">Libre</span>'
                  }
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
      <div class="month-event-list">
        ${
          monthEvents.length
            ? monthEvents
                .map(
                  (item) => `
                    <button
                      class="month-event-row"
                      type="button"
                      data-action="open-linked-view"
                      data-view="${item.targetView}"
                    >
                      <div>
                        <strong>${formatFullDate(item.date)}</strong>
                        <span>${escapeHtml(item.title)}</span>
                      </div>
                      <span class="tag">${escapeHtml(item.bucket)}</span>
                    </button>
                  `
                )
                .join("")
            : renderEmpty("Aucun evenement sur ce mois.")
        }
      </div>
    </div>
  `;
}

function renderEventJumpButton(item) {
  return `
    <button
      class="ghost-button"
      type="button"
      data-action="open-linked-view"
      data-view="${item.targetView || "calendar-page"}"
    >
      Ouvrir
    </button>
  `;
}

function buildUnifiedTimeline() {
  const timeline = [];

  state.calendar.forEach((eventItem) => {
    timeline.push({
      id: eventItem.id,
      title: eventItem.title,
      date: eventItem.date,
      label: eventItem.type,
      profiles: eventItem.profiles,
      bucket: "Agenda",
      meta: getSourceLabel(eventItem.sourceType, eventItem.sourceId),
      targetView: resolveTargetView(eventItem.sourceType, "calendar-page"),
    });
  });

  state.tasks
    .filter((task) => task.status === "open")
    .forEach((task) => {
      timeline.push({
        id: `timeline-${task.id}`,
        title: task.title,
        date: task.dueDate,
        label: "Echeance tache",
        profiles: task.profiles,
        bucket: "Tache",
        meta: getSourceLabel(task.sourceType, task.sourceId),
        targetView: "tasks",
      });
    });

  state.projects.forEach((project) => {
    timeline.push({
      id: `timeline-${project.id}`,
      title: project.title,
      date: project.deadline,
      label: "Echeance projet",
      profiles: project.profiles,
      bucket: "Projet",
      meta: `${project.status}`,
      targetView: "projects",
    });
  });

  state.vacations.forEach((vacation) => {
    timeline.push({
      id: `timeline-${vacation.id}`,
      title: `Depart ${vacation.destination}`,
      date: vacation.startDate,
      label: "Vacances",
      profiles: vacation.profiles,
      bucket: "Voyage",
      meta: formatCurrency(vacation.budget),
      targetView: "vacations",
    });
  });

  return timeline
    .filter((item) => item.profiles.includes(state.activeProfile))
    .sort(sortByDate("date"));
}

function getEventsForMonth(timeline, year, month) {
  return timeline.filter((item) => {
    const date = new Date(`${item.date}T12:00:00`);
    return date.getFullYear() === year && date.getMonth() === month;
  });
}

function getEventsForDay(timeline, dateKey) {
  return timeline.filter((item) => item.date === dateKey);
}

function getRecipeByMeal(meal) {
  return state.recipes.find((recipe) => recipe.id === meal.recipeId) || null;
}

function getRecipeIngredientEntries(recipe) {
  if (Array.isArray(recipe.ingredientEntries)) {
    return recipe.ingredientEntries;
  }

  return (recipe.ingredientIds || []).map((ingredientId) => ({
    ingredientId,
    quantity: "1",
  }));
}

function getRecipeIngredientNames(recipe) {
  return getRecipeIngredientEntries(recipe)
    .map((entry) => state.ingredients.find((ingredient) => ingredient.id === entry.ingredientId))
    .filter(Boolean)
    .map((ingredient) => ingredient.name);
}

function getFilteredIngredients(searchTerm = "") {
  const query = clean(searchTerm).toLowerCase();
  return state.ingredients
    .slice()
    .sort((left, right) => left.name.localeCompare(right.name, "fr"))
    .filter((ingredient) => {
      if (!query) {
        return true;
      }

      return [
        ingredient.name,
        ingredient.foodType,
        formatIngredientStorage(ingredient.storage),
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
}

function getMealIngredients(meal) {
  const recipe = getRecipeByMeal(meal);
  if (recipe) {
    return getRecipeIngredientNames(recipe);
  }

  return Array.isArray(meal.ingredients) ? meal.ingredients : [];
}

function findIngredientByName(name) {
  return state.ingredients.find(
    (ingredient) => ingredient.name.toLowerCase() === clean(name).toLowerCase()
  );
}

function findRecipeByQuery(query) {
  const cleanQuery = clean(query).toLowerCase();
  if (!cleanQuery) {
    return null;
  }

  const exactMatch = state.recipes.find((recipe) => recipe.name.toLowerCase() === cleanQuery);
  if (exactMatch) {
    return exactMatch;
  }

  const partialMatches = state.recipes.filter((recipe) => recipe.name.toLowerCase().includes(cleanQuery));
  if (partialMatches.length === 1) {
    return partialMatches[0];
  }

  return null;
}

function findIngredientById(ingredientId) {
  return state.ingredients.find((ingredient) => ingredient.id === ingredientId) || null;
}

function formatMealSlot(slot) {
  const labels = {
    matin: "Matin",
    midi: "Midi",
    soir: "Soir",
  };

  return labels[slot] || "Soir";
}

function formatIngredientStorage(storage) {
  return storage === "frais" ? "Produit frais" : "Produit de placard";
}

function formatMeasurementUnit(unit) {
  const labels = {
    grammes: "grammes",
    litres: "litres",
    unites: "unites",
  };

  return labels[unit] || "unites";
}

function itemUnitLabel(item) {
  if (!item.ingredientId) {
    return "unites";
  }

  const ingredient = findIngredientById(item.ingredientId);
  return ingredient ? ingredient.unit || "unites" : "unites";
}

function normalizeQuantityString(quantity) {
  const value = clean(quantity);
  if (!value) {
    return "0";
  }

  const parsed = parseQuantityParts(value);
  if (!parsed) {
    return value;
  }

  return formatQuantityParts(parsed.amount, parsed.unit);
}

function parseQuantityParts(quantity) {
  const value = clean(quantity);
  const match = value.match(/^(\d+(?:[.,]\d+)?)(?:\s*(.*))?$/);
  if (!match) {
    return null;
  }

  return {
    amount: Number(match[1].replace(",", ".")),
    unit: clean(match[2] || ""),
  };
}

function formatQuantityParts(amount, unit = "") {
  const numeric = Number.isInteger(amount) ? String(amount) : String(Number(amount.toFixed(2)));
  return unit ? `${numeric} ${unit}` : numeric;
}

function formatFoodType(foodType) {
  return foodType || "Autres";
}

function getLeadLabel(lead) {
  if (lead === "both") {
    return "Thomas et Christelle";
  }

  return PROFILE_MAP[lead] ? PROFILE_MAP[lead].name : "Thomas et Christelle";
}

function renderFoodTypeOptions(selectedValue = "Legumes") {
  const options = [
    "Legumes",
    "Fruits",
    "Herbes",
    "Produits laitiers",
    "Viandes",
    "Poissons",
    "Epicerie",
    "Legumineuses",
    "Boissons",
    "Boulangerie",
    "Maison",
    "Autres",
  ];

  return options
    .map(
      (option) => `<option value="${option}" ${option === selectedValue ? "selected" : ""}>${escapeHtml(option)}</option>`
    )
    .join("");
}

function renderMeasurementUnitOptions(selectedValue = "unites") {
  const options = [
    { value: "grammes", label: "Grammes" },
    { value: "litres", label: "Litres" },
    { value: "unites", label: "Unites" },
  ];

  return options
    .map(
      (option) =>
        `<option value="${option.value}" ${option.value === selectedValue ? "selected" : ""}>${escapeHtml(option.label)}</option>`
    )
    .join("");
}

function todayDateKey() {
  const today = new Date();
  return formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());
}

function reconcileTaskCollection(tasks) {
  const today = todayDateKey();
  let changed = false;
  const nextTasks = [];

  (tasks || []).forEach((task) => {
    const nextTask = {
      ...task,
      status: task.status === "done" ? "done" : "open",
      dueDate: clean(task.dueDate) || today,
      isLate: Boolean(task.isLate),
      lateOriginDate: clean(task.lateOriginDate) || null,
    };

    if (nextTask.status === "done") {
      if (nextTask.dueDate < today) {
        changed = true;
        return;
      }

      if (nextTask.isLate || nextTask.lateOriginDate) {
        nextTask.isLate = false;
        nextTask.lateOriginDate = null;
        changed = true;
      }

      nextTasks.push(nextTask);
      return;
    }

    if (nextTask.dueDate < today) {
      if (nextTask.dueDate !== today || !nextTask.isLate || !nextTask.lateOriginDate) {
        changed = true;
      }

      nextTask.lateOriginDate = nextTask.lateOriginDate || nextTask.dueDate;
      nextTask.dueDate = today;
      nextTask.isLate = true;
    }

    nextTasks.push(nextTask);
  });

  return {
    tasks: nextTasks,
    changed,
  };
}

function reconcileTasksForToday() {
  const result = reconcileTaskCollection(state.tasks);
  if (result.changed) {
    state.tasks = result.tasks;
  }

  return result.changed;
}

function getWeekInfo(dateString) {
  const baseDate = new Date(`${dateString}T12:00:00`);
  const dayIndex = (baseDate.getDay() + 6) % 7;
  const start = new Date(baseDate);
  start.setDate(baseDate.getDate() - dayIndex);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return {
    key: `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}-${String(start.getDate()).padStart(2, "0")}`,
    startLabel: formatShortDate(start.toISOString().slice(0, 10)),
    endLabel: formatShortDate(end.toISOString().slice(0, 10)),
  };
}

function getShoppingWeekInfo(item) {
  if (item.weekKey) {
    const baseDate = item.weekKey;
    return {
      ...getWeekInfo(baseDate),
      key: item.weekKey,
    };
  }

  if (item.sourceType === "meal") {
    const meal = state.meals.find((entry) => entry.id === item.sourceId);
    if (meal) {
      return getWeekInfo(meal.scheduledDate);
    }
  }

  return getWeekInfo(todayDateKey());
}

function buildShoppingGroups(items) {
  const weekMap = new Map();

  items.forEach((item) => {
    const weekInfo = getShoppingWeekInfo(item);
    const foodType = item.foodType || getIngredientFoodType(item.ingredientId) || "Autres";
    const normalizedItem = {
      ...item,
      foodType,
    };

    if (!weekMap.has(weekInfo.key)) {
      weekMap.set(weekInfo.key, {
        key: weekInfo.key,
        startLabel: weekInfo.startLabel,
        endLabel: weekInfo.endLabel,
        totalCount: 0,
        categoriesMap: new Map(),
      });
    }

    const weekGroup = weekMap.get(weekInfo.key);
    weekGroup.totalCount += 1;

    if (!weekGroup.categoriesMap.has(foodType)) {
      weekGroup.categoriesMap.set(foodType, []);
    }

    weekGroup.categoriesMap.get(foodType).push(normalizedItem);
  });

  return Array.from(weekMap.values())
    .sort((left, right) => left.key.localeCompare(right.key))
    .map((weekGroup) => ({
      key: weekGroup.key,
      startLabel: weekGroup.startLabel,
      endLabel: weekGroup.endLabel,
      totalCount: weekGroup.totalCount,
      categories: Array.from(weekGroup.categoriesMap.entries())
        .map(([foodType, groupedItems]) => ({
          foodType,
          items: groupedItems.sort((left, right) => left.title.localeCompare(right.title, "fr")),
        }))
        .sort((left, right) => left.foodType.localeCompare(right.foodType, "fr")),
    }));
}

function getExportableShoppingGroups() {
  const relevantItems = getRelevant(state.shopping).filter((item) => item.ingredientId);
  return buildShoppingGroups(relevantItems);
}

function downloadShoppingWeekPdf(weekKey) {
  const targetWeek = clean(weekKey);
  if (!targetWeek) {
    window.alert("Choisissez une semaine a exporter.");
    return;
  }

  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) {
    window.alert("Le module PDF n'est pas encore disponible. Rechargez la page puis reessayez.");
    return;
  }

  const group = getExportableShoppingGroups().find((entry) => entry.key === targetWeek);
  if (!group) {
    window.alert("Impossible de trouver cette semaine dans la liste de courses.");
    return;
  }

  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const marginX = 44;
  let cursorY = 54;
  const pageHeight = doc.internal.pageSize.getHeight();
  const lineHeight = 18;
  const contentWidth = doc.internal.pageSize.getWidth() - marginX * 2;

  const ensureSpace = (neededHeight = lineHeight) => {
    if (cursorY + neededHeight <= pageHeight - 44) {
      return;
    }

    doc.addPage();
    cursorY = 54;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(`Liste de courses`, marginX, cursorY);
  cursorY += 24;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Semaine du ${group.startLabel} au ${group.endLabel}`, marginX, cursorY);
  cursorY += 24;

  group.categories.forEach((category) => {
    ensureSpace(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(category.foodType, marginX, cursorY);
    cursorY += 18;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    category.items.forEach((item) => {
      const lines = doc.splitTextToSize(`• ${item.title} — ${item.quantity}`, contentWidth);
      ensureSpace(lines.length * lineHeight);
      doc.text(lines, marginX, cursorY);
      cursorY += lines.length * lineHeight;
    });

    cursorY += 10;
  });

  const filename = `liste-courses-${group.key}.pdf`;
  doc.save(filename);
}

function buildIngredientTypeGroups(searchTerm = "") {
  const groups = new Map();

  getFilteredIngredients(searchTerm).forEach((ingredient) => {
    const foodType = formatFoodType(ingredient.foodType);
    if (!groups.has(foodType)) {
      groups.set(foodType, []);
    }

    groups.get(foodType).push(ingredient);
  });

  return Array.from(groups.entries())
    .map(([foodType, ingredients]) => ({
      foodType,
      ingredients: ingredients.sort((left, right) => left.name.localeCompare(right.name, "fr")),
    }))
    .sort((left, right) => left.foodType.localeCompare(right.foodType, "fr"));
}

function getIngredientFoodType(ingredientId) {
  const ingredient = state.ingredients.find((entry) => entry.id === ingredientId);
  return ingredient ? ingredient.foodType : null;
}

function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const grid = [];

  for (let cellIndex = 0; cellIndex < totalCells; cellIndex += 1) {
    const dayNumber = cellIndex - firstWeekday + 1;
    if (dayNumber < 1 || dayNumber > daysInMonth) {
      grid.push({ inMonth: false });
      continue;
    }

    grid.push({
      inMonth: true,
      dayNumber,
      dateKey: formatDateKey(year, month, dayNumber),
    });
  }

  return grid;
}

function formatDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getMonthName(monthIndex, format) {
  return new Intl.DateTimeFormat("fr-FR", {
    month: format,
  }).format(new Date(2026, monthIndex, 1));
}

function formatDayNumber(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
  }).format(date);
}

function formatFullDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "Date a definir";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(date);
}

function addMealIngredientsToShopping(mealId) {
  const meal = state.meals.find((entry) => entry.id === mealId);
  if (!meal) {
    return;
  }

  const recipe = getRecipeByMeal(meal);
  if (!recipe) {
    return;
  }

  const weekInfo = getWeekInfo(meal.scheduledDate);

  getRecipeIngredientEntries(recipe).forEach((entry) => {
    const ingredient = state.ingredients.find((item) => item.id === entry.ingredientId);
    if (!ingredient) {
      return;
    }

    const existingItem = state.shopping.find(
      (item) =>
        item.sourceType === "meal" &&
        item.ingredientId === ingredient.id &&
        item.weekKey === weekInfo.key
    );

    if (existingItem) {
      existingItem.quantity = addQuantities(existingItem.quantity, entry.quantity);
      if (!existingItem.linkedMealIds) {
        existingItem.linkedMealIds = [];
      }
      if (!existingItem.linkedMealIds.includes(meal.id)) {
        existingItem.linkedMealIds.push(meal.id);
      }
      return;
    }

    state.shopping.unshift({
      id: uid("shop"),
      title: ingredient.name,
      quantity: entry.quantity,
      purchased: false,
      owner: state.activeProfile,
      profiles: meal.profiles,
      sourceType: "meal",
      sourceId: meal.id,
      ingredientId: ingredient.id,
      foodType: ingredient.foodType,
      weekKey: weekInfo.key,
      linkedMealIds: [meal.id],
    });
  });
}

function hasShoppingItemForIngredient(mealId, ingredient) {
  const meal = state.meals.find((entry) => entry.id === mealId);
  const ingredientItem = findIngredientByName(ingredient);
  const weekKey = meal ? getWeekInfo(meal.scheduledDate).key : null;
  return state.shopping.some(
    (item) =>
      item.sourceType === "meal" &&
      (item.sourceId === mealId || (item.linkedMealIds || []).includes(mealId)) &&
      (ingredientItem ? item.ingredientId === ingredientItem.id : item.title.toLowerCase() === ingredient.toLowerCase()) &&
      (!weekKey || item.weekKey === weekKey)
  );
}

function isIngredientValidated(mealId, ingredient) {
  const meal = state.meals.find((entry) => entry.id === mealId);
  const ingredientItem = findIngredientByName(ingredient);
  const weekKey = meal ? getWeekInfo(meal.scheduledDate).key : null;
  return state.shopping.some(
    (item) =>
      item.sourceType === "meal" &&
      (item.sourceId === mealId || (item.linkedMealIds || []).includes(mealId)) &&
      (ingredientItem ? item.ingredientId === ingredientItem.id : item.title.toLowerCase() === ingredient.toLowerCase()) &&
      (!weekKey || item.weekKey === weekKey) &&
      item.purchased
  );
}

function getRelevant(items) {
  return items.filter((item) => item.profiles.includes(state.activeProfile));
}

function getSourceLabel(sourceType, sourceId) {
  if (!sourceType || sourceType === "none") {
    return "Lien libre";
  }

  if (sourceType === "project") {
    const project = state.projects.find((entry) => entry.id === sourceId);
    return project ? `Projet - ${project.title}` : "Projet";
  }

  if (sourceType === "vacation") {
    const vacation = state.vacations.find((entry) => entry.id === sourceId);
    return vacation ? `Vacances - ${vacation.destination}` : "Vacances";
  }

  if (sourceType === "meal") {
    const meal = state.meals.find((entry) => entry.id === sourceId);
    return meal ? `Cuisine - ${meal.title}` : "Cuisine";
  }

  if (sourceType === "shopping") {
    const item = state.shopping.find((entry) => entry.id === sourceId);
    return item ? `Courses - ${item.title}` : "Courses";
  }

  if (sourceType === "task") {
    const task = state.tasks.find((entry) => entry.id === sourceId);
    return task ? `Tache - ${task.title}` : "Tache";
  }

  if (sourceType === "house") {
    return "Maison";
  }

  return "Lien";
}

function resolveTargetView(sourceType, fallbackView) {
  if (sourceType === "project") {
    return "projects";
  }

  if (sourceType === "vacation") {
    return "vacations";
  }

  if (sourceType === "meal") {
    return "cuisine";
  }

  if (sourceType === "shopping") {
    return "shopping";
  }

  if (sourceType === "task") {
    return "tasks";
  }

  return fallbackView || "calendar";
}

function requestAdminAccess(targetView) {
  if (state.activeProfile !== "thomas") {
    return;
  }

  ui.modal = {
    kind: "admin-password-auth",
    targetView,
  };
  render();
}

function navigateToAdminTarget(targetView) {
  const mapping = {
    "admin-page": "./admin.html",
    "admin-ingredients-page": "./admin-ingredients.html",
    "admin-recipes-page": "./admin-recipes.html",
  };

  window.location.href = mapping[targetView] || "./admin.html";
}

function getAdminPassword() {
  return window.localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
}

function ensureDefaultAdminPassword() {
  if (!window.localStorage.getItem(ADMIN_PASSWORD_KEY)) {
    window.localStorage.setItem(ADMIN_PASSWORD_KEY, DEFAULT_ADMIN_PASSWORD);
  }
}

function grantAdminAccess() {
  window.sessionStorage.setItem(ADMIN_ACCESS_KEY, "granted");
}

function hasAdminAccess() {
  return window.sessionStorage.getItem(ADMIN_ACCESS_KEY) === "granted";
}

function clearAdminAccess() {
  window.sessionStorage.removeItem(ADMIN_ACCESS_KEY);
}

function openIngredientEditModal(ingredientId) {
  ui.modal = {
    kind: "edit-ingredient",
    id: ingredientId,
  };
}

function openRecipeEditModal(recipeId) {
  const recipe = state.recipes.find((entry) => entry.id === recipeId);
  if (!recipe) {
    return;
  }

  ui.modal = {
    kind: "edit-recipe",
    id: recipeId,
    name: recipe.name,
    dishType: recipe.dishType,
    entries: clone(getRecipeIngredientEntries(recipe)),
    pdfDataUrl: recipe.pdfDataUrl || null,
    pdfName: recipe.pdfName || null,
  };
}

function openVacationEditModal(vacationId) {
  const vacation = state.vacations.find((entry) => entry.id === vacationId);
  if (!vacation) {
    return;
  }

  ui.modal = {
    kind: "edit-vacation",
    id: vacationId,
  };
}

function openProjectEditModal(projectId) {
  const project = state.projects.find((entry) => entry.id === projectId);
  if (!project) {
    return;
  }

  ui.modal = {
    kind: "edit-project",
    id: projectId,
  };
}

function openDeleteModal(entityType, id) {
  const sources = {
    ingredient: state.ingredients.find((entry) => entry.id === id)?.name,
    recipe: state.recipes.find((entry) => entry.id === id)?.name,
    meal: state.meals.find((entry) => entry.id === id)?.title,
    vacation: state.vacations.find((entry) => entry.id === id)?.destination,
    project: state.projects.find((entry) => entry.id === id)?.title,
  };
  const label = sources[entityType];
  const messages = {
    ingredient: `Supprimer ${label} ? Il sera retire des recettes et des courses liees.`,
    recipe: `Supprimer ${label} ? Les repas planifies relies seront aussi supprimes.`,
    meal: `Supprimer ${label} ? Les elements de courses lies a ce repas seront nettoyes.`,
    vacation: `Supprimer ${label} ? Les evenements calendrier et les taches relies seront aussi retires.`,
    project: `Supprimer ${label} ? Les taches, achats et liens vacances relies seront nettoyes.`,
  };

  ui.modal = {
    kind: "confirm-delete",
    entityType,
    id,
    message: messages[entityType] || `Supprimer ${label} ?`,
  };
}

function openRecipePdf(mealId) {
  const meal = state.meals.find((entry) => entry.id === mealId);
  const recipe = meal ? getRecipeByMeal(meal) : null;
  if (!recipe || !recipe.pdfDataUrl) {
    window.alert("Aucun PDF n'est associe a cette recette.");
    return;
  }

  window.open(recipe.pdfDataUrl, "_blank", "noopener,noreferrer");
}

function syncRecipeModalDraft() {
  if (ui.modal?.kind !== "edit-recipe") {
    return;
  }

  const form = document.querySelector("#editRecipeForm");
  if (!form) {
    return;
  }

  const nameField = form.querySelector("[name='name']");
  const dishTypeField = form.querySelector("[name='dishType']");
  ui.modal.name = clean(nameField?.value) || ui.modal.name;
  ui.modal.dishType = clean(dishTypeField?.value) || ui.modal.dishType;

  const ingredientFields = Array.from(form.querySelectorAll("[data-role='recipe-ingredient']"));
  const quantityFields = Array.from(form.querySelectorAll("[data-role='recipe-quantity']"));
  ui.modal.entries = ingredientFields.map((field, index) => ({
    ingredientId: clean(field.value),
    quantity: clean(quantityFields[index]?.value) || "1",
  }));
}

function applyIngredientEdit(ingredientId, payload) {
  const ingredient = state.ingredients.find((entry) => entry.id === ingredientId);
  if (!ingredient) {
    return;
  }

  const nextName = clean(payload.name);
  if (!nextName) {
    return;
  }

  const nextStorageRaw = clean(payload.storage).toLowerCase();
  const nextStorage = nextStorageRaw === "frais" ? "frais" : "placard";
  const nextFoodType = clean(payload.foodType) || ingredient.foodType || "Autres";
  const nextUnit = clean(payload.unit) || ingredient.unit || "unites";
  const previousName = ingredient.name;

  state.ingredients = state.ingredients.map((entry) =>
    entry.id === ingredientId
      ? { ...entry, name: nextName, storage: nextStorage, foodType: nextFoodType, unit: nextUnit }
      : entry
  );

  state.shopping = state.shopping.map((item) =>
    item.ingredientId === ingredientId ||
    (item.sourceType === "meal" && item.title.toLowerCase() === previousName.toLowerCase())
      ? { ...item, title: nextName, foodType: nextFoodType, ingredientId }
      : item
  );
}

function deleteIngredient(ingredientId) {
  const ingredient = state.ingredients.find((entry) => entry.id === ingredientId);
  if (!ingredient) {
    return;
  }

  state.ingredients = state.ingredients.filter((entry) => entry.id !== ingredientId);
  state.recipes = state.recipes.map((recipe) => ({
    ...recipe,
    ingredientEntries: getRecipeIngredientEntries(recipe).filter((entry) => entry.ingredientId !== ingredientId),
  }));
  state.shopping = state.shopping.filter(
    (item) =>
      !(
        item.ingredientId === ingredientId ||
        (item.sourceType === "meal" && item.title.toLowerCase() === ingredient.name.toLowerCase())
      )
  );
  state.recipeDraftIngredients = state.recipeDraftIngredients.filter((entry) => entry.ingredientId !== ingredientId);
}

function applyRecipeEdit(recipeId, payload) {
  const recipe = state.recipes.find((entry) => entry.id === recipeId);
  if (!recipe) {
    return;
  }

  const nextName = clean(payload.name);
  if (!nextName) {
    return;
  }

  const nextTypeRaw = clean(payload.dishType);
  const allowedTypes = ["Entree", "Plat", "Dessert", "Boisson"];
  const nextType = allowedTypes.includes(nextTypeRaw) ? nextTypeRaw : recipe.dishType;
  const previousName = recipe.name;
  const affectedMealIds = state.meals
    .filter((meal) => meal.recipeId === recipeId)
    .map((meal) => meal.id);
  const nextIngredientEntries = payload.ingredientEntries.filter((entry) => entry.ingredientId);
  if (!nextIngredientEntries.length) {
    return;
  }

  state.recipes = state.recipes.map((entry) =>
    entry.id === recipeId
      ? {
          ...entry,
          name: nextName,
          dishType: nextType,
          ingredientEntries: nextIngredientEntries,
          pdfDataUrl:
            payload.pdfDataUrl === undefined ? entry.pdfDataUrl || null : payload.pdfDataUrl,
          pdfName:
            payload.pdfName === undefined
              ? entry.pdfName || null
              : payload.pdfName,
        }
      : entry
  );
  state.meals = state.meals.map((meal) =>
    meal.recipeId === recipeId ? { ...meal, title: nextName, mealType: nextType } : meal
  );
  state.calendar = state.calendar.map((eventItem) =>
    eventItem.sourceType === "meal" && affectedMealIds.includes(eventItem.sourceId)
      ? {
          ...eventItem,
          title: eventItem.title.includes(previousName)
            ? eventItem.title.replace(previousName, nextName)
            : eventItem.title,
        }
      : eventItem
  );

  state.shopping = state.shopping.filter(
    (item) => !(item.sourceType === "meal" && (item.linkedMealIds || [item.sourceId]).some((mealId) => affectedMealIds.includes(mealId)))
  );
  affectedMealIds.forEach((mealId) => addMealIngredientsToShopping(mealId));
}

function deleteRecipe(recipeId) {
  const recipe = state.recipes.find((entry) => entry.id === recipeId);
  if (!recipe) {
    return;
  }

  const removedMealIds = state.meals
    .filter((meal) => meal.recipeId === recipeId)
    .map((meal) => meal.id);

  removedMealIds.forEach((mealId) => {
    deleteMeal(mealId, { recipe });
  });
  state.recipes = state.recipes.filter((entry) => entry.id !== recipeId);
  state.meals = state.meals.filter((meal) => meal.recipeId !== recipeId);
}

function deleteMeal(mealId, options = {}) {
  const meal = state.meals.find((entry) => entry.id === mealId);
  if (!meal) {
    return;
  }

  const recipe = options.recipe || getRecipeByMeal(meal);

  state.shopping = state.shopping.flatMap((item) => {
    if (item.sourceType !== "meal" || !(item.linkedMealIds || [item.sourceId]).includes(mealId)) {
      return [item];
    }

    const linkedMealIds = (item.linkedMealIds || [item.sourceId]).filter((linkedId) => linkedId !== mealId);

    if (!linkedMealIds.length) {
      if (item.purchased) {
        return [
          {
            ...item,
            sourceType: "house",
            sourceId: null,
            linkedMealIds: [],
          },
        ];
      }

      return [];
    }

    if (recipe && item.ingredientId) {
      const recipeEntry = getRecipeIngredientEntries(recipe).find((entry) => entry.ingredientId === item.ingredientId);
      if (recipeEntry) {
        return [
          {
            ...item,
            quantity: subtractQuantities(item.quantity || "0", recipeEntry.quantity || "0"),
            linkedMealIds,
          },
        ];
      }
    }

    return [
      {
        ...item,
        linkedMealIds,
      },
    ];
  }).filter((item) => normalizeQuantityString(item.quantity || "0") !== "0" || item.purchased);

  state.meals = state.meals.filter((entry) => entry.id !== mealId);
  state.calendar = state.calendar.filter(
    (eventItem) => !(eventItem.sourceType === "meal" && eventItem.sourceId === mealId)
  );
}

function applyVacationEdit(vacationId, payload) {
  const vacation = state.vacations.find((entry) => entry.id === vacationId);
  if (!vacation) {
    return;
  }

  const nextDestination = clean(payload.destination);
  const nextStartDate = clean(payload.startDate);
  const nextEndDate = clean(payload.endDate);
  if (!nextDestination || !nextStartDate || !nextEndDate) {
    return;
  }

  state.vacations = state.vacations.map((entry) =>
    entry.id === vacationId
      ? {
          ...entry,
          destination: nextDestination,
          startDate: nextStartDate,
          endDate: nextEndDate,
          budget: Number(payload.budget) || 0,
        }
      : entry
  );

  state.calendar = state.calendar.map((eventItem) => {
    if (eventItem.sourceType !== "vacation" || eventItem.sourceId !== vacationId) {
      return eventItem;
    }

    if (eventItem.title.startsWith("Depart -")) {
      return {
        ...eventItem,
        title: `Depart - ${nextDestination}`,
        date: nextStartDate,
      };
    }

    if (eventItem.title.startsWith("Retour -")) {
      return {
        ...eventItem,
        title: `Retour - ${nextDestination}`,
        date: nextEndDate,
      };
    }

    return eventItem;
  });
}

function deleteVacation(vacationId) {
  state.vacations = state.vacations.filter((entry) => entry.id !== vacationId);
  state.calendar = state.calendar.filter(
    (eventItem) => !(eventItem.sourceType === "vacation" && eventItem.sourceId === vacationId)
  );
  state.tasks = state.tasks.filter(
    (task) => !(task.sourceType === "vacation" && task.sourceId === vacationId)
  );
  state.projects = state.projects.map((project) =>
    project.linkedVacationId === vacationId ? { ...project, linkedVacationId: null } : project
  );
}

function applyProjectEdit(projectId, payload) {
  const project = state.projects.find((entry) => entry.id === projectId);
  if (!project) {
    return;
  }

  const nextTitle = clean(payload.title);
  const nextDeadline = clean(payload.deadline);
  if (!nextTitle || !nextDeadline) {
    return;
  }

  state.projects = state.projects.map((entry) =>
    entry.id === projectId
      ? {
          ...entry,
          title: nextTitle,
          lead: clean(payload.lead) || entry.lead,
          status: clean(payload.status) || entry.status,
          deadline: nextDeadline,
          note: clean(payload.note) || "",
        }
      : entry
  );
}

function deleteProject(projectId) {
  state.projects = state.projects.filter((entry) => entry.id !== projectId);
  state.tasks = state.tasks.filter(
    (task) => !(task.sourceType === "project" && task.sourceId === projectId)
  );
  state.calendar = state.calendar.filter(
    (eventItem) => !(eventItem.sourceType === "project" && eventItem.sourceId === projectId)
  );
  state.shopping = state.shopping.filter(
    (item) => !(item.sourceType === "project" && item.sourceId === projectId)
  );
  state.vacations = state.vacations.map((vacation) =>
    vacation.linkedProjectId === projectId ? { ...vacation, linkedProjectId: null } : vacation
  );
}

function renderCurrentDate() {
  currentDate.textContent = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function selectionToProfiles(selection) {
  if (selection === "thomas" || selection === "christelle") {
    return [selection];
  }

  return ["thomas", "christelle"];
}

function parseRelationValue(value) {
  if (!value || value === "none") {
    return { sourceType: "none", sourceId: null };
  }

  const [sourceType, sourceId] = String(value).split(":");
  return { sourceType, sourceId: sourceId || null };
}

function formatShortDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "date a definir";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
  }).format(date);
}

function formatLongDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "jour a definir";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

function daysUntil(dateString) {
  const target = new Date(`${dateString}T12:00:00`);
  const today = new Date();
  const cleanToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0);
  const diff = Math.round((target.getTime() - cleanToday.getTime()) / 86400000);
  return diff >= 0 ? diff : 0;
}

function sortByDate(key) {
  return (left, right) => {
    const leftDate = new Date(`${left[key]}T12:00:00`);
    const rightDate = new Date(`${right[key]}T12:00:00`);
    return leftDate - rightDate;
  };
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

function getPartnerId(profileId) {
  return profileId === "thomas" ? "christelle" : "thomas";
}

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function csvToArray(value) {
  return clean(value)
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function clean(value) {
  return String(value || "").trim();
}

function loadStateRecord() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {
        state: normalizeState(clone(DEFAULT_STATE)),
        hasStoredValue: false,
      };
    }

    const parsed = JSON.parse(stored);
    return {
      state: normalizeState({
        ...clone(DEFAULT_STATE),
        ...parsed,
      }),
      hasStoredValue: true,
    };
  } catch (error) {
    return {
      state: normalizeState(clone(DEFAULT_STATE)),
      hasStoredValue: false,
    };
  }
}

function loadState() {
  return loadStateRecord().state;
}

function saveState() {
  const nextSharedFingerprint = buildSharedStateFingerprint(getSharedStateSnapshot(state));
  const sharedChanged = nextSharedFingerprint !== stateSync.lastSharedFingerprint;

  if (sharedChanged) {
    state.lastSavedAt = new Date().toISOString();
  }

  persistLocalState(state);

  if (sharedChanged) {
    stateSync.lastSharedFingerprint = buildSharedStateFingerprint(getSharedStateSnapshot(state));
    queueRemoteStateSave(true);
  }
}

function persistLocalState(snapshot) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

function loadSyncMeta() {
  try {
    const stored = window.localStorage.getItem(STORAGE_SYNC_KEY);
    if (!stored) {
      return { lastRemoteSyncAt: "" };
    }

    const parsed = JSON.parse(stored);
    return {
      lastRemoteSyncAt: clean(parsed.lastRemoteSyncAt),
    };
  } catch (error) {
    return { lastRemoteSyncAt: "" };
  }
}

function persistSyncMeta() {
  window.localStorage.setItem(
    STORAGE_SYNC_KEY,
    JSON.stringify({
      lastRemoteSyncAt: stateSync.lastRemoteSyncAt || "",
    })
  );
}

async function hydrateState() {
  const localRecord = loadStateRecord();
  state = localRecord.state;
  const localUiState = clone(localRecord.state);
  const syncMeta = loadSyncMeta();
  stateSync.lastRemoteSyncAt = clean(syncMeta.lastRemoteSyncAt);
  stateSync.lastSharedFingerprint = buildSharedStateFingerprint(getSharedStateSnapshot(state));
  render();

  try {
    const sessionInfo = await fetchHouseSessionState();
    applyHouseSessionState(sessionInfo);

    const remoteRecord = await fetchRemoteState();
    const remoteState = remoteRecord && remoteRecord.state
      ? normalizeState({
          ...clone(DEFAULT_STATE),
          ...remoteRecord.state,
        })
      : null;
    const remoteTimestamp = clean(
      remoteRecord && (remoteRecord.updatedAt || getStateTimestamp(remoteRecord.state))
    );
    const localTimestamp = getStateTimestamp(state);
    const localHasUnsyncedSharedChanges = Boolean(
      localTimestamp && (!stateSync.lastRemoteSyncAt || localTimestamp > stateSync.lastRemoteSyncAt)
    );

    if (remoteState) {
      if (localHasUnsyncedSharedChanges && localTimestamp && (!remoteTimestamp || localTimestamp > remoteTimestamp)) {
        persistLocalState(state);
        queueRemoteStateSave(true);
      } else {
        state = mergeSharedStateIntoState(localUiState, remoteState);
        persistLocalState(state);
        stateSync.lastRemoteSyncAt = remoteTimestamp || getStateTimestamp(state);
        persistSyncMeta();
      }
    } else if (localRecord.hasStoredValue) {
      if (!state.lastSavedAt) {
        state.lastSavedAt = new Date().toISOString();
        persistLocalState(state);
      }
      queueRemoteStateSave(true);
    }
  } catch (error) {
    console.error("Remote state hydration failed:", error);
  }

  stateSync.lastSharedFingerprint = buildSharedStateFingerprint(getSharedStateSnapshot(state));
  render();
}

async function fetchHouseSessionState() {
  const response = await fetch(SESSION_API_URL, {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch remote session (${response.status})`);
  }

  return response.json();
}

function applyHouseSessionState(sessionInfo) {
  stateSync.authEnabled = Boolean(sessionInfo && sessionInfo.protected);
  stateSync.isAuthenticated = !stateSync.authEnabled || Boolean(sessionInfo && sessionInfo.authenticated);
  stateSync.authRequired = stateSync.authEnabled && !stateSync.isAuthenticated;

  if (stateSync.authRequired) {
    ui.modal = {
      kind: "house-access-auth",
    };
  } else if (ui.modal?.kind === "house-access-auth") {
    ui.modal = null;
  }
}

async function fetchRemoteState() {
  const response = await fetch(STATE_API_URL, {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (response.status === 401) {
    handleRemoteUnauthorized();
    return null;
  }

  if (!response.ok) {
    throw new Error(`Unable to fetch remote state (${response.status})`);
  }

  return response.json();
}

function queueRemoteStateSave(immediate) {
  if (typeof window.fetch !== "function") {
    return;
  }

  if (stateSync.authRequired) {
    stateSync.hasPendingSave = true;
    return;
  }

  if (stateSync.saveTimerId) {
    window.clearTimeout(stateSync.saveTimerId);
    stateSync.saveTimerId = null;
  }

  if (immediate) {
    void flushRemoteStateSave();
    return;
  }

  stateSync.saveTimerId = window.setTimeout(() => {
    stateSync.saveTimerId = null;
    void flushRemoteStateSave();
  }, 320);
}

async function flushRemoteStateSave() {
  if (stateSync.isSaving) {
    stateSync.hasPendingSave = true;
    return;
  }

  stateSync.isSaving = true;
  stateSync.hasPendingSave = false;

  try {
    const snapshot = getSharedStateSnapshot(state);
    const response = await postRemoteStateSnapshot(snapshot, { keepalive: true });

    if (response.status === 401) {
      handleRemoteUnauthorized();
      stateSync.hasPendingSave = true;
      return;
    }

    if (!response.ok && response.status !== 404) {
      throw new Error(`Unable to save remote state (${response.status})`);
    }

    if (response.ok) {
      stateSync.lastRemoteSyncAt = getStateTimestamp(state);
      persistSyncMeta();
    }
  } catch (error) {
    console.error("Remote state save failed:", error);
  } finally {
    stateSync.isSaving = false;
    if (stateSync.hasPendingSave) {
      stateSync.hasPendingSave = false;
      void flushRemoteStateSave();
    }
  }
}

async function postRemoteStateSnapshot(snapshot, options = {}) {
  return fetch(STATE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    keepalive: Boolean(options.keepalive),
    body: JSON.stringify({
      state: snapshot,
      updatedAt: getStateTimestamp(snapshot) || new Date().toISOString(),
    }),
  });
}

function persistRemoteStateOnHide() {
  if (stateSync.authRequired || typeof window.fetch !== "function") {
    return;
  }

  if (
    stateSync.lastRemoteSyncAt &&
    getStateTimestamp(state) &&
    getStateTimestamp(state) <= stateSync.lastRemoteSyncAt
  ) {
    return;
  }

  const snapshot = getSharedStateSnapshot(state);
  const payload = JSON.stringify({
    state: snapshot,
    updatedAt: getStateTimestamp(snapshot) || new Date().toISOString(),
  });

  if (navigator.sendBeacon) {
    try {
      const blob = new Blob([payload], { type: "application/json" });
      const queued = navigator.sendBeacon(STATE_API_URL, blob);
      if (queued) {
        return;
      }
    } catch (error) {
      console.error("Beacon save failed:", error);
    }
  }

  void fetch(STATE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    keepalive: true,
    body: payload,
  });
}

function getStateTimestamp(targetState) {
  return clean(targetState && targetState.lastSavedAt);
}

function handleRemoteUnauthorized() {
  stateSync.authRequired = true;
  stateSync.isAuthenticated = false;
  if (ui.modal?.kind !== "house-access-auth") {
    ui.modal = {
      kind: "house-access-auth",
    };
  }
  render();
}

async function unlockHouseSession(password) {
  try {
    const response = await fetch(SESSION_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    const payload = await response.json();
    return {
      ok: response.ok,
      protected: Boolean(payload.protected),
      error: payload.error,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Impossible d'ouvrir la session maison.",
    };
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getSharedStateSnapshot(targetState) {
  return SHARED_STATE_KEYS.reduce((snapshot, key) => {
    snapshot[key] =
      targetState && typeof targetState[key] !== "undefined"
        ? clone(targetState[key])
        : clone(DEFAULT_STATE[key]);
    return snapshot;
  }, {});
}

function buildSharedStateFingerprint(targetState) {
  const snapshot = targetState && !Array.isArray(targetState) && targetState.tasks
    ? getSharedStateSnapshot(targetState)
    : targetState;
  return JSON.stringify(snapshot || {});
}

function mergeSharedStateIntoState(baseState, sharedState) {
  const uiState = {
    currentView: baseState.currentView || DEFAULT_STATE.currentView,
    activeProfile: baseState.activeProfile || DEFAULT_STATE.activeProfile,
    calendarDisplay: baseState.calendarDisplay || DEFAULT_STATE.calendarDisplay,
    calendarMode: baseState.calendarMode || DEFAULT_STATE.calendarMode,
    calendarYear: Number.isFinite(baseState.calendarYear) ? baseState.calendarYear : DEFAULT_STATE.calendarYear,
    calendarMonth: Number.isFinite(baseState.calendarMonth) ? baseState.calendarMonth : DEFAULT_STATE.calendarMonth,
    showIngredientComposer: Boolean(baseState.showIngredientComposer),
    recipeDraftIngredients: clone(baseState.recipeDraftIngredients || []),
  };

  return normalizeState({
    ...clone(DEFAULT_STATE),
    ...getSharedStateSnapshot(baseState),
    ...getSharedStateSnapshot(sharedState),
    ...uiState,
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Impossible de lire le fichier."));
    reader.readAsDataURL(file);
  });
}

function normalizeState(inputState) {
  const nextState = clone(inputState);
  nextState.lastSavedAt = clean(nextState.lastSavedAt) || null;
  nextState.tasks = reconcileTaskCollection(
    (nextState.tasks || []).map((task) => ({
      ...task,
      isLate: Boolean(task.isLate),
      lateOriginDate: clean(task.lateOriginDate) || null,
    }))
  ).tasks;

  nextState.ingredients = (nextState.ingredients || []).map((ingredient) => ({
    ...ingredient,
    foodType: ingredient.foodType || "Autres",
    unit: ingredient.unit || "unites",
    stockQuantity: normalizeQuantityString(ingredient.stockQuantity || "0"),
  }));

  nextState.recipes = (nextState.recipes || []).map((recipe) => ({
    ...recipe,
    ingredientEntries: getNormalizedRecipeEntries(recipe),
    pdfDataUrl: clean(recipe.pdfDataUrl) || null,
    pdfName: clean(recipe.pdfName) || null,
  }));

  nextState.recipeDraftIngredients = (nextState.recipeDraftIngredients || []).map((entry) =>
    typeof entry === "string"
      ? { ingredientId: entry, quantity: "1" }
      : { ingredientId: entry.ingredientId, quantity: entry.quantity || "1" }
  );

  nextState.shopping = (nextState.shopping || []).map((item) => ({
    ...item,
    ingredientId: item.ingredientId || findIngredientIdByNameInState(nextState, item.title),
    foodType: item.foodType || getIngredientFoodTypeByState(nextState, item.ingredientId || findIngredientIdByNameInState(nextState, item.title)) || (item.sourceType === "house" || item.sourceType === "project" ? "Maison" : "Autres"),
    weekKey: item.weekKey || getShoppingWeekInfoByState(nextState, item).key,
    linkedMealIds: item.linkedMealIds || (item.sourceId ? [item.sourceId] : []),
  }));

  nextState.calendar = (nextState.calendar || []).filter(
    (eventItem) => eventItem.sourceType !== "meal"
  );

  nextState.meals = (nextState.meals || []).map((meal) => ({
    ...meal,
    prepared: Boolean(meal.prepared),
  }));

  return nextState;
}

function getNormalizedRecipeEntries(recipe) {
  if (Array.isArray(recipe.ingredientEntries)) {
    return recipe.ingredientEntries.map((entry) => ({
      ingredientId: entry.ingredientId,
      quantity: entry.quantity || "1",
    }));
  }

  return (recipe.ingredientIds || []).map((ingredientId) => ({
    ingredientId,
    quantity: "1",
  }));
}

function findIngredientIdByNameInState(targetState, ingredientName) {
  const match = (targetState.ingredients || []).find(
    (ingredient) => ingredient.name.toLowerCase() === clean(ingredientName).toLowerCase()
  );
  return match ? match.id : null;
}

function getIngredientFoodTypeByState(targetState, ingredientId) {
  const ingredient = (targetState.ingredients || []).find((entry) => entry.id === ingredientId);
  return ingredient ? ingredient.foodType : null;
}

function getShoppingWeekInfoByState(targetState, item) {
  if (item.weekKey) {
    return { ...getWeekInfo(item.weekKey), key: item.weekKey };
  }

  if (item.sourceType === "meal") {
    const meal = (targetState.meals || []).find((entry) => entry.id === item.sourceId);
    if (meal) {
      return getWeekInfo(meal.scheduledDate);
    }
  }

  return getWeekInfo(todayDateKey());
}

function parseRecipeIngredientPrompt(rawValue) {
  return rawValue
    .split(",")
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [ingredientName, ...quantityParts] = chunk.split(":");
      const ingredient = findIngredientByName(ingredientName);
      if (!ingredient) {
        return null;
      }

      return {
        ingredientId: ingredient.id,
        quantity: clean(quantityParts.join(":")) || "1",
      };
    })
    .filter(Boolean);
}

function addQuantities(leftQuantity, rightQuantity) {
  const left = normalizeQuantityString(leftQuantity);
  const right = normalizeQuantityString(rightQuantity);
  const leftParts = parseQuantityParts(left);
  const rightParts = parseQuantityParts(right);

  if (left === "0") {
    return right;
  }

  if (right === "0") {
    return left;
  }

  if (leftParts && rightParts && leftParts.unit === rightParts.unit) {
    return formatQuantityParts(leftParts.amount + rightParts.amount, leftParts.unit);
  }

  return `${left} + ${right}`;
}

function subtractQuantities(leftQuantity, rightQuantity) {
  const left = normalizeQuantityString(leftQuantity);
  const right = normalizeQuantityString(rightQuantity);
  const leftParts = parseQuantityParts(left);
  const rightParts = parseQuantityParts(right);

  if (left === "0") {
    return "0";
  }

  if (!leftParts || !rightParts || leftParts.unit !== rightParts.unit) {
    return left;
  }

  const nextAmount = Math.max(leftParts.amount - rightParts.amount, 0);
  return formatQuantityParts(nextAmount, leftParts.unit);
}

function adjustIngredientStock(ingredientId, quantity, operation) {
  const ingredient = findIngredientById(ingredientId);
  if (!ingredient) {
    return;
  }

  state.ingredients = state.ingredients.map((entry) => {
    if (entry.id !== ingredientId) {
      return entry;
    }

    const currentQuantity = normalizeQuantityString(entry.stockQuantity || "0");
    const nextQuantity =
      operation === "increase"
        ? addQuantities(currentQuantity, quantity)
        : subtractQuantities(currentQuantity, quantity);

    return {
      ...entry,
      stockQuantity: normalizeQuantityString(nextQuantity),
    };
  });
}

function deleteTask(taskId) {
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  state.calendar = state.calendar.filter(
    (eventItem) => !(eventItem.sourceType === "task" && eventItem.sourceId === taskId)
  );
}

function deleteShoppingItem(itemId) {
  const item = state.shopping.find((entry) => entry.id === itemId);
  if (!item) {
    return;
  }

  if (item.purchased && item.ingredientId) {
    adjustIngredientStock(item.ingredientId, item.quantity || "0", "decrease");
  }

  state.shopping = state.shopping.filter((entry) => entry.id !== itemId);
}

function deleteCalendarEvent(eventId) {
  state.calendar = state.calendar.filter((eventItem) => eventItem.id !== eventId);
}

function updateShoppingQuantity(itemId, nextQuantityRaw) {
  const item = state.shopping.find((entry) => entry.id === itemId);
  if (!item) {
    return;
  }

  const nextQuantity = normalizeQuantityString(nextQuantityRaw || "1");
  if (item.purchased && item.ingredientId) {
    adjustIngredientStock(item.ingredientId, item.quantity || "0", "decrease");
    adjustIngredientStock(item.ingredientId, nextQuantity, "increase");
  }

  state.shopping = state.shopping.map((entry) =>
    entry.id === itemId ? { ...entry, quantity: nextQuantity } : entry
  );
}

function toggleShoppingPurchase(itemId) {
  const item = state.shopping.find((entry) => entry.id === itemId);
  if (!item) {
    return;
  }

  const nextPurchased = !item.purchased;
  if (item.ingredientId) {
    adjustIngredientStock(item.ingredientId, item.quantity || "0", nextPurchased ? "increase" : "decrease");
  }

  state.shopping = state.shopping.map((entry) =>
    entry.id === itemId ? { ...entry, purchased: nextPurchased } : entry
  );
}

function toggleMealPrepared(mealId) {
  const meal = state.meals.find((entry) => entry.id === mealId);
  if (!meal) {
    return;
  }

  const recipe = getRecipeByMeal(meal);
  if (!recipe) {
    return;
  }

  const nextPrepared = !meal.prepared;
  getRecipeIngredientEntries(recipe).forEach((entry) => {
    adjustIngredientStock(entry.ingredientId, entry.quantity || "0", nextPrepared ? "decrease" : "increase");
  });

  state.meals = state.meals.map((entry) =>
    entry.id === mealId ? { ...entry, prepared: nextPrepared } : entry
  );
}

function animateReveal() {
  const elements = Array.from(document.querySelectorAll(".reveal"));
  elements.forEach((element) => element.classList.remove("is-visible"));
  requestAnimationFrame(() => {
    elements.forEach((element, index) => {
      window.setTimeout(() => {
        element.classList.add("is-visible");
      }, Math.min(index * 28, 220));
    });
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeHtmlAttribute(value) {
  return escapeHtml(value);
}
