import React, { Component } from "react";
import { Page, Layout, Button } from "@shopify/polaris";
import { connect } from "react-redux";
import { sendRequest } from "../actions";

import OrderTotalsTable from "./OrderTotalsTable";
import DatePopover from "./DatePopover";

class OrderTotalsPage extends Component {
  handleClick = () => {
    const { dispatch, requestFields } = this.props;
    dispatch(sendRequest(requestFields));
  };

  componentDidMount() {
    this.handleClick();
  }

  render() {
    return (
      <Page>
        <Layout>
          <Layout.Section>
            Total meals ordered on <DatePopover /> or after.{" "}
            <Button primary onClick={this.handleClick}>
              Get orders
            </Button>
          </Layout.Section>
          <Layout.Section>
            <OrderTotalsTable />
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

function mapStateToProps({ requestFields }) {
  return {
    requestFields
  };
}

export default connect(mapStateToProps)(OrderTotalsPage);
