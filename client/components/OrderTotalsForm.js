import React, { Component } from "react";
import { connect } from "react-redux";
import { DatePicker, FormLayout } from "@shopify/polaris";
import { updateDate } from "../actions";

class OrderTotalsForm extends Component {
  state = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  };

  handleMonthChange = (month, year) => {
    this.setState({
      month,
      year
    });
  };

  render() {
    const { month, year } = this.state;
    const { dispatch, dateRange: selected } = this.props;

    return (
      <FormLayout>
        <DatePicker
          month={month}
          year={year}
          onChange={value => {
            dispatch(updateDate(value));
            this.props.togglePopover();
          }}
          onMonthChange={this.handleMonthChange}
          selected={selected}
          allowRange={false}
        />
      </FormLayout>
    );
  }
}

function mapStateToProps({ dateRange, requestFields }) {
  return {
    dateRange,
    requestFields
  };
}

export default connect(mapStateToProps)(OrderTotalsForm);
