const assert = require('assert');
const UserService = require('../services/userService')
const axios = require('axios')

let app, mockgoose
describe('tests', function () {
  before(function(done) {
    const mongoose = require('mongoose');
    var Mockgoose = require('mockgoose').Mockgoose;
    mockgoose = new Mockgoose(mongoose);
    mockgoose.helper.setDbVersion('3.5.5');
    mockgoose.prepareStorage().then(function() {
      app = require('../main')
      app.mongoose.connect('mongodb://example.com/TestingDB', () => {
        done()
      })
    });
  });
  describe('unit test', function () {
    // beforeEach(function (cb) {
    //   mockgoose.helper.reset().then(() => {
    //     cb()
    //   })
    // });
    describe('userInfo unit tests', function(){
      let UserModel, testUserInfo = {}
      before(function(done) {
        UserModel = require('../model/userModel')
        testUserInfo = {
          'name': 'test',
          'pwd': '123',
          'user': '123',
          'sessionKey': 'sessionKeyString'
        }
        let testUser = new UserModel(testUserInfo);
        testUser.save().then(() => {
          done()
        })
      });
      after(function (done) {
        mockgoose.helper.reset().then(() => {
          done()
        })
      })
      it('login with password', function (done) {
        UserService.searchByPwd(testUserInfo.user, testUserInfo.pwd).then((result) => {
          done()
        }).catch((e) => {
          done(e)
        })
      })
      it('login with sessionKey', function (done) {
        done()
      })
      it('refresh sessionKey', function (done) {
        done()
      })
    })
  });
  describe('integrate', function () {
    describe('userInfo unit tests', function(){
      let UserModel, testUserInfo = {}
      before(function(done) {
        UserModel = require('../model/userModel')
        testUserInfo = {
          'name': 'test',
          'pwd': '123',
          'user': '123',
          'sessionKey': 'sessionKeyString'
        }
        let testUser = new UserModel(testUserInfo);
        testUser.save().then(() => {
          done()
        })
      });
      after(function (done) {
        mockgoose.helper.reset().then(() => {
          done()
        })
      })
      it('login with password', function (done) {
        axios({
          method: 'post',
          url: `http://localhost:3000/login`,
          data: {
            user: testUserInfo.user,
            pwd: testUserInfo.pwd
          }
        }).then((res) => {
          assert.equal(res.data.name, testUserInfo.name)
          assert.equal(res.data.user, testUserInfo.user)
          assert(!res.data.pwd)
          assert.notStrictEqual(res.data.sessionKey, testUserInfo.sessionKey)
          done()
        }).catch((err) => {
          console.log(err)
          done(err)
        })
      })
      it('login with sessionKey', function (done) {
        done()
      })
      it('refresh sessionKey', function (done) {
        done()
      })
    })
  });
})
