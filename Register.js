import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import "./App";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { handleRegisteredUser, handleunSetHPAuthedUser } from '../actions/authedUser';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 7}px ${theme.spacing.unit * 5}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 8,

  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        uEmail: "",
        uPass: "",
        uName: "",
        uDOB: "",
        uPhone: ""
      },
      formErrorMessage: {
        uEmail: "",
        uPass: "",
        uName: "",
        uDOB: "",
        uPhone: ""
      },
      formValid: {
        uEmail: false,
        uPass: false,
        uName: false,
        uDOB: false,
        uPhone: false,
        buttonActive: false
      }
    };
  }



  componentDidMount() {
    handleunSetHPAuthedUser(this.props.dispatch)
  }

  handleSubmit = event => {
    const { formValue } = this.state;
    this.setState({ formValid: { ...this.state.formValid, buttonActive: false } })
    event.preventDefault()
    const registerData = {
      uCredentials: {
        uEmail: formValue.uEmail,
        uPass: formValue.uPass
      },
      uProfile: {
        uName: formValue.uName,
        uDOB: formValue.uDOB,
        uPhone: formValue.uPhone
      }
    }
    handleRegisteredUser(this.props.dispatch, registerData);
  };

  handleChange = event => {
    let name = event.target.name
    let value = event.target.value
    const { formValue } = this.state
    this.setState({ formValue: { ...formValue, [name]: value } })
    this.validateField(name, value)
  };

  validateField = (fieldName, value) => {
    var { formValid } = this.state;
    var { formErrorMessage } = this.state;
    var message;

    switch (fieldName) {
      case 'uEmail':
        let emailRegex = new RegExp(/^[A-z][A-z0-9.]+@[a-z]+\.[a-z]{2,3}$/);
        value === "" ? message = "Please enter your email id" : emailRegex.test(value) ? message = "" : message = "Email id format is wrong"
        break;

      case "uPass":
        let passRegex = new RegExp(/^(?=.*[A-Z])(?=.*[!@#$&*%&])(?=.*[0-9])(?=.*[a-z]).{7,20}$/)
        value === "" ? message = "Please enter your password" : passRegex.test(value) ? message = "" : message = "should be 5-10 characters long consisting of alphabet, digits and any of !@#$&*%&"
        break

      case "uName":
        let nameRegex = new RegExp(/^[a-zA-Z0-9.\s]{3,10}$/);
        value === "" ? message = "Please enter your Name" : nameRegex.test(value) ? message = "" : message = "should be 5-10 characters long consisting of alphabet, digits and *,# or _"
        break

      case "uPhone":
        value === "" ? message = "Please enter your Phone number" : value > 6000000000 && value < 9999999999 ? message = "" : message = "Plaese enter a valid Phone number"
        break

      case "uDOB":
        value === "" ? message = "Please enter your Date of Birth" : new Date(new Date(value).toLocaleDateString()) < new Date(new Date().toLocaleDateString()) ? message = "" : message = "Your DOB can't be today's date or greater"
        break

      default:
        break;
    }

    //Form err message set
    formErrorMessage[fieldName] = message;
    this.setState({ formErrMsg: formErrorMessage });
    //Form Valid set
    message === "" ? formValid[fieldName] = true : formValid[fieldName] = false;
    formValid.buttonActive = formValid.uEmail && formValid.uPass && formValid.uName
      && formValid.uPhone && formValid.uDOB;
    this.setState({ formValid: formValid });
  }

  render() {
    const { authedUser } = this.props;
    const { classes } = this.props;
    return (
      <React.Fragment>
        {this.state.redirect}

        <div className="col-md-6 offset-3">
          <main className={classes.main}>
            {/* <CssBaseline /> */}
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h5">
                Create account
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="uName" >Username</InputLabel>
                  <Input id="uName" name="uName" autoComplete="email"
                    onChange={this.handleChange} autoFocus />
                  <span name="uNameError" className="text-danger">{this.state.formErrorMessage.uName}</span>
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <TextField
                    id="uDOB"
                    label="DOB"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }} onChange={this.handleChange} autoFocus></TextField>
                  <span name="uDOBError" className="text-danger">{this.state.formErrorMessage.uDOB}</span>

                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="uPhone" >Mobile Number</InputLabel>
                  <Input id="uPhone" type="number" name="uPhone" autoComplete="number"
                    onChange={this.handleChange} autoFocus />
                  <span name="uPhoneError" className="text-danger">{this.state.formErrorMessage.uPhone}</span>
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="uEmail">Email Address</InputLabel>
                  <Input id="uEmail" name="uEmail" onChange={this.handleChange}
                    autoComplete="email" autoFocus />
                  <span name="uEmailError" className="text-danger">{this.state.formErrorMessage.uEmail}</span>
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="uPass">Password</InputLabel>
                  <Input type="password" onChange={this.handleChange}
                    id="uPass" name="uPass"
                    autoComplete="current-password" />
                  <span name="uPassError" className="text-danger">{this.state.formErrorMessage.uPass}</span>
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!this.state.formValid.buttonActive}
                >
                  Register
          </Button>
                {authedUser.isError && (<div className={'text-danger'}>{authedUser.isError}</div>)}
                {authedUser.data.length > 0 ?
                  <React.Fragment>
                    <div className={'text-success'}>Your are successfully registered</div>
                    
                    {this._isMounted ? setTimeout(() => {
                      this.setState({ redirect: <Redirect push to="/dashboard" /> })
                    }, 2500) :null}
                  </React.Fragment>
                  : null}
              </form>
            </Paper>
          </main>

        </div>
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}
// export default connect(mapStateToProps)(Register)
export default connect(mapStateToProps)(withStyles(styles)(Register));
