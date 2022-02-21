import { css } from '@emotion/react';

const globalStyles = css`
	@font-face {
		font-family: 'Nexa';
		src: url('/fonts/nexa_light.otf');
		font-weight: 400;
	}

	@font-face {
		font-family: 'Nexa';
		src: url('/fonts/nexa_bold.otf');
		font-weight: bold;
	}

	body {
		margin: 0;
		font-family: 'Nexa', -apple-system, BlinkMacSystemFont, 'Segoe UI',
			'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
			'Helvetica Neue', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #fdffff;
		background-color: #020610;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
			monospace;
	}
`;

export default globalStyles;
