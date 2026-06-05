"use strict";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// BUSINESS LINKS: Change these values before publishing.
const businessConfig = {
  // WHATSAPP NUMBER: Use country code, no plus sign or spaces. Example Turkey: +905551112233
  whatsappNumber: "0546860042",
  // PHONE: Change the visible phone number and tel link here.
  phoneDisplay: "0546860042",
  phoneHref: "tel:0546860042",
  whatsappMessage: {
    tr: "Merhaba, Pizzeria Tov için sipariş vermek istiyorum.",
    en: "Hello, I would like to order from Pizzeria Tov.",
  },
  itemWhatsappMessage: {
    tr: "Merhaba, Pizzeria Tov'dan {item} sipariş vermek istiyorum.",
    en: "Hello, I would like to order {item} from Pizzeria Tov.",
  },
  // MAP LINK: Replace with the restaurant's real Google Maps share link.
  mapUrl:
    "https://www.google.com/maps/place/Pizzeria+TOV/@37.9383882,40.1316048,686m/data=!3m2!1e3!4b1!4m6!3m5!1s0x40751f007b429305:0xc22fae67584a3097!8m2!3d37.9383882!4d40.1316048!16s%2Fg%2F11y6p2z61x!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D",
  // INSTAGRAM LINK: Change this if the restaurant handle changes.
  instagramUrl: "https://www.instagram.com/pizzeria_tov/",
  // HOURS: Edit these lines to update the visible opening hours.
  hours: {
  tr: [
"🍕 Neapolitan Style Pizza 🍕",
"Pazartesi: Kapalı",
"Salı: 12.00 - 20.00",
"Çarşamba: 12.00 - 20.00",
"Perşembe: 12.00 - 20.00",
"Cuma: 12.00 - 20.00",
"Cumartesi: 14.00 - 20.00",
"Pazar: 14.00 - 20.00",
],
en: [
"🍕 Neapolitan Style Pizza 🍕",
"Monday: Closed",
"Tuesday: 12.00 - 20.00",
"Wednesday: 12.00 - 20.00",
"Thursday: 12.00 - 20.00",
"Friday: 12.00 - 20.00",
"Saturday: 14.00 - 20.00",
"Sunday: 14.00 - 20.00",
],
  },
};

const categories = [
  { id: "napoli", label: { tr: "Napoli Pizzaları", en: "Napoli Pizzas" } },
  { id: "drinks", label: { tr: "İçecekler", en: "Drinks" } },
];

const menuGroups = {
  chef: {
    eyebrow: { tr: "Napoli Pizzaları", en: "Napoli Pizzas" },
    title: { tr: "Klasik Pizzalar", en: "Chef's Selection" },
  },
  signature: {
    eyebrow: { tr: "En çok tercih edilen", en: "Most Ordered" },
    title: { tr: "İmza Pizzalar", en: "Signature Pizzas" },
  },
  drinks: {
    eyebrow: { tr: "Bibite", en: "Bibite" },
    title: { tr: "İçecekler", en: "Drinks" },
  },
};

const groupOrderByCategory = {
  napoli: ["chef", "signature"],
  drinks: ["drinks"],
};

// MENU DATA: Add, remove, or edit products here.
// To add a new pizza, starter, dessert, or drink, copy one object and change:
// id, category, group, name, price, ingredients, visual, and optional image.
const baseMenuItems = [
  {
    id: "margherita",
    category: "napoli",
    group: "chef",
    price: "415 ₺",
    visual: "tomato",
    name: { tr: "Margherita", en: "Margherita" },
    ingredients: {
      tr: ["Eritilmiş peynir", "San Marzano domates", "Fesleğen", "Parmesan", "Zeytinyağı"],
      en: ["Melted cheese", "San Marzano tomatoes", "Basil", "Parmesan", "Olive oil"],
    },
  },
  {
    id: "marinara",
    category: "napoli",
    group: "chef",
    price: "240 ₺",
    visual: "tomato",
    name: { tr: "Marinara", en: "Marinara" },
    ingredients: {
      tr: ["San Marzano domates sos", "Fesleğen", "Siyah zeytin", "Acı zeytin", "Zeytinyağı"],
      en: ["San Marzano tomato sauce", "Basil", "Black olives", "Spicy olives", "Olive oil"],
    },
  },
  {
    id: "no-1",
    category: "napoli",
    group: "signature",
    price: "460 ₺",
    visual: "mushroom",
    image: "assets/menu/mantar-pizza-dilim.jpg",
    name: { tr: "No:1", en: "No:1" },
    ingredients: {
      tr: ["San Marzano domates sos", "Fesleğen", "Dilber eritilmiş peyniri", "Parmesan", "Mantar mix", "Zeytinyağı"],
      en: ["San Marzano tomato sauce", "Basil", "Dilber melted cheese", "Parmesan", "Mixed mushrooms", "Olive oil"],
    },
  },
  {
    id: "no-2",
    category: "napoli",
    group: "signature",
    price: "485 ₺",
    visual: "cheese",
    image: "assets/menu/mantar-pizza.jpg",
    name: { tr: "No:2", en: "No:2" },
    ingredients: {
      tr: ["Gorgonzola", "Kars gravyeri", "Dilber eritilmiş peyniri", "Fesleğen", "Parmesan", "Mantar mix", "Zeytinyağı", "Soslu etler"],
      en: ["Gorgonzola", "Kars gruyere", "Dilber melted cheese", "Basil", "Parmesan", "Mixed mushrooms", "Olive oil", "Sauced meats"],
    },
  },
  {
    id: "no-3",
    category: "napoli",
    group: "signature",
    price: { tr: "Fiyat sorunuz", en: "Ask price" },
    visual: "mushroom",
    name: { tr: "No:3", en: "No:3" },
    ingredients: {
      tr: ["Gorgonzola peyniri", "Fesleğen", "Parmesan peyniri", "Dilber peyniri", "Mantar", "Füme et", "Ricotta kreması", "Balzamik", "Karabiber"],
      en: ["Gorgonzola cheese", "Basil", "Parmesan cheese", "Dilber cheese", "Mushroom", "Smoked meat", "Ricotta cream", "Balsamic", "Black pepper"],
    },
  },

  {
    id: "pepperoni",
    category: "napoli",
    group: "signature",
    price: "525 ₺",
    visual: "tomato",
    name: { tr: "Pepperoni", en: "Pepperoni" },
    ingredients: {
      tr: ["San Marzano domates sos", "Fesleğen", "Parmesan", "Dilber eritilmiş peyniri", "Kayap sucuk", "Deniz zeytinyağı"],
      en: ["San Marzano tomato sauce", "Basil", "Parmesan", "Dilber melted cheese", "Kayap sucuk", "Deniz olive oil"],
    },
  },
  {
    id: "dort-peynir",
    category: "napoli",
    group: "signature",
    price: "570 ₺",
    visual: "cheese",
    image: "assets/menu/dort-peynir.jpg",
    name: { tr: "4 Peynirli Pizza", en: "Four Cheese Pizza" },
    ingredients: {
      tr: ["Dilberice", "Kars gravyeri", "Gorgonzola", "Parmesan", "Dilber peyniri", "Kaymak", "Bal"],
      en: ["Dilberice", "Kars gruyere", "Gorgonzola", "Parmesan", "Dilber cheese", "Cream", "Honey"],
    },
  },
  {
    id: "burrata-special",
    category: "napoli",
    group: "signature",
    price: "460 ₺",
    visual: "cheese",
    image: "assets/menu/burrata-special.jpg",
    name: { tr: "Burrata Special", en: "Burrata Special" },
    ingredients: {
      tr: ["Burrata", "Roka", "Cherry domates", "Pesto"],
      en: ["Burrata", "Arugula", "Cherry tomatoes", "Pesto"],
    },
  },
  {
    id: "san-pellegrino",
    category: "drinks",
    group: "drinks",
    price: "120 ₺",
    visual: "drink",
    name: { tr: "San Pellegrino", en: "San Pellegrino" },
    ingredients: {
      tr: ["Maden suyu"],
      en: ["Sparkling mineral water"],
    },
  },
  {
    id: "espresso",
    category: "drinks",
    group: "drinks",
    price: "95 ₺",
    visual: "drink",
    name: { tr: "Espresso", en: "Espresso" },
    ingredients: {
      tr: ["Yoğun İtalyan espresso"],
      en: ["Intense Italian espresso"],
    },
  },
];

const publicMenuUrl = "https://pizzeria-tov.vercel.app";
const defaultStorageBucket = "product-images";

let supabaseClient = null;
let menuItems = [];
let pendingNewPizzaPhoto = null;
let pendingUpdatedPhoto = null;
let adminSession = null;
let adminAuthorized = false;

const uiText = {
  tr: {
    nav: {
      skip: "Menüye geç",
      menu: "Menü",
      admin: "Yönetim",
      visit: "İletişim",
    },
    menu: {
      eyebrow: "Menu della casa",
      title: "Pizzeria Tov Menü",
      empty: "Bu kategoride ürün yok.",
    },
    admin: {
      skip: "Yönetim paneline geç",
      eyebrow: "Area riservata",
      title: "Yönetici paneli",
      copy: "Yeni ürün ekleyin, fiyatları güncelleyin, fotoğrafları yükleyin ve görünürlüğü yönetin.",
      authKicker: "Link sicuro",
      authTitle: "Yönetici erişimi",
      authCopy: "Menüyü düzenlemek için Supabase yönetici e-posta adresinize tek kullanımlık giriş bağlantısı gönderilir.",
      authEmailLabel: "Yönetici e-postası",
      authButton: "Giriş Linki Gönder",
      authSent: "Giriş bağlantısı e-posta adresine gönderildi.",
      authChecking: "Yönetici erişimi kontrol ediliyor.",
      authRequired: "Menüyü düzenlemek için yönetici linkiyle giriş yapın.",
      authDenied: "Bu e-posta yönetici listesinde değil.",
      signOutButton: "Çıkış Yap",
      addKicker: "Nuova pizza",
      addTitle: "Yeni ürün ekle",
      nameLabel: "Ürün adı",
      priceLabel: "Fiyat",
      categoryLabel: "Kategori",
      categoryNapoli: "Napoli Pizzaları",
      categoryDrinks: "İçecekler",
      groupLabel: "Menü başlığı",
      groupChef: "Klasik Pizzalar",
      groupSignature: "İmza Pizzalar",
      ingredientsLabel: "İçerikler",
      photoFileLabel: "Fotoğraf dosyası",
      addButton: "Ürünü Ekle",
      priceKicker: "Prezzo",
      priceTitle: "Fiyat güncelle",
      productLabel: "Ürün seç",
      newPriceLabel: "Yeni fiyat",
      priceButton: "Fiyatı Güncelle",
      photoKicker: "Fotografia",
      photoTitle: "Fotoğraf ekle",
      photoButton: "Fotoğrafı Güncelle",
      visibilityKicker: "Visibilità",
      visibilityTitle: "Gizle / göster",
      visibilityLabel: "Menüde göster",
      visibilityButton: "Görünürlüğü Güncelle",
      visibilityUpdated: "Ürün görünürlüğü güncellendi.",
      deleteKicker: "Rimuovi",
      deleteTitle: "Pizza sil",
      deleteButton: "Seçili Ürünü Sil",
      hiddenLabel: "Gizli",
      visibleLabel: "Yayında",
      qrKicker: "QR",
      qrTitle: "Masa QR kodu",
      qrCopy: "Bu QR kod doğrudan Vercel menü adresine gider.",
      qrDownload: "QR Kodunu Aç",
      backToMenu: "Menüye Dön",
      added: "Yeni ürün menüye eklendi.",
      priceUpdated: "Fiyat güncellendi.",
      photoUpdated: "Fotoğraf güncellendi.",
      deleted: "Ürün silindi.",
      photoLoaded: "Fotoğraf hazır.",
      missingPhoto: "Fotoğraf dosyası seçin.",
      storageError: "Supabase kaydı sırasında sorun oluştu. Bağlantı ve RLS ayarlarını kontrol edin.",
      supabaseMissing: "Supabase ayarları eksik. config.js dosyasını doldurun.",
      menuLoadError: "Menü Supabase üzerinden yüklenemedi.",
    },
    visit: {
      title: "İletişim & Konum",
      phoneLabel: "Telefon",
      hoursLabel: "Çalışma saatleri",
      whatsapp: "WhatsApp",
      maps: "Konum",
    },
    mobileNav: {
      menu: "Menü",
      visit: "İletişim",
    },
    footer: {
      copy: "Gerçek Napoli Pizzası",
    },
  },
  en: {
    nav: {
      skip: "Skip to menu",
      menu: "Menu",
      admin: "Admin",
      visit: "Contact",
    },
    menu: {
      eyebrow: "Menu della casa",
      title: "Pizzeria Tov Menu",
      empty: "No items in this category.",
    },
    admin: {
      skip: "Skip to admin panel",
      eyebrow: "Area riservata",
      title: "Admin panel",
      copy: "Add products, update prices, upload photos, and control visibility.",
      authKicker: "Link sicuro",
      authTitle: "Admin access",
      authCopy: "A one-time Supabase login link is sent to the admin email address before edits are allowed.",
      authEmailLabel: "Admin email",
      authButton: "Send Login Link",
      authSent: "Login link sent to the email address.",
      authChecking: "Checking admin access.",
      authRequired: "Use the admin link to edit the menu.",
      authDenied: "This email is not in the admin list.",
      signOutButton: "Sign Out",
      addKicker: "Nuova pizza",
      addTitle: "Add new product",
      nameLabel: "Product name",
      priceLabel: "Price",
      categoryLabel: "Category",
      categoryNapoli: "Napoli Pizzas",
      categoryDrinks: "Drinks",
      groupLabel: "Menu heading",
      groupChef: "Chef's Selection",
      groupSignature: "Signature Pizzas",
      ingredientsLabel: "Ingredients",
      photoFileLabel: "Photo file",
      addButton: "Add Product",
      priceKicker: "Prezzo",
      priceTitle: "Update price",
      productLabel: "Choose product",
      newPriceLabel: "New price",
      priceButton: "Update Price",
      photoKicker: "Fotografia",
      photoTitle: "Add Photo",
      photoButton: "Update Photo",
      visibilityKicker: "Visibilità",
      visibilityTitle: "Hide / show",
      visibilityLabel: "Show on menu",
      visibilityButton: "Update Visibility",
      visibilityUpdated: "Product visibility updated.",
      deleteKicker: "Rimuovi",
      deleteTitle: "Delete pizza",
      deleteButton: "Delete Selected Product",
      hiddenLabel: "Hidden",
      visibleLabel: "Live",
      qrKicker: "QR",
      qrTitle: "Table QR code",
      qrCopy: "This QR code points directly to the Vercel menu URL.",
      qrDownload: "Open QR Code",
      backToMenu: "Back to Menu",
      added: "New product added to the menu.",
      priceUpdated: "Price updated.",
      photoUpdated: "Photo updated.",
      deleted: "Product deleted.",
      photoLoaded: "Photo is ready.",
      missingPhoto: "Choose a photo file.",
      storageError: "Supabase save failed. Check connection and RLS settings.",
      supabaseMissing: "Supabase settings are missing. Fill config.js.",
      menuLoadError: "Menu could not be loaded from Supabase.",
    },
    visit: {
      title: "Contact & Location",
      phoneLabel: "Phone",
      hoursLabel: "Opening hours",
      whatsapp: "WhatsApp",
      maps: "Location",
    },
    mobileNav: {
      menu: "Menu",
      visit: "Contact",
    },
    footer: {
      copy: "The soul of Naples, fired by wood.",
    },
  },
};

const state = {
  language: "tr",
  category: "napoli",
};

document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
  initializeSupabase();
  menuItems = await loadInitialMenuItems();
  bindLanguageSwitch();
  bindSmoothScroll();
  bindAdminPanel();
  renderStaticText();
  renderFilters();
  renderMenu();
  renderAdminSelectors();
  updateBusinessLinks();
  await syncAdminAccess();

  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
}

function initializeSupabase() {
  const config = getAppConfig();
  if (!config.supabaseUrl || !config.supabaseAnonKey || !window.supabase?.createClient) {
    supabaseClient = null;
    return;
  }

  supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true,
    },
  });
}

function getAppConfig() {
  return window.PIZZERIA_TOV_CONFIG || {};
}

function isAdminPage() {
  return document.body.classList.contains("admin-page");
}

function bindLanguageSwitch() {
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.language || "tr";
      renderStaticText();
      renderFilters();
      renderMenu();
      renderAdminSelectors();
      updateBusinessLinks();
    });
  });
}

function bindSmoothScroll() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function bindAdminPanel() {
  const authForm = document.getElementById("adminAuthForm");
  const signOutButton = document.getElementById("adminSignOutButton");
  const addForm = document.getElementById("addPizzaForm");
  const priceForm = document.getElementById("priceUpdateForm");
  const photoForm = document.getElementById("photoUpdateForm");
  const visibilityForm = document.getElementById("visibilityForm");
  const deleteForm = document.getElementById("deletePizzaForm");
  const categorySelect = document.getElementById("newPizzaCategory");
  const groupSelect = document.getElementById("newPizzaGroup");
  const newPhotoFile = document.getElementById("newPizzaFile");
  const updatePhotoFile = document.getElementById("updatedPhotoFile");
  const priceSelect = document.getElementById("priceItemSelect");
  const visibilitySelect = document.getElementById("visibilityItemSelect");

  categorySelect?.addEventListener("change", syncNewProductControls);
  priceSelect?.addEventListener("change", syncSelectedPrice);
  visibilitySelect?.addEventListener("change", syncSelectedVisibility);

  authForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("adminEmail")?.value.trim();
    if (!email) return;
    await sendAdminMagicLink(email);
  });

  signOutButton?.addEventListener("click", async () => {
    await supabaseClient?.auth.signOut();
    adminSession = null;
    adminAuthorized = false;
    syncAdminVisibility();
  });

  newPhotoFile?.addEventListener("change", (event) => {
    readSelectedPhoto(event, (file) => {
      pendingNewPizzaPhoto = file;
      showAdminStatus("photoLoaded");
    });
  });

  updatePhotoFile?.addEventListener("change", (event) => {
    readSelectedPhoto(event, (file) => {
      pendingUpdatedPhoto = file;
      showAdminStatus("photoLoaded");
    });
  });

  addForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("newPizzaName")?.value.trim() || "";
    const price = document.getElementById("newPizzaPrice")?.value.trim() || "";
    const category = categorySelect?.value || "napoli";
    const ingredients = splitIngredients(document.getElementById("newPizzaIngredients")?.value || "");
    const imageFile = pendingNewPizzaPhoto;

    if (!name || !price || !ingredients.length) return;

    const slug = createUniqueId(name);
    const item = {
      id: slug,
      category,
      group: category === "drinks" ? "drinks" : groupSelect?.value || "signature",
      price,
      visual: category === "drinks" ? "drink" : "tomato",
      name: { tr: name, en: name },
      ingredients: { tr: ingredients, en: ingredients },
    };

    if (imageFile) item.imagePath = await uploadProductImage(imageFile, slug);

    const savedItem = await createMenuItem(item);
    menuItems.push(savedItem);
    state.category = category;
    addForm.reset();
    pendingNewPizzaPhoto = null;
    syncNewProductControls();
    refreshMenuSurface();
    showAdminStatus("added");
  });

  priceForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const item = findMenuItem(document.getElementById("priceItemSelect")?.value);
    const updatedPrice = document.getElementById("updatedPrice")?.value.trim() || "";
    if (!item || !updatedPrice) return;

    item.price = updatedPrice;
    await persistMenuItems();
    refreshMenuSurface();
    syncSelectedPrice();
    showAdminStatus("priceUpdated");
  });

  photoForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const item = findMenuItem(document.getElementById("photoItemSelect")?.value);
    const photo = pendingUpdatedPhoto;

    if (!item || !photo) {
      showAdminStatus("missingPhoto");
      return;
    }

    item.image = photo;
    await persistMenuItems();
    pendingUpdatedPhoto = "";
    photoForm.reset();
    refreshMenuSurface();
    showAdminStatus("photoUpdated");
  });

  deleteForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const itemId = document.getElementById("deleteItemSelect")?.value;
    const item = findMenuItem(itemId);
    if (!item) return;

    menuItems = menuItems.filter((entry) => entry.id !== item.id);
    await persistMenuItems();
    refreshMenuSurface();
    showAdminStatus("deleted");
  });

  resetButton?.addEventListener("click", async () => {
    menuItems = cloneMenuItems(baseMenuItems);
    await persistMenuItems();
    refreshMenuSurface();
    syncSelectedPrice();
    showAdminStatus("resetDone");
  });

  syncNewProductControls();
}

function renderAdminSelectors() {
  const selectors = [
    document.getElementById("priceItemSelect"),
    document.getElementById("photoItemSelect"),
    document.getElementById("deleteItemSelect"),
  ];
  const options = menuItems
    .map((item) => {
      const itemName = localize(item.name);
      const itemPrice = localize(item.price);
      return `<option value="${escapeHtml(item.id)}">${escapeHtml(itemName)} · ${escapeHtml(itemPrice)}</option>`;
    })
    .join("");

  selectors.forEach((select) => {
    if (!select) return;
    const currentValue = select.value;
    select.innerHTML = options;
    if (currentValue && findMenuItem(currentValue)) {
      select.value = currentValue;
    }
  });

  syncSelectedPrice();
}

function syncNewProductControls() {
  const categorySelect = document.getElementById("newPizzaCategory");
  const groupSelect = document.getElementById("newPizzaGroup");
  const isDrink = categorySelect?.value === "drinks";

  if (groupSelect) groupSelect.disabled = isDrink;
}

function syncSelectedPrice() {
  const select = document.getElementById("priceItemSelect");
  const input = document.getElementById("updatedPrice");
  const item = findMenuItem(select?.value);
  if (input) input.value = item ? localize(item.price) : "";
}

function refreshMenuSurface() {
  renderFilters();
  renderMenu();
  renderAdminSelectors();
}

function splitIngredients(value) {
  return value
    .split(/\r?\n/)
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);
}

function readSelectedPhoto(event, onReady) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    onReady(String(reader.result || ""));
  });
  reader.readAsDataURL(file);
}

function findMenuItem(id) {
  return menuItems.find((item) => item.id === id);
}

function createUniqueId(name) {
  const baseId =
    name
      .toLocaleLowerCase("tr")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ı/g, "i")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `urun-${Date.now()}`;

  let id = baseId;
  let count = 2;

  while (findMenuItem(id)) {
    id = `${baseId}-${count}`;
    count += 1;
  }

  return id;
}

function loadSavedMenuItems() {
  try {
    const savedItems = localStorage.getItem(menuStorageKey);
    if (!savedItems) return cloneMenuItems(baseMenuItems);

    const parsedItems = JSON.parse(savedItems);
    return Array.isArray(parsedItems) ? parsedItems : cloneMenuItems(baseMenuItems);
  } catch {
    return cloneMenuItems(baseMenuItems);
  }
}

async function loadInitialMenuItems() {
  if (!canUseServerStorage()) {
    return loadSavedMenuItems();
  }

  try {
    const response = await fetch(menuApiUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Menu API is not available.");

    const data = await response.json();
    serverStorageEnabled = true;

    if (Array.isArray(data.items)) {
      try {
        localStorage.setItem(menuStorageKey, JSON.stringify(data.items));
      } catch {
        // Server data is authoritative; localStorage is only a convenience cache.
      }
      return data.items;
    }
  } catch {
    serverStorageEnabled = false;
  }

  return loadSavedMenuItems();
}

function canUseServerStorage() {
  return window.location.protocol === "http:" || window.location.protocol === "https:";
}

async function persistMenuItems() {
  if (serverStorageEnabled) {
    try {
      const response = await fetch(menuApiUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: menuItems }),
      });

      if (!response.ok) throw new Error("Menu API save failed.");
      try {
        localStorage.setItem(menuStorageKey, JSON.stringify(menuItems));
      } catch {
        // Server save already succeeded; localStorage can fail on large image data URLs.
      }
      return true;
    } catch {
      serverStorageEnabled = false;
      showAdminStatus("storageError");
    }
  }

  try {
    localStorage.setItem(menuStorageKey, JSON.stringify(menuItems));
    return true;
  } catch {
    showAdminStatus("storageError");
    return false;
  }
}

function cloneMenuItems(items) {
  return JSON.parse(JSON.stringify(items));
}

function showAdminStatus(key) {
  const status = document.getElementById("adminStatus");
  if (status) status.textContent = translate(`admin.${key}`);
}

function renderStaticText() {
  document.documentElement.lang = state.language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });

  document.querySelectorAll("[data-language]").forEach((button) => {
    const isActive = button.dataset.language === state.language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderFilters() {
  const container = document.getElementById("categoryFilters");
  if (!container) return;

  const categoryButtons = categories;

  container.innerHTML = categoryButtons
    .map((category) => {
      const isActive = state.category === category.id;
      const label = localize(category.label);
      return `
        <button
          class="filter-button${isActive ? " is-active" : ""}"
          type="button"
          role="tab"
          aria-selected="${isActive}"
          data-category="${escapeHtml(category.id)}"
        >${escapeHtml(label)}</button>
      `;
    })
    .join("");

  container.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category || "all";
      renderFilters();
      renderMenu();
    });
  });
}

function renderMenu() {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;

  const visibleItems = menuItems.filter((item) => item.category === state.category);

  if (!visibleItems.length) {
    grid.innerHTML = `<p class="menu-empty">${escapeHtml(translate("menu.empty"))}</p>`;
    return;
  }

  const groupOrder = groupOrderByCategory[state.category] || [];
  const groupedMarkup = groupOrder
    .map((groupId) => {
      const groupItems = visibleItems.filter((item) => item.group === groupId);
      if (!groupItems.length) return "";
      return createMenuGroup(groupId, groupItems);
    })
    .join("");

  grid.innerHTML = groupedMarkup || visibleItems.map((item, index) => createMenuCard(item, index)).join("");
}

function createMenuGroup(groupId, items) {
  const group = menuGroups[groupId];
  const heading = group
    ? `
      <div class="menu-group-heading">
        <p class="eyebrow">${escapeHtml(localize(group.eyebrow))}</p>
        <h2>${escapeHtml(localize(group.title))}</h2>
      </div>
    `
    : "";

  const cards = items.map((item, index) => createMenuCard(item, index)).join("");

  return `
    <section class="menu-group" aria-label="${escapeHtml(group ? localize(group.title) : "")}">
      ${heading}
      <div class="menu-group-grid">${cards}</div>
    </section>
  `;
}

function createMenuCard(item, index) {
  const category = categories.find((entry) => entry.id === item.category);
  const categoryLabel = category ? localize(category.label) : "";
  const ingredients = localize(item.ingredients)
    .map((ingredient) => `<li>${escapeHtml(ingredient)}</li>`)
    .join("");
  const itemName = localize(item.name);
  const image = item.image
    ? `<img class="item-photo" src="${escapeHtml(item.image)}" alt="${escapeHtml(itemName)}" loading="eager" decoding="async" />`
    : "";
  const animationDelay = Math.min(index * 35, 280);

  return `
    <article class="menu-card" style="animation-delay: ${animationDelay}ms">
      <div class="item-visual visual-${escapeHtml(item.visual || "tomato")}${image ? " has-photo" : ""}"${image ? "" : ' aria-hidden="true"'}>
        ${image}
      </div>
      <div class="item-copy">
        <p class="item-category">${escapeHtml(categoryLabel)}</p>
        <div class="item-heading">
          <h3>${escapeHtml(itemName)}</h3>
          <strong class="item-price">${escapeHtml(localize(item.price))}</strong>
        </div>
        <ul class="item-ingredients">${ingredients}</ul>
      </div>
    </article>
  `;
}

function updateBusinessLinks() {
  const generalWhatsappUrl = getWhatsAppUrl();
  const links = {
    locationWhatsappLink: generalWhatsappUrl,
    mapLink: businessConfig.mapUrl,
    instagramLink: businessConfig.instagramUrl,
    phoneLink: businessConfig.phoneHref,
  };

  Object.entries(links).forEach(([id, href]) => {
    const element = document.getElementById(id);
    if (element) element.href = href;
  });

  const phoneText = document.getElementById("phoneText");
  if (phoneText) phoneText.textContent = businessConfig.phoneDisplay;

  const hoursText = document.getElementById("hoursText");
  const hours = localize(businessConfig.hours);
  if (hoursText && Array.isArray(hours)) {
    hoursText.innerHTML = hours.map(escapeHtml).join("<br>");
  }
}

function getWhatsAppUrl(itemName = "") {
  const template = itemName
    ? localize(businessConfig.itemWhatsappMessage)
    : localize(businessConfig.whatsappMessage);
  const message = template.replace("{item}", itemName);
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function translate(path) {
  return path.split(".").reduce((source, key) => source?.[key], uiText[state.language]) || path;
}

function localize(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value;
  return value?.[state.language] || value?.tr || "";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
