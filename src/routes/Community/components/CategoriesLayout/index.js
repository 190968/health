/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import { Card, Tooltip,Form,List } from 'antd';
import { withApollo, gql } from 'react-apollo'
import MyCommutinies from '../../containers/myCommunities.js'
import MainCategories from './components/MainCategories'
import { Link } from 'react-router-dom'
import '../../style.css';
class MyCategories extends React.Component{

    constructor(props){
        super(props);
    }


    render(){
        const {info,loading} = this.props;
        if (loading) {
            return (
                <Card loading  title="Main Categories">Loading!!!</Card>
            );
        }


        return(


                    <div>
                        <MyCommutinies />
                        <MainCategories info={info} />
                        </div>
        )
    }

}

const WrappedMyCategories = Form.create()(MyCategories);
export default withApollo(WrappedMyCategories);
