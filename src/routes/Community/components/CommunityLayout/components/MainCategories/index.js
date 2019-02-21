/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react';
import { Card,List } from 'antd';
import { withApollo } from 'react-apollo'
import Search from  '../Category/containers/Search.js';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
import CategoryCard from '../CategoryCard';
import { Carousel } from '../../../../../../components/UI/Carousel/index.js';

class MainCategories extends React.Component{



    render(){
        const {info,loading} = this.props;

        if (loading) {
            return (
                <Card loading  title="Main Categories">Loading!!!</Card>
            );
        }
        const { intl } = this.props;
        let categoriesKV = [];
        info.forEach((item)=>{
            categoriesKV.push({value:item.id, text:item.name});
        });


        const items = info.map((item) => <div key={item.id}><div style={{padding:5}}><CategoryCard item={item} /></div></div>);
        return (
            <Card  
            title={intl.formatMessage(messages.title)}
            extra={ <Search categories={categoriesKV} />
            }
            >
                <Carousel
                    items={items}
                    slidesToShow={4}
                     />
            </Card>
        );
    }

}

export default withApollo(injectIntl(MainCategories));
