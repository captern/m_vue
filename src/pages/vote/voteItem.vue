<template>
    <div class="vote-item-page" v-wechat-title="$route.meta.title='投票详情'">
        <Header title='投票详情' noBackShow='noBackShow'/>
        <HomeIcon></HomeIcon>
        <div class="vote-item-area">
            <div class="check-icon" v-if="voteData.is_sub">已参与</div>
            <div class="header-area">
                <div class="title">{{voteData.name}}</div>
                <!--<div class="heart">-->
                <!--<img src="../../common/icon/icon-item-0@3x.png" alt="">-->
                <!--</div>-->
            </div>
            <div class="author-time">
                <div class="author">编辑：{{voteData.author}}</div>
                <div class="time">{{voteData.time}}</div>
            </div>
            <div class="vote-main" v-html="voteData.content"></div>
            <!--跳转 费图片-->
            <div v-if="!voteData.end">
                <router-link  :to="'/voteResult/'+ voteData.id" class="vote-btn">查看结果
                </router-link>
            </div>
            <div v-else="">
                <router-link v-if="voteData.is_img == 0" :to="'/postVote/'+ voteData.id" class="vote-btn">参与投票
                </router-link>
                <!--跳转图片-->
                <router-link v-else-if="voteData.is_img == 1" :to="'/voteOption/'+ voteData.id" class="vote-btn">参与投票
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {getUse, getBanner, getIndexLink} from '../../server/api'
    import Header from '../../components/header.vue'
    import HomeIcon from '../../components/common/homeIcon.vue'
    import {mapState, mapActions} from 'vuex'

    import {voteMain} from '../../server/voteApi'
    import wx from 'weixin-js-sdk'


    export default {
        data() {
            return {
                requestFlag: true, // 是否请求接口
                voteId: '',
                voteData: '',
                enlistTip: false,
                showAlert: false,
                alertText: '待定义'
            }
        },
        computed: {
            ...mapState([
                'userInfo',
                'login'
            ])
        },
        mounted() {
            this.voteId = this.$route.params.voteId;
            let getData = {
                id: this.voteId
            }
            voteMain(getData).then(res => {
                this.voteData = res.data;
                this.signPackage = res.signPackage;

                this.setShare();
            })
        },
        methods: {
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
                        title: _this.voteData.name, // 分享标题
                        link: _this.voteData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: _this.voteData.img, // 分享图标
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
                        title: _this.voteData.name, // 分享标题
                        desc: _this.voteData.name, // 分享描述
                        link: _this.voteData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: _this.voteData.img, // 分享图标
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
            HomeIcon
        },
    }
</script>

<style lang="scss">
    .vote-item-page {
        /*背景固定不滚动*/
        background: url("../../common/image/bkg/bkg-one.png");
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        /*会导致页面滚动不触发*/
        width: 100%;
        overflow: scroll;
        /*背景固定不滚动*/
        .check-icon {
            position: absolute;
            top: 23px;
            right: 46px;
            background: #0a5b8c;
            width: 70px;
            height: 27px;
            line-height: 27px;
            text-align: center;
            color: rgb(255, 255, 255);
            font-size: 18px;
            border-radius: 0 0 6px 6px;
        }
        .vote-item-area {
            background: #FFFFFF;
            margin: 23px;
            border-radius: 10px;
            padding: 30px 23px;
            min-height: calc(100vh - 106px);
            .header-area {
                display: flex;
                padding-bottom: 12px;
                border-bottom: 1px solid rgb(199, 199, 199);
                .title {
                    flex: 3;
                    font-size: 31px;
                    line-height: 39px;
                    color: #3ab2ed;
                }
                .heart {
                    flex: 1;
                    text-align: right;
                    vertical-align: top;
                    img {
                        width: 59px;
                        height: 59px;
                    }
                }
            }
            .author-time {
                display: flex;
                .author, .time {
                    flex: 1;
                    font-size: 17px;
                    line-height: 26px;
                    color: #b2b2b3;
                    margin: 10px 0 15px;
                }
                .time {
                    text-align: right;
                }
            }
            .vote-main {
                /*font-size: 19px;*/
                /*line-height: 30px;*/
                /*color: #000000;*/
                padding-bottom: 111px;
                img {
                    max-width: 100%;
                }
                video {
                    width: 100%;
                    height: auto;
                }
                iframe {
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
            .vote-btn {
                position: fixed;
                left: 46px;
                bottom: 55px;
                width: calc(100% - 92px);
                height: 66px;
                line-height: 66px;
                font-size: 30px;
                background: #3ab2ed;
                text-align: center;
                color: #ffffff;
                border-radius: 10px;
                &.no-jump {
                    background: #b3b3b3;
                }
            }
        }
    }
</style>

