import ol from 'openlayers';

var myLayer = new ol.layer.Tile({
	source: new ol.source.OSM()
})

var myLayers = [myLayer];

var centerCoords = [-95, 45];
var myView = new ol.View({
	center: centerCoords,
	zoom: 3
})

var map = new ol.Map({
	target: 'mymap',
	layers: myLayers,
	view: myView
});