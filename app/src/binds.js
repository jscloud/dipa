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
	  		message: 'Delete this Pasting?',
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
	
	codeEditor.setValue("My first Pasting!");
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
						$.cookie('v', response.attributes.v, {expires: 7, path: '/' });
						$.cookie('uid', response.attributes.userId, {expires: 7, path: '/' });
						$.cookie('u', response.attributes.u.toLowerCase(), {expires: 7, path: '/' });
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

function checkOauth()
{
	var oauth = false;
	if (($.cookie('v') !== undefined) && ($.cookie('uid') !== undefined) && ($.cookie('u') !== undefined)) 
	{
		$('.navlogin').hide();
		$('.navlogout').show();
		$('.navcreate').show();
		oauth = true;
	} else {
		$.removeCookie('v', { path: '/' });
		$.removeCookie('uid', { path: '/' });
		$.removeCookie('u', { path: '/' });
		$('.navlogin').show();
		$('.navcreate').hide();
		$('.navlogout').hide();
	}
	return oauth;
}

function bindLoginButtons () 
{
	$('.login').on('click', function() {
		vex.dialog.open({
		  message: 'Enter your username and password:',
		  input: "<input name=\"username\" type=\"text\" placeholder=\"Username\" required />\n<input name=\"password\" type=\"password\" placeholder=\"Password\" required /> <a href='/' style='text-align:right;'> Create Account</a>",
		  buttons: [
		    $.extend({}, vex.dialog.buttons.YES, {
		      text: 'Login'
		    }), $.extend({}, vex.dialog.buttons.NO, {
		      text: 'Cancel'
		    })
		  ],
		  callback: function(data) 
		  {
		  	NProgress.start();
		    if (data) {  
				var loginObj = new Login();
				var loginData = {username: data.username, pwd: data.password};
				loginObj.save(loginData, {
					success: function (response) 
					{
						if (response.attributes.st == 'ok') {
							$.cookie('v', response.attributes.v, {expires: 7, path: '/' });
							$.cookie('uid', response.attributes.userId, {expires: 7, path: '/' });
							$.cookie('u', response.attributes.username.toLowerCase(), {expires: 7, path: '/' });
							location.href = '/' + response.attributes.username.toLowerCase();
						} else {
							$.removeCookie('v', { path: '/' });
							$.removeCookie('uid', { path: '/' });
							$.removeCookie('u', { path: '/' });
							vex.dialog.alert(response.attributes.msg);
						}
					}
	    		});
		    } 
			NProgress.done();
		  }
		});
		return false;
	});
}