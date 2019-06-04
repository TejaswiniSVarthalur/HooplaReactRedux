import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { handleAddtoCart } from "../actions/Cart";

import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';

class ProductDetail extends Component {
    state={
        redirect:''
    }

    addToCart = () => {
        if(this.props.authedUser.data.length !== 0){
            var cartObj = {
                uId : this.props.authedUser.data[0].userId,
                uCart : {
                    p_Id: this.props.match.params.id,
                    pQuantity: 1
                }
            }
            handleAddtoCart(this.props.dispatch, cartObj)
        }
        this.setState({redirect : <Redirect push to='/cart'/>})
    }

    render() {
        const formatter =  new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
          })
          const id = this.props.match.params.id
          const product = this.props.allProducts.products.find(data => Number(data._id) === Number(id))
          var productsInCart = this.props.cart.data;
          const inCart = productsInCart.find(data => Number(data._id) === Number(id));
          var rating = product ? <span>{product.pRating}<i className="fa fa-star"></i></span> : null
          
          return (
            <React.Fragment>
                {this.state.redirect}
                <br />
                {product ?
                <div className='row'>
                    <div className="col-md-5 offset-1">
                    <div className='row'>
                        <div className="img-responsive">
                            <img width='100%' height="100%" src={require('.././assets/img/' + product.image)} alt={product.pname + ' image'}/><br />
                        </div>
                        </div>
                        <br></br>
                    </div>

                    <div className='col-md-5 offset-1'>
                    {/* Category */}
                        <h4 >{product.pCategory}</h4>
                    {/* PName */}
                        <span id='head' style={{color:"primary"}}>{product.pName}{' '}</span>
                    
                    {/* Seller Id */}
                    <br></br>
                    <br></br>
                    <span style={{fontSize : '1.17em', fontWeight: '550'}}> Seller </span>{product.pSeller.s_Id}
                    {/* Description */}
                    <h4> Description </h4>
                    <p>{' '+product.pDescription}</p>
                    {/* Specification */}
                    <h4> Specifications </h4>
                    <ul>
                        <li><b> Color </b>{product.color}</li>
                    </ul>
                    
                    {/* Rating */}                 
                    <span className="form-inline">
                    <h4> Rating </h4> &nbsp;&nbsp;&nbsp;&nbsp;
                    <Badge color="secondary" children=""
                    className={` badge` }
                    badgeContent={rating} />
                   </span>

                    {/* Price */}
                    <h4>Price 
                        <p >
                            {formatter.format(product.price*(1-product.pSeller.pDiscount))}
                        </p>
                    </h4>
                    {/* Deleted price */}
                    <span className="price"><del>{formatter.format(product.price)}</del></span><br/>
                    <h4><span className="discount">{product.pSeller.pDiscount*100}{'% '}Off</span> + {product.pSeller.pShippingCharges} shipping charges</h4>
                    <h4> Availability </h4>
                        <p>{' ' + product.pSeller.pQuantity}
                        </p>
                        <div className='row'>
                        {!inCart?<Button type="submit" variant="contained" color="primary"
                            onClick={this.addToCart}> Add to Cart</Button>:<Button type="submit" variant="contained" color="primary"
                            onClick={()=> this.setState({redirect : <Redirect push to='/cart'/>})}> Go to Cart</Button>}
                        <span className="col-md-3">
                        <button className="btn btn-warning text-white" 
                        onClick={()=>{window.history.back()}}>
                    Go Back</button></span>
                    </div>
                    </div>
                </div>:null}
            </React.Fragment>
        );
    }
}

function mapStateToProps( {allProducts, authedUser, cart} ){
    return {
      allProducts,
      authedUser,
      cart
    }
}
export default connect(mapStateToProps)(ProductDetail)