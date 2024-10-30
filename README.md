# Hotels Ranking

Hotels Ranking is a simple, intuitive application built with Next.js, TypeScript, and Material UI. It enables users to manage and categorize hotels with basic CRUD (Create, Read, Update, Delete) functionality. The application is responsive, user-friendly, and maintains data persistence using localStorage.

## Features

- Hotel Management: Create, edit, view, and delete hotels
- Category Management: Create, edit, view, and delete hotel categories
- Filtering & Sorting: Filter hotels by category and sort by name, country, or category
- Data Persistence: All data is stored in localStorage for persistence between sessions
- Responsive Design: Fully responsive across mobile, tablet, and desktop devices
- User-Friendly Interface: Clean and intuitive UI for easy hotel and category management
- Form Validation: Ensures required fields are filled when creating or editing hotels and categories

## Technologies Used

- Next.js
- TypeScript
- Redux for state management
- Material UI for UI components
- localStorage for data persistence

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/mecheline/Hotel-Ranking.git
   cd project folder
   ```

2. Install dependencies:

   ```
   npm install --legacy-peer-deps
   ```

   or

   ```
   yarn install --legacy-peer-deps
   ```

3. Run the development server:

   ```
   npm run dev
   ```

   or

   ```
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- **Managing Hotels**:

  - Click on the "Hotels" tab to view, add, edit, or delete hotels
  - Use the form at the top to add new hotels or edit existing ones
  - Use the filter and sort options to organize the hotel list

- **Managing Categories**:

  - Click on the "Categories" tab to view, add, edit, or delete hotel categories
  - Use the form at the top to add new categories or edit existing ones

- **Data Persistence**:
  - All changes are automatically saved to localStorage
  - Data will persist between browser sessions
