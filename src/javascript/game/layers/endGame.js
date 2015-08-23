module.exports = new (L.Layer.extend({
	name: "end-game",

	setup: function() {
		this.interactive = true;
		this.retryText = new this.PIXI.Text("Retry?", {
			font: "32px silkscreennormal",
			fill: "#FFFFFF",
			align: "left",
		});
	},

	onAdd: function() {
		this.addChild(this.retryText);
		this.retryText.anchor.x = 0.5;
		this.retryText.position.x = 160;
		this.retryText.position.y = 60;
		this.retryText.buttonMode = true;
		this.retryText.interactive = true;
		this.retryText.click = function() {
			this.emit("retry");
		}.bind(this);
	},

	onUpdate: function() {
	},
}))();
