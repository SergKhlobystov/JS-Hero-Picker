import { heroesData } from './data.js'

const lightBtn = document.getElementById('light')
const darkBtn = document.getElementById('dark') // Берем контроль над кнопками вибору фракції

const heroesContainer = document.getElementById('heroes')
//ЗНАХОДИМО КОНТЕЙНЕР ДЛЯ КНОПОК
const fractionContainer = document.getElementById('fraction'); 

// Робимо списки світлих та темних героїв:

const lightHeroes = heroesData.filter(hero => !hero.isEvil);
const darkHeroes = heroesData.filter(hero => hero.isEvil);

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
    heroesContainer.style.display = 'block'; // або 'flex', залежно від твого CSS
    
    // ЛОГІКА ГЕНЕРАЦІЇ СПИСКУ:
    const htmlToInsert = renderHeroesList(lightHeroesList);
    heroesContainer.innerHTML = htmlToInsert;
});


darkBtn.addEventListener('click', () => {
    // ЛОГІКА КЕРУВАННЯ ВИДИМІСТЮ:
    // 1. Приховуємо контейнер фракції
    fractionContainer.style.display = 'none'; 
    
    // 2. Показуємо контейнер героїв
    heroesContainer.style.display = 'block'; 
    
    // ЛОГІКА ГЕНЕРАЦІЇ СПИСКУ:
    const htmlToInsert = renderHeroesList(darkHeroesList);
    heroesContainer.innerHTML = htmlToInsert;
});