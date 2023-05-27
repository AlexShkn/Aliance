const timeCount = document.querySelector('.timer')
const targetDate = new Date('Sep 11, 2023 11:25:33').getTime()

const interval = setInterval(() => {
	const currentDate = new Date().getTime()
	const distance = targetDate - currentDate

	const days = Math.floor(distance / (1000 * 60 * 60 * 24))
	const hours = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60 * 60))
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((distance % (1000 * 60)) / 1000)

	timeCount.innerHTML = `${days} дней ${hours} часов ${minutes} минут ${seconds} секунд`

	if (distance < 0) {
		clearInterval(interval)
		timeCount.innerHTML = 'WELCOME!'
	}
}, 1000)
