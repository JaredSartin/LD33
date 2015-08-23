module.exports = new (L.Class.create({
	mixins: [L.EventsMixin],

	constructor: function() {
    L.EventsMixin.call(this);
		this.gravity = 0.5;
		this.jumpVel = 20;
		this.smashVel = 10;
		this.drawable = new L.PIXI.Graphics();
		this.drawable.clear();
		this.drawable.beginFill(0x627329);
		this.drawable.drawRect(0,0, 16,16);

		this.velocity = 0;
		this.landed = false;
		this.smash = false;
	},

	setup: function(container, landscaper) {
		this.container = container;
		this.landscaper = landscaper;
		this.dead = false;

		this.drawable.x = 96;
		this.drawable.y = 128;
		this.container.addChild(this.drawable);
	},

	update: function() {
		if(this.landed && L.Input.action.jump) {
			// PARTICLES!
			this.velocity -= this.jumpVel;
			this.landed = false;
		}

		if(!this.landed && L.Input.action.smash) {
			// PARTICLES!
			this.velocity += this.smashVel;
			this.smash = true;
		}

		if(this.landed) {
			this.velocity = 0;
			this.jumpTicks = 0;
		}
		this.velocity += this.gravity;
		this.velocity = L.Utils.clamp(this.velocity, -10, 15);

		this.drawable.y += this.velocity;

		if(this.drawable.y > 320) {
			this.dead = true;
			this.emit("dead");
		}

		this.landed = false; // pre-empt the collisions - if no collision, then we fell off an edge
		this._collide(this.drawable, this.landscaper.platforms, this.pCollide.bind(this), true);
		this._collide(this.drawable, this.landscaper.blobs, this.bCollide.bind(this));
	},

	pCollide: function(me, platform, side) {
		if(side !== "bottom") {
			this.dead = true;
			this.emit("dead");
			return;
		}

		this.drawable.y = platform.y - this.drawable.height;

		if(this.smash) {
			this.emit("smash");
		}
		this.smash = false;
		this.landed = true;
	},

	bCollide: function(me, blob) {
		if(!blob.dead) {
			blob.dead = true;
			this.emit("chomp");
		}
	},

	// Temp - L.Utils.collisions is for sprites 
	_collide: function(me, others, cb, single) {
		var len = others.length;
		while(len--) {
			if(!(others[len].x > (me.x + me.width) ||
					 (others[len].x + others[len].width) < me.x ||
					 others[len].y > (me.y + me.height) ||
					 (others[len].y + others[len].height) < me.y)) {
				cb(me, others[len], this._collisionSide(me, others[len]));
				if(single) return;
			}
		}
	},
	
	_collisionSide: function(me, obj) {
		var dist = Math.abs((me.y + me.height) - obj.y);
		var side = "bottom";

		if(dist > Math.abs(me.y - (obj.y + obj.height))) {
			dist = Math.abs(me.y - (obj.y + obj.height));
			side = "top";
		}

		if(dist > Math.abs(me.x - (obj.x + obj.width))) {
			dist = Math.abs(me.x - (obj.x + obj.width));
			side = "left";
		}

		if(dist > Math.abs((me.x + me.width) - obj.x)) {
			side = "right";
		}

		return side;
	}
}))();
