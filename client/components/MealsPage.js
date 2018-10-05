import React, { Component } from "react";
import { Page, Layout } from "@shopify/polaris";
import queryString from "query-string";
import { connect } from "react-redux";
import ApiConsole from "./ApiConsole";
import { getMetafields, updateMetafield } from "../actions";

class MealsPage extends Component {
  state = {
    ingredients: null
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const { dispatch, metafields } = this.props;

    const metafield = JSON.stringify({
      metafield: {
        value: JSON.stringify({ steak: "4oz" }),
        value_type: "json_string"
      }
    });

    // Practice if I can do a PUT
    if (query.id) {
      dispatch(updateMetafield(query.id, 4253431562338, metafield));
      dispatch(getMetafields(query.id));
    } else {
      console.error("No meal id found");
    }
  }

  render() {
    return (
      <Page title="Meals">
        <Layout>
          <Layout.Section>
            <h2>Meals page welcome</h2>
            <ApiConsole />
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

function mapStateToProps({ requestInProgress, requestError, metafields }) {
  return {
    requestInProgress,
    requestError,
    metafields
  };
}

export default connect(mapStateToProps)(MealsPage);
