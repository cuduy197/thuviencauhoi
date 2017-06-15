import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { quiz_add } from '../../redux/actions/quiz';

import Editor from './Editor.jsx';

import { Button, Tabs, Icon, Popover, Spin, Switch, Row, Col, Card } from 'antd';
const TabPane = Tabs.TabPane;

class CreateQuiz extends Component {

    constructor(props) {
        super(props);

        this.getQuestionHtml = this.getQuestionHtml.bind(this);
        this.getAnswerHtml = this.getAnswerHtml.bind(this);
        this.getAnswer2Html = this.getAnswer2Html.bind(this);
        this.getAnswer3Html = this.getAnswer3Html.bind(this);
        this.getAnswer4Html = this.getAnswer4Html.bind(this);
        this.getHintHtml = this.getHintHtml.bind(this);
        this.getSloveHtml = this.getSloveHtml.bind(this);
        this.onSwitchChange = this.onSwitchChange.bind(this);

        this.call_quiz_add = this.call_quiz_add.bind(this);
        this.state = {
            loading: false,
            quiz: {
                question: '',
                answer: '',
                answer2: '',
                answer3: '',
                answer4: '',
                hint: '',
                slove: '',
                author: '',
                author_id: ''
            },
            title: 'Bấm để hiển thị biểu thức toán học',
            check: false
        }
    }

    componentDidMount() {

        this.setState({ check: false })

    }

    componentWillReceiveProps(nextProps) {

        /*if (!nextProps.state.auth.islogin) {
            window.location.href = '/'
        }*/
        //nextProps - giá trị props mới khi reducer return!!!!!
        this.setState({ loading: false })
        this.setState({ quiz: {...this.state.quiz, author: nextProps.state.user.name, author_id: nextProps.state.user.id } })
            //Set author
            //console.log(nextProps.state.quiz.done);
            //console.log(nextProps);
        if (nextProps.state.quiz.done === true) {
            console.log('quiz_add Done!');
            let resetQuiz = {
                question: '',
                answer: '',
                answer2: '',
                answer3: '',
                answer4: '',
                hint: '',
                slove: '',
                author: nextProps.state.user.name
            }
            this.setState({ quiz: resetQuiz })
            for (let i in resetQuiz) {
                $(`#${i}`).froalaEditor('html.set', '');
            }
        }
    }

    onSwitchChange(checked) {
        console.log(`switch to ${checked}`);
        this.setState({ check: checked })
    }

    call_quiz_add() {
        console.log('call_quiz_add');

        this.setState({ loading: true });

        let quiz = this.state.quiz;
        let pathname = this.props.state.router.location.pathname.split('/');
        let monhoc = pathname[2];
        let chude = pathname[3]
            //add quiz
        this.props.quiz_add({ quiz, monhoc, chude });

    }

    MathJaxReset(id) { MathJax.Hub.Queue(["Typeset", MathJax.Hub, id]); }

    getQuestionHtml() {
        this.MathJaxReset('question_popover');
        this.setState({ quiz: {...this.state.quiz, question: this.question.getHtml() } })
    }

    getAnswerHtml() {
        this.MathJaxReset('answer_popover');
        this.setState({ quiz: {...this.state.quiz, answer: this.answer.getHtml() } })
    }
    getAnswer2Html() {
        this.MathJaxReset('answer2_popover');
        this.setState({ quiz: {...this.state.quiz, answer2: this.answer2.getHtml() } })
    }
    getAnswer3Html() {
        this.MathJaxReset('answer3_popover');
        this.setState({ quiz: {...this.state.quiz, answer3: this.answer3.getHtml() } })
    }
    getAnswer4Html() {
        this.MathJaxReset('answer4_popover');
        this.setState({ quiz: {...this.state.quiz, answer4: this.answer4.getHtml() } })
    }

    getHintHtml() {
        this.MathJaxReset('hint_popover');
        this.setState({ quiz: {...this.state.quiz, hint: this.hint.getHtml() } })
    }

    getSloveHtml() {
        this.MathJaxReset('slove_popover');
        this.setState({ quiz: {...this.state.quiz, slove: this.slove.getHtml() } })
    }

    render() {

        let WrapPopoverStyle = {
            textAlign: 'center',
            paddingBottom: '1em'
        }

        let quiz = this.state.quiz;
        let check = this.state.check;

        //ReTurn
        return (
            <div>

                <div style={{ textAlign: 'center' }}>
                {process.env.NODE_ENV === "development2"&& <div>
                <Button  onClick={this.call_quiz_add}
                loading={this.state.loading} 
                className="animated fadeInDown" icon="edit" 
                size="large"  type="primary">Tạo câu hỏi (TEST) </Button> 
                <br/> <br/>  
                </div>}

                    {quiz.question.length > 0 && quiz.answer.length > 0 
                        && quiz.answer2.length > 0 && quiz.answer3.length >
                         0 && quiz.answer4.length > 0
                        ?
                        <Button onClick={this.call_quiz_add}
                        loading={this.state.loading}
                        className="animated fadeInDown" icon="edit" size="large" 
                        style={{ backgroundColor: 'lightgreen', color: 'black' }}>Tạo câu hỏi</Button> 
                        : 
                  <Button title="Hãy nhập nội dung câu hỏi và các câu trả lời để tạo câu hỏi"
                  className="animated fadeInDown"
                   icon="edit" size="large"  type="dashed" disabled>Tạo câu hỏi</Button>}
                   <br/> <br/>
                        <span>Hiển thị công thức toán </span> 
                             <Switch checked={check} onChange={this.onSwitchChange} />
                </div>



                <div className="padding-container">
                    <Tabs type="line" defaultActiveKey="1" >


                        <TabPane tab={<span><Icon type="question" />Câu hỏi</span>} key="1">
                            <Row>
                            <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                            <div style={{display: check ? 'block' : 'none', padding: '1em'}}
                            className={check ? 'fr-view animated zoomIn': 'fr-view '} 
                            id='question_popover' dangerouslySetInnerHTML={{ __html: this.state.quiz.question }} /> 
                            </Col>

                            <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24  }}>
                            <div onClick={this.getQuestionHtml} onKeyUp={this.getQuestionHtml}  >
                            <Editor ref={r => { this.question = r; }} baseId="question" /></div>
                            </Col>
                            </Row>
                        </TabPane>



                        <TabPane tab={<span><Icon type="check" />Đáp án đúng</span>} key="2">
                            <Row>
                            <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                            <div style={{display: check ? 'block' : 'none', padding: '1em'}}
                            className={check ? 'fr-view animated zoomIn': 'fr-view '} 
                            id='answer_popover' dangerouslySetInnerHTML={{ __html: this.state.quiz.answer }} /> 
                            </Col>

                            <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24  }}>
                            <div onClick={this.getAnswerHtml} onKeyUp={this.getAnswerHtml}  >
                                <Editor ref={r => { this.answer = r; }} baseId="answer" />
                            </div>
                            </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab={<span><Icon type="close" />Đáp án sai</span>} key="3">
                        <Row>
                            <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                            <div style={{display: check ? 'block' : 'none', padding: '1em'}}
                            className={check ? 'fr-view animated zoomIn': 'fr-view '} 
                            id='answer2_popover' dangerouslySetInnerHTML={{ __html: this.state.quiz.answer2 }} /> 
                            </Col>

                            <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24  }}>
                            <div onClick={this.getAnswer2Html} onKeyUp={this.getAnswer2Html}  >
                                <Editor ref={r => { this.answer2 = r; }} baseId="answer2" />
                            </div>
                            </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab={<span><Icon type="close" />Đáp án sai 2</span>} key="4">
                        <Row>
                            <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                            <div style={{display: check ? 'block' : 'none', padding: '1em'}}
                            className={check ? 'fr-view animated zoomIn': 'fr-view '} 
                            id='answer3_popover' dangerouslySetInnerHTML={{ __html: this.state.quiz.answer3 }} /> 
                            </Col>

                            <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24  }}>
                            <div onClick={this.getAnswer3Html} onKeyUp={this.getAnswer3Html}  >
                                <Editor ref={r => { this.answer3 = r; }} baseId="answer3" />
                            </div>
                            </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab={<span><Icon type="close" />Đáp án sai 3</span>} key="5">
                        <Row>
                            <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                            <div style={{display: check ? 'block' : 'none', padding: '1em'}}
                            className={check ? 'fr-view animated zoomIn': 'fr-view '} 
                            id='answer4_popover' dangerouslySetInnerHTML={{ __html: this.state.quiz.answer4 }} /> 
                            </Col>

                            <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24  }}>
                            <div onClick={this.getAnswer4Html} onKeyUp={this.getAnswer4Html}  >
                                <Editor ref={r => { this.answer4 = r; }} baseId="answer4" />
                            </div>
                            </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab={<span><Icon type="bulb" />Gợi ý</span>} key="6">
                        <Row>
                            <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                            <div style={{display: check ? 'block' : 'none', padding: '1em'}}
                            className={check ? 'fr-view animated zoomIn': 'fr-view '} 
                            id='hint_popover' dangerouslySetInnerHTML={{ __html: this.state.quiz.hint }} /> 
                            </Col>

                            <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24  }}>
                            <div onClick={this.getHintHtml} onKeyUp={this.getHintHtml}  >
                                <Editor ref={r => { this.hint = r; }} baseId="hint" />
                            </div>
                            </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab={<span><Icon type="book" />Lời giải</span>} key="7">
                        <Row>
                            <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24 }}>
                            <div style={{display: check ? 'block' : 'none', padding: '1em'}}
                            className={check ? 'fr-view animated zoomIn': 'fr-view '} 
                            id='slove_popover' dangerouslySetInnerHTML={{ __html: this.state.quiz.slove }} /> 
                            </Col>

                            <Col sm={{ span: 24 }} lg={{ span: check ? 12 : 24  }}>
                            <div onClick={this.getSloveHtml} onKeyUp={this.getSloveHtml}  >
                                <Editor ref={r => { this.slove = r; }} baseId="slove" />
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

export default withRouter(
    connect(
        state => ({ state }), { quiz_add }
    )(CreateQuiz))
