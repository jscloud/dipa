this["JST"] = this["JST"] || {};

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
'</h2>\n\t\t\t<p></p>\n\t\t\t<ul class="menu">\n\t\t\t\t<li><a>COPY TEXT</a></li>\n\t\t\t\t<li><a>COPY LINK</a></li>\n\t\t\t\t<li><a>RAW</a></li>\n\t\t\t\t<li><a>DELETE</a></li>\n\t\t\t</ul>\n\t\t\t<pre id="textArea"></pre>\n\t\t</div>\n\t</header>\n</section>';
return __p
};

this["JST"]["templates/footer.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<!-- Footer -->\n<section id="footer">\n\t<ul class="icons">\n\t\t<li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>\n\t\t<!-- <li><a href="#" class="icon fa-facebook"><span class="label">Facebook</span></a></li> -->\n\t\t<li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>\n\t\t<!-- <li><a href="#" class="icon fa-github"><span class="label">GitHub</span></a></li> -->\n\t</ul>\n\t<div class="copyright">\n\t\t<ul class="menu">\n\t\t\t<li><a href="http://pasting.io">PASTING.IO</a></li>\n\t\t\t<li>&copy; JSCLOUD. All rights reserved.</li>\n\t\t\t<li><a href="http://blog.pasting.io">OUR BLOG</a></li>\n\t\t</ul>\n\t</div>\n</section>';
return __p
};

this["JST"]["templates/header.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<!-- Default Header -->\n<section id="header" class="dark">\n\t<i class="icon-pasting-logo"></i>\n\t<header>\n\t\t<!-- <h1>PASTING.IO </h1> -->\n\t\t<p>Paste and share text or code. Simple, fast and free</p>\n\t\t<div class="center pasteBox" title="Press CONTROL+V on your keyboard to paste a text from your clipboard\'" id="pasteBox">\n\t\t \t<p>PRESS <span class="olights" id="cmd">CONTROL</span> + <span class="olights">V</span></span> </p>\n\t\t</div>\n\t</header>\n\t<footer>\n\t\t<a href="#mainFeatures" class="button scrolly">Pasting Features</a>\n\t\t<a href="#pasteText" class="button scrolly" id="pastingButton">Get Pasting Now</a>\n\t</footer>\n</section>';
return __p
};

this["JST"]["templates/pastesTable.html"] = function(obj) {
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<tbody>\n\t';

    var length = obj.pastes.length - 1;
    for (var index = 1; index <= length; index++) {
    	var paste = obj.pastes[index];
	;
__p += '\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\t<textarea class="codePaste">\n' +
((__t = ( paste.text )) == null ? '' : __t) +
'\n\t\t\t\t</textarea>\n\t\t\t<ul class="menu">\n\t\t\t\t\t<li><a>COPY TEXT</a></li>\n\t\t\t\t\t<li><a>COPY LINK</a></li>\n\t\t\t\t\t<li><a>RAW</a></li>\n\t\t\t\t\t<li><a>DELETE</a></li>\n\t\t\t\t</ul>\n\t\t\t</td>\n\t\t</tr>\n\t';
 } ;
__p += '\n</tbody>';
return __p
};

this["JST"]["templates/pastingConsole.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<!-- pastingConsole -->\n<section id="pastingConsole" class="main">\n\n\t<header>\n\t\t<div class="container">\n\t\t\t<h2>PASTING FOR YOUR CONSOLE </h2>\n\t\t\t<p>Use Pasting cli. Get the power for Linux and Mac. <br />\n\t\t\tYou may share directly from your console. <a href="#">[Watch video]</a></p>\n\t\t</div>\n\t</header>\n\n\t<div class="content dark style1 featured" style="background: linear-gradient(45deg, #243FAB, #3F79A3, #1E2337);">\n\t\t<div class="container">\n\t\t\t<div class="row">\n\t\t\t\t<div class="container">\n\t\t\t\t\t<h2>Install via: <a href="https://www.npmjs.com"> npm </a> </h2>\n\t\t\t\t\t<p style="background-color: rgba(0, 0, 0, 0.64);"> sudo npm install -g pastingio </p>\n\n\t\t\t\t\t<h2>Configure your Pasting.io credentials </h2>\n\t\t\t\t\t<p style="background-color: rgba(0, 0, 0, 0.64);"> pasting -u yourUsername -p yourPassword </p>\n\n\t\t\t\t\t<h2>Create your first pasting </h2>\n\t\t\t\t\t<p style="background-color: rgba(0, 0, 0, 0.64);;"> echo "Mi first pasting" | pasting </p>\n\n\t\t\t\t\t<h2>Advanced pasting? Use the pipe and rocks! </h2>\n\t\t\t\t\t<p style="background-color: rgba(0, 0, 0, 0.64);"> ls -la | pasting </p>\n\t\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>';
return __p
};

this["JST"]["templates/pastingFeatures.html"] = function(obj) {
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<!-- mainFeatures -->\n<section id="mainFeatures" class="main">\n\n\t';
 if (obj.title) { ;
__p += '\n\t<header>\n\t\t<div class="container">\n\t\t\t<h2>PASTING.IO</h2>\n\t\t\t<p>Sharing is simple and fast. Kill the middle man.<br />\n\t\t\tYour clipboard in all devices with one click; Anywhere, Anytime</p>\n\t\t</div>\n\t</header>\n\t';
 } ;
__p += '\n\n\t<div class="content dark style1 featured">\n\t\t<div class="container">\n\t\t\t<div class="row">\n\n\t\t\t\t<div class="4u">\n\t\t\t\t\t<section>\n\t\t\t\t\t\t<span class="feature-icon"><span class="icon fa-cloud"></span></span>\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h3>Cloud & Real Time </h3>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<p>You can create a customized URL with your username which will be your Pasting Cloud. This will be available anytime, anywhere.</p>\n\t\t\t\t\t</section>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="4u">\n\t\t\t\t\t<section>\n\t\t\t\t\t\t<span class="feature-icon"><span class="icon fa-bullhorn"></span></span>\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h3>Fast & Free</h3>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<p>Sharing is fast now. </br> You can do it with a simple click and there is no need to pay anything for it. You can generate one or more accounts.</p>\n\t\t\t\t\t</section>\n\t\t\t\t</div>\n\t\t\t\t<div class="4u">\n\t\t\t\t\t<section>\n\t\t\t\t\t\t<span class="feature-icon"><span class="icon fa-rocket"></span></span>\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h3>By Nerds, for Nerds </h3>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<p>The code you\'ve shared can be seen highlighted. Use Pasting.io in your console. <a href="#pastingConsole" class="scrolly">Get the powerfull pasting-cli. </a> Just thought for nerds! </p>\n\t\t\t\t\t</section>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="row">\n\t\t\t\t<div class="12u">\n\t\t\t\t\t<footer>\n\t\t\t\t\t\t';
 if (obj.header) { ;
__p += '\n\t\t\t\t\t\t\t<a href="#pasteText" class="button scrolly">Get Pasting Now !</a>\n\t\t\t\t\t\t';
 } else { ;
__p += '\n\t\t\t\t\t\t\t<a href="/" class="button scrolly">Get Pasting Now !</a>\n\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t</footer>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>';
return __p
};

this["JST"]["templates/pastingSection.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<!-- pastingSection -->\n<section id="pasteText" class="main">\n\t<header>\n\t\t<div class="container">\n\t\t\t<h2>CREATE YOUR PASTING CLOUD</h2>\n\t\t\t<h2>SHARE YOUR CLIPBOARD</h2>\n\t\t</div>\n\t</header>\n\t<div class="content style4 featured">\n\t\t<div class="container 75%">\n\t\t\t<form method="post" action="#" name="pastingForm">\n\t\t\t\t<div class="row 50%">\n\t\t\t\t\t<div class="6u"><input type="text" name="email" placeholder="Enter or create your username here" id="email" required /></div>\n\t\t\t\t\t<div class="6u"><input type="text" placeholder="Enter or create your password here" id="pwd" /></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row 50%">\n\t\t\t\t\t<div class="12u"><textarea placeholder="Paste or type your text!" id="pastingStr" required></textarea></div>\n\t\t\t\t</div>\n\t\t\t\t<p>Create your username and access your pastes by entering: pasting.io/yourUsername</p>\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="12u">\n\t\t\t\t\t\t<ul class="actions">\n\t\t\t\t\t\t\t<li><input type="submit" class="button" value="Share Public" id="shareBtn" /></li>\n\t\t\t\t\t\t\t<li><input type="submit" class="button" value="Share Private" id="shareBtnSecret" /></li>\n\t\t\t\t\t\t\t<!-- <li><input type="submit" class="button realTime" value="Real Time" id="realTimeBtn" /></li> -->\n\t\t\t\t\t\t\t<!-- <li><input type="reset" class="button alt" value="Clear Text " /></li> -->\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n</section>';
return __p
};

this["JST"]["templates/pastingTeam.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<!-- pastingTeam -->\n<section id="ourTeam" class="main">\n\t<div class="content dark style3">\n\t\t<div class="container">\n\t\t\t<h2>PASTING TEAM</h2>\n\t\t\t<p>--<br /></p>\n\t\t</div>\n\t</div>\n</section>';
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
'</h2>\n\t\t\t<p></p>\n\t\t\t<ul class="menu">\n\t\t\t\t<li><a>COPY TEXT</a></li>\n\t\t\t\t<li><a>COPY LINK</a></li>\n\t\t\t\t<li><a>RAW</a></li>\n\t\t\t\t<li><a>DELETE</a></li>\n\t\t\t</ul>\n\t\t\t<pre id="textArea"></pre>\n\t\t</div>\n\t</header>\n\t<div class="content styleCustom dark">\n\t\t<div class="container">\n\t\t\t<section>\n\t\t\t\t<header>\n\t\t\t\t\t<h3>Others pastes:</h3>\n\t\t\t\t</header>\n\t\t\t\t<div class="table-wrapper">\n\t\t\t\t\t<table class="default" id="pastesTable">\n\t\t\t\t\t</table>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t</div>\n\t</div>\n</section>';
return __p
};