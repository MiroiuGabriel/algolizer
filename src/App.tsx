import { Global } from '@emotion/react';
import globalStyles from './globalStyles';
import useAlgorithm from './hooks/useAlgorithm';
import Barchart from './components/Barchart';
import {
	bubbleSort,
	insertionSort,
	quickSort,
	selectionSort,
} from './algorithms';
import { useState } from 'react';

const initialValues = [
	2, 8, 8, 7, 16, 25, 9, 9, 6, 13, 10, 17, 4, 1, 23, 18, 5, 14, 3, 22, 24, 12,
	11, 15, 21, 20, 19,
];

function App() {
	const [options, setOptions] = useState<AlgorithmOptions>({
		delay: { noop: 100, swap: 100 },
		max: 50,
		min: 1,
	});

	const { data, highlight, run, randomize } = useAlgorithm(
		initialValues,
		quickSort,
		options
	);

	return (
		<>
			<Global styles={globalStyles} />
			<button onClick={run}>Sort</button>
			<button onClick={randomize}>Randomize</button>
			<Barchart
				data={data}
				highlight={highlight}
				timer={options.delay.swap}
			/>
		</>
	);
}

export default App;
