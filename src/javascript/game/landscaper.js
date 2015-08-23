var PLATCALC = {
	x: {
		min: 12,
		max: 36
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
		this.speedRamp = 0.002;
	},

	setup: function(container) {
		this.dist = 0;
		this.area = 0;
		this.enemies = [];
		this.platforms = [];
		this.blobs = [];
		this.needPlat = true;
		this.currentSpeed = 5;
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

				var blen = this.platforms[len].blobs.length;
				while(blen--) {
					if(!this.platforms[len].blobs[blen].dead) this.container.hudLayer.decreaseScore();
					this.platforms[len].blobs[blen].dead = true;
					this.container.removeChild(this.platforms[len].blobs[blen]);
					this.platforms[len].blobs.splice(blen, 1);
				}

				this.container.removeChild(this.platforms[len]);
				this.platforms.splice(len, 1);
				continue;
			}

			this.platforms[len].position.x -= this.currentSpeed;
		}

		len = this.blobs.length;
		while(len--) {
			if(this.blobs[len].dead) {
				this.container.removeChild(this.blobs[len]);
				this.blobs.splice(len, 1);
				continue;
			};
			this.blobs[len].position.x -= this.currentSpeed;
		}

		this.currentSpeed += this.speedRamp;
	},

	_makeNextPlatform: function(first) {
		var graphics = new L.PIXI.Graphics();
		graphics.clear();
		graphics.beginFill(0x8C5FA5);
		if(first) {
			graphics.drawRect(0,0, 480,240);
			graphics.x = 0;
			graphics.y = 176;
			graphics.blobs = [];
		} else {
			var lastPlat = this.platforms[this.platforms.length - 1];
			var w = L.Utils.randInt(this.currentSpeed * PLATCALC.w.min, this.currentSpeed * PLATCALC.w.max);
			var h = 240;

			var x = L.Utils.randInt(this.currentSpeed * PLATCALC.x.min, this.currentSpeed * PLATCALC.x.max);
			// Need to factor in x Dist + drop possibilities!
			var y = L.Utils.randInt(lastPlat.y - 20, lastPlat.y + 20)
			graphics.drawRect(0,0, w,h);
			graphics.x = 320 + x;
			graphics.y = L.Utils.clamp(y, 64, 208);

			this._createBlobs(graphics);
		}
		graphics.endFill();

		this.platforms.push(graphics);

		this.container.addChild(graphics);
		this.needPlat = true;
	},

	_createBlobs: function(platform) {
		platform.blobs = [];
		var count = L.Utils.clamp(Math.floor(platform.width / 48), 0, 8);
		while(count--) {
			var graphics = new L.PIXI.Graphics();
			graphics.clear();
			graphics.beginFill(0x5B859E);
			graphics.drawRect(0,0, 8,8);
			graphics.x = platform.x + L.Utils.randInt(8, platform.width - 16);
			graphics.y = platform.y - 12;

			platform.blobs.push(graphics);
			this.blobs.push(graphics);
			this.container.addChild(graphics);
		}
	}
}))();
