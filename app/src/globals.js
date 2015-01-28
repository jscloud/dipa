function getTemplate(templatePath, data) {
	return window['JST'][templatePath](data);
}

function doForPlatform() 
{
	if (navigator.appVersion.indexOf("Mac") != -1) {
		$('#cmd').html('⌘CMD');
		$('#pasteBox').attr('title', 'Press ⌘CMD+V on your keyboard to paste a text from your clipboard');
	}
}