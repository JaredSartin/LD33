var endGameLayer = require("../layers/endGame");
var hudLayer = require("../layers/hud");
var runnerLayer = require("../layers/runner");

module.exports = new (L.Scene.extend({
	name: "runner",
	backgroundColor: 0x1F0D29,

	setup: function() {
		this.background = new L.PIXI.Graphics();
		this.background.clear();
		this.background.beginFill(this.backgroundColor || 0xFFFFFF);
		this.background.drawRect(0,0, 320,240);

		runnerLayer.hudLayer = hudLayer;

		runnerLayer.on("endgame", function() {
			endGameLayer.addToScene(this);
		}.bind(this));
		endGameLayer.on("retry", function() {
			endGameLayer.remove();

			runnerLayer.reset();
			hudLayer.reset();
		}.bind(this));
	},

	onSwapIn: function(data) {
		// L.Analytics.screen("Game");
		this.paused = true;
		this.addChild(this.background);
		runnerLayer.addToScene(this);
		hudLayer.addToScene(this);
		this.paused = false;
	},

	onSwapOut: function() {
		this.removeChild(this.background);
		hudLayer.remove();
		runnerLayer.remove();
	},

	onUpdate: function() {
		hudLayer.onUpdate();
		runnerLayer.onUpdate();
	}
}))();
