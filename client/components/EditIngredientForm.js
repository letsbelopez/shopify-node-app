import React, { Component } from "react";
import { TextField } from "@shopify/polaris";

class EditIngredientForm extends Component {
  handleChange = () => {};

  render() {
    const { ingredient, index } = this.props.ingredient;

    return (
      <React.Fragment>
        <TextField
          value="Chicken"
          name="name"
          onChange={this.handleChange}
          label="Item"
          type="text"
        />
        <TextField
          value="4 oz"
          name="value"
          onChange={this.handleChange}
          label="Quantity"
          type="text"
        />
        <TextField
          value="oz"
          name="measurement_unit"
          onChange={this.handleChange}
          label="Measurement"
          type="text"
        />
      </React.Fragment>
    );
  }
}

export default EditIngredientForm;
