var hudLayer = require("../layers/hud");
var runnerLayer = require("../layers/runner");

module.exports = new (L.Scene.extend({
	name: "runner",

	onSwapIn: function(data) {
		// L.Analytics.screen("Game");
		this.paused = true;
		runnerLayer.addToScene(this);
		hudLayer.addToScene(this);
		this.paused = false;
	},

	onSwapOut: function() {
		hudLayer.remove();
		runnerLayer.remove();
	},

	onUpdate: function() {
		hudLayer.onUpdate();
		runnerLayer.onUpdate();
	}
}))();
