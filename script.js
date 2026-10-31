// Hero Slider Data
const heroSlides = [
    {
        title: "Ta'mdan tashqari bir tajriba",
        desc: "Kofe donalarining mualliflik qovurilishi, dunyo standartidagi fransuz va Yevropa taomlari hamda oliy darajadagi shinam xizmat ko'rsatish.",
        img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
    },
    {
        title: "Olov va ishtiyoq bilan yaratilgan",
        desc: "Bosh oshpazlarimiz tomonidan har bir taom alohida e'tibor va yuqori mahorat bilan tayyorlanadi.",
        img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
    },
    {
        title: "Issiq Kruassan va Yangi Kapuchino",
        desc: "Ertalabki nonushtalaringiz uchun maxsus tayyorlangan fransuz pishiriqlari va yangi damlangan kofe.",
        img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80"
    }
];
let currentSlide = 0;

// Extended Menu Data (16+ Items)
const menuData = [
    { id: 1, name: 'Espresso Speciality', category: 'coffee', price: 28000, cal: '15 kcal', time: '5 min', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80', desc: '100% Arabica Efiopiya kofe donalaridan tayyorlangan quyuq espresso.' },
    { id: 2, name: 'Cappuccino Gold', category: 'coffee', price: 35000, cal: '140 kcal', time: '7 min', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80', desc: 'Sutli ko\'pik va ustida oltin zarrachalari bilan kofe.' },
    { id: 3, name: 'Kruassan Truffel', category: 'breakfast', price: 45000, cal: '320 kcal', time: '10 min', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', desc: 'Sariyog\'li fransuz xamiri va shokoladli krem.' },
    { id: 4, name: 'Avokado Toast Pashot', category: 'breakfast', price: 52000, cal: '280 kcal', time: '12 min', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80', desc: 'Yangi avokado, pashot tuxumi va ziravorlar.' },
    { id: 5, name: 'Steyk Ribaye Luxe', category: 'mains', price: 185000, cal: '650 kcal', time: '25 min', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', desc: 'Marmar go\'shti va sarimsoqli sariyog\' sousi.' },
    { id: 6, name: 'Tiramisu Klasik', category: 'desserts', price: 42000, cal: '310 kcal', time: '8 min', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80', desc: 'Mascarpone pishloqli va kofe spirtli desert.' },
    { id: 7, name: 'Cold Brew Citrus', category: 'coffee', price: 32000, cal: '45 kcal', time: '5 min', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', desc: 'Muzli sovuq damlangan kofe va apelsin sharbati.' },
    { id: 8, name: 'Salmon Grill Yevropa', category: 'mains', price: 165000, cal: '480 kcal', time: '20 min', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80', desc: 'Losos balig\'i va sabzavotli garnir.' }
];

// Regions Data
const regionsData = [
    { id: 'toshkent', name: 'Toshkent Shahri va Viloyati', time: '25 - 35 Minut', price: 15000, desc: 'Toshkent shahri markaziy filiali orqali ekspress yetkazish.' },
    { id: 'samarqand', name: 'Samarqand Viloyati', time: '1 - 2 Soat', price: 35000, desc: 'Samarqand markaziga va yaqin tumanlarga tezkor kuryerlik.' },
    { id: 'buxoro', name: 'Buxoro Viloyati', time: '2 - 3 Soat', price: 40000, desc: 'Buxoro bo\'yicha termo-konteynerda yetkazib berish.' },
    { id: 'andijon', name: 'Andijon, Farg\'ona, Namangan', time: '2 - 3 Soat', price: 38000, desc: 'Farg\'ona vodiysi bo\'yicha maxsus ekspress delivery.' },
    { id: 'xorazm', name: 'Xorazm va Qoraqalpog\'iston', time: '3 - 4 Soat', price: 45000, desc: 'Urganch, Nukus shaharlari bo\'ylab xavfsiz yetkazish.' }
];

let cart = [];
let promoApplied = false;
let selectedRegionPrice = 15000;
let selectedTable = null;

// Slider Navigation
function updateSlide() {
    const slide = heroSlides[currentSlide];
    document.getElementById('heroTitle').innerText = slide.title;
    document.getElementById('heroDesc').innerText = slide.desc;
    document.getElementById('heroBgImage').style.backgroundImage = `url('${slide.img}')`;
    renderDots();
}
function nextSlide() { currentSlide = (currentSlide + 1) % heroSlides.length; updateSlide(); }
function prevSlide() { currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length; updateSlide(); }

// Navigation
function navigateTo(pageId) {
    document.querySelectorAll('.page-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('page-' + pageId).classList.remove('hidden');

    document.querySelectorAll('.nav-tab').forEach(el => {
        el.classList.remove('text-cafeGold', 'bg-cafeCard', 'border', 'border-cafeGold/40');
        el.classList.add('text-stone-400');
    });
    const activeTab = document.getElementById('nav-' + pageId);
    if(activeTab) {
        activeTab.classList.add('text-cafeGold', 'bg-cafeCard', 'border', 'border-cafeGold/40');
        activeTab.classList.remove('text-stone-400');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Menu Cards
function renderMenu(items) {
    const grid = document.getElementById('fullMenuGrid');
    // Hech narsa topilmasa, tushunarli xabar chiqaramiz
    if (items.length === 0) {
        grid.innerHTML = '<p class="col-span-full text-center text-stone-400 text-sm py-16">Hech narsa topilmadi. Boshqa nom bilan qidirib ko\'ring.</p>';
        return;
    }
    grid.innerHTML = items.map(item => `
        <div class="dish-card glass-cafe border border-cafeBorder p-5 rounded-2xl space-y-4 hover:border-cafeGold/50 flex flex-col justify-between group">
            <div class="space-y-3 cursor-pointer" onclick="openDishModal(${item.id})">
                <div class="h-44 overflow-hidden rounded-xl relative">
                    <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                    <span class="absolute top-2 right-2 px-2.5 py-1 bg-cafeDark/80 backdrop-blur-md border border-cafeBorder text-[10px] text-cafeGold font-bold rounded-lg">${item.cal}</span>
                        ${[2, 5, 6].includes(item.id) ? '<span class="absolute top-2 left-2 px-2.5 py-1 bg-cafeGold text-cafeDark text-[10px] font-extrabold rounded-lg"><i class="fa-solid fa-fire mr-1"></i>Mashhur</span>' : ''}
                </div>
                <h3 class="font-playfair font-bold text-base text-white group-hover:text-cafeGold transition">${item.name}</h3>
                <p class="text-xs text-stone-400 line-clamp-2 leading-relaxed">${item.desc}</p>
            </div>
            <div class="flex justify-between items-center pt-3 border-t border-cafeBorder/60">
                <span class="text-cafeGold font-bold text-sm">${item.price.toLocaleString()} UZS</span>
                <button onclick="addToCart(${item.id})" class="px-3.5 py-2 bg-cafeGold text-cafeDark font-extrabold rounded-xl text-xs hover:bg-cafeGoldDark transition">Savatga</button>
            </div>
        </div>
    `).join('');
}

function filterMenu(cat) {
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-cafeGold', 'text-cafeDark');
        btn.classList.add('bg-cafeCard', 'text-stone-300', 'border', 'border-cafeBorder');
    });
    // Bosilgan tugmani oltin rangga bo'yaymiz
    const active = document.querySelector('[data-cat="' + cat + '"]');
    active.classList.remove('bg-cafeCard', 'text-stone-300');
    active.classList.add('bg-cafeGold', 'text-cafeDark');
    document.getElementById('menuSearchInput').value = '';
    document.getElementById('sortSelect').value = 'default';

    if(cat === 'all') renderMenu(menuData);
    else renderMenu(menuData.filter(i => i.category === cat));
}

function handleMenuSearch(query) {
    const filtered = menuData.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));
    renderMenu(filtered);
}

// Dish Modal
function openDishModal(id) {
    const item = menuData.find(i => i.id === id);
    document.getElementById('modalImg').src = item.img;
    document.getElementById('modalTitle').innerText = item.name;
    document.getElementById('modalDesc').innerText = item.desc;
    document.getElementById('modalCal').innerText = item.cal;
    document.getElementById('modalTime').innerText = item.time;
    document.getElementById('modalAddBtn').onclick = () => { addToCart(item.id); closeDishModal(); };
    document.getElementById('dishModal').classList.remove('hidden');
}
function closeDishModal() { document.getElementById('dishModal').classList.add('hidden'); }

// Cart Drawer Functions
function addToCart(id) {
    const item = menuData.find(i => i.id === id);
    cart.push(item);
    updateCart();
    bumpBadge();
    showToast(`${item.name} savatga qo'shildi!`);
}

function updateCart() {
    document.getElementById('cartBadgeCount').innerText = cart.length;
    const list = document.getElementById('cartItemsList');
    list.innerHTML = cart.map((i, idx) => `
        <div class="text-xs text-white flex justify-between items-center bg-cafeCard p-3 rounded-xl border border-cafeBorder">
            <div>
                <div class="font-bold">${i.name}</div>
                <div class="text-cafeGold">${i.price.toLocaleString()} UZS</div>
            </div>
            <button onclick="removeFromCart(${idx})" class="text-stone-500 hover:text-red-400"><i class="fa-solid fa-trash"></i></button>
        </div>
    `).join('');

    // Savat bo'sh bo'lsa, foydalanuvchiga nima qilish kerakligini aytamiz
    if (cart.length === 0) {
        list.innerHTML = '<p class="text-xs text-stone-500 text-center py-10">Savat hozircha bo\'sh. Menyudan taom tanlang.</p>';
    }
    const itemsTotal = cart.reduce((sum, i) => sum + i.price, 0);
    const discount = promoApplied ? itemsTotal * 0.2 : 0;
    const grandTotal = itemsTotal - discount + selectedRegionPrice;

    document.getElementById('cartDeliveryPrice').innerText = selectedRegionPrice.toLocaleString() + ' UZS';
    document.getElementById('cartDiscountPrice').innerText = '- ' + discount.toLocaleString() + ' UZS';
    document.getElementById('cartTotalPrice').innerText = grandTotal.toLocaleString() + ' UZS';
}

function removeFromCart(idx) { cart.splice(idx, 1); updateCart(); }
function toggleCartDrawer() { document.getElementById('cartDrawer').classList.toggle('translate-x-full'); }

function applyPromo() {
    const val = document.getElementById('promoInput').value.trim().toUpperCase();
    if(val === 'CAFE20') {
        promoApplied = true;
        showToast('CAFE20 promokodi faollashdi! 20% chegirma.');
        updateCart();
    } else {
        showToast('Promokod noto\'g\'ri. CAFE20 ni kiriting.');
    }
}

function checkoutCart() {
    if(cart.length === 0) { showToast('Savat bo\'sh. Avval taom tanlang.'); return; }
    showToast('Buyurtma qabul qilindi! Kuryer tez orada bog\'lanadi.');
    cart = [];
    promoApplied = false;
    updateCart();
    toggleCartDrawer();
}

// Table Reservation

// Kafe rasmlari (dumaloqlar ichida chiqadi). O'zingizning rasmlaringizni ham qo'yishingiz mumkin.
const tablePhotos = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9'
];

// Zal nomlari (oynada chiroyli chiqishi uchun)
const hallNames = { main: 'Asosiy Zal', terrace: 'Yozgi Terrasa', vip: 'VIP Xona', music: 'Live Music' };

function selectHall(hall) {
    document.querySelectorAll('[id^="hall-"]').forEach(btn => {
        btn.classList.remove('bg-cafeGold', 'text-cafeDark', 'border-cafeGold');
        btn.classList.add('bg-cafeCard', 'text-stone-300', 'border-cafeBorder');
    });
    document.getElementById('hall-' + hall).classList.add('bg-cafeGold', 'text-cafeDark', 'border-cafeGold');

    const container = document.getElementById('tablesGrid');
    let html = '';
    for(let i=1; i<=12; i++) {
        const isOccupied = i === 3 || i === 7;
        const photo = tablePhotos[(i - 1) % tablePhotos.length];
        // Dumaloq ichida rasm, ustida qora parda va stol nomi
        html += `
            <button type="button" id="table-${i}" onclick="${isOccupied ? '' : `openTableModal('${hall}', ${i})`}"
                class="table-btn relative overflow-hidden aspect-square flex items-center justify-center border-2 rounded-full font-bold text-xs transition duration-300 ${isOccupied ? 'table-occupied' : 'bg-cafeCard border-cafeBorder text-white hover:border-cafeGold'}">
                <img src="${photo}?auto=format&fit=crop&w=300&q=80" class="absolute inset-0 w-full h-full object-cover ${isOccupied ? 'grayscale opacity-40' : ''}">
                <span class="absolute inset-0 bg-black/45"></span>
                <span class="relative ${isOccupied ? 'text-stone-400' : 'text-white'}">${hall.toUpperCase()} #${i}</span>
            </button>
        `;
    }
    container.innerHTML = html;
}

// Stol rasmi oynasini ochish
function openTableModal(hall, i) {
    const photo = tablePhotos[(i - 1) % tablePhotos.length];
    const tableId = `${hall.toUpperCase()}-STOL #${i}`;

    document.getElementById('tableModalImg').src = photo + '?auto=format&fit=crop&w=1000&q=80';
    document.getElementById('tableModalTitle').innerText = `${hallNames[hall]}: ${i}-stol`;
    // "Stolni Tanlash" bosilsa, eski selectTable funksiyasi ishlaydi
    document.getElementById('tableModalSelectBtn').onclick = () => {
        selectTable(tableId, document.getElementById('table-' + i));
        closeTableModal();
    };
    document.getElementById('tableModal').classList.remove('hidden');
}
function closeTableModal() { document.getElementById('tableModal').classList.add('hidden'); }

// Qora fonni bosganda ham oyna yopiladi
document.getElementById('tableModal').addEventListener('click', e => {
    if (e.target.id === 'tableModal') closeTableModal();
});

function selectTable(tableId, btn) {
    selectedTable = tableId;
    document.getElementById('selectedTableDisplay').value = tableId;
    // Oldingi tanlovni tozalab, yangisini oltin rangga bo'yaymiz
    document.querySelectorAll('.table-btn').forEach(b => b.classList.remove('table-selected'));
    btn.classList.add('table-selected');
    showToast(`${tableId} tanlandi!`);
}

function handleReservationSubmit(e) {
    e.preventDefault();
    if(!selectedTable) { showToast('Avval sxemadan stolni tanlang.'); return; }
    showToast(`${selectedTable} band qilindi. Tasdiqlash uchun qo'ng'iroq qilamiz.`);
}

// Custom Builders Logic
function calcCoffeePrice() {
    let price = parseInt(document.getElementById('coffeeBase').value);
    let cal = parseInt(document.getElementById('coffeeBase').options[document.getElementById('coffeeBase').selectedIndex].dataset.cal);
    price += parseInt(document.getElementById('milkType').value);
    cal += parseInt(document.getElementById('milkType').options[document.getElementById('milkType').selectedIndex].dataset.cal);

    document.querySelectorAll('.coffee-top:checked').forEach(c => {
        price += parseInt(c.value);
        cal += parseInt(c.dataset.cal);
    });

    document.getElementById('customCoffeePrice').innerText = price.toLocaleString() + ' UZS';
    document.getElementById('customCoffeeCal').innerText = cal + ' kcal';
    return price;
}

function addCustomCoffeeToCart() {
    const price = calcCoffeePrice();
    cart.push({ name: 'Mualliflik Barista Kofesi', price: price });
    updateCart();
    showToast('Eksklyuziv kofe savatga qo\'shildi!');
}

function calcPizzaPrice() {
    let price = parseInt(document.getElementById('pizzaSize').value);
    document.querySelectorAll('.pizza-top:checked').forEach(c => price += parseInt(c.value));
    document.getElementById('customPizzaPrice').innerText = price.toLocaleString() + ' UZS';
    return price;
}

function addCustomPizzaToCart() {
    const price = calcPizzaPrice();
    cart.push({ name: 'Konstruktor Pitsasi', price: price });
    updateCart();
    showToast('Eksklyuziv pitsa savatga qo\'shildi!');
}

// Regions List
function renderRegions() {
    const list = document.getElementById('regionsList');
    list.innerHTML = regionsData.map(r => `
        <button onclick="selectRegion('${r.id}')" class="w-full text-left p-3.5 bg-cafeCard border border-cafeBorder hover:border-cafeGold rounded-xl text-xs font-bold text-white transition block">
            <i class="fa-solid fa-location-dot text-cafeGold mr-2"></i> ${r.name}
        </button>
    `).join('');
}

function selectRegion(id) {
    const region = regionsData.find(r => r.id === id);
    document.getElementById('regionTitle').innerText = region.name;
    document.getElementById('regionDesc').innerText = region.desc;
    document.getElementById('regionTime').innerText = region.time;
    document.getElementById('regionPrice').innerText = region.price.toLocaleString() + ' UZS';
    selectedRegionPrice = region.price;
    updateCart();
}

// FAQ Accordion
function toggleFaq(id) {
    const ans = document.getElementById(`faq-ans-${id}`);
    const icon = document.getElementById(`faq-icon-${id}`);
    ans.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}

// Modals & Subscriptions
function openVideoModal() { document.getElementById('videoModal').classList.remove('hidden'); }
function closeVideoModal() { document.getElementById('videoModal').classList.add('hidden'); }

function handleSubscribe(e) {
    e.preventDefault();
    showToast('Obuna bo\'ldingiz. Rahmat!');
}

function showToast(msg) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'bg-cafeGold text-cafeDark font-extrabold text-xs p-3.5 rounded-xl shadow-2xl transition duration-300 border border-white/20';
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

// Esc tugmasi oynalarni va savatni yopadi
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeDishModal();
        closeVideoModal();
        closeTableModal();
        document.getElementById('cartDrawer').classList.add('translate-x-full');
    }
});

// Hero rasmlari 6 soniyada o'zi almashadi
setInterval(nextSlide, 6000);

// Bron sanasi bugundan oldin bo'lmasin
document.getElementById('resDate').min = new Date().toISOString().split('T')[0];

// Init App
renderMenu(menuData);
selectHall('main');
renderRegions();

// Jonli buyurtma tracker: har 3 soniyada keyingi bosqichga o'tadi
const trackerSteps = [
    { icon: 'fa-check-double', name: 'Qabul qilindi' },
    { icon: 'fa-fire', name: 'Tayyorlanmoqda' },
    { icon: 'fa-motorcycle', name: "Yo'lda" },
    { icon: 'fa-house-chimney', name: 'Yetkazildi' }
];
let trackerNow = 1;

function renderTracker() {
    document.getElementById('trackerSteps').innerHTML = trackerSteps.map((st, i) => {
        let color = 'bg-cafeDark border border-cafeBorder text-stone-500';
        if (i < trackerNow) color = 'bg-cafeGold text-cafeDark';
        else if (i === trackerNow) color = 'bg-cafeCard border border-cafeGold text-cafeGold';
        const pulse = i === trackerNow ? ' animate-pulse' : '';
        return `<div class="p-4 rounded-2xl font-bold text-xs space-y-1 transition duration-500 ${color}">
                    <i class="fa-solid ${st.icon} text-lg block${pulse}"></i>
                    <span>${i + 1}. ${st.name}</span>
                </div>`;
    }).join('');
}

renderTracker();
setInterval(() => { trackerNow = (trackerNow + 1) % (trackerSteps.length + 1); renderTracker(); }, 3000);

// Hero slayd nuqtalari: joriy slayd uzun oltin chiziq bo'ladi
function renderDots() {
    document.getElementById('heroDots').innerHTML = heroSlides.map((s, i) =>
        `<span class="h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-10 bg-cafeGold' : 'w-4 bg-stone-600'}"></span>`
    ).join('');
}
renderDots();

// Menyuni narx bo'yicha tartiblash
function sortMenu(type) {
    const list = [...menuData];
    if (type === 'cheap') list.sort((a, b) => a.price - b.price);
    if (type === 'expensive') list.sort((a, b) => b.price - a.price);
    renderMenu(list);
}

// Savat belgisini sakratish
function bumpBadge() {
    const badge = document.getElementById('cartBadgeCount');
    badge.classList.remove('bump');
    void badge.offsetWidth; // animatsiyani qaytadan boshlash uchun
    badge.classList.add('bump');
}

// Raqamlar ekranga kelganda 0 dan sanab chiqadi
function runCounter(el) {
    const to = Number(el.dataset.to);
    const step = Math.max(1, Math.ceil(to / 40));
    let n = 0;
    const timer = setInterval(() => {
        n = Math.min(n + step, to);
        el.innerText = n + el.dataset.suffix;
        if (n >= to) clearInterval(timer);
    }, 40);
}
const counterWatcher = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) { runCounter(e.target); counterWatcher.unobserve(e.target); }
    });
});
document.querySelectorAll('.counter').forEach(c => counterWatcher.observe(c));

// Yuqoriga qaytish tugmasi pastga tushganda ko'rinadi
window.addEventListener('scroll', () => {
    const btn = document.getElementById('topBtn');
    const show = window.scrollY > 500;
    btn.classList.toggle('opacity-0', !show);
    btn.classList.toggle('pointer-events-none', !show);
});

// Kirish ekrani: sahifa yuklangach 1.4 soniyadan keyin silliq yo'qoladi
window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    setTimeout(() => {
        splash.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => splash.remove(), 700);
    }, 1400);
});

// Sichqoncha nuri va skroll chizig'i
document.addEventListener('mousemove', e => {
    document.getElementById('cursorGlow').style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    document.getElementById('scrollBar').style.width = (window.scrollY / total * 100) + '%';
});

// "Menga taom tanla": tasodifiy taomni oynada ochadi
function randomDish() {
    const item = menuData[Math.floor(Math.random() * menuData.length)];
    openDishModal(item.id);
}

// Yarim kechagacha qolgan vaqt
function updateCountdown() {
    const end = new Date();
    end.setHours(24, 0, 0, 0);
    const s = Math.floor((end - new Date()) / 1000);
    const two = n => String(n).padStart(2, '0');
    document.getElementById('countdown').innerText =
        two(Math.floor(s / 3600)) + ':' + two(Math.floor(s % 3600 / 60)) + ':' + two(s % 60);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Taom kartochkalari sichqoncha tomon biroz egiladi (3D effekt)
const menuGridEl = document.getElementById('fullMenuGrid');
menuGridEl.addEventListener('mousemove', e => {
    const card = e.target.closest('.dish-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
});
menuGridEl.addEventListener('mouseout', e => {
    const card = e.target.closest('.dish-card');
    if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
});