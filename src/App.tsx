import { Suspense, lazy } from 'react';
import Layout from './components/Layout/Layout';
import { TodoProvider } from './hooks/useTodoContext';
import { ThemeProvider } from './hooks/useThemeContext';
import ErrorBoundary from './components/UI/ErrorBoundary';
import LoadingState from './components/UI/LoadingState';

// Lazy load components for better performance
const TodoList = lazy(() => import('./components/Todo/TodoList'));
const TodoForm = lazy(() => import('./components/Todo/TodoForm'));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <TodoProvider>
          <Layout>
            <div className="max-w-3xl mx-auto">
              <Suspense fallback={<LoadingState message="Loading form..." />}>
                <TodoForm />
              </Suspense>
              <Suspense fallback={<LoadingState message="Loading todos..." />}>
                <TodoList />
              </Suspense>
            </div>
          </Layout>
        </TodoProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
