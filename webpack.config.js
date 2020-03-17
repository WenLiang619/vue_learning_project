//由于webpack是基于node进行构建的，所以 webpack的配置文件中 任何合法的node代码都是支持的
const path = require('path')

//导入在内存中生成HTML页面的插件,只要是插件都要放到 plugins节点中
// 这个插件两个作用：1.自动在内存中根据指定页面生成一个内存页面，2.自动把打包好的bundle.js追加到页面中
const htmlWebpackPlugin = require('html-webpack-plugin')

//一定要  否则webpack无法使用vue
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//当以命令形式运行webpack或webpack-dev-server的时候，工具发现我们没有提供要打包的文件入口和出口文件，此时它会检查根目录里的配置文件并读取这个文件，就拿到了这个配置对象，根据这个对象进行打包构建
//这个配置文件其实就是一个js文件通过node中的模块操作向外暴露了一个 配置对象
module.exports = {
    entry: path.join(__dirname, './src/main.js'),//入口  表示要webpack 打包哪个文件
    output: {//输出文件相关配置
        path: path.join(__dirname, './dist'),//指定打包好的文件输出到哪个目录中
        filename: 'bundle.js'//指定输出的文件名字
    },
    // devServer: {// 这是配置dev-server命令参数的第二种方式，相对来说这种方式麻烦一些
    //     // --open --port 3000 --contentBase src --hot
    //     open: true, //自动打开浏览器
    //     port: 3000,//设置启动时候的运行端口
    //     // contentBase: 'src',//指定托管的根目录
    //     hot: true// 启用热更新
    // },
    plugins: [//所有webpack插件的配置节点
        new htmlWebpackPlugin({//创建一个在内存中生成html 页面的插件
            template: path.join(__dirname, './src/index.html'),//指定模板页面 将来会根据指定页面路径去生成内存中的页面
            filename: 'index.html'//指定生成的页面的名称，必须是index.html
        }),
        new VueLoaderPlugin()//一定要  否则webpack无法使用vue
    ],
    module: {//这个节点用于配置所有第三方模块 加载器
        rules: [//所有第三方模块的 匹配规则
            {test: /\.css$/, use: ['style-loader', 'css-loader']},//配置处理.css文件的第三方loader规则
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},//配置处理.less文件的第三方loader规则
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},//配置处理.sass文件的第三方loader规则
            {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: ['url-loader?limit=1475&name=[hash:8]-[name].[ext]']},//配置处理图片路径的第三方loader规则
            // limit给定的值是图片的大小，单位byte 如果我们引用的图片大小大于给定的limit值，则不会被转为base64格式的字符串；
            // 如果图片小于等于给定的limit值，则会被转为base64的字符串
            {test: /\.(ttf|eot|svg|woff|woff2|otf)$/, use: 'url-loader'},//处理 字体文件的loader
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},//配置 babel转换高级js语法
            {test: /\.vue$/, use: 'vue-loader'},//处理.vue文件的loader
        ]
    },
    resolve: {
        alias: {//修改vue被导入时候(import Vue from 'vue')的包的路径,否则导入的是  "main": "dist/vue.runtime.common.js",
            "vue$": "vue/dist/vue.js"
        }
    }
}


//在控制太  输入webpack 后  做了以下几步：
//1. webpack发现并没有通过命令的形式执行入口和出口
//2. webpack去项目的根目录中查找一个叫做webpack.config.js的配置文件
//3. 当找到配置文件后，就执行则会个文件，就得到了配置文件中导出的配置对象
//4. 当webpack拿到配置对象后，就拿到了配置对象中的入口和出口，然后进行打包构建
