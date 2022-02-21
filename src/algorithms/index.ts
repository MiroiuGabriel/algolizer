export const bubbleSort: SortAlgorithm = (values: number[]) => {
	let steps: Step[] = [];

	for (let i = 0; i < values.length - 1; i++) {
		for (let j = i + 1; j < values.length; j++) {
			steps.push({
				type: 'noop',
				from: i,
				to: j,
			});
			if (values[i] > values[j]) {
				let aux = values[i];
				values[i] = values[j];
				values[j] = aux;
				steps.push({
					type: 'swap',
					from: i,
					to: j,
				});
			}
		}
	}

	// remove highlight
	steps.push({
		type: 'noop',
		from: -1,
		to: -1,
	});

	return steps;
};
