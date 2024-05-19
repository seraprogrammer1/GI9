# Budget Application

### **Search Bar in Development**

## Overview
The Budget Application is designed to help users manage their finances effectively by categorizing income and expenses into various folders. It includes an Explorer section for organizing budget categories and a display section for tracking balances.

## Features
- **Explorer:** Organize your budget into main folders (Income, Expense) and subfolders.
- **Add Items:** Add budget items with names, amounts, and descriptions.
- **Balance Display:** View the total balance, which updates automatically based on the added items.
- **Search Bar:** Search through your folders and items (currently in development).
- **Validation:** Ensure all fields are filled out before adding items.

## How to Use

### Setting Up
1. **Open the Application:** Access the application through your web browser by opening `index.html`.

### Adding Folders and Items
1. **Add Main Folders:** The application starts with two main folders: Income and Expense.
2. **Add Subfolders:**
   - Select a folder from the Explorer.
   - Click the **+** button next to the search bar.
   - Enter a name for the new subfolder.
   - **Note:** You can only create subfolders up to two levels deep.
3. **Add Items:**
   - Select a folder from the Explorer.
   - Fill in the **Name**, **Amount**, and **Description** fields in the right container.
   - Click the **Enter** button.
   - Items will appear in the selected folder with their details.

### Navigation and Interaction
- **Select Folders/Items:** Click on the folder or item name to select it. Selected elements are highlighted.
- **Hide/Show Subfolders:** Click the arrow button next to a folder to collapse or expand it.
- **Remove Folders/Items:** Click the **-** button next to a folder or item to remove it.
- **Search:** Use the search bar at the top of the Explorer to find specific folders or items.

### Balance Management
- **Balance Calculation:** The total balance is updated automatically based on the amounts in the Income and Expense folders.
- **View Balance:** The balance is displayed in the middle container under "Balance".

### Validation
- Ensure all fields (Name, Amount, Description) are filled before adding an item.
- Fields will be highlighted in red if they are empty when trying to add an item.

## Customization
- **Modify Folders and Items:** Edit the code in `app.js` to change how folders and items are created and managed.
- **Styling:** Update `style.css` to change the appearance of the application.

## Files
- `index.html:` Main HTML file.
- `app.js:` JavaScript file for application logic.
- `style.css:` CSS file for styling the application.