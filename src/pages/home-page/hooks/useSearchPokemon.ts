/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/home/hooks/useSearchPokemon.ts
import { useState } from 'react';

// INTERFACES
import type { Pokemon } from '../interfaces/pokemon.interface';
import { typeColorMap } from '../interfaces/pokemon-colors.interface';

interface SearchedPokemon {
    id: string;
    name: string;
    img: string | undefined;
    weight: string;
    height: string;
    type: string;
    color: string;
}

export const useSearchPokemon = () => {

    const [searchedPokemon, setSearchedPokemon] = useState<SearchedPokemon | null>(null);
    const [searching, setSearching] = useState<boolean>(false);
    const [lookingForPokemon, setLookingForPokemon] = useState<boolean>(false);

    const searchPokemon = async (name: string) => {

        setLookingForPokemon(true);

        if (name.length < 3) {
            setSearchedPokemon(null);
            return;
        }

        try {

            setSearching(true);

            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

            if (!res.ok) {
                setSearchedPokemon(null);
                return;
            }

            const data: Pokemon = await res.json();

             // con typeList creamos una lista de tipos (ej: ["fire", "flying"]) a partir de los datos del Pokémon
            const typeList = data.types.map((t: any) => t.type.name);
            // tomamos el primer tipo de la lista (ej: "fire") para determinar el color
            const primaryType = typeList[0];
            // Si el tipo principal (como "fire") existe en el typeColorMap, toma su valor (ej: "fire")
            // Si no existe, usa "normal" (por si el tipo no está mapeado aún)
            let color = typeColorMap[primaryType] || 'normal';

            if ( color === 'normal' && typeList.length > 1 ) {
                // Si el tipo es "normal" pero hay más de un tipo, usamos el segundo tipo para determinar el color
                color = typeList[1];
            }

            setSearchedPokemon({
                id: `#${data.id.toString().padStart(3, '0')}`,
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                img: data.sprites?.other?.['official-artwork']?.front_default,
                weight: `${(data.weight / 10).toFixed(1)} kg`,
                height: `${(data.height / 10).toFixed(1)} m`,
                type: typeList.join(' / '),
                color,
            });

        } catch (err) {
            setSearchedPokemon(null);
            console.error('Error fetching Pokémon:', err);
        } finally {
            setSearching(false);
        }

    };

    return {
        searchPokemon,
        searchedPokemon,
        setSearchedPokemon,
        lookingForPokemon,
        setLookingForPokemon,
        searching,
        setSearching
    };
};
