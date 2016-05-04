import ol from 'openlayers';
import Locations from './locations.js';

export default Map = {
	map: null,
	layers: null,

	init: function() {
		var _self = this;
		_self.render();

		Locations.init('components/map/locations-data.json', function(){
			console.log('-- Loading is done --');

			_self.showLocations();
		});
	},

	render: function() {
		var _self = this;

		var myLayer = new ol.layer.Tile({
			source: new ol.source.Stamen({
				layer: 'toner-lite'
			})
		})

		_self.layers = [myLayer];

		var centerCoords = [-105, 56];
		var myView = new ol.View({
			center: centerCoords,
			zoom: 2
		})

		_self.map = new ol.Map({
			target: 'mymap',
			layers: _self.layers,
			view: myView
		});
	},

	showLocations: function() {
		var locations = Locations.getAll();
		var iconFeatures = [];

		for (var i = 0; i < locations.length; i++ ) {
			var marker = this.addMarker(locations[i]);
			iconFeatures.push(marker);
		}

	     var styles = {
	        geoMarker: new ol.style.Style({
	          image: new ol.style.Circle({
	            radius: 5,
	            opacity: .7,
	            snapToPixel: false,
	            fill: new ol.style.Fill({color: '#94AAC1'}),
	            stroke: new ol.style.Stroke({
	              color: '#FFFFFF', width: 2
	            })
	          })
	        })
	      };

      	var vectorSource = new ol.source.Vector({
		  features: iconFeatures
		});

	     var vectorLayer = new ol.layer.Vector({
			  source: vectorSource,
			  style: styles.geoMarker   
		});

	   this.map.addLayer(vectorLayer);
	},

	addMarker: function(place) {
		var coords = [Number(place.lon), Number(place.lat)];
		
		var iconFeature = new ol.Feature({
		  geometry: new ol.geom.Point(ol.proj.transform(coords, 'EPSG:4326','EPSG:900913')),
		  name: 'Null Island Two',
		  population: 4001,
		  rainfall: 501
		});

      return iconFeature;

	}
}




