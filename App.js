import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

//Import statement to connect to the reducers
import { connect } from 'react-redux';
import { handleGetProducts,handleGetCategories } from "../actions/Products";

//Import statements of Components
import Navbar from "./NavBar";
import  Home  from "./Home";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import Orders from "./Orders";
import Register from "./Register";
import Login from "./Login";



class App extends Component {

  componentDidMount(){
        handleGetProducts(this.props.dispatch)
        handleGetCategories(this.props.dispatch)
  }

  render() {
    return (
      <div>
        <Router>
          <Fragment>
            <Navbar/>
            <Switch>
              <Route exact path='/dashboard' component={Home}/>
              <Route exact path ='/getAllProducts' component={Products}/>
              <Route exact path ='/productDetail/:id' component={ProductDetail}/>
              <Route exact path ='/cart' component={Cart}/>
              <Route exact path ='/orders' component={Orders}/>
              <Route exact path ='/register' component={Register}/>
              <Route exact path ='/login' component={Login}/>     
              <Route exact path ='/search/:keyword' component={Products}/>     

              <Route path='*' render={()=><Redirect push to='/dashboard'/>}/>
            </Switch>
          </Fragment>
        </Router>
      </div>
    );
  }
}

function mapStateToProps ({ allProducts,allCategories,Categorizedproducts }) {
  return {
    allProducts,
    allCategories,
    Categorizedproducts,
  }
}

export default connect(mapStateToProps)(App)