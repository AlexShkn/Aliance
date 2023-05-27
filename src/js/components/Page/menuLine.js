document.addEventListener('DOMContentLoaded', () => {
	const menuLine = document.querySelector('.menu__line'),
		menuItem = document.querySelectorAll('.menu__item')

	if (menuLine) {
		menuLine.style.width = `${menuItem[0].offsetWidth}px`

		menuItem.forEach(el => {
			el.addEventListener('mouseenter', e => {
				menuLine.style.width = `${e.currentTarget.offsetWidth}px`
				menuLine.style.left = `${e.currentTarget.offsetLeft}px`
			})

			el.addEventListener('mouseleave', () => {
				menuLine.style.width = `${menuItem[0].offsetWidth}px`
				menuLine.style.left = `0px`
			})
		})
	}
})
