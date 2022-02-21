import { Btn } from './styles';

const Button: React.FC<
	ButtonProps & Omit<React.HTMLProps<HTMLButtonElement>, 'as'>
> = ({ onClick, variant, type, children, ...rest }) => {
	const props =
		variant === 'primary'
			? { background: '#67AAED', hoverBackground: '#378add' }
			: variant === 'secondary'
			? { background: '#696e79', hoverBackground: '#565c69' }
			: variant === 'success'
			? { background: '#6FD666', hoverBackground: '#4bc740' }
			: { background: '#E33D49', hoverBackground: '#db323d' };
	return (
		<Btn {...rest} {...props} type={type} onClick={onClick}>
			{children}
		</Btn>
	);
};

export default Button;
