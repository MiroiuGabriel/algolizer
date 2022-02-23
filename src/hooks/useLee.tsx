import { useRef, useState } from 'react';
import {
	findShortestPath,
	generateRandomMatrix,
	leeAlgorithm,
} from '../algorithms';
import { delayed } from './useAlgorithm';

const MATRIX_WIDTH = 30;
const MATRIX_HEIGHT = 20;

export const generateRandomPoint = () => {
	return {
		x: Math.floor(Math.random() * MATRIX_HEIGHT),
		y: Math.floor(Math.random() * MATRIX_WIDTH),
	};
};

const useLee = (delay: number) => {
	const [source, setSource] = useState<Point>(() => generateRandomPoint());
	const [destination, setDestination] = useState<Point>(() =>
		generateRandomPoint()
	);
	const [matrix, setMatrix] = useState(() =>
		generateRandomMatrix(MATRIX_HEIGHT, MATRIX_WIDTH, source, destination)
	);
	const [running, setRunning] = useState(false);
	const run = async () => {
		setRunning(true);
		const { dist, steps, visited } = leeAlgorithm(
			matrix,
			source,
			destination
		);

		if (dist !== -1) {
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
					delay
				);
			}
			const path = findShortestPath(visited!, destination);
			for (let step of path) {
				await delayed(
					() =>
						setMatrix(prev =>
							prev.map((v, x) =>
								v.map((v, y) =>
									x === step.x && y === step.y ? -1 : v
								)
							)
						),
					delay
				);
			}
			alert('Cea mai mica poteca are lungimea ' + dist);
		} else
			alert(
				'Nu exista o poteca pentru aceste coordonate. Te rugam sa generezi alta matrice'
			);
		setRunning(false);
	};

	const generateRandMatrix = () => {
		const randSource = generateRandomPoint();
		const randDestination = generateRandomPoint();

		setMatrix(
			generateRandomMatrix(
				MATRIX_HEIGHT,
				MATRIX_WIDTH,
				randSource,
				randDestination
			)
		);

		setSource(randSource);
		setDestination(randDestination);
	};

	return {
		matrix,
		source,
		destination,
		running,
		generateRandMatrix,
		run,
	};
};

export default useLee;
