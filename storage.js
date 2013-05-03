define(['./remoteAdapter', 
	'when', 
	'./user/model', 
	'phloem', 
	'lodash'], 
       function(remote, 
		when, 
		user, 
		phloem, 
		_) {
    return function(prefix) {
	return function( usr, rem) {
	    user = usr || user;
	    remote = rem || remote;
	    var prefix = prefix+"_";
	    var CATEGORY = 'unadmin'
	    return phloem.whenever(user)
		.then(function(){
		    function get(name) {
			return remote.fetchUserData(prefix+name, CATEGORY);
		    };

		    function ls() {
			return when(get('index')).then( function (val) {return val;}, function () { return []; });
		    }

		    return {					    
			put: function(name, data){
			    return when(remote.putUserData(prefix+name, data, CATEGORY)).
				then(function(){
				    return when(ls()).then( 
					function(index) {
					    return remote.putUserData(prefix + 'index', _.unique(index.concat([name])), CATEGORY);
					});
				});
			},
			get: get,
			ls: ls
		    }
		})
	}
    }
})
