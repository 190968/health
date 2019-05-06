/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react';
import {Card, Cascader  } from 'antd';
import gql from "graphql-tag";
import { withApollo } from 'react-apollo'
class CustomCascader extends React.Component {
    state = {
        options:this.props.items
    };
    // onChange = (value) => {
    //     if(value[2]){
    //         this.props.callback(value[2]);
    //     }
    // }
    // getDerivedStateFromProps = (props, state) => {
    //     console.log(props, 'props');
    //     console.log(state, 'state');
    // }
    componentDidMount = (prevProps) => {
        const {value} = this.props;
        if (value) {
            console.log(value);
            const level2 = value[1];
            // const level3 = value[2];

            this.props.client.query({
                query: gql`
                      query GET_CATEGORY($id:UID) {
                           category(id:$id) {
                                id
                                getChildrenCategories {
                                    id
                                    name
                                    getChildrenCategories {
                                        id
                                        name
                                    }
                                }
                            }
                    }
                `, fetchPolicy: 'network_only',
                variables: {
                    id: level2
                }
            }).then(({data})=>{
                const items = data.category.getChildrenCategories;
                // console.log(items, 'items');
                // const newKeys = { name: "label", id: "value" };
                let childrenObject = items.map((item,i)=>{
                    // childrenObject.push(this.props.renameKeys(item, newKeys));
                    const {name, id, getChildrenCategories=[]} = item;
                    const isLeaf = getChildrenCategories.length === 0;
                    return {label:item.name, value:item.id, isLeaf};
                })
                this.setState({
                    options: [...this.state.options],
                });
            })

        }
        console.log(prevProps, 'prevProps');
        console.log(this.props, 'prevProps');
    }
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        this.props.client.query({
            query: gql`
                  query GET_CATEGORY($id:UID) {
                       category(id:$id) {
                            id
                            getChildrenCategories {
                                id
                                name
                                getChildrenCategories {
                                    id
                                    name
                                }
                            }
                        }
                }
            `, fetchPolicy: 'network_only',
            variables: {
                id: targetOption.value
            }
        }).then(({data})=>{
            targetOption.loading = false;

            const items = data.category.getChildrenCategories;
            // console.log(items, 'items');
            // const newKeys = { name: "label", id: "value" };
            let childrenObject = items.map((item,i)=>{
                // childrenObject.push(this.props.renameKeys(item, newKeys));
                const {name, id, getChildrenCategories=[]} = item;
                const isLeaf = getChildrenCategories.length === 0;
                return {label:item.name, value:item.id, isLeaf};
            })
            targetOption.children = childrenObject;
            this.setState({
                options: [...this.state.options],
            });
        })
    }
    render() {
        const {value} = this.props;
        return (
            <Cascader style={{width: '100%'}} value={value} loadData={this.loadData} options={this.state.options} onChange={this.onChange} changeOnSelect placeholder="Please select"/>
        );
    }
}
export default  withApollo (CustomCascader);

