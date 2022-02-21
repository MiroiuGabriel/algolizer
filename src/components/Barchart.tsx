import styled from '@emotion/styled';

const Bar = styled.div<
	{
		value: number;
		max: number;
		count: number;
		index: number;
		highlight: boolean;
		timer: number;
	} & ChartOptions
>`
	position: absolute;
	display: flex;
	justify-content: center;
	width: ${props => props.maxWidth / props.count}px;
	bottom: 0;
	transform: translateX(
		${props => props.index * (props.maxWidth / props.count + props.gap)}px
	);
	height: ${props => (props.maxHeight * props.value) / props.max}px;
	background-color: ${props =>
		props.highlight ? 'rgb(0, 128, 0)' : 'rgb(173, 216, 230);'};
	transition: transform ${props => props.timer}ms, background 200ms;
	z-index: ${props => (props.highlight ? 1 : 0)};

	:after {
		position: absolute;
		top: -23px;
		content: '${props => props.value}';
	}
`;

const Flex = styled.div<{ height: number }>`
	position: relative;
	top: ${props => props.height}px;
`;

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

const Barchart: React.FC<BarchartProps> = ({
	data,
	highlight,
	timer,
	options = { gap: 10, maxHeight: 300, maxWidth: 800 },
}) => {
	const max = Math.max(...data.map(d => d.value));
	return (
		<Flex height={options.maxHeight}>
			{data.map((v, i) => (
				<Bar
					key={i}
					value={v.value}
					index={v.index}
					highlight={highlight.includes(v.index)}
					max={max}
					count={data.length}
					timer={timer}
					{...options}
				/>
			))}
		</Flex>
	);
};

export default Barchart;
