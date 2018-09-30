import React, { Component } from "react";
import { Page, Layout } from "@shopify/polaris";
import queryString from "query-string";

class MealsPage extends Component {
  state = {
    mealId: null
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    this.setState({ mealId: query.Id });

    const fetchOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    fetch(`/shopify/api/products/${query.id}/metafields.json`, fetchOptions)
      .then(response => response.json())
      .then(json => console.log(json));
  }

  render() {
    return (
      <Page title="Meals">
        <Layout>
          <Layout.Section>
            <h2>Meals page welcome</h2>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

export default MealsPage;
