var Tooltip = {
	hook: undefined,

	init: function() {
		this.hook = document.getElementById('tooltip');
	},

	display: function (pixel, feature) {
        if (feature) {
        	this.show();
        	this.hook.style.left = pixel[0] + 'px';
        	this.hook.style.top = (pixel[1] - 15) + 'px';
        	this.hook.innerHTML = feature.get('name');
        } else {
        	this.hide();
        }
	},

	show: function() {
        var trimmed = this.hook.className.replace('none', '').trim();
        this.hook.className = trimmed;
	},

	hide: function(pixel) {
		var hassClass = this.hook.className.indexOf('none');
		this.hook.className = hassClass > 0 ? this.hook.className : this.hook.className + ' none';
	}
};

export default Tooltip;