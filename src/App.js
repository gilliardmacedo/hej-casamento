import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TicketForm from './TicketForm';
import TicketView from './TicketView';
import TicketValidation from './TicketValidation';
import NotFound from './NotFound';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <TicketForm />
        </Route>
        <Route exact path="/view/:hash">
          <TicketView />
        </Route>
        <Route exact path="/validate/:hash">
          <TicketValidation />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
