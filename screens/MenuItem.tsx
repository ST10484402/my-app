import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MealItem {
  id: number;
  course: 'Starters' | 'Main Course' | 'Dessert';
  name: string;
  description: string;
  price: number;
}

// Props that MenuItem will receive
interface MenuItemProps {
  item: MealItem;
  mealItems: MealItem[];
  setMealItems: React.Dispatch<React.SetStateAction<MealItem[]>>; // Function to update the meal Items state
}

const MenuItem = ({ item, mealItems, setMealItems }: MenuItemProps) => {
  console.log("MenuItem Props:", { item, mealItems });

  const handleRemoveItem = () => {
    setMealItems(mealItems.filter((i) => i.id !== item.id)); // Removing item from the mealItems array
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text>{item.description}</Text>
      {/* Adding a check to ensure price is a number */}
      <Text>{typeof item.price === 'number' ? `R${item.price.toFixed(2)}` : 'Invalid Price'}</Text>

      <TouchableOpacity style={styles.removeButton} onPress={handleRemoveItem}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MenuItem;
