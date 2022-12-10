import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import TypePokemon from "./TypePokemon";
import Card from 'react-bootstrap/Card';
import "../style/MesPokemons.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MesPokemons=()=>{
    /* 
    je crée mes states: 
    La première va stocker mes données de pokémons
    La seconde vérifié que l'on a bien récupéré les données avant de les afficher
    La troisième est pour l'url du site
    La dernière est pour afficher l'url des 20 prochains pokémons
    */
    const [pokeData,setPokeData]=useState([]);
    const [Chargement,setChargement]=useState(true);
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl,setNextUrl]=useState();
    const [previousUrl, setPreviousUrl]= useState()

    // on lance la fonction getAllPokemon qui se relancera à chaque fois que l'url changera 
    useEffect(()=>{
        getAllPokemon();
    },[url])

    /* getAllPokemon est une fonction asynchrone qui va récupérer les infos de tous les pokémons
    on y récupérera le data.results qui est le résultats des pokémons
    ET data.next qui donnera les autres pokémons
    Bien sur vu que l'on récupère les données le chargement passera de true à false
    */
    const getAllPokemon=async()=>{
        setChargement(true)
        const res=await axios.get(url);
        console.log(res)
        setPreviousUrl(res.data.previous)
        setNextUrl(res.data.next);
        getPokemon(res.data.results)
        setChargement(false)
    }

    /*
        GetPokemon va permettre de récupérer les infos d'un seul pokémon
        mais il aura besoin des résultats de getAllPokemon pour avoir le paramètre nécessaire.
        La fonction boucle sur le pokémon et va récupérer les informations précise du pokémon (image par exemple)
        ensuite on garde les données des pokémon dans notre setPokeData en prenant bien soin de pas supprimer
        les anciens states. Et ensuite on ordonne (non obligatoire) pour les affichers dans l'ordre
    */
    const getPokemon=async(res)=>{
       res.map(async(item)=>{
          const result=await axios.get(item.url)
          setPokeData(state=>{
              state=[...state,result.data]
              state.sort((a,b)=>a.id>b.id?1:-1)
              return state;
          })
       })   
    }

    /* 
        tips:ici tout a été mis dans une seule page, mais il aurait été plus optimisé
        de mettre dans un composant enfant, les informations des pokémons, qui auraient pu être
        réutilisé plus tard.
    */

    const ajout = async(e)=>{
            e.preventDefault()
            let res = await axios.get("https://pokeapi.co/api/v2/pokemon/"+e.target[0].value)
            if(localStorage.getItem('MonPokedex')==null){
                localStorage.setItem('MonPokedex', JSON.stringify([]))
            }
            let test = JSON.parse(localStorage.getItem('MonPokedex'))
            test.push(res.data)
            localStorage.setItem('MonPokedex', JSON.stringify(test))
    }
    return (
        <>
        {
            Chargement ? <h1>Chargement</h1> :
            <div className="container espacement">
                <div className="row">


            {pokeData.map((item) => {
                    return (     
                        <div className="col-3">                 
                            <div key={item.id}>
                                <Card className="decalage">
                                    <Card.Img variant="top" src={item.sprites.front_default} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                        <p>n°{item.id}</p>
                                        <TypePokemon types={item.types}/>
                                        <Form className="espacement" onSubmit={ajout}>
                                            <Button variant="outline-primary" type="submit" value={item.id}>
                                                Ajouter au pokédex
                                            </Button>
                                        </Form>
                                        </Card.Text>
                                    </Card.Body>
                                    
                                    
                                </Card>
                                </div> 
                            </div>
                    )
                })}
                </div>
                <div className="row">
                <div className="col-6">
                { previousUrl && <button className="long" onClick={()=>{
                            setPokeData([]) 
                            setUrl(previousUrl)
                        }}>Précédent</button>}
                        </div>
                    <div className="col-6">
                { nextUrl && <button className="long" onClick={()=>{
                            setPokeData([]) 
                            setUrl(nextUrl)
                        }}>Suivant</button>}
                        </div>
                </div>
            </div>
        }
        <div>
                       

                    </div>
        </>
    )
}
export default MesPokemons;