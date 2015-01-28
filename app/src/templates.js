this["JST"] = this["JST"] || {};

this["JST"]["templates/defaultMenu.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<li><a data-clipboard-text="' +
((__t = ( obj.text )) == null ? '' : __t) +
'" title="Click to copy text" class="p-copy">COPY TEXT</a></li>\n<li><a data-clipboard-text="' +
((__t = ( obj.baseUrl )) == null ? '' : __t) +
'/p/' +
((__t = ( obj.documentId )) == null ? '' : __t) +
'" title="Click to copy link" class="p-copy">COPY LINK</a></li>\n<li><a href="' +
((__t = ( obj.apiUrl )) == null ? '' : __t) +
'/raw/' +
((__t = ( obj.documentId )) == null ? '' : __t) +
'" target="_blank">RAW</a></li>\n<li><a class="delete" data-documentid="' +
((__t = ( obj.documentId )) == null ? '' : __t) +
'">DELETE</a></li>';
return __p
};

this["JST"]["templates/defaultPaste.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<textarea id="defaultPaste">\n' +
((__t = ( obj.defaultPaste.text )) == null ? '' : __t) +
'\n</textarea>';
return __p
};

this["JST"]["templates/documentPublic.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<section class="main">\n\t<header>\n\t\t<div class="container">\n\t\t\t<h2>pasting.io/' +
((__t = ( obj.user )) == null ? '' : __t) +
'/' +
((__t = ( obj.documentId )) == null ? '' : __t) +
'</h2>\n\t\t\t<p></p>\n\t\t\t<ul class="menu" id="defaultMenu"></ul>\n\t\t\t<pre id="textArea"></pre>\n\t\t</div>\n\t</header>\n</section>';
return __p
};

this["JST"]["templates/footer.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<section id="footer">\n\t<ul class="icons">\n\t\t<li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>\n\t\t<li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>\n\t</ul>\n\t<div class="copyright">\n\t\t<a href="http://pastingio.blogspot.com.ar/">TECH BLOG</a>\n\t\t<ul class="menu">\n\t\t\t<li><a href="/">PASTING.IO</a></li>\n\t\t\t<li>&copy; JSCLOUD. All rights reserved.</li>\n\t\t\t<li><a href="/team">OUR TEAM</a></li>\n\t\t</ul>\n\t</div>\n</section>';
return __p
};

this["JST"]["templates/header.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<section id="header" class="dark">\n\t<i class="icon-pasting-logo"></i>\n\t<header>\n\t\t<p>Paste and share text or code. Simple, fast and free</p>\n\t\t<div class="center pasteBox" title="Press CONTROL+V on your keyboard to paste a text from your clipboard\'" id="pasteBox">\n\t\t \t<p>PRESS <span class="olights" id="cmd">CONTROL</span> + <span class="olights">V</span></span> </p>\n\t\t</div>\n\t</header>\n\t<footer>\n\t\t<a href="#" class="button login" id="loginButtonHead">Login </a>\n\t\t<a href="#pasteText" class="button scrolly" id="pastingButton">Sign Up</a>\n\t</footer>\n\n\t<br/>\n\t\n\t<a href="#mainFeatures" class="featureFlag scrolly"><i class="fa fa-chevron-down fa-5"></i></a>\n\n</section>';
return __p
};

this["JST"]["templates/menu.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<div class="myGrandHead"> \n\n\t<i class="icon-pasting-logo"></i>\n\n\t<nav style="display:none;" class="navlogout"> \n\t\t<a href="/logout" class="logout">Logout</a>\n\t</nav>\n\n\t<nav style="display:none;" class="navcreate"> \n\t\t<a href="#" class="create">New Paste</a>\n\t</nav>\n\n\t<nav style="display:none;" class="navlogin"> \n\t\t<a href="#" class="login">Login</a>\n\t</nav>\n\n</div>';
return __p
};

this["JST"]["templates/pastesTable.html"] = function(obj) {
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="content dark style1 featured" id="pastesTable">\n\t<div class="container">\n\t\t<section>\n\t\t\t<header>\n\t\t\t\t<h3>Others user pastes</h3>\n\t\t\t</header>\n\t\t\t<div class="table-wrapper">\n\t\t\t\t<table class="default">\n\t\t\t\t\t<tbody>\n\t\t\t\t\t\t';

					    var length = obj.pastes.length - 1;
					    for (var index = 1; index <= length; index++) {
					    	var paste = obj.pastes[index];
						;
__p += '\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<textarea class="codePaste">\n' +
((__t = ( paste.text )) == null ? '' : __t) +
'\n\t\t\t\t\t\t\t\t\t</textarea>\n\t\t\t\t\t\t\t\t\t<ul class="menu">\n\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t<a data-clipboard-text="' +
((__t = ( paste.text )) == null ? '' : __t) +
'" title="Click to copy text" class="p-copy">COPY TEXT</a>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t<a data-clipboard-text="http://pasting.io/p/' +
((__t = ( paste.id )) == null ? '' : __t) +
'" title="Click to copy link" class="p-copy">COPY LINK</a>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t<a href="http://api.pasting.io/raw/' +
((__t = ( paste.id )) == null ? '' : __t) +
'" target="_blank">RAW</a>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t<a class="delete" data-documentid="' +
((__t = ( paste.id )) == null ? '' : __t) +
'">DELETE</a>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t</tbody>\n\t\t\t\t</table>\n\t\t\t</div>\n\t\t</section>\n\t</div>\n</div>';
return __p
};

this["JST"]["templates/pastingConsole.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<!-- pastingConsole -->\n<section id="pastingConsole" class="main">\n\n\t<header>\n\t\t<div class="container">\n\t\t\t<h2>GET PASTING FOR YOUR CONSOLE </h2>\n\t\t\t<p>Use Pasting cli. Get the power for Linux and Mac. <br />\n\t\t\tYou can share directly from your console. <a href="#">[Watch video]</a></p>\n\t\t</div>\n\t</header>\n\n\t<div class="content dark style1 featured" style="background: linear-gradient(45deg, #243FAB, #3F79A3, #1E2337);">\n\t\t<div class="container">\n\t\t\t<div class="row">\n\t\t\t\t<div class="container">\n\t\t\t\t\t<h2>Install via: <a href="https://www.npmjs.com/package/pasting"> npm </a> </h2>\n\t\t\t\t\t<p style="background-color: rgba(0, 0, 0, 0.64);"> sudo npm install -g pasting </p>\n\n\t\t\t\t\t<h2>Configure your Pasting.io credentials </h2>\n\t\t\t\t\t<p style="background-color: rgba(0, 0, 0, 0.64);"> pasting -u yourUsername -p yourPassword </p>\n\n\t\t\t\t\t<h2>Create your first pasting </h2>\n\t\t\t\t\t<p style="background-color: rgba(0, 0, 0, 0.64);;"> echo "Mi first pasting" | pasting </p>\n\n\t\t\t\t\t<h2>Advanced pasting? Use the pipe and do all you\'ve ever dreamt! </h2>\n\t\t\t\t\t<p style="background-color: rgba(0, 0, 0, 0.64);"> ls -la | pasting </p>\n\t\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>';
return __p
};

this["JST"]["templates/pastingFeatures.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<section id="mainFeatures" class="main">\n\t<header>\n\t\t<div class="container">\n\t\t\t<h2>PASTING.IO</h2>\n\t\t\t<p>Sharing is simple and fast. Kill the middle man.<br />\n\t\t\tYour clipboard in all devices with one click. Anytime, Anywhere.</p>\n\t\t</div>\n\t</header>\n\t<div class="content dark style1 featured">\n\t\t<div class="container">\n\t\t\t<div class="row">\n\t\t\t\t<div class="4u">\n\t\t\t\t\t<section>\n\t\t\t\t\t\t<span class="feature-icon"><span class="icon fa-cloud"></span></span>\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h3>Cloud & Real Time </h3>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<p>You can create a customized URL with your username which will be your Pasting Cloud. This will be available anytime, anywhere.</p>\n\t\t\t\t\t</section>\n\t\t\t\t</div>\n\t\t\t\t<div class="4u">\n\t\t\t\t\t<section>\n\t\t\t\t\t\t<span class="feature-icon"><span class="icon fa-bullhorn"></span></span>\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h3>Fast & Free</h3>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\tSharing is fast now. </br> \n\t\t\t\t\t\tYou can do it with a simple click and there is no need to pay anything for it. You can generate one or more accounts.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</section>\n\t\t\t\t</div>\n\t\t\t\t<div class="4u">\n\t\t\t\t\t<section>\n\t\t\t\t\t\t<span class="feature-icon"><span class="icon fa-rocket"></span></span>\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h3>By Nerds, for Nerds </h3>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tThe code you\'ve shared can be seen highlighted. Create pastes directly from your console. \n\t\t\t\t\t\t\t<a href="#pastingConsole" class="scrolly">Get pasting-cli. </a> \n\t\t\t\t\t\t\tJust thought for nerds! \n\t\t\t\t\t\t</p>\n\t\t\t\t\t</section>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="row">\n\t\t\t\t<div class="12u">\n\t\t\t\t\t<footer>\n\t\t\t\t\t\t<a href="#" class="button login" id="loginButtonHead">Login !</a>\n\t\t\t\t\t\t<a href="#pasteText" class="button scrolly" id="pastingButton">Sign Up</a>\n\t\t\t\t\t</footer>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\t</div>\n</section>';
return __p
};

this["JST"]["templates/pastingSection.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<section id="pasteText" class="main">\n\t<header>\n\t\t<div class="container">\n\t\t\t<h2>CREATE YOUR PASTING CLOUD</h2>\n\t\t\t<h2>SHARE YOUR CLIPBOARD</h2>\n\t\t</div>\n\t</header>\n\t<div class="content style4 featured">\n\t\t<div class="container 75%">\n\t\t\t<form method="post" action="#" name="pastingForm">\n\t\t\t\t<div class="row 50%">\n\t\t\t\t\t<div class="6u"><input type="text" name="username" placeholder="Create your username here" id="email" required /></div>\n\t\t\t\t\t<div class="6u"><input type="password" placeholder="Create your password here" id="pwd" /></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row 50%">\n\t\t\t\t\t<div class="12u"><textarea placeholder="Paste or type your text!" id="pastingStr" required></textarea></div>\n\t\t\t\t</div>\n\t\t\t\t<p>Create your username and access your pastes by entering: pasting.io/yourUsername</p>\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="12u">\n\t\t\t\t\t\t<ul class="actions">\n\t\t\t\t\t\t\t<li><input type="submit" class="button" value="Share Public" id="shareBtn" data-protected="0" /></li>\n\t\t\t\t\t\t\t<li><input type="submit" class="button" value="Share Secret" id="shareBtnPrivate" data-protected="1" /></li>\n\t\t\t\t\t\t\t<li><input type="reset" class="button alt" value="Clear Text " /></li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n</section>';
return __p
};

this["JST"]["templates/pastingTeam.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<section id="ourTeam" class="main">\n\n\t<header>\n\t\t<div class="container">\n\t\t\t<i class="icon-pasting-logo" style="font-size: 15vh;color: #000;"></i>\n\t\t\t<h2>PASTING.IO</h2>\n\t\t</div>\n\t</header>\n\n\t<div class="content dark style3">\n\t\t<div class="container">\n\t\t\t<h2>PASTING PROJECT</h2>\n\t\t\t<div class="row">\n\t\t\t\t<div class="4u">\n\t\t\t\t\t<section>\n\t\t\t\t\t\t<a href="http://pastingio.blogspot.com.ar/">Visit Our Tech Blog</a>\n\t\t\t\t\t\t<p>Gravida dis placerat lectus ante vel nunc euismod est turpis sodales. Diam\n\t\t\t\t\t\ttempor dui lacinia eget ornare varius gravida. Gravida dis placerat lectus ante \n\t\t\t\t\t\tvel nunc euismod est turpis sodales. Diam tempor dui lacinia accumsan vivamus \n\t\t\t\t\t\taugue cubilia vivamus nisi eu eget ornare varius gravida euismod. salkdlaskdladka\n\t\t\t\t\t\talkdla;kd;laskd klsdm lksj lksj lksj lsj sj nsdkjh sdkjh kjsdh kjsh kjsh kjsh \n\t\t\t\t\t\ts jks kjhs kjsh jkh jksh jksh asnbd sdjk sdkj hksjh .</p>\n\t\t\t\t\t</section>\n\t\t\t\t</div>\n\t\t\t\t<div class="8u">\n\t\t\t\t\t<div class="row no-collapse">\n\t\t\t\t\t\t<div class="6u">\n\t\t\t\t\t\t\t<a href="https://ar.linkedin.com/in/juansanzone" class="image fit">\n\t\t\t\t\t\t\t\t<img src="https://farm9.staticflickr.com/8650/16132444130_ba7f50ffe1_n.jpg"/>\n\t\t\t\t\t\t\t\t<h2>Juan Sanzone | Software Enginner </h2>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="6u">\n\t\t\t\t\t\t\t<a href="https://ar.linkedin.com/in/alejandrobednarik" class="image fit">\n\t\t\t\t\t\t\t\t<img src="https://farm8.staticflickr.com/7544/16137524750_4b6ebd1c90_n.jpg"/>\n\t\t\t\t\t\t\t\t<h2>Alejandro Bednarik | System Enginner</h2>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>';
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

this["JST"]["templates/userPublic.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<section class="main">\n\t<header>\n\t\t<div class="container">\n\t\t\t<h2>pasting.io/' +
((__t = ( obj.user )) == null ? '' : __t) +
'</h2>\n\t\t\t<p></p>\n\t\t\t<ul class="menu" id="defaultMenu"></ul>\n\t\t\t<pre id="textArea"></pre>\n\t\t</div>\n\t</header>\n</section>';
return __p
};