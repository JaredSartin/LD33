module.exports = new (L.Layer.extend({
	name: "hud",

	setup: function() {
		this.interactive = false;
	},

	// prepare: function(oceanLayer) {
	// 	this.ocean = oceanLayer;
  //
	// 	this.krillCount = new this.PIXI.Text("-", {
	// 		font: "30px Impact",
	// 		fill: "#FFFFFF",
	// 		align: "center",
	// 		stroke: "#000000",
	// 		strokeThickness: 4,
	// 		padding: 4
	// 	});
	// },

	onAdd: function() {
		// this.addChild(this.krillCount);
		// this.krillCount.anchor.y = 1;
		// this.krillCount.position.x = 44;
		// this.krillCount.position.y = L.Device.windowHeight - 44;
	},

	onUpdate: function() {
		// this.krillCount.text = this.ocean.krillager.krill.length;
	},
}))();
