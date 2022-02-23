import styled from '@emotion/styled';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

export const bubbleSortCode = `void metodaBulelor(int vec[], int n){
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

export const insertionSortCode = `void metodaInsertiei(int vec[], int n){
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

export const selectionSortCode = `void metodaSelectiei(int vec[], int n) {
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

export const HighlightCode: React.FC<{ code: string }> = ({ code }) => {
	return (
		<Highlight {...defaultProps} theme={theme} code={code} language="cpp">
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<Pre className={className} style={style}>
					{tokens.map((line, i) => (
						<Line key={i} {...getLineProps({ line, key: i })}>
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
	);
};
