
responseHandler = function(response) {
    console.log('response: ' + response);
}

biggerPicture = function(x, y) {
    return x['size'] - y['size'];
}

getImgElements = function() {
    var imgs = document.getElementsByTagName('img');
    var visibleImgs = [];
    var ix, iy;
    for (var i = 0; i < imgs.length; i++) {
        img = imgs[i];
        if ((img.x != undefined) && (img.y != undefined)) {
            ix = img.x + img.width / 2;
            iy = img.y + img.height / 2;
        } else {
            console.log(img.src + '没有属性x和y');
            continue;
        }
        if ((this.scrollX < ix) && (ix < this.scrollX + window.innerWidth) &&
            (this.scrollY < iy) && (iy < this.scrollY + window.outerHeight))
            visibleImgs.push(img);
    }
    return visibleImgs;
}

savePicture = function() {
    var message, suffix, target;
    message = location.href;
    suffix = message.split('.').pop();
    if (suffix != 'jpg') {
        var imgs, pics = [];//, i = 0;
        imgs = getImgElements();
        if (imgs && imgs.length > 0)
        {
            for (var i = 0; i < imgs.length; i++)
            {
                pics[i] = {
                    height: imgs[i]['height'],
                    width: imgs[i]['width'],
                    size: imgs[i]['height'] * imgs[i]['width'],
                    src: imgs[i]['src']
                }
            }
            pics.sort(biggerPicture);
            target = pics.pop();
        }
        if (target && confirm("您是否想要保存: " + target['width'] + '*' + target['height'] +
                target['src']))
            chrome.extension.sendMessage(target['src'], responseHandler);
    } else { // may not neccessary
        if (confirm("您是否想要保存: " + message))
            chrome.extension.sendMessage(message, responseHandler);
    }

}


getKeyFromIdentifier = function(keyevent) {
    var unicode;
    unicode = "0x" + keyevent['keyIdentifier'].substring(2);
    return String.fromCharCode(parseInt(unicode)).toLowerCase();
}


onKeyDown = function(keyevent) {
    var k, keycode;
    keycode = keyevent['keyCode'];
    if (keycode > 31) {  // ignore ctrl alt things...
        k = getKeyFromIdentifier(keyevent);
        //console.log('key code = ' + keycode + k);
        if (keyevent.shiftKey) {
            k = k.toUpperCase();
        }
        if (keyevent.ctrlKey)
            k = '<c-' + k + '>';
        if (keyevent.metaKey)
            console.log('meta key pressed!');
        if (key_func_mappings.hasOwnProperty(k))
            key_func_mappings[k]();
        return k;
    }
}

init = function() {
    document.addEventListener("keydown", onKeyDown, true);
}

// utils
show = function(e) {
    var str;
    str = e;
    for (var i in e) {
        str += i + ': ' + e[i];
    }
    alert(str);
}

key_func_mappings = {
    'S': savePicture
}

init();
