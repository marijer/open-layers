System.config({
	baseURL: '',
	
	transpiler: 'babel',

	paths: {
		babel: 					'../node_modules/babel-core/browser.js',
		openlayers: 			'../node_modules/openlayers/dist/ol-debug.js',
		d3: 					'../node_modules/d3/d3.min.js',
		systemjs: 				'../node_modules/systemjs/dist/system.js',
		'es6-module-loader': 	'../node_modules/es6-module-loader/dist/es6-module-loader.js'
	}
});