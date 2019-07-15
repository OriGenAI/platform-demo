import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultSidebar extends Component {
  render() {
    const { children, ...attributes } = this.props;
    return(

      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-title">OriGen Toolkit</li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="nav-icon cui-graph"></i> Dashboard
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/xdl">
                <i className="nav-icon cui-chart"></i> XDL
              </Link>
              <Link className="nav-link" to="/users">
                <i className="nav-icon cui-people"></i> Administration
              </Link>
            </li>
          <li className="nav-item mt-auto">
            <Link className="nav-link nav-link-success" to="/settings">
              <i className="nav-icon cui-settings"></i> Settings</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link nav-link-primary" to="/login">
                <i className="nav-icon cui-account-logout"></i> <strong>Logout</strong>
              </Link>
          </li>
          </ul>
        </nav>
      </div>
    );
  }
}

DefaultSidebar.propTypes = propTypes;
DefaultSidebar.defaultProps = defaultProps;

export default DefaultSidebar;