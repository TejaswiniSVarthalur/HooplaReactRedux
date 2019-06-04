import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import ProductCard from "./ProductCard";

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  }
});

class Products extends Component {

  render() {
    var allProducts;
    if(this.props.Categorizedproducts.products.length>0){
        allProducts = this.props.Categorizedproducts
    }else{
        allProducts = this.props.searchedProducts
    }
    
    const { classes } = this.props;
    return (      
      <React.Fragment>
        <CssBaseline />
        <main>
          {allProducts.products.length>0 ? <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40}>
              {allProducts.products.map((data,index)=> <ProductCard product={data} key={index}/>)}
            </Grid>
          </div> : null}
          {allProducts.isError!==""? allProducts.isError:null}
        </main>
      </React.Fragment>
    );
  }
}

function mapStateToProps( {Categorizedproducts,searchedProducts} ){
  return {
    Categorizedproducts,
    searchedProducts
  }
}
Products.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Products));