import React, { Component } from 'react'
import { Row, Col, Icon, Input } from 'antd'
import classnames from 'classnames'
import ReactDOM from 'react-dom'

import './quizList.scss'

export default class QuizList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      answer: null
    }
  }
  componentWillMount () {
    if (this.props.quizList.status === 'free') {
      this.jumpTo('/')
    }
  }
  componentWillUpdate (nextProps) {
    let questions = nextProps.quizList.quizList
    let totalCount = questions.length
    for (let i = 0; i < totalCount; i ++) {
      if (questions[i].status === 'unsolve') {
        break
      }
      if (nextProps.quizList.status === 'processing' && i === totalCount - 1) {
        this.props.finishQuiz()
      }
    }
  }
  jumpTo (path) {
    this.props.history.push(path)
  }
  startQuiz (ev) {
    this.props.startQuiz(() => {
      this.countDown()
    })
  }
  countDown () {
    setTimeout(() => {
      if (this.props.quizList.countDown === 0) {
        this.props.finishQuiz()
        return
      }
      if (this.props.history.location.pathname === '/quizList' && this.props.quizList.status === 'processing') {
        this.countDown()
        this.props.countDown()
      }
    }, 1000)
  }
  numberInputChange (e) {
    this.setState({
      answer: e.target.value
    })
  }
  submitQuestion (index, passed) {
    if (this.props.quizList.status !== 'processing') {
      return
    }
    let result = false
    if (this.props.quizList.quizList[index].answer === parseInt(this.state.answer) && !passed) {
      result = true
    }
    let question = Object.assign({}, this.props.quizList.quizList[index], {
      status: 'solved',
      correct: result
    })
    this.setState({
      answer: null
    })
    this.props.submitOne(question)
  }
  render () {
    let question = {}
    let status = this.props.quizList.status
    let questions = this.props.quizList.quizList
    let totalCount = questions.length
    let percent = (1 - this.props.quizList.countDown / (totalCount * 5)) * 100
    let correct = 0
    for (let i = 0; i < totalCount; i ++) {
      if (questions[i].correct) {
        correct += 1
      }
      if (questions[i].status === 'unsolve') {
        question = questions[i]
        correct = 0
        break
      }
      if (i === totalCount - 1) {
        question = questions[totalCount - 1]
      }
    }
    return (
      <div className='quizList'>
        <Row type='flex' justify='space-around'>
          <Col xs={22} sm={10}>
            <button className={classnames('btn btn-blue start-quiz-button', {
              'hide': status !== 'wait'
            })} onClick={this.startQuiz.bind(this)}>
              Start
            </button>
            <div className={classnames('progressbar', {
              'hide': status !== 'processing'
            })}>
              <div style={{width: `${percent}%`}} className='progressbar-bar' />
            </div>
            <button className={classnames('btn btn-blue start-quiz-button', {
              'hide': status !== 'finish'
            })}
            onClick={this.jumpTo.bind(this, '/')}>
              Back To Home
            </button>
            <Row>
              <Col span={24}>
                <div className={classnames('card game-over', {
                  'hide': status !== 'finish'
                })}>
                  <p>Game Over</p>
                  <p>Correct : {correct}/{totalCount}</p>
                </div>
                <div className='card quiz-panel'>
                  <span className='sums-container'>
                    {question && question.question} =
                    <Input
                      ref={(input) => {input && input.focus()}}
                      onPressEnter={this.submitQuestion.bind(this, question.index, false)}
                      className='answer-input vertical-middle'
                      type='number'
                      size="large"
                      value={this.state.answer}
                      onChange={this.numberInputChange.bind(this)} />
                  </span>
                  <button onClick={this.submitQuestion.bind(this, question.index, true)} className='btn btn-red margin-right-10-per'>
                    <Icon type='delete' />
                  </button>
                  <button onClick={this.submitQuestion.bind(this, question.index, false)} className='btn btn-red'>
                    <Icon type='check' />
                  </button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
