import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';
import { connect } from 'react-redux';
import { handleProductsByCategory } from "../actions/Products";

import Product from "./Products";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';

// css
import '../index.css'

const styles = theme => ({

  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
  },
  navlinks: {
    margin: 0,
    fontSize: 15, 
  },
  nav:{
    '&:hover': { 
      color : '#f50057',
      textDecoration :"none",
      fontSize : 18
  }
  }

});

//For navbar of categories
function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

class Home extends Component {

  state = {
    linkActive: false,
    keyword: '',
    value: 0
  }


  retrieveProducts = (category) => {
    this.setState({ linkActive: true })
    handleProductsByCategory(this.props.dispatch, category.charAt(0).toUpperCase() + category.slice(1))
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      arrows: true,
    }

    var { classes } = this.props
    var { categories } = this.props.allCategories;
    return (
      <React.Fragment>
        {/* Dynamic category links */}

        <NoSsr>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs variant="fullWidth" value={this.state.value} style={{backgroundColor:'#3f51b5'}} className={classes.navlinks} onChange={this.handleChange}>
                {categories.map(data => <LinkTab className={classes.nav} key={data} label={<h5>{data}</h5>} onClick={() => this.retrieveProducts(data)} />)}
              </Tabs>
            </AppBar>
          </div>
        </NoSsr>

        {/* Slider */}
        {!this.state.linkActive ? <div style={{marginTop: '50px', position:'relative'}}>
          <Slide {...properties}>

            <div className="image-slide" >
              <img src={require("../assets/img/Clothing_img1.jpeg")} height="80%" width="80%" onClick={() => this.retrieveProducts('Clothing')} className='image-in-slide' alt="Clothing Pic" />
            </div>

            <div className="image-slide">
              <img src={require("../assets/img/Furniture_img.jpeg")} height="80%" width="80%" onClick={() => this.retrieveProducts('Furniture')} className='image-in-slide' alt="Furniture Pic" />
            </div>

            <div className="image-slide">
              <img src={require("../assets/img/Shoes_img.jpeg")} height="80%" width="80%" onClick={() => this.retrieveProducts('Shoes')} className='image-in-slide' alt="Shoes Pic" />
            </div>

            <div className="image-slide">
              <img src={require("../assets/img/Mobiles_img.jpeg")} height="80%" width="80%" onClick={() => this.retrieveProducts('Electronics')} className='image-in-slide' alt="Mobiles Pic" />
            </div>

          </Slide>
        </div> : null}
        {this.state.linkActive ? <Product /> : null}
      </React.Fragment>
    );
  }
}

function mapStateToProps({ allCategories, Categorizedproducts, searchedProducts }) {
  return {
    allCategories,
    Categorizedproducts,
    searchedProducts
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Home));