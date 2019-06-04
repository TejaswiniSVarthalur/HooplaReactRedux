import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      boxShadow: "5px 10px 5px  rgba(0,0,0,0.2)"
    }
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
});


class ProductCard extends Component {

  state = {
    redirect: ''
  }

  toCart = () => {
    this.setState({ redirect: <Redirect push to='/cart' /> })
  }
  render() {
    const { classes } = this.props;
    var { product } = this.props;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    })
    var rating = <span>{product.pRating}<i className="fa fa-star"></i></span>
    return (
      <React.Fragment>
        <Grid item key={this.props.card} sm={6} md={3} lg={3}>
          {this.state.redirect}
        <div onClick={()=>{this.setState({redirect :<Redirect push to ={'/productDetail/'+product._id}/>})}}>
          <Card className={classes.card} >
            <CardMedia
              className={classes.cardMedia}
              image={require('.././assets/img/' + product.image)}
              title={product.pName}
            />
            <CardContent className={classes.cardContent}>
              <div className="row ">
                <span className="col-md-3 offset-9">
                  <Badge color="secondary" children=""
                    badgeContent={rating}
                    className={`badge` }
                  >
                  </Badge>
                </span>
              </div>
              <div className="row">
                <div className="col-md-6">
                  {product.pName}
                </div>
                <div className="col-md-6">
                  <b>{formatter.format(product.price)}</b>
                </div>
              </div>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
          </div>
        </Grid>
      </React.Fragment>
    )
  }
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCard);