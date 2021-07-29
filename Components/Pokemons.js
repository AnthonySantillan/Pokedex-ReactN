import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ProgressBarAndroid,
} from 'react-native';

const Pokemons = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [searchfeild, setSearchfeild] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=25')
      .then(response => response.json())
      .then(pokemons => setPokemons(pokemons.results));
  };

  const getNumber = num => {
    num = num.toString();
    const paddednum = num.padStart(3, '0');
    return paddednum;
  };

  const getRandomeValue = () => {
    let value = Math.random();
    value = value.toString();
    value = Number(
      value
        .split('')
        .splice(0, 3)
        .join(''),
    );
    return value;
  };

  return (
    <View style={{ backgroundColor: 'deepskyblue' }}>
      <TouchableOpacity
        style={styles.pokeball}
        activeOpacity={0.5}>
        <Image
          source={require('../assests/pokeball2.png')}
          style={{ width: 45, height: 45 }}
        />
      </TouchableOpacity>

      <View style={styles.searchCont}>
        <Text style={styles.titulo}>Pokedex</Text>
        <Text style={styles.subtitulo}>Encuentra a tu pokemon</Text>
        <TextInput
          style={styles.searchfeild}
          placeholder="Buscalo aqui"
          onChangeText={value => setSearchfeild(value)}
          value={searchfeild}
        />
      </View>

      <ScrollView style={styles.pokeWrapper}>
        <View style={styles.container}>
          {pokemons
            .filter(pokemon =>
              pokemon.name.toLowerCase().includes(searchfeild.toLowerCase())
            )
            .map((pokemon, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={index}
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('Details', {
                      pokemon: pokemon.name,
                      image: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.name
                        }.png`,
                    })
                  }>
                  <View style={styles.CpCont}>
                    <Text style={{ color: 'grey', fontSize: 50, top: 5 }}>CP</Text>
                    <Text
                      style={{ fontSize: 50, color: 'darkgreen', marginLeft: 3 }}>
                      {getRandomeValue() * 100}
                    </Text>
                  </View>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name
                        }.png`,
                    }}
                  />
                  <Text style={styles.nombre}>{pokemon.name}</Text>
                  <ProgressBarAndroid
                    styleAttr="Horizontal"
                    style={{ width: '90%' }}
                    indeterminate={false}
                    color="#63CB6C"
                    animating={true}
                    progress={1}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Pokemons;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  pokeWrapper: {
    backgroundColor: 'dodgerblue',
    marginHorizontal: 7,
    borderRadius: 20,
    marginTop: 0,
    elevation: 1,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: 100,
    margin: 5,
    marginHorizontal: 5,
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  pokeball: {
    position: 'absolute',
    right: '45%',
    bottom: 0,
    zIndex: 1,
  },
  CpCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    fontSize: 100,
    position: 'relative',
  },
  nombre: {
    fontSize: 50,
    color: 'darkgrey',
  },
  searchfeild: {
    margin: 50,
    height: 100,
    backgroundColor: 'darkgrey',
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontFamily: 'Robot',
    borderRadius: 20,
  },
  titulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: 50,
    marginTop: 10,
  },
  subtitulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  }
});
