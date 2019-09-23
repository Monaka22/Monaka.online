import React, { Component } from 'react'
import Gallery from "react-grid-gallery";
import { Layout,Card } from "antd";
import { db } from "../config/firebaseConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const { Content } = Layout;
export default class manakaComponent extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    };
  }
  componentDidMount() {
    this._isMounted = true;
    MySwal.showLoading();
    this.fetchAuthFromLocalStorage();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  fetchAuthFromLocalStorage() {
    const data = [];
    db.collection("manaka")
    .orderBy('createAt')
      .get()
      .then(querySnapshot => {
        if (this._isMounted) {
          querySnapshot.forEach(async doc => {
           await data.push(
              Object.assign({
                thumbnailWidth:NaN,
                marginLeft: 0,
                scaletwidth: NaN,
                vwidth: NaN,
                src: doc.data().src,
                thumbnail: doc.data().src
              })
            );
            await this.setState({ photos: data });
            await MySwal.close();
          });
        }
      });
  }
  render() {
    return (
      <Card>
        <Content>
          <Gallery images={this.state.photos}/>
        </Content>
      </Card>
    );
  }
}


