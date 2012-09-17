function onMessage(request, sender, sendResponse) {
    var res;
    res = {
        'request': request,
        'sender': sender
    }
    chrome.experimental.downloads.download({url: request}, function(x){console.log(x);});
    sendResponse(res);
}
function init() {
    console.log('background inited');
    chrome.extension.onMessage.addListener(onMessage);
}

init();
