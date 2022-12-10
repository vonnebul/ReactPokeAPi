import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'
import pokemon from '../img/logo.png'
import '../style/navigation.css'

// Définition du render Navigation.
// Celui-ci gère la barre de navigation.
function Navigation() {
    return (
        <>
        {/* Insertion du <nav>. */}
        <Navbar className="red" expand="lg">
            {/* Conteneurisation dans un <div>. */}
            <Container>
                {/* Insertion du Logo d'accueil avec comme route : "/" */}
                <Navbar.Brand href="/"><img src={pokemon} height="100" alt=""/></Navbar.Brand>

                {/* Insertion d'un toggle navbar, afin que la navigation soit compatible sur mobile. */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Définition du menu de navigation. */}
                    <Nav className="me-auto">
                        {/* route "/" */}
                        <LinkContainer to="/">
                            <Nav.Link className='white'><span className="white">Liste Pokémons</span></Nav.Link>
                        </LinkContainer>

                        {/* route "/MonPokedex" */}
                        <LinkContainer to="/MonPokedex">
                            <Nav.Link className="white"><span className="white">Mon pokédex</span></Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}

export default Navigation;
