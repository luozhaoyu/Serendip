mimeConvert = {
    'image/jpeg': 'jpg',
    'image/pjpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'image/x-windows-bmp': 'bmp',
    'image/svg+xml': 'svg',
};


determineFilename = function(downloadItem, suggest) {
    var newName, extension, isodate;

    // if this download is not issued by this extension, then exit immediately.
    if (downloadItem.byExtensionId != chrome.runtime.id) {
        return false;
    }

    if (mimeConvert.hasOwnProperty(downloadItem.mime)) {
        extension = mimeConvert[downloadItem.mime];
    } else {
        extension = 'jpg';
        alert("Unknown MIME type: " + downloadItem.mime);
    }
    isodate = new Date().toISOString();
    newName = isodate.split(':')[0] + '_' + Math.random().toString(36).substring(2, 6) + '.' + extension;
    suggest({filename: newName});
};


onMessage = function(request, sender, sendResponse) {
    var res;
    res = {
        'status': 'success',
        'request': request,
        'sender': sender
    }
    try {
        console.log(request + '\tdownloading...');
        chrome.downloads.download({saveAs: true, url: request, conflictAction: "prompt"},
            function(id){console.log("chrome.downloads.download callback: " + id);});
    } catch (err) {
        alert(err.description);
    }
    sendResponse(res);
};

console.log("background.js initiated.");
chrome.extension.onMessage.addListener(onMessage);
chrome.downloads.onDeterminingFilename.addListener(determineFilename);
