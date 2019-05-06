import React, {Component} from 'react';
import { Input, Button, Form, Radio, Row, Col} from 'antd';
import 'antd/dist/antd.css'; 
import axios from 'axios';
import FormDocument from '../Components/FormDocument'

import { Select } from 'antd';
const Option = Select.Option;

 
class FormInput extends Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
      document: "",
      docsEng: ""
    };
  }

  handleChange = (value) => {
    console.log(value);
  }

  handleChangeDocument = (e) => {
    this.setState({document: e.target.value})
    this.setState({docsEng: ""})
  }

  handleSubmit = async (e) => {
    let res = await axios.post('http://localhost:5000/cross_languages/plagiarism_lsh', {
      document: this.state.document
    })
    this.setState({docsEng: res.data.docs})
    
  }
  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
  }
  render() {
    const { TextArea } = Input;
    return (
      <Row gutter={8}>
        <Col span={8} offset={1}>
          <Form layout='horizontal'>
            <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="jack">MinHash</Option>
              <Option value="lucy">Matrix vector</Option>
            </Select>
            <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="jack">Top 1</Option>
              <Option value="lucy">Top 3</Option>
              <Option value="Yiminghe">Top 5</Option>
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
    );
  }
}

export default FormInput;