import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Input, Col, Select } from 'antd';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import { CountrySelect } from '../../../Autosuggest/containers/CountrySelect';
import { StateSelect } from '../../../Autosuggest/containers/StateSelect';

const InputGroup = Input.Group;
const Option = Select.Option;

const AddressFieldPure = props => {

    const { states=[], disabled=false } = props;
    const { line1, line2, country, city, state, zipcode } = props || {};
    const {id:countryId} = country || {};
    const isUS = countryId === 'MQ';
    return (
        <React.Fragment>
            <Input value={line1} disabled={disabled} onChange={props.handleLine1} placeholder={'Line 1'} />
            <Input value={line2} disabled={disabled} onChange={props.handleLine2} placeholder={'Line 1'} />
            <InputGroup >
                <Col span={12}>
                    <CountrySelect value={country} disableSelect={disabled} onChange={props.handleCountry} placeholder={'Country'} style={{ width: '100%' }} />
                </Col>
                <Col span={12}>
                    <StateSelect value={state} disableSelect={disabled} onChange={props.handleState} placeholder={'State'} style={{ width: '100%' }} />
                </Col>
                
            </InputGroup>
            <InputGroup>
                <Col span={16}>
                    <Input value={city} disabled={disabled} onChange={props.handleCity} placeholder={'City'} />
                </Col>
                <Col span={8}>
                    <Input value={zipcode} disabled={disabled} onChange={props.handleZipcode} placeholder={'Zipcode'} />
                </Col>
            </InputGroup>
        </React.Fragment>
    );
}

// class AddressFormPure extends React.Component{
//     static defaultProps = {
//         required:false,
//         address: {line1:'', line2:'',country:'',city:'', state:'', zipcode:''}
//     }

//     toggleStates = (e) => {
//         if (e === 'MQ') {
//             // if this is states
//         }
//     }


//     render(){

//     }
// }


export const prepareAddressInput = value => {
    // console.log(value);
    const {country, state, ...address} = value;
    const {id:countryId} = country || {};
    const {id:stateId} = state || {};
    return {...address, countryId, stateId};
}

const addressFieldValidator  = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  }

// const countriesStatesQuery = gql`
//    query getCountries {
//         staticContent {
//             countries {
//                 id
//                 name
//                 phoneCode
//             }
//             states {
//                 id
//                 name
//             }
//         }
//     }
// `;


// const withQuery = graphql(countriesStatesQuery,
//     {
//         props: ({ ownProps, data }) => {
//             if (!data.loading) {
//                 return {
//                     ...ownProps,
//                     countries: data.staticContent.countries,
//                     states: data.staticContent.states,
//                     loading: data.loading,
//                 }

//             } else {
//                 return { ...ownProps, loading: data.loading, countries: [], states: [] }
//             }
//         },
//     }
// );



const enhance = compose(
    withHandlers({
        triggerChange: props => (value) => {
            const onChange = props.onChange;
            if (onChange) {
                // const {country, state, ...otherValue} = value;
                // const {id:countryId} = country || {};
                // const {id:stateId} = state || {};
                onChange(value);
            }
        },
        toggleStates: props => (countryId) => {
            if (countryId === 'MQ') {
                //             // if this is states
            }
        }
    }),
    withStateHandlers(props => {
        const {value} = props;
        const {line1, line2,country, city, state, zipcode} = value || {};
        return {
            line1, line2, country, city, state, zipcode
        };
    }, {
        handleLine1: (state, props) => (e) => {
            const line1 = e.target.value;
            const newAddress = {...state, line1};
            props.triggerChange(newAddress);
            return newAddress
        },
        handleLine2: (state, props) => (e) => {
            const line2 = e.target.value;
            const newAddress = {...state, line2};
            props.triggerChange(newAddress);
            return newAddress
        },
        handleCountry: (state, props) => (country) => {
            const newAddress = {...state, country};
            props.triggerChange(newAddress);
            props.toggleStates(country);
            return newAddress
        },
        handleCity: (state, props) => (e) => {
            const city = e.target.value;
            const newAddress = {...state, city};
            props.triggerChange(newAddress);
            return newAddress
        },
        handleState: (state, props) => (st) => {
            const newAddress = {...state, state:st};
            props.triggerChange(newAddress);
            return newAddress
        },

        handleZipcode: (state, props) => (e) => {
            const zipcode = e.target.value;
            const newAddress = {...state, zipcode};
            props.triggerChange(newAddress);
            return newAddress
        }
    }),
   // withQuery,
     
)


export const AddressField = enhance(AddressFieldPure);
export default AddressField;