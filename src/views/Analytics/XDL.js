import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  // Dropdown,
  // DropdownItem,
  // DropdownMenu,
  // DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import "chartjs-plugin-annotation";
import PropTypes from 'prop-types';


const Widget01 = lazy(() => import('../Widgets/Widget04'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
// const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')




class XDL extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.loadCSV = this.loadCSV.bind(this);
    console.log("hello!");

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

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <img src={'assets/img/Refinery-layout-w-attn.png'} className="img-xdl" alt="admin@bootstrapmaster.com" />
          </Col>
        </Row>
      </div>
    );
  }
}
export default XDL; 
