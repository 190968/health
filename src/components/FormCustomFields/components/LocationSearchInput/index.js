import React from 'react';
import {AutoComplete, Input} from 'antd';
import ReactDependentScript from 'react-dependent-script';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
 import './index.less';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
 
  handleChange = address => {
    this.setState({ address });
    console.log(this.props);
    this.props.onChange(address);
  };
 
  handleSelect = address => {
    this.handleChange(address);
    geocodeByAddress(address)
      .then(results => {
        const result = results[0] || {};
        getLatLng(result);
      })
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{position:'relative'}}>
            <Input
              {...getInputProps()}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}


const LocationSearchInputLoader = props => {
  return <LocationSearchInput {...props} />;
//   return <ReactDependentScript
//   loadingComponent={<div>Loading Google API...</div>}
//   scripts={['https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyAG0WyqoIv3vN7sR7EDvNRmB9Kbm5SK--o&libraries=places']}
// >
  
// </ReactDependentScript>
}
export default LocationSearchInputLoader;