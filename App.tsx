import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Platform, Modal } from 'react-native';
import React, { useState } from 'react';

type MealCourse = 'Starters' | 'Main Course' | 'Dessert';

interface MealItem {
  id: number;
  course: MealCourse;
  name: string;
  description: string;
  price: number;
}

export default function App() {
  
  const [currentFilter, setCurrentFilter] = useState<MealCourse | 'All'>('All');
  
  const [mealItems, setMealItems] = useState<MealItem[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCourse, setNewItemCourse] = useState<MealCourse>('Main Course');


  
  const courses: MealCourse[] = ['Starters', 'Main Course', 'Dessert'];
  const filterCourses: (MealCourse | 'All')[] = ['All', ...courses];

  
  const handleCourseSelection = (course: MealCourse | 'All') => {
    setCurrentFilter(course);
  };

  
  const handleAddItem = () => {
    const priceValue = parseFloat(newItemPrice);

    // Basic validation
    if (newItemName.trim() === '' || isNaN(priceValue) || priceValue <= 0) {
      alert("Please enter a valid item name and price.");
      return;
    }

    const newItem: MealItem = {
      id: Date.now(), 
      course: newItemCourse,
      name: newItemName.trim(),
      description: newItemDescription.trim(),
      price: priceValue,
    };

    
    setMealItems(prevItems => [...prevItems, newItem]);
    
    
    setNewItemName('');
    setNewItemDescription('');
    setNewItemPrice('');
    setNewItemCourse('Main Course'); 
    setIsModalVisible(false);
  };

  
  const filteredItems = mealItems.filter(item => 
    currentFilter === 'All' ? true : item.course === currentFilter
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

    
      <View style={styles.filterContainer}>
        {filterCourses.map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.button,
              currentFilter === course && styles.activeButton,
            ]}
            onPress={() => handleCourseSelection(course)}
          >
            <Text
              style={[
                styles.buttonText,
                currentFilter === course && styles.activeButtonText,
              ]}
            >
              {course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
    
      <TouchableOpacity 
        style={styles.openModalButton} 
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.openModalButtonText}>+ Add New Meal Item</Text>
      </TouchableOpacity>

      
      <Text style={styles.itemCountText}>
        {currentFilter === 'All' ? 'Total' : currentFilter} items listed: 
        <Text style={styles.countNumber}> {filteredItems.length}</Text>
      </Text>

     
      <ScrollView style={styles.listContainer}>
        {filteredItems.map(item => (
          <View key={item.id} style={[styles.itemRow, { borderLeftColor: item.course === 'Starters' ? '#f1c40f' : item.course === 'Main Course' ? '#2ecc71' : '#e74c3c' }]}>
            <View style={{ flex: 1 }}>
                <Text style={styles.itemText}>{item.name} 
                    <Text style={styles.priceText}> - R{item.price.toFixed(2)}</Text>
                </Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <Text style={styles.itemCourseTag}>{item.course}</Text>
          </View>
        ))}
      </ScrollView>

      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add New Menu Item</Text>

            {/* Input: Item Name */}
            <TextInput
              style={styles.modalInput}
              placeholder="Item Name (e.g., Caesar Salad)"
              value={newItemName}
              onChangeText={setNewItemName}
            />
            
            {/* Input: Description */}
            <TextInput
              style={[styles.modalInput, { height: 80 }]}
              placeholder="Description"
              multiline={true}
              numberOfLines={3}
              value={newItemDescription}
              onChangeText={setNewItemDescription}
            />

            {/* Input: Price */}
            <TextInput
              style={styles.modalInput}
              placeholder="Price (e.g., 85.00)"
              keyboardType="numeric"
              value={newItemPrice}
              onChangeText={setNewItemPrice}
            />
            
            {/* Course Selector */}
            <View style={styles.courseSelectorContainer}>
                <Text style={styles.selectorLabel}>Course:</Text>
                {courses.map(course => (
                    <TouchableOpacity
                        key={course}
                        style={[
                            styles.courseButton,
                            newItemCourse === course && styles.activeCourseButton,
                        ]}
                        onPress={() => setNewItemCourse(course)}
                    >
                        <Text style={newItemCourse === course ? styles.activeButtonText : styles.buttonText}>
                            {course}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalActionButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalActionButton, styles.saveButton]}
                onPress={handleAddItem}
              >
                <Text style={styles.saveButtonText}>Save Item</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
      
      <Text style={styles.placeholderText}>
        Total items stored in menu: **{mealItems.length}**
      </Text>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 50 : 80, 
  },

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '95%',
    position: 'absolute', 
    top: Platform.OS === 'android' ? 40 : 70, 
    zIndex: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 2,
    flex: 1,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  buttonText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },
  activeButtonText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
  openModalButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '95%',
    alignItems: 'center',
    marginTop: 70, 
    marginBottom: 10,
  },
  openModalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemCountText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: '2.5%',
  },
  countNumber: {
    fontWeight: 'bold',
    color: '#3498db',
  },
  listContainer: {
    width: '95%',
    flex: 1,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    borderLeftWidth: 5,
    alignItems: 'flex-start',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#2ecc71',
  },
  itemDescription: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  itemCourseTag: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#3498db',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: 'bold',
  },
  placeholderText: {
    marginTop: 10,
    marginBottom: 10,
    color: '#999',
  },
  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  courseSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  selectorLabel: {
    fontWeight: '600',
    marginRight: 10,
    color: '#555',
  },
  courseButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  activeCourseButton: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalActionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ecf0f1',
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  cancelButtonText: {
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#3498db',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});