document.addEventListener('DOMContentLoaded', function () {
	const navInit = () => {
		const nav = document.querySelector('.menu')
		const links = document.querySelectorAll('.menu__link')
		const sections = document.querySelectorAll('section')
		sections.forEach(section => {
			if (window.pageYOffset >= section.offsetTop) {

				links.forEach(link => {
					link.classList.remove('_current')
					if (link.dataset.section === section.dataset.section) {
						link.classList.add('_current') /

						// if (section.classList.contains('section_dark')) {
						// 	// если активная секция имеет класс section_dark, то есть у нее темный фон
						// 	nav.classList.add('nav_light') // меняем цвет ссылок на светлый, добавляя класс nav_light
						// } else {
						// 	// иначе
						// 	nav.classList.remove('nav_light') // удаляем класс nav_light
						// }
					}
				})
			}
		})
	}
	navInit()
	window.addEventListener('scroll', () => {
		navInit()
	})
	window.addEventListener('resize', () => {
		navInit()
	})
})
