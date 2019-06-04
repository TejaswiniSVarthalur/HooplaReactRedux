import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { handleunSetHPAuthedUser } from '../actions/authedUser'
import { handleGetProductsSearched } from "../actions/Products";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';

import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  text: {
    color: 'white',
  },
  badge: {
    top: '50%',
    right: -3,
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
  },
  nav: {
    margin: 0,
    top: 10,
    right: 60,
    left: 'auto',
    position: 'fixed',
    alignItems: 'center',
    color: '#FFF'
  },
  navlinks: {
    margin: 0,
    top: 10,
    color: 'white',
    textDecoration: 'none'
  }
});

class NavBar extends Component {
  state = {
    alpha: true,
    keyword: '',
    login: <Link  to="/login" className={this.props.classes.navlinks}
      onClick={() => this.setState({ loginOrRegister: this.state.register })}
      >Login</Link>,

    register: <Link to="/register" className={this.props.classes.navlinks}
      onClick={() => this.setState({ loginOrRegister: this.state.login })}
      style={{ color: 'white', textDecoration: 'none' }}>Register</Link>,

    loginOrRegister: <Link to="/login" className={this.props.classes.navlinks}
      onClick={() => this.setState({ loginOrRegister: this.state.register })}
      style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
  }

  handleSubmit = (event) => {
    event.preventDefault()
    handleGetProductsSearched(this.props.dispatch, this.state.keyword)
    this.props.dispatch({ type: "UNSET_CATGEORIZED_PRODUCTS" })
    this.setState({ alpha: <Redirect push to={'/search/' + this.state.keyword} />, keyword: '' }, () => { this.setState({ alpha: '' }) })
  }

  render() {
    const { classes } = this.props;
    const { authedUser } = this.props
    return (
      <React.Fragment>
        {this.state.alpha}
        <AppBar position="static" style={{ justifyContent: 'space-between' }}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap >
              <Link to='/' style={{ color: 'white', textDecoration: 'none' }} exact={"true"}>
              <img width="70px" height="65px" 
            // style={{ marginTop: '-12px',marginBottom:'-12px' }} 
            src={require("../assets/img/hoopla_new.png")} 
            // src={require("../assets/img/hoopla_new1.png")}
            alt='Hoopla' /></Link>
            </Typography>
      <div className="col-md-5 offset-3">
            <form onSubmit={this.handleSubmit} >
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search here…" classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  value={this.state.keyword}
                  onChange={(e) => this.setState({ keyword: e.target.value })}
                />
              </div>
            </form>
            </div>

            {!authedUser.data.length > 0 ?
              <div className="ml-auto">
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                  {this.state.loginOrRegister}
                </Typography>
              </div> :
              <React.Fragment>
                <div className="ml-auto" style={{ justifyContent: 'space-between' }}>
                  <span >Welcome {authedUser.data[0].uProfile.uName}</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link style={{ color: 'white', textDecoration: 'none' }} to="/cart">
                    <Badge color="primary"
                      badgeContent={this.props.cart.data.length}
                      classes={{ badge: classes.badge }}>
                      <ShoppingCartIcon />
                    </Badge>
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link className={classes.navlinks} to="/orders" style={{ color: 'white', textDecoration: 'none' }}>My Orders</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link className={classes.navlinks} to="" style={{ color: 'white', textDecoration: 'none' }} onClick={() => handleunSetHPAuthedUser(this.props.dispatch)} >Logout</Link>
                </div>
              </React.Fragment>
            }
          </Toolbar>
        </AppBar>
        <br></br>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ authedUser, cart, allCategories, Categorizedproducts, searchedProducts }) {
  return {
    authedUser,
    cart,
    allCategories,
    Categorizedproducts,
    searchedProducts
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(withStyles(styles)(NavBar))
