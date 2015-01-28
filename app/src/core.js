var PasteModel = Backbone.Model.extend({
	urlRoot: apiUrl + '/register',
	defaults: {
	    code: 0
	}
});

var PublicsPasteModel = Backbone.Model.extend({
    urlRoot: apiUrl + '/get/publics',
    defaults: {}
});

var PublicPasteModel = Backbone.Model.extend({
    urlRoot: apiUrl + '/get/public',
    defaults: {}
});

var Login = Backbone.Model.extend({
    urlRoot: apiUrl + '/login'
});

var HomeView = Backbone.View.extend(
{
	el: 'body',
	initialize: function()
	{
		this.render();
	},
	render: function()
	{
		NProgress.start();
		this.$el.html(getTemplate('templates/menu.html'));
		this.$el.append(getTemplate('templates/header.html'));

		var dataFeatures = {"header" : true, "title" : true};
		this.$el.append(getTemplate('templates/pastingFeatures.html', dataFeatures));
		this.$el.append(getTemplate('templates/pastingConsole.html', dataFeatures));
		this.$el.append(getTemplate('templates/pastingSection.html'));
		this.$el.append(getTemplate('templates/footer.html'));
		NProgress.done();
	}
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
		var dataFeatures = {"header" : false, "title" : true};
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
		this.$el.append(getTemplate('templates/footer.html'));
	}
});

var TeamView = Backbone.View.extend(
{
	el: 'body',
	initialize: function()
	{
		this.render();
	},
	render: function()
	{
		this.$el.append(getTemplate('templates/pastingTeam.html'));
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
					var home_view = new HomeView();
					pastingEditor = bindPastingInput();
					doForPlatform();
					bindShareButton(pastingEditor);
					bindHeaderPaster(pastingEditor);
					checkOauth();
					bindLoginButtons();
				}
			}, 

			'(:username)' : function (username) 
			{
				NProgress.start();

				if ('logout' == username) 
				{
					$.removeCookie('v', { path: '/' });
					$.removeCookie('uid', { path: '/' });
					$.removeCookie('u', { path: '/' });
					location.href = "/";
				} else {
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
		    					var defaultData = {"defaultPaste": response.publics[0]};

		    					var defaultMenuData = {
		    						"documentId" : defaultData.defaultPaste.id, 
		    						"text" : defaultData.defaultPaste.text,
		    						"baseUrl" : baseUrl,
		    						"apiUrl" : apiUrl
		    					};

		    					$('#defaultMenu').html(getTemplate('templates/defaultMenu.html', defaultMenuData));
		    					$('#textArea').html(getTemplate('templates/defaultPaste.html', defaultData));

		    					if (response.publics.length > 1) {
		    						var pastesData = {"pastes" : response.publics};
		    						$('header').after(getTemplate('templates/pastesTable.html', pastesData));
		    					}
		    					
		    					bindPastes();
		    					bindCopies();
		    					bindDeletes();
		    					bindLoginButtons();
		    					checkOauth();
		    					NProgress.done();
		    				} else {
		    					location.href = "/";
		    				}
	    				}
	    			);
				}
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
	    					var defaultData = {"defaultPaste": response.public[0]};

	    					var defaultMenuData = {
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
	    					NProgress.done();
	    				} else {
	    					location.href = "/";
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