chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method === "externalUrlSettings")
      sendResponse(localStorage['externalUrlSettings']);
    else
      sendResponse({}); // snub them.
});
