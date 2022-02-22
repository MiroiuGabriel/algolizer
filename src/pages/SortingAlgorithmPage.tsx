import styled from '@emotion/styled';
import { useState } from 'react';
import Barchart from '../components/Barchart';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Button from '../components/Button';
import theme from 'prism-react-renderer/themes/nightOwl';
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

export const Pre = styled.pre`
	text-align: left;
	margin: 1em 0;
	padding: 0.5em;
	flex-grow: 1;
	max-width: 600px;
	width: 100%;
	& .token-line {
		line-height: 1.3em;
		height: 1.3em;
	}
`;

export const Line = styled.div`
	display: table-row;
`;

export const LineNo = styled.span`
	display: table-cell;
	text-align: right;
	padding-right: 1em;
	user-select: none;
	opacity: 0.5;
`;

export const LineContent = styled.span`
	display: table-cell;
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
							defaultValue={options.delay.noop}
						/>
						<Small>Timpul se masoara in milisecunde.</Small>
					</FormField>
					{formError.length > 0 && <FormError>{formError}</FormError>}
					<Button type="submit" variant="primary" disabled={running}>
						Sorteaza
					</Button>
				</Controls>
				<Highlight
					{...defaultProps}
					theme={theme}
					code={code}
					language="cpp"
				>
					{({
						className,
						style,
						tokens,
						getLineProps,
						getTokenProps,
					}) => (
						<Pre className={className} style={style}>
							{tokens.map((line, i) => (
								<Line
									key={i}
									{...getLineProps({ line, key: i })}
								>
									<LineNo>{i + 1}</LineNo>
									<LineContent>
										{line.map((token, key) => (
											<span
												key={key}
												{...getTokenProps({
													token,
													key,
												})}
											/>
										))}
									</LineContent>
								</Line>
							))}
						</Pre>
					)}
				</Highlight>
			</Container>
		</Wrapper>
	);
};

export default SortingAlgorithmPage;
