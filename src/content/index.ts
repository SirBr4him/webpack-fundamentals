function chooseSizeSnipes(
  url: string,
): Promise<{ id: string; variables: string; available: boolean }> {
  return new Promise((resolve, reject) => {
    $.getJSON(url)
      .done((resp) => {
        const { id, variables, available } = resp.product;
        resolve({ id, variables, available });
      })
      .fail((error) => {
        reject(error);
      });
  });
}

function addToCartSnipes(
  url: string,
  data: { id: string; variables: string },
): Promise<{ orderPlaced: boolean }> {
  const body = {
    pid: data.id,
    options: data.variables,
    quantity: 1,
  };

  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      method: 'post',
      data: body,
      processData: true,
      success: (resp) => {
        resolve({ orderPlaced: true });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

async function placeOrderSnipes(callBack: Function) {
  const orderedSize = 40;
  const buttonClass = `.js-pdp-attribute-btn--size[data-value="${orderedSize}"]`;
  const chooseSizeUrl = $(buttonClass).attr('data-href');
  const addToCartUrl = $('.js-btn-add-to-cart').attr('data-href');
  const checkoutUrl = $('.a-pdp-go-to-checkout').attr('href');

  if (chooseSizeUrl) {
    try {
      const data = await chooseSizeSnipes(`${chooseSizeUrl}&format=ajax`);
      if (data.available) {
        const result = await addToCartSnipes(
          `${addToCartUrl}?format=ajax`,
          data,
        );
        callBack({
          snipesOrdered: `Ordered shoes size 40`,
        });
        if (checkoutUrl) window.location.replace(checkoutUrl);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.snipes) {
    placeOrderSnipes(sendResponse);
  }
});
