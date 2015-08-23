var landscaper = require("../landscaper");
var player = require("../player");

module.exports = new (L.Layer.extend({
	name: "runner",

	setup: function() {
		this.paused = true;
		landscaper.setup(this);
		player.setup(this, landscaper);
	},

	onAdd: function() {
		this.paused = false;
		L.Input.bindAction("up", "jump");
		L.Input.bindAction("space", "jump");

		L.Input.bindAction("down", "smash");
		// bind keys
	},

	onUpdate: function() {
		if(this.paused) return;
		landscaper.update();
		player.update();
		if(player.dead) this.paused = true;
	},

	onRemove: function() {
		L.Input.unbindAction("up", "jump");
		L.Input.unbindAction("space", "jump");

		L.Input.unbindAction("down", "smash");
		// unbind keys
	}
}))();
