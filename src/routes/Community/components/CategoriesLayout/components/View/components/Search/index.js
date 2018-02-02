/**
 * Created by Pavel on 10.01.2018.
 */

import React, { PropTypes } from 'react';
import { Icon, Card,Form,AutoComplete ,Input } from 'antd';
import apolloClient from '../../../../../../../../clients/apolloClient';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import '../../../../../../style.css';
import {
    withRouter
} from 'react-router-dom'
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import messages from './search.json';
class Search extends React.PureComponent{

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);

    }


    onChange = (value) => {

        //console.log(value);
        if (!this.props.loading)
        this.props.loadMoreEntries(value)
    };

    onSelect(value) {
        // redirect to the proper category
        //console.log(this.props);
        this.props.history.push('/community/'+value)
    }



    render(){
        const {items,intl,loading} = this.props;
        return(
            <div>
                <AutoComplete
                    dataSource={items}
                    allowClear={true}
                    placeholder={intl.formatMessage(messages.search)}
                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    onSearch = {this.onChange}
                    onSelect = {this.onSelect}
                >
                    <Input suffix={<Icon type="search" className="certain-category-icon" />} />

                </AutoComplete>
            </div>
        );
    }

}

const WrappedSearch = Form.create()(Search);
export default withApollo(withRouter(injectIntl(WrappedSearch)));
