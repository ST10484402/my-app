// components/MenuItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MenuItem = ({ item, mealItems, setMealItems }: any) => {
  const handleRemoveItem = () => {
    setMealItems(mealItems.filter((i: any) => i.id !== item.id));
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>R{item.price.toFixed(2)}</Text>

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
