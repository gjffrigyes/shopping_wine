/**
 * Created by guo on 2017/4/26.
 */
/**
 * 消息提示工具类
 */
import { Message } from 'element-ui'

export function errorTips (message) { // 错误
  if (this === undefined) {
    Message(_tips({ type: 'error', message }))
  } else {
    this.$message(_tips({ type: 'error', message }))
  }
}
export function sueecssTips (message) { // 错误
  if (this === undefined) {
    Message(_tips({ type: 'success', message }))
  } else {
    this.$message(_tips({ type: 'success', message }))
  }
}
function _tips ({
  showClose = true,
  type = 'success',
  message,
  duration = 3000
} = {}
) {
  return {
    showClose,
    type,
    message,
    duration
  }
}
