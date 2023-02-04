import Image from 'next/image'
import React from 'react'
import Layout from '../components/Layout'
import left from "../../public/Left.png"
import Logo from '../components/Logo'
import Link from 'next/link'
const pokDetails = ({poko,btn_styles}) => {
  return (
    <Layout title = {"poko"}>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-1'>
            {/* left side image */}
            <Image src={left}></Image>
          </div>
          <div className='col-md-10 col-12'>
          <div className="logo_div"> <Logo/></div>
        {
            poko.map((pokemon,index)=>{
                return(
                <div className='row justify-content-center align-items-center'>
                    <div className='col-md-4 col-12 '>
                       <div className='base_info'>
                       <h2 className='pok_name'>{pokemon.name} #{pokemon.number}</h2>
                        <p className='desc'>I couldn't find the description keywords to perform  query for description. So i have written this line hardcoded</p>
                       </div>
                       <div className='border-wrap'>
                        <div className=' pok_left_info d-flex justify-content-around'>
                            <div>
                            <h4 className='right-h4'> Height</h4>
                            <strong className='details-board'>{pokemon.height.maximum}</strong>
                                <h4 className='right-h4'>Weight</h4>
                            <strong className='details-board'>{pokemon.weight.maximum}</strong>
                     
                            </div>
                            <div>
                            <h4 className='right-h4'>Category</h4>
                            <strong className='details-board'>{pokemon.classification}</strong>
                            <h4 className='right-h4'>Abilities</h4>
                            <strong className='details-board'>{pokemon.attacks.special[0].name}
                            </strong>
                            <br/>
                            <strong className='details-board'> {pokemon.attacks.special[1].name==undefined?"":pokemon.attacks.special[1].name}</strong>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 col-12 main_image '>
                        <img className='img-fluid ' src={pokemon.image}></img>
                    </div>
                    <div className='wrapper col-md-4 col-12'>
                        <div className='type'>
                            <h4 className='right-h4'>Type</h4>
                            {pokemon.types.map((val,index)=>{
                      return(
                         
                          <button key={index} className="btn  me-3" style={{backgroundColor:btn_styles[val.toLowerCase()],color:"white"}}> {val}</button>
                         )
                    })}
                        </div>
                        <div className='weakness'>
                            <h4 className='right-h4'>weaknesses</h4>
                            {
                                pokemon.weaknesses.map((value,index)=>{
                                    return(
                                        <buttton className="btn me-2" key={index} style={{backgroundColor:btn_styles[value.toLowerCase()],color:"white"}}>{value}</buttton>
                                    )
                                })
                            }
                        </div>
                        {/* stats progress bar */}
                        <div className='stats'>
    
                        <h4 className='right-h4'>Stats</h4>
                        <small>HP</small>
                          <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{width:(Math.floor(pokemon.maxHP/10)).toString()+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <small>Attacks</small>
                          <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{width:(pokemon.attacks.fast[0].damage).toString()+"%"}} aria-valuenow={{width:(pokemon.attacks.fast[0].damage)}} aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <small>Special Attacks</small>
                          <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{width:(pokemon.attacks.special[0].damage).toString()+"%"}} aria-valuenow={{width:(pokemon.attacks.special[0].damage)}} aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <small>Defence</small>
                          <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{width:(pokemon.attacks.special[1].damage).toString()+"%"}} aria-valuenow={{width:(pokemon.attacks.special[1].damage)}} aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <small>Speed</small>
                          <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{width:(Math.max(pokemon.fleeRate*1000)).toString()+"%"}} aria-valuenow={{width:(pokemon.attacks.special[1].damage)}} aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                    </div> 
                    </div>
                )
            })
        }
        {/* //back to homepage button */}
        <div className='text-center mt-3'>
          <Link href={"/"} className='back'> <i class="fa-solid fa-house"></i> Back to Homepage</Link>
          </div>
        </div>
          <div className='col-md-1'>
            <Image src={left}></Image>
          </div>
          
        </div>
      </div>
    </Layout>
  )
}
//getting server side porps and pokemon data
export async function getServerSideProps({query}) {
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
            attacks {
              fast {
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
        //single pokemon 
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
          const pokemons = data_all.data.pokemons
          let ourhero = pokemons.filter((pok)=>pok.number==query.pok_id)
          //console.log("here is our hero",ourhero)
        return{
            props:{
                query,
                poko:ourhero,
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
        console.log(eror)
    }
}

export default pokDetails

