import { Global } from '@emotion/react';
import globalStyles from './globalStyles';
import { bubbleSort, insertionSort, selectionSort } from './algorithms';
import { Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';

import Navbar from './components/Navbar';
import SortingAlgorithmPage from './pages/SortingAlgorithmPage';
import {
	bubbleSortCode,
	insertionSortCode,
	selectionSortCode,
} from './codeHighlight';
import LeeAlgorithmPage from './pages/LeeAlgorithmPage';

const Application = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1860px;
	width: 100%;
	margin: 0 auto;
`;

function App() {
	return (
		<>
			<Navbar />
			<Application>
				<Global styles={globalStyles} />
				<Routes>
					<Route path="/">
						<Route
							index
							element={
								<SortingAlgorithmPage
									key={1}
									sortingAlgo={bubbleSort}
									code={bubbleSortCode}
								/>
							}
						/>
						<Route
							path="metoda-insertiei"
							element={
								<SortingAlgorithmPage
									key={2}
									sortingAlgo={insertionSort}
									code={insertionSortCode}
								/>
							}
						></Route>
						<Route
							path="metoda-selectiei"
							element={
								<SortingAlgorithmPage
									key={3}
									sortingAlgo={selectionSort}
									code={selectionSortCode}
								/>
							}
						></Route>
						<Route
							path="algoritmul-lui-lee"
							element={<LeeAlgorithmPage key={4} />}
						></Route>
					</Route>
				</Routes>
			</Application>
		</>
	);
}

export default App;
