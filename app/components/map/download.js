import Map from './map.js';

var Download = {
	render: function() {
		this.export();
	},

	setDPI: function(canvas, dpi) {
	    var scaleFactor = dpi / 96;
	    	canvas.width = Math.ceil(canvas.width * scaleFactor);
	   		canvas.height = Math.ceil(canvas.height * scaleFactor);

		var ctx = canvas.getContext('2d');
	    ctx.scale(scaleFactor, scaleFactor);
	},

	export: function() {
		var _self = this,
			map = Map.getMap(),
			exportPNGElement = document.getElementById('export-png');

		var canvasJquery = $('canvas').get(0);

		exportPNGElement.addEventListener('click', function() {
			map.once('precompose', function(event) {
				_self.setDPI(canvasJquery,300);
				});

        	map.once('postcompose', function(event) {
	            var canvas = event.context.canvas;
	            exportPNGElement.href = canvas.toDataURL('image/png');
	          });

          map.renderSync();
        }, false);	
	},

};

export default Download;