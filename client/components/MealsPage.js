import React, { Component } from 'react';
import { Page, Layout } from '@shopify/polaris';
import queryString from 'query-string';


class MealsPage extends Component {
  state = {
    mealId: null
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search)
      this.setState( {mealId: query.Id } );
  }

  render() {
    return (
      <Page title="Meals" >
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