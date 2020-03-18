import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import {
  Accuracy,
  Anomalies,
  Downtime,
  ProcessChart,
  Output,
  AnalyticsChart,
  CircleLoader,
} from './components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  item: {
    height: '100%'
  }
});



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.loadCSV = this.loadCSV.bind(this);

    this.state = {
      count: 0,
    };
  }

  loadCSV(result) {
    const rawData = result.data;
    this.setState({
      rawData
    });
    this.updateData();
  }
  
  async componentDidMount() {
    try {
      // eslint-disable-next-line no-undef
      const papa = require('papaparse')
      // eslint-disable-next-line no-undef
      const csvFilePath = require('../../assets/csv/march.csv')
      papa.parse(csvFilePath, {
        header: true,
        download: true,
        skipEmptyLines: true,
        complete: this.loadCSV
      });

      
      this.interval = setInterval(() => this.updateData(), 1000 * 1);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`error: ${e}`);
    }
  }

  async updateData() {
    const { rawData, count } = this.state;
    const limit = 25;

    // const historical = data.slice(count, count + limit - 7);
    const data = rawData.slice(count, count + limit);
    // const predictivePoints = predictiveData(predictive, historical);

    var newCount = count + 1;
    if (newCount > rawData.length - (limit + 1)) {
      newCount = 0;
    }

    this.setState({
      count: newCount,
      // historical,
      data,
      today: new Date()
    });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  
  render() {
    const { classes } = this.props;
    const { data } = this.state;
    if(data == undefined) {
      return(
        <CircleLoader />
      );
    }
    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Anomalies className={classes.item} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Output className={classes.item} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Downtime className={classes.item} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Accuracy className={classes.item} />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <ProcessChart 
                className={classes.item}
                data={data} 
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <AnalyticsChart 
                className={classes.item}
                data={data} 
              />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
