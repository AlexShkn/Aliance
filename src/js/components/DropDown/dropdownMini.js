document.addEventListener('DOMContentLoaded', () => {
	const button = document.querySelector('[data-dropdown]')
	const dropdown = document.querySelector('.dropdown')

	button.addEventListener('click', () => {
		dropdown.classList.toggle('dropdown_active')
	})

	window.addEventListener('click', e => {
		const target = e.target
		if (!target.closest('.dropdown') && !target.closest('[data-dropdown]')) {
			dropdown.classList.remove('dropdown_active')
		}
	})
})
