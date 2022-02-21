import { Bar, Flex } from './styles';

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
