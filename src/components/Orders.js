import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });
class Orders extends Component {
    state = {  }
    render() {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        })
        const { classes } = this.props
        
        return (<Fragment>
            <br/>
            {this.props.authedUser.data.length ===0 ? 
                (alert("User not logged in"), window.location='/login'):<div className='row'>
<div className="col-md-8 offset-2">
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>OrderId </CustomTableCell>
            <CustomTableCell >ProductId 
                
            </CustomTableCell>
            <CustomTableCell >Email</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow className={classes.row} >
              <CustomTableCell >1111 Ordered on <b>{' '}{'29th Jan 2018'}</b> 
              </CustomTableCell>
              <CustomTableCell >
              <Link to={"productDetail/1001"}>{" 1001"}</Link> in quantity : {1111}
              </CustomTableCell>
              <CustomTableCell >{"atyamramesh.vzm@gmail.com"}</CustomTableCell>
            </TableRow>
        </TableBody>
      </Table>
    </Paper>
    <span style={{color:'grey', align :'right'}}>Total cost:</span><h5>{formatter.format(15000)}</h5>

    </div>
        </div>
    }
    </Fragment>
        );
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

Orders.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default connect(mapStateToProps)(withStyles(styles)(Orders));
