import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MovieListScreen from './MovieListScreen';
import MovieDetailScreen from './MovieDetailScreen';
import TrailerScreen from './TrailerScreen';

const Stack = createStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MoviesList" component={MovieListScreen} />
          <Stack.Screen name="MovieDetails" component={MovieDetailScreen} />
          <Stack.Screen name="TrailerScreen" component={TrailerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
