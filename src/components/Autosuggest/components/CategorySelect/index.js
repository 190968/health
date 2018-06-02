/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react';
import {Card ,Modal } from 'antd';
import {Redirect, Link } from 'react-router-dom';

import CustomCascader from './components/Cascader';

  class CategorySelect extends React.Component {
      state={
          open:false
      }
      renameKeys =(obj, newKeys)=> {
              const keyValues = Object.keys(obj).map(key => {
                  const newKey = newKeys[key] || key;
                  return { [newKey]: obj[key] };
              });
              return Object.assign({isLeaf: false}, ...keyValues);

      }
      handleOk =(data)=> {
              console.log("handleOk");
          this.setState({
              open: !this.state.open
          });

      }
    render() {
        const {items, loading} = this.props;

        if (loading) {
            return <div>Loading...</div>
        }
        const newKeys = { name: "label", id: "value" };
        let renamedObj =[];
        items.forEach((item)=>{
            renamedObj.push(this.renameKeys(item, newKeys));
        })
        console.log(renamedObj);

        return (
            <div>
            {this.state.open && <Redirect to={{pathname: '/community/a485'}} />}
                {!this.state.open &&
                <Modal
                    title="Medical Repository"
                    visible={true}
                    onCancel={this.props.onHide}
                    onOk={this.handleOk}
                    okText="OK"
                >
                    <center><CustomCascader items={renamedObj} renameKeys={this.renameKeys}/></center>
                </Modal>
                }
            </div>
            );
        }
}
export default CategorySelect;
