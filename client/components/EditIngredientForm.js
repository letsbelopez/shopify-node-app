import React, { Component } from "react";
import { Button, TextField, Select, Stack } from "@shopify/polaris";

class EditIngredientForm extends Component {
  handleChange = field => {
    return value => {
      const updated = {
        ...this.props.ingredient,
        [field]: value
      };

      this.props.changeIngredient(updated, this.props.index);
    };
  };

  handleDelete = () => {
    this.props.deleteIngredient(this.props.index);
  };

  render() {
    const { ingredient } = this.props;

    const options = [
      { label: "cups", value: "cups" },
      { label: "grams", value: "grams" },
      { label: "oz", value: "oz" }
    ];
    return (
      <Stack alignment="center">
        <TextField
          value={ingredient.name}
          name="name"
          onChange={this.handleChange("name")}
          label="Name"
          type="text"
        />
        <TextField
          value={ingredient.quantity}
          name="quantity"
          onChange={this.handleChange("quantity")}
          label="Quantity"
          type="text"
        />
        <Select
          label="Measurement"
          options={options}
          onChange={this.handleChange("measurement")}
          value={ingredient.measurement}
        />
        <Button destructive onClick={this.handleDelete}>
          X
        </Button>
      </Stack>
    );
  }
}

export default EditIngredientForm;
