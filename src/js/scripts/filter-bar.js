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

// Pagination

const baseUrl = 'https://646cb9f87b42c06c3b2be40a.mockapi.io'

const catalogList = document.querySelector('.catalog__list')
const objectCardPage = document.querySelector('.object-card')
const paginationList = document.querySelector('.catalog-pagination__list')
const paginationPrev = document.querySelector('.catalog-pagination__prev')
const paginationNext = document.querySelector('.catalog-pagination__next')
const paginationMore = document.querySelector('.catalog-pagination__more')
const catalogCount = document.querySelector('.catalog__count > span')
const sortValue = document.querySelector('.sort-dropdown__value')
const sortTypes = document.querySelectorAll('.sort-dropdown__item')

const btnReset = document.querySelector('.filter-bar__reset')
const detailsInputs = document.querySelectorAll('.filter-details__input')
const filterButton = document.querySelector('.filter-bar__button')
const filterButtonCount = document.querySelector('.filter-bar__button > span')
const filterSquareInputs = document.querySelectorAll('.filter-square__input')

const range = document.getElementById('range')
const inputMin = document.getElementById('min')
const inputMax = document.getElementById('max')

//--------------------------------------------------------------------
let dataBase = []

const maxItemsForPage = 4
let perPage = maxItemsForPage
let currentPage = 1
let startItem = 0
let endItem = perPage
let totalPages
let sortType = ''

const filterOptions = {
	prices: {
		min: '1000000',
		max: '20000000',
	},
	area: {
		house: {
			min: '0',
			max: '100000',
		},
		plot: {
			min: '0',
			max: '100000',
		},
	},
	objectType: [],

	repairType: [],

	landСategory: [],
}

const slider = document.querySelector('.object-card-slider__wrapper')
const sliderThumbs = document.querySelector(
	'.object-card-slider-thumbs__wrapper',
)

if (objectCardPage) {
	const currentCard = JSON.parse(localStorage.getItem('objectCard'))
	renderObjectCardPage(currentCard)
	console.log(currentCard)
}

function renderObjectCardPage(currentCard) {
	const {
		preview,
		images,
		options,
		address,
		price,
		discount,
		houseArea,
		plotArea,
		repairType,
		objectType,
		communications,
		paymentMethods,
	} = currentCard

	renderObjectCardGallery([preview, ...images])
	renderObjectCardTitle(objectType, houseArea, plotArea)
	renderObjectCardSpecification(
		houseArea,
		plotArea,
		repairType,
		objectType,
		communications,
	)
	renderObjectCardDescription(
		objectType,
		address,
		houseArea,
		plotArea,
		options,
		paymentMethods,
	)

	document.title = `${objectType} ${houseArea} м² / ${plotArea} сот.`
	document.querySelector('[data-price-discount] > span').textContent =
		getDigFormat(discount)
	document.querySelector('[data-price] > span').textContent =
		getDigFormat(price)
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

function renderObjectCardSpecification(
	houseArea,
	plotArea,
	repairType,
	objectType,
	communications,
) {
	document
		.querySelector('.object-card-specifications__description-rows')
		.insertAdjacentHTML(
			'beforeend',
			`
				<li class="object-card-specifications__row">
					<span class="object-card-specifications__name">Площадь дома</span>
					<div class="object-card-specifications__dotted"></div>
					<span data-house-area class="object-card-specifications__meaning">${houseArea} м²</span>
				</li>
				<li class="object-card-specifications__row">
					<span class="object-card-specifications__name">Площадь участка</span>
					<div class="object-card-specifications__dotted"></div>
					<span data-plot-area class="object-card-specifications__meaning">${plotArea} сот</span>
				</li>
				<li class="object-card-specifications__row">
					<span class="object-card-specifications__name">Ремонт</span>
					<div class="object-card-specifications__dotted"></div>
					<span data-repair-type class="object-card-specifications__meaning">${repairType}</span>
				</li>
				<li class="object-card-specifications__row">
					<span class="object-card-specifications__name">Вид объекта</span>
					<div class="object-card-specifications__dotted"></div>
					<span data-object-type class="object-card-specifications__meaning">${objectType}</span>
				</li>
				<li class="object-card-specifications__row">
					<span class="object-card-specifications__name">Коммуникации</span>
					<div class="object-card-specifications__dotted"></div>
					<span data-communications class="object-card-specifications__meaning">${communications}</span>
				</li>`,
		)
}

function renderObjectCardTitle(objectType, houseArea, plotArea) {
	document
		.querySelector('.object-card-specifications__title')
		.insertAdjacentHTML(
			'beforeend',
			`
		<p>${objectType} ${houseArea} м²</p>
		<p>на участке ${plotArea} сот., м2, 2</p>
	`,
		)

	document.querySelector(
		'[data-card-title]',
	).textContent = `${objectType} ${houseArea} м² на участке ${plotArea} сот., м2, 2`
}

function renderObjectCardDescription(
	objectType,
	address,
	houseArea,
	plotArea,
	options,
	paymentMethods,
) {
	document.querySelector('.object-card-description').insertAdjacentHTML(
		'beforeend',
		`
			<div class="object-card-description__text-block">
					<h3 class="object-card-description__title">Описание:</h3>
					<h4 class="object-card-description__subtitle">Продается ${objectType}.</h4>
					<address class="object-card-description__address">${address}</address>
				</div>

				<div class="object-card-description__text-block">
					<h4 class="object-card-description__subtitle"><span>ОБЩАЯ ПЛОЩАДЬ</span> ${houseArea} кв. м УЧАСТОК ${plotArea} соток.</h4>
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

	options.forEach(option => {
		document
			.querySelector('[data-option-list]')
			.insertAdjacentHTML(
				'beforeend',
				`<li class="object-card-description__item">${option}.</li>`,
			)
	})
	paymentMethods.forEach(method => {
		document
			.querySelector('[data-payment-list]')
			.insertAdjacentHTML(
				'beforeend',
				`<li class="object-card-description__item">${method}.</li>`,
			)
	})
}

if (paginationList) {
	rangeSliderInit()
	fetchData()

	catalogList.addEventListener('click', e => {
		if (e.target.classList.contains('catalog-card__link')) {
			const card = e.target.closest('.catalog__item')
			const currentItem = dataBase.find(obj => obj.id === parseInt(card.id))
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
		})
	})

	filterSquareInputs.forEach(input => {
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
		}),
			input.addEventListener('change', () => {
				fetchData(true)
			})
	})

	btnReset.addEventListener('click', () => {
		filterFormReset()
		fetchData()
	})

	filterButton.addEventListener('click', () => {
		currentPage = 1
		startItem = 0
		endItem = maxItemsForPage
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
}

//====================================================================

async function fetchData(renderBlocking) {
	try {
		if (!dataBase.length) {
			const itemsResponse = await axios.get(`${baseUrl}/objects`)
			dataBase = itemsResponse.data
		}

		filter(dataBase, renderBlocking)
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
				return objectType.some(type => type === obj.objectType)
			} else if (
				!objectType.length &&
				repairType.length &&
				!landСategory.length
			) {
				return repairType.some(type => type === obj.repairType)
			} else if (
				!objectType.length &&
				!repairType.length &&
				landСategory.length
			) {
				return landСategory.some(type => type === obj.landСategory)
			} else if (
				objectType.length &&
				repairType.length &&
				!landСategory.length
			) {
				return (
					objectType.some(type => type === obj.objectType) &&
					repairType.some(type => type === obj.repairType)
				)
			} else if (
				!objectType.length &&
				repairType.length &&
				landСategory.length
			) {
				return (
					repairType.some(type => type === obj.repairType) &&
					landСategory.some(type => type === obj.landСategory)
				)
			} else if (
				objectType.length &&
				!repairType.length &&
				landСategory.length
			) {
				return (
					objectType.some(type => type === obj.objectType) &&
					landСategory.some(type => type === obj.landСategory)
				)
			} else if (
				objectType.length &&
				repairType.length &&
				landСategory.length
			) {
				return (
					objectType.some(type => type === obj.objectType) &&
					repairType.some(type => type === obj.repairType) &&
					landСategory.some(type => type === obj.landСategory)
				)
			}
			return true
		}
	})

	const sortData = sortType.length ? changeSorting(resultData) : ''

	totalPages = Math.ceil(resultData.length / perPage)
	catalogCount.textContent = resultData.length
	filterButtonCount.textContent = resultData.length

	!renderBlocking ? renderResultPage(sortData || resultData) : ''
}

function renderResultPage(data) {
	renderCard(data)
	renderPagination(totalPages, currentPage)
	changeVisibleMore(totalPages)
}

// <span class="count-number">
// <span>${objectType}</span>
// <span>${repairType}</span>
// <span>${landСategory}</span>
// <span>Дом: ${houseArea}</span>
// <span>Участок: ${plotArea}</span>
// </span>

function renderCard(data) {
	catalogList.innerHTML = ''
	data.forEach((item, index) => {
		if (index >= startItem && index < endItem) {
			const {
				id,
				preview,
				options,
				address,
				price,
				discount,
				objectType,
				repairType,
				landСategory,
				houseArea,
				plotArea,
			} = item
			catalogList.insertAdjacentHTML(
				'beforeend',
				`<li id="${id}" class="catalog__item">
	<article class="catalog__card catalog-card">
		<div class="catalog-card__image">
			<img src="${preview}" alt="">
		</div>
		<div class="catalog-card__text">
			<h3 class="catalog-card__title">${objectType} ${houseArea} м² на участке ${plotArea} сот., м2, 2</h3>
			<div class="catalog-card__description">
				<ul class="catalog-card__option-list"></ul>
				<address class="catalog-card__address">
					<svg class="icon">
						<use xlink:href="img/sprite.svg#locate"></use>
					</svg>
					${address}
				</address>
			</div>
			<div class="catalog-card__footer">
				<ul class="catalog-card__prices">
					<li class="catalog-card__price">
					<span>${getDigFormat(price)}</span>₽
					</li>
					<li class="catalog-card__price">
					<span>${getDigFormat(discount)}</span>₽
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

function rangeSliderInit() {
	if (!range || !inputMin || !inputMax) return

	const inputs = [inputMin, inputMax]

	noUiSlider.create(range, {
		start: [1_000_000, 20_000_000],
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
		fetchData(true)
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

function filterFormReset() {
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

	range.noUiSlider.set(['1 000 000', '20 000 000'])
	inputMin.textContent = '1 000 000'
	inputMax.textContent = '20 000 000'
	filterOptions.prices.min = '1000000'
	filterOptions.prices.max = '20000000'
}
