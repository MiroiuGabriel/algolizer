const greenHighlight = '#4bc740';
const redHighlight = '#e33d49';
const orangeHighlight = '#ffa500';

const swap = (
	values: number[],
	leftIndex: number,
	rightIndex: number,
	color: string = greenHighlight
): Step => {
	var temp = values[leftIndex];
	values[leftIndex] = values[rightIndex];
	values[rightIndex] = temp;

	return {
		type: 'swap',
		from: leftIndex,
		to: rightIndex,
		color,
	};
};

const noop = (
	from: number,
	to: number,
	color: string = greenHighlight
): Step => {
	return {
		type: 'noop',
		from: from,
		to: to,
		color: color,
	};
};

export const bubbleSort: SortAlgorithm = (values: number[]) => {
	let steps: Step[] = [];

	for (let i = 0; i < values.length - 1; i++) {
		for (let j = i + 1; j < values.length; j++) {
			steps.push(noop(i, j));

			if (values[i] > values[j]) {
				steps.push(swap(values, i, j, redHighlight));
			}
		}
	}

	// remove highlight
	steps.push(noop(-1, -1));
	console.log(steps);
	return steps;
};

export const insertionSort = (values: number[]) => {
	const steps: Step[] = [];
	//Start from the second element.
	for (let i = 1; i < values.length; i++) {
		steps.push(noop(i, i));
		//Go through the elements behind it.
		for (let j = i - 1; j > -1; j--) {
			steps.push(noop(j + 1, j));
			//value comparison using ascending order.
			if (values[j + 1] < values[j]) {
				//swap
				steps.push(swap(values, j + 1, j, redHighlight));
			}
		}
	}
	// remove highlight
	steps.push(noop(-1, -1));

	return steps;
};
export const selectionSort = (values: number[]) => {
	const steps: Step[] = [];
	let min;

	//start passes.
	for (let i = 0; i < values.length; i++) {
		//index of the smallest element to be the ith element.
		min = i;
		//Check through the rest of the array for a lesser element
		for (let j = i + 1; j < values.length; j++) {
			if (values[j] < values[min]) {
				min = j;
				steps.push(noop(i, min, orangeHighlight));
			} else {
				steps.push(noop(i, j));
			}
		}

		//compare the indexes
		if (min !== i) {
			//swap
			steps.push(swap(values, i, min, redHighlight));
		}
	}
	steps.push(noop(-1, -1));

	return steps;
};

const rowNeighbours = [-1, 0, 0, 1];
const colNeighbours = [0, -1, 1, 0];

function isValid(matrix: number[][], row: number, col: number) {
	return (
		row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length
	);
}

function isPath(matrix: number[][], x: number, y: number, k: number) {
	return (
		x + rowNeighbours[k] >= 0 &&
		y + colNeighbours[k] >= 0 &&
		isValid(matrix, x, y) &&
		matrix[x][y] &&
		matrix[x][y] === matrix[x + rowNeighbours[k]][y + colNeighbours[k]] + 1
	);
}

// type Visited = Array<Array<{ visited: boolean; dist: number }>>;

export function findShortestPath(matrix: number[][], destination: Point) {
	const path: Array<Point> = [];
	let x = destination.x,
		y = destination.y;

	path.push({ x, y });

	do {
		let pos = -1;
		for (let k = 0; k < 4 && pos === -1; k++) {
			if (isPath(matrix, x, y, k)) {
				pos = k;
			}
		}
		x += rowNeighbours[pos];
		y += colNeighbours[pos];
		path.push({ x, y });
	} while (matrix[x][y] !== 2);
	return path;
}

export const leeAlgorithm = (
	matrix: number[][],
	source: Point,
	destination: Point
) => {
	const steps: Point[] = [];

	if (!matrix[source.x][source.y] || !matrix[destination.x][destination.y])
		return { dist: -1, steps };

	const visited = matrix;
	console.log('bf', visited);

	const queue: queueNode[] = [];

	queue.push({ pt: source, dist: 1 });

	while (queue.length !== 0) {
		const curr = queue[0];
		const pt = curr.pt;

		if (pt.x === destination.x && pt.y === destination.y) {
			return { dist: curr.dist, steps, visited };
		}
		queue.shift();

		for (let i = 0; i < 4; i++) {
			let row = pt.x + rowNeighbours[i];
			let col = pt.y + colNeighbours[i];

			if (
				isValid(matrix, row, col) &&
				matrix[row][col] &&
				visited[row][col] === 1
			) {
				visited[row][col] = curr.dist + 1;
				if (row === destination.x && col === destination.y) {
					return { dist: curr.dist, steps, visited };
				}
				steps.push({ x: row, y: col });
				queue.push({ pt: { x: row, y: col }, dist: curr.dist + 1 });
			}
		}
	}
	// Return -1 if destination cannot be reached
	return { dist: -1, steps, visited };
};

export function generateRandomMatrix(
	rows: number,
	cols: number,
	source: Point,
	destination: Point
) {
	var matrix: number[][] = [];
	var percentChance = 0.7; // Chance to generate a 0 (wall)

	for (var i = 0; i < rows; i++) {
		matrix.push([]);
		for (var j = 0; j < cols; j++) {
			if (Math.random() < percentChance) {
				matrix[i].push(1);
			} else {
				matrix[i].push(0);
			}
		}
	}
	matrix[source.x][source.y] = 1;
	matrix[destination.x][destination.y] = 1;
	return matrix;
}
