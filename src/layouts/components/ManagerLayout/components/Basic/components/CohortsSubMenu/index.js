import React from 'react';
import {Menu} from 'antd';
import {NavLink} from 'react-router-dom';
import Loading from '../../../../../../../components/Loading';
const SubMenu = Menu.SubMenu;

const CohortsSubMenuPure =props => {
    const {cohorts=[], total=0, key, title, refetch, loading, doSearch, ...otherProps} = props;
    return <SubMenu key={'cohorts'} title={title} {...otherProps}>
    <Menu.Item key="cohorts/create"><NavLink to="/cohorts/create"> Create</NavLink></Menu.Item>
    {loading && <Menu.Item key={'cohr_loading'}><Loading /></Menu.Item> }
    {cohorts.map(cohort => {
        return <Menu.Item key={"cohorts/view/"+cohort.id}><NavLink to={"/cohorts/view/"+cohort.id}> {cohort.title}</NavLink></Menu.Item>
    })}
    
</SubMenu>
}
export default CohortsSubMenuPure;