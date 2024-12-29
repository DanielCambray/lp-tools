export const CoinMarkerCapServices = {
    async getHistoricalPrices(cryptoId: number, timeStart: number, timeEnd: number) {
        return await fetch(`https://proxy.ilande.fr/https://api.coinmarketcap.com/data-api/v3.1/cryptocurrency/historical?id=${cryptoId}&convertId=2781&timeStart=${timeStart}&timeEnd=${timeEnd}&interval=1d`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control": "no-cache",
                "platform": "web",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "x-request-id": "3e5db14eb102463587e9f8fa2d7859d1"
            },
            "referrer": "https://coinmarketcap.com/",
            "referrerPolicy": "origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
        });
    },
    async getCoinsData() {
      return await fetch('https://s3.coinmarketcap.com/generated/core/crypto/cryptos.json')
    }
}