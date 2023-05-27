import { checkingInput } from '../tools.js'

const filterItemsTrigger = document.querySelectorAll('.filter-bar__heading')
filterItemsTrigger.forEach(trigger => {
	trigger.addEventListener('click', () => {
		trigger.closest('.filter-bar__item').classList.toggle('show')
	})
})

// Sort select

const items = document.querySelectorAll('.sort-dropdown')

if (items.length) {
	items.forEach(item => {
		item.addEventListener('click', e => {
			let currentBtn = e.currentTarget
			let drop = currentBtn.closest('.sort-dropdown')

			items.forEach(item => {
				if (item !== drop) {
					item
						.querySelector('.sort-dropdown__dropdown')
						.classList.remove('_active')
					item.querySelector('.sort-dropdown__icon').classList.remove('_active')
				}
			})
			item.querySelector('.sort-dropdown__dropdown').classList.toggle('_active')
			item.querySelector('.sort-dropdown__icon').classList.toggle('_active')

			if (e.target.classList.contains('sort-dropdown__item')) {
				item.querySelector('.sort-dropdown__value').textContent =
					e.target.textContent
			}
		})

		document.addEventListener('click', e => {
			if (!e.target.closest('.sort-dropdown')) {
				item.querySelector('.sort-dropdown__icon').classList.remove('_active')
				item
					.querySelector('.sort-dropdown__dropdown')
					.classList.remove('_active')
			}
		})
	})
}
//====================================================================

import '../libs/nouislider.min.js'

//====================================================================
// Pagination

import axios from 'axios'
import { getDigFormat } from '../tools.js'

const baseUrl = 'https://646cb9f87b42c06c3b2be40a.mockapi.io'

const catalogList = document.querySelector('.catalog__list')
const paginationList = document.querySelector('.catalog-pagination__list')
const paginationPrev = document.querySelector('.catalog-pagination__prev')
const paginationNext = document.querySelector('.catalog-pagination__next')
const paginationMore = document.querySelector('.catalog-pagination__more')
const catalogCount = document.querySelector('.catalog__count > span')

const btnReset = document.querySelector('.filter-bar__reset')
const detailsInputs = document.querySelectorAll('.filter-details__input')
const filterButton = document.querySelector('.filter-bar__button')
const filterSquareInputs = document.querySelectorAll('.filter-square__input')

if (paginationList) {
	const maxItemsForPage = 4
	let perPage = maxItemsForPage
	let currentPage = 1
	let startItem = 0
	let endItem = perPage
	let totalPages

	// function getSessionStorageItems(obj) {
	// 	return sessionStorage.getItem(obj)
	// 		? sessionStorage.getItem(obj).split(',')
	// 		: ''
	// }

	const sessionFilterState = JSON.parse(sessionStorage.getItem('filterOptions'))

	const filterOptions = {
		prices: {
			min: sessionFilterState?.prices.min || '1000000',
			max: sessionFilterState?.prices.max || '20000000',
		},
		area: {
			house: {
				min: sessionFilterState?.area.house.min || '0',
				max: sessionFilterState?.area.house.max || '100000',
			},
			plot: {
				min: sessionFilterState?.area.plot.min || '0',
				max: sessionFilterState?.area.plot.max || '100000',
			},
		},
		objectType: sessionFilterState?.objectType.length
			? sessionFilterState?.objectType
			: [],

		repairType: sessionFilterState?.repairType.length
			? sessionFilterState?.repairType
			: [],

		landСategory: sessionFilterState?.landСategory.length
			? sessionFilterState?.landСategory
			: [],
	}

	async function fetchData() {
		try {
			const itemsResponse = await axios.get(`${baseUrl}/objects`)
			const dataBase = itemsResponse.data

			filter(dataBase)
		} catch (error) {
			alert('Не удалось сделать запрос данных')
		}
	}

	fetchData()

	function filter(dataBase) {
		console.log(sessionFilterState)
		const { prices, area, objectType, repairType, landСategory } =
			sessionFilterState === null ? filterOptions : sessionFilterState

		const houseAreaMin = parseInt(area.house.min)
		const houseAreaMax = parseInt(area.house.max)
		const plotAreaMin = parseInt(area.plot.min)
		const plotAreaMax = parseInt(area.plot.max)

		const resultData = dataBase.filter(obj => {
			if (
				obj.discount >= prices.min &&
				obj.discount <= prices.max &&
				houseAreaMin < obj.specifications.houseArea &&
				houseAreaMax > obj.specifications.houseArea &&
				plotAreaMin < obj.specifications.plotArea &&
				plotAreaMax > obj.specifications.plotArea
			) {
				if (objectType.length && !repairType.length && !landСategory.length) {
					return objectType.some(type => type === obj.specifications.objectType)
				} else if (
					!objectType.length &&
					repairType.length &&
					!landСategory.length
				) {
					return repairType.some(type => type === obj.specifications.repairType)
				} else if (
					!objectType.length &&
					!repairType.length &&
					landСategory.length
				) {
					return landСategory.some(
						type => type === obj.specifications.landСategory,
					)
				} else if (
					objectType.length &&
					repairType.length &&
					!landСategory.length
				) {
					return (
						objectType.some(type => type === obj.specifications.objectType) &&
						repairType.some(type => type === obj.specifications.repairType)
					)
				} else if (
					!objectType.length &&
					repairType.length &&
					landСategory.length
				) {
					return (
						repairType.some(type => type === obj.specifications.repairType) &&
						landСategory.some(type => type === obj.specifications.landСategory)
					)
				} else if (
					objectType.length &&
					!repairType.length &&
					landСategory.length
				) {
					return (
						objectType.some(type => type === obj.specifications.objectType) &&
						landСategory.some(type => type === obj.specifications.landСategory)
					)
				} else if (
					objectType.length &&
					repairType.length &&
					landСategory.length
				) {
					return (
						objectType.some(type => type === obj.specifications.objectType) &&
						repairType.some(type => type === obj.specifications.repairType) &&
						landСategory.some(type => type === obj.specifications.landСategory)
					)
				}
				return true
			}
		})

		// SORT

		// resultData.sort((a, b) => a.discount - b.discount)

		totalPages = Math.ceil(resultData.length / perPage)
		catalogCount.textContent = resultData.length

		renderCard(resultData)
		console.log('rendrr')
		renderPagination(totalPages, currentPage)
		changeVisibleMore(totalPages)
	}

	const filterItems = document.querySelectorAll('.filter-bar__item')

	detailsInputs.forEach(input => {
		checkingStateCheckboxSession(input)

		input.addEventListener('change', () => {
			changeFilterCheckboxState(input)
		})
	})

	// filterItems.forEach(item => {
	// 	const checkboxInput = item.querySelectorAll('input[type=checkbox]')

	// 	console.log(checkboxInput.checked)
	// 	if (checkboxInput.checked) {
	// 		console.log(item)
	// 		item.classList.add('show')
	// 	}
	// })

	function checkingStateCheckboxSession(input) {
		if (
			sessionFilterState &&
			sessionFilterState[input.name].includes(input.value)
		) {
			input.checked = true
			input.closest('.filter-bar__item').classList.add('show')
		}
	}

	filterSquareInputs.forEach(input =>
		input.addEventListener('input', () => {
			checkingInput(input)
			if (input.dataset.houseMin === '') {
				filterOptions.area.house.min = input.value
				if (input.value === '') filterOptions.area.house.min = '0'
			}
			if (input.dataset.houseMax === '') {
				filterOptions.area.house.max = input.value
				if (input.value === '') filterOptions.area.house.max = '100000'
			}
			if (input.dataset.plotMin === '') {
				filterOptions.area.plot.min = input.value
				if (input.value === '') filterOptions.area.plot.min = '0'
			}
			if (input.dataset.plotMax === '') {
				filterOptions.area.plot.max = input.value
				if (input.value === '') filterOptions.area.plot.max = '100000'
			}
			setSessionStorageItems()
		}),
	)

	btnReset.addEventListener('click', () => {
		filterFormReset()
		fetchData()
	})

	filterButton.addEventListener('click', () => {
		currentPage = 1
		startItem = 0
		endItem = maxItemsForPage
		setSessionStorageItems()
		fetchData()
	})

	// Pagination
	paginationList.addEventListener('click', e => {
		const pages = document.querySelectorAll('.catalog-pagination__list > li')

		pages.forEach(page => {
			if (e.target === page) {
				currentPage = parseInt(page.textContent)
				if (
					!page.classList.contains('current') &&
					parseInt(page.textContent) === currentPage
				) {
					startItem = (currentPage - 1) * perPage
					endItem = currentPage * perPage

					fetchData()

					pages.forEach(page => {
						page.classList.remove('current')
					})
					page.classList.add('current')
				}
			}
		})

		paginationArrowState()
	})

	if (currentPage === 1) {
		paginationPrev.classList.add('disabled')
	}

	paginationPrev.addEventListener('click', () => {
		if (currentPage > 1) {
			paginationArrowState()
			currentPage--
			startItem = (currentPage - 1) * perPage
			endItem = currentPage * perPage

			fetchData()
		}
		paginationArrowState()
	})
	paginationNext.addEventListener('click', () => {
		if (currentPage !== totalPages) {
			paginationArrowState()
			currentPage++
			startItem = (currentPage - 1) * perPage
			endItem = currentPage * perPage

			fetchData()
		}
		paginationArrowState()
	})

	function renderCard(data) {
		catalogList.innerHTML = ''
		data.forEach((item, index) => {
			if (index >= startItem && index < endItem) {
				const {
					id,
					preview,
					title,
					options,
					address,
					price,
					discount,
					specifications,
				} = item
				catalogList.insertAdjacentHTML(
					'beforeend',
					`<li id="object-${id}" class="catalog__item">
		<article class="catalog__card catalog-card">
			<div class="catalog-card__image">
				<span class="count-number">
				<span>${specifications.objectType}</span>
				<span>${specifications.repairType}</span>
				<span>${specifications.landСategory}</span>
				<span>Дом: ${specifications.houseArea}</span>
				<span>Участок: ${specifications.plotArea}</span>
				</span>
				<img src="${preview}" alt="">
			</div>
			<div class="catalog-card__text">
				<h3 class="catalog-card__title">${title}</h3>
				<div class="catalog-card__description">
					<ul class="catalog-card__option-list">
					</ul>
					<address class="catalog-card__address">
						<svg class="icon">
							<use xlink:href="img/sprite.svg#locate"></use>
						</svg>
						${address}
					</address>
				</div>
				<div class="catalog-card__footer">
					<ul class="catalog-card__prices">
						<li class="catalog-card__price"><span>${getDigFormat(price)}</span>₽</li>
						<li class="catalog-card__price"><span>${getDigFormat(discount)}</span>₽</li>
					</ul>
					<a href="object-cart.html" class="catalog-card__link">
						Смотреть
						<svg class="icon">
							<use xlink:href="img/sprite.svg#arrow-right"></use>
						</svg>
					</a>
				</div>
			</div>
		</article>
	</li>
`,
				)

				const card = document.getElementById(`object-${id}`)
				options.forEach(option => {
					card
						.querySelector('.catalog-card__option-list')
						.insertAdjacentHTML(
							'beforeend',
							`<li class="catalog-card__item">${option}</li>`,
						)
				})
			}
		})
	}

	function renderPagination(count, currentPage) {
		paginationList.innerHTML = ''
		for (
			let index = currentPage;
			index <= count && index <= currentPage + 2;
			index++
		) {
			paginationList.insertAdjacentHTML(
				'beforeend',
				`
		<li class="catalog-pagination__item ${
			index === currentPage ? 'current' : ''
		}">${index}</li>
		`,
			)
		}
	}

	function changeVisibleMore(totalPages) {
		if (currentPage === totalPages - 2 || currentPage === totalPages) {
			paginationMore.classList.add('hidden')
		} else {
			paginationMore.classList.remove('hidden')
		}
	}

	function paginationArrowState() {
		if (currentPage > 1) {
			if (paginationPrev.classList.contains('disabled')) {
				paginationPrev.classList.remove('disabled')
			}
			if (paginationNext.classList.contains('disabled')) {
				paginationNext.classList.remove('disabled')
			}
		}

		if (currentPage === 1) {
			paginationPrev.classList.add('disabled')
		} else {
			paginationPrev.classList.remove('disabled')
		}

		if (currentPage !== totalPages) {
			if (paginationPrev.classList.contains('disabled')) {
				paginationPrev.classList.remove('disabled')
			}
		}

		if (currentPage === totalPages) {
			paginationNext.classList.add('disabled')
		}
	}

	const range = document.getElementById('range')
	const inputMin = document.getElementById('min')
	const inputMax = document.getElementById('max')

	function rangeSliderInit() {
		if (!range || !inputMin || !inputMax) return

		const inputs = [inputMin, inputMax]

		noUiSlider.create(range, {
			start: [
				parseInt(sessionFilterState?.prices.min) || 1_000_000,
				parseInt(sessionFilterState?.prices.max) || 20_000_000,
			],
			connect: true,
			range: {
				min: 1_000_000,
				max: 20_000_000,
			},
			step: 100_000,
		})

		range.noUiSlider.on('update', function (values, handle) {
			inputs[handle].textContent = getDigFormat(parseFloat(values[handle]))
			filterOptions.prices.min = parseInt(values[0])
			filterOptions.prices.max = parseInt(values[1])
			setSessionStorageItems()
		})

		inputMin.addEventListener('change', function () {
			range.noUiSlider.set([this.textContent, null])
		})

		inputMax.addEventListener('change', function () {
			range.noUiSlider.set([null, this.textContent])
		})
	}

	rangeSliderInit()

	function filterFormReset() {
		currentPage = 1
		startItem = 0
		endItem = maxItemsForPage

		filterOptions.objectType = []
		filterOptions.repairType = []
		filterOptions.landСategory = []

		detailsInputs.forEach(input => {
			input.checked = false
		})

		document.querySelectorAll('.filter-bar__item').forEach((item, index) => {
			if (item.classList.contains('show') && index > 1) {
				item.classList.remove('show')
			}
		})
		document.querySelectorAll('.filter-square__input').forEach(input => {
			input.value = ''
		})

		range.noUiSlider.set(['1 000 000', '20 000 000'])
		inputMin.textContent = '1 000 000'
		inputMax.textContent = '20 000 000'
		filterOptions.prices.min = '1000000'
		filterOptions.prices.max = '20000000'

		sessionStorage.removeItem('filterOptions')
		fetchData()
	}

	function removeUnCheckedInputs(input) {
		const itemIndex = filterOptions[input.name].indexOf(input.value)
		if (itemIndex !== -1) {
			filterOptions[input.name].splice(itemIndex, 1)
		}
	}

	function changeFilterCheckboxState(input) {
		if (input.checked) {
			if (filterOptions[input.name].includes(input.value)) return
			filterOptions[input.name].push(input.value)
			setSessionStorageItems()
		} else {
			removeUnCheckedInputs(input)
			setSessionStorageItems()
		}
	}

	function setSessionStorageItems() {
		console.log(filterOptions)
		sessionStorage.setItem('filterOptions', JSON.stringify(filterOptions))
	}
}
