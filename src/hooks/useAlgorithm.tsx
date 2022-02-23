import { useRef, useState } from 'react';

export const delayed = async (cb: Function, delay: number) => {
	await new Promise(resolve => {
		cb();
		setTimeout(() => {
			resolve(1);
		}, delay);
	});
};

const mapData = (values: number[]) =>
	values.map((v, i) => ({ value: v, index: i }));

const defaultOpts = {
	delay: { noop: 100, swap: 300 },
	min: 1,
	max: 50,
};

const useAlgorithm = (values: number[], algorithm: SortAlgorithm) => {
	const [data, setData] = useState(() => mapData(values));
	const [highlight, setHighlight] = useState<{
		position: number[];
		color: string;
	}>({ position: [-1, -1], color: '#fff' });
	const isRunningRef = useRef(false);

	const transformSteps = async (steps: Step[], opts: AlgorithmOptions) => {
		for (let step of steps) {
			if (step.type === 'noop') {
				await delayed(
					() =>
						setHighlight({
							position: [step.from, step.to],
							color: step.color,
						}),
					opts.delay[step.type]
				);
			} else {
				await delayed(
					() => {
						setHighlight({
							position: [step.from, step.to],
							color: step.color,
						});

						setData(prev =>
							prev.map(v =>
								v.index === step.from
									? { ...v, index: step.to }
									: v.index === step.to
									? { ...v, index: step.from }
									: v
							)
						);
					},

					opts.delay[step.type]
				);
			}
		}
	};

	const run = async (
		values: number[],
		options: AlgorithmOptions = defaultOpts
	) => {
		isRunningRef.current = true;
		setData(mapData(values));

		const steps = algorithm(values);
		await transformSteps(steps, options);
		isRunningRef.current = false;
		setHighlight({ position: [-1, -1], color: '#fff' });
	};

	const randomize = (options: AlgorithmOptions = defaultOpts) => {
		const val = Array.from({ length: values.length }).map(
			_ =>
				options.min +
				Math.floor(Math.random() * (options.max - options.min))
		);

		setData(mapData(val));
	};

	return {
		data,
		highlight,
		run,
		randomize,
		running: isRunningRef.current,
	};
};

export default useAlgorithm;
