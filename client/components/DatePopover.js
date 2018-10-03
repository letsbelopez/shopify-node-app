import React, { Component } from "react";
import { Button, Popover } from "@shopify/polaris";
import { connect } from "react-redux";

import OrderTotalsForm from "./OrderTotalsForm";
import { formatDate } from "../../helpers";

class DatePopover extends Component {
  state = {
    active: false
  };

  togglePopover = () => {
    this.setState(({ active }) => {
      return { active: !active };
    });
  };

  render() {
    const formatedDate = formatDate(this.props.dateRange.start);

    const activator = (
      <Button onClick={this.togglePopover} disclosure>
        {formatedDate}
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
