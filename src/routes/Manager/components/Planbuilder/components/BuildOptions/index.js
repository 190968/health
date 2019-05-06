import React from 'react';
import queryString from 'query-string';
import { Layout, Menu, Input, Button, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { BuildOptionsContent } from './containers/OptionsContent';
const { Content, Sider } = Layout;

const BuildOptions = props => {
    let menuItems = [
        { label: <React.Fragment><span>Pricing</span></React.Fragment>, key: 'pricing' },
        { label: <React.Fragment><span>Privacy</span></React.Fragment>, key: 'privacy' },
        { label: <React.Fragment><span>Category</span></React.Fragment>, key: 'category' },
        { label: <React.Fragment><span>Disclaimer</span></React.Fragment>, key: 'disclaimer' },
        { label: <React.Fragment><span>Snapshots</span></React.Fragment>, key: 'snapshots' },
        { label: <React.Fragment><span>Location</span></React.Fragment>, key: 'location' },
        { label: <React.Fragment><span>Gender & Age</span></React.Fragment>, key: 'gender' },
        { label: <React.Fragment><span>Language</span></React.Fragment>, key: 'language' },
        { label: <React.Fragment><span>Ribbons</span></React.Fragment>, key: 'ribbons' },
        { label: <React.Fragment><span>Outcome</span></React.Fragment>, key: 'outcome' },
        { label: <React.Fragment><span>Tags</span></React.Fragment>, key: 'tags' },
        // { label: <React.Fragment><span>Embed</span></React.Fragment>, key: 'embed' },
        { label: <React.Fragment><span>Advanced</span></React.Fragment>, key: 'advanced' },
        { label: <React.Fragment><span>ICD-10 codes</span></React.Fragment>, key: 'icd10Codes' },
    ];
    const {mainUrl, location, updateDetails, plan} = props;
    const {search} = location || {};
    var parsedUrl = queryString.parse(search);
    const {act='pricing'} = parsedUrl || {};
     console.log(props);
    return <Layout style={{ minHeight: '100vh'}}>
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        selectedKeys={[act]}
        style={{ height: '100%' }}
        // onSelect={props.onChange}
      >
      {menuItems.map(menu => {
          return <Menu.Item key={menu.key}><NavLink to={mainUrl + '?act=' + menu.key}>{menu.label}</NavLink></Menu.Item>;
      })}
      </Menu>
    </Sider>
    <Content style={{ padding: 24, minHeight: 280 }}>
        <BuildOptionsContent plan={plan} type={act} updateDetails={updateDetails}  />
    </Content>
    </Layout>
}

export default BuildOptions;