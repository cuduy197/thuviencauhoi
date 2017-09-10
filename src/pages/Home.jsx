import React, { Component } from "react";
import { auth_login, auth_logout } from "../redux/actions/auth";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Button, Spin, Icon } from "antd";

class Home extends Component {
  state = {
    loading: false
  };

  call_login = () => {
    this.setState({ loading: true });
    this.props.auth_login();
  };

  render() {
    let islogin = this.props.islogin;
    let userData = this.props.userData;
    let state = this.props; //{state.match.params.id}
    const { location /*,{location.pathname}  match, history*/ } = this.props;

    //HTML
    return (
      <div className="animated fadeInUp">
        {islogin === null ? (
          <div style={{ paddingTop: "5em" }}>
            {" "}
            <Spin tip="Đang tải dữ liệu..." size="large">
              {" "}
            </Spin>{" "}
          </div>
        ) : islogin ? (
          <div className="center">
            <br />
            <h1>
              Chào: <u style={{ color: "purple" }}>{userData.name} </u>{" "}
            </h1>
            <h1>
              {" "}
              chúc bạn một ngày tốt lành{" "}
              <span style={{ color: "green" }} role="img" aria-label="lucky">
                🍀
              </span>
            </h1>
            <br /> <br />
            <h1>bạn muốn ... </h1>
            <br />
            <div>
              <Link to="add/cauhoi">
                {" "}
                <Button icon="edit" type="primary" size="large">
                  Tạo câu hỏi
                </Button>{" "}
              </Link>{" "}
              <br />
              <br />
              <Link to="view">
                {" "}
                <Button icon="sync" type="primary" size="large">
                  Xem, cập nhật câu hỏi
                </Button>{" "}
              </Link>{" "}
              <br />
              <br />
              {/*  <Link to="home">
                {" "}
                <Button icon="solution" type="primary" size="large">
                  Thống kê
                </Button>{" "}
              </Link>{" "} */}
              <br />
              <br />
              <br />
              <br />
              <Button icon="disconnect" onClick={() => state.auth_logout()}>
                Đăng xuất
              </Button>
              <br />
              <br />
            </div>
          </div>
        ) : (
          <div className="center">
            <h1 className="animated flipInX">
              Chào mừng bạn đến <u>Thư viện câu hỏi</u> <br />{" "}
            </h1>
            <br />
            <Button loading={this.state.loading} type="primary" size="large" onClick={this.call_login}>
              Đăng nhập
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      state: state,
      userData: state.user,
      islogin: state.auth.islogin
    }),
    { auth_login, auth_logout }
  )(Home)
);
