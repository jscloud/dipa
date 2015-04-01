this["JST"] = this["JST"] || {};

this["JST"]["templates/createPasteButton.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<div class="float-button" style="display:none;">\n  <span class="height-fix">\n    <a href="#" ui-sref="add-trip" class="content newpaste" style="border: 0px;">\n      <i class="icon fa-plus"> </i>\n    </a>\n  </span>\n</div>';
return __p
};

this["JST"]["templates/defaultMenu.html"] = function(obj) {
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }


	if (obj.private) {
		var copyUrl		= obj.baseUrl + "/p/" + obj.documentId + "/" + obj.hashId;
    	var copyLabel	= "COPY SECRET LINK";
    	var rawUrl 		= obj.apiUrl + "/raw/" + obj.documentId + "/" + obj.hashId;
	} else {
		var copyUrl		= obj.baseUrl + "/p/" + obj.documentId;
    	var copyLabel	= "COPY LINK";
    	var rawUrl 		= obj.apiUrl + "/raw/" + obj.documentId;
	}
;
__p += '\n<li><a data-clipboard-text="' +
((__t = ( copyUrl )) == null ? '' : __t) +
'" title="Click to copy link" class="p-copy">' +
((__t = ( copyLabel )) == null ? '' : __t) +
'</a></li>\n<li><a href="' +
((__t = ( rawUrl )) == null ? '' : __t) +
'" target="_blank">RAW</a></li>\n\n';
 if (obj.userId == obj.ownerId) { ;
__p += '\n\t<li><a class="delete" data-del-documentid="' +
((__t = ( obj.documentId )) == null ? '' : __t) +
'">DELETE</a></li>\n';
 } ;

return __p
};

this["JST"]["templates/defaultPaste.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p +=
((__t = ( obj.defaultPaste.text )) == null ? '' : __t);
return __p
};

this["JST"]["templates/documentPublic.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<section class="main">\n\t<header>\n\t\t<div class="container">\n\t\t\t<h2 style="margin-top: 8px;">pasting.io/' +
((__t = ( obj.user )) == null ? '' : __t) +
'/' +
((__t = ( obj.documentId )) == null ? '' : __t) +
'</h2>\n\t\t\t<p></p>\n\t\t\t<ul class="menu" id="defaultMenu"></ul>\n\t\t\t<pre><code id="highlightText" class="javascript"></code></pre>\n\t\t</div>\n\t</header>\n</section>';
return __p
};

this["JST"]["templates/footer.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<section id="footer">\n\t<ul class="icons">\n\t\t<li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>\n\t\t<li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>\n\t\t<li><a href="#" class="icon fa-facebook"><span class="label">Facebook</span></a></li>\n\t\t<li><a href="#" class="icon fa-google-plus"><span class="label">Google Plus</span></a></li>\n\t</ul>\n\t<div class="copyright">\n\t\t<ul class="menu">\n\t\t\t<li><a href="/landing/#cli">PASTING CLI</a> </li>\n\t\t \t<li><a href="/landing/#viewer">PASTING VIEWER</a> </li>\n\t\t</ul>\n\n\t\t<ul class="menu">\n\t\t\t<li>&copy; 2015 <a href="/landing/">PASTING.IO</a></li>\n\t\t\t<li>JS. All Rights Reserved</li>\n\t\t</ul>\n\t</div>\n</section>';
return __p
};

this["JST"]["templates/header.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<section id="header" class="dark">\n\t<i class="icon-pasting-logo"></i>\n\t<header>\n\t\t<p>Paste and share text or code. Simple, fast and free</p>\n\t\t<a href="#mainFeatures" class="scrolly"><span class="olights"> VIEW FEATURES </span></a>\n\t</header>\n\t<footer>\n\t\t<a href="#" class="button login" id="loginButtonHead">Login </a>\n\t\t<a href="#pasteText" class="button scrolly" id="signUp">Sign Up</a>\n\t</footer>\n</section>';
return __p
};

this["JST"]["templates/menu.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<div class="myGrandHead"> \n\t<a href="/"><i class="icon-pasting-logo"></i></a>\n\t<nav class="navmenu"> \n\t\t<a href="/logout" class="logout" style="display:none">Logout</a>\n\t\t<a href="#" class="login" style="display:none">Login</a>\n\t</nav>\n</div>';
return __p
};

this["JST"]["templates/pastesTable.html"] = function(obj) {
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="content dark style1 featured" id="pastesTable" style="padding: 0em 0 6em 0;">\n\t<div class="container">\n\t\t<section>\t\n\t\t\t<div class="table-wrapper">\n\t\t\t\t<table class="default">\n\t\t\t\t\t<tbody>\n\t\t\t\t\t\t';

					    var length = obj.pastes.length - 1;
					    for (var index = 0; index <= length; index++) {
					    	var paste = obj.pastes[index];

					    	displayText =  paste.text.substring(0,98) + ' ...';
					    	displayText = safe_tags_replace(displayText);

							if ("1" == paste.protected) {
								var copyUrl		= obj.baseUrl + "/p/" + paste.id + "/" + paste.public_password;
						    	var copyLabel	= "COPY SECRET LINK";
						    	var rawUrl 		= obj.apiUrl + "/raw/" + paste.id + "/" + paste.public_password;
							} else {
								var copyUrl		= obj.baseUrl + "/p/" + paste.id;
						    	var copyLabel	= "COPY LINK";
						    	var rawUrl 		= obj.apiUrl + "/raw/" + paste.id;
							}
						;
__p += '\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<div class="pastingBlock" onclick="location.href=\'' +
((__t = ( copyUrl )) == null ? '' : __t) +
'\';">\n\t\t\t\t\t\t\t\t\t\t';
 if ("1" == paste.protected) { ;
__p += '\n\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-lock" style="font-size: 14px;color:rgba(18, 95, 182, 0.45);"></i>\n\t\t\t\t\t\t\t\t\t\t';
 } ;
__p += '\n\n\t\t\t\t\t\t\t\t\t\t' +
((__t = ( displayText )) == null ? '' : __t) +
'\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<ul class="menu">\n\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t<a href="' +
((__t = ( copyUrl )) == null ? '' : __t) +
'">VIEW</a>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t<a data-clipboard-text="' +
((__t = ( copyUrl )) == null ? '' : __t) +
'" title="Click to copy link" class="p-copy">' +
((__t = ( copyLabel )) == null ? '' : __t) +
'</a>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t<a href="' +
((__t = ( rawUrl )) == null ? '' : __t) +
'" target="_blank">RAW</a>\n\t\t\t\t\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t\t\t\t\t';
 if (paste.user_id == obj.loggedId) { ;
__p += '\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a class="delete" data-del-documentid="' +
((__t = ( paste.id )) == null ? '' : __t) +
'">DELETE</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t</tbody>\n\t\t\t\t</table>\n\t\t\t</div>\n\t\t</section>\n\t</div>\n</div>';
return __p
};

this["JST"]["templates/pastingConsole.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<!-- pastingConsole -->\n<section id="pastingConsole" class="main">\n\t<header>\n\t\t<div class="container">\n\t\t\t<h2>GET PASTING FOR YOUR CONSOLE </h2>\n\t\t\t<p>Use Pasting cli. Get the power for Linux and Mac. <br />\n\t\t\tYou can share directly from your console. <a href="#">[Watch video]</a></p>\n\t\t</div>\n\t</header>\n\t<div class="content dark style1 featured" style="">\n\t\t<div class="container">\n\t\t\t<div class="row">\n\t\t\t\t<div class="container">\n\t\t\t\t\t<h2>Install via: <a href="https://www.npmjs.com/package/pasting"> npm </a> </h2>\n\t\t\t\t\t<p style="background-color: rgba(0, 0, 0, 0.64);"> sudo npm install -g pasting </p>\n\n\t\t\t\t\t<h2>Configure your Pasting.io credentials </h2>\n\t\t\t\t\t<p style="background-color: rgba(0, 0, 0, 0.64);"> pasting -u yourUsername -p yourPassword </p>\n\n\t\t\t\t\t<h2>Create your first Pasting </h2>\n\t\t\t\t\t<p style="background-color: rgba(0, 0, 0, 0.64);;"> echo "Mi first pasting" | pasting </p>\n\n\t\t\t\t\t<h2>Advanced Pasting? Use the pipe and do all you\'ve ever dreamt! </h2>\n\t\t\t\t\t<p style="background-color: rgba(0, 0, 0, 0.64);"> ls -la | pasting </p>\n\t\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>';
return __p
};

this["JST"]["templates/pastingFeatures.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<section id="mainFeatures" class="main">\n\t<header>\n\t\t<div class="container">\n\t\t\t<h2>PASTING.IO</h2>\n\t\t\t<p>Sharing is simple and fast. Kill the middle man.<br />\n\t\t\tYour clipboard in all devices with one click. Anytime, Anywhere.</p>\n\t\t</div>\n\t</header>\n\t<div class="content dark style1 featured">\n\t\t<div class="container">\n\t\t\t<div class="row">\n\t\t\t\t<div class="4u">\n\t\t\t\t\t<section>\n\t\t\t\t\t\t<span class="feature-icon"><span class="icon fa-cloud"></span></span>\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h3>Cloud & Real Time </h3>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<p>You can create a customized URL with your username which will be your Pasting Cloud. This will be available anytime, anywhere.\n\t\t\t\t\t</section>\n\t\t\t\t</div>\n\t\t\t\t<div class="4u">\n\t\t\t\t\t<section>\n\t\t\t\t\t\t<span class="feature-icon"><span class="icon fa-bullhorn"></span></span>\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h3>Fast & Free</h3>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\tSharing is fast now. </br> \n\t\t\t\t\t\tYou can do it with a simple click and there is no need to pay anything for it. You can generate one or more accounts.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</section>\n\t\t\t\t</div>\n\t\t\t\t<div class="4u">\n\t\t\t\t\t<section>\n\t\t\t\t\t\t<span class="feature-icon"><span class="icon fa-rocket"></span></span>\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h3>By Nerds, for Nerds </h3>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tThe code you\'ve shared can be seen highlighted. Create pastes directly from your console. \n\t\t\t\t\t\t\t<a href="#pastingConsole" class="scrolly">Get pasting-cli. </a> \n\t\t\t\t\t\t\tJust thought for nerds! \n\t\t\t\t\t\t</p>\n\t\t\t\t\t</section>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="row">\n\t\t\t\t<div class="12u">\n\t\t\t\t\t<footer>\n\t\t\t\t\t\t<a href="#" class="button login" id="loginButtonHead">Login </a>\n\t\t\t\t\t\t<a href="#pasteText" class="button scrolly" id="signUp">Sign Up</a>\n\t\t\t\t\t</footer>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\t</div>\n</section>';
return __p
};

this["JST"]["templates/pastingSection.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '';
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
__p += '<section class="main">\n\t<header style="height: 90px;">\n\t\t<div class="container">\n\t\t\t<h2 style="margin-top: 8px;">pasting.io/' +
((__t = ( obj.user )) == null ? '' : __t) +
'</h2>\n\t\t</div>\n\t</header>\n</section>';
return __p
};