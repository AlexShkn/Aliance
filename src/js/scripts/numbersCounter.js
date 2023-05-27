const counterAnim = (qSelector, start = 0, end, duration = 1000) => {
	const target = document.querySelector(qSelector)
	let startTimestamp = null
	const step = timestamp => {
		if (!startTimestamp) startTimestamp = timestamp
		const progress = Math.min((timestamp - startTimestamp) / duration, 1)
		target.innerText = Math.floor(progress * (end - start) + start)
		if (progress < 1) {
			window.requestAnimationFrame(step)
		}
	}
	window.requestAnimationFrame(step)
}

const valueDisplays = document.querySelectorAll(
	'.about-advantages__count > span',
)

window.addEventListener('DOMContentLoaded', () => {
	const countNumbs = () => {
		const numbersObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					valueDisplays.forEach(valueDisplay => {
						let startValue = parseInt(valueDisplay.textContent)
						let endValue = parseInt(valueDisplay.getAttribute('data-value'))
						let duration = parseInt(valueDisplay.getAttribute('data-duration'))
						counterAnim(`#${valueDisplay.id}`, startValue, endValue, duration)
					})

					observer.unobserve(entry.target)
				}
			})
		})
		valueDisplays.forEach(num => {
			numbersObserver.observe(num)
		})
	}
	countNumbs()
})
