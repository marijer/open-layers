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

		exportPNGElement.addEventListener('click', function() {
			map.once('precompose', function(event) {
				_self.setDPI(event.context.canvas,300);
				});

        	map.once('postcompose', function(event) {
	            var canvas = event.context.canvas;
	            var ctx = canvas.getContext('2d');

	            // fix for dataURI limitation Chrome 
	            ctx.canvas.toBlob(function(blob){
					exportPNGElement.href = URL.createObjectURL(blob);
				});
	          });

          map.renderSync();
        }, false);	
	},

};

export default Download;