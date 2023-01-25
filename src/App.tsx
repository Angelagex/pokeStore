import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { BrowserRouter } from "react-router-dom";
import Router from './router/Router';
import { PersistGate } from 'redux-persist/es/integration/react';

function App() {


  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  )
}

export default App;
