/// <reference types="react-scripts" />

type StepType = 'swap' | 'noop';
type Step = { from: number; to: number; type: StepType };

type SortAlgorithm = (values: number[]) => Step[];

type AlgorithmOptions = {
	delay: Record<StepType, number>;
	min: number;
	max: number;
};

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

type ButtonProps = {
	onClick?: () => void;
	variant: ButtonVariant;
	type: 'button' | 'submit' | 'reset' | undefined;
};

type ChartOptions = {
	maxWidth: number;
	maxHeight: number;
	gap: number;
};

type BarchartProps = {
	data: Array<{ value: number; index: number }>;
	highlight: number[];
	timer: number;
	options?: ChartOptions;
};
