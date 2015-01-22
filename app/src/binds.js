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

function bindCopies() 
{
	var client = new ZeroClipboard( document.getElementsByClassName("p-copy") );
	client.on( "ready", function( readyEvent ) {
	  client.on( "aftercopy", function( event ) {
	  	swal({title: "Copied!", type: "success", timer: 1000});
	  } );
	});
}

function bindDeletes() 
{
	$('.delete').on('click', function() 
	{
		var documentid = $(this).data('documentid');

		vex.dialog.confirm({
	  		message: 'Delete this Pasting?' + documentid,
	  		callback: function(value) {
	    		return console.log(value ? 'Successfully' : 'Cancel delete');
	  		}
		});
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

	//codeEditor.setValue("");

	return codeEditor;
}

function bindShareButton(editor)
{
	$('#shareBtn, #shareBtnPrivate').on('click', function() {

		if ($('#email').val() != '' && $('#pwd').val() != '' && editor.getValue() != '') 
		{
			var Paste = new PasteModel();
			var pasteData = {
			    username: $('#email').val().toLowerCase(),
			    pwd: $('#pwd').val(),
			    text: editor.getValue(),
			    protected: $(this).data('protected')
			};

			NProgress.start();
			Paste.save(pasteData, {
				success: function (response) {
					NProgress.done();
					if (response.attributes.st == 'ok') {
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