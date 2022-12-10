import "../style/TypePoke.css"

function TypePokemon(props) {
    let types = props.types
    return (
      <>
        {types.map((type)=>(
            <>
             <span className={type.type.name}>{type.type.name} </span>
            </>
        ))}
      </>
    );
  }
  
  export default TypePokemon;