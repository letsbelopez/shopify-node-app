import React, { Component } from "react";
import {
  Button,
  Popover,
  FormLayout,
  Select,
  TextField
} from "@shopify/polaris";
import { connect } from 'react-redux';

import OrderTotalsForm from "./OrderTotalsForm";

class DatePopover extends Component {
  state = {
    active: false
  };

  togglePopover = () => {
    this.setState(({ active }) => {
      return { active: !active };
    });
  };

  // handleTagChange = value => {
  //   this.setState({
  //     tagValue: value
  //   });
  // };

  render() {
    const dateRange = this.props.dateRange;
    const year = dateRange.start.getFullYear();
    const month = dateRange.start.getMonth() + 1;
    const date = dateRange.start.getDate();

    const activator = (
      <Button onClick={this.togglePopover} disclosure>
        {`${year}-${month}-${date}`}
      </Button>
    );

    return (
      <div style={{ display: "inline-block" }}>
        <Popover
          active={this.state.active}
          activator={activator}
          onClose={this.togglePopover}
          sectioned
        >
          <OrderTotalsForm togglePopover={this.togglePopover} />
        </Popover>
      </div>
    );
  }
}

function mapStateToProps({ dateRange }) {
  return {
    dateRange
  };
}

export default connect(mapStateToProps)(DatePopover);
