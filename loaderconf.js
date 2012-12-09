curl({
    baseUrl: '.',

    paths: {
	'remote/storage' : 'storage',
	'underscore': 'ext/underscore'
    },
    packages: {
	'phloem': {
	    'location':'modules/phloem',
            'main':'phloem'
        },
        'when' : {
            'location': 'modules/when',
            'main': 'when'
        },
	'lodash': {
            'location':'modules/lodash',
            'main': 'lodash'
        }	
    }
});

window.require = curl;


