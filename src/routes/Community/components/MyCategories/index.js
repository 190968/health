/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'
import { Carousel,Form,Card,List,Row,Col  } from 'antd';
import { withApollo, gql } from 'react-apollo'
import '../../style.css';

class MyCategoriesForm extends React.Component{

    constructor(props){
        super(props);
        //console.log(props);
        this.state = {displayedFamily: props};
    }

    onChange = (a, b, c) => {
        console.log(a, b, c);
    }
    render(){
        const {info,loading} = this.props;
        if (loading) {
            return (
                <p>Loading!!!</p>
            );
        }


        console.log(info);


        return(
            <Card
                title="MY CATEGORIES"
            >
                <List
                    split={false}
                    loading={loading}
                    grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 6, xl: 6}}
                    dataSource={info}
                    renderItem={item => (
                        <List.Item key={item.id}>
                                <img alt={item.name}  src={item.thumb.large}/>
                                <div>{item.name}</div>
                        </List.Item>
                    )}
                />

                </Card>
        );
    }

}

const WrappedMyCategoriesForm = Form.create()(MyCategoriesForm);
export default withApollo(WrappedMyCategoriesForm);
