define(['file', 'when', 'phloem', '../ext/hash'], function(file, when, phloem, hash) {
    var fixture = function() {
	var fakeStorage = {
	    put:function(name, data){
		return when({name:name, data:data})
	    }
	};
	var optional = phloem.optional();


	var result = when.defer();
	phloem.whenever(file(function(){return optional.read})).then(
	    function(val) {
		result.resolve({
		    storage:fakeStorage,
		    files:val});
	    })
	

	optional.set(fakeStorage);
	return result.promise;
    }
    
    var assert = buster.assert;
    
    buster.testCase("file", {
	"can read single files" : function() {
	    return when(fixture())
		.then(
		    function(f) {
			blob = new Blob(["1234567890"], {type: "image/jpeg"});
			f.files.enqueue(blob);
			return f.files.queue
		    })
		.then(function(element){
		    return element.value[0].read
		})
		.then(function(data) {
		    assert.equals(data, "data:image/jpeg;base64,"+btoa("1234567890"));
		});
	},
	"can read store single files" : function() {
	    return when(fixture())
		.then(
		    function(f) {
			blob = new Blob(["1234567890"], {type: "image/jpeg"});
			blob.name = "my-image.jpeg";
			f.files.enqueue(blob);
			return f.files.queue
		    })
		.then(function(element){
		    return element.value[0].stored
		})
		.then(function(data) {
		    var expectedData = "data:image/jpeg;base64,"+btoa("1234567890")
		    assert.match(data, 
				 {
				     data:{
					 name:"my-image.jpeg",
					 data:expectedData,
					 size:10,
					 type:"image/jpeg"
				     },
				     name:hash.SHA1(expectedData)
				 });
		});
	}
    })
})
