// Lazy Load
// <picture>
// 	<source type="image/webp" data-srcset="@img/1x1.png">
// 	<img data-src="@img/services/appartment.jpg" src="@img/1x1.png" alt="Квартира">
// </picture>

const lazyImages = document.querySelectorAll(
	'img[data-src],source[data-srcset]',
)
const loadMapBlocks = document.querySelectorAll('._load-map')

const currentMapLoad = (maps, options) => {
	const observer = new IntersectionObserver(trueCallback, options)
	observer.disconnect()
	document.addEventListener('scroll', trigScroll(maps, observer))
	document.addEventListener('load', trigScroll(maps, observer))

	function trueCallback(entries) {
		entries.forEach(entry => {
			const intersecting = entry.isIntersecting
			const mapUrl = entry.target.dataset.map

			if (intersecting) {
				if (mapUrl && !entry.target.classList.contains('_loaded')) {
					entry.target.insertAdjacentHTML(
						'beforeend',
						`<iframe src="${mapUrl}" width="100%" height="340" frameborder="0" </iframe>`,
					)
					entry.target.classList.add('_loaded')
				}
			}
		})
	}
}

const currentImageLoad = (images, options) => {
	const observer = new IntersectionObserver(trueCallback, options)
	observer.disconnect()
	document.addEventListener('scroll', trigScroll(images, observer))
	document.addEventListener('load', trigScroll(images, observer))

	function trueCallback(entries) {
		entries.forEach(entry => {
			const intersecting = entry.isIntersecting

			if (intersecting) {
				if (entry.target.dataset.src) {
					entry.target.src = entry.target.dataset.src
					entry.target.removeAttribute('data-src')
				} else if (entry.target.dataset.srcset) {
					entry.target.src = entry.target.dataset.srcset
					entry.target.removeAttribute('data-srcset')
				}
			}
		})
	}
}

function trigScroll(items, observer) {
	if (items) {
		items.forEach(function (element) {
			observer.observe(element)
		})
	}
}

if (lazyImages) {
	currentImageLoad(lazyImages, {
		rootMargin: '-20% 0% -20% 0%',
		threshold: 0,
	})
}

if (loadMapBlocks) {
	currentMapLoad(loadMapBlocks, {
		rootMargin: '-20% 0% -20% 0%',
		threshold: 0,
	})
}
