curl({
    baseUrl: '.',

    paths: {
	'remote/storage' : 'storage',
	'underscore': 'ext/underscore'
    },
    packages: {
	'phloem': {
	    'location':'modules/phloem/src',
            'main':'phloem'
        },
        'when' : {
            'location': 'modules/when',
            'main': 'when'
        }
    }
});

window.require = curl;


