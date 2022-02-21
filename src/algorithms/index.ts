const swap = (
	values: number[],
	leftIndex: number,
	rightIndex: number
): Step => {
	var temp = values[leftIndex];
	values[leftIndex] = values[rightIndex];
	values[rightIndex] = temp;

	return {
		type: 'swap',
		from: leftIndex,
		to: rightIndex,
	};
};

const noop = (from: number, to: number): Step => {
	return {
		type: 'noop',
		from: from,
		to: to,
	};
};

export const bubbleSort: SortAlgorithm = (values: number[]) => {
	let steps: Step[] = [];

	for (let i = 0; i < values.length - 1; i++) {
		for (let j = i + 1; j < values.length; j++) {
			steps.push(noop(i, j));
			if (values[i] > values[j]) {
				steps.push(swap(values, i, j));
			}
		}
	}

	// remove highlight
	steps.push(noop(-1, -1));

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
				steps.push(swap(values, j + 1, j));
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
			}
			steps.push(noop(i, j));
		}
		steps.push(noop(i, min));

		//compare the indexes
		if (min !== i) {
			//swap
			steps.push(swap(values, i, min));
		}
	}
	steps.push(noop(-1, -1));

	return steps;
};
