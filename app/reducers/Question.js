import axios from 'axios'
import _ from 'lodash'
const config = require('../config/config')
// ------------------------------------
// Constants
// ------------------------------------
const GET_ALL_QUESTION = 'GET_ALL_QUESTION'
// ------------------------------------
// Actions
// ------------------------------------
export const getAllQuestions = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/question`
      }).then((res) => {
        dispatch({
          type: GET_ALL_QUESTION,
          payload: {
            questions: res.data
          }
        })
        resolve(res.data)
      }).catch((e) => {
        console.log(e)
        reject(e)
      })
    })
  }
}
export const upsertQuestion = (question) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/question/upsert`,
        data: {
          question: question
        }
      }).then((res) => {
        dispatch({
          type: GET_ALL_QUESTION,
          payload: {
            questions: res.data
          }
        })
        resolve(res.data)
      }).catch((e) => {
        console.log(e)
        reject(e)
      })
    })
  }
}
export const deleteQuestion = (questionId) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://${config.ums_web.host}:${config.ums_web.port}/question/delete`,
        data: {
          questionId: questionId
        }
      }).then((res) => {
        dispatch({
          type: GET_ALL_QUESTION,
          payload: {
            questions: res.data
          }
        })
        resolve(res.data)
      }).catch((e) => {
        console.log(e)
        reject(e)
      })
    })
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ALL_QUESTION] : (state, action) => {
    return action.payload
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {questions: []}

export default function staticReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
