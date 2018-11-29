葡萄科技官网2.0版本开发环境
参与人员
前端：王晓鹏、程泽浩、王秋菊、程晓丹 后台：韩峰阳、张遇春 产品：沈小燕、何杰 测试：郭晶晶、黄秋萍

官网
测试环境地址 http://putao.ptdev.cn 后台入口：http://10.1.11.167:8180/admincp/login 账号密码：admin@putao.com/admin

静态资源地址
目录: css: pages/css/ images: static/img/ js: js/

测试环境:
基础地址：http://test.fe.ptdev.cn/putaosite/

图片：http://test.fe.ptdev.cn/putaosite/static/img/

css：http://test.fe.ptdev.cn/putaosite/pages/css/

js： http://test.fe.ptdev.cn/putaosite/js/

线上环境:
发版本之前如果需要清除线上缓存请更改版本号：年月日时 两处：config/webpack.base.config.js和src/static/staticversion.txt

git仓库：http://code.putao.io/web_client/putao_static_website
基础地址：https://static-www.putaocdn.com/pc/

图片：https://static-www.putaocdn.com/pc/static/img/

css：https://static-www.putaocdn.com/pc/pages/css/

js： https://static-www.putaocdn.com/pc/js/

跳转葡萄乐园vip小程序产品页配置规则
线上环境：https://h5.putao.com/miniproduct/?id=产品id
开发和测试环境：https://dev-fe.putao.com/ptly_statics/product/?id=产品id
若需修改以上地址请去小程序后台配置 https://mp.weixin.qq.com/wxopen/devprofile?action=get_profile&token=902731531&lang=zh_CN

注：官网产品购买页使用时需要使用生成二维码工具把上面地址生成二维码图片，再在后台上传图片；
