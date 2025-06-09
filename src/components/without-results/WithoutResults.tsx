/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';

import './withoutResults.scss';

const pokemons = [
    4,   // Charmander
    7,   // Squirtle
    1,   // Bulbasaur
    25,  // Pikachu
    39,  // Jigglypuff
    133, // Eevee
    150, // Mewtwo
    94,  // Gengar
    143, // Snorlax
    6    // Charizard
];

const colors = [
    '142, 249, 252',
    '142, 252, 204',
    '142, 252, 157',
    '215, 252, 142',
    '252, 252, 142',
    '252, 208, 142',
    '252, 142, 142',
    '252, 142, 239',
    '204, 142, 252',
    '142, 202, 252'
];

const WithoutResults = () => {

    return (
        <div className="pokemon-carousel-wrapper">
            {/* From Uiverse.io by ilkhoeri */}
            <div
                className="pokemon-carousel-inner"
                style={{ ['--quantity' as any]: pokemons.length } as React.CSSProperties}
            >
                {pokemons.map((id, index) => (
                    <div
                        className="pokemon-carousel-card"
                        key={id}
                        style={{ ['--index']: index, ['--color-card']: colors[index] } as React.CSSProperties}
                    >
                        <div className="pokemon-carousel-img">
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                            alt={`pokemon-${id}`}
                        />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default WithoutResults;