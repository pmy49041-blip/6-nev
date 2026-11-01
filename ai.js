// ===== YORDAMCHI: tez savollarga javob beradi =====
// Bu fayl script.js dan KEYIN ulanadi. Shuning uchun menuData, regionsData,
// tableSeats, hallNames kabi ma'lumotlarni script.js dan to'g'ridan-to'g'ri olamiz.
// Menyuni o'zgartirsangiz, yordamchi javoblari ham o'zi yangilanadi.

const aiPanel = document.getElementById('aiPanel');
const aiMessages = document.getElementById('aiMessages');
const aiInput = document.getElementById('aiInput');
const aiChips = document.getElementById('aiChips');

// Pastdagi tezkor savol tugmalari
const aiTezSavollar = ['Ish vaqti', 'Manzil', 'Yetkazib berish', 'Promo-kod', 'Menga nimadir tavsiya qil', 'Stol bron qilish'];

// Viloyat nomini savolda topish uchun so'zlar
const hududSozlari = {
    toshkent: ['toshkent'],
    samarqand: ['samarqand'],
    buxoro: ['buxoro'],
    andijon: ['andijon', "farg'ona", 'namangan'],
    xorazm: ['xorazm', 'urganch', 'nukus', 'qoraqalpog']
};

// Kategoriya so'zlari (menuData dagi category bilan mos)
const kategoriyaSozlari = [
    { sozlar: ['kofe', 'salqin', 'ichimlik'], kategoriya: 'coffee', nom: 'Kofe va salqin ichimliklar' },
    { sozlar: ['nonushta'], kategoriya: 'breakfast', nom: 'Nonushta' },
    { sozlar: ['desert', 'shirinlik'], kategoriya: 'desserts', nom: 'Desertlar' },
    { sozlar: ['asosiy'], kategoriya: 'mains', nom: 'Asosiy taomlar' }
];

// Taom nomini boshqacha yozishganda ham topish uchun (so'z -> taom id si)
const taomSinonim = { kapuchino: 2, kapuccino: 2, kruasan: 3, tost: 4, stek: 5, losos: 8, baliq: 8 };

let aiBoshlandi = false;

// ----- Kichik yordamchi funksiyalar -----
function aiTozala(matn) {
    // Kichik harfga o'tkazamiz va har xil apostroflarni bitta ko'rinishga keltiramiz
    return matn.toLowerCase().replace(/[‘’ʻʼ`´]/g, "'").trim();
}

function bormi(q, sozlar) {
    return sozlar.some(soz => q.includes(soz));
}

function pul(son) {
    return son.toLocaleString() + ' UZS';
}

function taomTop(q) {
    // 1) sinonimlar bo'yicha, 2) taom nomining birinchi so'zi bo'yicha
    for (const soz in taomSinonim) {
        if (q.includes(soz)) return menuData.find(t => t.id === taomSinonim[soz]);
    }
    return menuData.find(t => q.includes(t.name.toLowerCase().split(' ')[0]));
}

// Javob ostidagi tugmalar
const xaritaTugma = { nom: 'Xaritani ochish', bos: () => navigateTo('builder'), yop: true };
const menyuTugma = { nom: "Menyuga o'tish", bos: () => navigateTo('menu'), yop: true };
const bronTugma = { nom: "Bron qilishga o'tish", bos: () => navigateTo('reservation'), yop: true };

// ----- Asosiy qism: savolga javob topish -----
function aiJavob(q) {

    if (bormi(q, ['promo', 'cafe20', 'chegirma', 'aksiya', 'kupon'])) {
        return {
            matn: "CAFE20 promo-kodi 20% chegirma beradi. Savatni oching, kodni yozing va «Qo'llash» tugmasini bosing. Kod bugun yarim kechagacha amal qiladi.",
            tugmalar: [{ nom: 'Savatni ochish', bos: toggleCartDrawer, yop: true }]
        };
    }

    if (bormi(q, ['ish vaqt', 'ochiq', 'yopiq', 'yopil', 'ochil', 'soat nechada', 'qachongacha'])) {
        return { matn: 'Dushanba–Juma: 08:00–23:00\nShanba–Yakshanba: 09:00–00:00' };
    }

    if (bormi(q, ['manzil', 'qayerda', 'qayerga', 'adres', 'joylash', 'lokatsiya'])) {
        return {
            matn: "Toshkent sh., Amir Temur shoh ko'chasi, 42.",
            tugmalar: [{
                nom: 'Google Maps',
                bos: () => window.open('https://www.google.com/maps/search/?api=1&query=Toshkent+Amir+Temur+shoh+kochasi+42', '_blank'),
                yop: false
            }]
        };
    }

    if (bormi(q, ['telefon', 'nomer', 'aloqa', "qo'ng'iroq", "bog'lan"])) {
        return { matn: 'Telefon: +998 (71) 200-00-00' };
    }

    // Yetkazib berish yoki viloyat nomi
    const hudud = regionsData.find(r => bormi(q, hududSozlari[r.id]));
    if (hudud || bormi(q, ['yetkaz', 'delivery', 'dostavka', 'kuryer'])) {
        if (hudud) {
            return {
                matn: `${hudud.name}: ${hudud.time}, narxi ${pul(hudud.price)}.\n${hudud.desc}`,
                tugmalar: [xaritaTugma]
            };
        }
        const royxat = regionsData.map(r => `• ${r.name}: ${r.time}, ${pul(r.price)}`).join('\n');
        return { matn: "O'zbekiston bo'ylab yetkazib beramiz:\n" + royxat, tugmalar: [xaritaTugma] };
    }

    if (bormi(q, ['bron', 'stol', 'band qil', 'rezerv', 'oldindan', 'depozit'])) {
        const zallar = Object.values(hallNames).join(', ');
        const enKam = Math.min(...tableSeats);
        const enKop = Math.max(...tableSeats);
        return {
            matn: `Oddiy stol bron qilish bepul. Zallar: ${zallar}. Har bir zalda 12 tadan stol bor (${enKam} dan ${enKop} kishilikkacha).\n` +
                "Zalni tanlang, stol rasmini bosing, so'ng ism, telefon, sana va vaqtni yozing. Faqat VIP xona va bayramona bezatish uchun oldindan depozit olinishi mumkin.",
            tugmalar: [bronTugma]
        };
    }

    if (bormi(q, ['kiyim', 'dress'])) {
        return { matn: "Biz Smart Casual uslubini qo'llab-quvvatlaymiz. Sport kiyimida kelish tavsiya etilmaydi." };
    }

    if (bormi(q, ['musiqa', 'jazz', 'pianino'])) {
        return { matn: "Har juma va shanba kunlari jazz va pianino ijrosida jonli musiqa bo'ladi. «Live Music» zalidan stol band qilishingiz mumkin.", tugmalar: [bronTugma] };
    }

    if (bormi(q, ['oshpaz', 'chef', 'barista', 'konditer'])) {
        return { matn: 'Bosh oshpaz: Jean-Luc Dupont\nBosh konditer: Elena Rostova\nChempion barista: Jasur Rahimov' };
    }

    if (bormi(q, ['pitsa', 'pizza', 'konstruktor'])) {
        return {
            matn: "«Buyurtma & Xarita» bo'limida o'zingiz kofe va pitsa yig'ishingiz mumkin. Pitsa narxi 55 000 UZS dan boshlanadi, narx va kaloriya tanlovingizga qarab o'zi hisoblanadi.",
            tugmalar: [{ nom: 'Konstruktorni ochish', bos: () => navigateTo('builder'), yop: true }]
        };
    }

    if (bormi(q, ['savat', 'buyurtma', 'zakaz'])) {
        return {
            matn: "Menyudan taomning «Savatga» tugmasini bosing, so'ng yuqoridagi savat belgisini oching. Promo-kodni yozing va «Buyurtmani Rasmiylashtirish» tugmasini bosing.",
            tugmalar: [menyuTugma]
        };
    }

    if (bormi(q, ['arzon', 'qimmat'])) {
        const tartib = [...menuData].sort((a, b) => a.price - b.price);
        const arzon = tartib[0];
        const qimmat = tartib[tartib.length - 1];
        return { matn: `Eng arzon taom: ${arzon.name} (${pul(arzon.price)}).\nEng qimmat taom: ${qimmat.name} (${pul(qimmat.price)}).` };
    }

    if (bormi(q, ['tavsiya', 'maslahat', 'nima yeyish', 'nima buyurt', 'mashhur'])) {
        return {
            matn: 'Mehmonlarimiz ko\'proq tanlaydigan taomlar: Cappuccino Gold, Steyk Ribaye Luxe va Tiramisu Klasik.\nBugungi tavsiya: Steyk Ribaye Luxe (185 000 UZS).',
            tugmalar: [
                { nom: 'Steykni ko\'rish', bos: () => openDishModal(5), yop: false },
                { nom: 'Menga taom tanla', bos: randomDish, yop: false }
            ]
        };
    }

    // Aniq taom nomi so'ralgan bo'lsa
    const taom = taomTop(q);
    if (taom) {
        return {
            matn: `${taom.name}\n${taom.desc}\nNarxi: ${pul(taom.price)}\nKaloriya: ${taom.cal}, tayyorlanish vaqti: ${taom.time}`,
            tugmalar: [
                { nom: "Savatga qo'shish", bos: () => addToCart(taom.id), yop: false },
                { nom: 'Batafsil', bos: () => openDishModal(taom.id), yop: false }
            ]
        };
    }

    // Kategoriya so'ralgan bo'lsa
    for (const k of kategoriyaSozlari) {
        if (bormi(q, k.sozlar)) {
            const royxat = menuData
                .filter(t => t.category === k.kategoriya)
                .map(t => `• ${t.name}: ${pul(t.price)}`)
                .join('\n');
            return { matn: k.nom + ':\n' + royxat, tugmalar: [menyuTugma] };
        }
    }

    if (bormi(q, ['menyu', 'taom', 'nima bor', 'narx', 'kaloriya', 'kcal'])) {
        const narxlar = menuData.map(t => t.price);
        return {
            matn: `Menyuda ${menuData.length} ta taom bor: kofe, nonushta, asosiy taomlar va desertlar. Narxlar ${pul(Math.min(...narxlar))} dan ${pul(Math.max(...narxlar))} gacha. Har bir taomning kaloriyasi kartochkada ko'rsatilgan.`,
            tugmalar: [menyuTugma]
        };
    }

    if (bormi(q, ['rahmat', 'raxmat', 'tashakkur'])) {
        return { matn: 'Arzimaydi! Yana savol bo\'lsa, yozing.' };
    }

    if (bormi(q, ['salom', 'assalom', 'hayrli', 'hello'])) {
        return { matn: 'Salom! Menyu, narx, ish vaqti, yetkazib berish yoki stol bron qilish haqida so\'rang.' };
    }

    // Hech narsa topilmasa
    return {
        matn: "Bu savolga aniq javob topa olmadim. Menyu, narxlar, ish vaqti, manzil, yetkazib berish, promo-kod yoki stol bron qilish haqida so'rab ko'ring.\nYoki qo'ng'iroq qiling: +998 (71) 200-00-00."
    };
}

// ----- Oynani boshqarish -----
function aiXabar(matn, kimdan) {
    const quti = document.createElement('div');
    quti.className = kimdan === 'user'
        ? 'ml-auto max-w-[85%] bg-cafeGold text-cafeDark font-semibold rounded-2xl rounded-br-sm px-3.5 py-2.5 whitespace-pre-line'
        : 'mr-auto max-w-[90%] bg-cafeCard border border-cafeBorder text-stone-200 rounded-2xl rounded-bl-sm px-3.5 py-2.5 leading-relaxed whitespace-pre-line';
    // textContent ishlatamiz: foydalanuvchi yozgan matn kod sifatida ishlamaydi (xavfsiz)
    quti.textContent = matn;
    aiMessages.appendChild(quti);
    aiMessages.scrollTop = aiMessages.scrollHeight;
    return quti;
}

function aiTugmalarQosh(quti, tugmalar) {
    const qator = document.createElement('div');
    qator.className = 'flex flex-wrap gap-2 mt-3';
    tugmalar.forEach(t => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = t.nom;
        btn.className = 'px-3 py-1.5 bg-cafeGold text-cafeDark font-bold rounded-lg text-[11px] hover:bg-cafeGoldDark transition';
        btn.onclick = () => {
            t.bos();
            if (t.yop) aiOch(false);
        };
        qator.appendChild(btn);
    });
    quti.appendChild(qator);
    aiMessages.scrollTop = aiMessages.scrollHeight;
}

function aiSavol(matn) {
    if (!matn.trim()) return;
    aiXabar(matn, 'user');
    aiInput.value = '';

    // "Yozmoqda..." belgisi, keyin javob chiqadi
    const yozmoqda = aiXabar('Yozmoqda...', 'bot');
    yozmoqda.classList.add('animate-pulse', 'text-stone-400');
    setTimeout(() => {
        yozmoqda.remove();
        const javob = aiJavob(aiTozala(matn));
        const quti = aiXabar(javob.matn, 'bot');
        if (javob.tugmalar) aiTugmalarQosh(quti, javob.tugmalar);
    }, 600);
}

function aiOch(ochiq) {
    aiPanel.classList.toggle('hidden', !ochiq);
    if (!ochiq) return;

    // Birinchi ochilganda salomlashamiz va tezkor tugmalarni chizamiz
    if (!aiBoshlandi) {
        aiBoshlandi = true;
        aiXabar("Salom! Men Gourmet Luxe yordamchisiman. Menyu, narx, ish vaqti, yetkazib berish yoki stol bron qilish bo'yicha tez savol bering.", 'bot');
        aiChips.innerHTML = '';
        aiTezSavollar.forEach(savol => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.textContent = savol;
            chip.className = 'shrink-0 px-3 py-1.5 bg-cafeCard border border-cafeBorder hover:border-cafeGold text-stone-300 hover:text-cafeGold rounded-full text-[11px] font-bold transition whitespace-nowrap';
            chip.onclick = () => aiSavol(savol);
            aiChips.appendChild(chip);
        });
    }
    aiInput.focus();
}

// ----- Hodisalarni ulash -----
document.getElementById('aiButton').addEventListener('click', () => aiOch(aiPanel.classList.contains('hidden')));
document.getElementById('aiClose').addEventListener('click', () => aiOch(false));
document.getElementById('aiForm').addEventListener('submit', e => {
    e.preventDefault();
    aiSavol(aiInput.value);
});
// Esc tugmasi yordamchi oynasini ham yopadi
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') aiOch(false);
});