import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Pagination, Button, Radio, Spin } from "antd";
import { store } from "../redux/store.js";
const RadioGroup = Radio.Group;

class ViewQuiz extends Component {
  componentWillMount() {
    document.title = "Danh sách câu hỏi";
    store.dispatch({ type: "FETCH_QUIZ" });
    console.log(this.props);
  }
  componentDidMount() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.body]);
  }
  componentWillReceiveProps(nextProps) {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.body]);
  }

  render() {
    let { data, total } = this.props.quiz;
    let { user } = this.props;
    return (
      <div className="center">
        <RadioGroup name="radiogroup" defaultValue={1}>
          <Radio onClick={() => store.dispatch({ type: "FETCH_QUIZ", mode: "all" })} value={1}>
            Tất cả
          </Radio>
          <Radio onClick={() => store.dispatch({ type: "FETCH_QUIZ", mode: "me" })} value={2}>
            Của bạn
          </Radio>
          <Radio onClick={() => store.dispatch({ type: "FETCH_QUIZ", mode: "custom" })} value={3}>
            Tác giả
          </Radio>
          <Radio onClick={() => store.dispatch({ type: "FETCH_QUIZ", mode: "id" })} value={4}>
            ID
          </Radio>
        </RadioGroup>

        <h2 style={{ marginTop: ".5em" }}>Số câu hỏi thử nghiệm hiện tại là : {total}</h2>
        <br />
        {total > 10 ? (
          <Pagination
            total={total}
            onChange={skip => {
              store.dispatch({ type: "FETCH_QUIZ", skip });
            }}
          />
        ) : null}
        {this.props.quiz.ui.isLoading ? (
          <div>
            <Spin tip="Đang tải dữ dữ liệu" size="large" />
            <br />
          </div>
        ) : null}
        <br />
        {data.length === 0 ? (
          <div>
            <h1>Chưa có dữ liệu!</h1>
          </div>
        ) : (
          data.map(e => (
            <div key={e.id} className="card-quiz animated fadeInUp">
              <Card
                title={
                  <div style={{ float: "left" }}>
                    {" "}
                    <img width="25" height="25" src={e.get("author_photo")} /> {e.get("author")}
                  </div>
                }
                extra={
                  user.id === e.get("author_id") ? (
                    <div>
                      <a
                        onClick={() => {
                          // eslint-disable-next-line
                          window.confirm("Bạn có muốn xóa ?")
                            ? e
                                .destroy()
                                .then(ok => store.dispatch({ type: "DELETE_QUIZ_RESULT", payload: ok }))
                                .catch(e => console.log(e))
                            : undefined;
                        }}>
                        Xóa
                      </a>{" "}
                      {" || "} <Link to={`edit/${e.id}`}>Sửa</Link>
                    </div>
                  ) : null
                }>
                <div>
                  <u> Câu hỏi </u> <div id="show_question" dangerouslySetInnerHTML={{ __html: e.get("question") }} />
                  <br />
                  <u> Đáp án đúng </u> <div dangerouslySetInnerHTML={{ __html: e.get("answer1") }} />
                  <br />
                  <span>Thời gian tạo : {new Date(e.get("createdAt")).toLocaleString()}</span>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default withRouter(connect(state => state)(ViewQuiz));
