
A basic Angular-Express-Passport application to demonstrate how to implement server side authorization and views customization based on user-roles.

- **User Authentication** (login) using [Passport](http://passportjs.org/)
- **User Roles** users have a role property, for example "user" or "admin"
- **Server Side Authorization based on user roles**,  access to APIs endpoint is protected on the server side, access granted only to authenticated users with certain role (user/admin).
- **Client side customization based on user roles** the page displayed to the client is customized according to the role of the logged user (user/admin).

This project supplements [this answer on stack overflow.](http://stackoverflow.com/questions/20000195/how-can-i-protect-an-api-endpoint-with-passportjs/20170110#20170110)

## How to use this example

1. Clone the repository,
2. run `bower install`
3. cd server/
4. run `npm install`
5. cd ..
6. run `node server/server.js`
7. open browser to: localhost:9000/

## Implementation Notes
###Server Side Authorization
It uses Passport for user Authentication and is a basic example of server side authorization. It demonstrates how to make API calls accessible only to authenticated users, or only to users with admin role.

This is achieved in server/routes.js calling the middleware functions ensureAuthenticated, and ensureAdmin defined in server/authentication.js

###Client side customization
Client side customization for user roles is implemented with the aid of the AuthenticationService
- AuthenticationService.currentUser
- AuthenticationService.requestCurrentUser
- AuthenticationService.isAuthenticated
- AuthenticationService.isAdmin
- AuthenticationService.login
- AuthenticationService.logout

When the application starts, the current user is requested from the server. A user is returned in case is still logged in from a previous session, otherwise a `null` user is returned. The returned user is saved in AuthenticationService.currentUser.
This is achieved in app.js

    .run(['AuthenticationService', function(AuthenticationService) {
        AuthenticationService.requestCurrentUser();
    }]).
When login is successful, the authenticated user is saved in AuthenticationService.currentUser.

When logout is executed, AuthenticationService.currentUser is set to `null`.

The methods `isAuthenticated` and `isAdmin` are used to dynamically customize the view. The AuthenticationService is injected in the controller, the methods are assigned to the controller's $scope and are used to show/hide parts of the template

    controller('myCtrl', function($scope, AuthenticationService) {
        $scope.isAdmin = AuthenticationService.isAdmin;
        $scope.isAuthenticated = AuthenticationService.isAuthenticated;
    })
template:

     <div  ng-show="isAuthenticated()">Only for logged-in clients</div>
     <div  ng-show="isAdmin()"> Only for users with admin role </div>

