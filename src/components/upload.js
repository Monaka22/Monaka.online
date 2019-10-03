import React, { Component } from "react";
import { Upload, Icon, Select, Form, Button,Layout,Card } from "antd";
import { storage } from "../config/firebaseConfig";

import {connect} from 'react-redux'

const { Option } = Select;
const { Content } = Layout;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
class uploadPhoto extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      imageUrl: [],
      name: ""
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    const imageUrl = this.state.imageUrl;
    for (let i = 0; i < imageUrl.length; i++) {
      const imageName = Date.now() + ".jpg";
      const uploadTask = storage
        .ref(`${this.state.name}/${imageName}`)
        .putString(imageUrl[i], `data_url`, { contentType: `image/jpg` });
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref(`${this.state.name}`)
            .child(imageName)
            .getDownloadURL()
            .then(async url => {
              console.log(url);
            });
        }
      );
    }
    alert("SAVE PHOTO SUCCESS.")
    this.props.history.push({ pathname: "/" });
  };
  handleOnChange = (value, event) => {
    this.setState({ name: value });
  };
  handleChange = info => {
    if (info.file.status === "uploading") {
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl: this.state.imageUrl.concat(imageUrl)
        })
      );
    }
  };
  render() {
    const { Dragger } = Upload;
    const fileUploadProps = {
      name: "file",
      multiple: true,
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange: this.handleChange
    };
    const tailFormItemLayout = {
      wrapperCol: {
        sm: {
          span: 20,
          offset: 0
        },
        md: {
          span: 16,
          offset: 4
        }
      }
    };
    return (
        <Content>
            <Card>
        <Form style={{ margin: "30px 0 0 0"}} onSubmit={this.handleSubmit}>
          <Form.Item {...tailFormItemLayout}>
            <Select
              onSelect={(value, event) => this.handleOnChange(value, event)}
              style={{ width: 200 }}
              defaultValue="cheawon"
            >
              <Option value="cheawon">cheawon</Option>
              <Option value="ruka">ruka</Option>
              <Option value="fuka">fuka</Option>
              <Option value="manaka">manaka</Option>
              <Option value="suzuka">suzuka</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Dragger {...fileUploadProps}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Upload Photo</p>
            </Dragger>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
        </Card>
      </Content>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoading: state.loading.isLoading
})

const mapDispatchToProps = {
  
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(uploadPhoto);
