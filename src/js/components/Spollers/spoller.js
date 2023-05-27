//==== Модуль работы со спойлерами =======================================================================================================================================================================================================================
/*
Для родителя спойлеров пишем атрибут data-spollers
Для заголовков спойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.

Например:
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался только один спойлер добавляем атрибут data-one-spoller
*/

import { _slideDown, _slideToggle, _slideUp } from '../../functions.js'

//====================================================================

function spollers() {
	const spollersArray = document.querySelectorAll('[data-spollers]')
	if (spollersArray.length > 0) {
		// Получение обычных слойлеров
		const spollersRegular = Array.from(spollersArray).filter(function (item) {
			return !item.dataset.spollers.split(',')[0]
		})
		// Инициализация обычных слойлеров
		if (spollersRegular.length > 0) {
			initSpollers(spollersRegular)
		}
		// Получение слойлеров с медиа запросами
		const spollersMedia = Array.from(spollersArray).filter(function (item) {
			return item.dataset.spollers.split(',')[0]
		})
		// Инициализация слойлеров с медиа запросами
		if (spollersMedia.length > 0) {
			const breakpointsArray = []
			spollersMedia.forEach(item => {
				const params = item.dataset.spollers
				const breakpoint = {}
				const paramsArray = params.split(',')
				breakpoint.value = paramsArray[0]
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
				breakpoint.item = item
				breakpointsArray.push(breakpoint)
			})
			// Получаем уникальные брейкпоинты
			let mediaQueries = breakpointsArray.map(function (item) {
				return (
					'(' +
					item.type +
					'-width: ' +
					item.value +
					'px),' +
					item.value +
					',' +
					item.type
				)
			})
			mediaQueries = mediaQueries.filter(function (item, index, self) {
				return self.indexOf(item) === index
			})
			// Работаем с каждым брейкпоинтом
			mediaQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(',')
				const mediaBreakpoint = paramsArray[1]
				const mediaType = paramsArray[2]
				const matchMedia = window.matchMedia(paramsArray[0])
				// Объекты с нужными условиями
				const spollersArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true
					}
				})
				// Событие
				matchMedia.addEventListener('change', function () {
					initSpollers(spollersArray, matchMedia)
				})
				initSpollers(spollersArray, matchMedia)
			})
		}
		// Инициализация
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_spoller-init')
					initSpollerBody(spollersBlock)
					spollersBlock.addEventListener('click', setSpollerAction)
				} else {
					spollersBlock.classList.remove('_spoller-init')
					initSpollerBody(spollersBlock, false)
					spollersBlock.removeEventListener('click', setSpollerAction)
				}
			})
		}
		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]')
			if (spollerTitles.length > 0) {
				spollerTitles.forEach(spollerTitle => {
					if (hideSpollerBody) {
						spollerTitle.removeAttribute('tabindex')
						if (!spollerTitle.classList.contains('_spoller-active')) {
							spollerTitle.nextElementSibling.hidden = true
						}
					} else {
						spollerTitle.setAttribute('tabindex', '-1')
						spollerTitle.nextElementSibling.hidden = false
					}
				})
			}
		}
		function setSpollerAction(e) {
			const el = e.target

			if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
				const spollerTitle = el.hasAttribute('data-spoller')
					? el
					: el.closest('[data-spoller]')
				const spollersBlock = spollerTitle.closest('[data-spollers]')
				const oneSpoller = spollersBlock.hasAttribute('data-one-spoller')
					? true
					: false
				if (!spollersBlock.querySelectorAll('._slide').length) {
					if (
						oneSpoller &&
						!spollerTitle.classList.contains('_spoller-active')
					) {
						hideSpollersBody(spollersBlock)
					}
					spollerTitle.classList.toggle('_spoller-active')
					spollerTitle.parentElement.classList.toggle('_open-spoller')

					_slideToggle(spollerTitle.nextElementSibling, 500)
				}
				e.preventDefault()
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector(
				'[data-spoller]._spoller-active',
			)
			if (spollerActiveTitle) {
				spollerActiveTitle.classList.remove('_spoller-active')
				spollerActiveTitle.parentElement.classList.remove('_open-spoller')

				_slideUp(spollerActiveTitle.nextElementSibling, 500)
			}
		}
	}
}

spollers()
