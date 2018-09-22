import React, { Component } from 'react'
import {
  Card,
  ResourceList,
  TextStyle,
  Avatar,
} from '@shopify/polaris';

const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

const customers = [
  {
    id: 341,
    url: 'customers/341',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
  },
  {
    id: 256,
    url: 'customers/256',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
  },
]

class Customer extends Component {
  render () {
    return (
      <Card>
        <ResourceList 
          resourceName={resourceName} 
          items={customers} 
          renderItem={item => {
            const { id, url, name, location } = item;
            const media = <Avatar customer size="medium" name={name} />;
            return (
              <ResourceList.Item id={id} url={url} media={media} accessibilityLabel={`View details for ${name}`} >
                <h3><TextStyle variation="strong">{name}</TextStyle></h3>
                <div>{location}</div>
              </ResourceList.Item>
            );
          }
        }>

        </ResourceList>
      </Card>
    );
  }
}

export default Customer