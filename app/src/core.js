var PasteModel = Backbone.Model.extend({
	urlRoot: apiUrl + '/create',
	defaults: {
	    code: 0
	}
});

var PublicPasteModel = Backbone.Model.extend({
    urlRoot: apiUrl + '/get/publics',
    defaults: {}
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
		this.$el.html(getTemplate('templates/header.html'));

		var dataFeatures = {"header" : true};
		this.$el.append(getTemplate('templates/pastingFeatures.html', dataFeatures));
		this.$el.append(getTemplate('templates/pastingConsole.html', dataFeatures));
		this.$el.append(getTemplate('templates/pastingSection.html'));
		this.$el.append(getTemplate('templates/pastingTeam.html'));
		this.$el.append(getTemplate('templates/footer.html'));
		NProgress.done();

		pastingEditor = bindPastingInput();
		doForPlatform();
		bindRealTimeButton();
		bindShareButton(pastingEditor);
		bindHeaderPaster(pastingEditor);
		bindHowToInstall();
		bindSocket();
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
		this.$el.html(getTemplate('templates/userPublic.html', dataUser));

		var dataFeatures = {"header" : false};
		this.$el.append(getTemplate('templates/pastingFeatures.html', dataFeatures));
		this.$el.append(getTemplate('templates/pastingConsole.html', dataFeatures));
		this.$el.append(getTemplate('templates/footer.html'));
		bindHowToInstall();
	}
});

var Router = Backbone.Router.extend (
	{ 
		routes: 
		{ 
			'' : function () 
			{
				var home_view = new HomeView();
			}, 
			'(:username)' : function (username) 
			{
				NProgress.start();

				/* var socket = io.connect(emitterUrl); */

				var user_view = new UserView(username.toLowerCase());

				var publicPastes = new PublicPasteModel();
				var fetchFilters = {username: username.toLowerCase()};

				publicPastes.fetch({ data: $.param(fetchFilters) }, 
				{
			    	success: function (response) {}
    			}).always(
    				function(response) 
    				{ 
    					var defaultData = {"defaultPaste": response.publics[0]};
    					var pastesData = {"pastes" : response.publics};
    					$('#textArea').html(getTemplate('templates/defaultPaste.html', defaultData));
    					$('#pastesTable').html(getTemplate('templates/pastesTable.html', pastesData));
    					NProgress.done();
    					bindPastes();
    				}
    			);

    			/*
				socket.on(username, function(text) {
					text = text.replace(/\n/g, "<br />");
					$('#textArea').html(text);
				});
				socket.emit('client_connection', username);
				*/
			},

			'(:username/:pasteId)' : function (username, pasteId) 
			{
				alert(pasteId);
			}
		} 
	}
);

var routing = new Router();
Backbone.history.start();

$(document).ready(function() 
{
	/* var socket = io.connect(emitterUrl); */
});