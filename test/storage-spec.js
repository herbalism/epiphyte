define(['storage', 'phloem', 'when'], 
       function(storage, phloem, when) {

	   var initStorage = function() {
	       var fakeUser = phloem.either();
	       fakeUser.left("BananAnanas");
	       var data = {};
	       
	       var remoteAdapterSimulator = {
		   
		   putUserData: function(name, inData, category) {
		       data[name] = inData;
		       return when(data);
		   },
		   fetchUserData: function(name, category) {
		       if(data[name]) {
			   return when(data[name]);
		       }	  
		       return when.reject(name + " does not exist!");
		   }
	       };

	       return storage("prefix")(fakeUser, remoteAdapterSimulator);
	   };

	   buster.testCase("storage", {
	       "empty lists no content" : function(done) {
		   phloem.whenever(initStorage()).then(
		       function(s) {
			   when(s.ls()).then( function (index) {
			       buster.assert.equals(index, []);
			   }).always(done);
		       }
		   );
	       },
	       "lists item that was put" : function(done) {
		   phloem.whenever(initStorage()).then(
		       function(s) {
			   when(s.put("aName", "theData")).then(function () {
			       when(s.ls()).then( function (index) {
				   buster.assert.equals(index, ["aName"]);
			       });
			   }).always(done);
		       }
		   );
	       },
	       "lists all items that was put" : function(done) {
		   phloem.whenever(initStorage()).then(
		       function(s) {
			   when.all([s.put("aName", "theData"), s.put("bName", "theData2")]).always(function () {
			       when(s.ls()).always( function (index) {
				   buster.assert.equals(index, ["aName", "bName"]);
			       });
			   }).always(done);
		       }
		   );
	       },
	       "put same index overwites earlier data": function(done) {
		   phloem.whenever(initStorage()).then(
		       function(s) {
			   when.all([s.put("aName", "theData"), s.put("aName", "theData2")]).always(function () {
			       when(s.ls()).always( function (index) {
				   buster.assert.equals(index, ["aName"]);
			       });
			   }).always(done);
		       }
		   );
		   
	       }
	   });
       });
