const container = document.querySelector('.counters')
const counters = document.querySelectorAll('.counters span')

let activated = false

window.addEventListener('scroll', () => {
	if (
		pageYOffset > container.offsetTop - container.offsetHeight - 200 &&
		activated === false
	) {
		counters.forEach(counter => {
			counter.innerText = 0
			let count = 0

			function updateCount() {
				const target = parseInt(counter.dataset.count)

				if (count < target) {
					count++
					counter.innerText = count

					setTimeout(updateCount, 5)
				} else {
					counter.innerText = target
				}
			}
			updateCount()
			activated = true
		})
	} else if (
		pageYOffset < container.offsetTop - container.offsetHeight - 500 ||
		(pageYOffset === 0 && activated === true)
	) {
		counters.forEach(counter => {
			counter.innerText = 0
		})
		activated = false
	}
})
