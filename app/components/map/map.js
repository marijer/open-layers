import ol from 'openlayers';
import Locations from './locations.js';
import Download from './download.js';
import Tooltip from './tooltip.js';

export default Map = {
	map: null,
	layers: null,

	init: function() {
		var _self = this;

		_self.render();
		_self.initLocations();
		Tooltip.init();

		Download.render();
	},

	getMap: function() {
		return this.map;
	},

	initLocations: function() {
		var _self = this;
		Locations.init('components/map/data/locations-data.json', function(){
			console.log('-- Loading is done --');
			_self.showLocations();
		});
	},

	render: function() {
		var _self = this;

		var vectorLayer = this.getCountriesLayer();

		_self.layers = [vectorLayer];

		var centerCoords = [-105, 56];
		var myView = new ol.View({
			center: centerCoords,
			zoom: 2
		})

		_self.map = new ol.Map({
			target: 'map',
			layers: _self.layers,
			view: myView
		});

		_self.map.on('click', function(evt) {
			_self.displayTooltip(evt.pixel);
		});

		_self.map.on('pointermove', function(evt) {
       		if (evt.dragging) {
	          Tooltip.hide();
	          return;
	        }
	        _self.displayTooltip(_self.map.getEventPixel(evt.originalEvent));
      });
	},

	displayTooltip: function(pixel) {
		var feature = this.map.forEachFeatureAtPixel(pixel, function(feature) {
         	return feature;
        });
       
        if (feature && feature.get('id') === 'markers') {
			Tooltip.display(pixel, feature);
        } else {
        	Tooltip.hide();
        }
	},

	getCountriesLayer: function() {
		var countryStyle = new ol.style.Style({
	        fill: new ol.style.Fill({
	          color: '#E5E8EC'
	        }),
	        stroke: new ol.style.Stroke({
	          color: '#FBFBFC',
	          width: 1,
	          lineCap: 'round'
	        }),
	        zIndex: 2
	      });

	    var source = new ol.source.Vector({
		  url: 'components/map/data/countries.json',
		  format: new ol.format.GeoJSON(),
		  wrapX: false
		});

		var vectorLayer = new ol.layer.Vector({
	        source: source,
	        style: [countryStyle]
	      });

		return vectorLayer;
	},

	getStamenLayer: function() {
		var myLayer = new ol.layer.Tile({
			source: new ol.source.Stamen({
				layer: 'toner-lite'
			})
		})
		return myLayer;
	},

	showLocations: function() {
		var locations = Locations.getAll();
		var iconFeatures = [];

		for (var i = 0; i < locations.length; i++ ) {
			var marker = this.getMarker(locations[i]);
			if (marker) {
				iconFeatures.push(marker);
			}
		}

	     var styles = {
	        geoMarker: new ol.style.Style({
	          image: new ol.style.Circle({
	            radius: 6,
	            opacity: .7,
	            snapToPixel: false,
	            fill: new ol.style.Fill({color: '#94AAC1'}),
	            stroke: new ol.style.Stroke({
	              color: '#FFFFFF', width: 3
	            })
	          })
	        }),
	        imageMarker: new ol.style.Style({
		    	image: new ol.style.Icon({
		    		src: 'components/map/img/marker.svg',
		    		opacity: .7,
		    		snapToPixel: true
		    	})
		    })
	      };

      	var vectorSource = new ol.source.Vector({
		  features: iconFeatures,
		  wrapX: false
		});

	     var vectorLayer = new ol.layer.Vector({
			  source: vectorSource,
			  style: styles.imageMarker   
		});

	   this.map.addLayer(vectorLayer);
	},

	getMarker: function(place) {
		var coords = [Number(place.lon), Number(place.lat)];
		
		var iconFeature = new ol.Feature({
		  geometry: new ol.geom.Point(ol.proj.transform(coords, 'EPSG:4326','EPSG:900913')),
		  name: place.display_name,
		  id: 'markers',
		});

      return iconFeature;
	}
}




