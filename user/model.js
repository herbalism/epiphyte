define(["../remoteAdapter", "when", "phloem"],
       function(remote, when, phloem) {
	   console.log("user model");
	   var loggedIn = when.defer();
	   var loggedOut = when.defer();
	   var user = phloem.optional();
	   var login = undefined;



	   login = function(name) {
	       when(remote.login(name, ['unadmin'])).
		   then(function(name) {
		       user.set(createUser(name));
		   },
		   function() {
		       user.clear(login);
		   })
           };

	   var createUser = function(name) {
	       var result = {
		   'name': name,
		   'logout': function() {
		       user.clear(login);
		   }
	       };
	       return result;
	   }
	   

	   when(remote.restoreLogin()).then(
	       function(name) {
		   user.set(createUser(name));
	       },
	       function(error) {
		   user.clear(login);
	       });

	   return user.read;
       });


