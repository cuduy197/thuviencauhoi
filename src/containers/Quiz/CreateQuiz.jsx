import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { quiz_add } from "../../redux/actions/quiz";

import Editor from "./Editor.jsx";

import { Button, Tabs, Icon, Popover, Spin, Switch, Row, Col, Card } from "antd";
const TabPane = Tabs.TabPane;

class CreateQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      loading: false,
      quiz: {
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        hint: "",
        slove: "",
        author: window.localStorage.name,
        author_id: window.localStorage.id,
        author_photo: window.localStorage.photoUrl
      },
      title: "Bấm để hiển thị biểu thức toán học",
      check: false
    };
  }

  componentWillMount() {
    console.log(this.props);
    let edit = window.location.pathname.split("/");
    if (edit[1] === "edit") {
      this.setState({ edit: true });
      let id = edit[2];
      document.title = "Cập nhật câu hỏi " + id;
      new Parse.Query(new Parse.Object("cauhoi"))
        .equalTo("objectId", id)
        .first()
        .then(quiz => {
          console.log(quiz);

          let resetQuiz = {
            question: quiz.get("question"),
            answer1: quiz.get("answer1"),
            answer2: quiz.get("answer2"),
            answer3: quiz.get("answer3"),
            answer4: quiz.get("answer4"),
            hint: quiz.get("hint"),
            slove: quiz.get("slove")
          };
          this.setState({ quiz: resetQuiz });

          $(`#question`).froalaEditor("html.set", this.state.quiz.question);

          console.log(this.state);
        })
        .catch(e => console.log(e));
      console.log("EDIT ON!!!!!!");
    }
    if (edit[1] === "add") {
      document.title = "Tạo câu hỏi mới";
    }
  }

  componentDidMount() {
    this.setState({ check: false });
    console.log(this.props);
  }

  componentWillUnmount() {
    document.title = "Thư viện câu hỏi";
  }

  componentWillReceiveProps(nextProps) {
    //nextProps - giá trị props mới khi reducer return!!!!!
    this.setState({ loading: false });

    if (nextProps.state.quiz.done === true) {
      console.log("quiz_add Done!");
      let resetQuiz = {
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        hint: "",
        slove: "",
        author: window.localStorage.name,
        author_id: window.localStorage.id,
        author_photo: window.localStorage.photoUrl
      };
      this.setState({ quiz: { ...this.state.quiz, resetQuiz } });
      for (let i in resetQuiz) {
        $(`#${i}`).froalaEditor("html.set", "");
      }
    }
  }

  onSwitchChange = checked => {
    console.log(`switch to ${checked}`);
    this.setState({ check: checked });
  };

  call_quiz_add = () => {
    console.log("call_quiz_add");
    console.log(this.props);
    let quiz = this.state.quiz;

    this.setState({ loading: true });
    if (this.state.edit) {
      let edit = window.location.pathname.split("/");
      this.props.quiz_add({ quiz, id: edit[2] });
    } else {
      let pathname = this.props.state.router.location.pathname.split("/");
      let monhoc = pathname[2];
      let chude = pathname[3];
      //add quiz
      this.props.quiz_add({ quiz, monhoc, chude });
    }
  };

  call_quiz_update = () => {};

  MathJaxReset(id) {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, id]);
  }

  getQuestionHtml = () => {
    this.MathJaxReset("question_popover");
    this.setState({ quiz: { ...this.state.quiz, question: this.question.getHtml() } });
  };

  getAnswer1Html = () => {
    this.MathJaxReset("answer_popover");
    this.setState({ quiz: { ...this.state.quiz, answer1: this.answer.getHtml() } });
  };
  getAnswer2Html = () => {
    this.MathJaxReset("answer2_popover");
    this.setState({ quiz: { ...this.state.quiz, answer2: this.answer2.getHtml() } });
  };
  getAnswer3Html = () => {
    this.MathJaxReset("answer3_popover");
    this.setState({ quiz: { ...this.state.quiz, answer3: this.answer3.getHtml() } });
  };
  getAnswer4Html = () => {
    this.MathJaxReset("answer4_popover");
    this.setState({ quiz: { ...this.state.quiz, answer4: this.answer4.getHtml() } });
  };

  getHintHtml = () => {
    this.MathJaxReset("hint_popover");
    this.setState({ quiz: { ...this.state.quiz, hint: this.hint.getHtml() } });
  };

  getSloveHtml = () => {
    this.MathJaxReset("slove_popover");
    this.setState({ quiz: { ...this.state.quiz, slove: this.slove.getHtml() } });
  };

  render() {
    let WrapPopoverStyle = {
      textAlign: "center",
      paddingBottom: "1em"
    };

    let quiz = this.state.quiz;
    let check = this.state.check;

    //ReTurn
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          {quiz.question.length > 0 &&
          quiz.answer1.length > 0 &&
          quiz.answer2.length > 0 &&
          quiz.answer3.length > 0 &&
          quiz.answer4.length > 0 ? (
            <Button
              onClick={this.call_quiz_add}
              loading={this.state.loading}
              className="animated fadeInDown"
              icon="edit"
              size="large"
              style={{ backgroundColor: "lightgreen", color: "black" }}>
              {this.state.edit ? "Cập nhật" : "Tạo câu hỏi"}
            </Button>
          ) : (
            <Button
              title="Hãy nhập nội dung câu hỏi và các câu trả lời để tạo câu hỏi"
              className="animated fadeInDown"
              icon="edit"
              size="large"
              type="dashed"
              disabled>
              {this.state.edit ? "Cập nhật" : "Tạo câu hỏi"}
            </Button>
          )}
          <br /> <br />
          <span>Hiển thị công thức toán </span>
          <Switch checked={check} onChange={this.onSwitchChange} />
        </div>

        <div className="padding-container">
          <Tabs
            type="line"
            tabPosition={window.innerWidth > 400 ? "top" : "top"}
            onChange={tabs => {
              if (this.state.edit) {
                switch (Number(tabs)) {
                  case 1:
                    $(`#question`).froalaEditor("html.set", this.state.quiz.question);
                    break;
                  case 2:
                    setTimeout(() => $(`#answer`).froalaEditor("html.set",this.state.quiz.answer1), 345);
                    break;
                  case 3:
                    setTimeout(() => $(`#answer2`).froalaEditor("html.set", this.state.quiz.answer2), 345);
                    break;
                  case 4:
                    setTimeout(() => $(`#answer3`).froalaEditor("html.set", this.state.quiz.answer3), 345);
                    break;
                  case 5:
                    setTimeout(() => $(`#answer4`).froalaEditor("html.set", this.state.quiz.answer4), 345);
                    break;
                  case 6:
                    setTimeout(() => $(`#hint`).froalaEditor("html.set", this.state.quiz.hint), 345);
                    break;
                  case 7:
                    setTimeout(() => $(`#slove`).froalaEditor("html.set", this.state.quiz.slove), 345);
                    break;
                  default:
                    break;
                }
              }
            }}>
            <TabPane tab="Câu hỏi" key="1">
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                  <div
                    style={{ display: check ? "block" : "none", padding: "1em" }}
                    className={check ? "fr-view animated zoomIn" : "fr-view "}
                    id="question_popover"
                    dangerouslySetInnerHTML={{ __html: this.state.quiz.question }}
                  />
                </Col>

                <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                  <div className="animated fadeIn editor" onClick={this.getQuestionHtml} onKeyUp={this.getQuestionHtml}>
                    <Editor
                      ref={r => {
                        this.question = r;
                      }}
                      baseId="question"
                    />
                  </div>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Đáp án đúng" key="2">
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                  <div
                    style={{ display: check ? "block" : "none", padding: "1em" }}
                    className={check ? "fr-view animated zoomIn" : "fr-view "}
                    id="answer_popover"
                    dangerouslySetInnerHTML={{ __html: this.state.quiz.answer1 }}
                  />
                </Col>

                <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                  <div className="animated fadeIn editor" onClick={this.getAnswer1Html} onKeyUp={this.getAnswer1Html}>
                    <Editor
                      ref={r => {
                        this.answer = r;
                      }}
                      baseId="answer"
                    />
                  </div>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Đáp án sai" key="3">
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                  <div
                    style={{ display: check ? "block" : "none", padding: "1em" }}
                    className={check ? "fr-view animated zoomIn" : "fr-view "}
                    id="answer2_popover"
                    dangerouslySetInnerHTML={{ __html: this.state.quiz.answer2 }}
                  />
                </Col>

                <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                  <div className="animated fadeIn editor" onClick={this.getAnswer2Html} onKeyUp={this.getAnswer2Html}>
                    <Editor
                      ref={r => {
                        this.answer2 = r;
                      }}
                      baseId="answer2"
                    />
                  </div>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Đáp án sai 2" key="4">
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                  <div
                    style={{ display: check ? "block" : "none", padding: "1em" }}
                    className={check ? "fr-view animated zoomIn" : "fr-view "}
                    id="answer3_popover"
                    dangerouslySetInnerHTML={{ __html: this.state.quiz.answer3 }}
                  />
                </Col>

                <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                  <div className="animated fadeIn editor" onClick={this.getAnswer3Html} onKeyUp={this.getAnswer3Html}>
                    <Editor
                      ref={r => {
                        this.answer3 = r;
                      }}
                      baseId="answer3"
                    />
                  </div>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Đáp án sai 3" key="5">
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                  <div
                    style={{ display: check ? "block" : "none", padding: "1em" }}
                    className={check ? "fr-view animated zoomIn" : "fr-view "}
                    id="answer4_popover"
                    dangerouslySetInnerHTML={{ __html: this.state.quiz.answer4 }}
                  />
                </Col>

                <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                  <div className="animated fadeIn editor" onClick={this.getAnswer4Html} onKeyUp={this.getAnswer4Html}>
                    <Editor
                      ref={r => {
                        this.answer4 = r;
                      }}
                      baseId="answer4"
                    />
                  </div>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Gợi ý" key="6">
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                  <div
                    style={{ display: check ? "block" : "none", padding: "1em" }}
                    className={check ? "fr-view animated zoomIn" : "fr-view "}
                    id="hint_popover"
                    dangerouslySetInnerHTML={{ __html: this.state.quiz.hint }}
                  />
                </Col>

                <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                  <div className="animated fadeIn editor" onClick={this.getHintHtml} onKeyUp={this.getHintHtml}>
                    <Editor
                      ref={r => {
                        this.hint = r;
                      }}
                      baseId="hint"
                    />
                  </div>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Lời giải" key="7">
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                  <div
                    style={{ display: check ? "block" : "none", padding: "1em" }}
                    className={check ? "fr-view animated zoomIn" : "fr-view "}
                    id="slove_popover"
                    dangerouslySetInnerHTML={{ __html: this.state.quiz.slove }}
                  />
                </Col>

                <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                  <div className="animated fadeIn editor" onClick={this.getSloveHtml} onKeyUp={this.getSloveHtml}>
                    <Editor
                      ref={r => {
                        this.slove = r;
                      }}
                      baseId="slove"
                    />
                  </div>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(state => ({ state }), { quiz_add })(CreateQuiz));
