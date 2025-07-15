# React Todo App

A feature-rich Todo application built with React, TypeScript, and Tailwind CSS.

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Filter todos by status (all, active, completed)
- ✅ Search todos by title, description, or tags
- ✅ Add tags to todos for better organization
- ✅ Filter todos by tags
- ✅ Sort todos by creation date, due date, priority, or title
- ✅ Set priority levels (low, medium, high)
- ✅ Add due dates to todos
- ✅ Dark/light mode toggle
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Keyboard accessibility
- ✅ Data persistence with localStorage

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- Context API (for state management)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sadikmultani/react-todo.git
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Project Structure

- `src/components/` - React components
  - `Todo/` - Todo-related components
  - `Layout/` - Layout components
  - `UI/` - Reusable UI components
- `src/hooks/` - Custom React hooks
- `src/types/` - TypeScript type definitions
- `src/styles/` - CSS and Tailwind styles

## Usage

### Adding a Todo

1. Enter a title in the input field
2. Click on the input field to expand the form
3. Add optional details like description, priority, due date, and tags
4. Click "Add Todo" to create the todo

### Managing Todos

- Click the checkbox to mark a todo as complete
- Use the filter buttons to view all, active, or completed todos
- Use the search bar to find specific todos
- Filter todos by tags
- Sort todos using the sort options
- Click the edit button to modify a todo
- Click the delete button to remove a todo

## License

This project is licensed under the MIT License - see the LICENSE file for details.
