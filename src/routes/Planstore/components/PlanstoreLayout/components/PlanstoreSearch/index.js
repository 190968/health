import React from 'react';
import {Card, Input} from 'antd';
import { compose, withHandlers, withState } from 'recompose';

const PlanstoreSearch = props => {
    const {handleSearch, search, onChange} = props;
    return <div style={{marginBottom: 24}}>
    <Card bordered={false} type={'pure'} >
        <Input.Search
        placeholder={'Search'}
        onChange={onChange}
        onSearch={handleSearch}
            value={search}
            // enterButton
        />
    </Card>
</div>;
}

const enhance = compose(
   // withState('search', 'setSearch', props=>props.search),
    withHandlers({
        handleSearch: props => (value) => {
            // console.log(e.target.value);
            // const value = e.target.value;
            props.handleSearch(value);
            // props.setSearch(value);
        },
        onChange: props => (e) => {
            props.handleSearch(e.target.value);
        }
    })
)
export default enhance(PlanstoreSearch);