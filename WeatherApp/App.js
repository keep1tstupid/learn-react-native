import React, {Component, useState, useEffect} from 'react';
import moment from 'moment';
import {
  Container,
  Form,
  Item,
  Header,
  Title,
  Input,
  Button,
  Left,
  Right,
  Body,
  Card,
  CardItem,
  Icon,
  Text,
} from 'native-base';
import {ScrollView} from 'react-native';
import Dialog from 'react-native-dialog';
import useAxios from 'axios-hooks';
import AsyncStorage from '@react-native-community/async-storage';

const WeatherForecast = (params) => {
  const city = params.city;
  const API_KEY = 'f84b8ea2b6333a046a72c49abe8d1c4c';
  const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

  const [{data, loading, error}, refetch] = useAxios(
    URL + city + '&appid=' + API_KEY + '&units=metric',
  );

  const refreshForecast = () => {
    refetch();
  };

  const deleteCity = () => {
    params.deleteCity(params.id);
  };

  const getWeatherIcon = (weatherState) => {
    console.log(weatherState);
    const mapping = {
      Clouds: 'cloud',
      Clear: 'sun',
      Rain: 'rain',
    };

    return (
      <Icon
        type="FontAwesome5"
        fontSize={30}
        color="#000"
        name={mapping[weatherState]}
      />
    );
  };

  console.log(city);
  console.log(data);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error!</Text>;
  }

  return (
    <Card>
      <CardItem header bordered>
        <Text>{city}</Text>
      </CardItem>
      <CardItem>
        <Text style={{fontSize: 15, color: 'grey'}}>
          Updated at: {moment().format('DD.MM.YYYY hh:mm:ss')}
        </Text>
      </CardItem>
      <CardItem>
        <Left>
          <Body>
            <Text>Main: {data.weather[0].main}</Text>
            <Text>Temp: {data.main.temp} °C</Text>
            <Text>Wind: {data.wind.speed} m/s</Text>
          </Body>
        </Left>
        <Right>
          <Body>{getWeatherIcon(data.weather[0].main)}</Body>
        </Right>
      </CardItem>
      <CardItem footer bordered>
        <Left>
          <Button transparent light onPress={deleteCity}>
            <Text>-del-</Text>
          </Button>
        </Left>
        <Right>
          <Button transparent light onPress={refreshForecast}>
            <Text>-refresh-</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cityName, setCityName] = useState('');
  const [cities, setCities] = useState([]);

  const openDialog = () => {
    setModalVisible(true);
  };

  const addCity = () => {
    setCities([...cities, {id: cities.length, name: cityName}]);
    setModalVisible(false);
  };

  const cancelCity = () => {
    setModalVisible(false);
  };

  const deleteCity = (id) => {
    let filteredArray = cities.filter((city) => city.id !== id);
    setCities(filteredArray);
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cities', JSON.stringify(cities));
    } catch (e) {
      // saving error
      console.log('Cities saving error!');
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cities');
      if (value !== null) {
        setCities(JSON.parse(value));
      }
    } catch (e) {
      console.log('Cities loading error!');
    }
  };

  // load cities when app starts
  useEffect(() => {
    getData();
  }, []);

  // save cities if cities state changes
  useEffect(() => {
    storeData();
  }, [cities]);

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Weather App</Title>
        </Body>
        <Right>
          <Button>
            <Text onPress={openDialog}>Add</Text>
          </Button>
        </Right>
      </Header>
      <ScrollView>
        {!modalVisible &&
          cities.map(function (city, index) {
            return (
              <WeatherForecast
                key={index}
                city={city.name}
                id={city.id}
                deleteCity={deleteCity}
              />
            );
          })}
      </ScrollView>
      <Dialog.Container visible={modalVisible}>
        <Dialog.Title>Add a new city</Dialog.Title>
        <Form>
          <Item>
            <Input
              onChangeText={(text) => setCityName(text)}
              placeholder="City name"
            />
          </Item>
        </Form>
        <Dialog.Button label="Cancel" onPress={cancelCity} />
        <Dialog.Button label="Add" onPress={addCity} />
      </Dialog.Container>
    </Container>
  );
};

export default App;
