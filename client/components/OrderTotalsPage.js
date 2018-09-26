import React, { Component } from "react";
import { Page, Layout, Button, Card } from "@shopify/polaris";
import { connect } from "react-redux";
import { sendRequest } from "../actions";

import OrderTotalsTable from "./OrderTotalsTable";
import DatePopover from "./DatePopover";
import { formatDate } from "../../helpers";

class OrderTotalsPage extends Component {
  handleClick = () => {
    const { dispatch, requestFields } = this.props;
    dispatch(sendRequest(requestFields));
  };

  componentDidMount() {
    this.handleClick();
  }

  render() {
    const date = this.props.dateRange.start;
    const dateRangeMessage = () => {
      const selectedDate = formatDate(date);
      const today = formatDate(Date.now());
      const message =
        selectedDate === today ? "today" : `from ${selectedDate} to ${today}`;

      return <p>{`Meals ordered ${message}`}</p>;
    };

    return (
      <Page title="Total Meals">
        <Layout>
          <Layout.Section>
            <Card
              title="Search criteria"
              primaryFooterAction={{
                content: "Total meals",
                onAction: this.handleClick
              }}
            >
              <Card.Section title="Choose date">
                Select meals ordered from <DatePopover /> to today.{" "}
              </Card.Section>
              <Card.Section title="Selected range">
                {dateRangeMessage()}
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <OrderTotalsTable />
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

function mapStateToProps({ dateRange, requestFields }) {
  return {
    dateRange,
    requestFields
  };
}

export default connect(mapStateToProps)(OrderTotalsPage);
