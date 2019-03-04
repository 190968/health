import React from 'react'
import { Select as AntdSelect, Spin, Icon } from 'antd';
import PropTypes from 'prop-types';
import { compose, withHandlers, withState, branch, withProps, defaultProps } from 'recompose';
import { withLoadingState } from '../../../Loading';

const { Option, OptGroup } = AntdSelect;

const SelectPure = props => {
    // console.log(props);
    const { i18n, items = [], disableSelect, loading = false, loadingState=false, mode, group, labelInValue, labelFormat, valueFormat, filterOption=false, ...otherProps} = props;
    const { value, disabled=disableSelect } = props;
    let {allowClear} = props;
    if (disabled) {
        allowClear = true;
    }
    let options = [];
    if (group) {
        let groups = [...new Set(items.map(item => item[group]))];

        options = groups.map((groupItem, gi) => {
            const groupItems = items.filter(item => item.type === groupItem);
            const groupOptions = groupItems.map(d => <Option key={valueFormat(d)}>{labelFormat(d)}</Option>);
            return <OptGroup key={gi} label={groupItem}>{groupOptions}</OptGroup>
        });
    } else {
        options = items.map(d => <Option key={valueFormat(d)}>{labelFormat(d)}</Option>);
    }
    // console.log(props, 'value')
    //console.log(value, 'Select value')

    return (<AntdSelect 
        style={{ width: '100%' }}
        {...otherProps}
        showSearch
        allowClear={allowClear}
        disabled={disabled}
        //optionFilterProp="name"
        onSearch={props.handleSearch}
        // onSelect={props.handleSelect}
        onChange={props.handleSelect}
        value={loading ? undefined : value}
        labelInValue={labelInValue}
        filterOption={filterOption}
        mode={mode}
        suffixIcon={loading ? <Icon type={'loading'} /> : null}
        notFoundContent={loadingState ? <Spin size="small" /> : i18n.notFoundContent}
        // filterOption={(input, option) => {
        //     // console.log(option);
        //     return option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0;
        // }}
        placeholder={loading ? 'Loading...' : i18n.placeholder} placement="topRight" >{options}</AntdSelect>)

}


const withFullValue = compose(
    withProps(props => {
        return {
            labelInValue:true,
        };
    }),
    // from object to value
    // withProps(props => {
    //     const { value = {} } = props;
    //     const { id } = value || {};
    //     return { value: id };
    // }),
    withHandlers({
        handleSelect: props => value => {
            const {labelInValue, items, disabled, disableSelect, valueFormat} = props;
            if (disableSelect || disabled) {
                return;
            }
            let option = undefined;
            // console.log(value);
            // console.log(Array.isArray(value));
            if (Array.isArray(value)) {

                option = value.map(v => {
                    let key = v;
                
                    if (labelInValue) {
                        key = v.key || {};
                    }
        
                    return items.find(item => {
                        const formattedItem = valueFormat(item);
                        return formattedItem === key
                    });
                });

            } else {
                let key = value;
                
                if (labelInValue) {
                    key = value.key || {};
                }
    
                option = items.find(item => {
                    const formattedItem = valueFormat(item);
                    return formattedItem === key
                });
                
            }
            console.log(option);
            props.onChange(option);
            props.setValue(value);
        },
    })
)

// const withLabelInValue = compose(
//     // from object to value
//     withProps(props => {
//         console.log(props);
//         // const { value = {} } = props;
//         // const { id } = value || {};
//         // return { value: id };
//     }),
//     withHandlers({
//         handleSelect: props => value => {
//             console.log(props);
//             console.log(value);
//         },
//         onChange: props => value => {
//             console.log(props);
//             console.log(value);
//             // let option = props.items.filter(item => item.id === value);
//             // if (option.length > 0) {
//             //     option = option[0];
//             // } else {
//             //     option = undefined;
//             // }
//             // props.onChange(option);
//         }
//     })
// )

const enhance = compose(
    defaultProps({
        allowClear:true,
        labelInValue:false ,
        disableSelect:false
    }),
    withState('value', 'setValue', props => props.value || undefined),
    withLoadingState,
    withHandlers({
        labelFormat: props => (d) => {
            const {labelFormat} = props;
            return labelFormat ? labelFormat(d) : (d.title || d.name);
        },
        valueFormat: props => (d) => {
            const {valueFormat} = props;
            if (d) {
                //console.log(valueFormat(d));
                return valueFormat ? valueFormat(d) : d.id;
            }
        },

        handleSearch: props => (value) => {
            if (props.doSearch) {
                props.setLoadingState(true);
                props.doSearch(value).then(() => {
                    props.setLoadingState(false);
                });
            }
        },

        handleChange: props => (value) => {
            console.log(value);
        },
        handleSelect: props => (value) => {
            const {disableSelect} = props;
            if (disableSelect) {
                return;
            }
            // if (props.onSelect) {
            //     props.onSelect(value);
            // }
            //console.log(value);
            props.onChange(value);
            props.setValue(value);
        },
        // onChange: props => (value) => {
        //     // console.log(value);
        //     // console.log(option);
        //     props.onChange(value);
        //     props.setValue(value);
        // }
    }),
    // withProps(props => {
    //     let {items} = props;
    //     items = items.map(item=> {
    //         return
    //     })

    //     //return {items: items.map()}
    // }),
    branch(({ getFullInfo = false }) => getFullInfo,
        withFullValue
    )
    // branch(({ labelInValue }) => labelInValue,
    //     withLabelInValue
    // )
);

const Select = enhance(SelectPure);





//  class SelectOld extends React.Component {

//     constructor(props) {
//         super(props);
//         const value = this.props.value || undefined;
//         this.state = {
//             fetching: false,
//             value
//         }
//     };
//     static propTypes = {
//         userId: PropTypes.string,
//         items: PropTypes.arrayOf(PropTypes.object),
//         i18n: PropTypes.shape({
//             placeholder: PropTypes.string,
//             notFoundContent: PropTypes.string
//         }),
//     };
//     static defaultProps = {
//         items: [],
//         i18n: {
//             placeholder: 'Select',
//             notFoundContent: 'Nothing found'
//         }
//     };
//     handleSearch = (value) => {

//         this.setState({
//             //value,
//             fetching: true,
//         });
//         this.props.doSearch(value);
//     };

//     handleSelect = (value) => {
//         this.setState({
//             value
//         });
//         if (this.props.onSelect) {
//             this.props.onSelect(value);
//         }
//     };

//     componentWillReceiveProps = (nextProps) => {
//         if (!nextProps.loading) {

//             if ('value' in nextProps) {
//                 const value = nextProps.value || undefined;
//                 this.setState({value});
//             }
//             this.setState({
//                 fetching: false,
//             });
//         }
//     }

//      onChange = (value, option) => {
//         console.log(value);
//         console.log(option);
//          if (!('value' in this.props)) {
//              this.setState({ value });
//          }
//          this.triggerChange({ value });
//      }

//      triggerChange = (changedValue) => {
//          // Should provide an event to pass value to Form.
//          const onChange = this.props.onChange;
//          if (onChange) {
//              //console.log(Object.assign({}, this.state, changedValue.date));
//              const value = changedValue.value;
//              //const formattedDate = moment(date).format('YYYY-MM-DD');
//              //console.log(this.state);
//              //console.log(Object.assign({}, this.state, changedValue));
//              onChange(value);
//              //const newValue = Object.assign({}, this.state, changedValue);
//              this.setState(changedValue);
//              //onChange(Object.assign({}, this.state, changedValue));
//          }
//      }


//      render() {
//         const {i18n, items=[], loading=false, mode, group} = this.props;
//         const { fetching, value } = this.state;
//         console.log(value);
//         let options = [];
//         if (group) {
//             let groups =  [...new Set(items.map(item => item[group]))];
//             options = items.map(d => <Option key={d.id}>{d.title || d.name}</Option>);



//             options = groups.map((groupItem, gi) => {
//                 const groupItems = items.filter(item => item.type === groupItem);
//                 const groupOptions = groupItems.map(d => <Option key={d.id}>{d.title || d.name}</Option>);
//                 return <OptGroup key={gi} label={groupItem}>{groupOptions}</OptGroup>
//             });
//         } else {
//             options = items.map(d => <Option key={d.id}>{d.title || d.name}</Option>);
//         }

//         return (<AntdSelect showSearch
//                             allowClear
//                             optionFilterProp="name"
//                             onSearch={this.handleSearch}
//                             onSelect={this.handleSelect}
//                             onChange={this.onChange}
//                             value={loading ? undefined : value}
//                             mode={mode}
//                             suffixIcon={loading ? <Icon type={'loading'} /> : null}
//                             notFoundContent={fetching ? <Spin size="small" /> : i18n.notFoundContent}
//                             // filterOption={(input, option) => {
//                             //     // console.log(option);
//                             //     return option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0;
//                             // }}
//                             placeholder={loading ? 'Loading...' : i18n.placeholder} placement="topRight" style={{ width: '100%' }}>{options}</AntdSelect>)
//     }
// }

export default Select;