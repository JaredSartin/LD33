module.exports = new (L.Layer.extend({
	name: "hud",

	setup: function() {
		this.score = 0;
		this.interactive = false;
		this.scoreText = new this.PIXI.Text(this.score, {
			font: "16px silkscreennormal",
			fill: "#FFFFFF",
			align: "left",
		});
	},

	onAdd: function() {
		this.addChild(this.scoreText);
		this.scoreText.position.x = 5;
		this.scoreText.position.y = 2;
	},

	onUpdate: function() {
	},

	increaseScore: function() {
		this.score++;
		this.scoreText.text = this.score;
	},

	decreaseScore: function() {
		this.score -= 3;
		this.scoreText.text = this.score;
	}
}))();
