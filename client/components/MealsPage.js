import React, { Component } from "react";
import { Page, Layout, Form, FormLayout, Button } from "@shopify/polaris";
import queryString from "query-string";
import { connect } from "react-redux";
import EditIngredientForm from "./EditIngredientForm";

class MealsPage extends Component {
  state = {
    ingredients: {},
    metafields: {}
  };
  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    // 1515921211490
    if (query.id) {
      this.getMetafields(query.id);
    } else {
      console.error("No meal id found");
    }
  }

  createMetafield = (metafield, productId) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: metafield
    };

    fetch(`/shopify/api/products/${productId}/metafields.json`, fetchOptions)
      .then(response => response.json())
      .then(metafield => {
        console.log(metafield);
        this.setState({ metafields: metafield.metafield });
        this.setState({ ingredients: JSON.parse(metafield.metafield.value) });
        this.setState({ verb: "PUT" });
      })
      .catch(error => console.error(error));
  };

  getMetafields = productId => {
    const fetchOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    fetch(`/shopify/api/products/${productId}/metafields.json`, fetchOptions)
      .then(response => response.json())
      .then(json => {
        const metafields = json.metafields.filter(metafield => {
          return metafield.namespace === "sousChef";
        });

        if (metafields.length > 0) {
          const ingredients = JSON.parse(metafields[0].value);
          this.setState({ metafields: metafields[0] });
          this.setState({ ingredients });
          this.setState({ verb: "PUT" });
        } else {
          this.setState({ verb: "POST" });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  saveMetafield = (productId, metafieldId, metafield) => {
    const fetchOptions = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: metafield
    };

    fetch(
      `/shopify/api/products/${productId}/metafields/${metafieldId}.json`,
      fetchOptions
    )
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => {
        console.error(error);
      });
  };

  handleSubmit = () => {
    const { ingredients, verb } = this.state;
    const query = queryString.parse(this.props.location.search);
    const metafield = {
      metafield: {
        value: JSON.stringify(ingredients),
        value_type: "json_string"
      }
    };

    if (verb === "POST") {
      metafield.metafield["namespace"] = "sousChef";
      metafield.metafield["key"] = "ingredients";
      this.createMetafield(JSON.stringify(metafield), query.id);
    } else {
      const metafieldString = JSON.stringify(metafield);
      const metafieldId = this.state.metafields.id;
      this.saveMetafield(query.id, metafieldId, metafieldString);
    }
  };

  handleClick = () => {
    const { ingredients } = this.state;
    const ingredient = {
      name: "",
      quantity: "",
      measurement: "cups"
    };

    ingredients[`ingredient${Date.now()}`] = ingredient;
    this.setState({ ingredients });
  };

  deleteIngredient = index => {
    const { ingredients } = this.state;
    delete ingredients[index];
    this.setState({ ingredients });
  };

  changeIngredient = (ingredient, index) => {
    const { ingredients } = this.state;
    ingredients[index] = ingredient;
    this.setState({ ingredients });
  };

  renderForm() {
    const { ingredients } = this.state;
    if (ingredients === null) {
      return (
        <React.Fragment>
          <h2>No ingredients found. Please add one.</h2>
          <Button primary onClick={this.handleClick}>
            Add ingredient
          </Button>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {Object.keys(ingredients).map(key => (
          <EditIngredientForm
            key={key}
            index={key}
            ingredient={ingredients[key]}
            changeIngredient={this.changeIngredient}
            deleteIngredient={this.deleteIngredient}
          />
        ))}
        <Button onClick={this.handleClick}>Add ingredient</Button>
        <Button primary submit>
          Save
        </Button>
      </React.Fragment>
    );
  }

  render() {
    const { ingredients } = this.state;

    if (ingredients === null) {
      return <Button onClick={this.handleClick}>Add ingredient item</Button>;
    }

    return (
      <Page title="Meals">
        <Layout>
          <Layout.Section>
            <h2>Edit ingredients for your meal item</h2>
            <Form onSubmit={this.handleSubmit}>
              <FormLayout>{this.renderForm()}</FormLayout>
            </Form>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

function mapStateToProps({ requestInProgress, requestError }) {
  return {
    requestInProgress,
    requestError
  };
}

export default connect(mapStateToProps)(MealsPage);
