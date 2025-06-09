import { Link } from 'react-router-dom';

// COMPONENTES
import AnimatedButton from '../../../components/animated-button/AnimatedButton';

interface Pokemon {
    id: string;
    name: string;
    img: string | undefined;
    weight: string;
    height: string;
    type: string;
    color: string;
}

interface PokemonCardProps {
    pokemon: Pokemon;
}

const PokemonCard = ( { pokemon }: PokemonCardProps ) => {

    return (
        <div className={`card ${pokemon.color}`}>
            <span className="card-id">{pokemon.id}</span>
            <div className="circle-bg">
                <img src={pokemon.img} alt={pokemon.name} />
            </div>
            <h2>{pokemon.name}</h2>
            <p>Weight: {pokemon.weight}</p>
            <p>Height: {pokemon.height}</p>
            <p className="type">Type: <span>{pokemon.type}</span></p>
            <Link to={`/pokemon/${pokemon.name}`} className="animated-button">
                <AnimatedButton 
                    text='View Details'
                    icon={
                        <path
                            d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                        ></path>
                    }
                />
            </Link>
        </div>
    );

}

export default PokemonCard;