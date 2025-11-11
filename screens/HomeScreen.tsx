import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import MenuItem from '../screens/MenuItem';

interface MealItem {
  id: number;
  course: 'Starters' | 'Main Course' | 'Dessert';
  name: string;
  description: string;
  price: number;
}

type RootStackParamList = {
  Home?: { mealItems?: MealItem[] } | undefined;
  'Add Item': { setMealItems: React.Dispatch<React.SetStateAction<MealItem[]>> };
  'Filter Menu': { mealItems: MealItem[] };
};

const HomeScreen = ({ route }: { route?: { params?: RootStackParamList['Home'] } }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'Home'>>();
  const [mealItems, setMealItems] = useState<MealItem[]>(route?.params?.mealItems || []);

  const calculateAveragePrice = (course: string) => {
    const filteredItems = mealItems.filter(item => item.course === course);
    if (filteredItems.length === 0) return 0;
    const total = filteredItems.reduce((sum, item) => sum + item.price, 0);
    return total / filteredItems.length;
  };

  const handleAddItem = () => {
    navigation.navigate('Add Item', { setMealItems });
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

      <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('Filter Menu', { mealItems })}>
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
