// const sectionAnimate = document.querySelectorAll('[data-section-animate]')

// window.addEventListener('scroll', sectionShow)

// function sectionShow() {
// 	const trigger = (window.innerHeight / 5) * 4

// 	sectionAnimate.forEach(item => {
// 		const sectionTop = item.getBoundingClientRect().top

// 		if (sectionTop < trigger) {
// 			item.classList.add('_section-show')
// 		} else {
// 			item.classList.remove('_section-show')
// 		}
// 	})
// }

const sectionAnimate = document.querySelectorAll('[data-section-animate')

sectionAnimate.forEach(section => {
	let activated = false

	const animationClass = section.classList[1]
	section.classList.remove(animationClass)

	window.addEventListener('scroll', () => {
		if (
			pageYOffset > section.offsetTop - window.innerHeight / 1.5 &&
			!activated
		) {
			section.classList.add(animationClass)

			activated = true
		} else if (
			pageYOffset < section.offsetTop - window.innerHeight &&
			activated
		) {
			section.classList.remove(animationClass)
			activated = false
		}
	})
})
