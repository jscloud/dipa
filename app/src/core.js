var DeletePasteModel = Backbone.Model.extend({
	urlRoot: apiUrl + '/delete',
	defaults: {}
});

var PublicsPasteModel = Backbone.Model.extend({
    urlRoot: apiUrl + '/get/publics',
    defaults: {}
});

var PublicPasteModel = Backbone.Model.extend({
    urlRoot: apiUrl + '/get/public',
    defaults: {}
});

var ProtectedModel = Backbone.Model.extend({
    urlRoot: apiUrl + '/get/protected',
    defaults: {}
});

var Login = Backbone.Model.extend({
    urlRoot: apiUrl + '/login'
});

var UserView = Backbone.View.extend(
{
	el: 'body',
	initialize: function(userStr)
	{
		this.render(userStr);
	},
	render: function(userStr)
	{
		var dataUser = {"user" : userStr.toLowerCase()};
		this.$el.html(getTemplate('templates/menu.html'));
		this.$el.append(getTemplate('templates/userPublic.html', dataUser));
		this.$el.append(getTemplate('templates/createPasteButton.html'));
		this.$el.append(getTemplate('templates/footer.html'));
	}
});

var DocumentView = Backbone.View.extend(
{
	el: 'body',
	initialize: function(userStr, documentId)
	{
		this.render(userStr, documentId);
	},
	render: function(userStr, documentId)
	{
		this.$el.html(getTemplate('templates/menu.html'));
		var dataUser = {"user" : userStr.toLowerCase(), "documentId": documentId};
		this.$el.append(getTemplate('templates/documentPublic.html', dataUser));
		this.$el.append(getTemplate('templates/createPasteButton.html'));
		this.$el.append(getTemplate('templates/footer.html'));
	}
});

var Router = Backbone.Router.extend (
	{ 
		routes: 
		{ 
			'' : function () 
			{
				if (checkOauth()) {
					location.href = "/" + $.cookie('u');
				} else {
					mixpanel.track("Redirect-To-Landing");
					location.href = '/landing/';
				}
			},

			'(:username)' : function (username) 
			{
				NProgress.start();

				if ('logout' == username) 
				{
					mixpanel.track("User logout", {
						"userId" : $.cookie('uid'),
    					"userName": $.cookie('u')
					});

					$.removeCookie('v', { path: '/' });
					$.removeCookie('uid', { path: '/' });
					$.removeCookie('u', { path: '/' });
					location.href = "/";

				} else {

					mixpanel.track("User view", {
						"targetUser": username.toLowerCase(),
						"userId" : $.cookie('uid'),
						"userName" : $.cookie('u')
					});

					var user_view = new UserView(username.toLowerCase());
					var publicsPastes = new PublicsPasteModel();
					var fetchFilters = {
						username: username.toLowerCase(),
						v: $.cookie('v'),
						u: $.cookie('u'),
						uid: $.cookie('uid')
					};

					publicsPastes.fetch({ data: $.param(fetchFilters) }, 
					{
				    	success: function (response) {}
	    			}).always(
	    				function(response) 
	    				{ 
	    					if (response.publics.length > 0) 
	    					{
	    						var pastesData = {"pastes":response.publics, "apiUrl":apiUrl, "baseUrl":baseUrl, "loggedId":$.cookie('uid')};
	    						$('header').after(getTemplate('templates/pastesTable.html', pastesData));
		    					
		    					bindCopies();
		    					bindDeletes();
		    					bindLoginButtons();
		    					checkOauth();
		    					bindNewPaste();
		    					NProgress.done();

		    				} else {

		    					if ($.cookie('u') !== undefined) {
			    					var defaultData = {"defaultPaste": {}};
			    					var defaultMenuData = {
			    						"ownerId" : 0,
			    						"userId" : $.cookie('uid'),
			    						"hashId" : 0,
			    						"private" : false,
			    						"documentId" : 0, 
			    						"text" : "",
			    						"baseUrl" : baseUrl,
			    						"apiUrl" : apiUrl
			    					};
			    					
			    					bindLoginButtons();
			    					checkOauth();
			    					bindNewPaste();
			    					NProgress.done();
		    					} else {
									location.href = "/";
		    					}
		    					
		    				}
	    				}
	    			);
				}
			},


			'(:username/:pasteId/:hashId)' : function (username, pasteId, hashId) 
			{
				NProgress.start();

				var document_view = new DocumentView(username.toLowerCase(), pasteId);

				var protectedDocument = new ProtectedModel();
				var fetchFilters = {
					documentid: pasteId,
					pwd: hashId
				};

				protectedDocument.fetch({ data: $.param(fetchFilters) }, 
				{
			    	success: function (response) {}
    			}).always(
    				function(response) 
    				{ 
    					if (response.st == "ok") 
    					{

    						mixpanel.track("PrivatePaste_View", {
								"targetUser": username.toLowerCase(),
								"targetPasteId": pasteId,
								"targetHash": hashId,
								"userId" : $.cookie('uid'),
								"userName" : $.cookie('u')
							});
    						
							var defaultData = {"defaultPaste": response.protected};

	    					var defaultMenuData = {
	    						"ownerId" : defaultData.defaultPaste.user_id,
		    					"userId" : $.cookie('uid'),
	    						"hashId" : hashId,
	    						"private" : true,
	    						"documentId" : defaultData.defaultPaste.id, 
	    						"text" : defaultData.defaultPaste.text,
	    						"baseUrl" : baseUrl,
	    						"apiUrl": apiUrl
	    					};

		    				$('#defaultMenu').html(getTemplate('templates/defaultMenu.html', defaultMenuData));
	    					$('#textArea').html(getTemplate('templates/defaultPaste.html', defaultData));

	    					bindPastes();
	    					bindCopies();	
	    					bindDeletes();
	    					bindLoginButtons();
	    					checkOauth();
	    					bindNewPaste();
	    					NProgress.done();

	    				} else {

	    					mixpanel.track("AccessDenied_PrivatePaste", {
	    						"targetUser": username.toLowerCase(),
								"targetPasteId": pasteId,
								"targetHash": hashId,
								"userId" : $.cookie('uid'),
								"userName" : $.cookie('u')
	    					});

	    					if (checkOauth()) {
	    						location.href = "/" + $.cookie('u');
	    					} else {
	    						location.href = "/";
	    					}
	    				}
    				}
    			);
			},

			'(:username/:pasteId)' : function (username, pasteId) 
			{
				NProgress.start();

				var document_view = new DocumentView(username.toLowerCase(), pasteId);

				var publicDocument = new PublicPasteModel();
				var fetchFilters = {
					documentid: pasteId,
					v: $.cookie('v'),
					u: $.cookie('u'),
					uid: $.cookie('uid')
				};

				publicDocument.fetch({ data: $.param(fetchFilters) }, 
				{
			    	success: function (response) {}
    			}).always(
    				function(response) 
    				{ 
    					if (response.st == "ok") 
    					{

    						if (response.public.length > 0) {


		    					mixpanel.track("Paste view", {
		    						"targetUser": username.toLowerCase(),
									"targetPasteId": pasteId,
									"userId" : $.cookie('uid'),
									"userName" : $.cookie('u')
		    					});

    							var defaultData = {"defaultPaste": response.public[0]};

		    					var defaultMenuData = {
		    						"ownerId" : defaultData.defaultPaste.user_id,
		    						"userId" : $.cookie('uid'),
		    						"private" : false,
		    						"documentId" : defaultData.defaultPaste.id, 
		    						"text" : defaultData.defaultPaste.text,
		    						"baseUrl" : baseUrl,
		    						"apiUrl": apiUrl
		    					};

			    				$('#defaultMenu').html(getTemplate('templates/defaultMenu.html', defaultMenuData));
		    					$('#textArea').html(getTemplate('templates/defaultPaste.html', defaultData));

		    					bindPastes();
		    					bindCopies();	
		    					bindDeletes();
		    					bindLoginButtons();
		    					checkOauth();
		    					bindNewPaste();
		    					NProgress.done();

    						} else {

	    						if (checkOauth()) {
		    						location.href = "/" + $.cookie('u');
		    					} else {
		    						location.href = "/";
		    					}
    						}
	    					
	    				} else {
	    					if (checkOauth()) {
	    						location.href = "/" + $.cookie('u');
	    					} else {
	    						location.href = "/";
	    					}
	    				}
    				}
    			);
			}
		} 
	}
);

var routing = new Router();
Backbone.history.start();

$(document).ready(function() 
{
	vex.defaultOptions.className = 'vex-theme-default';
});