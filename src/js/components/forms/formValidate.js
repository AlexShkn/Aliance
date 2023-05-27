const forms = document.querySelectorAll('[data-form]')
const phones = document.querySelectorAll('[data-form-phone]')

let keyCode

// inputmask

function inputMask(event) {
	event.keyCode && (keyCode = event.keyCode)
	let pos = this.selectionStart
	if (pos < 3) event.preventDefault()
	let matrix = '+7 (___) ___-__-__',
		i = 0,
		def = matrix.replace(/\D/g, ''),
		val = this.value.replace(/\D/g, ''),
		newValue = matrix.replace(/[_\d]/g, function (a) {
			return i < val.length ? val.charAt(i++) || def.charAt(i) : a
		})
	i = newValue.indexOf('_')
	if (i != -1) {
		i < 5 && (i = 3)
		newValue = newValue.slice(0, i)
	}
	let reg = matrix
		.substr(0, this.value.length)
		.replace(/_+/g, function (a) {
			return '\\d{1,' + a.length + '}'
		})
		.replace(/[+()]/g, '\\$&')
	reg = new RegExp('^' + reg + '$')
	if (
		!reg.test(this.value) ||
		this.value.length < 5 ||
		(keyCode > 47 && keyCode < 58)
	)
		this.value = newValue
	if (event.type == 'blur' && this.value.length < 5) this.value = ''
}

phones.forEach(input => input.addEventListener('input', inputMask, false))
phones.forEach(input => input.addEventListener('focus', inputMask, false))
phones.forEach(input => input.addEventListener('blur', inputMask, false))
phones.forEach(input => input.addEventListener('keydown', inputMask, false))

// show input error message
function showError(input, message) {
	const formControl = input.parentElement
	formControl.className = 'form-control error'
	const small = formControl.querySelector('small')
	small.innerText = message
}

// show success message
function showSuccess(input) {
	const formControl = input.parentElement
	formControl.className = 'form-control success'
}

//check email is valid
function checkEmail(input) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (re.test(input.value.trim())) {
		showSuccess(input)
	} else {
		showError(input, 'Неверный email')
	}
}
function checkPhone(input) {
	const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
	if (re.test(input.value.trim())) {
		showSuccess(input)
	} else {
		showError(input, `Поле ${getFieldName(input)} обязательно для заполнения`)
	}
}

//check required fields
function checkRequired(inputArr) {
	inputArr.forEach(function (input) {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input)} обязательно для заполнения`)
		} else {
			showSuccess(input)
		}
	})
}

//check input length
function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} должно быть не менее ${min} символов`,
		)
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} должно быть меньше, чем ${max} символов`,
		)
	} else {
		showSuccess(input)
	}
}

function checkCheck(trigger, input) {
	if (!input.checked) {
		trigger.classList.add('_error')
	} else {
		trigger.classList.remove('_error')
	}
}

// Get fieldname
function getFieldName(input) {
	return input.name.charAt(0).toUpperCase() + input.name.slice(1)
}

if (forms.length) {
	forms.forEach(form => {
		const username = form.querySelector('[data-form-username]')
		// const email = form.querySelector('[data-form-email]')
		const phone = form.querySelector('[data-form-phone]')
		// const password = form.querySelector('[data-form-password]')
		// const password2 = form.querySelector('[data-form-password2]')
		const checkbox = form.querySelector('.checkbox')
		const checkboxInput = form.querySelector('[data-form-check]')

		form.addEventListener('submit', function (e) {
			e.preventDefault()
			checkRequired([username, phone])
			checkLength(username, 2, 15)
			checkLength(phone, 11, 11)
			checkPhone(phone)
			checkCheck(checkbox, checkboxInput)
		})
	})
}
