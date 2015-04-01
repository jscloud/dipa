function doHighlight() 
{
	hljs.initHighlightingOnLoad();
}

function bindCopies() 
{
	var client = new ZeroClipboard( document.getElementsByClassName("p-copy") );
	client.on( "ready", function( readyEvent ) {
	  client.on( "aftercopy", function( event ) {
	  	mixpanel.track("Copy paste link");
	  	swal({title: "Copied", type: "success", timer: 1000});
	  } );
	});
}

function bindDeletes() 
{
	$('.delete').on('click', function() 
	{
		var documentId = $(this).data('del-documentid');
		var cred = $.cookie('v') + ":" + $.cookie('u');
		vex.dialog.confirm({
	  		message: 'Delete this Pasting?',
	  		callback: function(value) 
	  		{
	    		if (value) 
	    		{
	    			NProgress.start();
				  	var Delete = new DeletePasteModel();
					var deleteData = {
						v: cred, 
						documentId: documentId
					};
					
					Delete.save(deleteData, {
						success: function (response) 
						{
							NProgress.done();
							if (response.attributes.st == 'ok') {

								mixpanel.track("Delete paste", {
									"userId" : $.cookie('uid'),
    								"userName": $.cookie('u'),
    								"pasteId": documentId
								});

								location.href = "/" + $.cookie('u');
							} else {

								mixpanel.track("Failed Delete paste", {
									"userId" : $.cookie('uid'),
    								"userName": $.cookie('u'),
    								"pasteId": documentId,
    								"errorMsg" : response.attributes.msg
								});

								swal("Error", response.attributes.msg, "error");
							}
						}
			    	});
	    		}
	  		}
		});
	});
}

function bindLoginButtons () 
{
	$('.login').on('click', function() {
		vex.dialog.open({
		  message: 'Enter your username and password',
		  input: "<input name=\"username\" type=\"text\" placeholder=\"Username\" required />\n<input name=\"password\" type=\"password\" placeholder=\"Password\" required /> <div style='float:right'><a href='/landing/#signup' style='text-align:right;'> Create Account</a></div></br>",
		  buttons: [
		    $.extend({}, vex.dialog.buttons.YES, {
		      text: 'Login'
		    }), $.extend({}, vex.dialog.buttons.NO, {
		      text: 'Cancel'
		    })
		  ],
		  callback: function(data) 
		  {
		    if (data) {  
		    	NProgress.start();
				var loginObj = new Login();
				var loginData = {username: data.username, pwd: data.password};
				loginObj.save(loginData, {
					success: function (response) 
					{
						if (response.attributes.st == 'ok') {

							mixpanel.identify(response.attributes.userId);

							mixpanel.track("User Logged", {
    							"userId": response.attributes.userId,
    							"userName": response.attributes.username.toLowerCase()
							});

							$.cookie('v', response.attributes.v, {expires: 7, path: '/' });
							$.cookie('uid', response.attributes.userId, {expires: 7, path: '/' });
							$.cookie('u', response.attributes.username.toLowerCase(), {expires: 7, path: '/' });
							location.href = '/' + response.attributes.username.toLowerCase();
						} else {

							mixpanel.track("Failed Login", {
								"userName": data.username,
								"password": data.password,
								"msgError": response.attributes.msg
							});

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

function bindNewPaste() 
{
	$('.newpaste').on('click', function() {
		vex.dialog.open({
		  message: 'New Paste',
		  input: "<textarea class='pasteInput' placeholder='Paste or type here!' name='pasteInput' style='font-size:13px;background: #272822; color: #f8f8f2; border-radius: 0.5em; font-family: monospace;font-size: medium;height: 240px;' required></textarea>
			<div style='float:right'><input type='checkbox' name='privateFlag' value='1'>Private Paste</div></br>",
		  buttons: [
		    $.extend({}, vex.dialog.buttons.YES, {
		      text: 'Create'
		    }), $.extend({}, vex.dialog.buttons.NO, {
		      text: 'Cancel'
		    })
		  ],
		  callback: function(data) 
		  {
		  	if (data) 
		  	{
		  		var textStr = data.pasteInput;
		  		if (textStr != '') {
		  			NProgress.start();
				  	var Paste = new NewPasteModel();
					var pasteData = {
						v: $.cookie('v') + ":" + $.cookie('u'), 
						protected: data.privateFlag,
						text: textStr
					};

					Paste.save(pasteData, {
						success: function (response) 
						{
							mixpanel.track("New paste", {
    							"pasteId": response.attributes.documentId,
    							"userName": response.attributes.username
							});

							console.log(response);
							NProgress.done();
							if (response.attributes.st == 'ok') {
								location.href = "/" + response.attributes.username + "/" + response.attributes.documentId;
							} else {
								mixpanel.track("Failed New paste");
								swal("Error", response.attributes.msg, "error");
							}
						}
			    	});
		  		}
		  	};
		  }
		})

		return false;
	});
}

function checkOauth()
{
	var oauth = false;
	if (($.cookie('v') !== undefined) && ($.cookie('uid') !== undefined) && ($.cookie('u') !== undefined)) 
	{
		$('.login').hide();
		$('#signUp').hide();
		$('#loginButtonHead').hide();
		$('.logout').show();
		$('.float-button').show();
		oauth = true;
	} else {
		$.removeCookie('v', { path: '/' });
		$.removeCookie('uid', { path: '/' });
		$.removeCookie('u', { path: '/' });
		$('.login').show();
		$('.logout').hide();
		$('#signUp').show();
		$('loginButtonHead').show();
		$('.float-button').hide();
	}
	return oauth;
}
