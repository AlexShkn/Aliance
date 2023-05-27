import { throttle } from '../../functions.js'

window.onload = () => {
	const progress = () => {
		const line = document.createElement('div')
		line.className = 'progress'
		line.style.cssText = `
      height: 6px;
      background: linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(47,47,81,1) 56%, rgba(2,0,36,1) 100%); 35%, rgba(0,212,255,1) 100%);
      position: fixed;
      top: 0;
      left: 0;
      transition: 1s;
      z-index: 99999;
    `

		document.body.prepend(line)

		const progressWidth = () => {
			return (line.style.width =
				Math.floor(
					(window.pageYOffset /
						(document.documentElement.scrollHeight - window.innerHeight)) *
						100,
				) + '%')
		}

		progressWidth()

		document.addEventListener('scroll', throttle(progressWidth, 64))
		window.addEventListener('resize', throttle(progressWidth, 64))
	}

	progress()
}
