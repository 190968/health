/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import { Tooltip, Carousel,Form,Card,List,Row,Col  } from 'antd';
import { withApollo, gql } from 'react-apollo'

import { Link } from 'react-router-dom'
import '../../style.css';
import {
    Route,
    Redirect,
} from 'react-router-dom'
class MyCategoriesForm extends React.Component{

    constructor(props){
        super(props);

        this.state = {displayedFamily: props};
    }


    render(){
        const {info,loading} = this.props;
        if (loading) {
            return (
                <p>Loading!!!</p>
            );
        }


      //  console.log(info);


        return(
                    <Card
                        title="Main Categories"
                    >
                        <List
                            split={false}
                            loading={loading}
                            grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 6, xl: 6}}
                            dataSource={info}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                       <Link to={"/community/"+item.id}>
                                           <Card
                                               cover={<img alt={item.name} height={120} src={item.thumb.large}/>}
                                           >
                                               <Tooltip title={item.name}>{item.name.substring(0, 10)}</Tooltip></Card>
                                       </Link>
                                </List.Item>
                            )}
                        />

                        </Card>
        )
    }

}

const WrappedMyCategoriesForm = Form.create()(MyCategoriesForm);
export default withApollo(WrappedMyCategoriesForm);
