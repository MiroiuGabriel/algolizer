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

const partition = (values: number[], left: number, right: number) => {
	const steps: Step[] = [];

	let pivot = values[Math.floor((right + left) / 2)], //middle element
		i = left, //left pointer
		j = right; //right pointer

	while (i <= j) {
		steps.push(noop(i, j));
		while (values[i] < pivot) {
			steps.push(noop(pivot, i));
			i++;
		}
		while (values[j] > pivot) {
			steps.push(noop(pivot, j));
			j--;
		}
		if (i <= j) {
			const step = swap(values, i, j); //sawpping two elements
			steps.push(step);
			steps.push(noop(i, j));
			i++;
			j--;
		}
	}

	return { steps, index: i };
};

const quickSort2 = (values: number[], left: number, right: number) => {
	const steps: Step[] = [];

	if (values.length > 1) {
		const { steps: partitionSteps, index } = partition(values, left, right); //index returned from partition
		steps.push(...partitionSteps);

		if (left < index - 1) {
			//more elements on the left side of the pivot
			const leftSteps = quickSort2(values, left, index - 1);
			steps.push(...leftSteps);
		}
		if (index < right) {
			//more elements on the right side of the pivot
			const rightSteps = quickSort2(values, index, right);
			steps.push(...rightSteps);
		}
	}

	return steps;
};

export const quickSort: SortAlgorithm = (values: number[]) => {
	return [...quickSort2(values, 0, values.length - 1), noop(-1, -1)];
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
