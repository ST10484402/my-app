import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddItemScreen = ({ route, navigation }: any) => {
  const { setMealItems } = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('Main Course');
  const handleSaveItem = () => {
    const newItem = {
      id: Date.now(),
      name,
      description,
      price: parseFloat(price),
      course,
    };
    setMealItems((prevItems: any) => [...prevItems, newItem]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Menu Item</Text>

      <TextInput style={styles.input} placeholder="Item Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" value={price} onChangeText={setPrice} />
      
      <View style={styles.courseSelector}>
        {['Starters', 'Main Course', 'Dessert'].map(courseOption => (
          <TouchableOpacity key={courseOption} style={[styles.courseButton, course === courseOption && styles.selected]} onPress={() => setCourse(courseOption)}>
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
