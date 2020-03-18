import React, { Component } from 'react';
import palette from 'theme/palette';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button } from '@material-ui/core';

// Material icons
import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowRight as ArrowRightIcon
} from '@material-ui/icons';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletToolbar,
  PortletContent,
  PortletFooter
} from 'components';

// Component styles
import styles from './styles';

class ProcessChart extends Component {

  fixData(data) {
    var data1 = [];
    var data2 = [];
    var data3 = [];


    for (var i = 0; i < data.length - 7; i++) {
      data2.push({ y: data[i]['real'], x: (new Date(data[i]['time'] * 1000)).toString() });
      data3.push({ y: data[i]['predict'], x: (new Date(data[i]['time'] * 1000)).toString() });
    }
    for (i = 0; i < data.length - 8; i++) {
      data1.push({ y: null, x: (new Date(data[i]['time'] * 1000)).toString() });
    }
    for (i = data.length - 8; i < data.length; i++) {
      data1.push({ y: data[i]['predict'], x: (new Date(data[i]['time'] * 1000)).toString() });
    }

    const max = Math.max(this.getMaxY(data1), this.getMaxY(data2), this.getMaxY(data3));

    const chartData = 
    {
      datasets: [
        {
          label: 'Future Prediction',
          backgroundColor: palette.primary.main,
          borderColor: palette.primary.main,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          borderDash: [8, 5],
          data: data1,
        },
        {
          label: 'Real',
          backgroundColor: 'transparent',
          borderColor: palette.warning.main,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: data2,
        },
        {
          label: 'Past Prediction',
          backgroundColor: 'transparent',
          borderColor: palette.success.main,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: data3,
        },
      ],
    };
    const options = {
      tooltips: {
        enabled: true,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
          }
        }
      },
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            gridLines: {
              drawOnChartArea: false,
            },
            id: 'x-axis-label'
          }],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: 5,
              max: (max > 25 ? max + 5 : 25),
            },
          }],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
      annotation: {
        annotations: [
          {
            // drawTime: "afterDatasetsDraw",
            // id: "hline",
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-label',
            value: new Date(data[data.length - 8]['time'] * 1000).toString(),
            borderColor: 'black',
            borderWidth: 2,
            label: {
              backgroundColor: 'purple',
              content: 'Now',
              enabled: true,
              yAdjust: -100,
            }
          }
        ]
      }

    };
    return {chartData, options};
  }

  getMaxY(data) {
    return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
  }
  render() {
    const { classes, className, data, ...rest } = this.props;
    if(data == null) {
      return('...loading!');
    }
    const {chartData, options} = this.fixData(data);
    // eslint-disable-next-line no-console

    const rootClassName = classNames(classes.root, className);
 
    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader noDivider>
          <PortletLabel title="Latest sales" />
          <PortletToolbar>
            <Button
              className={classes.dropdownButton}
              size="small"
              variant="text"
            >
              Last 7 days <ArrowDropDownIcon />
            </Button>
          </PortletToolbar>
        </PortletHeader>
        <PortletContent>
          <div className={classes.chartWrapper}>
            <Line
              data={chartData}
              options={options}
            />
          </div>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            size="small"
            variant="text"
          >
            Overview <ArrowRightIcon />
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}
 
ProcessChart.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
};

export default withStyles(styles)(ProcessChart);
