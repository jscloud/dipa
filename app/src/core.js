function getTemplate(templatePath, data) {
	return window['JST'][templatePath](data);
}

var HomeView = Backbone.View.extend(
{
	el: 'body',
	initialize: function(){
		this.render();
	},
	render: function(){
		NProgress.start();
		this.$el.html(getTemplate('templates/home.html'));
		this.$el.append(getTemplate('templates/shared.html'));
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
		NProgress.start();
		var data = {"user" : userStr.toLowerCase()};
		this.$el.html(getTemplate('templates/user.html', data));
		this.$el.append(getTemplate('templates/shared.html'));
		NProgress.done();
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
				var socket = io.connect('http://emitter.pasting.io');
				var user_view = new UserView(username.toLowerCase());

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

var connected = false;
$(document).ready(function() 
{
	$header = $('#header');
	$strInput = $('#pastingStr');
	$email    = $('#email');
	$pastingButon = $('#pastingButton');
	$cmdSpan = $('#cmd');
	$pasteBox = $('#pasteBox');
	$realTimeBtn = $('#realTimeBtn');

	var socket = io.connect('http://emitter.pasting.io');

	if (navigator.appVersion.indexOf("Mac") != -1) {
		$cmdSpan.html('⌘CMD');
		$pasteBox.attr('title', 'Press ⌘CMD+V on your keyboard to paste a text from your clipboard');
	}

	$header.pastableNonInputable().on('pasteText', function(ev, data) {
		$strInput.val(data.text);
		$pastingButon.click();
	});

	$strInput.on('keyup', function () {
		if (connected) {
			console.log('Emitted');
			socket.emit('send_data', {username: $email.val().toLowerCase(), text: $strInput.val()});
		}
	});

	$realTimeBtn.on('click', function () {
		if (!connected) {
			if ($email.val() != '') {
				connected = true;
				$(this).css('background', "#67A749");
				swal("Use the follow Url to emit in real time!", "http://pasting.io/" + $email.val().toLowerCase(), "success");
			} else {
				swal("Error!", "Please, fill the username field to emit in real time", "error");
			}
		} else {
			connected = false;
			$(this).css('background', "#E04646");
		}
		return false;
	});
	
	socket.on('new_client', function(username) {
		if (connected) {
			console.log('Emitted new client connected');
			socket.emit('send_data', {username: $email.val().toLowerCase(), text: $strInput.val()});
		}
	});
});