import { disabledLock, enabledLock } from '../../functions.js'

//data-btn-close для кнопки открытия окна из окна

const openModal = (triggerSelector, modalDataSelector) => {
	const triggersList = document.querySelectorAll(triggerSelector)
	const modal = document.querySelector(modalDataSelector)

	if (!triggersList || !modal) return
	triggersList.forEach(trigger =>
		trigger.addEventListener('click', e => {
			e.preventDefault()
			modal.classList.add('_show')
			enabledLock()
		}),
	)
}

const closeModal = () => {
	const modals = document.querySelectorAll('[data-modal]')
	if (!modals) return
	modals.forEach(el => {
		el.addEventListener('click', e => {
			if (
				e.target.closest('[data-modal-close]') ||
				e.target.closest('[data-btn-close]') ||
				!e.target.closest('[data-modal-content]')
			) {
				el.classList.remove('_show')
				disabledLock()
			}

			if (e.target.closest('[data-btn-redirect]')) {
				el.classList.remove('_show')
				enabledLock()
			}
		})
	})
}

closeModal()

openModal('[data-btn-callback]', '[data-modal-callback]')

// openModal('.buttons__button_two', '.modal[data-modal="two"]')
