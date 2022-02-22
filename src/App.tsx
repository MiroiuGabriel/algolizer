import { Global } from '@emotion/react';
import globalStyles from './globalStyles';
import { bubbleSort, insertionSort, selectionSort } from './algorithms';
import { Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';

import Navbar from './components/Navbar';
import SortingAlgorithmPage from './pages/SortingAlgorithmPage';

const Application = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1860px;
	width: 100%;
	margin: 0 auto;
`;

const bubbleSortCode = `void metodaBulelor(int vec[], int n){
    for(int i = 0; i < n - 1; i++){
        for(int j = i + 1; j < n; j++){
            //Comparam elementele crescator

            if(vec[i] > vec[j]){
                //Interschimbam elementele

		int aux = vec[i];
		vec[i] = vec[j];
		vec[j] = aux;
            }
        }
    };
}`;

const insertionSortCode = `void metodaInsertiei(int vec[], int n){
    //Incepem de la al doilea element.
    for(int i = 1; i < n; i++){
        //Cautam prin elementele din spatele elementului curent.
        for(int j = i - 1; j > -1; j--){
            //Comparam elementele crescator.
            if(vec[j + 1] < vec[j]){
                //Interschimbam elementele
		int aux = vec[j+1];
		vec[j + 1] = vec[j];
		vec[j] = aux;
            }
        }
    };
}`;

const selectionSortCode = `void metodaSelectiei(int vec[], int n) {
	int min;

	for (int i = 0; i < n; i++) {
	  min = i;
	  //Cautam elemente mai mici decat cel curent
	  for (int j = i + 1; j < n; j++) {
		if (vec[j] < vec[min]) {
		  min = j;
		}
	  }
	  //Comparam indicele
	  if (min !== i) {
		//Interschimbam elementele
		int aux = vec[i];
		vec[i] = vec[min];
		vec[min] = aux;
	  }
	}
  }`;

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
					</Route>
				</Routes>
			</Application>
		</>
	);
}

export default App;
