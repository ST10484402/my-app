# MAST POE
This app was made for chef, it allows the chef to enter their dish of choice of either starters, main course and desserts and it keeps it stored

## Overview
This app provides a simple interface to manage a menu for a restaurant or similar application. Users can view, add, and filter items based on categories such as "STARTERS," "MAINS," and "DESSERTS." The application includes a smooth navigation flow powered by React Navigation, and the ability to add new items dynamically.

# How to run App
Firsty, open Github, download the zipfile, extract the zip file.
When you have completed those steps, you need to run the application with visual studio.
If you want the app to run you need to open a new terminal and type in npm install yo install all neccessary dependencies.
You then must open an intergrated terminal in the app.tsx file, if you are running it on a virtual machine, type npx expo start --tunnel

# The main functionality is divided into:

1. **Home Screen**: Displays a list of menu items, with options to add new items or filter by category.
2. **Courses Screen**: Allows users to select a category to filter the displayed menu items.
3. **Add Item Screen**: Lets users add new menu items with the option to specify a name, description, price, and category.

### Technologies Used:
- **React Native** for the mobile app development.
- **React Navigation** for navigation management between screens.
- **@react-native-picker/picker** for dropdown selection.

---

## Features

- **Home Screen**:
  - Displays a list of saved items.
  - Can view detailed information of items, including dish name, description, price, and category.
  - Average price for the selected category is calculated and displayed.
  - Options to filter menu items by category (using dropdown).
  - Add new menu items and delete existing items.
  
- **Courses Screen**:
  - Dropdown menu for selecting a category (e.g., "STARTERS," "MAINS," or "DESSERTS").
  - The Home screen is filtered based on the selected category.

- **Add Item Screen**:
  - A form to add new items to the menu.
  - Users can specify the dish name, description, price, and category.

---
# Usage
## Home Screen

- On the Home screen, users can view the list of saved menu items.
- The items can be filtered by categories (STARTERS, MAINS, DESSERTS) using a dropdown.
- The Add Item button allows the user to add new items to the menu.

## Courses Screen

- Users can filter the displayed menu items by category using a dropdown list (STARTERS, MAINS, DESSERTS).
- Add Item Screen
- The user can add a new menu item by entering the dish name, description, price, and selecting a category.


# Youtube video link
https://youtube.com/shorts/u1WuZQF69kM?si=N-SMDzPQqCoa03DE

# Final Youtube video Link


# Github Link
https://github.com/ST10484402/my-app
