import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import {Layout,Button, List,Collapse} from 'antd';

import Sider from './components/Sider/containers'
import Content from './components/Content/containers'
import PlanWidget from '../../../Plan/components/Plan';

const Panel = Collapse.Panel;




export class PlanstoreLayout extends React.Component {

    constructor(props){
        super(props);
    }

    changePage = (page) => {
        this.props.loadMoreEntries(page)
    }




    render() {
        const planPlaceholder = [];
        for(var i=0; i<8; i++) {
            planPlaceholder.push(  {
                item:   <div style={{width: 200, height: 100 }} className='my-awesome-placeholder'>
                    <RectShape color='#E0E0E0'  style={{width: 200, height: 100}}/>
                    <RectShape color='white'  style={{width: 200, height: 50}}/>
                </div>
            })
        }

        const siderPlaceholder = [];
        for(var i=0; i<4; i++) {
            siderPlaceholder.push(  {
                item:   <div  className='my-awesome-placeholder'>
                <RectShape color='#888888'  style={{width: 199, height: 20}}/>
        <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
        <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
        <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
        <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
        </div>
            })
        }

        const {loading} = this.props;

        if (loading) {
            return ('<div>Loading</div>');
        }

        return (
            <Layout style={{padding: '24px 0'}}>
                <Sider loading={loading}  />
                <Content loading={loading} />
            </Layout>)
        }
}

export default PlanstoreLayout