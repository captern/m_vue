<template>
    <div class="news-page" v-wechat-title="$route.meta.title='新闻'">
        <Header :title='newsData.title'/>
        <HomeIcon/>
        <div class="news-area">
            <div class="news-main">
                <div class="header-area" :style="{color:newsData.color}">
                    {{newsData.title}}
                </div>
                <div class="auther-area">
                    <div class="left">编辑：{{newsData.created_time}}</div>
                    <!--<div class="left">编辑：{{newsData.author}}</div>-->
                    <!--<div class="right">{{newsData.created_time}}</div>-->
                </div>
                <div class="text-area" v-html="newsData.content" ref="asdasdad"></div>
                <div v-if="newsData.show_button === '1'" class="enlist-area" @click="showEnlist()">
                    点击报名
                </div>
            </div>
        </div>
        <!--提示框弹出部分-->
        <enlist-tip v-if="enlistTip" :showTip="enlistTip" @closeTip="hideEnlist" :alertText="alertText"
                    :couId='newsData.cou_id'/>
        <!--确定取消提示框弹出部分-->
        <alert-tip v-if="showAlert" :showTip="showAlert" @closeTip="showAlert = false" tipType="one"
                   :alertText="alertText ? alertText : '报名成功'"/>


    </div>
</template>

<script>
    import {hideVideo} from '../../common/js/util'
    import Header from '../../components/header.vue'
    import HomeIcon from '../../components/common/homeIcon.vue'
    import {newsDetail} from '../../server/api'
    import enlistTip from '../../components/common/enlistTip'
    import alertTip from '../../components/common/alertTip'

    import {lessonMain, signLesson} from '../../server/lessonApi'
    import wx from 'weixin-js-sdk'


    export default {
        data() {
            return {
                newsId: '',
                newsData: '',
                enlistTip: false,
                showAlert: false,
                alertText: '待定义'
            }
        },
        mounted() {
            this.newsId = this.$route.params.newsId;
            this.getData();
        },
        methods: {
            getData() {
                newsDetail(this.newsId).then(res => {
                    this.newsData = res.data;
                    this.signPackage = res.signPackage;
                    this.setShare()
                })
            },
            showEnlist() {
                this.enlistTip = !this.enlistTip
            },
            hideEnlist(type) {
                this.enlistTip = !this.enlistTip
                if (type) {
                    this.confirmRegister();
                } else {
                }
            },
            confirmRegister() {
                let postData = {
                    id: this.newsData.cou_id
                }
                signLesson(postData).then(res => {
                    if (res.status) {
                        this.showAlert = true
                        this.getData();
                    } else {
                        this.showAlert = true
                        this.alertText = res.msg
                    }
                })
            },
            setShare() {
                var _this = this;
                wx.config({
                    debug: false,
                    appId: _this.signPackage.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
                    timestamp: _this.signPackage.timestamp, // 必填，生成签名的时间戳
                    nonceStr: _this.signPackage.nonceStr, // 必填，生成签名的随机串
                    signature: _this.signPackage.signature,// 必填，签名，见附录1
                    //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
                    jsApiList: [
                        'onMenuShareAppMessage', 'onMenuShareTimeline',
                        // 'onMenuShareQQ','onMenuShareQZone'
                    ]
                });
                //处理验证失败的信息
                wx.error(function (res) {
                    logUtil.printLog('验证失败返回的信息:', res);
                });
                //处理验证成功的信息
                wx.ready(function () {
                    //              alert(window.location.href.split('#')[0]);
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: _this.newsData.title, // 分享标题
                        link: _this.newsData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: _this.newsData.img, // 分享图标
                        success: function (res) {
                            // 用户确认分享后执行的回调函数
                            logUtil.printLog("分享到朋友圈成功返回的信息为:", res);
                            _this.showMsg("分享成功!")
                        },
                        cancel: function (res) {
                            // 用户取消分享后执行的回调函数
                            logUtil.printLog("取消分享到朋友圈返回的信息为:", res);
                        }
                    });
                    //分享给朋友
                    wx.onMenuShareAppMessage({
                        title: _this.newsData.title, // 分享标题
                        desc: _this.newsData.title, // 分享描述
                        link: _this.newsData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: _this.newsData.img, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function (res) {
                            // 用户确认分享后执行的回调函数
                            logUtil.printLog("分享给朋友成功返回的信息为:", res);
                        },
                        cancel: function (res) {
                            // 用户取消分享后执行的回调函数
                            logUtil.printLog("取消分享给朋友返回的信息为:", res);
                        }
                    });
                });
            }

        },
        components: {
            Header,
            enlistTip,
            alertTip,
            HomeIcon
        },
        watch: {
            enlistTip(newVal, oldVal) {
                hideVideo(newVal);
            },
            showAlert(newVal, oldVal) {
                hideVideo(newVal);
            }
        }
    }
</script>

<style lang="scss">
    .news-page {
        /*背景固定不滚动*/
        background: url("../../common/image/bkg/bkg-two.png") fixed;
        background-size: 100% 100%;
        min-height: 100vh;
        width: 100%;
        overflow: scroll;
        .news-area {
            margin: 22.5px;
            background: #ffffff;
            border-radius: 24px;
            .news-main {
                padding: 40px 35px 130px;
                display: block;
                min-height: calc(100vh - 5px);
                .header-area {
                    color: rgb(58, 178, 237);;
                    padding-right: 204px;
                    font-size: 31px;
                    line-height: 35px;
                    border-bottom: 1px solid rgb(199, 199, 199);
                    padding-bottom: 10px;
                    margin-bottom: 15px;
                }
                .auther-area {
                    display: flex;
                    height: 20px;
                    font-size: 17px;
                    line-height: 20px;
                    color: rgb(178, 178, 179);
                    margin-bottom: 20px;
                    .left, .right {
                        flex: 1;
                    }
                    .left {
                        text-align: left;
                    }
                    .right {
                        text-align: right;
                    }
                }
                .text-area {
                    /*font-size: 19px;*/
                    /*line-height: 25px;*/
                    /*color: rgb(0, 0, 0);*/
                    img {
                        width: 100%;
                        height: auto;
                    }
                    video {
                        width: 100%;
                        height: auto;
                    }
                    a {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: block;
                    }
                }
                .enlist-area {
                    position: fixed;
                    bottom: 56px;
                    width: 517px;
                    height: 66px;
                    line-height: 66px;
                    margin: 0 auto;
                    background-color: rgb(58, 178, 237);
                    color: #ffffff;
                    text-align: center;
                    border-radius: 24px;
                }
            }
        }

    }
</style>

