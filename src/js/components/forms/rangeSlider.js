class Slider {
	constructor(rangeElement, valueElement, options) {
		this.rangeElement = rangeElement
		this.valueElement = valueElement
		this.options = options

		// Attach a listener to "change" event
		this.rangeElement.addEventListener('input', this.updateSlider.bind(this))
	}

	// Initialize the slider
	init() {
		this.rangeElement.setAttribute('min', options.min)
		this.rangeElement.setAttribute('max', options.max)
		this.rangeElement.value = options.cur

		this.updateSlider()
	}

	// Format the money
	asMoney(value) {
		return parseFloat(value).toLocaleString('en-US', {
			maximumFractionDigits: 2,
		})
	}

	generateBackground(rangeElement) {
		if (this.rangeElement.value === this.options.min) {
			return
		}

		let percentage =
			((this.rangeElement.value - this.options.min) /
				(this.options.max - this.options.min)) *
			100
		return (
			'background: linear-gradient(to right, #2D4872, #2D4872 ' +
			percentage +
			'%, #D1D1D1 ' +
			percentage +
			'%, #dee1e2 100%)'
		)
	}

	updateSlider(newValue) {
		this.valueElement.innerHTML = this.asMoney(this.rangeElement.value)
		this.rangeElement.style = this.generateBackground(this.rangeElement.value)
	}
}

let rangeElement = document.querySelector(
	'.calculate-form__range-slider [type="range"]',
)
let valueElement = document.querySelector('.calculate-form__range-value span')

let options = {
	min: 1,
	max: 500,
	cur: 35,
}

if (rangeElement) {
	let slider = new Slider(rangeElement, valueElement, options)

	slider.init()
}
