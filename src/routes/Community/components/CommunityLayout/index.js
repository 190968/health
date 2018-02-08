/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import { Card} from 'antd';
import { withApollo, gql } from 'react-apollo'
import {withRouter} from "react-router-dom";
import MyCommutinies from '../../containers/MyCategories.js'
import MainCategories from './components/MainCategories'
import '../../style.css';

class CommunityLayout extends React.Component{

    render(){
        const {info,loading} = this.props;
        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
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

export default withApollo(withRouter(CommunityLayout));
