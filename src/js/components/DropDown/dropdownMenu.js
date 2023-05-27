document.addEventListener('DOMContentLoaded', () => {
	const menuBtns = document.querySelectorAll('.dropdown__nav-button')
	const drops = document.querySelectorAll('.dropdown__nav-item')
	const closeBtn = document.querySelectorAll('.dropdown-close')
	const innerList = document.querySelectorAll('.dropdown__inner-nav-list')

	menuBtns.forEach(el => {
		el.addEventListener('click', e => {
			let currentBtn = e.currentTarget
			let drop = currentBtn.closest('.dropdown__nav-item')

			menuBtns.forEach(el => {
				if (el !== currentBtn) {
					el.classList.remove('_active')
				}
			})

			drops.forEach(el => {
				if (el !== drop) {
					el.classList.remove('_active')
				}
				if (!el.classList.contains('_active')) {
					el.querySelector('.dropdown__inner-nav-list').classList.remove('show')
				}
			})

			drop.classList.toggle('_active')
			currentBtn.classList.toggle('_active')
			drop.querySelector('.dropdown__inner-nav-list').classList.toggle('show')
		})
	})

	closeBtn.forEach(btn =>
		btn.addEventListener('click', e => {
			innerList.forEach(list => {
				list.classList.remove('_show')
			})
			menuBtns.forEach(el => {
				el.classList.remove('_active')
			})

			drops.forEach(el => {
				el.classList.remove('_active')
			})
		}),
	)

	document.addEventListener('click', e => {
		if (!e.target.closest('.dropdown__nav-list')) {
			innerList.forEach(list => {
				list.classList.remove('_show')
			})

			menuBtns.forEach(el => {
				el.classList.remove('_active')
			})

			drops.forEach(el => {
				el.classList.remove('_active')
			})
		}
	})
})
