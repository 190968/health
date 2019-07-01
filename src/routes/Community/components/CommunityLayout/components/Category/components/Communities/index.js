import React from 'react';
import {Card,List} from 'antd';
import { withApollo } from 'react-apollo'
import {
    injectIntl
} from 'react-intl';
import messages from './listCommunity.json';
import CategoryCard from '../../../CategoryCard';
import { withActiveNetwork } from '../../../../../../../../components/App/app-context.js';
const ListCommunity = props =>{



        const {loading, currentNetwork} = props;
        if (loading) {
            return (
                <Card loading  title="Main Categories">Loading!!!</Card>
            );
        }
        const {intl, name,categories} = props;
        const {networkModuleExists} = currentNetwork;

        const isMcgrawhill = networkModuleExists('is_mcgrawhill');
        const title = isMcgrawhill ? name.toUpperCase()+' Chapters' : name.toUpperCase()+' COMMUNITIES';

        return(
            <Card
                title={title}
            >
                    <List
                        split={false}
                        loading={loading}
                        grid={{gutter: 16, xs: 1, sm: 2, md: 3, lg: 5, xl: 5}}
                        dataSource={categories}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <CategoryCard item={item} />
                            </List.Item>
                        )}
                    />
            </Card>
        );
}
export default withActiveNetwork(withApollo(injectIntl(ListCommunity)));
