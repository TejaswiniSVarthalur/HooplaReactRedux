import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { handleAddtoCart, handleRemoveFromCart } from "../actions/Cart";

import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  card: {
    // height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop : '15px',
    position : "relative",
    boxShadow: "5px 10px 5px  rgba(0,0,0,0.2)",
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
});
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class CartCard extends Component {

  constructor(props) {
    super(props);
    this.state = { quantity : this.props.product.userProdQuantity};        
}

addToCart = (e) => {
    var cartObj = {
        uId: this.props.authedUser.data[0].userId,
        uCart: {
            p_Id: this.props.product._id,
            pQuantity: e.target.value
        },
        uEmail : this.props.authedUser.data[0].uCredentials.uEmail
    }
    this.setState({quantity : e.target.value})
    if(e.target.value) {
      handleAddtoCart(this.props.dispatch, cartObj)
      this.render()
  }
}

removeFromCart = (id) => {
  console.log(id)
  var cartObj = {
      uId : this.props.authedUser.data[0].userId,
      p_Id: id,
  }
  handleRemoveFromCart(this.props.dispatch, cartObj)
    this.render()
}

  render() {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    })
    const { product } = this.props;
    const { classes } = this.props
    return (
      <React.Fragment>
        <div>
          <Card className={classes.card}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <Link to={"productDetail/" + product._id}>{product.pName}</Link>
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <CustomTableCell align="left">
                      <InputLabel htmlFor="qty" >
                        <b style={{ color: 'black' }}> Quantity in cart </b>
                      </InputLabel>
                    </CustomTableCell>

                    <CustomTableCell align="left"><b> Discounted price </b></CustomTableCell>
                    <CustomTableCell align="left"> <b> products left in stock</b></CustomTableCell>
                    <CustomTableCell align="left">Remove from cart</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <CustomTableCell align="left">
                      <Input id="qty" name="number" autoFocus
                        value={this.state.quantity} onChange={this.addToCart}
                         min={1} />
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      <b>{formatter.format(product.price * product.userProdQuantity *
                        (1 - product.pSeller.pDiscount) + product.pSeller.pShippingCharges)}
                      </b></CustomTableCell>
                    <CustomTableCell align="left">
                      <b>{product.pSeller.pQuantity}</b>
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      <DeleteForeverIcon  onClick={()=>this.removeFromCart(product._id)} className={classes.icon} />
                    </CustomTableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
CartCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CartCard));