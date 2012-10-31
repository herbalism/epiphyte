define(['./remoteAdapter', 'when', './user/model', 'cell'], function(remote, when, user, cell) {
    return function(usr) {
	user = usr || user;

	var CATEGORY = 'unadmin'
	return cell.whenever(user)
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
