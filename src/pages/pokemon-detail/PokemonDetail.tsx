/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// COMPONENTES
import AnimatedButton from '../../components/animated-button/AnimatedButton';
import StatBar from './components/StatBar';

// HOOKS Y UTILIDADES
import { usePokemonDetail } from './hooks/usePokemonDetail';

import './pokemonDetail.scss';

const PokemonDetail = () => {

    // HOOK DE DETALLES DEL POKEMON
    const { 
        name,
        loading,
        pokemon,
        getPokemon,
        evolutions
    } = usePokemonDetail();

    const navigate = useNavigate();

    const formatAbility = (ab: string) => {
        // Convierte el nombre de la habilidad a formato "Title Case" (ej: "overgrow" -> "Overgrow")
        return ab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    useEffect(() => {
        getPokemon();
    }, [name]);

    return (
        <>
            { loading ? (
                <div className="pokemon-detail">
                    <div className="spinner">
                        <div className="spinnerin"></div>
                    </div>
                </div>
            )  :  (
                <>
                    { pokemon && (
                        <div className="pokemon-detail" style={{ background: `linear-gradient(145deg, ${pokemon.color},rgb(54, 54, 54))` }}>
                            {/* From Uiverse.io by Jedi-hongbin */}
                            <button className="animated-button" onClick={() => navigate('/home-page')}>
                                <AnimatedButton 
                                    text='Back' 
                                    icon={
                                        <path
                                            d="M7.8284 11H20V13H7.8284L13.1924 18.364L11.7782 19.7782L4 12L11.7782 4.22183L13.1924 5.63604L7.8284 11Z"
                                        />
                                    }
                                />
                            </button>

                            <div className="card">

                                <img src={pokemon.img} alt={pokemon.name} className="pokemon-img" />
                                <h1>{pokemon.name}</h1>
                                <span className="card-id">ID: {pokemon.id}</span>
                                <p>Height: {pokemon.height}</p>
                                <p>Weight: {pokemon.weight}</p>
                                <p>Types: {pokemon.types.join(' / ')}</p>

                                <div className="stats">
                                    <h2>Stats</h2>
                                    {pokemon.stats.map((stat: any) => (
                                        <div key={stat.name} className="stat-item">
                                            <StatBar 
                                                label={stat.name}
                                                value={stat.value}
                                                color={pokemon.color}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="abilities">
                                    <h2>Abilities</h2>
                                    <ul>
                                        {pokemon.abilities.map((ab: string) => (
                                            <li key={ab}>{formatAbility(ab)}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="evolutions">
                                    <h2>Evolution Chain</h2>
                                    <div className="evolution-chain">
                                        {evolutions.map((evo) => (
                                            <div key={evo.name} className="evo-card" onClick={() => navigate(`/pokemon/${evo.name}`)}>
                                                <img src={evo.img} alt={evo.name} />
                                                <p>{evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );

}

export default PokemonDetail;