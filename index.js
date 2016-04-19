'use strict';

const Light = require('./lib/light');
const Point = require('./lib/point');

module.exports = (grid, obj, r) => {
	const ox = obj.x;
	const oy = obj.y;

	const visit = (x, y) => {
		if (!(y < 0 || x < 0 || y > grid.length - 1 || x > grid[y].length - 1)) {
			grid[y][x].lit = true;
			grid[y][x].seen = true;
		}
	};

	const blocked = (x, y) => {
		if (!(y < 0 || x < 0 || y > grid.length - 1 || x > grid[y].length - 1)) {
			return grid[y][x].blockSight;
		}
	};

	const quadrant = (dx, dy) => {
		const light = new Light(r);

		for (let dr = 1; dr <= r; dr++) {
			for (let i = 0; i <= dr; i++) {
				const cell = new Point(dr - i, i);
				const arc = light.hits(cell);

				if (!arc) continue;

				const ax = ox + cell.x * dx;
				const ay = oy + cell.y * dy;

				visit(ax, ay);

				if (!blocked(ax, ay)) continue;
				if (!light.shade(arc, cell)) return;
			}
		}
	};

	grid.forEach(row => {
		row.forEach(col => {
			col.lit = false;
		});
	});

	visit(ox, oy);

	quadrant(-1, +1);
	quadrant(+1, +1);
	quadrant(-1, -1);
	quadrant(+1, -1);
};
