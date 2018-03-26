/**
 * Created by chenliang on 2017/3/22.
 */

/* 登陆返回数据对象 */
var logginRespon = {};
/* 是否是op3 */
var isOp3 = 1;
/* 是否登陆成功 */
var loginSuccess = 1;

//公众号旅游店铺用户信息
function defaultLoginrespon() {
    //判断是否保存了用户的登陆信息
    var userName = localStorage.getItem("userName");
    if (!userName) {
        if (isOp3 == 1) {
            logginRespon.userName = "niming";
            logginRespon.apiSignCode = "5f573098";
            logginRespon.apiUserName = "552734bfe4b020e21058e697"
            logginRespon.userKey = "552734bfe4b020e21058e698";
            logginRespon.contactMobile = ""
            logginRespon.contactUserName = ""
        } else {
            logginRespon.userName = "guest";
            logginRespon.apiSignCode = "dcb3fc92";
            logginRespon.apiUserName = "55507e8245ce310395d63a40"
            logginRespon.userKey = "55507e8245ce310395d63a41";
            logginRespon.contactMobile = ""
            logginRespon.contactUserName = ""
        }
        localStorage.setItem("userName", logginRespon.userName);
        localStorage.setItem("apiSignCode", logginRespon.apiSignCode);
        localStorage.setItem("apiUserName", logginRespon.apiUserName);
        localStorage.setItem("userKey", logginRespon.userKey);
        localStorage.setItem("contactMobile", logginRespon.contactMobile);
        localStorage.setItem("contactUserName", logginRespon.contactUserName);
    } else {
        logginRespon.userName = localStorage.getItem("userName");
        logginRespon.apiSignCode = localStorage.getItem("apiSignCode");
        logginRespon.apiUserName = localStorage.getItem("apiUserName");
        logginRespon.userKey = localStorage.getItem("userKey");
        logginRespon.contactMobile = localStorage.getItem("contactMobile");
        logginRespon.contactUserName = localStorage.getItem("contactUserName");
    }
    return logginRespon;
}

/* 获取appType */
function appType() {
    return "tdx";
}


function requestMataInfo() {
    var strCode = "tzOpenapisignCode";
    strCode = strCode + defaultLoginrespon().apiSignCode;
    strCode = strCode + "timeStamp";
    strCode = strCode + norTimeStamp();
    strCode = strCode + "userName";
    strCode = strCode + defaultLoginrespon().apiUserName;
    strCode = strCode + "tzOpenapi";
    return strCode;
}

/* 获取时间戳 */
function norTimeStamp() {
    var timestamp = Date.parse(new Date()) / 1000;
    return timestamp;
}

/* 生成随机数 */
function wechatRandowData() {
    var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var n = 16,
        s = "";
    for (var i = 0; i < n; i++) {
        var rand = Math.floor(Math.random() * str.length);
        s += str.charAt(rand);
    }
    return s;
}

/* 请求data实体类封装 */
function requestDataHtml() {
    var data = {};
    data.userName = defaultLoginrespon().apiUserName;
    data.signCode = $.md5(requestMataInfo());
    data.timeStamp = norTimeStamp();
    data.requestID = norTimeStamp() + "ld_bycapp_byH5";
    data.appType = appType();
    data.operatorKey = defaultLoginrespon().userKey;
    data.responseDataType = "JSON";
    return data;
}

/* 请求data实体类封装 */
function requestData() {
    var data = {};
    data.userName = defaultLoginrespon().apiUserName;
    data.signCode = $.md5(requestMataInfo());
    data.timeStamp = norTimeStamp();
    data.requestID = norTimeStamp() + "ld_bycapp_byH5";
    data.appType = appType();
    data.operatorKey = defaultLoginrespon().userKey;
    data.responseDataType = "JSON";
    return data;
}

//获取图片link
function imgLink() {
    if (isOp3 == 1) {
        return "http://media.op3.tdxinfo.com/tops-mediaserver/imageservice?mediaImageId=";
    } else {
        return "http://media.travelzen.com/tops-mediaserver/imageservice?mediaImageId=";
    }
}


function travelLink() {
    if (isOp3 == 1) {
        return "http://192.168.161.137:8480/service/flight/travel";
    } else {
        return "https://app.travelzen.com/tops-openapi-for-customers/service/flight/travel";
    }
}

function activityLink() {
    if (isOp3 == 1) {
        return "http://192.168.161.137:8480/service/flight/hotproduct";
    } else {
        return "https://app.travelzen.com/tops-openapi-for-customers/service/flight/hotproduct";
    }
}

function normalInfoLink() {
    if (isOp3 == 1) {
        return "http://192.168.161.137:8480/service";
    } else {
        return "https://app.travelzen.com/tops-openapi-for-customers/service";
    }
}

Handlebars.registerHelper("productItemStatus", function(str) {
    if (str == "TWO_DIAMOND") {
        return "【甩尾】";
    } else if (str == "THREE_DIAMOND") {
        return "【促销】";
    } else if (str == "FOUR_DIAMOND") {
        return "【经济】";
    } else if (str == "FIVE_DIAMOND") {
        return "【经典】";
    } else if (str == "SIX_DIAMOND") {
        return "【品质】";
    } else {
        return "【其他】";
    }
});

Handlebars.registerHelper("productLevelStatus", function(str) {
    if (str == "TWO_DIAMOND") {
        return "images/zuanji2.png";
    } else if (str == "THREE_DIAMOND") {
        return "images/zuanji3.png";
    } else if (str == "FOUR_DIAMOND") {
        return "images/zuanji4.png";
    } else if (str == "FIVE_DIAMOND") {
        return "images/zuanji5.png";
    } else if (str == "SIX_DIAMOND") {
        return "images/zuanji6.png";
    } else {
        return "";
    }
});


Handlebars.registerHelper("sellCountNone", function(str, options) {
    if ([parseInt(str)] <= 0) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper("adultOrChd", function(str, options) {
    if (str == true) {
        return options.fn(this);
    }
    return options.inverse(this);
});

//公司还是个人判断
Handlebars.registerHelper("companyOrPersion", function(str, options) {
    if (str == "公司") {
        return options.fn(this);
    }
    return options.inverse(this);
});


Handlebars.registerHelper("myInfoImageStatus", function(str, options) {
    if (str == "TRUST" || str == "SAFE") {
        return options.fn(this);
    }
    return options.inverse(this);
});


Handlebars.registerHelper("travelOrderAduStatus", function(str, options) {
    if (str) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper("activityCzysType", function(str, options) {
    if (str == "超值预售") {
        return options.fn(this);
    }
    return options.inverse(this);
});

//单房差
Handlebars.registerHelper("travelOrderHousePrice", function(str, options) {
    if (str) {
        return options.fn(this);
    }
    return options.inverse(this);
});
//账户类型
Handlebars.registerHelper("accountType", function(str) {
    if (str == "TRUST") {
        return "信任";
    } else if (str == "SAFE") {
        return "安全";
    } else if (str == "RISK") {
        return "风险";
    } else if (str == "TRAVEL") {
        return "游客";
    } else {
        return "信任";
    }
});

//图片标识
Handlebars.registerHelper("imgItemStatus", function(str) {
    if (str == "HALFSELFHELP") {
        return "images/product-type.jpg"
    } else if (str == "FOLLOWTOUR") {
        return "images/pro-type1.png"
    } else if (str == "LOCAL") {
        return "images/pro-type3.png"
    } else if (str == "FREETRAVEL") {
        return "images/pro-type4.png"
    } else {
        return "images/product-type.jpg"
    }
});


Handlebars.registerHelper("imgLink", function(value) {
    if (isOp3 == 1) {
        return "http://media.op3.tdxinfo.com/tops-mediaserver//imageservice?mediaImageId=";
    } else {
        return "http://media.travelzen.com/tops-mediaserver//imageservice?mediaImageId=";
    }
});

//获取常旅客证件信息    优先级  身份证、护照,或者其他
function cardInfoTravel(strFirst, strSecond, strThird, obj) {
    for (var j = 0; j < obj.papers.length; j++) {
        var itemTemp = obj.papers[j];
        if (itemTemp.type == strFirst) {
            return itemTemp;
        }
    }

    for (var j = 0; j < obj.papers.length; j++) {
        var itemTemp = obj.papers[j];
        if (itemTemp.type == strSecond) {
            return itemTemp;
        }
    }

    for (var j = 0; j < obj.papers.length; j++) {
        var itemTemp = obj.papers[j];
        if (itemTemp.type == strThird) {
            return itemTemp;
        }
    }
}





//手机号码校验
function validatemobile(mobile) {
    if (mobile.length == 0) {
        alert('请输入手机号码！');
        return false;
    }
    if (mobile.length != 11) {
        alert('请输入有效的手机号码！');
        return false;
    }

    if (!(/^1[34578]\d{9}$/.test(mobile))) {
        alert('请输入有效的手机号码！');
        return false;
    }
    return true;
}

//邮箱校验
function check(email_address) {
    var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
    if (regex.test(email_address)) {
        return true;
    } else {
        window.alert("您输入的电子邮件地址不合法");
        return false;
    }
}

//改变登陆状态
function changeStatus(status) {
    //保存登陆状态
    var loginSuccess = localStorage.getItem("loginSuccess");
    if (!loginSuccess) {
        localStorage.setItem("loginSuccess", status);
    }
}

//当前登陆状态
function currentLoginStatus() {

    var loginSuccess = localStorage.getItem("loginSuccess");
    if (!loginSuccess) {
        return 0;
    }
    return loginSuccess;
}

//修改登陆返回的用户数据
function responLoginData(data) {
    localStorage.setItem("userName", data.userName);
    localStorage.setItem("apiSignCode", data.apiSignCode);
    localStorage.setItem("apiUserName", data.apiUserName);
    localStorage.setItem("userKey", data.userKey);
    localStorage.setItem("contactMobile", data.contactMobile);
    localStorage.setItem("contactUserName", data.contactUserName);
}


Handlebars.registerHelper("cardType", function(str) {
    if (str == "NI") {
        return "身份证";
    } else if (str == "PP") {
        return "护   照";
    } else {
        return "其   他";
    }
});

Handlebars.registerHelper("personType", function(str) {
    if (str == "ADU") {
        return "成人";
    } else if (str == "CHD") {
        return "儿童";
    } else {
        return "婴儿";
    }
});


//身份证验证
function IDCardCheck(num) {
    num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
        return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);

        //检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            alert('输入的身份证号里出生日期不对！');
            return false;
        } else {
            //将15位身份证转成18位
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return true;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);

        //检查生日日期是否正确
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            alert(dtmBirth.getYear());
            alert(arrSplit[2]);
            alert('输入的身份证号里出生日期不对！');
            return false;
        } else {
            //检验18位身份证的校验码是否正确。
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                alert('18位身份证的校验码不正确！'); //应该为： + valnum
                return false;
            }
            return true;
        }
    }
    return false;
}

function getSex(idCard) {

    var sexBit;
    if (idCard.length == 15) { 
        sexBit = idCard.substr(14, 1);
        return sexBit;
    } else if (idCard.length == 18) {
        sexBit = idCard.substr(16, 1);
        return sexBit;
    } else { 
        //不是15或者18,null
         
        return null; 
    } 
}  

/**
 * 得到生日"yyyy-mm-dd"
 * @param {Object} idCard 正确的15/18位身份证号码
 */
 
function getBirthday(idCard) { 
    var birthdayStr;  
    if (15 == idCard.length) { 
        birthdayStr = idCard.charAt(6) + idCard.charAt(7);  
        if (parseInt(birthdayStr) < 10) { 
            birthdayStr = '20' + birthdayStr; 
        } else { 
            birthdayStr = '19' + birthdayStr; 
        } 
        birthdayStr = birthdayStr + '-' + idCard.charAt(8) + idCard.charAt(9) + '-' + idCard.charAt(10) + idCard.charAt(11); 
    } else if (18 == idCard.length) { 
        birthdayStr = idCard.charAt(6) + idCard.charAt(7) + idCard.charAt(8) + idCard.charAt(9) + '-' + idCard.charAt(10) + idCard.charAt(11) + '-' + idCard.charAt(12) + idCard.charAt(13); 
    }  
    return birthdayStr; 
}

Handlebars.registerHelper("normalCardType", function(str) {
    if (str == "PASSPORT") {
        return "护照";
    } else if (str == "IDENTITY_CARD") {
        return "身份证";
    } else {
        return "其他";
    }
});

function loginFromStatus() {
    var str = window.localStorage.loginFromStatus;
    if (str == 0) {
        window.location.href = "index.html";
    } else if (str == 1) {
        window.location.href = "product-detail.html?routeId=" + localStorage.routeId;
    } else if (str == 2) {
        window.location.href = "activity-detail.html?routeId=" + localStorage.activityRouteId + "&beginDate=" + localStorage.activityBeginTime + "&endDate=" + localStorage.activityEndTime + "&minTitle=" + localStorage.activityMinTitle;
    } else {
        window.location.href = "index.html";
    }
}

//常旅客页面来源  0个人信息常旅客  1建单选择常旅客  2建单修改常旅客
function newTravelStatus() {
    var str = window.localStorage.newTravelStatus;
    if (str == 0) {
        window.location.href = "savedtraveller.html";
    } else if (str == 1) {
        window.location.href = "choosetraveller.html";
    } else if (str == 2) {
        window.location.href = "createorder.html";
    } else {
        window.location.href = "index.html";
    }
}

function loginActionStatis() {
    var str = window.localStorage.loginActionStatus;
    if (str == 0) {
        window.location.href = "index.html";
    } else if (str == 1) {
        window.location.href = "createorder.html";
    } else {
        window.location.href = "index.html";
    }
}

function isChinese(str) {
    if (/^[\u4e00-\u9fa5]+$/i.test(str)) {
        return true;
    }
    return false;
}

function isEnglish(str) {
    var reg = /^[A-Za-z]+$/;
    if (reg.test(str)) //判断是否符合正则表达式
    {
        return true;
    }
    return false;
}

function jsGetAge(strBirthday) {
    var returnAge;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
        returnAge = 0; //同年 则为0岁
    } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay; //日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            } else {
                var monthDiff = nowMonth - birthMonth; //月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
        } else {
            returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
    }

    return returnAge; //返回周岁年龄
}

//字母和数字组合
function checkRate(nubmer) {
    var re = /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i;
    if (!re.test(nubmer)) {
        return false;
    } else {
        return true;
    }
}


Handlebars.registerHelper("strReplace", function(str) {
    var strNew = str.substring(0, 3) + "******" + str.substring(9, str.length);
    return strNew;
});

function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}


function encodeUTF8(str) {
    var temp = "",
        rs = "";
    for (var i = 0, len = str.length; i < len; i++) {
        temp = str.charCodeAt(i).toString(16);
        rs += "\\u" + new Array(5 - temp.length).join("0") + temp;
    }
    return rs;
}

function decodeUTF8(str) {
    return str.replace(/(\\u)(\w{4}|\w{2})/gi, function($0, $1, $2) {
        return String.fromCharCode(parseInt($2, 16));
    });
}

Handlebars.registerHelper("equalOrderStatus", function(str) {
    if (str == "adjustPriceOp_complete") {
        return true
    } else {
        return false;
    }
});


Handlebars.registerHelper("stateEqual", function(v1, options) {
    if (v1 == "adjustPriceOp_complete") {
        //满足添加继续执行
        return options.fn(this);
    } else {
        //不满足条件执行{{else}}部分
        return options.inverse(this);
    }
});


Handlebars.registerHelper("activityListType", function(str, options) {
    if (str == "限时秒杀") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("priceEqual", function(v1, v2, options) {
    if (v1 != v2) {
        //满足添加继续执行
        return options.fn(this);
    } else {
        //不满足条件执行{{else}}部分
        return options.inverse(this);
    }
});

Handlebars.registerHelper("priceBalance01", function(a, b, options) {
    if (a != b) {
        //满足添加继续执行
        return options.fn(this);
    } else {
        //不满足条件执行{{else}}部分
        return options.inverse(this);
    }
});

Handlebars.registerHelper("priceBalance02", function(a, b, options) {
    if (a = b) {
        //满足添加继续执行
        return options.fn(this);
    } else {
        //不满足条件执行{{else}}部分
        return options.inverse(this);
    }
});

Handlebars.registerHelper("activityTimeText", function(str) {
    if (str == "runing") {
        return "活动中";
    } else if (str == "ready") {
        return "即将开始";
    } else if (str == "end") {
        return "已结束";
    } else {
        return "未知";
    }
});



Handlebars.registerHelper("activityLabelShow", function(a, b, options) {
    if (b.length > 0 || a.length > 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});


Handlebars.registerHelper("activityAllLabelShow", function(a, b, options) {
    if (b.length > 0 && a.length > 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("activitysubLabelShow", function(a, options) {
    if (a.length > 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("activitySignShow", function(str, options) {
    if (str == "runing") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("activityHtmlAction", function(str) {
    if (str == "runing") {
        return "快去抢";
    } else if (str == "ready") {
        return "即将开抢";
    } else if (str == "end") {
        return "已结束";
    } else {
        return "未知";
    }
});

Handlebars.registerHelper("activityStatusAction", function(str) {
    if (str == "runing") {
        return "速抢";
    } else if (str == "ready") {
        return "即将开抢";
    } else if (str == "end") {
        return "已结束";
    } else {
        return "未知";
    }
});

Handlebars.registerHelper("activityText", function(str) {
    if (str == "runing") {
        return "距结束 ";
    } else if (str == "ready") {
        return "距开始 ";
    } else if (str == "end") {
        return "已结束 ";
    } else {
        return "未知 ";
    }
});

//活动状态
Handlebars.registerHelper("activityStatus", function(str) {
    if (str == "runing") {
        return "images/hdz.png";
    } else if (str == "ready") {
        return "images/zbz.png";
    } else if (str == "end") {
        return "images/yjs.png";
    } else {
        return "images/hdz.png";
    }
});


//活动状态
Handlebars.registerHelper("activityModelImgStatus", function(str) {
    if (str == "runing") {
        return "images/sqbuttons@2x.png";
    } else if (str == "ready") {
        return "images/jjkq.png";
    } else if (str == "end") {
        return "images/hdjs.png";
    } else {
        return "images/hdz.png";
    }
});

//时间戳转时间
Handlebars.registerHelper("timeDetail", function(str) {
    // var now = new   Date(parseInt(str));
    var oDate = new Date(parseInt(str)),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear + '/' + getzf(oMonth) + '/' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen); //最后拼接时间
    return oTime.substring(11, 16);
});


//补0操作
function getzf(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}


function teamUnitConvert(str) {
    if (str == "PEOPLE") {
        return "人";
    } else if (str == "SETS") {
        return "套";
    } else if (str == "ROOM") {
        return "间";
    } else if (str == "PIECE") {
        return "张";
    } else if (str == "PART") {
        return "份";
    } else if (str == "MACHINE") {
        return "台";
    } else if (str == "DAY") {
        return "天";
    } else if (str == "ONCE") {
        return "次";
    } else if (str == "PAIR") {
        return "对";
    } else if (str == "CAR") {
        return "辆";
    }
}