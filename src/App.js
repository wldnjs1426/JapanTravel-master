import './App.css';
import React from 'react';
import 'react-app-polyfill/ie11';
import "react-app-polyfill/stable";
import MainSub from './Component/MainSub';
import MapSub from './Component/MapSub';
import Header from "./Component/Header";
import {BrowserRouter, Route, Switch} from  'react-router-dom'
import DetailPage from './Component/DetailPage';
import { useMediaQuery } from "react-responsive";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Mobile

import MainSubMobile from './Component/responsive/MainSubMobile';
import MapSubMobile from './Component/responsive/MapSubMobile';
import DetailPageMobile from './Component/responsive/DetailPageMobile';
import DetailMapMobile from './Component/responsive/DetailMapMobile';
import HeaderMobile from './Component/responsive/HeaderMobile';
import Admin from './Component/admin/Admin';



function App() {
  
  const isTablet = useMediaQuery({
    query : "(max-width:768px)"
  });
  

  return (
    
    
    <BrowserRouter>

      {isTablet ? <HeaderMobile />   : <Header /> } 
      <Route
          render={({ location }) => {
            return (
              <TransitionGroup>
                <CSSTransition key={location.pathname}  timeout={1000} classNames="fade">
                <Switch>
                  {isTablet ? <Route exact path="/" component={MainSubMobile} /> : <Route exact path="/" component={MainSub} />}
                  {isTablet ? <Route exact path="/map/:Category" component={MapSubMobile} /> : <Route exact path="/map/:Category" component={MapSub} />}
                  {isTablet ? <Route exact path="/detail/:id/:category/:Area/:AreaName" component={DetailPageMobile} /> : <Route exact path="/detail/:id/:category/:Area/:AreaName" component={DetailPage} />}
                  <Route exact path="/admin/:id/:category/" component={Admin}/>
                  <Route exact path="/detailMap/:lat/:lng/:name/:japanName" component={DetailMapMobile} />
                </Switch>
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        ></Route>
        

    </BrowserRouter>
  );
}

export default App;
