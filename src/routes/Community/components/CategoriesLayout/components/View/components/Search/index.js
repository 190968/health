/**
 * Created by Pavel on 10.01.2018.
 */

import React, { PropTypes } from 'react';
import { Card,Form,AutoComplete ,Input } from 'antd';
import apolloClient from '../../../../../../../../clients/apolloClient';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import '../../../../../../style.css';

class Search extends React.Component{

    constructor(props) {
        super(props);

    }


    onChange = (value) => {
        this.props.loadMoreEntries(value)

    };



    render(){
        const {items,loading} = this.props;

        return(
            <div>
                <AutoComplete
                    dataSource={items}
                    placeholder="Search Community"
                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    onChange = {this.onChange}
                />
            </div>
        );
    }

}

const WrappedSearch = Form.create()(Search);
export default withApollo(WrappedSearch);
