define([ 'cell', 'user/model', 'remote/storage', 'when', 'hash'], 
       function(cell, user, storage, when, hash) {
    return function(optionalStorage) {
	storage = optionalStorage || storage

	return cell.whenever(storage()).then(
	    function(storage) {
		var queue = cell.queue();

		var enqueueSingle = function(file) {
		    var data = when.defer();
		    var fileStatus = {
			name: file.name,
			read: data.promise,
			stored: when(data.promise).then(function(d)  {
			    return storage.put(hash.SHA1(d), {
				name: file.name,
				size: file.size,
				type: file.type,
				lastModified: file.lastModified,
				data: d
			    })})
		    }
		    
		    queue.push(fileStatus);

		    var reader = new FileReader();
		    reader.onload = function(event) {
			data.resolve(event.target.result)
		    };

		    reader.readAsDataURL(file);
		}

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
