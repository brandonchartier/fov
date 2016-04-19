'use strict';

class Line {
	constructor(p, q) {
		this.p = p;
		this.q = q;
	}

	copy() {
		return new Line(this.p.copy(), this.q.copy());
	}

	dtheta(pt) {
		const theta = Math.atan2(this.q.y - this.p.y, this.q.x - this.p.x);
		const other = Math.atan2(pt.y - this.p.y, pt.x - this.p.x);
		const dt = other - theta;

		return ((dt > -Math.PI) ? dt : (dt + 2 * Math.PI)).toFixed(5);
	}

	cw(pt) {
		return this.dtheta(pt) > 0;
	}

	ccw(pt) {
		return this.dtheta(pt) < 0;
	}
}

module.exports = Line;
