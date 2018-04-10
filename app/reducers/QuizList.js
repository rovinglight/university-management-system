import Generator from '../service/Generator'
import axios from 'axios'

const generator = new Generator()
// ------------------------------------
// Constants
// ------------------------------------
export const START_QUIZ = 'START_QUIZ'
export const CREATE_QUIZ = 'CREATE_QUIZ'
export const COUNT_DOWN = 'COUNT_DOWN'
export const CLEAR_LIST = 'CLEAR_LIST'
export const SUBMIT_ONE = 'SUBMIT_ONE'
export const FINISH_QUIZ = 'FINISH_QUIZ'
// ------------------------------------
// Actions
// ------------------------------------
export const createQuiz = (count, cb) => {
  return (dispatch, getState) => {
    let quizList = []
    let countDown = count * 5
    for (let i = 0; i < count; i ++) {
      let question = generator.randomExp(10)
      while (generator.problemSolver(question) % 1 !== 0) {
        question = generator.randomExp(10)
      }
      quizList.push({
        index: i,
        question: question,
        status: 'unsolve',
        answer: generator.problemSolver(question),
        correct: true
      })
    }
    dispatch({
      type: CREATE_QUIZ,
      payload: {
        quizList: quizList,
        countDown: countDown,
        status: 'wait'
      }
    })
    cb && cb()
    return
  }
}
export const startQuiz = (cb) => {
  return (dispatch, getState) => {
    dispatch({
      type: START_QUIZ
    })
    cb && cb()
  }
}
export const countDown = () => {
  return (dispatch, getState) => {
    dispatch({
      type: COUNT_DOWN
    })
  }
}
export const clearList = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CLEAR_LIST
    })
  }
}
export const submitOne = (question) => {
  return (dispatch, getState) => {
    dispatch({
      type: SUBMIT_ONE,
      payload: question
    })
  }
}
export const finishQuiz = () => {
  return (dispatch, getState) => {
    let questions = getState().quizList.quizList
    let correct = 0
    let total = questions.length
    questions.forEach((question, index) => {
      if (question.correct) {
        correct += 1
      }
    })
    dispatch({
      type: FINISH_QUIZ,
      payload: {
        total: total,
        correct: correct
      }
    })
    let user = getState().userInfo
    if (user.objectId) {
      axios({
        method: 'post',
        url: 'http://tupulin.com:3000/updateExam',
        headers: {
          'x-userid': user.objectId
        },
        data: {
          total: user.total,
          correct: user.correct
        }
      })
    }
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREATE_QUIZ] : (state, action) => {
    return action.payload
  },
  [START_QUIZ] : (state, action) => {
    return Object.assign({}, state, {
      status: 'processing'
    })
  },
  [COUNT_DOWN] : (state, action) => {
    let countDown = state.countDown
    return Object.assign({}, state, {
      countDown: countDown - 1
    })
  },
  [CLEAR_LIST] : (state, action) => {
    return initialState
  },
  [SUBMIT_ONE] : (state, action) => {
    return {
      ...state,
      quizList: [
        ...state.quizList.slice(0, action.payload.index),
        action.payload,
        ...state.quizList.slice(action.payload.index + 1)
      ]
    }
  },
  [FINISH_QUIZ] : (state, action) => {
    return {
      ...state,
      status: 'finish'
    }
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {status : 'free', quizList: []}

export default function quizListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
