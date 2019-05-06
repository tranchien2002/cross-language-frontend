import React from 'react';
import { Collapse, Icon } from 'antd';
const Panel = Collapse.Panel;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

const FormDocument = props => {
  // let a = JSON.stringify(props);
  const b = JSON.parse(props)
  return(
    <Collapse 
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
    >
      {b.map( (doc, index) => {
        return(
          <Panel header={doc.title} key= {index + 2} style={customPanelStyle}>
            <p>{doc.content}</p>
          </Panel>
        );
      })}
    </Collapse> 
  );   
};

export default FormDocument;