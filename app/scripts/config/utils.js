'use strict';

/**
 将datatable的请求参数转换成自定义格式
 **/
function convertDtData(d) {
  var start = d.start;
  var pageSize = d.length;
  var pageStart = (start / pageSize) + 1;
  var draw = d.draw;
  var search = d.search.value;
  var orders = d.order.map(function (item) {
    var columnName = d.columns[item.column].data;
    var dir = item.dir;
    return columnName + ':' + dir;
  });
  var orderQuery = orders.join(',');

  return {
    page: pageStart,
    limit: pageSize,
    dt_draw: draw,
    q: search,
    order_by: orderQuery
  };
}

/**
 将列表请求转换成datatable需要的应答格式
 **/
function convertDtResponse(json) {
  return {
    draw: json.meta.dt_draw,
    recordsTotal: json.meta.pagination.total,
    recordsFiltered: json.meta.pagination.total,
    data: json.data
  }
}

/**
 * 简化 nested property 是否存在的检查
 * if(user && user.loc && user.loc.lat) {
 *    safeGet(user, 'loc.lat')     // 50
 *    safeGet(user, 'loc.foo.bar') // undefined
 **/
function safeGet(obj, key) {
  return key.split(".").reduce(function (o, x) {
    return (typeof o == "undefined" || o === null) ? o : o[x];
  }, obj);
}

Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;

};

/**
 * 返回用于Datatable渲染时间列的函数。
 **/
function dtRenderTime(format) {
  var format = format || 'yyyy年MM月dd日';
  return function (data, type, full, meta) {
    if (data != null) {
      return new Date(data).format(format);
    } else {
      return null;
    }
  }
}
