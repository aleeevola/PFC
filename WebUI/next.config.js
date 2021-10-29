const withPlugins = require('next-compose-plugins');
const withImages = require('next-images')
// module.exports = withImages()

module.exports = withPlugins(
    [withImages(),],
    {
        /* global config here ... */
        env: {
            apiURL: 'http://localhost:8080',
            pageName: 'Total Impresión Digital'
        },
    },
);