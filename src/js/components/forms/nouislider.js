// import '../../libs/nouislider.min.js'

// const rangeSliderInit = () => {
// 	// создаем функцию инициализации слайдера
// 	const range = document.getElementById('range') // Ищем слайдер
// 	const inputMin = document.getElementById('min') // Ищем input с меньшим значнием
// 	const inputMax = document.getElementById('max') // Ищем input с большим значнием

// 	if (!range || !inputMin || !inputMax) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок

// 	const inputs = [inputMin, inputMax] // создаем массив из меньшего и большего значения

// 	noUiSlider.create(range, {
// 		// инициализируем слайдер
// 		start: [1_000_000, 10_000_000], // устанавливаем начальные значения
// 		connect: true, // указываем что нужно показывать выбранный диапазон
// 		range: {
// 			// устанавливаем минимальное и максимальное значения
// 			min: 1_000_000,
// 			max: 10_000_000,
// 		},
// 		step: 100_000, // шаг изменения значений
// 	})

// 	range.noUiSlider.on('update', function (values, handle) {
// 		// при изменений положения элементов управления слайдера изменяем соответствующие значения

// 		const formatter = new Intl.NumberFormat('ru')
// 		inputs[handle].textContent = formatter.format(parseInt(values[handle]))
// 	})

// 	inputMin.addEventListener('change', function () {
// 		// при изменении меньшего значения в input - меняем положение соответствующего элемента управления
// 		range.noUiSlider.set([this.textContent, null])
// 	})

// 	inputMax.addEventListener('change', function () {
// 		// при изменении большего значения в input - меняем положение соответствующего элемента управления
// 		range.noUiSlider.set([null, this.textContent])
// 	})
// }

// const init = () => {
// 	rangeSliderInit() // запускаем функцию инициализации слайдера
// }

// window.addEventListener('DOMContentLoaded', init) // запускаем функцию init, когда документ будет загружен и готов к взаимодействию
