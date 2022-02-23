import styled from '@emotion/styled';
import { useState } from 'react';
import { HighlightCode, leeAlgorithmCode } from '../codeHighlight';
import Button from '../components/Button';
import {
	Label,
	Title,
	Form,
	FormField,
	Small,
	Input,
} from '../components/styles';
import useLee from '../hooks/useLee';

const Flex = styled.div`
	display: flex;
	flex-wrap: wrap;
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

const Controls = styled(Form)`
	margin: 0 48px;
`;

const Block = styled.div<{
	value: number;
	source: boolean;
	destination: boolean;
	wall: boolean;
	visited: boolean;
	path: boolean;
}>`
	width: 24px;
	height: 24px;
	margin-bottom: 7px;
	background-color: ${props =>
		props.path
			? '#6FD666'
			: props.source
			? '#180058'
			: props.destination
			? '#E33D49'
			: props.visited
			? '#180058'
			: props.wall
			? '#696e79'
			: '#378add'};
`;
const Row = styled.div`
	display: flex;
	gap: 7px;
	align-items: center;
`;

const Canvas: React.FC<{
	matrix: number[][];
	source: Point;
	destination: Point;
}> = ({ matrix, source, destination }) => {
	return (
		<div>
			{matrix.map((row, x) => (
				<Row key={'row' + x}>
					{row.map((v, y) => (
						<Block
							key={`col_${x}_${y}`}
							value={v}
							source={x === source.x && y === source.y}
							wall={v === 0}
							visited={v === 2}
							path={v === -1}
							destination={
								x === destination.x && y === destination.y
							}
						/>
					))}
				</Row>
			))}
		</div>
	);
};

const LeeAlgorithmPage: React.FC = () => {
	const [delay, setDelay] = useState(100);
	const { matrix, source, running, destination, generateRandMatrix, run } =
		useLee(delay);

	const handleSubmit = (ev: any) => {
		ev.preventDefault();
		run();
	};
	return (
		<div>
			<Flex>
				<Canvas
					matrix={matrix}
					destination={destination}
					source={source}
				/>
				<Controls onSubmit={handleSubmit}>
					<Title>Optiuni</Title>
					<FormField>
						<Label>Matrice</Label>
						<Row>
							<RandomBtn
								title="Genereaza aleatoriu"
								disabled={running}
								onClick={generateRandMatrix}
								type="button"
							>
								<img alt="random" src="/random.svg" />
							</RandomBtn>
							<Small>Genereaza matrice</Small>
						</Row>
					</FormField>
					<FormField>
						<Label>Timp de executie</Label>
						<Input
							required
							type="number"
							min={10}
							max={2000}
							value={delay}
							disabled={running}
							onChange={({ target }) =>
								setDelay(target.valueAsNumber)
							}
						/>
						<Small>Timpul se masoara in milisecunde.</Small>
					</FormField>
					<Button type="submit" variant="primary" disabled={running}>
						Ruleaza
					</Button>
				</Controls>
			</Flex>
			<HighlightCode code={leeAlgorithmCode} width="910px" />
		</div>
	);
};

export default LeeAlgorithmPage;
