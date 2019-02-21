import React from 'react';
import {} from 'antd';
import {
    Layout, Menu, Input, Button, Divider
  } from 'antd';
 
import CohortView from './containers/View';
import Loading, { EmptyList } from '../../../../components/Loading';
import SearchField from '../../../../components/FormCustomFields/components/SearchField';

const Search = Input.Search;

const {
   Content, Sider,
} = Layout;

const CohortsPure = props => {
    console.log(props);
        const {cohorts=[], loading, ...otherProps} = props;

        const {params} = props.match || {};
        let {id:cohortId} = params || {};
        if (!cohortId) {
            // find very first item
            if (cohorts.length > 0) {
                const cohort = cohorts[0];
                cohortId = cohort.id || null;
            }
        } else {
            if (cohorts.length > 0) {
                // find if cohort exists
                const cohFromUrl = cohorts.find(c =>c.id === cohortId);
                if (!cohFromUrl) {
                        // const cohort = cohorts[0];
                        // cohortId = cohort.id || null;
                    cohortId = null;
                }
            }
        }
        // console.log(cohortId);
    return <Layout style={{ minHeight: '100vh'}}>
    <Sider width={200} style={{ background: '#fff' }}>
        <div style={{padding:10, textAlign:'center'}}>
            <Button type="dashed" icon={'plus'} onClick={props.createCohort}>Create Cohort</Button>
        </div>
        <div style={{padding:10, textAlign:'center'}}>
        <SearchField
      placeholder="Search cohort"
      onChange={props.doSearch}
    //   style={{ width: 100 }}
    />
    </div>
    <Divider style={{marginTop:0}} />
    {/* <Button type="dashed" icon={'plus'} onClick={props.createCohort}>Create Cohort</Button> */}
    {/* </Divider> */}
      <Menu
        mode="inline"
        selectedKeys={[cohortId]}
        style={{ height: '100%' }}
        onSelect={props.onChange}
      >
      {cohorts.map(cohort => {
          return <Menu.Item key={cohort.id}>{cohort.title}</Menu.Item>;
      })}
      </Menu>
      {loading && <Loading />}
    </Sider>
    <Content style={{ padding: '0', minHeight: 280 }}>

      {(!loading && cohortId) && <CohortView cohort={{id:cohortId}} {...otherProps} />}
      {(!loading && !cohortId) && <EmptyList>Please Select Cohort</EmptyList>}
    </Content>
  </Layout>;
}
// const CohortsPure = props => {
//     const {cohorts=[], total=0, activeFilters, updateFilters, resetActiveFilters} = props;
//     // console.log(activeFilters, 'activeFilters');
//     return  <PageHeaderLayout title={'Cohorts ' + (total > 0 ? ' (' + total + ')' : '')}
//     content=""
//     // action={actions}
//     >
//     <Card >
//     <CohortsHeaderFilter activeFilters={activeFilters} cohorts={cohorts} total={total} onChange={updateFilters} onReset={resetActiveFilters} />
//     </Card>
//     <Card type="table">
//         <PatientsList simple activeFilters={activeFilters} />
//     </Card>
// </PageHeaderLayout>;
// }

export default CohortsPure;