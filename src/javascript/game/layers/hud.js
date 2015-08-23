module.exports = new (L.Layer.extend({
	name: "hud",

	setup: function() {
		this.interactive = false;
		this.score = new this.PIXI.Text("0", {
			font: "16px silkscreennormal",
			fill: "#FFFFFF",
			align: "left",
		});
	},

	onAdd: function() {
		this.addChild(this.score);
		this.score.position.x = 5;
		this.score.position.y = 2;
	},

	onUpdate: function() {
		// this.krillCount.text = this.ocean.krillager.krill.length;
	},
}))();
