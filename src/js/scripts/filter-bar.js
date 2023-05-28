import { checkingInput } from '../tools.js'
import '../libs/nouislider.min.js'
import axios from 'axios'
import { getDigFormat } from '../tools.js'

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

// Filter

const baseUrl = 'https://646cb9f87b42c06c3b2be40a.mockapi.io'

const catalogList = document.querySelector('.catalog__list')
const objectCardPage = document.querySelector('.object-card')
const paginationList = document.querySelector('.catalog-pagination__list')
const paginationBack = document.querySelector('.catalog-pagination__start')
const paginationPrev = document.querySelector(
	'.catalog-pagination__arrow--prev',
)
const paginationNext = document.querySelector(
	'.catalog-pagination__arrow--next',
)
const paginationMore = document.querySelector('.catalog-pagination__more')
const catalogCount = document.querySelector('.catalog__count > span')
const sortValue = document.querySelector('.sort-dropdown__value')
const sortTypes = document.querySelectorAll('.sort-dropdown__item')

const btnReset = document.querySelector('.filter-bar__reset')
const detailsInputs = document.querySelectorAll('.filter-details__input')
const filterButton = document.querySelector('.filter-bar__button')
const filterButtonCount = document.querySelector('#filter-count')
const filterButtonState = document.querySelector('#filter-state')
const filterSquareInputs = document.querySelectorAll('.filter-square__input')

const range = document.getElementById('range')
const inputMin = document.getElementById('min')
const inputMax = document.getElementById('max')

//--------------------------------------------------------------------
let dataBase = []

let maxItemsForPage = 4
let perPage = maxItemsForPage
let currentPage = 1
let startItem = 0
let endItem = perPage
let totalPages
let sortType = ''
let dataIsLoading = false

const filterOptions = {
	prices: {
		min: 1000000,
		max: 20000000,
	},
	area: {
		house: {
			min: 0,
			max: 100000,
		},
		plot: {
			min: 0,
			max: 100000,
		},
	},
	objectType: [],

	repairType: [],

	landСategory: [],
}

let filterState = JSON.parse(JSON.stringify(filterOptions))

const slider = document.querySelector('.object-card-slider__wrapper')
const sliderThumbs = document.querySelector(
	'.object-card-slider-thumbs__wrapper',
)

if (objectCardPage) {
	const currentCard = JSON.parse(localStorage.getItem('objectCard'))
	renderObjectCardPage(currentCard)
}

function renderObjectCardPage(currentCard) {
	const { preview, images } = currentCard

	renderObjectCardGallery([preview, ...images])
	renderObjectCardTitle(currentCard)
	renderObjectCardSpecification(currentCard)
	renderObjectCardDescription(currentCard)

	document.title = `${currentCard.objectType} ${currentCard.houseArea} м² / ${currentCard.plotArea} сот.`
	document.querySelector('[data-price-discount] > span').textContent =
		getDigFormat(currentCard.discount)
	document.querySelector('[data-price] > span').textContent = getDigFormat(
		currentCard.price,
	)
}

function renderObjectCardGallery(gallery) {
	gallery.forEach(image => {
		slider.insertAdjacentHTML(
			'beforeend',
			`
		<li class="swiper-slide object-card-slider__slide">
		<img data-lightbox-image src="${image}" />
	</li>
		`,
		)
		sliderThumbs.insertAdjacentHTML(
			'beforeend',
			`
		<li class="swiper-slide object-card-slider-thumbs__slide">
		<img src="${image}" />
	</li>
		`,
		)
	})
}

function renderObjectCardSpecification(obj) {
	document
		.querySelector('.object-card-specifications__description-rows')
		.insertAdjacentHTML(
			'beforeend',
			`
				<li class="object-card-specifications__row">
					<span class="object-card-specifications__name">Площадь дома</span>
					<div class="object-card-specifications__dotted"></div>
					<span data-house-area class="object-card-specifications__meaning">${obj.houseArea} м²</span>
				</li>
				<li class="object-card-specifications__row">
					<span class="object-card-specifications__name">Площадь участка</span>
					<div class="object-card-specifications__dotted"></div>
					<span data-plot-area class="object-card-specifications__meaning">${obj.plotArea} сот</span>
				</li>
				<li class="object-card-specifications__row">
					<span class="object-card-specifications__name">Ремонт</span>
					<div class="object-card-specifications__dotted"></div>
					<span data-repair-type class="object-card-specifications__meaning">${obj.repairType}</span>
				</li>
				<li class="object-card-specifications__row">
					<span class="object-card-specifications__name">Вид объекта</span>
					<div class="object-card-specifications__dotted"></div>
					<span data-object-type class="object-card-specifications__meaning">${obj.objectType}</span>
				</li>
				<li class="object-card-specifications__row">
					<span class="object-card-specifications__name">Коммуникации</span>
					<div class="object-card-specifications__dotted"></div>
					<span data-communications class="object-card-specifications__meaning">${obj.communications}</span>
				</li>`,
		)
}

function renderObjectCardTitle(obj) {
	document
		.querySelector('.object-card-specifications__title')
		.insertAdjacentHTML(
			'beforeend',
			`
		<p>${obj.objectType} ${obj.houseArea} м²</p>
		<p>на участке ${obj.plotArea} сот., м2, 2</p>
	`,
		)

	document.querySelector(
		'[data-card-title]',
	).textContent = `${obj.objectType} ${obj.houseArea} м² на участке ${obj.plotArea} сот., м2, 2`
}

function renderObjectCardDescription(obj) {
	document.querySelector('.object-card-description').insertAdjacentHTML(
		'beforeend',
		`
			<div class="object-card-description__text-block">
					<h3 class="object-card-description__title">Описание:</h3>
					<h4 class="object-card-description__subtitle">Продается ${obj.objectType}.</h4>
					<address class="object-card-description__address">${obj.address}</address>
				</div>

				<div class="object-card-description__text-block">
					<h4 class="object-card-description__subtitle"><span>ОБЩАЯ ПЛОЩАДЬ</span> ${obj.houseArea} кв. м УЧАСТОК ${obj.plotArea} соток.</h4>
					<ul data-option-list class="object-card-description__list"></ul>
				</div>
				<div class="object-card-description__text-block">
					<h4 class="object-card-description__subtitle">Способы оплаты:</h4>
					<ul data-payment-list class="object-card-description__list"></ul>
				</div>
				<div class="object-card-description__text-block">
					<h4 class="object-card-description__subtitle">Рядом:</h4>
					<div class="object-card-description__row">
						<p class="object-card-description__row-item">Куюки, Константиновка, Алтан, Клыки, Привольный</p>
					</div>
				</div>
	`,
	)

	obj.options.forEach(option => {
		document
			.querySelector('[data-option-list]')
			.insertAdjacentHTML(
				'beforeend',
				`<li class="object-card-description__item">${option}.</li>`,
			)
	})
	obj.paymentMethods.forEach(method => {
		document
			.querySelector('[data-payment-list]')
			.insertAdjacentHTML(
				'beforeend',
				`<li class="object-card-description__item">${method}.</li>`,
			)
	})
}

if (paginationList) {
	noUiSlider.create(range, {
		start: [1_000_000, 20_000_000],
		connect: true,
		range: {
			min: 1_000_000,
			max: 20_000_000,
		},
		step: 100_000,
	})

	rangeSliderInit(range)
	console.log(dataIsLoading)

	fetchData()

	catalogList.addEventListener('click', e => {
		if (e.target.classList.contains('catalog-card__link')) {
			const card = e.target.closest('.catalog__item')
			const currentItem = dataBase.find(obj => obj.id === parseInt(card.id))
			if (localStorage.getItem('objectCard') !== null) {
				localStorage.removeItem('objectCard')
			}
			localStorage.setItem('objectCard', JSON.stringify(currentItem))
		}
	})

	sortTypes.forEach(type => {
		const id = type.id
		type.addEventListener('click', () => {
			if (id === 'sort-price-max') sortType = ['discount', 'asc']
			if (id === 'sort-price-min') sortType = ['discount', 'desc']
			if (id === 'sort-plot-max') sortType = ['houseArea', 'asc']
			if (id === 'sort-plot-min') sortType = ['houseArea', 'desc']
			fetchData()
		})
	})

	detailsInputs.forEach(input => {
		input.addEventListener('change', () => {
			removeUnCheckedInputs(input)
			changeFilterCheckboxState(input)
			fetchData(true)
			filterStateCheck()
		})
	})

	filterSquareInputs.forEach(input => {
		input.addEventListener('input', () => {
			checkingInput(input)
			const type = input.dataset['area'].slice(0, -3).toLowerCase()
			const minMax = input.dataset['area'].slice(-3).toLowerCase()

			filterOptions.area[type][minMax] = input.value

			if (!input.value) {
				if (minMax === 'min') filterOptions.area[type].min = '0'
				if (minMax === 'max') filterOptions.area[type].max = '100000'
			}

			fetchData(true)
			filterStateCheck()
		})
	})

	btnReset.addEventListener('click', () => {
		filterFormReset(range)
		fetchData()
	})

	filterButton.addEventListener('click', () => {
		if (filterState !== JSON.stringify(filterOptions)) {
			currentPage = 1
			startItem = 0
			endItem = maxItemsForPage
			filterStateChange()
			fetchData()
			goToTopElem()
		}
	})

	paginationBack.addEventListener('click', () => {
		currentPage = 1
		startItem = 0
		endItem = maxItemsForPage
		goToTopElem()
		fetchData()
	})

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
					goToTopElem()
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

	paginationPrev.addEventListener('click', () => {
		if (currentPage > 1) {
			paginationArrowState()
			currentPage--
			startItem = (currentPage - 1) * perPage
			endItem = currentPage * perPage

			fetchData()
		}
		paginationArrowState()
		goToTopElem()
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
		goToTopElem()
	})
}

//====================================================================

async function fetchData(renderBlocking) {
	try {
		if (!dataBase.length) {
			const itemsResponse = await axios.get(`${baseUrl}/objects`)
			dataBase = itemsResponse.data
			dataIsLoading = true
		}

		filter(dataBase, renderBlocking)
		paginationArrowState()
	} catch (error) {
		alert('Не удалось сделать запрос данных')
	}
}

function filter(dataBase, renderBlocking) {
	const { prices, area, objectType, repairType, landСategory } = filterOptions
	const houseAreaMin = parseInt(area.house.min)
	const houseAreaMax = parseInt(area.house.max)
	const plotAreaMin = parseInt(area.plot.min)
	const plotAreaMax = parseInt(area.plot.max)

	const resultData = dataBase.filter(obj => {
		if (
			obj.discount >= prices.min &&
			obj.discount <= prices.max &&
			houseAreaMin < obj.houseArea &&
			houseAreaMax > obj.houseArea &&
			plotAreaMin < obj.plotArea &&
			plotAreaMax > obj.plotArea
		) {
			if (objectType.length && !repairType.length && !landСategory.length) {
				return objectType.includes(obj.objectType)
			} else if (
				!objectType.length &&
				repairType.length &&
				!landСategory.length
			) {
				return repairType.includes(obj.repairType)
			} else if (
				!objectType.length &&
				!repairType.length &&
				landСategory.length
			) {
				return landСategory.includes(obj.landСategory)
			} else if (
				objectType.length &&
				repairType.length &&
				!landСategory.length
			) {
				return (
					objectType.includes(obj.objectType) &&
					repairType.includes(obj.repairType)
				)
			} else if (
				!objectType.length &&
				repairType.length &&
				landСategory.length
			) {
				return (
					repairType.includes(obj.repairType) &&
					landСategory.includes(obj.landСategory)
				)
			} else if (
				objectType.length &&
				!repairType.length &&
				landСategory.length
			) {
				return (
					objectType.includes(obj.objectType) &&
					landСategory.includes(obj.landСategory)
				)
			} else if (
				objectType.length &&
				repairType.length &&
				landСategory.length
			) {
				return (
					objectType.includes(obj.objectType) &&
					repairType.includes(obj.repairType) &&
					landСategory.includes(obj.landСategory)
				)
			}
			return true
		}
	})

	const sortData = sortType.length ? changeSorting(resultData) : ''

	totalPages = Math.ceil(resultData.length / perPage)
	filterButtonCount.textContent = resultData.length
	!renderBlocking ? renderResultPage(sortData || resultData) : ''
}

function renderResultPage(data) {
	catalogCount.textContent = data.length
	currentPage > 1
		? paginationBack.classList.add('visible')
		: paginationBack.classList.remove('visible')

	paginationArrowState()
	renderCards(data)
	renderPagination(totalPages, currentPage)
	changeVisibleMore(totalPages)
}

function goToTopElem() {
	const scrollTarget = document.querySelector('.catalog__content')
	const elementPosition = scrollTarget.getBoundingClientRect().top
	const offsetPosition = elementPosition

	window.scrollBy({
		top: offsetPosition,
		behavior: 'smooth',
	})
}

function renderCards(data) {
	console.log('render')
	catalogList.innerHTML = ''

	data.forEach((item, index) => {
		if (index >= startItem && index < endItem) {
			catalogList.insertAdjacentHTML(
				'beforeend',
				`<li id="${item.id}" class="catalog__item">
	<article class="catalog__card catalog-card">
		<div class="catalog-card__image">
			<img src="${item.preview}" alt="">
		</div>
		<div class="catalog-card__text">
			<h3 class="catalog-card__title">${item.objectType} ${
					item.houseArea
				} м² на участке ${item.plotArea} сот., м2, 2</h3>
			<div class="catalog-card__description">
				<ul class="catalog-card__option-list"></ul>
				<address class="catalog-card__address">
					<svg class="icon">
						<use xlink:href="img/sprite.svg#locate"></use>
					</svg>
					${item.address}
				</address>
			</div>
			<div class="catalog-card__footer">
				<ul class="catalog-card__prices">
					<li class="catalog-card__price">
					<span>${getDigFormat(item.price)}</span>₽
					</li>
					<li class="catalog-card__price">
					<span>${getDigFormat(item.discount)}</span>₽
					</li>
				</ul>
				<a href="object-card.html" target="_blank" class="catalog-card__link">
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

			renderCardOptionList(item.id, item.options)
		}
	})
}

function renderCardOptionList(id, options) {
	const card = document.getElementById(id)
	options.forEach(option => {
		card
			.querySelector('.catalog-card__option-list')
			.insertAdjacentHTML(
				'beforeend',
				`<li class="catalog-card__item">${option}</li>`,
			)
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
	}

	if (currentPage === totalPages) {
		paginationNext.classList.add('disabled')
	}
}

function rangeSliderInit(range) {
	if (!range || !inputMin || !inputMax) return

	const inputs = [inputMin, inputMax]

	range.noUiSlider.on('update', function (values, handle) {
		inputs[handle].textContent = getDigFormat(parseFloat(values[handle]))
		filterOptions.prices.min = parseInt(values[0])
		filterOptions.prices.max = parseInt(values[1])
		if (dataBase.length) fetchData(true)
		if (dataIsLoading) filterStateCheck()
	})

	inputMin.addEventListener('change', function () {
		range.noUiSlider.set([this.textContent, null])
	})

	inputMax.addEventListener('change', function () {
		range.noUiSlider.set([null, this.textContent])
	})
}

function changeFilterCheckboxState(input) {
	if (input.checked) {
		if (filterOptions[input.name].includes(input.value)) return
		filterOptions[input.name].push(input.value)
	} else {
		removeUnCheckedInputs(input)
	}
}

function removeUnCheckedInputs(input) {
	const itemIndex = filterOptions[input.name].indexOf(input.value)
	if (itemIndex !== -1) {
		filterOptions[input.name].splice(itemIndex, 1)
	}
}

function changeSorting(resultData) {
	const [el, type] = sortType

	if (type === 'asc') {
		return resultData.sort((a, b) => a[el] - b[el])
	} else if (type === 'desc') {
		return resultData.sort((a, b) => b[el] - a[el])
	}
}

function filterFormReset(range) {
	currentPage = 1
	startItem = 0
	endItem = maxItemsForPage
	sortType = ''
	sortValue.textContent = 'Сортировать по ...'

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
	range.noUiSlider.reset()
	inputMin.textContent = '1 000 000'
	inputMax.textContent = '20 000 000'
	filterOptions.prices.min = '1000000'
	filterOptions.prices.max = '20000000'
	filterStateChange()
	filterStateCheck()
}

function filterStateChange() {
	filterState = JSON.stringify(filterOptions)
}

filterStateChange()

function filterStateCheck() {
	if (filterState === JSON.stringify(filterOptions)) {
		filterButtonState.textContent = 'Показано'
	} else if (filterState !== JSON.stringify(filterOptions)) {
		filterButtonState.textContent = 'Показать'
	}
}
