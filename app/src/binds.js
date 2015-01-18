function bindPastes() 
{
	$('.codePaste').each(function() {
	    CodeMirror.fromTextArea(this, {
	        mode: 'javascript',
	        theme: "monokai",
	        height: "300px",
	        lineNumbers: true,
	        readOnly: true
	    });
	});

	CodeMirror.fromTextArea(document.getElementById("defaultPaste"), {
	    mode: 'javascript',
	    theme: "monokai",
	    viewportMargin: Infinity,
	    lineNumbers: true,
	    readOnly: true
	});
}

function bindHowToInstall() 
{
	CodeMirror.fromTextArea(document.getElementById("howToInstall"), {
	    mode: 'javascript',
	    theme: "monokai",
	    height: "50px",
	    readOnly: true,
	    lineNumbers: true
	});
}

function bindHeaderPaster(editor) 
{
	$('#header').pastableNonInputable().on('pasteText', function(ev, data) {
		editor.setValue(data.text);
		$('#pastingButton').click();
	});
}

function bindPastingInput() 
{
	var codeEditor = CodeMirror.fromTextArea(document.getElementById('pastingStr'), {
	    lineNumbers: true,
	    viewportMargin: Infinity,
	    mode: "javascript",
	    autoCloseBrackets: true,
	    matchBrackets: true,
	    showTrailingSpace: true,
	    theme: "monokai",
	  	extraKeys: {
	        "F11": function(cm) {
	          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
	        },
	        "Esc": function(cm) {
	          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
	        }
	  	}
	});

	codeEditor.setValue("My first Pasting!");

	return codeEditor;
}

function bindRealTimeButton()
{
	// Socket (not work, for now)
	$('#realTimeBtn').on('click', function () {
		if (!connected) {
			if ($('#email').val() != '') {
				connected = true;
				$(this).css('background', "#67A749");
				swal("Use the follow Url to emit in real time!", baseUrl + '/' + $('#email').val().toLowerCase(), "success");
			} else {
				swal("Error!", "Please, fill the username field to emit in real time", "error");
			}
		} else {
			connected = false;
			$(this).css('background', "#E04646");
		}
		return false;
	});
}

function bindShareButton(editor)
{
	$('#shareBtn').on('click', function() {

		if ($('#email').val() != '' && $('#pwd').val() != '' && editor.getValue() != '') 
		{
			var Paste = new PasteModel();
			var pasteData = {
			    username: $('#email').val().toLowerCase(),
			    pwd: $('#pwd').val(),
			    text: editor.getValue()
			};

			NProgress.start();
			Paste.save(pasteData, {
				success: function (response) {
					NProgress.done();
					if (response.attributes.st == 'ok') {
						// swal("Your pasting has been created", baseUrl + $(emailSelector).val().toLowerCase(), "success");
						// window.location.hash = $(emailSelector).val().toLowerCase();
						location.href = '/' + $('#email').val().toLowerCase();
					} else {
						swal("Error", response.attributes.msg, "error");
					}
				}
	    	});
	    } else {
	    	swal("Error!", "Please, complete all fields", "error");
	    }
		return false;
	});
}

function bindSocket() 
{
	/*
	$strInput.on('keyup', function () {
		if (connected) {
			console.log('Emitted');
			socket.emit('send_data', {username: $email.val().toLowerCase(), text: pastingEditor.getValue()});
		}
	});
	*/

	/*
	socket.on('new_client', function(username) {
		if (connected) {
			console.log('Emitted new client connected');
			socket.emit('send_data', {username: $email.val().toLowerCase(), text: pastingEditor.getValue()});
		}
	});
	*/
}