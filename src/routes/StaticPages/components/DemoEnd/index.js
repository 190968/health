import React from 'react';
import {Modal, Button} from 'antd';

const DemoEnd = props => {
    return <Modal
    title="Thank you for stopping by our demo site!"
    visible={true}
    closable={false}
    maskClosable={false}
    footer={false   }
  >
   <div style={{ marginBottom: 10 }}>
                    <p>This was just a high-level overview of the patient process. To Start engaging with your population, click the button below to Contact Us</p>
                </div>
                <center>
                    <a href="https://www.fitangohealth.com/contact" ><Button type={'primary'} shape={'round'} icon="phone" size={'large'}>Contact Us</Button></a>
                </center>
           
  </Modal>
}

export default DemoEnd;