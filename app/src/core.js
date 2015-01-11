function getTemplate(templatePath, data) {
	return window['JST'][templatePath](data);
}

var PasteModel = Backbone.Model.extend({
	urlRoot: apiUrl + '/create',
	defaults: {
	    code: 0
	}
});

var PublicPasteModel = Backbone.Model.extend({
    urlRoot: apiUrl + '/get/publics',
    defaults: {
    	username: ''
    }
});

var HomeView = Backbone.View.extend(
{
	el: 'body',
	initialize: function(){
		this.render();
	},
	render: function(){
		NProgress.start();
		this.$el.html(getTemplate('templates/header.html'));

		var dataFeatures = {"header" : true};
		this.$el.append(getTemplate('templates/pastingFeatures.html', dataFeatures));

		this.$el.append(getTemplate('templates/pastingSection.html'));
		this.$el.append(getTemplate('templates/pastingTeam.html'));
		this.$el.append(getTemplate('templates/footer.html'));
		NProgress.done();
	}
});

var UserView = Backbone.View.extend(
{
	el: 'body',
	initialize: function(userStr){
		this.render(userStr);
	},
	render: function(userStr){
		var dataUser = {"user" : userStr.toLowerCase()};
		this.$el.html(getTemplate('templates/userPublic.html', dataUser));
		
		var dataFeatures = {"header" : false};
		this.$el.append(getTemplate('templates/pastingFeatures.html', dataFeatures));

		this.$el.append(getTemplate('templates/footer.html'));
	}
});

var Router = Backbone.Router.extend (
	{ 
		routes: 
		{ 
			'' 				: function () 
			{
				var home_view = new HomeView();
			}, 
			'(:username)'	: function (username) 
			{
				NProgress.start();

				var socket = io.connect(emitterUrl);

				var user_view = new UserView(username.toLowerCase());

				var publicPastes = new PublicPasteModel();
				var fetchFilters = {username: username.toLowerCase()};

				publicPastes.fetch({ data: $.param(fetchFilters) }, 
				{
			    	success: function (response) {}
    			}).always(
    				function(response) { 
    					// console.log(response); // modelresponse
    					var defaultData = {"defaultPaste": response.publics[0]}
    					var data = {"pastes" : response.publics};
    					$('#textArea').html(getTemplate('templates/defaultPaste.html', defaultData));
    					$('#pastesTable').html(getTemplate('templates/pastesTable.html', data));
    					NProgress.done();
    					bindPastes();
    				}
    			);

				socket.on(username, function(text) {
					text = text.replace(/\n/g, "<br />");
					$('#textArea').html(text);
				});
				socket.emit('client_connection', username);
			} 
		} 
	}
);

var routing = new Router();
Backbone.history.start();

var ddd;

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

var connected = false;
$(document).ready(function() 
{
	$header 		= $('#header');
	$strInput 		= $('#pastingStr');
	$email    		= $('#email');
	$pastingButon 	= $('#pastingButton');
	$cmdSpan 		= $('#cmd');
	$pasteBox 		= $('#pasteBox');
	$realTimeBtn 	= $('#realTimeBtn');
	$shareBtn		= $('#shareBtn');
	$pwd			= $('#pwd');

	var codeEditor = CodeMirror.fromTextArea(document.getElementById("pastingStr"), {
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
    codeEditor.setValue("Paste or type your text here!");

	var socket = io.connect(emitterUrl);

	if (navigator.appVersion.indexOf("Mac") != -1) {
		$cmdSpan.html('⌘CMD');
		$pasteBox.attr('title', 'Press ⌘CMD+V on your keyboard to paste a text from your clipboard');
	}

	$header.pastableNonInputable().on('pasteText', function(ev, data) {
		codeEditor.setValue(data.text);
		$pastingButon.click();
	});

	$strInput.on('keyup', function () {
		if (connected) {
			console.log('Emitted');
			socket.emit('send_data', {username: $email.val().toLowerCase(), text: codeEditor.getValue()});
		}
	});

	$realTimeBtn.on('click', function () {
		if (!connected) {
			if ($email.val() != '') {
				connected = true;
				$(this).css('background', "#67A749");
				swal("Use the follow Url to emit in real time!", baseUrl + '/' + $email.val().toLowerCase(), "success");
			} else {
				swal("Error!", "Please, fill the username field to emit in real time", "error");
			}
		} else {
			connected = false;
			$(this).css('background', "#E04646");
		}
		return false;
	});

	$shareBtn.on('click', function() {

		if ($email.val() != '' && $pwd.val() != '' && codeEditor.getValue() != '') 
		{
			var Paste = new PasteModel();
			var pasteData = {
			    username: $email.val().toLowerCase(),
			    pwd: $pwd.val(),
			    text: codeEditor.getValue()
			};

			NProgress.start();
			Paste.save(pasteData, {
				success: function (response) {
					NProgress.done();
					// console.log(response);
					if (response.attributes.st == 'ok') {
						// swal("Your pasting has been created", baseUrl + $email.val().toLowerCase(), "success");
						// window.location.hash = $email.val().toLowerCase();
						location.href = baseUrl + '/' + $email.val().toLowerCase();
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
	
	socket.on('new_client', function(username) {
		if (connected) {
			console.log('Emitted new client connected');
			socket.emit('send_data', {username: $email.val().toLowerCase(), text: codeEditor.getValue()});
		}
	});
});