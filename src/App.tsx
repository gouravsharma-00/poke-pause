import { useState } from 'react'
import './App.css'

function App() {
  const [fact, setFact] = useState('')
  const [pokemonImage, setPokemonImage] = useState('')

  const fetchPokemonFact = async () => {
    const pokemonId = Math.floor(Math.random() * 151) + 1 // 1 to 151

    try {
      const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
      const speciesData = await speciesRes.json()

      const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      const pokemonData = await pokemonRes.json()

      const flavor = speciesData.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'en'
      )

      setFact(`${speciesData.name.toUpperCase()}: ${flavor?.flavor_text.replace(/\f/g, ' ')}`)
      setPokemonImage(pokemonData.sprites.front_default)
    } catch (err) {
      setFact('Failed to fetch Pokémon info. Try again.')
      setPokemonImage('')
    }
  }

  return (
    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
      {
      !pokemonImage && !fact && (
        <>
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="Pokémon Icon"
            className="logo"
            style={{ width: 80, height: 80 }}
          />
          <h1 style={{ marginBottom: '1rem' }}>Pokémon Facts</h1>
        </>
      )}

      <button onClick={fetchPokemonFact} style={{ marginBottom: '1.5rem' }}>
        {'Get Random Pokémon Fact'}
      </button>

      {pokemonImage && (
        <img
          src={pokemonImage}
          alt="Pokémon"
          style={{ margin: '1rem auto', width: 96, height: 96 }}
        />
      )}

      {fact && (
        <p style={{ fontSize: '0.85rem', marginTop: '1rem', maxWidth: 300, marginInline: 'auto' }}>
          {fact}
        </p>
      )}
    </div>
  )
}

export default App