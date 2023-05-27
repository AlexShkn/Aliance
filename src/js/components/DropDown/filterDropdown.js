const filter = document.querySelector('.filter')

if (filter) {
	const items = filter.querySelectorAll('.block-filter')

	items.forEach(item => {
		item.addEventListener('click', e => {
			let currentBtn = e.currentTarget
			let drop = currentBtn.closest('.block-filter')

			items.forEach(item => {
				if (item !== drop) {
					item
						.querySelector('.block-filter__dropdown')
						.classList.remove('_active')
					item.querySelector('.block-filter__icon').classList.remove('_active')
				}
			})
			item.querySelector('.block-filter__dropdown').classList.toggle('_active')
			item.querySelector('.block-filter__icon').classList.toggle('_active')

			if (event.target.classList.contains('block-filter__item')) {
				item.querySelector('.block-filter__value').textContent =
					event.target.textContent
			}
		})

		document.addEventListener('click', e => {
			console.log(e.target)
			if (!e.target.closest('.catalog__filter')) {
				item.querySelector('.block-filter__icon').classList.remove('_active')
				item
					.querySelector('.block-filter__dropdown')
					.classList.remove('_active')
			}
		})
	})
}
