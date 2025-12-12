import { heroesData } from './data.js'

const lightBtn = document.getElementById('light')
const darkBtn = document.getElementById('dark') // Берем контроль над кнопками вибору фракції

const heroesContainer = document.getElementById('heroes')

// Робимо списки світлих та темних героїв:

const lightHeroes = heroesData.filter(hero => !hero.isEvil);
const darkHeroes = heroesData.filter(hero => hero.isEvil);

// 2. Проєкція (Map): беремо кожен повний об'єкт і повертаємо НОВИЙ об'єкт 
//    з потрібними нам полями (Name та Class).
const lightHeroesList = fullLightHeroes.map(hero => ({
    // Беремо перший елемент з масиву name та class (наприклад, "Alice Lightbringer")
    name: hero.name[0], 
    class: hero.class[0]
}));

const darkHeroesList = heroesData
    .filter(hero => hero.isEvil) // Фільтруємо злих
    .map(hero => ({              // Проєктуємо, залишаючи лише name та class
        name: hero.name[0],
        class: hero.class[0]
    }));

function renderHeroesList(heroesArray) {
    let htmlContent = ''
    for (let hero of heroesArray) {
        
    }
}