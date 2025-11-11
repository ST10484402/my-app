// screens/FilterMenuScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const FilterMenuScreen = ({ route }: any) => {
  const { mealItems } = route.params;
  const [filter, setFilter] = useState('All');

  const filteredItems = filter === 'All' ? mealItems : mealItems.filter(item => item.course === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filter Menu by Course</Text>

      <View style={styles.buttonContainer}>
        {['All', 'Starters', 'Main Course', 'Dessert'].map(course => (
          <TouchableOpacity
            key={course}
            style={[styles.button, filter === course && styles.selectedButton]}
            onPress={() => setFilter(course)}
          >
            <Text style={styles.buttonText}>{course}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView>
        {filteredItems.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>R{item.price.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
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
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#333',
  },
  itemRow: {
    marginBottom: 15,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FilterMenuScreen;
