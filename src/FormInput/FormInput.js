import React, {Component} from 'react';
import { Input, Button, Form, Radio, Row, Col} from 'antd';
import 'antd/dist/antd.css'; 
import axios from 'axios';
import FormDocument from '../Components/FormDocument'

import { Select } from 'antd';
const Option = Select.Option;

const nStyle = {
  margin: '30px'
}

class FormInput extends Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
      document: "",
      docsEng: "",
      type: "lsh",
      top: "1"
    };
  }

  handleChangeTop = (e) => {
    this.setState({top: e})
  }

  handleChangeType = (e) => {
    console.log("type", e)
    this.setState({type: e})
  }

  handleChangeDocument = (e) => {
    this.setState({document: e.target.value})
    this.setState({docsEng: ""})
  }

  handleSubmit = async (e) => {
    let type = this.state.type
    let res = await axios.post('http://localhost:5000/cross_languages/plagiarism_' + type, {
      document: this.state.document,
      top: this.state.top
    })
    this.setState({docsEng: res.data.docs})
    
  }
  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
  }

  render() {
    const { TextArea } = Input;
    return (
      <div className="navibar" style={nStyle}>
        <Row gutter={8}>
          <Col span={8} offset={1}>
            <Form layout='horizontal'>
              <Select defaultValue="lsh" style={{ width: 120 }} onChange={this.handleChangeType} value={this.state.type}>
                <Option value="lsh">MinHash</Option>
                <Option value="matrix">Matrix vector</Option>
              </Select>
              <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChangeTop} value={this.state.top}>
                <Option value="1">Top 1</Option>
                <Option value="3">Top 3</Option>
                <Option value="5">Top 5</Option>
              </Select>
              <Form.Item label="Document: ">
                <TextArea rows={20} onChange={this.handleChangeDocument}></TextArea>
              </Form.Item>
              <Form.Item >
                <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12} offset={2}>
            {this.state.docsEng != "" ? (FormDocument(this.state.docsEng)) : null }
          </Col>
        </Row>
      </div>
    );
  }
}

export default FormInput;