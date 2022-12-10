import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import TypePokemon from './TypePokemon';
import "../style/MonPokedex.css"

// Définition du render MonPokedex.
// Celui-ci gère la liste des Pokémon présent dans le Pokédex.
const MonPokedex = () => {
    const url = "https://pokeapi.co/api/v2/pokemon/";
    const [pokeRecherche, setPokeRecherche] = useState();
    const [affichePokemon, setAffichePokemon] = useState(null);
    const [storagePokemon, setStoragePokemon] = useState();

    const recherche = async e => {
        e.preventDefault();

        setAffichePokemon(null);
        const res = await axios.get(url + pokeRecherche);
        setAffichePokemon(res.data);
    };

    const ajout = async e => {
        e.preventDefault();

        if (localStorage.getItem('MonPokedex') === null) {
            localStorage.setItem('MonPokedex', JSON.stringify([]));
        }

        let test = JSON.parse(localStorage.getItem('MonPokedex'));
        test.push(affichePokemon);
        localStorage.setItem('MonPokedex', JSON.stringify(test));
        setAffichePokemon(null);
        setStoragePokemon(JSON.parse(localStorage.getItem('MonPokedex')));
    };

    const deletePokedex = e => {
        e.preventDefault();

        localStorage.removeItem('MonPokedex');
        setStoragePokemon(JSON.parse(localStorage.getItem('MonPokedex')));
    };

    const deleteFromPokedex = e => {
        e.preventDefault();

        if (localStorage.getItem('MonPokedex') === null) {
            localStorage.setItem('MonPokedex', JSON.stringify([]));
        }

        const value = e.target[0].value,
              card = e.target.parentElement.parentElement.parentElement.parentElement,
              item = JSON.parse(localStorage.getItem('MonPokedex'));

        let index = -1;
        for (let i = 0; i < item.length; i++) {
            if (item[i].id == value) {
                index = i;
                break;
            }
        }

        // Si l'index est trouvé, alors nous supprimons la card du localStorage.
        if (-1 < index) {
            item.splice(index, 1);
            localStorage.setItem('MonPokedex', JSON.stringify(item));
        }


        // Suppression de la card.
        card.parentElement.removeChild(card);
    };


    useEffect(() => {
        setStoragePokemon(JSON.parse(localStorage.getItem('MonPokedex')));
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-4">
                <Form className="espacement" onSubmit={recherche}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Entrez le pokemon a rechercher</Form.Label>
                    <Form.Control type="rechercher" placeholder="ex: ditto, pikachu..." onChange={(e)=> setPokeRecherche(e.target.value)}/>
                  </Form.Group>
                  <Button variant="outline-success" type="submit" className="search">
                    Rechercher
                  </Button>
                </Form>
                { affichePokemon === null || affichePokemon === "" ? 
                <>
                  <h5>Aucun Pokemon Sélectionné</h5>
                </>
                : 
                <>
                <Card>
                      <Card.Img variant="top" src={affichePokemon.sprites.front_default} />
                      <Card.Body>
                        <Card.Title>{affichePokemon.name}</Card.Title>
                        <Card.Text>
                          <p>n°{affichePokemon.id}</p>
                          <TypePokemon types={affichePokemon.types}/>
                        </Card.Text>
                        <Form className="espacement" onSubmit={ajout}>
                          <Button variant="outline-primary" type="submit">
                            Ajouter au pokédex
                          </Button>
                        </Form>
                      </Card.Body>
                  </Card>
                </>}
                </div>
                <div className="col-8 auto">
                {storagePokemon == null ? <h2 className="emptypoke">Votre Pokédex est vide</h2> :
                  <>
                   <div className='row'>
                    {storagePokemon.map(pokemon => (
                      <div className='col-3'>
                      <Card>
                          <Card.Img variant="top" src={pokemon.sprites.front_default} />
                          <Card.Body>
                            <Card.Title>{pokemon.name}</Card.Title>
                            <Card.Text>
                              <p>n°{pokemon.id}</p>
                              <TypePokemon types={pokemon.types}/>
                                <Form className="espacement" onSubmit={deleteFromPokedex}>
                                    <Button variant="outline-primary" type="submit" value={pokemon.id}>
                                        libérer
                                    </Button>
                                </Form>
                            </Card.Text>
                          </Card.Body>
                      </Card>
                    </div>
                    ))}
                    </div>

                    <div className='row mt-3'>
                    <Form className="espacement" onSubmit={deletePokedex}>
                      <Button variant="outline-danger" type="submit" className="wipepokedex">
                            vider le pokédex
                      </Button>
                      </Form>
                    </div>
                    </>
                }
                </div>
            </div>
        </div>
    );
}

export default MonPokedex;
