import d3 from 'd3';

export default Location = {

	locations: '',

	init: function(locationPath, callback) {
		var _self = this;
		var data = this.getLocationData(locationPath, function(data) {
			var latLong = _self.getLatLong(data, function(latLongData) {
				_self.setLocation(latLongData);
				callback();
			});
		});
	},

	getJson: function(locationUrl, callback) {
		d3.json(locationUrl, function(error, json) {
			if (error) {
				throw error;
			}
		 	
		 	callback(json);
		});
	},

	getLocationData: function(locationPath, callback) {
		this.getJson(locationPath, function(data){
			callback(data);
		})
	},

	setLocation: function(array) {
		this.locations = array;
	},

	getAll: function() {
		return this.locations;
	},

	// TODO this function needs work, has to be cleaned up
	getLatLong: function(locationsArr, callback) {
		var url = ' http://nominatim.openstreetmap.org/search?',
			_self = this,
			arr = [],
			currentNum = 0,
			totalNum = locationsArr.length - 1;

		function iterate (item) {
			var param = 'q=' + item.city +'&format=json&limit=1';
			_self.getJson(url + param, function(data) {
				if (data[0]) {
					arr.push(data[0]);
				}
				currentNum++;
				if(currentNum <= totalNum){
					if (locationsArr[currentNum]) {
						iterate(locationsArr[currentNum]);
					}
				} else {
					callback(arr);
				}
			})
		}

		iterate(locationsArr[currentNum]);

	}
}