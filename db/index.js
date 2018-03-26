const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('temp-db.json')
const db = low(adapter)

db.defaults({ users: [], groups: [] })
  .write()

module.exports = db