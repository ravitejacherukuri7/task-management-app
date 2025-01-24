import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
};

export default App;