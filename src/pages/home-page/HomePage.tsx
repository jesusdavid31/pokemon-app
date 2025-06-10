/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

// COMPONENTES
import PokemonCard from './components/PokemonCard';
import DeleteSearchButton from './components/DeleteSearchButton';
import WithoutResults from '../../components/without-results/WithoutResults';

// HOOKS, STORE Y UTILIDADES
import { usePokemons } from './hooks/usePokemons';
import { useSearchPokemon } from './hooks/useSearchPokemon';
import { usePaginationStore } from '../../store/usePaginationStore';

// ESTILOS
import './homePage.scss';

const HomePage = () => {

    // HOOK DE POKEMONS
    const { 
        loading,
        pokemons,
        getPokemons
    } = usePokemons();

    // HOOK DE BÚSQUEDA DE POKEMONS
    const { 
        searching,
        setSearching,
        searchPokemon, 
        searchedPokemon, 
        setSearchedPokemon, 
        lookingForPokemon, 
        setLookingForPokemon,
    } = useSearchPokemon();

    const { page, setPage } = usePaginationStore();

    const [searchValue, setSearchValue] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        if (event.target.value.length >= 3) {
            setShowError(false);
        }else {
            setShowError(true);
        }

        if (event.target.value.length === 0) {
            setSearchedPokemon(null);
            setLookingForPokemon(false);
            setSearching(false);
            setShowError(false);
        }
    };

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {  
            const value = searchValue.trim().toLowerCase();          
            if (value.length >= 3) {
                searchPokemon(value);
            }
        }
    };

    const handleDeleteSearch = () => {
        // Resetear estados al eliminar la búsqueda
        setSearchedPokemon(null);
        setLookingForPokemon(false);
        setSearching(false);
        setSearchValue('');
        setShowError(false);
    };

    const goToPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const goToNextPage = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        getPokemons(page);
    }, [page]);

    return (
        <>
            <div className="home-page-container">
                { loading ? (
                    <div className="spinner">
                        <div className="spinnerin"></div>
                    </div>
                ) : (
                    <div className="pokemon-card-container">
                        <h1 className="title">
                            Pokémon <span className="subtitle">Pokedex</span>
                        </h1>

                        <div className='search-and-delete-container'>
                            <div className="search-container">
                                <input 
                                    name="input-search"
                                    className="input"
                                    type="text"
                                    value={searchValue}
                                    onChange={handleChange}
                                    onKeyDown={handleSearch}
                                    placeholder="Type the name of a Pokémon..."
                                />
                                <svg viewBox="0 0 24 24" className="search__icon"
                                    style={{ cursor: 'pointer' }}
                                    onClick={ () => {
                                        const value = searchValue.trim().toLowerCase();
                                        if (value.length >= 3) {
                                            setShowError(false);
                                            searchPokemon(value);
                                        } else {
                                            setShowError(true);
                                        }
                                    }}
                                >
                                    <g>
                                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                                        </path>
                                    </g>
                                </svg>
                            </div>

                            <div className='delete-button-container'>
                                <DeleteSearchButton onDelete={() => handleDeleteSearch()} />
                            </div>
                        </div>

                        {showError && (
                            <div style={{ width: 'auto', display: 'flex' }}>
                                <p className='error-text'>Please enter at least 3 characters to search for a Pokémon.</p>
                            </div>
                        )}

                        { searching ? (
                            <div className="spinner" style={{ top: '70%' }}>
                                <div className="spinnerin"></div>
                            </div>
                        )  : (
                            <>
                                <div className={`card-grid ${lookingForPokemon ? 'single-column' : ''}`}>
                                    <>
                                        {(!lookingForPokemon && !searchedPokemon) && (
                                            <>
                                                {pokemons.map((pokemon) => (
                                                    <PokemonCard 
                                                        key={pokemon.id}
                                                        pokemon={pokemon}
                                                    />
                                                ))}
                                            </>
                                        )}
                                        {(lookingForPokemon && searchedPokemon) && (
                                            <PokemonCard 
                                                key={searchedPokemon.id}
                                                pokemon={searchedPokemon}
                                            />
                                        )}
                                    </>
                                </div>

                                {lookingForPokemon && !searchedPokemon && (
                                    <div className="without-results" style={{ minWidth: '400px', width: '100%', height: 'auto' }}>
                                        <div className='without-results__title'>
                                            <h2>Pokémon not found</h2>
                                            <p>Please try searching for another Pokémon.</p>
                                        </div>
                                        <WithoutResults />
                                    </div>
                                )}
                            </>
                        )}

                        {!lookingForPokemon && (
                            <div className='pagination-buttons'>
                                { page > 1 && (
                                    <button onClick={() => goToPreviousPage()} style={{ background: "#ef5350" }}>
                                        <span className="button-text">Previous page</span>
                                        <i className="fa-solid fa-arrow-left"></i>
                                    </button>
                                )}
                                <button onClick={() => goToNextPage()} style={{ background: "#ef5350" }}>
                                    <span className="button-text">Next page</span>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );

}

export default HomePage;