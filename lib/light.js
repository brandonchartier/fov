'use strict';

const Arc = require('./arc');
const Line = require('./line');
const Point = require('./point');

class Light {
	constructor(radius) {
		const wide = new Arc(
			new Line(new Point(1, 0), new Point(0, radius)),
			new Line(new Point(0, 1), new Point(radius, 0)));

		this.arcs = [wide];
	}

	hits(pt) {
		for (let i = 0, len = this.arcs.length; i < len; i++) {
			if (this.arcs[i].hits(pt)) {
				return { i: i };
			}
		}
	}

	shade(arci, pt) {
		const arc = this.arcs[arci.i];

		this.arcs.splice.apply(this.arcs, [arci.i, 1].concat(arc.shade(pt)));

		return this.arcs.length > 0;
	}
}

module.exports = Light;
