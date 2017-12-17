// @flow
import * as React from 'react';

import './App.css';

type AppType = {
 children: React.Node
}

const App = (props: AppType) => (
  <div className="App">
    { props.children }
  </div>
);

export default App;
