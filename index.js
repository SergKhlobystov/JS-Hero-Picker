import { heroesData } from './data.js'

const appHeader = document.querySelector('header');

const lightBtn = document.getElementById('light')
const darkBtn = document.getElementById('dark') // Берем контроль над кнопками вибору фракції

const chooseHeroBtn = document.getElementById('choose-hero-btn')

const resetFractionBtn = document.getElementById('reset-fraction-btn')
const galleryBtn = document.getElementById('gallery-btn')

const heroesContainer = document.getElementById('heroes')
const heroesListContainer = document.getElementById('heroes-list')

//ЗНАХОДИМО КОНТЕЙНЕР ДЛЯ КНОПОК
const fractionContainer = document.getElementById('fraction')

// Робимо списки світлих та темних героїв:

const lightHeroes = heroesData.filter(hero => !hero.isEvil)
const darkHeroes = heroesData.filter(hero => hero.isEvil)


const yourHero = document.getElementById('your-hero')
const wizardBio = document.getElementById('wizard-bio')
const wizardNameR = document.getElementById('wizard-name-render')
const wizardBioR = document.getElementById('wizard-bio-render')

const galleryScreen = document.getElementById('gallery-screen')

const lightHeroesList = heroesData
    .filter(hero => !hero.isEvil)
    .map(hero => ({
        name: hero.name[0], 
        class: hero.class[0]
    }));

const darkHeroesList = heroesData
    .filter(hero => hero.isEvil)
    .map(hero => ({
        name: hero.name[0],
        class: hero.class[0]
    }));


function renderHeroesList(heroesArray) {
    let htmlContent = ''
    for (let hero of heroesArray) {
        const name = hero.name;
        const className = hero.class;

        htmlContent += `
            <div class="hero-item">
                <input 
                    type="radio" 
                    id="${name.replace(/\s+/g, '-')}" 
                    name="selectedHero" 
                    value="${name}"
                >
                <label for="${name.replace(/\s+/g, '-')}" title="${className}">
                    ${name} (${className})
                </label>
            </div>
        `;
    }

    return htmlContent;

}

// index.js

lightBtn.addEventListener('click', () => {
    // ЛОГІКА КЕРУВАННЯ ВИДИМІСТЮ:
    // 1. Приховуємо контейнер фракції
    fractionContainer.style.display = 'none'; 
    
    // 2. Показуємо контейнер героїв
    heroesContainer.style.display = 'flex'; // або 'flex', залежно від твого CSS
    
    // ЛОГІКА ГЕНЕРАЦІЇ СПИСКУ:
    const htmlToInsert = renderHeroesList(lightHeroesList);
    heroesListContainer.innerHTML = htmlToInsert;
});


darkBtn.addEventListener('click', () => {
    // ЛОГІКА КЕРУВАННЯ ВИДИМІСТЮ:
    // 1. Приховуємо контейнер фракції
    fractionContainer.style.display = 'none'; 
    
    // 2. Показуємо контейнер героїв
    heroesContainer.style.display = 'flex'; 
    
    // ЛОГІКА ГЕНЕРАЦІЇ СПИСКУ:
    const htmlToInsert = renderHeroesList(darkHeroesList);
    heroesListContainer.innerHTML = htmlToInsert;
});

chooseHeroBtn.addEventListener('click', () => {
    // 1. ЗНАХОДИМО ВИБРАНЕ ІМ'Я
    const selectedRadio = document.querySelector('input[name="selectedHero"]:checked');
    if (!selectedRadio) {
        alert('Please select a hero first!');
        return;
    }
    const heroName = selectedRadio.value;

    // 2. ЗНАХОДИМО ПОВНИЙ ОБ'ЄКТ ГЕРОЯ
    const selectedHeroObject = heroesData.find(hero => hero.name[0] === heroName);
    if (!selectedHeroObject) {
        console.error('Hero data not found!');
        return; 
    }

    // 3. РЕНДЕРИМО ІМ'Я та БІО
    wizardNameR.textContent = selectedHeroObject.name[0];
    wizardBioR.textContent = selectedHeroObject.bio[0];

    // 4. РЕНДЕРИМО ВІДЕО
    const heroVideo = yourHero.querySelector('video');
    const videoSource = heroVideo.querySelector('source');
    
    videoSource.src = `/video/${selectedHeroObject.video}`;
    heroVideo.load();
    
    // 5. ЗМІНЮЄМО ВИДИМІСТЬ
    heroesContainer.style.display = 'none';
    yourHero.style.display = 'flex';
    wizardBio.style.display = 'flex';
});


resetFractionBtn.addEventListener('click', () => {
    
    // 1. ПРИХОВУЄМО ЕКРАН ПЕРЕГЛЯДУ ГЕРОЯ
    yourHero.style.display = 'none';
    wizardBio.style.display = 'none';
    
    // 2. ПРИХОВУЄМО ЕКРАН ВИБОРУ ГЕРОЇВ (на випадок, якщо ми були на ньому)
    heroesContainer.style.display = 'none';
    
    // 3. ОЧИЩУЄМО СПИСОК (це не обов'язково, але робить інтерфейс чистішим)
    heroesListContainer.innerHTML = '';
    
    // 4. ПОКАЗУЄМО ЕКРАН ВИБОРУ ФРАКЦІЇ (головний екран)
    fractionContainer.style.display = 'flex';

    //5. Галерею теж приховуємо:
    galleryScreen.style.display = 'none';

    //6.Повертаємо Хедер
    appHeader.style.display = 'block';

    //7.Повертаємо фон
    document.body.style.backgroundImage = 'url("/images/bg_main.jpg")';
    
});

// index.js (додай десь поряд з renderHeroesList)


/**
 * Генерує HTML-контент Галереї з усіма героями
 */
function renderGallery() {
    let galleryHTML = '';
    
    // Функція для рендерингу блоку фракції
    const renderFractionBlock = (heroes, title) => {
        let blockHTML = `<h2>${title}</h2><div class="gallery-grid">`;
        
        // Використовуємо .map() для створення рядків HTML для кожного героя
        const heroCards = heroes.map(hero => {
            // Використовуємо hero.name[0] та hero.image
            return `
                <div class="hero-card" data-full-img="./images/${hero.image}">
                    <img 
                        src="./images/${hero.image}" 
                        alt="${hero.name}" 
                        class="gallery-img"
                        style="width: 200px;" 
                    >
                    <p class="hero-name-label">${hero.name}</p>
                </div>
            `;
        }).join(''); // Об'єднуємо всі картки в один рядок
        
        blockHTML += heroCards;
        blockHTML += `</div>`;
        return blockHTML;
    };

    // 1. Рендеримо Темних героїв
    galleryHTML += renderFractionBlock(darkHeroes, 'All Dark Wizards');

    // 2. Рендеримо Світлих героїв
    galleryHTML += renderFractionBlock(lightHeroes, 'All Light Sorcerers');

    return galleryHTML;
}

galleryBtn.addEventListener('click', () => {
    
    // 1. ПРИХОВУЄМО ВСІ ПОПЕРЕДНІ ЕКРАНИ
    appHeader.style.display = 'none';
    fractionContainer.style.display = 'none';
    heroesContainer.style.display = 'none';
    yourHero.style.display = 'none';
    wizardBio.style.display = 'none';

    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Для більш плавного переходу (за бажанням)
    });
    
    // 2. ЗМІНА ФОНУ
    document.body.style.backgroundImage = 'url("images/bg_all_heroes2.jpg")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';

    // 3. РЕНДЕРИМО КОНТЕНТ ГАЛЕРЕЇ
    const galleryHTMLContent = renderGallery();
    galleryScreen.innerHTML = galleryHTMLContent;

    // 4. ПОКАЗУЄМО ЕКРАН ГАЛЕРЕЇ
    galleryScreen.style.display = 'block'; // Використовуємо 'block' для скролінгу

    // 5. ДОДАЄМО ОБРОБНИК КЛІКУ НА КАРТИНКИ (Див. Крок 6)
    addGalleryImageClickListener();
});


function addGalleryImageClickListener() {
    const cards = galleryScreen.querySelectorAll('.hero-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxName = document.getElementById('lightbox-name');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.dataset.fullImg;
            const heroName = card.querySelector('.hero-name-label')?.textContent ?? '';

            lightboxImg.src = imgSrc;
            lightboxName.textContent = heroName;

            lightbox.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    });

    // Закриття по фону
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Закриття хрестиком
    document.getElementById('lightbox-close')
        .addEventListener('click', closeLightbox);

    // Закриття по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}
