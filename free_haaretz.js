chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    var url_parts = details.url.split('?');
    if (url_parts[1]) {
      return {
        redirectUrl: url_parts[0]
      }
    }
  },
  {
    urls: [
      'http://*.haaretz.co.il/*',
      'http://*.haaretz.com/*',
    ]
  },
  [
    'blocking',
  ]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        details.requestHeaders[i].value = 'Googlebot/2.1 (+http://www.googlebot.com/bot.html)';
        break;
      }
    }

    if (details.url == 'http://www.haaretz.co.il/htz/js/bots.js') {
      return {
        requestHeaders: details.requestHeaders,
        url: 'http://www.haaretz.co.il/htz/js/botzzzz.js'
      }
    }

    return {
      requestHeaders: details.requestHeaders
    };
  },
  {
    urls: [
      'http://*.haaretz.co.il/*',
      'http://*.haaretz.com/*',
    ]
  },
  [
    'blocking',
    'requestHeaders'
  ]
);


