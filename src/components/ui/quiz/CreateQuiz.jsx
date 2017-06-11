import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { add_quiz } from '../../../redux/actions/quiz';

import Editor from './Editor.jsx';

import { Button, Tabs, Icon, Popover, Spin } from 'antd';
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

        this.ADD_QUIZ = this.ADD_QUIZ.bind(this);
        this.state = {
            loading: false,
            done: false,
            quiz: {
                question: '',
                answer: '',
                answer2: '',
                answer3: '',
                answer4: '',
                hint: '',
                slove: '',
                author: ''
            }
        }
    }

    componentDidMount() {
        //console.log(this.props.state.router.location.pathname);
    }

    ADD_QUIZ() {
        console.log('add_quiz action!');
        this.setState({ loading: true });

        let quiz = this.state.quiz;
        let pathname = this.props.state.router.location.pathname.split('/');
        let monhoc = pathname[2];
        let chude = pathname[3]
            //add quiz
        this.props.add_quiz({ quiz, monhoc, chude });

    }
    componentWillReceiveProps(nextProps) {
        //nextProps - giá trị props mới khi reducer return!!!!!
        this.setState({ quiz: {...this.state.quiz, author: nextProps.state.user.userData.name } })
            //Set author

        this.setState({ loading: this.props.state.quiz.loading })

        let resetQuiz = {
            question: '',
            answer: '',
            answer2: '',
            answer3: '',
            answer4: '',
            hint: '',
            slove: '',
            author: nextProps.state.user.userData.name
        }

        console.log(nextProps.state.quiz.done);
        console.log(nextProps);
        if (nextProps.state.quiz.done === true) {
            console.log('Done!');
            this.setState({ quiz: resetQuiz })
            for (let i in resetQuiz) {
                $(`#${i}`).froalaEditor('html.set', '');
            }
        }
    }

    getQuestionHtml() {
        this.setState({ quiz: {...this.state.quiz, question: this.question.getHtml() } })
    }

    getAnswerHtml() {
        this.setState({ quiz: {...this.state.quiz, answer: this.answer.getHtml() } })
    }
    getAnswer2Html() {
        this.setState({ quiz: {...this.state.quiz, answer2: this.answer2.getHtml() } })
    }
    getAnswer3Html() {
        this.setState({ quiz: {...this.state.quiz, answer3: this.answer3.getHtml() } })
    }
    getAnswer4Html() {
        this.setState({ quiz: {...this.state.quiz, answer4: this.answer4.getHtml() } })
    }

    getHintHtml() {
        this.setState({ quiz: {...this.state.quiz, hint: this.hint.getHtml() } })
    }

    getSloveHtml() {
        this.setState({ quiz: {...this.state.quiz, slove: this.slove.getHtml() } })
    }

    render() {

        function PreviewBtn(props) {
            return null
        }
        let PopoverStyle = {
            textAlign: 'center',
            paddingBottom: '1em'
        }

        let quiz = this.state.quiz;

        //ReTurn
        return (
            <div>

				<div style={{ textAlign: 'center' }}>
				{process.env.NODE_ENV === "development"&& <div>
				<Button  onClick={this.ADD_QUIZ}
				loading={this.state.loading} 
				className="animated fadeInDown" icon="edit" 
				size="large"  type="primary">Tạo câu hỏi (TEST) </Button> 
				<br/> <br/>  
				</div>}

					{quiz.question.length > 0 && quiz.answer.length > 0 
						&& quiz.answer2.length > 0 && quiz.answer3.length >
						 0 && quiz.answer4.length > 0
						?
						<Button onClick={this.ADD_QUIZ}
						loading={this.state.loading}
						className="animated fadeInDown" icon="edit" size="large" 
						style={{ backgroundColor: 'lightgreen', color: 'black' }}>Tạo câu hỏi</Button> 
						: 
				  <Button title="Hãy nhập nội dung câu hỏi và các câu trả lời để tạo câu hỏi"
				  className="animated fadeInDown"
				   icon="edit" size="large"  type="dashed" disabled>Tạo câu hỏi</Button>}
				</div>
				<div className="padding-container">
					<Tabs type="line" defaultActiveKey="1">
						<TabPane tab={<span><Icon type="question" />Câu hỏi</span>} key="1">


							<div style={PopoverStyle}>{this.state.quiz.question.length > 0 ?
								<Popover placement='bottom' content={<div id='question_popover'
									dangerouslySetInnerHTML={{ __html: this.state.quiz.question }} />} >
									<Button className="animated fadeInUp" 
									onMouseOver={this.getQuestionHtml}
										type="primary" icon="search">Xem trước</Button></Popover> :
								<PreviewBtn />}</div>

							<div onClick={this.getQuestionHtml} onKeyUp={this.getQuestionHtml}  >
								<Editor ref={r => { this.question = r; }} baseId="question" />
							</div>
						</TabPane>

						<TabPane tab={<span><Icon type="check" />Đáp án đúng</span>} key="2">

							<div style={PopoverStyle}>{this.state.quiz.answer.length > 0 ?
								<Popover placement='bottom' content={<div id='answer_popover'
									dangerouslySetInnerHTML={{ __html: this.state.quiz.answer }} />} >
									<Button className="animated fadeInUp" onMouseOver={this.getAnswerHtml}
										type="primary" icon="search">Xem trước</Button></Popover> :
								<PreviewBtn />}</div>

							<div onClick={this.getAnswerHtml} onKeyUp={this.getAnswerHtml}  >
								<Editor ref={r => { this.answer = r; }} baseId="answer" />
							</div>
						</TabPane>

						<TabPane tab={<span><Icon type="close" />Đáp án sai</span>} key="3">

							<div style={PopoverStyle}>{this.state.quiz.answer2.length > 0 ?
								<Popover placement='bottom' content={<div id='answer2_popover'
									dangerouslySetInnerHTML={{ __html: this.state.quiz.answer2 }} />} >
									<Button className="animated fadeInUp" onMouseOver={this.getAnswer2Html}
										type="primary" icon="search">Xem trước</Button></Popover> :
								<PreviewBtn />}</div>

							<div onClick={this.getAnswer2Html} onKeyUp={this.getAnswer2Html}  >
								<Editor ref={r => { this.answer2 = r; }} baseId="answer2" />
							</div>
						</TabPane>

						<TabPane tab={<span><Icon type="close" />Đáp án sai 2</span>} key="4">
							<div style={PopoverStyle}>{this.state.quiz.answer3.length > 0 ?
								<Popover placement='bottom' content={<div id='answer3_popover'
									dangerouslySetInnerHTML={{ __html: this.state.quiz.answer3 }} />} >
									<Button className="animated fadeInUp" onMouseOver={this.getAnswer3Html}
										type="primary" icon="search">Xem trước</Button></Popover> :
								<PreviewBtn />}</div>

							<div onClick={this.getAnswer3Html} onKeyUp={this.getAnswer3Html}  >
								<Editor ref={r => { this.answer3 = r; }} baseId="answer3" />
							</div>
						</TabPane>

						<TabPane tab={<span><Icon type="close" />Đáp án sai 3</span>} key="5">
							<div style={PopoverStyle}>{this.state.quiz.answer4.length > 0 ?
								<Popover placement='bottom' content={<div id='answer4_popover'
									dangerouslySetInnerHTML={{ __html: this.state.quiz.answer4 }} />} >
									<Button className="animated fadeInUp" onMouseOver={this.getAnswer4Html}
										type="primary" icon="search">Xem trước</Button></Popover> :
								<PreviewBtn />}</div>

							<div onClick={this.getAnswer4Html}  onKeyUp={this.getAnswer4Html}  >
								<Editor ref={r => { this.answer4 = r; }} baseId="answer4" />
							</div>
						</TabPane>

						<TabPane tab={<span><Icon type="bulb" />Gợi ý</span>} key="6">

							<div style={PopoverStyle}>{this.state.quiz.hint.length > 0 ?
								<Popover placement='bottom' content={<div id='hint_popover'
									dangerouslySetInnerHTML={{ __html: this.state.quiz.hint }} />} >
									<Button className="animated fadeInUp" onMouseOver={this.getHintHtml}
										type="primary" icon="search">Xem trước</Button></Popover> :
								<PreviewBtn />}</div>


							<div onClick={this.getHintHtml} onKeyUp={this.getHintHtml}  >
								<Editor ref={r => { this.hint = r; }} baseId="hint" />
							</div>
						</TabPane>

						<TabPane tab={<span><Icon type="book" />Lời giải</span>} key="7">

							<div style={PopoverStyle}>{this.state.quiz.slove.length > 0 ?
								<Popover placement='bottom' content={<div id='slove_popover'
									dangerouslySetInnerHTML={{ __html: this.state.quiz.slove }} />} >
									<Button className="animated fadeInUp" onMouseOver={this.getSloveHtml}
										type="primary" icon="search">Xem trước</Button></Popover> :
								<PreviewBtn />}</div>

							<div onClick={this.getSloveHtml} onKeyUp={this.getSloveHtml}  >
								<Editor ref={r => { this.slove = r; }} baseId="slove" />
							</div>
						</TabPane>
					</Tabs>
				</div>
			</div>
        );
    }

}

export default withRouter(
    connect(
        state => ({ state }), { add_quiz }
    )(CreateQuiz))
