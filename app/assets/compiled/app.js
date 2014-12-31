this["JST"] = this["JST"] || {};

this["JST"]["templates/home.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<!-- Default Header -->\n<section id="header" class="dark">\n\t<header>\n\t\t<h1>PASTING.IO </h1>\n\t\t<p>Paste and share your text. Fast, free and real time support</p>\n\t\t<p></p>\n\t\t<div class="center pasteBox" title="Press CONTROL+V on your keyboard to paste a text from your clipboard\'" id="pasteBox">\n\t\t \t<p>PRESS <span class="olights" id="cmd">CONTROL</span> + <span class="olights">V</span></span> </p>\n\t\t</div>\n\t</header>\n\t<footer>\n\t\t<a href="#mainFeatures" class="button scrolly">Pasting Features ?</a>\n\t\t<a href="#pasteText" class="button scrolly" id="pastingButton">or Type and share !</a>\n\t</footer>\n</section>';
return __p
};

this["JST"]["templates/shared.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<!-- mainFeatures -->\n<section id="mainFeatures" class="main">\n\t<header>\n\t\t<div class="container">\n\t\t\t<h2>PASTING MAIN FEATURES</h2>\n\t\t\t<p>Comparte texto entre diferentes dispositivos y colegas de manera sensilla. <br />\n\t\t\tYa no más auto-emails. Tu clipboard al mundo en un solo click</p>\n\t\t</div>\n\t</header>\n\t<div class="content dark style1 featured">\n\t\t<div class="container">\n\t\t\t<div class="row">\n\t\t\t\t<div class="4u">\n\t\t\t\t\t<section>\n\t\t\t\t\t\t<span class="feature-icon"><span class="icon fa-clock-o"></span></span>\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h3>Fast & Free</h3>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<p>Texto descri</p>\n\t\t\t\t\t</section>\n\t\t\t\t</div>\n\t\t\t\t<div class="4u">\n\t\t\t\t\t<section>\n\t\t\t\t\t\t<span class="feature-icon"><span class="icon fa-cloud"></span></span>\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h3>Cloud & Real Time</h3>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<p>Texto descri</p>\n\t\t\t\t\t</section>\n\t\t\t\t</div>\n\t\t\t\t<div class="4u">\n\t\t\t\t\t<section>\n\t\t\t\t\t\t<span class="feature-icon"><span class="icon fa-slideshare"></span></span>\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h3>By Nerds, for Nerds </h3>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<p>Texto descri</p>\n\t\t\t\t\t</section>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="row">\n\t\t\t\t<div class="12u">\n\t\t\t\t\t<footer>\n\t\t\t\t\t\t<a href="#pasteText" class="button scrolly">Pasting Now !</a>\n\t\t\t\t\t</footer>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>\n\n<!-- pastingSection (pasteText) -->\n<section id="pasteText" class="main">\n\t<header>\n\t\t<div class="container">\n\t\t\t<h2>SHARE YOUR TEXT </h2>\n\t\t\t<h2>or EMIT IN REAL TIME </h2>\n\t\t</div>\n\t</header>\n\t<div class="content style4 featured">\n\t\t<div class="container 75%">\n\t\t\t<form method="post" action="#" name="pastingForm">\n\t\t\t\t<div class="row 50%">\n\t\t\t\t\t<div class="6u"><input type="text" name="email" placeholder="Enter an username, email or secret phrase" id="email" required /></div>\n\t\t\t\t\t<div class="6u"><input type="text" placeholder="Set password (Optional)" /></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row 50%">\n\t\t\t\t\t<div class="12u"><textarea placeholder="Paste or type your text!" id="pastingStr" required></textarea></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="12u">\n\t\t\t\t\t\t<ul class="actions">\n\t\t\t\t\t\t\t<li><input type="submit" class="button" value="Share Now!" /></li>\n\t\t\t\t\t\t\t<li><input type="submit" class="button realTime" value="Real Time!" id="realTimeBtn" /></li>\n\t\t\t\t\t\t\t<li><input type="reset" class="button alt" value="Clear Text " /></li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n</section>\n\n<!-- ourTeam -->\n<section id="ourTeam" class="main">\n\t<div class="content dark style3">\n\t\t<div class="container">\n\t\t\t<h2>OUR TEAM</h2>\n\t\t\t<p>Breve descripción de la filosfia/historia del equipo y circulos centrados con las imagenes de c/u<br /></p>\n\t\t</div>\n\t</div>\n</section>\n\n<!-- Footer -->\n<section id="footer">\n\t<ul class="icons">\n\t\t<li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>\n\t\t<li><a href="#" class="icon fa-facebook"><span class="label">Facebook</span></a></li>\n\t\t<li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>\n\t\t<li><a href="#" class="icon fa-github"><span class="label">GitHub</span></a></li>\n\t</ul>\n\t<div class="copyright">\n\t\t<ul class="menu">\n\t\t\t<li>&copy; JSCLOUD. All rights reserved.</li><li><a href="http://pasting.io">PASTING.IO</a></li>\n\t\t</ul>\n\t</div>\n</section>';
return __p
};

this["JST"]["templates/test.html"] = function(obj) {
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }


    var length = userList.length;
    for (var index = 0; index < length; index++) {
        var user = userList[index];
;
__p += '\n        <tr>\n            <td>' +
((__t = ( index )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( user.firstName )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( user.lastName )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( user.email )) == null ? '' : __t) +
'</td>\n        </tr>\n';
 } ;
__p += '\n';
return __p
};

this["JST"]["templates/user.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<section class="main">\n\t<header>\n\t\t<div class="container">\n\t\t\t<h2>PASTING.IO</h2>\n\t\t\t<p>Paste and share your text. Fast, free and real time support</p>\n\t\t\t<p id="textArea"></p>\n\t\t</div>\n\t</header>\n\t<div class="content style1 dark">\n\t\t<div class="container">\n\t\t\t<section>\n\t\t\t\t<header>\n\t\t\t\t\t<h3>Pasting Cloud history: <span id="userSpan"> ' +
((__t = ( obj.user )) == null ? '' : __t) +
' </span></h3>\n\t\t\t\t</header>\n\t\t\t\t<div class="table-wrapper">\n\t\t\t\t\t<table class="default">\n\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th>ID</th>\n\t\t\t\t\t\t\t\t<th>Name</th>\n\t\t\t\t\t\t\t\t<th>Description</th>\n\t\t\t\t\t\t\t\t<th>Action</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>00001</td>\n\t\t\t\t\t\t\t\t<td>Lorem ipsum dolor</td>\n\t\t\t\t\t\t\t\t<td>Ut porttitor sagittis lorem quis nisi ornare.</td>\n\t\t\t\t\t\t\t\t<td>Delete</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>00002</td>\n\t\t\t\t\t\t\t\t<td>Sit amet nullam</td>\n\t\t\t\t\t\t\t\t<td>Ut porttitor sagittis lorem quis nisi ornare.</td>\n\t\t\t\t\t\t\t\t<td>Delete</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>00003</td>\n\t\t\t\t\t\t\t\t<td>Feugiat felis viverra</td>\n\t\t\t\t\t\t\t\t<td>Ut porttitor sagittis lorem quis nisi ornare.</td>\n\t\t\t\t\t\t\t\t<td>Delete</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>00004</td>\n\t\t\t\t\t\t\t\t<td>Sagittis enim felis</td>\n\t\t\t\t\t\t\t\t<td>Ut porttitor sagittis lorem quis nisi ornare.</td>\n\t\t\t\t\t\t\t\t<td>Delete</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</tbody>\n\t\t\t\t\t</table>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t</div>\n\t</div>\n</section>';
return __p
};
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
				swal("Use the follow Url to share your text in real time!", "http://pasting.io/" + $email.val(), "success");
			} else {
				swal("Error!", "Please, fill the username field to share your text", "error");
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