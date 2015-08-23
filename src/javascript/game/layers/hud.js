module.exports = new (L.Layer.extend({
	name: "hud",

	setup: function() {
		this.interactive = false;
		this.scoreText = new this.PIXI.Text("-", {
			font: "24px silkscreennormal",
			fill: "#FFFFFF",
			align: "left",
		});
		this.reset();
	},

	reset: function() {
		this.score = 0;
		this.scoreText.text = this.score;
	},

	onAdd: function() {
		this.addChild(this.scoreText);
		this.scoreText.position.x = 8;
		this.scoreText.position.y = 2;
	},

	onUpdate: function() {
	},

	increaseScore: function() {
		this.score++;
		this.scoreText.text = this.score;
	},

	decreaseScore: function() {
		this.score -= 5;
		this.scoreText.text = this.score;
	}
}))();
