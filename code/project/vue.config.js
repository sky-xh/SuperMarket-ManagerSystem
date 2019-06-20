module.exports = {
    configureWebpack: {
        // other webpack options to merge in ...
    },
    // devServer Options don't belong into `configureWebpack`
    devServer: {
        public: '172.16.12.174:8080',
        disableHostCheck: true,
    },
};