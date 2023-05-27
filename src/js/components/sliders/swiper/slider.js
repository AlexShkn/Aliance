document.addEventListener('DOMContentLoaded', () => {
	const developments = document.querySelector('.developments-slider')
	let developmentsSlider

	function developmentSliderInit() {
		developmentsSlider = new Swiper('.developments-slider', {
			// Arrows
			navigation: {
				nextEl: '.developments__slider-next',
				prevEl: '.developments__slider-prev',
			},

			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 30,
				},

				768: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
			},
		})
	}

	if (developments) {
		if (window.innerWidth < 992) {
			developmentSliderInit()
		}

		window.addEventListener('resize', () => {
			if (window.innerWidth > 992 && developmentsSlider) {
				developmentsSlider.destroy()
				developmentsSlider = null
			} else if (window.innerWidth < 992 && !developmentsSlider) {
				developmentSliderInit()
			}
		})
	}

	//====================================================================
	const reviewsMore = document.querySelector('.reviews-more-slider')
	let reviewsMoreSlider

	function reviewsMoreSliderInit() {
		reviewsMoreSlider = new Swiper('.reviews-more-slider', {
			spaceBetween: 20,
			slidesPerView: 1,

			// Arrows
			navigation: {
				nextEl: '.reviews-more__slider-next',
				prevEl: '.reviews-more__slider-prev',
			},
		})
	}

	if (reviewsMore) {
		if (window.innerWidth < 576) {
			reviewsMoreSliderInit()
		}

		window.addEventListener('resize', () => {
			if (window.innerWidth > 576 && reviewsMoreSlider) {
				reviewsMoreSlider.destroy()
				reviewsMoreSlider = null
			} else if (window.innerWidth < 576 && !reviewsMoreSlider) {
				reviewsMoreSliderInit()
			}
		})
	}

	//====================================================================

	const reviewsSlider = new Swiper('.reviews-slider', {
		spaceBetween: 20,
		slidesPerView: 3,
		watchSlidesProgress: true,

		// Arrows
		navigation: {
			nextEl: '.reviews__slider-next',
			prevEl: '.reviews__slider-prev',
		},

		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
		},
	})

	const worksSlider = new Swiper('.works-slider', {
		spaceBetween: 20,
		slidesPerView: 3,
		watchSlidesProgress: true,

		// Arrows
		navigation: {
			nextEl: '.works__slider-next',
			prevEl: '.works__slider-prev',
		},

		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
		},
	})

	const cardSlider = new Swiper('.object-card-slider', {
		spaceBetween: 10,
		slidesPerView: 1,

		navigation: {
			nextEl: '.object-card-slider__next',
			prevEl: '.object-card-slider__prev',
		},
		loop: true,
		loopedSlides: 4,
	})
	const cardThumbsSlider = new Swiper('.object-card-slider-thumbs', {
		spaceBetween: 10,
		slidesPerView: 4,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		loop: true,
		loopedSlides: 4,

		breakpoints: {
			320: {
				slidesPerView: 2,
				spaceBetween: 10,
			},

			480: {
				slidesPerView: 4,
				spaceBetween: 10,
			},
		},
	})
	cardSlider.controller.control = cardThumbsSlider
	cardThumbsSlider.controller.control = cardSlider
})

//====================================================================

//	effect: 'fade',
// 	autoplay: {
// 		delay: 3000,
// 		disableOnInteraction: false,
// 	},
// 	*/
// 	observer: true,
// 	observeParents: true,
// 	slidesPerView: 1,
// 	spaceBetween: 32,
// 	autoHeight: true,
// 	speed: 800,
// 	//touchRatio: 0,
// 	//simulateTouch: false,
// 	loop: true,
// 	//preloadImages: false,
// 	//lazy: true,
// 	// Dotts
// 	//pagination: {
// 	//	el: '.slider-quality__pagging',
// 	//	clickable: true,
// 	//},
// 	// Arrows
// 	navigation: {
// 		nextEl: '.slider-arrow_next',
// 		prevEl: '.slider-arrow_prev ',
// 	},
// 	breakpoints: {
// 		320: {
// 			// slidesPerView: 1,
// 			// spaceBetween: 0,
// 			autoHeight: true,
// 		},
// 		768: {
// 			// slidesPerView: 2,
// 			// spaceBetween: 20,
// 			autoHeight: false,
// 		},
// 		// 992: {
// 		// 	slidesPerView: 3,
// 		// 	spaceBetween: 20,
// 		// },
// 		// 1268: {
// 		// 	slidesPerView: 4,
// 		// 	spaceBetween: 30,
// 		// },
// 	},
//});

// const worksBulletStart = document.querySelector('[data-works-bullet-start]')
// const worksBulletMiddle = document.querySelector('[data-works-bullet-middle]')
// const worksBulletEnd = document.querySelector('[data-works-bullet-end]')

// const worksSlider = new Swiper('.works-slider', {
// 	observer: true,
// 	observeParents: true,
// 	spaceBetween: 28,
// 	navigation: {
// 		nextEl: '.works-slider-next',
// 		prevEl: '.works-slider-prev',
// 	},
// 	breakpoints: {
// 		320: {
// 			slidesPerView: 1,
// 		},
// 		768: {
// 			spaceBetween: 10,
// 			slidesPerView: 2,
// 		},
// 		991: {
// 			spaceBetween: 15,
// 			slidesPerView: 3,
// 		},
// 	},

// 	on: {
// 		//Если слайд последний
// 		reachEnd: () => {
// 			worksBulletEnd.classList.add('_active')
// 			worksBulletMiddle.classList.remove('_active')
// 		},
// 		//Если слайд первый
// 		reachBeginning: () => {
// 			worksBulletStart.classList.add('_active')
// 			worksBulletMiddle.classList.remove('_active')
// 		},
// 		// Если не начальная и не конечная позиция
// 		fromEdge: () => {
// 			worksBulletStart.classList.remove('_active')
// 			worksBulletEnd.classList.remove('_active')
// 			worksBulletMiddle.classList.add('_active')
// 		},
// 	},
// })
