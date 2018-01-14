import React from 'react';
import { TextRow, RectShape} from 'react-placeholder/lib/placeholders';
import {Layout,Card} from 'antd';

import PlanstoreSider from './components/Sider/containers'
import PlanstoreContent from './components/Content/containers'


const { Content, Sider } = Layout;




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
            return (<Layout style={{padding: '24px 0'}}>
                <Sider width={200} style={{background: 'transparent'}} breakpoint="xs"
                       collapsedWidth="0">
                    <Card loading>Loading</Card>
                    <Card loading>Loading</Card>
                </Sider>
                <Content style={{padding: '0 24px', minHeight: 280}}><Card loading>Loading</Card></Content>
            </Layout>);
        }

        return (
            <Layout style={{padding: '24px 0'}}>
                <PlanstoreSider loading={loading}  />
                <PlanstoreContent loading={loading} />
            </Layout>)
        }
}

export default PlanstoreLayout