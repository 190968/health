/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import { Card,Breadcrumb, Tooltip,Form,List } from 'antd';
import { Route } from 'react-router-dom'
import { withApollo, gql } from 'react-apollo'
import {withRouter} from "react-router-dom";
import MyCommutinies from '../../containers/myCommunities.js'
import MainCategories from './components/MainCategories'
import { Link } from 'react-router-dom'
import '../../style.css';
import Loadable from '../../../../components/Loadable';

class MyCategories extends React.Component{

    constructor(props){
        super(props);
    }


    render(){
        const {info,loading} = this.props;
        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }
            console.log(this.props);
        return(


                    <div>
                        {/*<Breadcrumb routes={routes} params={params} />*/}
                        <MyCommutinies />
                        <MainCategories info={info} />
                    </div>
        )
    }

}

const WrappedMyCategories = Form.create()(MyCategories);
export default withApollo(withRouter(WrappedMyCategories));
