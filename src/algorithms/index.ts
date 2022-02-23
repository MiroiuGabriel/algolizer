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
