const images = document.querySelectorAll('[data-lightbox-image]')
const lightbox = document.querySelector('.lightbox')
const mainImg = document.querySelector('.lightbox img')
const arrLeft = document.querySelector('.lightbox-arrow-left')
const arrRight = document.querySelector('.lightbox-arrow-right')

let imgIndex = 0

images.forEach(img => {
	img.addEventListener('click', e => {
		mainImg.src = e.target.src
		imgIndex = [...images].indexOf(img)
		lightbox.style.display = 'flex'
		setTimeout(() => {
			lightbox.style.opacity = '1'
		}, 10)
	})
})

window.addEventListener('click', e => {
	if (e.target.classList.contains('lightbox')) {
		lightbox.style.opacity = '0'
		setTimeout(() => {
			lightbox.style.display = 'none'
		}, 350)
	}
})

arrLeft.addEventListener('click', () => {
	imgIndex--
	if (imgIndex < 0) {
		imgIndex = images.length - 1
	}
	mainImg.src = images[imgIndex].src
})

arrRight.addEventListener('click', () => {
	imgIndex++
	if (imgIndex > images.length - 1) {
		imgIndex = 0
	}
	mainImg.src = images[imgIndex].src
})
