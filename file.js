define([ 'phloem', './user/model', './storage', 'when', './ext/hash'], 
       function(phloem, user, storage, when, hash) {
    return function(optionalStorage) {
	storage = optionalStorage || storage;

	return phloem.whenever(storage()).then(
	    function(storage) {
		var queue = phloem.queue(function(val) {return val.name;});
		var enqueueSingle = function(file) {
		    var data = when.defer();
		    var fileStatus = {
			name: file.name,
			read: data.promise,
			stored: when(data.promise).
                            then(function(d)  {
                                     var hashed = hash.SHA1(d);
			             return when(storage.put(hashed, {
				                                 name: file.name,
				                                 size: file.size,
				                                 type: file.type,
				                                 lastModified: file.lastModified,
				                                 data: d,
                                                                 hash: hashed
			                                     })).
                                         then(function(result) {
				                  var dropped = queue.drop(result);
				                  return when(dropped).then(function(){return result;});
			                      });
			         })
		    };
		    
		    queue.push(fileStatus);

		    var reader = new FileReader();
		    reader.onload = function(event) {
			data.resolve(event.target.result);
		    };

		    reader.readAsDataURL(file);
		};

		/**
		 * Enqueue a FileList or a File
		 */
		var enqueue = function(files) {
		    if (files.length) {
			var i;
			for(i = 0; i < files.length; i++) {
			    var file = files[i];
			    enqueueSingle(file);
			}
		    }
		    else {
			enqueueSingle(files);
		    }
		}

		var result =  {
		    enqueue:enqueue,
		    queue: queue.next()
		}
		return result;
	    });
    }
});
