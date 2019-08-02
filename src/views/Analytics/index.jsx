
import React, { Component } from 'react';
// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

import { Dashboard as DashboardLayout } from 'layouts';

const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  item: {
    height: '100%'
  }
});
class Analytics extends Component {
  
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.loadCSV = this.loadCSV.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      count: 0,
    };
  }

  loadCSV(result) {
    const data = result.data;
    this.setState({
      data: data
    });
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  tick() {
    this.setState({
      today: new Date()
    });
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  getMaxY(data) {
    return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <img
            alt="Analytics should be here"
            className="img-Analytics"
            src={'/images/Refinery-layout-w-attn.png'} 
          />
        </div>
      </DashboardLayout>
    );
  }
}
export default withStyles(styles)(Analytics); 