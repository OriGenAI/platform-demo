import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { IconButton, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

// Material icons
import {
  Refresh as RefreshIcon,
} from '@material-ui/icons';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent
} from 'components';

// Palette
import palette from 'theme/palette';


// Component styles
import styles from './styles';

class AnalyticsChart extends Component {
  
  calculateAnalytics(data) {
    const arrayColumn = (arr, n) => arr.map(x => x[n]);
    var max = [], min = [], median = [], mean = [], accuracy = 0; 
    for (var i = 0; i < Object.keys(data[0]).length; i++) {
      var col = arrayColumn(data, i);
      console.log(col);
      max.push(Math.max(col));
      min.push(Math.min(col));
      var half = Math.floor(col.length / 2);
      if (col.length % 2)
        half = col[half];
      else
        half = (col[half - 1] + col[half]) / 2.0;
      median.push(half);
      mean.push(col.reduce((a, b) => a + b, 0) / col.length);

    }
    accuracy = this.calculateAccuracy(data);
    return{max, min, median, mean, accuracy};
  }

  calculateAccuracy(data) {
    var error = 0;
    for (var i = 0; i < 18; i++) {
      error += Math.abs(data[i]['real'] - data[i]['predict']) / data[i]['real'];
    }

    error = Math.round((error / data.length) * 1000) / 1000 * 100

    const accuracy = 100 - error;

    return accuracy;
  }
  render() {
    const { classes, className, data, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);
    const {mean, median, max, min, accuracy} = this.calculateAnalytics(data);
    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader noDivider>
          <PortletLabel title="Analytics" />
        </PortletHeader>
        <PortletContent>
          <Typography
            className={classes.title}
            variant="body2"
          >
            Prediction: {data[data.length - 1]['predict']}
            <br />
            Max: {max[0]}
          </Typography>
          <LinearProgress variant="determinate" value={(data[data.length - 1]['predict'] / 9) * 100} />
        </PortletContent>
      </Portlet>
    );
  }
}

AnalyticsChart.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  current: PropTypes.array
};

export default withStyles(styles)(AnalyticsChart);
