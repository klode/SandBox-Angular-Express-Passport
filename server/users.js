'use strict';

var Users = [{id: 1, username: 'user', password: 'pass', role: 'USER'}, 
	     {id: 2, username: 'admin', password: 'pass', role: 'ADMIN'}];

function findUserByProperty (prop, val) {
	
	for (var i = 0, l = Users.length; i < l; i++) {
            // check the obj has the property before comparing it
            if (typeof Users[i][prop] === 'undefined') {
		continue;
            }
	    
            // if the obj property equals our test value, return the obj
            if (Users[i][prop] === val) {
		return Users[i];
            }
	}
	
	// didn't find an object with the property
	return false;
    };

module.exports = {
    testUsers: Users,
    user: Users[0],
    admin: Users[1],
    findUserByUsername: function (username) {
	return findUserByProperty('username', username);
    },
    findUserById: function (id) {
	return findUserByProperty('id', id);
    }
    
}
