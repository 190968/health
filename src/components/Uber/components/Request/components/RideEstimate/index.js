import React from 'react';
import {List} from 'antd';
import DescriptionList from '../../../../../Layout/DescriptionList';

const fakeData = {
  "fare": {
    "value": 4.32,
    "fare_id": "d67b07577b3c86fd23e483d50c84e5152e550b6abb03cece4fc3793c0c068f2e",
    "expires_at": 1477285210,
    "display": "$4.32",
    "currency_code": "USD"
  },
  "trip": {
    "distance_unit": "mile",
    "duration_estimate": 600,
    "distance_estimate": 2.39
  },
  "pickup_estimate": 4
}

  const UberRideEstimate = props => {
    const data = fakeData;

    const {fare, trip, pickup_estimate} = data || {};
    const {display} = fare || {};
    const {distance_estimate, duration_estimate} = trip || {};
    let details = [
      ['Fare', display],
      ['Pick up', pickup_estimate+ ' mins'],
      ['Distance', distance_estimate+' mile'],
      ['Total Time', duration_estimate/60+' mins'],
  ]

  return <List
  itemLayout="horizontal"
  size={'small'}
  dataSource={details}
  renderItem={detail => {
      const label = detail[0];
      const value = detail[1];
      return  <List.Item key={label}>
      <List.Item.Meta
      title={label}
      description={value}
      />
  </List.Item>;
  }}
/>
    return <DescriptionList details={details}/>;
   
}

export default UberRideEstimate;