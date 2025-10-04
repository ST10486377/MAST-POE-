## 🍽️ Christoffel's Menu Manager (React Native)
Portfolio of Evidence – Part 2
Student: Njabulo Ndlovu
Project: Menu Management App for Chef Christoffel
Technology: React Native (TypeScript) with Expo
## 🧾 Project Overview
Christoffel is a private chef known for his personalised dining experiences. He requires a cross-platform mobile application to manage and update his menu quickly before each event.

This React Native application acts as a digital menu manager, allowing the chef to easily add, view, and manage menu items such as starters, mains, and desserts.

This version covers Part 2 of the Portfolio of Evidence — building the basic user interface and logic using React Native components and TypeScript.
🧩 Features Implemented (Part 2)
•	 Add new menu items by entering: Dish name, Description, Course (Starter/Main/Dessert), and Price
•	 Predefined course list (Starter, Main, Dessert)
•	 Home screen displays all added menu items and total number of menu items
•	 Data stored in an array (not hardcoded, not persistent)
•	 Simple validation and interactive design
•	 Basic animation for better user experience
### 🛠️ Technologies Used
React Native: Core framework for cross-platform mobile apps
Expo CLI: Simplifies development and running on Android/iOS
TypeScript: Adds type safety and better code structure
VS Code: Code editor
Expo Go App: For testing the app on mobile devices
## ⚙️ Installation & Setup (Windows)
• Install Node.js (LTS) from https://nodejs.org/
• Install Visual Studio Code from https://code.visualstudio.com/
• Install Expo Go app from the Google Play Store or Apple App Store
• Optional: Install Git from https://git-scm.com/
• Create a new Expo project:
  npx create-expo-app chef-menu --template expo-template-blank-typescript
  cd chef-menu
• Replace the contents of App.tsx with the provided Part 2 code.
• Run the app using:
  npx expo start
• Scan the QR code with Expo Go to view it live on your phone.
## 📊 App Flow
→ Chef enters details – Dish name, description, selects a course, and enters a price.
→ Chef taps 'Add menu item' – Item is validated and added to an in-memory list.
→ Menu list updates automatically – Displays total number of menu items.
→ Long-press an item – Removes it from the list (temporary; not saved permanently).
## 🎨 UI and Layout
• Designed with core React Native components (TextInput, FlatList, TouchableOpacity).
• Simple and elegant layout suitable for mobile screens.
• Consistent padding, borders, and dark accent colour for visibility.
## References 
Danielsson, W., 2016. React Native application development. Linköpings universitet, Swedia, 10(4), p.10.
Danielsson, W., 2016. React Native application development: A comparison between native Android and React Native.
Rashid, H., 2024. Front end development and UX design (Doctoral dissertation, Politecnico di Torino).
Peukert, C., Abeillon, F., Haese, J., Kaiser, F. and Staub, A., 2024. AI and the Dynamic Supply of Training Data. arXiv preprint arXiv:2404.18445.
Rochmawati, I., 2020. User Interface Design of a Mobile Application for Creating Digital Posters. In Proceeding of International Conference on Business, Economics, Social Sciences, and Humanities (Vol. 3, pp. 702-708).


