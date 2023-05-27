const fileInput = document.getElementById('file')

if (fileInput) {
	fileInput.addEventListener('change', () => {
		fileValidation(fileInput, fileInput.value)
	})
}

function fileValidation(input, file) {
	const allowedExtensions =
		/(\.doc|\.docx|\.odt|\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd)$/i

	if (!allowedExtensions.exec(file)) {
		alert('Invalid file type')
		input.value = ''
		return false
	}
}
