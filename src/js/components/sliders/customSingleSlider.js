const sliderImages = document.querySelectorAll('.slider__img'),
	sliderLine = document.querySelector('.slider__line'),
	sliderDots = document.querySelectorAll('.slider__dot'),
	sliderBtnNext = document.querySelector('.slider__btn-next'),
	sliderBtnPrev = document.querySelector('.slider__btn-prev')

let sliderCount = 0,
	sliderWidth

// Адаптивность слайдера
window.addEventListener('resize', showSlide)

sliderBtnNext.addEventListener('click', nextSlide)
sliderBtnPrev.addEventListener('click', prevSlide)

// Автоматическое перелистывание слайдов
// setInterval(() => {
//     nextSlide()
// }, 3000);

// Функции ==================
// Задает нужную ширину картинки и sliderLine
function showSlide() {
	sliderWidth = document.querySelector('.slider').offsetWidth
	sliderLine.style.width = sliderWidth * sliderImages.length + 'px'
	sliderImages.forEach(item => (item.style.width = sliderWidth + 'px'))

	rollSlider()
}
showSlide()

// Перелистывает слайд вперед
function nextSlide() {
	sliderCount++
	if (sliderCount >= sliderImages.length) sliderCount = 0

	rollSlider()
	thisSlide(sliderCount)
}

// Перелистывает слайд назад
function prevSlide() {
	sliderCount--
	if (sliderCount < 0) sliderCount = sliderImages.length - 1

	rollSlider()
	thisSlide(sliderCount)
}

// Задает шаг перемещения слайдов
function rollSlider() {
	sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`
}

// Указывает как слайд по счету активен
function thisSlide(index) {
	sliderDots.forEach(item => item.classList.remove('_active'))
	if (index === 0) {
		sliderDots[0].classList.add('_active')
	}
	if (index > 0 && index < sliderImages.length - 1) {
		sliderDots[1].classList.add('_active')
	}
	if (index === sliderImages.length - 1) {
		sliderDots[2].classList.add('_active')
	}
}

// Вешает клик на dot
sliderDots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		sliderCount = index
		rollSlider()
		thisSlide(sliderCount)
	})
})
