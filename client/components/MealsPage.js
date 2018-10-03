import React, { Component } from "react";
import { Page, Layout } from "@shopify/polaris";
import queryString from "query-string";
import { connect } from 'react-redux';
import ApiConsole from "./ApiConsole";

class MealsPage extends Component {
  state = {
    ingredients: null
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const { dispatch, requestFields } = this.props;

    // const fetchOptions = {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   credentials: "include"
    // };

    // const fetchOptionsUpdate = {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   credentials: "include",
    //   body: {
    //     "metafield": {
    //       "value": "4oz",
    //       "value_type": "string"
    //     }
    //   }
    // };

    // fetch(
    //   "/shopify/api/products/1515921211490/metafields/4253431562338.json",
    //   fetchOptionsUpdate
    // )
    //   .then(response => response.json())
    //   .then(object => {
    //     console.log(object);
    //   });

    // fetch(`/shopify/api/products/${query.id}/metafields.json`, fetchOptions)
    //   .then(response => response.json())
    //   .then(object => {
    //     const ingredientMetafield = object.metafields.filter(
    //       metafield => metafield.namespace === "bemorefit"
    //     );
    //     console.log(ingredientMetafield);
    //     const ingredients = JSON.parse(ingredientMetafield[0].value);
    //     console.log(ingredients);
    //     this.setState({ ingredients });
    //   });
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

function mapStateToProps({
  requestFields,
  requestInProgress,
  requestError,
  responseBody,
}) {
  return {
    requestFields,
    requestInProgress,
    requestError,
    responseBody,
  };
}

export default connect(mapStateToProps)(MealsPage);
