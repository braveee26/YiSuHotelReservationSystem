const config = {
    projectName: 'hotel-app-v4',
    date: '2026-1-29',
    designWidth: 750,
    deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [],
    defineConstants: {
    },
    copy: {
        patterns: [
        ],
        options: {
        }
    },
    framework: 'react',
    compiler: {
        type: 'webpack5',
        prebundle: { enable: false }
    },
    cache: {
        enable: false // 暂时关闭缓存以避免旧缓存干扰
    },
    mini: {
        postcss: {
            pxtransform: {
                enable: true,
                config: {
                }
            },
            url: {
                enable: true,
                config: {
                    limit: 1024
                }
            },
            cssModules: {
                enable: false,
                config: {
                    namingPattern: 'module',
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        }
    },
    h5: {
        publicPath: './',
        staticDirectory: 'static',
        router: {
            mode: 'hash', // 强制 Hash 模式
        },
        devServer: {
            hot: true, // 重新启用 HMR，解决 $RefreshReg$ 报错
            host: '0.0.0.0',
            port: 10086
        },
        postcss: {
            autoprefixer: {
                enable: true,
                config: {
                }
            },
            cssModules: {
                enable: false,
                config: {
                    namingPattern: 'module',
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        }
    }
}

module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'))
    }
    return merge({}, config, require('./prod'))
}