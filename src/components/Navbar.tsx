import { Algolizer, Container, Link, NavbarWrapper, Row } from './styles';

const isActive = ({ isActive }: { isActive: boolean }) => {
	return {
		borderTop: `4px solid ${isActive ? '#67aaed' : 'transparent'}`,
		color: isActive ? '#fdffff' : '#696e79',
	};
};

const Navbar: React.FC = () => {
	return (
		<NavbarWrapper>
			<Container>
				<Row marginTop="4px">
					<Algolizer>Algolizer</Algolizer>
				</Row>
				<Row>
					<Link to="/" style={isActive}>
						Metoda Bulelor
					</Link>
					<Link to="/metoda-insertiei" style={isActive}>
						Metoda Insertiei
					</Link>
					<Link to="/metoda-selectiei" style={isActive}>
						Metoda Selectiei
					</Link>
					<Link to="/algoritmul-lui-lee" style={isActive}>
						Algoritmul lui Lee
					</Link>
				</Row>
			</Container>
		</NavbarWrapper>
	);
};

export default Navbar;
