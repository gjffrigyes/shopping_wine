/**
 * Created by guo on 2017/6/13.
 */
let dateFormat = time => {
  let tmpDate = new Date(time)
  let year = tmpDate.getFullYear()
  let mathon = tmpDate.getMonth() + 1
  let day = tmpDate.getDate()
  let hours = tmpDate.getHours()
  let minutes = tmpDate.getMinutes()
  return year + '.' + mathon + '.' + day + ' ' + hours + ':' + minutes
}

module.exports = {
  'dateFormat': dateFormat
}
