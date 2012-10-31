curl({
    baseUrl: 'src',

    paths: {
	'remote/storage' : 'storage',
	'test': '../test',
	'ext': '../ext',
	'underscore': '../ext/underscore'
    },
    packages: {
	'cell': {
	    'location':'../modules/phloem/src',
            'main':'phloem'
        },
        'when' : {
            'location': '../modules/when',
            'main': 'when'
        }
    }
});

window.require = curl;


