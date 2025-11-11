import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Define the type of the meal items
interface MealItem {
  id: number;
  course: 'Starters' | 'Main Course' | 'Dessert';
  name: string;
  description: string;
  price: number;
}

const HomeScreen: React.FC<any> = ({ navigation, route }) => {
  const [mealItems, setMealItems] = useState<MealItem[]>([]); // State to store meal items

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Add Item"
        onPress={() =>
          navigation.navigate('Add Item', {
            setMealItems,
          })
        }
      />
      <Button
        title="Go to Filter Menu"
        onPress={() =>
          navigation.navigate('Filter Menu', {
            mealItems, // Pass the current meal items to the Filter Menu
          })
        }
      />
    </View>
  );
};

const AddItemScreen: React.FC<any> = ({ navigation, route }) => {
  const { setMealItems } = route.params; // Retrieve the setMealItems function
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('Main Course');

  const handleSaveItem = () => {
    const newItem = {
      id: Date.now(),
      name,
      description,
      price: parseFloat(price), // Ensure it's parsed as a number
      course,
    };
    setMealItems((prevItems: any) => [...prevItems, newItem]);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add Item Screen</Text>
      {/* Add form to add meal item */}
      <Button title="Save Item" onPress={handleSaveItem} />
    </View>
  );
};

const FilterMenuScreen: React.FC<any> = ({ route }) => {
  const { mealItems } = route.params; // Retrieve the passed meal items
  const [filter, setFilter] = useState('All');

  const filteredItems =
    filter === 'All' ? mealItems : mealItems.filter((item: { course: string }) => item.course === filter);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Filter Menu Screen</Text>
      <Button title="Filter by Starters" onPress={() => setFilter('Starters')} />
      <Button title="Filter by Main Course" onPress={() => setFilter('Main Course')} />
      <Button title="Filter by Dessert" onPress={() => setFilter('Dessert')} />

      <View>
        {filteredItems.map((item: any) => (
          <View key={item.id}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>R{item.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Item" component={AddItemScreen} />
        <Stack.Screen name="Filter Menu" component={FilterMenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
