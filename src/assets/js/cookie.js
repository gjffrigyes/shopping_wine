/**
 * Created by guo on 2017/5/3.
 */
export function setCookie (name, value, Days) {
  // var Days=1
  var exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + value + '; expires=' + exp.toGMTString() + '; path=/'
  // console.log(document.cookie)
}
export function getCookie (c_name) { // 获取指定名称的cookie的值
  if (document.cookie.length>0)
  {
    var c_start=document.cookie.indexOf(c_name + "=");
    if (c_start!=-1)
    {
      c_start=c_start + c_name.length+1;
      var c_end=document.cookie.indexOf(";",c_start);
      if (c_end==-1)
        c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}
export function deleteCookie (name) {
  setCookie(name, '', -1)
}
export function getNowFormatDate () {
  var date = new Date()
  var seperator1 = '-'
  var seperator2 = ':'
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  var strHours = date.getHours()
  var strMinutes = date.getMinutes()
  var strSeconds = date.getSeconds()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  if (strHours >= 0 && strHours <= 9) {
    strHours = '0' + strHours
  }
  if (strMinutes >= 0 && strMinutes <= 9) {
    strMinutes = '0' + strMinutes
  }
  if (strSeconds >= 0 && strSeconds <= 9) {
    strSeconds = '0' + strSeconds
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + strHours + seperator2 + strMinutes + seperator2 + strSeconds
  return currentdate
}

export function htmlDecodeByRegExp (str) {
    var s = "";
    if(str.length == 0) return "";
    s = str.replace(/&amp;/g,"&");
    s = s.replace(/&lt;/g,"<");
    s = s.replace(/&gt;/g,">");
    s = s.replace(/&nbsp;/g," ");
    s = s.replace(/&#39;/g,"\'");
    s = s.replace(/&quot;/g,"\"");
    return s;
}
export function htmlEncodeByRegExp (str) {
  var s = "";
  if(str.length == 0) return "";
  s = str.replace(/&/g,"&amp;");
  s = s.replace(/</g,"&lt;");
  s = s.replace(/>/g,"&gt;");
  s = s.replace(/ /g,"&nbsp;");
  s = s.replace(/\'/g,"&#39;");
  s = s.replace(/\"/g,"&quot;");
  return s;
}
