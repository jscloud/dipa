var PasteModel = Backbone.Model.extend({
	urlRoot: apiUrl + '/create',
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

		var dataFeatures = {"header" : true, "title" : true};
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

		var dataFeatures = {"header" : false, "title" : true};
		this.$el.append(getTemplate('templates/pastingFeatures.html', dataFeatures));
		this.$el.append(getTemplate('templates/pastingConsole.html', dataFeatures));
		this.$el.append(getTemplate('templates/footer.html'));
		bindCopies();
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
		var dataUser = {"user" : userStr.toLowerCase(), "documentId": documentId};
		this.$el.html(getTemplate('templates/documentPublic.html', dataUser));

		var dataFeatures = {"header" : false, "title" : false};
		this.$el.append(getTemplate('templates/pastingFeatures.html', dataFeatures));
		this.$el.append(getTemplate('templates/pastingConsole.html', dataFeatures));
		this.$el.append(getTemplate('templates/footer.html'));
		bindCopies();
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

				var publicsPastes = new PublicsPasteModel();
				var fetchFilters = {username: username.toLowerCase()};

				publicsPastes.fetch({ data: $.param(fetchFilters) }, 
				{
			    	success: function (response) {}
    			}).always(
    				function(response) 
    				{ 
    					if (response.publics.length > 0) {
	    					var defaultData = {"defaultPaste": response.publics[0]};
	    					var pastesData = {"pastes" : response.publics};
	    					$('#textArea').html(getTemplate('templates/defaultPaste.html', defaultData));
	    					$('#pastesTable').html(getTemplate('templates/pastesTable.html', pastesData));
	    					NProgress.done();
	    					bindPastes();
	    				} else {
	    					location.href = "/";
	    				}
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
				NProgress.start();

				var document_view = new DocumentView(username.toLowerCase(), pasteId);

				var publicDocument = new PublicPasteModel();
				var fetchFilters = {documentid: pasteId};

				publicDocument.fetch({ data: $.param(fetchFilters) }, 
				{
			    	success: function (response) {}
    			}).always(
    				function(response) 
    				{ 
    					if (response.st == "ok") {
	    					var defaultData = {"defaultPaste": response.public[0]};
	    					$('#textArea').html(getTemplate('templates/defaultPaste.html', defaultData));
	    					NProgress.done();
	    					bindPastes();
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
	/* var socket = io.connect(emitterUrl); */
});