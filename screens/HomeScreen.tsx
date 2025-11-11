import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import MenuItem from '../screens/MenuItem'; 

// Defining the Meal Item interface
interface MealItem {
  id: number;
  course: 'Starters' | 'Main Course' | 'Dessert';
  name: string;
  description: string;
  price: number;
}

type RootStackParamList = {
  Home: { mealItems: MealItem[] }; // Home screen receives meal Items as params
  'Add Item': { setMealItems: React.Dispatch<React.SetStateAction<MealItem[]>> }; // Add Item screen for adding meals
  'Filter Menu': { mealItems: MealItem[] }; // Filter Menu for filtering meal items by course
};

const HomeScreen = ({ route }: { route?: { params: { mealItems: MealItem[] } } }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'Home'>>();

  // Log route params to check if mealItems are passed correctly
  console.log('Route Params:', route?.params);

  // Ensure mealItems is an array or set it to an empty array if undefined
  const initialMealItems = Array.isArray(route?.params?.mealItems) ? route.params.mealItems : [];

  const [mealItems, setMealItems] = useState<MealItem[]>(initialMealItems);

  useEffect(() => {
    // Log to ensure that mealItems is an array
    console.log("mealItems:", mealItems);
  }, [mealItems]);

  const calculateAveragePrice = (course: 'Starters' | 'Main Course' | 'Dessert') => {
    const filteredItems = mealItems.filter(item => item.course === course);
    if (filteredItems.length === 0) return 0;
    const total = filteredItems.reduce((sum, item) => sum + item.price, 0);
    return total / filteredItems.length;
  };

  const handleAddItem = () => {
    console.log('Navigating to Add Item screen');
    navigation.navigate('Add Item', { setMealItems });
  };

  const handleFilterMenu = () => {
    console.log('Navigating to Filter Menu screen');
    navigation.navigate('Filter Menu', { mealItems });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complete Menu</Text>

      <View style={styles.statsContainer}>
        <Text>Starters Avg. Price: R{calculateAveragePrice('Starters').toFixed(2)}</Text>
        <Text>Main Course Avg. Price: R{calculateAveragePrice('Main Course').toFixed(2)}</Text>
        <Text>Dessert Avg. Price: R{calculateAveragePrice('Dessert').toFixed(2)}</Text>
      </View>

      <ScrollView>
        {mealItems.map(item => (
          <MenuItem key={item.id} item={item} mealItems={mealItems} setMealItems={setMealItems} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}>+ Add New Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.filterButton} onPress={handleFilterMenu}>
        <Text style={styles.filterButtonText}>Filter Menu by Course</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsContainer: {
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filterButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
