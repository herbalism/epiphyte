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
    return function(pref) {
	return function( usr, rem) {
	    user = usr || user;
	    remote = rem || remote;
	    var prefix = pref+'_';
	    var CATEGORY = 'unadmin';
	    var INDEX = '_index__';

	    return phloem.whenever(user)
		.then(function(){
		    function get(name) {
			return remote.fetchUserData(prefix+name, CATEGORY);
		    };

		    function ls() {
			return when(get(INDEX)).then( function (val) {return val || [];}, function () { return []; });
		    }

		    return {					    
			put: function(name, data){
			    return when(remote.putUserData(prefix+name, data, CATEGORY)).
				then(function(){
				    return when(ls()).then( 
					function(index) {
					    return remote.putUserData(prefix + INDEX, _.unique(index.concat([name])), CATEGORY);
					}).then( function () { return data; });
				});
			},
			get: get,
			ls: ls
		    }
		})
	}
    }
})
