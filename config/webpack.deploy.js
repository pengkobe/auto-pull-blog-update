/**
 * @author: @AngularClass
 */
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');
const serverDeploy = require('./deploy');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

/**
 * Webpack Constants
 */
const GIT_REMOTE_NAME = 'origin';
const COMMIT_MESSAGE = 'Updates';

module.exports = function (options) {
    const webpackConfigFactory = serverDeploy.getWebpackConfigModule(options); // the settings that are common to prod and dev
    const webpackConfig = webpackConfigFactory(options);

    // replace the instance of HtmlWebpackPlugin with an updated one.
    serverDeploy.replaceHtmlWebpackPlugin(webpackConfig.plugins);

    return webpackMerge(webpackConfig, {
        output: {
            /**
             * The public path is set to the REPO name.
             *
             * `HtmlElementsPlugin` will add it to all resources url's created by it.
             * `HtmlWebpackPlugin` will add it to all webpack bundels/chunks.
             *
             * In theory publicPath shouldn't be used since the browser should automatically prefix the
             * `baseUrl` into all URLs, however this is not the case when the URL is absolute (start with /)
             *
             * It's important to prefix & suffix the repo name with a slash (/).
             * Prefixing so every resource will be absolute (otherwise it will be url.com/repoName/repoName...
             * Suffixing since chunks will not do it automatically (testes against about page)
             */
            publicPath: '/' + serverDeploy.safeUrl(webpackConfig.output.publicPath)
        },

        plugins: [
            function () {
                this.plugin('done', function (stats) {
                    console.log('Starting deployment to GitHub.');

                    const logger = function (msg) {
                        console.log(msg);
                    };

                    const options = {
                        logger: logger,
                        remote: GIT_REMOTE_NAME,
                        message: COMMIT_MESSAGE,
                        dotfiles: true // for .nojekyll
                    };

                    // Since GitHub moved to Jekyll 3.3, their server ignores the "node_modules" and "vendors" folder by default.
                    // but, as of now, it also ignores "vendors*" files.
                    // This means vendor.bundle.js or vendor.[chunk].bundle.js will return 404.
                    // this is the fix for now.
                    fs.writeFileSync(path.join(webpackConfig.output.path, '.nojekyll'), '');

                });
            },
            new SftpWebpackPlugin({
                port: '22',
                host: 'host',
                username: 'root',
                password: 'password',
                from: './dist',
                to: '/mnt/testupload/'
            })
        ]
    });
};
