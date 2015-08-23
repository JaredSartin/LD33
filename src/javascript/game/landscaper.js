var PLATCALC = {
	x: {
		min: 5,
		max: 30
	},
	y: {
		min: 0,
		max: 0,
	},
	w: {
		min: 20,
		max: 80,
	},
	h: {
		min: 32,
		max: 32,
	}
}

module.exports = new (L.Class.create({
	constructor: function() {
		this.dist = 0;
		this.area = 0;
		this.enemies = [];
		this.platforms = [];
		this.currentSpeed = 5;
		this.needPlat = true;
	},

	setup: function(container) {
		this.container = container;
		this._makeNextPlatform(true);
	},

	update: function() {
		this.dist += this.currentSpeed;
		var len = this.platforms.length;
		if(this.needPlat && this.platforms[len - 1].x + this.platforms[len - 1].width < 320) {
			this.needPlat = false;
			this._makeNextPlatform();
		}

		while(len--) {
			if(this.platforms[len].x + this.platforms[len].width < 0) {
				this.container.removeChild(this.platforms[len]);
				this.platforms.splice(len, 1);
				continue;
			}

			this.platforms[len].position.x -= this.currentSpeed;
		}

		// Speed ramp?
	},

	_makeNextPlatform: function(first) {
		var graphics = new L.PIXI.Graphics();
		graphics.clear();
		graphics.beginFill(0xFF00FF);
		if(first) {
			graphics.drawRect(0,0, 480,32);
			graphics.x = 0;
			graphics.y = 176;
		} else {
			var lastPlat = this.platforms[this.platforms.length - 1];
			var w = L.Utils.randInt(this.currentSpeed * PLATCALC.w.min, this.currentSpeed * PLATCALC.w.max);
			var h = 32;

			var x = L.Utils.randInt(this.currentSpeed * PLATCALC.x.min, this.currentSpeed * PLATCALC.x.max);
			// Need to factor in x Dist + drop possibilities!
			var y = L.Utils.randInt(lastPlat.y - 20, lastPlat.y + 20)
			graphics.drawRect(0,0, w,h);
			graphics.x = 320 + x;
			graphics.y = y;
		}
		graphics.endFill();

		this.platforms.push(graphics);

		this.container.addChild(graphics);
		this.needPlat = true;
	}
}))();