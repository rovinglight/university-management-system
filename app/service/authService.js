import _ from 'lodash'

const authService = {
  isAuthorized: (userAuths) => {
    return (requiredAuths, shouldAdminAbleToSee = true) => {
      if (_.find(userAuths, {role: 'administrator'})) {
        return shouldAdminAbleToSee
      }
      let result = _.find(requiredAuths, (requiedAuth) => {
        return _.find(userAuths, (userAuth) => {
          let clonedUserAuth = _.cloneDeep(userAuth)
          _.unset(clonedUserAuth, '_id')
          return _.isEqual(clonedUserAuth, requiedAuth)
        })
      })
      return Boolean(result)
    }
  }
}

export default authService
