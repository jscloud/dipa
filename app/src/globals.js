function getTemplate(templatePath, data) {
	return window['JST'][templatePath](data);
}