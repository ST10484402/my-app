import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const FilterMenuScreen = ({ route }: any) => {
  const { mealItems } = route.params;
  const [filter, setFilter] = useState('All');

  const filteredItems = filter === 'All' ? mealItems : mealItems.filter((item: { course: string }) => item.course === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filter Menu by Course</Text>

      <View style={styles.filterButtons}>
        {['All', 'Starters', 'Main Course', 'Dessert'].map(course => (
          <TouchableOpacity
            key={course}
            style={[styles.filterButton, filter === course && styles.selectedFilter]}
            onPress={() => setFilter(course)}
          >
            <Text style={styles.filterButtonText}>{course}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView>
        {filteredItems.map((item: any) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text>{item.name}</Text>
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
  filterButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedFilter: {
    backgroundColor: '#3498db',
  },
  filterButtonText: {
    color: '#333',
  },
  itemContainer: {
    marginBottom: 15,
  },
});

export default FilterMenuScreen;
