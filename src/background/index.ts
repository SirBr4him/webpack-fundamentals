chrome.runtime.onMessage.addListener((message) => {
  if (message.snipesOrdered) {
    console.log('received message:', message.snipesOrdered);
  }
});

chrome.tabs.onUpdated.addListener(
  (tabId: number, changeInfo: any, tab: any) => {
    const isWebsite = new RegExp('https://(www.)?snipes.[a-z]{2,3}/p/').test(
      tab.url,
    );

    if (isWebsite && changeInfo.status === 'complete') {
      console.log(`send message to tab ${tabId}: it's snipes product`);
      chrome.tabs.sendMessage(
        tabId,
        {
          snipes: isWebsite,
        },
        function (resp) {
          if (resp.snipesOrdered) {
            console.log('received response:', resp.snipesOrdered);
          }
        },
      );
    }
  },
);
