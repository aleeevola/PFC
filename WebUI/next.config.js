const withPlugins = require('next-compose-plugins');
const withImages = require('next-images')
// module.exports = withImages()

module.exports = withPlugins(
    [withImages(),],
    {
        /* global config here ... */
        env: {
            apiURL: 'http://localhost:8080',
        },
        // async rewrites() {
        //     return [
        //         {
        //             source: '/:path*',
        //             destination: 'http://localhost:8080/:path*',
        //         },
        //     ]
        // },
    },
);