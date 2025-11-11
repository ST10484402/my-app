import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

type Course = 'Starters' | 'Main Course' | 'Dessert';

interface MealItem {
  id: number;
  course: Course;
  name: string;
  description: string;
  price: number;
}

const COURSE_OPTIONS = ['Starters', 'Main Course', 'Dessert'] as const;

const AddItemScreen = ({ route, navigation }: any) => {
  const [course, setCourse] = useState<Course>('Main Course');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // optional setter passed via route params
  const setMealItems = route?.params?.setMealItems;

  const handleSaveItem = () => {
    if (!name || !description || !price) {
      Alert.alert('Please fill all the fields');
      return;
    }
    
    const newItem: MealItem = {
      id: Date.now(),
      name,
      description,
      price: parseFloat(price),
      course,
    };

    // If a setter was provided via route params, use it; otherwise warn or pass back via navigation
    if (typeof setMealItems === 'function') {
      setMealItems((prevItems: MealItem[]) => [...prevItems, newItem]);
    } else {
      // fallback: you can pass the new item back to a parent or another screen if needed
      // navigation.navigate('Menu', { newItem });
      console.warn('setMealItems not provided via route.params');
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Menu Item</Text>

      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <View style={styles.courseSelector}>
        {COURSE_OPTIONS.map(courseOption => (
          <TouchableOpacity
            key={courseOption}
            style={[styles.courseButton, course === courseOption && styles.selected]}
            onPress={() => setCourse(courseOption as Course)}
          >
            <Text style={styles.courseButtonText}>{courseOption}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveItem}>
        <Text style={styles.saveButtonText}>Save Item</Text>
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
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
  courseSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  courseButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: '#3498db',
  },
  courseButtonText: {
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddItemScreen;
