import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { HighlightCode } from '../codeHighlight';
import { delayed } from '../hooks/useAlgorithm';

const initialMatrix = [
	[1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
	[1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
	[1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	[1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
	[1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
	[1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
	[1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
];

// const initialMatrix = [
// 	[1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
// 	[1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
// 	[1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
// 	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
// 	[1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
// 	[1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
// 	[1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
// ];

// const initialMatrix = [
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// ];

type Point = {
	x: number;
	y: number;
};

type queueNode = {
	pt: Point;
	dist: number;
};

const rowNeighbours = [-1, 0, 0, 1];
const colNeighbours = [0, -1, 1, 0];

function isValid(row: number, col: number) {
	return (
		row >= 0 &&
		row < initialMatrix.length &&
		col >= 0 &&
		col < initialMatrix.length
	);
}

const leeAlgorithm = (
	matrix: number[][],
	source: Point,
	destination: Point
) => {
	const steps: Point[] = [];

	if (!matrix[source.x][source.y] || !matrix[destination.x][destination.y])
		return { dist: -1, steps };
	const visited: boolean[][] = Array.from({ length: matrix.length }).map(
		_ => []
	);

	const queue: queueNode[] = [];

	queue.push({ pt: source, dist: 0 });

	while (queue.length !== 0) {
		const curr = queue[0];
		const pt = curr.pt;

		if (pt.x === destination.x && pt.y === destination.y) {
			return { dist: curr.dist, steps };
		}

		queue.shift();

		for (let i = 0; i < 4; i++) {
			let row = pt.x + rowNeighbours[i];
			let col = pt.y + colNeighbours[i];

			if (isValid(row, col) && matrix[row][col] && !visited[row][col]) {
				visited[row][col] = true;
				if (row === destination.x && col === destination.y) {
					return { dist: curr.dist, steps };
				}
				steps.push({ x: row, y: col });
				queue.push({ pt: { x: row, y: col }, dist: curr.dist + 1 });
			}
		}
		console.log('queue', queue);
	}
	// Return -1 if destination cannot be reached
	return { dist: -1, steps };
};

const Block = styled.div<{
	value: number;
	source: boolean;
	destination: boolean;
	wall: boolean;
	visited: boolean;
}>`
	width: 48px;
	height: 48px;
	margin-bottom: 7px;
	background-color: ${props =>
		props.source
			? '#6FD666'
			: props.destination
			? '#E33D49'
			: props.visited
			? '#180058'
			: props.wall
			? '#696e79'
			: '#378add'};
`;
const Row = styled.div`
	display: flex;
	gap: 7px;
`;

const LeeAlgorithmPage: React.FC = () => {
	const [matrix, setMatrix] = useState<Array<Array<any>>>(initialMatrix);
	const source: Point = { x: 0, y: 0 };
	const destination: Point = { x: 3, y: 4 };

	const transformSteps = async () => {
		const matrix = initialMatrix;

		const { dist, steps } = leeAlgorithm(matrix, source, destination);
		for (let step of steps) {
			await delayed(
				() =>
					setMatrix(prev =>
						prev.map((v, x) =>
							v.map((v, y) =>
								x === step.x && y === step.y ? 2 : v
							)
						)
					),
				10
			);
		}
		if (dist !== -1) console.log('Shortest Path is ' + dist);
		else console.log("Shortest Path doesn't exist");
	};

	return (
		<>
			<div>
				<button onClick={transformSteps}>Start</button>
				{matrix.map((row, x) => (
					<Row key={'row' + x}>
						{row.map((v, y) => (
							<Block
								key={`col_${x}_${y}`}
								value={v}
								source={x === source.x && y === source.y}
								wall={v === 0}
								visited={v === 2}
								destination={
									x === destination.x && y === destination.y
								}
							/>
						))}
					</Row>
				))}
			</div>
			<HighlightCode code={''} />
		</>
	);
};

export default LeeAlgorithmPage;
