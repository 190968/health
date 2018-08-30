import React from 'react';
import {Table, Input} from 'antd';
import { withToggleModal } from '../../../../../../components/Modal';
import CalculatorReport from './containers/CalculatorReport';
const Search = Input.Search;


const CalculatorTitlePure = props => {
    const {calculator, showModal, toggleModal} = props;
    return <React.Fragment>
        {showModal && <CalculatorReport calculator={calculator} onHide={toggleModal} />}
        <span onClick={toggleModal}>{calculator.title}</span>
        </React.Fragment>
}

const CalculatorTitle = withToggleModal(CalculatorTitlePure);
const Calculators = props => {
    //console.log(props);
    const {calculators=[], loading} = props;
    // id
    //   title
    //   description
    //   author
    //   variables {
    //     title
    //     id
    //     description
    //     options {
    //       value
    //       label
    //     }
    //   }
     
     
      
      const columns = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: 200,
        render: (title, info) => {
            return <CalculatorTitle calculator={info} />;
        }
      }, {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      }, {
        title: 'Author',
        dataIndex: 'author',
        width: 150,
        key: 'author',
      }];
    return <React.Fragment>
        <Search
      placeholder="Search for calculators"
      onSearch={value => console.log(value)}
      enterButton
      style={{marginBottom: 16}}
    />
    <Table dataSource={calculators} rowKey={'id'} columns={columns} />
    </React.Fragment>
}

export default Calculators;