/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Interfaces
import type { Pokemon } from '../../home-page/interfaces/pokemon.interface';

import Swal from 'sweetalert2';

const typeColorMap: Record<string, string> = {
    grass: '#66cc66',
    fire: '#ff9933',
    water: '#66ccff',
    bug: '#99cc33',
    poison: '#8a2be2',
    flying: '#99ccff',
    electric: '#ffcc33',
    psychic: '#ff66cc',
    rock: '#b8a038',
    ground: '#e0c068',
    fairy: '#ee99ac',
    ice: '#66ffff',
    dragon: '#7038f8',
    dark: '#705848',
    ghost: '#705898',
    fighting: '#c03028',
    steel: '#b8b8d0',
    normal: '#a8a878',
};

export const usePokemonDetail = () => {

    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);
    const [pokemon, setPokemon] = useState<any>(null);
    const [evolutions, setEvolutions] = useState<any[]>([]);

    const getPokemon = async () => {

        try {

            setLoading(true);
            
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

            if (!res.ok) throw new Error('Error fetching Pokémon');

            const data: Pokemon = await res.json();
            const typeList = data.types.map((t: any) => t.type.name);
            const primaryType = typeList[0];
            let color = typeColorMap[primaryType] || '#ccc';

            if ( color === '#a8a878' && typeList.length > 1 ) {
                // Si el tipo es "#ccc" pero hay más de un tipo, usamos el segundo tipo para determinar el color
                color = typeColorMap[typeList[1]];
            }

            setPokemon({
                id: `#${data.id.toString().padStart(3, '0')}`,
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                img: data.sprites?.other?.['official-artwork']?.front_default,
                weight: `${(data.weight / 10).toFixed(1)} kg`,
                height: `${(data.height / 10).toFixed(1)} m`,
                types: typeList,
                color,
                stats: data.stats.map((s: any) => ({
                    name: s.stat.name,
                    value: s.base_stat,
                })),
                abilities: data.abilities.map((a: any) => a.ability.name),
            });

             // === Obtener cadena de evolución ===
            const speciesRes = await fetch(data.species.url);
            const speciesData = await speciesRes.json();

            const evolutionRes = await fetch(speciesData.evolution_chain.url);
            const evolutionData = await evolutionRes.json();

            const chain: string[] = [];
            const collectEvolutions = (node: any) => {
                if (!node) return;
                chain.push(node.species.name);
                node.evolves_to.forEach((evo: any) => collectEvolutions(evo));
            };

            collectEvolutions(evolutionData.chain);

            // Obtener imágenes para cada evolución
            const evolutionDetails = await Promise.all(
                chain.map(async (pokeName) => {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
                    const data = await res.json();
                    return {
                        name: data.name,
                        img: data.sprites?.other?.['official-artwork']?.front_default,
                    };
                })
            );

            setEvolutions(evolutionDetails);

        } catch (error: any) {
            console.error('Error fetching Pokémon details:', error);
            Swal.fire('Error', 'Error fetching Pokémon details', 'error');
            navigate('/');
        } finally {
            setLoading(false);
        }

    }

    return { 
        name,
        loading,
        pokemon, 
        evolutions,
        getPokemon,
    };
};