import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, List, Avatar, Modal, Divider, Input, message, Select, Popconfirm } from 'antd'
import classnames from 'classnames'
import authService from '../../service/authService'
const { TextArea } = Input
const Option = Select.Option

import './Competitions.scss'

export default class Competitions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cpModal: {
        show: false,
        loading: false,
        fields: {}
      }
    }
  }
  jumpTo (path) {
    this.props.history.push(path)
  }
  toggleCpModal (competition = {}) {
    let cpModal = _.cloneDeep(this.state.cpModal)
    cpModal.fields = competition
    cpModal.show = !cpModal.show
    this.setState({cpModal})
  }
  handleChange (path, result) {
    if (_.get(result, 'target')) {
      result = result.target.value
    }
    let newState = _.cloneDeep(this.state)
    _.set(newState, path, result)
    this.setState(newState)
  }
  submitCpModal () {
    let cpModal = _.cloneDeep(this.state.cpModal)
    let competition = cpModal.fields
    cpModal.loading = true
    this.setState({cpModal})
    this.props.upsertCompetition(competition).then((result) => {
      let newCpModal = _.cloneDeep(this.state.cpModal)
      _.assign(newCpModal, {show: false, loading: false, fields: {}})
      this.setState({cpModal: newCpModal})
      message.success('提交成功')
    }).catch((e) => {
      let newCpModal = _.cloneDeep(this.state.cpModal)
      newCpModal.loading = false
      this.setState({cpModal: newCpModal})
      message.error('提交失败')
    })
  }
  removeCompetition (competitionId) {
    this.props.removeCompetition(competitionId).then((result) => {
      message.success('删除成功')
    }).catch((e) => {
      message.error('删除失败')
    })
  }
  render () {
    console.log(this.state)
    let userAuths = _.get(this.props, 'userInfo.auth')
    let isAuthorized = authService.isAuthorized(userAuths)
    let competitions = _.get(this.props, 'competitions.competitions')
    let firstClassCompetitions = _.filter(competitions, {grade: 'first'})
    let cpModal = _.get(this.state, 'cpModal')
    return (
      <div className="competitions">
        <Row className="page-title">
          <Col>
            <h1>全部竞赛</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                一级学科竞赛
                <Button
                  className={classnames('float-right vertical-middle', {
                    hide: !isAuthorized([])
                  })}
                  shape="circle"
                  icon='plus'
                  onClick={this.toggleCpModal.bind(this, {grade: 'first'})}
                  size='large' />
              </h2>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={firstClassCompetitions}
                renderItem={item => (
                  <List.Item
                    style={{'textAlign': 'left'}}
                    key={item.title}
                    actions={[
                      <Popconfirm
                        title="确定要删除该赛事？"
                        onConfirm={this.removeCompetition.bind(this, item._id)}
                        okText="删除"
                        cancelText="放弃">
                        <a href="javascript;">删除</a>
                      </Popconfirm>,
                      <a onClick={this.toggleCpModal.bind(this, item)}>编辑</a>,
                      <a
                        disabled={!item.officialSite}
                        target='_blank'
                        href={item.officialSite}>
                        官网
                      </a>,
                      <Link to='/approval/competitions/test'>申办竞赛</Link>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar className={`vertical-middle icon-gap bg-gradient-${_.random(1, 10)}`} icon="rocket" />}
                      title={item.name}
                      description={item.organizers}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </div>
          </Col>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                二级学科竞赛
                <Button
                  className={classnames('float-right vertical-middle', {
                    hide: !isAuthorized([])
                  })}
                  shape="circle"
                  icon='plus'
                  onClick={this.toggleCpModal.bind(this, {grade: 'second'})}
                  size='large' />
              </h2>
            </div>
          </Col>
        </Row>
        <Modal
          visible={this.state.cpModal.show}
          title='竞赛信息'
          onCancel={this.toggleCpModal.bind(this, {})}
          footer={[
            <Button key="back" onClick={this.toggleCpModal.bind(this, {})}>取消</Button>,
            <Button
              key="submit"
              onClick={this.submitCpModal.bind(this)}
              type="primary"
              loading={this.state.cpModal.loading}>
              提交
            </Button>,
          ]}>
          <Divider orientation="left">竞赛名称</Divider>
          <Input value={cpModal.fields.name} onChange={this.handleChange.bind(this, 'cpModal.fields.name')} placeholder='竞赛名称' />
          <Divider orientation="left">主办单位</Divider>
          <TextArea autosize={{ minRows: 2, maxRows: 6 }} value={cpModal.fields.organizers} onChange={this.handleChange.bind(this, 'cpModal.fields.organizers')} placeholder='主办单位' />
          <Divider orientation="left">赛事简介</Divider>
          <TextArea autosize={{ minRows: 2, maxRows: 6 }} value={cpModal.fields.content} onChange={this.handleChange.bind(this, 'cpModal.fields.content')} placeholder='赛事简介' />
          <Divider orientation="left">官网地址</Divider>
          <Input value={cpModal.fields.officialSite} onChange={this.handleChange.bind(this, 'cpModal.fields.officialSite')} placeholder='官网地址' />
          <Divider orientation="left">竞赛等级</Divider>
          <Select value={cpModal.fields.grade} onChange={this.handleChange.bind(this, 'cpModal.fields.grade')} style={{ minWidth: 120 }}>
            <Option value="first">第一级学科竞赛</Option>
            <Option value="second">第二级学科竞赛</Option>
          </Select>
        </Modal>
      </div>
    )
  }
}