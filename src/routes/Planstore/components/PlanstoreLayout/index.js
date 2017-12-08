import React from 'react';
import { Layout} from 'antd';
import PlansList from '../../../Plan/components/PlansList';
const { Content, Sider } = Layout;

export const PlanstoreLayout = ({plans, loading, loadMoreEntries}) => (
    <Layout style={{ padding: '24px 0' }}>
        <Sider width={200} style={{ background: '#fff', borderRight:'1px solid' }} breakpoint="xs"
               collapsedWidth="0" >
            filters component here
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <PlansList plans={plans} loading={loading} loadMoreEntries={loadMoreEntries} />
        </Content>
    </Layout>

)

export default PlanstoreLayout