import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

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
    return (
        <>
        {
            Chargement ? <h1>Chargement</h1> :
            pokeData.map((item) => {
                    return (
                            <div key={item.id} style={{border: "1px solid black", marginLeft: "40%", marginRight: "40%"}}>
                                <p>numéro pokedex: {item.id}</p>
                                <img src={item.sprites.front_default} alt="" />
                                <p>{item.name}</p>
                            </div>
                    )
                })
        }
        <div>
                        { nextUrl && <button onClick={()=>{
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next</button>}

                    </div>
        </>
    )
}
export default MesPokemons;