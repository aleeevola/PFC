const withPlugins = require('next-compose-plugins');
const withImages = require('next-images')
// module.exports = withImages()

module.exports = withPlugins(
    [withImages(),],
    {
        /* global config here ... */
        env: {
            apiURL: 'http://localhost:8080',
            pageName: 'Total Impresión Digital',
            mercadopago:{
                sdk:'https://sdk.mercadopago.com/js/v2',
                publicKey:'TEST-41223cfd-0554-42fe-a417-a3a6e474fb0f',
            }
        },
    },
);