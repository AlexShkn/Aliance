import { _slideDown, _slideUp } from '../../functions.js'

/*
Для родителя табов пишем атрибут data-tabs
Для родителя заголовков табов пишем атрибут data-tabs-titles
Для родителя блоков табов пишем атрибут data-tabs-body

Если нужно чтобы табы открывались с анимацией
добавляем к data-tabs data-tabs-animate
По умолчанию, скорость анимации 500ms,
указать свою скорость можно так: data-tabs-animate="1000"

Если нужно чтобы табы превращались в "спойлеры" на неком размере экранов пишем параметры ширины.
Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
*/

export function tabs() {
	const tabs = document.querySelectorAll('[data-tabs]')
	let tabsActiveHash = []

	if (tabs.length > 0) {
		const hash = location.hash.replace('#', '')
		if (hash.startsWith('tab-')) {
			tabsActiveHash = hash.replace('tab-', '').split('-')
		}
		tabs.forEach((tabsBlock, index) => {
			tabsBlock.classList.add('_tab-init')
			tabsBlock.setAttribute('data-tabs-index', index)
			tabsBlock.addEventListener('click', setTabsAction)
			initTabs(tabsBlock)
		})

		// Получение табов с медиа запросами
		const tabsMedia = Array.from(tabs).filter(function (item, index, self) {
			return item.dataset.tabs
		})
		// Инициализация табов с медиа запросами
		if (tabsMedia.length > 0) {
			initMediaTabs(tabsMedia)
		}
	}
	// Инициализация табов с медиа запросами
	function initMediaTabs(tabsMedia) {
		const breakpointsArray = []
		tabsMedia.forEach(item => {
			const breakpointValue = item.dataset.tabs

			const tabsBreakpointsObject = {}
			tabsBreakpointsObject.value = breakpointValue
			tabsBreakpointsObject.item = item

			breakpointsArray.push(tabsBreakpointsObject)
		})

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return `(max-width:${item.value}px),${item.value}`
		})
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index
		})

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(',')
			const matchMedia = window.matchMedia(paramsArray[0])
			const mediaBreakpoint = paramsArray[1]

			// Объекты с нужными условиями
			const tabsMediaArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint) {
					return true
				}
			})

			// Событие
			matchMedia.addEventListener('change', function () {
				setTitlePosition(tabsMediaArray, matchMedia)
			})
			setTitlePosition(tabsMediaArray, matchMedia)
		})
	}
	// Установка позиций заголовков
	function setTitlePosition(tabsMediaArray, matchMedia) {
		tabsMediaArray.forEach(tabsMediaItem => {
			tabsMediaItem = tabsMediaItem.item
			const tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]')
			const tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]')
			const tabsContent = tabsMediaItem.querySelector('[data-tabs-body]')
			const tabsContentItems =
				tabsMediaItem.querySelectorAll('[data-tabs-item]')
			tabsContentItems.forEach((tabsContentItem, index) => {
				if (matchMedia.matches) {
					tabsContent.append(tabsTitleItems[index])
					tabsContent.append(tabsContentItem)
					tabsMediaItem.classList.add('_tab-spoller')
				} else {
					tabsTitles.append(tabsTitleItems[index])
					tabsMediaItem.classList.remove('_tab-spoller')
				}
			})
		})
	}
	// Работа с контентом
	function initTabs(tabsBlock) {
		const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*')
		const tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*')
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex
		const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex

		if (tabsActiveHashBlock) {
			const tabsActiveTitle = tabsBlock.querySelector(
				'[data-tabs-titles]>._tab-active',
			)
			tabsActiveTitle.classList.remove('_tab-active')
		}
		if (tabsContent.length > 0) {
			tabsContent.forEach((tabsContentItem, index) => {
				tabsTitles[index].setAttribute('data-tabs-title', '')
				tabsContentItem.setAttribute('data-tabs-item', '')

				if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
					tabsTitles[index].classList.add('_tab-active')
				}
				tabsContentItem.hidden =
					!tabsTitles[index].classList.contains('_tab-active')
			})
		}
	}
	function setTabsStatus(tabsBlock) {
		const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]')
		const tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]')
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex

		function isTabsAnimate(tabsBlock) {
			if (tabsBlock.hasAttribute('data-tabs-animate')) {
				return tabsBlock.dataset.tabsAnimate > 0
					? tabsBlock.dataset.tabsAnimate
					: 500
			}
		}
		const tabsBlockAnimate = isTabsAnimate(tabsBlock)

		if (tabsContent.length > 0) {
			tabsContent.forEach((tabsContentItem, index) => {
				if (tabsTitles[index].classList.contains('_tab-active')) {
					if (tabsBlockAnimate) {
						_slideDown(tabsContentItem, tabsBlockAnimate)
					} else {
						tabsContentItem.classList.add('tabs__content_active')
					}
					location.hash = `tab-${tabsBlockIndex}-${index}`
				} else {
					if (tabsBlockAnimate) {
						_slideUp(tabsContentItem, tabsBlockAnimate)
					} else {
						tabsContentItem.classList.remove('tabs__content_active')
					}
				}
			})
		}
	}
	function setTabsAction(e) {
		const el = e.target
		if (
			el.closest('[data-tabs-title]') ||
			el.hasAttribute('[data-tabs-title]')
		) {
			const tabTitle = el
			const tabsBlock = tabTitle.closest('[data-tabs]')
			if (
				!tabTitle.classList.contains('_tab-active') &&
				!tabsBlock.querySelectorAll('._slide').length
			) {
				const tabActiveTitle = tabsBlock.querySelector(
					'[data-tabs-title]._tab-active',
				)
				if (tabActiveTitle) {
					tabActiveTitle.classList.remove('_tab-active')
				}

				tabTitle.classList.add('_tab-active')
				setTabsStatus(tabsBlock)
			}
			e.preventDefault()
		}
	}
}
tabs()
