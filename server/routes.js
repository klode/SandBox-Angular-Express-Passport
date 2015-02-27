(function() {
    'use strict';

    var routes = require('./routes/index');
    var api = require('./routes/api');

    var printConsoleMessage = function(message) {
        return function(req, res, next) {
            console.log(message);
            next();
        };
    };

    module.exports = function(app, authentication) {

        app.post('/login', printConsoleMessage('ROUTER login'),
            authentication.login);

        app.get('/logout', printConsoleMessage('ROUTER logout'),
            authentication.logout);

        app.get('/user', authentication.user);

        // serve index and view partials
        app.get('/', printConsoleMessage('ROUTER root'),
            routes.index);

        app.get('/partials/:name', printConsoleMessage('ROUTER partial view'),
            routes.partials);

        // JSON APIs
        app.get('/api/name', printConsoleMessage('ROUTER api'),
            api.name);

        // anybody can access this
        app.get('/api/test/users', printConsoleMessage('ROUTER api'),
            api.testUsers);


        // only logged-in users with ADMIN role can access this
        app.get('/api/users', printConsoleMessage('ROUTER api'),
            authentication.ensureAuthenticated,
            authentication.ensureAdmin,
            api.testUsers);

        // only logged-in users can access this
        app.get('/api/books', printConsoleMessage('ROUTER api'),
            authentication.ensureAuthenticated,
            api.books);



        // redirect all others to the index (HTML5 history)
        app.get('*', printConsoleMessage('ROUTER all other routes'),
            routes.index);

    };
})();