import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Pages/Main';
import DetailPage from './Pages/DetailPage';
import { setupServer } from '../mock/index';

function App(): JSX.Element {
    
  setupServer()

  return (
    <Router>
      <Route exact path="/"  component={Main} />
      <Route path="/detail/:id" component={DetailPage} />
    </Router>
  );
}

export default App;
