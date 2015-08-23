var landscaper = require("../landscaper");
var player = require("../player");

module.exports = new (L.Layer.extend({
	name: "runner",

	setup: function() {
		this.paused = true;
		landscaper.setup(this);
		player.setup(this, landscaper);

		this.reset();
	},

	reset: function() {
		landscaper.reset();
		player.reset();
		this.shakeTick = 0;
		this.shakeAmount = 0;

		this.paused = false;
	},

	onAdd: function() {
		L.Input.bindAction("up", "jump");
		L.Input.bindAction("space", "jump");

		L.Input.bindAction("down", "smash");

		player.on("smash", function() {
			this.shakeTick = 12;
			this.shakeAmount = 5;
		}.bind(this));

		player.on("dead", function() {
			this.shakeTick = 30;
			this.shakeAmount = 7;
			this.paused = true;
			this.emit("endgame");
		}.bind(this));

		player.on("chomp", function() {
			this.shakeTick = 3;
			this.shakeAmount = 2;
			this.hudLayer.increaseScore();
		}.bind(this));
	},

	onUpdate: function() {
		if(this.shakeTick > 0) {
			this.position.x = L.Utils.randInt(-this.shakeAmount, this.shakeAmount);
			this.position.y = L.Utils.randInt(-this.shakeAmount, this.shakeAmount);
		} else if(this.shakeTick == 0) {
			this.position.x = 0;
			this.position.y = 0;
		}
		this.shakeTick = this.shakeTick - 1;

		if(this.paused) return;

		landscaper.update();
		player.update();
	},

	onRemove: function() {
		L.Input.unbindAction("up", "jump");
		L.Input.unbindAction("space", "jump");

		L.Input.unbindAction("down", "smash");
		// unbind keys
	}
}))();
