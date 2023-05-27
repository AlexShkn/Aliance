const aboutImage = document.querySelectorAll('.about-images__wrapper > img')

aboutImage.forEach(img => {
	img.addEventListener('click', () => {
		if (!img.classList.contains('show')) {
			aboutImage.forEach(img => {
				img.classList.remove('show')
			})
			img.classList.add('show')
		}
	})
})

const departCardButtonShow = document.querySelectorAll(
	'.developments-card__link',
)

departCardButtonShow.forEach(btn => {
	btn.addEventListener('click', e => {
		e.preventDefault()
		const card = btn.closest('.developments-card')
		card.classList.toggle('show')
	})
})

const reviewsCardButtonShow = document.querySelectorAll('.reviews-card__link')
const cardText = document.querySelectorAll('.reviews-card__text')

reviewsCardButtonShow.forEach(btn => {
	btn.addEventListener('click', e => {
		e.preventDefault()
		const card = e.target.closest('.reviews-card')
		card.classList.toggle('show')
	})
})

cardText.forEach(text => {
	const siblings = text.parentNode.querySelector('.reviews-card__link')
	if (text.offsetHeight < 65) {
		siblings.style.display = 'none'
	}
})

const reviewsSliderButtons = document.querySelector('.reviews__slider-buttons')
if (reviewsSliderButtons) {
	reviewsSliderButtons.addEventListener('click', () => {
		reviewsCardButtonShow.forEach(btn =>
			btn.closest('.reviews-card').classList.remove('show'),
		)
	})
}

//====================================================================
// удаление title на странице услуг
const url = window.location.href
const locateName = url.substring(url.lastIndexOf('/') + 1).split('.')[0]

if (locateName === 'services') {
	document.querySelector('.services__head').style.display = 'none'
}

//====================================================================
