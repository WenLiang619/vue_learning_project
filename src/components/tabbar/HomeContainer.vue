<template>
    <div>
        <!--轮播图区域-->
        <mt-swipe :auto="4000">
            <!--         在组件中使用v-for 循环的话  一定要使用key   -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

<!--        九宫格到6宫格改造工程-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
               <img src="../../images/menu1.png">
                <div class="mui-media-body">新闻咨询</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu2.png">
                <div class="mui-media-body">图片分享</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu3.jpg">
                <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu3.jpg">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-search"></span>
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-phone"></span>
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        name: "HomeContainer",
        data() {
            return {
                lunbotuList: [{
                    img: "https://mlskd.cn/resources/images_swiperbbs/3926f8270bb5d9c464dc20d6441e5f9.jpg",
                    url: "https://www.sohu.com"
                },{
                    img: "https://mlskd.cn/resources/images_swiperbbs/1af6b2d24f3ff6ef003e7a995823b9c.jpg",
                    url: "https://www.baidu.com"
                },{
                    img: "https://mlskd.cn/resources/images_swiperbbs/4c03dfcfcb2a4224e1a22bc83571bec_aeEBV4b.jpg",
                    url: "https://www.danfoss.com"
                }]//保存轮播图数组
            }
        },
        created() {
            this.getLunbotu()
        },
        methods: {
            getLunbotu() { //获取轮播图数据的方法
                this.$http.get('http://liulongbin.top:3005/api/getlunbo').then(result => {
                    console.log(result.body)
                    if (reslult.body.status === o) {
                        //成功了
                        this.lunbotuList = result.body.message;
                    } else {
                        //失效的
                        Toast('加载轮播图失败')
                    }
                }, () => {
                    console.log('接口error.')
                    Toast('轮播图接口已经不存在了，使用自己的数据')
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 500px;
    }

    .mint-swipe-item {
        &:nth-child(1) {
            background-color: red;
        }

        &:nth-child(2) {
            background-color: blue;
        }

        &:nth-child(3) {
            background-color: cyan;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }

    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border:none;
        img{
            width: 60px;
            height: 60px;
        }
        .mui-media-body{
            font-size: 13px;
        }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: 0;
    }

</style>