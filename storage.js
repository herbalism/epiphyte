define(['./remoteAdapter', 'when', './user/model', 'phloem'], function(remote, when, user, phloem) {
    return function(usr) {
	user = usr || user;

	var CATEGORY = 'unadmin'
	return phloem.whenever(user)
	    .then(function(){
		return {					    
		    put: function(name, data){
			return remote.putUserData(name, data, CATEGORY)},
		    get: function(name) {
			return remote.fetchUserData(name, CATEGORY)}
		}
	    })
    }
})
