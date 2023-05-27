// Проверка наличия элементов в списке для добавления стрелки
export const checkSiblingElements = el =>
	[].slice.call(el.parentNode.children).filter(child => child !== el)

//====================================================================
// Выравнивание набора элементов по максимальной высоте элемента
export function findMaxHeight(elements) {
	let max = 0
	elements.forEach(el => {
		max = Math.max(max, el.clientHeight)
	})
	return max
}
// function alignmentByHeight(classname) {
// 	let divs = document.querySelectorAll(classname)
// 	divs.forEach(el => {
// 		el.style.minHeight = `${findMaxHeight(divs)}px`
// 	})
// }
//====================================================================
// Получить цифры из строки
export function getDigFromString(item) {
	return parseInt(item.replace(/[^\d]/g, ''))
}
// Форматирование цифр типа 100 000 000
export function getDigFormat(item) {
	return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}
// Ввод только цифр event "input"
export function checkingInput(input) {
	const value = input.value
	input.value = value.replace(/\D/g, '')
}
// Убрать класс из всех элементов массива
export function removeClasses(array, className) {
	for (let i = 0; i < array.length; i++) {
		array[i].classList.remove(className)
	}
}
// Функция получения индекса внутри родительского элемента
export function indexInParent(parent, element) {
	const array = Array.prototype.slice.call(parent.children)
	return Array.prototype.indexOf.call(array, element)
}
// Добавление и удаление класса у набора элементов
export function changeClassItems(items) {
	items.forEach(item => {
		item.addEventListener('click', () => {
			if (!item.classList.contains('show')) {
				items.forEach(item => {
					item.classList.remove('show')
				})
				item.classList.add('show')
			}
		})
	})
}
