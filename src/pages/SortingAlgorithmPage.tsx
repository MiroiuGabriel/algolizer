import styled from '@emotion/styled';
import React, { useState } from 'react';
import { HighlightCode } from '../codeHighlight';
import Barchart from '../components/Barchart';
import Button from '../components/Button';
import {
	Form,
	FormError,
	FormField,
	Input,
	Label,
	Row,
	Small,
	Title,
} from '../components/styles';
import useAlgorithm from '../hooks/useAlgorithm';

const Controls = styled(Form)``;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const BarchartWrapper = styled.div`
	margin-top: 48px;
`;

const RandomBtn = styled.button`
	margin-left: 6px;
	background-color: transparent;
	border: transparent;
	cursor: pointer;

	&:disabled {
		cursor: default;
	}
`;

const Container = styled(Row)`
	margin-top: 320px;
`;

const SortingAlgorithmPage: React.FC<{
	sortingAlgo: SortAlgorithm;
	code: string;
}> = ({ sortingAlgo, code }) => {
	const initialValues = Array.from({ length: 15 }).map(
		_ => Math.floor(Math.random() * 49) + 1
	);

	const [formError, setFormError] = useState('');
	const [values, setValues] = useState(initialValues);
	const [options, setOptions] = useState<AlgorithmOptions>({
		delay: { noop: 100, swap: 300 },
		max: 50,
		min: 1,
	});

	const { data, highlight, run, running } = useAlgorithm(
		initialValues,
		sortingAlgo
	);

	const sanitizeValues = (val: string) => {
		const whitespaceRegex = /\s+/g;
		const sanitizedValues = val
			.replaceAll(whitespaceRegex, ' ')
			.trim()
			.split(' ')
			.map((v: string) => +v);

		return sanitizedValues;
	};

	const handleOptionsSave = (ev: any) => {
		ev.preventDefault();
		setFormError('');
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [valuesInput, _, delayInput] = ev.target.elements;

		const sanitizedValues = sanitizeValues(valuesInput.value);
		for (let no of sanitizedValues) {
			if (isNaN(no)) {
				setFormError(
					'Numerele trebuie sa fie separate printr-un spatiu'
				);
				return;
			}
		}

		const newOptions = {
			...options,
			delay: {
				noop: +delayInput.value,
				swap: Math.min(Math.floor(+delayInput.value * 3), 2000),
			},
		};
		setOptions(newOptions);

		run(sanitizedValues, newOptions);
	};

	const randomize = () => {
		const val = Array.from({ length: values.length }).map(
			_ =>
				options.min +
				Math.floor(Math.random() * (options.max - options.min))
		);

		setValues(val);
	};

	return (
		<Wrapper>
			<BarchartWrapper>
				<Barchart
					data={data}
					highlight={highlight}
					timer={options.delay.swap}
				/>
			</BarchartWrapper>
			<Container>
				<Controls onSubmit={handleOptionsSave}>
					<Title>Optiuni</Title>
					<FormField>
						<Label>Valori</Label>
						<Row>
							<Input
								required
								disabled={running}
								value={values.join(' ')}
								onChange={({ target }) =>
									setValues(sanitizeValues(target.value))
								}
							/>
							<RandomBtn
								title="Genereaza aleatoriu"
								disabled={running}
								onClick={randomize}
								type="button"
							>
								<img alt="random" src="/random.svg" />
							</RandomBtn>
						</Row>

						<Small>
							Numerele trebuie sa fie separate printr-un spatiu.
						</Small>
					</FormField>
					<FormField>
						<Label>Timp de executie</Label>
						<Input
							required
							type="number"
							min={10}
							max={2000}
							disabled={running}
							defaultValue={options.delay.noop}
						/>
						<Small>Timpul se masoara in milisecunde.</Small>
					</FormField>
					{formError.length > 0 && <FormError>{formError}</FormError>}
					<Button type="submit" variant="primary" disabled={running}>
						Sorteaza
					</Button>
				</Controls>

				<HighlightCode code={code} />
			</Container>
		</Wrapper>
	);
};

export default SortingAlgorithmPage;
