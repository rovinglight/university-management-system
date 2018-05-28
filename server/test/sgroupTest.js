let app
describe('tests', function () {
  // before(function(done) {
  //   const mongoose = require('mongoose');
  //   var Mockgoose = require('mockgoose').Mockgoose;
  //   mockgoose = new Mockgoose(mongoose);
  //   mockgoose.helper.setDbVersion('3.5.5');
  //   mockgoose.prepareStorage().then(function() {
  //     app = require('../main')
  //   }).catch((e) => console.log(e));
  // });
  // beforeEach(function (cb) {
  //   mockgoose.helper.reset().then(() => {
  //     cb()
  //   })
  // });
  describe('unit', function () {
    describe('userInfo unit tests', function(){
      // before(function(done) {
      //   let UserModel = require('../model/')
      // });
      it('login with password', function (done) {
        done()
      })
      it('login with sessionKey', function (done) {
        done()
      })
      it('refresh sessionKey', function (done) {
        done()
      })
    })
    describe('student group unit tests', function(){
      // before(function(done) {
      //   let UserModel = require('../model/')
      // });
      it('get all student group info', function (done) {
        done()
      })
      it('apply for student group', function (done) {
        done()
      })
      it('delete members', function (done) {
        done()
      })
    })
  })
  describe('integration', function () {
    describe('userInfo integration test', function(){
      it('login with password', function (done) {
        done()
      })
      it('login with sessionKey', function (done) {
        done()
      })
    })
    describe('student group integration test', function(){
      it('get all student group info', function (done) {
        done()
      })
      it('apply for student group', function (done) {
        done()
      })
      it('delete members', function (done) {
        done()
      })
    })
  })
})
