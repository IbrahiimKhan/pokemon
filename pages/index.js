import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Layout from "./components/Layout"
import Logo from "./components/Logo"
import ComicsText from "./components/ComicsText"
const index = ({btn_styles,pokemonData}) => {
  const router = useRouter()
  //console.log("my pokemons",pokemonData.data.pokemons)
  const pokemons = pokemonData.data.pokemons
  console.log("here is all pokemons",pokemons)
//filtering our exact single pokemon's data
  let singlepok = pokemons.filter((pok,i)=>pok.number =="001")
  // console.log("our pok",singlepok)
  const [pokemonArr, setPokemonArr] = useState(pokemons)
  // console.log("newpok",pokemonArr)
  return (
    <Layout>
      <div className="top-content">
        <div className="overlay">
      <div className="container ">
       <div className="logo_div"> <Logo/></div>
        <div className="row responsive_div " >
     {
      pokemonArr.map((pokemon,index)=>{
          return(

            <div className="col-md-2 responsive_col col-12" key={pokemon.number}>
                <div className="card" onClick={(e)=>{
                    router.push(`./allpokemon/${pokemon.number}`)
                }}>
                  <p className="top_number">#{pokemon.number}</p>

                  <img style={{cursor:"pointer"}} className="card-img-top" src={pokemon.image} alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">{pokemon.name}</h5>
                    {/* styling button as types */}
                    {pokemon.types.map((val,index)=>{
                      return(
                         <Link key={index} href="/">
                          <button className="btn btn-primary me-2 prim_btn" style={{backgroundColor:btn_styles[val.toLowerCase()]}}> {val}</button>
                         </Link>)
                    })}   
             </div>
            </div>
            </div>
          )
      })
     }
      </div>
      </div>
      </div>
      </div>
      <ComicsText/>
    </Layout>
  )
}
export default index
// function to fetch pokeman data
export async function getStaticProps(){
  try { 
    const gqlQuery = `query pokemons($first: Int!) {
      pokemons(first: $first) {
          number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        special {
          name
          damage
        }
      }
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
  
      }
    }`; 
    const gqlVariables = {
      first: 12,
      offset: 1,
    };
    const res = await fetch('https://graphql-pokemon2.vercel.app/', {
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: gqlQuery,
        variables: gqlVariables,
      }),
      method: 'POST',
    })
    const data_all = await res.json()
    return {
      props:{
        pokemonData:data_all,
        // btn style color
        btn_styles: {
          normal: "#A8A77A",
          fire: "#EE8130",
          water: "#6390F0",
          electric: "#F7D02C",
          grass: "#7AC74C",
          ice: "#96D9D6",
          fighting: "#C22E28",
          poison: "#A33EA1",
          ground: "#E2BF65",
          flying: "#A98FF3",
          psychic: "#F95587",
          bug: "#A6B91A",
          rock: "#B6A136",
          ghost: "#735797",
          dragon: "#6F35FC",
          dark: "#705746",
          steel: "#B7B7CE",
          fairy: "#D685AD",
        },
      }
    }
  } catch (error) {
    console.log(error)
  }
}