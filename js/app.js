import data from '../lang.json' with {type: 'json'};

const $ = document
const btnChangeTheme = $.querySelector('#change-theme')
const btnChangeThemeMenu = $.querySelector('#changeTheme')
const html = $.querySelector('html')
const peer = $.querySelector('.peer')

function changeTheme() {
    html.classList.toggle('dark')
    html.className.includes('dark') ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light')
    setInnerHtmlBtnTheme()
}

function setInnerHtmlBtnTheme() {
    if (html.className.includes('dark')) {
        btnChangeThemeMenu.innerHTML = 'Light'
    } else {
        btnChangeThemeMenu.innerHTML = 'Dark'
    }
}

function setTheme() {
    const theme = localStorage.getItem('theme')
    if (theme === 'light') {
        peer.checked = false
        html.classList.remove('dark')
    } else {
        peer.checked = true
        html.classList.add('dark')
    }
    setInnerHtmlBtnTheme()
}

window.addEventListener('load', setTheme)
btnChangeTheme.addEventListener('click', changeTheme)
btnChangeThemeMenu.addEventListener('click', changeTheme)
// menu mobile
const menuBtn = $.querySelector('#menuBtn')
const menu = $.querySelector('#menu')
const clsBtn = $.querySelector('#clsBtn')

function openMenu() {
    if (menu.className.includes('hidden')) {
        menu.classList.remove('hidden')
        menu.classList.add('flex')
    } else {
        menu.classList.add('hidden')
        menu.classList.remove('flex')
    }
}

menuBtn.addEventListener('click', openMenu)
clsBtn.addEventListener('click', openMenu)

// change language

const root = $.querySelector(':root')
const selectLang = $.querySelector('#selectLang')
const selectLangTow = $.querySelector('#selectLang-2')

function langHandler(lang) {
    localStorage.setItem('lang', lang)
    let language = localStorage.getItem('lang')
    html.lang = language
    language === 'en' ? html.dir = 'ltr' : html.dir = 'rtl'
    language === 'en' ? root.style.setProperty('--fontFamily', 'Poetsen One') : root.style.setProperty('--fontFamily', 'iranSans')
    const elements = $.querySelectorAll('.lang')
    elements.forEach(el => {
        const key = el.dataset.lang
        Boolean(el.placeholder) ? el.placeholder = data[lang][key] : el.innerHTML = data[lang][key]
    })
}

// function setLangBtnTheme(lang, btnValue) {
//     lang === 'en' && btnValue === 'Dark' ? btnChangeThemeMenu.innerHTML = 'Light' :
//         lang === 'en' && btnValue === 'Light' ? btnChangeThemeMenu.innerHTML = 'Dark' :
//             lang === 'fa' && btnValue === 'Dark' ? btnChangeThemeMenu.innerHTML = 'روشن' :
//                 lang === 'fa' && btnValue === 'Light' ? btnChangeThemeMenu.innerHTML = 'تاریک' : ''
//
// }

function setLanguage() {
    let language = localStorage.getItem('lang')
    selectLang.value = language
    selectLangTow.value = language
    langHandler(language)
}

window.addEventListener('load', setLanguage)
selectLang.addEventListener('change', () => langHandler(selectLang.value))
selectLangTow.addEventListener('change', () => langHandler(selectLangTow.value))