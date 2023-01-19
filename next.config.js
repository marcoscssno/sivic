const { version } = require('./package.json');

module.exports = {
    output: 'standalone',
    publicRuntimeConfig: {
        version,
    },
};