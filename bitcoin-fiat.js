/*    bitcoin-fiat.js by Teran McKinney    */
/*    Released into the public domain.     */
/*          http://go-beyond.org/          */
/* https://github.com/coinfee/bitcoin-fiat */

console.log('Loaded bitcoin-fiat');

var rate = false;
var global_ticker = false;

/* satoshis: Number of Satoshis you want to convert */
/* ticker: BCHUSD, BTCUSD, etc. */
/* output_element: ID of element that you want to receive the result. */
function BitcoinFiat(satoshis, ticker, output_element) {
    console.log('BitcoinFiat');
    console.log(ticker);
    console.log('BitcoinFiat End ticker');
    function updateElement(rate) {
        var element = document.getElementById(output_element);
        element.innerHTML = (rate * satoshis * 0.00000001).toFixed(2);
    }
    /* This is a little awkward due to using XMLHTTPRequest asyncronously. We want to "cache" the result, too. */
    if (global_ticker != ticker) {
        var request = new XMLHttpRequest();
        request.open("get", "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + ticker, true);
        request.responseType = "json";
        request.onload = function() {
            updateElement(request.response.ask);
        };
        request.send();
    } else {
       updateElement();
    }
}
