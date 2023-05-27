const items = document.querySelectorAll('.accordion__trigger')

function toggleAccordion() {
	const itemToggle = this.getAttribute('aria-expanded')

	items.forEach(item => item.setAttribute('aria-expanded', 'false'))

	if (itemToggle == 'false') {
		this.setAttribute('aria-expanded', 'true')
	}
}

items.forEach(item => item.addEventListener('click', toggleAccordion))
