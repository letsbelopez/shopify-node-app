import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, DataTable, Spinner } from "@shopify/polaris";

class OrderTotalsTable extends Component {
  onSort = (headingIndex, direction) => {
    const orders = this.props.responseBody;
    if (direction === "ascending") {
      orders.sort((a, b) => {
        if (a[headingIndex] < b[headingIndex]) {
          return -1;
        }
        if (a[headingIndex] > b[headingIndex]) {
          return 1;
        }
        return 0;
      });
    } else {
      orders.sort((a, b) => {
        if (a[headingIndex] < b[headingIndex]) {
          return 1;
        }
        if (a[headingIndex] > b[headingIndex]) {
          return -1;
        }
        return 0;
      });
    }
  };

  renderTable() {
    const orders = this.props.responseBody;

    const totalProducts = orders.reduce((total, row) => {
      return (total += row[1]);
    }, 0);

    return (
      <DataTable
        columnContentTypes={["text", "numeric"]}
        headings={["Meal", "Quantity"]}
        sortable={[true, true]}
        defaultSortDirection="descending"
        onSort={this.onSort}
        rows={orders}
        totals={["", totalProducts]}
        footerContent="by David Lopez"
      />
    );
  }

  render() {
    const orders = this.props.responseBody;
    const requestInProgress = this.props.requestInProgress;

    if (requestInProgress) {
      return (
        <Card sectioned>
          <div style={{ textAlign: "center" }}>
            <Spinner size="large" color="teal" accessibilityLabel="loading" />
          </div>
        </Card>
      );
    }

    if (orders === "" || orders.length <= 0) {
      return (
        <React.Fragment>
          <Card title="No meals found" sectioned>
            <p>Try selecting or changing the date</p>
          </Card>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Card>{this.renderTable()}</Card>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ requestInProgress, responseBody }) {
  return {
    requestInProgress,
    responseBody
  };
}

export default connect(mapStateToProps)(OrderTotalsTable);
