import React, { Component } from "react";
import { Upload, Icon, Select, Form, Button, Layout, Card } from "antd";
import { storage } from "../config/firebaseConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { connect } from "react-redux";

const MySwal = withReactContent(Swal);
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
      name: "cheawon"
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    MySwal.fire({
      title: 'อัพโหลดรูปภาพ.',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        MySwal.showLoading();
      }
    })
    const imageUrl = this.state.imageUrl;
    let back = () =>  this.props.history.push({ pathname: "/" });
    const imageUrlArray = []
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
              await imageUrlArray.push(url)
              if(i >= imageUrl.length-1){
                (async function wait() {
                  if ( imageUrlArray.length === imageUrl.length ) {
                    await MySwal.fire(
                      'เพิ่มรูปภาพแห่งความทรงจำ!!!',
                      'You clicked the button!',
                      'success'
                    )
                   await back(); 
                  }
                })();
              }
            });
        }
      );
    }
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
      action: "https://asia-east2-ice-suppliers-dev.cloudfunctions.net/upload",
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
          <Form style={{ margin: "30px 0 0 0" }} onSubmit={this.handleSubmit}>
            <Form.Item {...tailFormItemLayout}>
              <Select
                onSelect={(value, event) => this.handleOnChange(value, event)}
                style={{ width: 200 }}
                defaultValue="cheawon"
              >
                <Option value="cheawon">cheawon</Option>
                <Option value="ruka">ruka</Option>
                <Option value="fuka">yiren</Option>
                <Option value="manaka">manaka</Option>
                <Option value="suzuka">itzy</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Dragger {...fileUploadProps}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">เพิ่มไฟล์รูป</p>
              </Dragger>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                บันทึก
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    );
  }
}
const mapStateToProps = state => ({
  isLoading: state.loading.isLoading
});

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(uploadPhoto);
