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

const bubbleSortCode = `function metodaBulelor(vec){
    for(let i = 0; i < vec.length - 1; i++){
        for(let j = i + 1; j < vec.length; j++){
            //Comparam elementele crescator
            if(vec[i] > vec[j]){
                //Interschimbam elementele
		let aux = vec[i];
		vec[i] = vec[j];
		vec[j] = aux;
            }
        }
    };

    return vec;
}`;

const insertionSortCode = `function metodaInsertiei(vec){
    //Incepem de la al doilea element.
    for(let i = 1; i < vec.length;i++){
        //Cautam prin elementele din spatele elementului curent.
        for(let j = i - 1; j > -1; j--){
            //Comparam elementele crescator.
            if(vec[j + 1] < vec[j]){
                //Interschimbam elementele
		let aux = vec[j+1];
		vec[j+1] = vec[j];
		vec[j] = aux;
            }
        }
    };

  return vec;
}`;

const selectionSortCode = `function metodaSelectiei(vec) {
	let min;
	for (let i = 0; i < vec.length; i++) {
	  min = i;
	  //Cautam elemente mai mici decat cel curent
	  for (let j = i + 1; j < vec.length; j++) {
		if (vec[j] < vec[min]) {
		  min = j;
		}
	  }
	  //Comparam indicele
	  if (min !== i) {
		//Interschimbam elementele
		let aux = vec[i];
		vec[i] = vec[min];
		vec[min] = aux;
	  }
	}
  
	return vec;
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
