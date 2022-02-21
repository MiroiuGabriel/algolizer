/// <reference types="react-scripts" />

type StepType = 'swap' | 'noop';
type Step = { from: number; to: number; type: StepType };

type SortAlgorithm = (values: number[]) => Step[];

type AlgorithmOptions = {
	delay: Record<StepType, number>;
	min: number;
	max: number;
};
