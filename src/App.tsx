import React from 'react';
import styled from "styled-components"
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import ConstructorWrap from './components/ConstructorWrap/ConstructorWrap';
import CreateTemplate from './components/CreateTemplate/CreateTemplate';




const AppDivStyle = styled.div`
    width: 100%;
    

`



function App() {


  return (
    <BrowserRouter>
      <Switch>
        <AppDivStyle>
          <Route path='/' exact component={ConstructorWrap} />
          <Route path='/create' component={CreateTemplate} /> 
        </AppDivStyle>
      </Switch>
    </BrowserRouter>
  );
}




export default App;



