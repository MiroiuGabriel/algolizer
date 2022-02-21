import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Btn = styled.button<{
	background?: string;
	hoverBackground?: string;
}>`
	width: 150px;
	height: 40px;
	background-color: ${props => props.background};
	outline: none;
	border: none;
	border-radius: 4px;
	color: #fff;
	font-family: 'Nexa';
	font-weight: bold;
	font-size: 16px;
	cursor: pointer;
	transition: 200ms;
	&:hover {
		background-color: ${props => props.hoverBackground};
	}

	&:disabled {
		background-color: #929292;
		cursor: default;
	}
`;

export const Bar = styled.div<
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
		props.highlight ? 'rgb(75, 199, 64)' : 'rgb(55, 138, 221)'};
	transition: transform ${props => props.timer}ms, background 200ms;
	z-index: ${props => (props.highlight ? 1 : 0)};

	:after {
		position: absolute;
		top: -23px;
		content: '${props => props.value}';
	}
`;

export const Flex = styled.div<{ height: number }>`
	position: relative;
	top: ${props => props.height}px;
`;

export const FormField = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-bottom: 16px;
`;
export const Label = styled.label`
	font-weight: bold;
`;

export const Input = styled.input`
	background-color: transparent;
	border: 2px solid #11151e;
	padding: 8px 8px;
	outline: none;
	border-radius: 4px;
	font-family: 'Nexa';
	color: #fff;
	font-size: 18px;
	transition: 200ms;
	flex-grow: 1;
	&:focus {
		border: 2px solid #67aaed;
	}
	&:hover {
		border: 2px solid #67aaed;
	}
	&::placeholder {
		color: #696e79;
	}
`;

export const Form = styled.form`
	padding: 16px;
	padding-left: 0;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	max-width: 320px;
	width: 100%;
`;

export const Small = styled.p`
	margin: 4px 0;
	font-size: 14px;
	color: #bfc1c7;
`;

export const Title = styled.h1`
	padding: 16px 0;
	margin: 0;
`;

export const NavbarWrapper = styled.div`
	height: 60px;
	border-bottom: 1px solid #11151e;
	display: flex;
	margin-bottom: 32px;
	position: sticky;
	top: 0;
	background-color: #020610;
	z-index: 99999;
`;

export const Container = styled.div`
	max-width: 1860px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	gap: 32px;
`;

export const Row = styled.div<{ marginTop?: string }>`
	display: flex;
	align-items: center;
	margin-top: ${props => props.marginTop || 0};
`;

export const Algolizer = styled.p`
	display: flex;
	gap: 4px;
	font-size: 24px;
	font-weight: bold;
`;

export const Link = styled(NavLink)`
	text-decoration: none;
	margin-left: 16px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	transition: 200ms ease-in-out;
	&:hover {
		color: #fdffff !important;
	}
`;

export const FormError = styled.div`
	background-color: #db323d;
	padding: 8px;
	border-radius: 4px;
	margin: -5px 0 16px 0;
`;
