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

export const leeAlgorithmCode = `struct Point
{
    int x;
    int y;
};
 
struct queueNode
{
    Point pt;  
    int dist;  
};
 
bool isValid(int row, int col)
{
    return (row >= 0) && (row < ROW) &&
           (col >= 0) && (col < COL);
}
 
int rowNum[] = {-1, 0, 0, 1};
int colNum[] = {0, -1, 1, 0};
 
int Lee(int mat[][COL], Point src, Point dest)
{
    if (!mat[src.x][src.y] || !mat[dest.x][dest.y])
        return -1;
 
    bool visited[ROW][COL];
    memset(visited, false, sizeof visited);
     
    visited[src.x][src.y] = true;
 
    queue<queueNode> q;
     

    queueNode s = {src, 0};
    q.push(s);  
 
    while (!q.empty())
    {
        queueNode curr = q.front();
        Point pt = curr.pt;
 
        if (pt.x == dest.x && pt.y == dest.y)
            return curr.dist;
 
        q.pop();
 
        for (int i = 0; i < 4; i++)
        {
            int row = pt.x + rowNum[i];
            int col = pt.y + colNum[i];
             
            if (isValid(row, col) && mat[row][col] &&
               !visited[row][col])
            {
                visited[row][col] = true;
                queueNode Adjcell = { {row, col},
                                      curr.dist + 1 };
                q.push(Adjcell);
            }
        }
    }
 
    return -1;
}
`;

export const Pre = styled.pre<{ width?: string }>`
	text-align: left;
	margin: 1em 0;
	padding: 0.5em;
	flex-grow: 1;
	max-width: ${props => (props.width ? props.width : '600px')};
	width: 100%;
	max-height: 600px;
	overflow: auto;
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

export const HighlightCode: React.FC<{ code: string; width?: string }> = ({
	code,
	width,
}) => {
	return (
		<Highlight {...defaultProps} theme={theme} code={code} language="cpp">
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<Pre className={className} style={style} width={width}>
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
