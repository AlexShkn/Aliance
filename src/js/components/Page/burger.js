let iconMenu = document.querySelector('.icon-menu')
let menuBody = document.querySelector('.menu__body')
const menuLink = document.querySelectorAll('.menu__link')

function toggleMenu() {
	if (iconMenu != null) {
		document.body.classList.toggle('_lock')
		iconMenu.classList.toggle('_active')
		menuBody.classList.toggle('_active')

		if (menuBody.classList.contains('_active')) {
			iconMenu.setAttribute('aria-label', 'Закрыть меню')
			iconMenu.setAttribute('aria-expanded', 'true')
		} else {
			iconMenu.setAttribute('aria-label', 'Открыть меню')
			iconMenu.setAttribute('aria-expanded', 'false')
		}
	}
}

iconMenu.addEventListener('click', () => {
	toggleMenu()
})

menuLink.forEach(link => {
	link.addEventListener('click', () => {
		toggleMenu()
		document.body.classList.remove('_lock')
	})
})

document.addEventListener('click', e => {
	if (!e.target.closest('.icon-menu') && !e.target.closest('.menu__link')) {
		if (!e.target.closest('.menu__body')) {
			menuBody.classList.remove('_active')
			iconMenu.classList.remove('_active')
			document.body.classList.remove('_lock')
		}
	}
})
