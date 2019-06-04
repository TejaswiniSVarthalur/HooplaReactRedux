import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import CartCard from "./CartCard";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { relative } from 'path';

const styles = {
  card: {
    maxWidth: 600,
  },
  media: {
    height: 140,
  },
  cart : {
    position : relative,
    margin : '25px'
  }
};

class Cart extends Component {
  state = {}

  render() {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    })
    const { classes } = this.props;
    var product = this.props.cart.data
    var totalPrice = 0;
    product.forEach(data => totalPrice+=(data.price*data.userProdQuantity)*(1-data.pSeller.pDiscount)+data.pSeller.pShippingCharges);
    return (
      <div className={classes.cart}>
        <br />{this.state.redirect}
        {this.props.authedUser.data.length === 0 ? (alert("User not logged in"), window.location = '/login'):this.props.cart.data.length>0?<div className='row'>
              <div className="col-md-8">

                    <Typography gutterBottom variant="h5" component="h2">
                      You have {product.length} {product.length > 1 ? "products" : "product"}  in your cart!
                    </Typography>
                      {product.map((data,index)=> <CartCard key={index} product={data} /> )}
              </div>
              <div className="col-md-3 offset-1">
                <br/><br/>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Price Details:
                    </Typography>
                    <table className="table table-condensed">
                      <tbody >
                        <tr>
                          <th>Cart total(MRP):</th>
                          <td>{formatter.format(totalPrice)}</td>
                        </tr>
                        <tr>
                          <th>Total Tax(17% by default):</th>
                          <td>{formatter.format(totalPrice*0.17)}</td>
                        </tr>
                        <tr>
                          <th>Total payable:</th>
                          <td>{formatter.format(totalPrice*1.17)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                  <CardActions>
                    <Button size="small" type="submit" fullWidth
                      variant="contained" color="primary" className={classes.submit}
                      onClick={() => this.setState({ redirect: <Redirect push to='/orders' /> })}>
                      CheckOut
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </div>:null}
            {this.props.cart.isError ? this.props.cart.isError : null}
      </div>
    );

  }
}

function mapStateToProps({ authedUser, cart }) {
  return {
    authedUser,
    cart
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Cart));