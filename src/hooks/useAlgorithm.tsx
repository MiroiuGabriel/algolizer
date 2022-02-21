import { useState } from 'react';

const delayed = async (cb: Function, delay: number) => {
	await new Promise(resolve => {
		cb();
		setTimeout(() => {
			resolve(1);
		}, delay);
	});
};

const mapData = (values: number[]) =>
	values.map((v, i) => ({ value: v, index: i }));

const useAlgorithm = (
	values: number[],
	algorithm: SortAlgorithm,
	options: AlgorithmOptions = {
		delay: { noop: 100, swap: 300 },
		min: 1,
		max: 50,
	}
) => {
	const [data, setData] = useState(() => mapData(values));
	const [highlight, setHighlight] = useState<number[]>([]);

	const transformSteps = async (steps: Step[]) => {
		for (let step of steps) {
			if (step.type === 'noop') {
				await delayed(
					() => setHighlight([step.from, step.to]),
					options.delay[step.type]
				);
			} else {
				await delayed(
					() =>
						setData(prev =>
							prev.map(v =>
								v.index === step.from
									? { ...v, index: step.to }
									: v.index === step.to
									? { ...v, index: step.from }
									: v
							)
						),
					options.delay[step.type]
				);
			}
		}
	};

	const run = () => {
		const steps = algorithm(values);
		transformSteps(steps);
	};

	const randomize = () => {
		const val = Array.from({ length: values.length }).map(
			_ =>
				options.min +
				Math.floor(Math.random() * (options.max - options.min))
		);

		setData(mapData(val));
	};

	return { data, highlight, run, randomize };
};

export default useAlgorithm;
