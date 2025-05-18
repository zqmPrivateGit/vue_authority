/**
 * 日期格式转换
 * @param {*} createTime 
 * @returns 
 */

 function getNowFormatTime(createTime) {
    let date = new Date(createTime);
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

/**
 * 单例模式，控制事件触发次数
 * @param {*} fn 
 * @returns
 */
const InstanceMode = {
  // 构造函数
  singleTon(fn) {
    let result;
    return function() {
      if(fn) {
        result = fn.apply(this, arguments);
        fn = null;
      }
      return result;
    }
  },
  // 获取单例模式
  getInstance(fn) {
    let getLiving;
    if(this.instance){
      getLiving = this.instance;
    }else{
      this.instance = new InstanceMode.singleTon(fn);
      getLiving = this.instance;
    }
    return getLiving();
  },
  // 初始化单例模式
  refreshInstance() {
     this.instance = null;
  }
}


module.exports = {
  getNowFormatTime,
  InstanceMode
}