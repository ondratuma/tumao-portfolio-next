const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        domains: ['localhost', 'tumao.dev','tumao-dev-next.vercel.app', '192.168.1.27', 's3.eu-central-1.amazonaws.com'],
        deviceSizes: [2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    crossOrigin: 'anonymous',
    i18n: {
        locales: ['en', 'cs'],
        defaultLocale: 'en'
    },
    headers: [
        {
            source: '/*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 's-maxage=3600, stale-while-revalidate',
                },
            ],
        },
    ]
}