'use strict';

const Point = require('./point');

class Arc {
	constructor(steep, shallow) {
		this.steep = steep;
		this.shallow = shallow;
		this.steepBumps = [];
		this.shallowBumps = [];
	}

	copy() {
		const c = new Arc(this.steep.copy(), this.shallow.copy());

		c.steepBumps = this.steepBumps.map(x => x.copy());
		c.shallowBumps = this.shallowBumps.map(x => x.copy());

		return c;
	}

	hits(pt) {
		return (this.steep.ccw(new Point(pt.x + 1, pt.y)) &&
			this.shallow.cw(new Point(pt.x, pt.y + 1)));
	}

	bumpCW(pt) {
		const sb = new Point(pt.x + 1, pt.y);

		this.steepBumps.push(sb);
		this.steep.q = sb;

		for (let i = 0, len = this.shallowBumps.length; i < len; i++) {
			const b = this.shallowBumps[i];

			if (this.steep.cw(b)) {
				this.steep.p = b;
			}
		}
	}

	bumpCCW(pt) {
		const sb = new Point(pt.x, pt.y + 1);

		this.shallowBumps.push(sb);
		this.shallow.q = sb;

		for (let i = 0, len = this.steepBumps.length; i < len; i++) {
			const b = this.steepBumps[i];

			if (this.shallow.ccw(b)) {
				this.shallow.p = b;
			}
		}
	}

	shade(pt) {
		const steepBlock = this.steep.cw(new Point(pt.x, pt.y + 1));
		const shallowBlock = this.shallow.ccw(new Point(pt.x + 1, pt.y));

		if (steepBlock && shallowBlock) {
			return [];
		} else if (steepBlock) {
			this.bumpCW(pt);
			return [this];
		} else if (shallowBlock) {
			this.bumpCCW(pt);
			return [this];
		} else {
			const a = this.copy();
			const b = this.copy();

			a.bumpCW(pt);
			b.bumpCCW(pt);

			return [a, b];
		}
	}
}

module.exports = Arc;
