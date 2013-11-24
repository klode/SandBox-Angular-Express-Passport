# Simple Example for an Angular-Express-Passport App (work in progress)

This project is based on the Angular-Express-Seed https://github.com/btford/angular-express-seed.

It uses PassportJs for user Authentication and is a basic example of server side authorization. It demonstrates how to make API calls accessible only to authenticated users, or only to users with admin role. This is achieved in server/routes.js calling the middleware functions ensureAuthenticated, and ensureAdmin defined in server/authentication.js

## How to use this example

1. Clone the repository,
2. run `bower install` 
3. cd server/ 
4. run `npm install`
5. cd ..
6. run `node server/server.j`
7. open browser to: localhost:9000/


    
