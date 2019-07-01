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
        const {info,loading, label='Main Categories', slidesToShow=4} = this.props;

        if (loading) {
            return (
                <Card loading title={label}>Loading!!!</Card>
            );
        }
        const { intl } = this.props;
        let categoriesKV = [];
        info.forEach((item)=>{
            categoriesKV.push({value:item.id, text:item.name});
        });

        

        let items = info.map((item) => <div key={item.id}><div style={{padding:5}}><CategoryCard item={item} /></div></div>);
        
        // items = items.slice(1,4);
        const limit = items.length >= slidesToShow ? slidesToShow : items.length;
        return (
            <Card  
            title={label}
            extra={ <Search categories={categoriesKV} label={label} />
            }
            >
                <Carousel
                    items={items}
                    slidesToShow={limit}
                    perLine={slidesToShow}
                     />
            </Card>
        );
    }

}

export default withApollo(injectIntl(MainCategories));
