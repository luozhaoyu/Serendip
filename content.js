key_func_mappings = {
    'S': savePicture
}

function responseHandler(response) {
    console.log('response: ' + response);
}

function biggerPicture(x, y)
{
    return x['size'] - y['size'];
}

function savePicture() {
    var message, suffix, target;
    message = location.href;
    suffix = message.split('.').pop;
    if (suffix != 'jpg') {
        var imgs, pics = [];//, i = 0;
        imgs = document.getElementsByTagName('img');
        if (imgs && imgs.length > 0)
        {
            for (var i = 0; i < imgs.length; i++)
            {
                pics[i] = {
                    size: imgs[i]['height'] * imgs[i]['width'],
                    src: imgs[i]['src']
                }
            }
            pics.sort(biggerPicture);
            target = pics.pop()['src'];
        }
    }

    if (target && confirm("您是否想要保存: " + target))
        chrome.extension.sendMessage(target, responseHandler);
}


function show(e) {
    var str;
    str = e;
    for (var i in e) {
        str += i + ': ' + e[i];
    }
    alert(str);
}


function getKeyFromIdentifier(keyevent) {
    var unicode;
    unicode = "0x" + keyevent['keyIdentifier'].substring(2);
    return String.fromCharCode(parseInt(unicode)).toLowerCase();
}


function onKeyDown(keyevent) {
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

function init() {
    document.addEventListener("keydown", onKeyDown, true);
}

init();
