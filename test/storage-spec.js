define(['storage', 'phloem'], 
       function(storage, phloem) {
	   var fakeUser = phloem.either();
	   fakeUser.left("BananAnanas");

	   buster.testCase("storage", {
	       "empty lists no content" : function(done) {
		   var created = storage(fakeUser)

		   phloem.whenever(created).then(
		       function(s) {
			   buster.assert.equals(s.ls(), []);
			   done();
		       }
		   );
	       }
	   });
       });
