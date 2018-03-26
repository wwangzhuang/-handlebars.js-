//对象数组去重---根据对象某个属性
function removeSameObject(arr, prop) {
    var ret = [];
    var len = arr.length;
    var isRepeat;
    for (var i = 0; i < len; i++) {
        if (i == 0) {
            ret.push(arr[i]);
        } else {
            isRepeat = false;
            for (var j = i + 1; j < len; j++) {
                if (arr[i].prop == arr[j].prop) {
                    isRepeat = true;
                    break;
                }
            }
            if (!isRepeat) {
                ret.push(arr[i]);
            }
        }
    };
    return ret;
}


// 计算元素在数组中出现的次数

function numOfEleInArr(ele, arr) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == ele) {
            count++;
        }
    }
    return count;
}


// 数组字符串去重

function removeSameStr(arr) {
    arr.sort();
    var arrs = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== arrs[arrs.length - 1]) {
            arrs.push(arr[i]);
        }
    }
    return arrs;
}

//获取url参数
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}