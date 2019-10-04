import React, { Component } from "react";
import { db } from "../config/firebaseConfig";
import { Layout, Card, Button, Row, Select } from "antd";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { storage } from "../config/firebaseConfig";

import { connect } from "react-redux";

const { Option } = Select;
const MySwal = withReactContent(Swal);
const { Content } = Layout;
class deletePhoto extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      name: "cheawon"
    };
  }
  componentDidMount() {
    this._isMounted = true;
    MySwal.fire({
      title: "โหลดภาพอยู่รอแป๊บดิ!!!",
      text: "รูปเยอะอาจจะโหลดนาน",
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        MySwal.showLoading();
      }
    });
    this.fetchAuthFromLocalStorage();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  fetchAuthFromLocalStorage() {
    const data = [];
    db.collection(this.state.name)
      .orderBy("createAt")
      .get()
      .then(querySnapshot => {
        if (this._isMounted) {
          querySnapshot.forEach(async doc => {
            await data.push(
              Object.assign({
                id: doc.id,
                width: NaN,
                thumbnailHeight: NaN,
                thumbnailWidth: NaN,
                marginLeft: 0,
                scaletwidth: NaN,
                vwidth: NaN,
                src: doc.data().src,
                thumbnail: doc.data().thumbnail
              })
            );
            await this.setState({ photos: data });
            await MySwal.close();
          });
        }
      });
  }
  handleOnChange = async (value, event) => {
    await this.setState({ name: value });
    await this.setState({ photos: [] });
    await this.componentDidMount();
  };
  deleteImage = async (src, id) => {
    let imageName0 = src + "";
    let imageName1 = imageName0.split("%2F");
    let imageName2 = imageName1[1].split("?");
    let imageName = imageName2[0];
    let storageRef = storage.ref();
    let desertRef = await storageRef.child(`${this.state.name}/${imageName}`);
    desertRef
      .delete()
      .then(function() {})
      .catch(function(error) {});
    await db
      .collection(this.state.name)
      .doc(id)
      .delete()
      .then(async function() {
        await MySwal.fire({
          type: "success",
          title: "ลบความทรงจำสำเร็จ",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(function(error) {
        MySwal.fire("Error delete document: " + error);
      });
    await this.componentDidMount();
  };
  render() {
    let i = 0;
    let images = this.state.photos.map(image => {
      i = i + 1;
      return (
        <Card.Grid
          key={i}
          style={{ width: "20%", height: 250, textAlign: "center" }}
        >
          <Row>
            <img
              alt="example"
              style={{ width: 150, maxHeight: 200 }}
              src={image.src}
            />
          </Row>
          <Row>
            <Button
              type="link"
              onClick={() =>
                MySwal.fire({
                  title: "ลบภาพความทรงจำภาพนี้เหรอ?",
                  text: "กดตกลงเพื่อลบความทรงจำ!!",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonText: "ตกลง ลบรูปนี้!",
                  cancelButtonText: "ยกเลิก!"
                }).then(result => {
                  if (result.value) {
                    this.deleteImage(image.src, image.id);
                  }
                })
              }
            >
              ลบรูปนี้
            </Button>
          </Row>
        </Card.Grid>
      );
    });
    return (
      <Card>
        <Content>
          <Row>
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
          </Row>
          <Card title={null}>{images}</Card>
        </Content>
      </Card>
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
)(deletePhoto);
