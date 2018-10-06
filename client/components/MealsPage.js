import React, { Component } from "react";
import { Page, Layout, Form, FormLayout, TextField } from "@shopify/polaris";
import queryString from "query-string";
import { connect } from "react-redux";
import EditIngredientForm from "./EditIngredientForm";
import { getMetafields, updateMetafield } from "../actions";

class MealsPage extends Component {
  state = {
    ingredients: {
      ingredient1: {
        name: "chicken",
        value: 4,
        measurement_unit: "oz"
      },
      ingredient2: {
        name: "romaine lettuce",
        value: 2,
        measurement_unit: "cups"
      }
    }
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const { dispatch, metafields } = this.props;

    const metafield = JSON.stringify({
      metafield: {
        value: JSON.stringify({
          steak: "4oz",
          chicken: "12oz",
          "romaine lettuce": "1 cup"
        }),
        value_type: "json_string"
      }
    });

    // Practice if I can do a PUT
    if (query.id) {
      //dispatch(updateMetafield(query.id, 4253431562338, metafield));
      //dispatch(getMetafields(query.id));
    } else {
      console.error("No meal id found");
    }
  }

  handleSubmit = () => {};

  handleChange = () => {};

  render() {
    const ingredients = this.state.ingredients;

    return (
      <Page title="Meals">
        <Layout>
          <Layout.Section>
            <h2>Meals page welcome</h2>

            <Form onSubmit={this.handleSubmit}>
              <FormLayout>
                {Object.keys(ingredients).map(key => (
                  <EditIngredientForm
                    key={key}
                    index={key}
                    ingredient={ingredients[key]}
                  />
                ))}
              </FormLayout>
            </Form>
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
