module.exports = {
  users: {
    create: require('./users/create'),
    get: require('./users/get'),
    list: require('./users/list'),
    update: require('./users/update'),
    delete: require('./users/delete')
  },
  groups: {
    create: require('./groups/create'),
    list: require('./groups/list'),
    update: require('./groups/update')
  }
}