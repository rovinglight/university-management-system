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
    describe('competition unit tests', function(){
      // before(function(done) {
      //   let UserModel = require('../model/')
      // });
      it('get all competitions info', function (done) {
        done()
      })
      it('upsert competition', function (done) {
        done()
      })
      it('remove competition', function (done) {
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
    describe('competition integration test', function(){
      it('get all competitions info', function (done) {
        done()
      })
      it('upsert competition', function (done) {
        done()
      })
      it('remove competition', function (done) {
        done()
      })
    })
  })
})
