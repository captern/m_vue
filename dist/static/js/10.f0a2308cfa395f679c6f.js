webpackJsonp([10],{"+pc4":function(e,a,t){"use strict";function n(e){t("d0LK")}Object.defineProperty(a,"__esModule",{value:!0});var d=t("LQ9x"),i=t("Cz8s"),s=t("d37j"),v=t("JA8L"),A=t("Uoa1"),o={data:function(){return{newsList:""}},mounted:function(){var e=this;Object(v.g)().then(function(a){console.log(a),a.status&&(e.newsList=a.data.list)})},computed:{},methods:{},components:{Slider:d.a,Header:i.a,alertTip:A.a,TwoLanguageTitle:s.a}},l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"news-list-page"},[t("Header",{attrs:{title:"公告"}}),e._v(" "),e.newsList?t("div",{staticClass:"news"},e._l(e.newsList,function(a,n){return t("router-link",{key:n,staticClass:"news-item",attrs:{to:"/news/"+a.id,newsId:a.id}},[t("img",{staticClass:"news-img",attrs:{src:a.cover,alt:"tupian"}}),e._v(" "),t("div",{staticClass:"news-dec"},[t("div",{staticClass:"news-title",domProps:{innerHTML:e._s(a.content)}}),e._v(" "),t("div",{staticClass:"news-time"},[e._v(e._s(a.updated_time))])])])})):e._e()],1)},r=[],c={render:l,staticRenderFns:r},C=c,b=t("VU/8"),m=n,g=b(o,C,!1,m,"data-v-50e7e244",null);a.default=g.exports},"b+/W":function(e,a,t){a=e.exports=t("FZ+f")(!0),a.push([e.i,"a[data-v-50e7e244],abbr[data-v-50e7e244],acronym[data-v-50e7e244],address[data-v-50e7e244],applet[data-v-50e7e244],article[data-v-50e7e244],aside[data-v-50e7e244],audio[data-v-50e7e244],b[data-v-50e7e244],big[data-v-50e7e244],blockquote[data-v-50e7e244],body[data-v-50e7e244],canvas[data-v-50e7e244],caption[data-v-50e7e244],center[data-v-50e7e244],cite[data-v-50e7e244],code[data-v-50e7e244],dd[data-v-50e7e244],del[data-v-50e7e244],details[data-v-50e7e244],dfn[data-v-50e7e244],div[data-v-50e7e244],dl[data-v-50e7e244],dt[data-v-50e7e244],em[data-v-50e7e244],embed[data-v-50e7e244],fieldset[data-v-50e7e244],figcaption[data-v-50e7e244],figure[data-v-50e7e244],footer[data-v-50e7e244],form[data-v-50e7e244],h1[data-v-50e7e244],h2[data-v-50e7e244],h3[data-v-50e7e244],h4[data-v-50e7e244],h5[data-v-50e7e244],h6[data-v-50e7e244],header[data-v-50e7e244],html[data-v-50e7e244],i[data-v-50e7e244],iframe[data-v-50e7e244],img[data-v-50e7e244],input[data-v-50e7e244],ins[data-v-50e7e244],kbd[data-v-50e7e244],label[data-v-50e7e244],legend[data-v-50e7e244],li[data-v-50e7e244],mark[data-v-50e7e244],menu[data-v-50e7e244],nav[data-v-50e7e244],object[data-v-50e7e244],ol[data-v-50e7e244],output[data-v-50e7e244],p[data-v-50e7e244],pre[data-v-50e7e244],q[data-v-50e7e244],ruby[data-v-50e7e244],s[data-v-50e7e244],samp[data-v-50e7e244],section[data-v-50e7e244],small[data-v-50e7e244],span[data-v-50e7e244],strike[data-v-50e7e244],strong[data-v-50e7e244],sub[data-v-50e7e244],summary[data-v-50e7e244],sup[data-v-50e7e244],table[data-v-50e7e244],tbody[data-v-50e7e244],td[data-v-50e7e244],tfoot[data-v-50e7e244],th[data-v-50e7e244],thead[data-v-50e7e244],time[data-v-50e7e244],tr[data-v-50e7e244],tt[data-v-50e7e244],u[data-v-50e7e244],ul[data-v-50e7e244],var[data-v-50e7e244],video[data-v-50e7e244]{margin:0;padding:0;border:0;font-size:100%;font-weight:400;vertical-align:baseline}article[data-v-50e7e244],aside[data-v-50e7e244],details[data-v-50e7e244],figcaption[data-v-50e7e244],figure[data-v-50e7e244],footer[data-v-50e7e244],header[data-v-50e7e244],menu[data-v-50e7e244],nav[data-v-50e7e244],section[data-v-50e7e244]{display:block}body[data-v-50e7e244]{line-height:1}blockquote[data-v-50e7e244],q[data-v-50e7e244]{quotes:none}blockquote[data-v-50e7e244]:after,blockquote[data-v-50e7e244]:before,q[data-v-50e7e244]:after,q[data-v-50e7e244]:before{content:none}table[data-v-50e7e244]{border-collapse:collapse;border-spacing:0}a[data-v-50e7e244]{color:#7e8c8d;-webkit-backface-visibility:hidden;text-decoration:none}li[data-v-50e7e244]{list-style:none}body[data-v-50e7e244]{-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}body[data-v-50e7e244],html[data-v-50e7e244]{line-height:1;font-family:PingFang SC,STHeitiSC-Light,Helvetica-Light,arial,sans-serif;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;background:#fff}.news-list-page .news[data-v-50e7e244]{margin:.338491rem}.news-list-page .news .news-item[data-v-50e7e244]{background-color:#fff;padding:.357834rem .357834rem 0;border-radius:.232108rem;margin-bottom:.241779rem;display:block}.news-list-page .news .news-item .news-img[data-v-50e7e244]{width:8.549323rem;height:3.646035rem;display:block}.news-list-page .news .news-item .news-dec[data-v-50e7e244]{height:.98646rem;line-height:.98646rem;display:-webkit-box;display:-ms-flexbox;display:flex}.news-list-page .news .news-item .news-dec .news-title[data-v-50e7e244]{-webkit-box-flex:7;-ms-flex:7;flex:7;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.news-list-page .news .news-item .news-dec .news-time[data-v-50e7e244]{-webkit-box-flex:3;-ms-flex:3;flex:3;color:#b2b2b2;text-align:right}","",{version:3,sources:["/Users/captern/money/m_vue/src/pages/notice/noticeList.vue"],names:[],mappings:"AAIA,2vDAiFE,SAAU,AACV,UAAW,AACX,SAAU,AACV,eAAgB,AAChB,gBAAoB,AACpB,uBAAyB,CAC1B,AAGD,iPAUE,aAAe,CAChB,AACD,sBACE,aAAe,CAChB,AACD,+CAEE,WAAa,CACd,AACD,wHAIE,YAAc,CACf,AACD,uBACE,yBAA0B,AAC1B,gBAAkB,CACnB,AAGD,mBACE,cAAe,AACf,mCAAoC,AACpC,oBAAsB,CACvB,AACD,oBACE,eAAiB,CAClB,AACD,sBACE,8BAA+B,AAC/B,yCAA8C,CAC/C,AACD,4CAEE,cAAe,AACf,yEAA2G,AAC3G,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,iBAAkB,AAC1B,wCAAyC,AACzC,eAAoB,CACrB,AACD,uCACE,iBAAoB,CACrB,AACD,kDACE,sBAA0B,AAC1B,gCAAmC,AACnC,yBAA2B,AAC3B,yBAA2B,AAC3B,aAAe,CAChB,AACD,4DACE,kBAAmB,AACnB,mBAAoB,AACpB,aAAe,CAChB,AACD,4DACE,iBAAmB,AACnB,sBAAwB,AACxB,oBAAqB,AACrB,oBAAqB,AACrB,YAAc,CACf,AACD,wEACE,mBAAoB,AAChB,WAAY,AACR,OAAQ,AAChB,gBAAiB,AACjB,uBAAwB,AACxB,kBAAoB,CACrB,AACD,uEACE,mBAAoB,AAChB,WAAY,AACR,OAAQ,AAChB,cAAe,AACf,gBAAkB,CACnB",file:"noticeList.vue",sourcesContent:["/**\n * Eric Meyer's Reset CSS v2.0 (http://meyerweb.com/eric/tools/css/reset/)\n * http://cssreset.com\n */\nhtml[data-v-50e7e244],\nbody[data-v-50e7e244],\ndiv[data-v-50e7e244],\nspan[data-v-50e7e244],\napplet[data-v-50e7e244],\nobject[data-v-50e7e244],\niframe[data-v-50e7e244],\nh1[data-v-50e7e244],\nh2[data-v-50e7e244],\nh3[data-v-50e7e244],\nh4[data-v-50e7e244],\nh5[data-v-50e7e244],\nh6[data-v-50e7e244],\np[data-v-50e7e244],\nblockquote[data-v-50e7e244],\npre[data-v-50e7e244],\na[data-v-50e7e244],\nabbr[data-v-50e7e244],\nacronym[data-v-50e7e244],\naddress[data-v-50e7e244],\nbig[data-v-50e7e244],\ncite[data-v-50e7e244],\ncode[data-v-50e7e244],\ndel[data-v-50e7e244],\ndfn[data-v-50e7e244],\nem[data-v-50e7e244],\nimg[data-v-50e7e244],\nins[data-v-50e7e244],\nkbd[data-v-50e7e244],\nq[data-v-50e7e244],\ns[data-v-50e7e244],\nsamp[data-v-50e7e244],\nsmall[data-v-50e7e244],\nstrike[data-v-50e7e244],\nstrong[data-v-50e7e244],\nsub[data-v-50e7e244],\nsup[data-v-50e7e244],\ntt[data-v-50e7e244],\nvar[data-v-50e7e244],\nb[data-v-50e7e244],\nu[data-v-50e7e244],\ni[data-v-50e7e244],\ncenter[data-v-50e7e244],\ndl[data-v-50e7e244],\ndt[data-v-50e7e244],\ndd[data-v-50e7e244],\nol[data-v-50e7e244],\nul[data-v-50e7e244],\nli[data-v-50e7e244],\nfieldset[data-v-50e7e244],\nform[data-v-50e7e244],\nlabel[data-v-50e7e244],\nlegend[data-v-50e7e244],\ntable[data-v-50e7e244],\ncaption[data-v-50e7e244],\ntbody[data-v-50e7e244],\ntfoot[data-v-50e7e244],\nthead[data-v-50e7e244],\ntr[data-v-50e7e244],\nth[data-v-50e7e244],\ntd[data-v-50e7e244],\narticle[data-v-50e7e244],\naside[data-v-50e7e244],\ncanvas[data-v-50e7e244],\ndetails[data-v-50e7e244],\nembed[data-v-50e7e244],\nfigure[data-v-50e7e244],\nfigcaption[data-v-50e7e244],\nfooter[data-v-50e7e244],\nheader[data-v-50e7e244],\nmenu[data-v-50e7e244],\nnav[data-v-50e7e244],\noutput[data-v-50e7e244],\nruby[data-v-50e7e244],\nsection[data-v-50e7e244],\nsummary[data-v-50e7e244],\ntime[data-v-50e7e244],\nmark[data-v-50e7e244],\naudio[data-v-50e7e244],\nvideo[data-v-50e7e244],\ninput[data-v-50e7e244] {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font-weight: normal;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle[data-v-50e7e244],\naside[data-v-50e7e244],\ndetails[data-v-50e7e244],\nfigcaption[data-v-50e7e244],\nfigure[data-v-50e7e244],\nfooter[data-v-50e7e244],\nheader[data-v-50e7e244],\nmenu[data-v-50e7e244],\nnav[data-v-50e7e244],\nsection[data-v-50e7e244] {\n  display: block;\n}\nbody[data-v-50e7e244] {\n  line-height: 1;\n}\nblockquote[data-v-50e7e244],\nq[data-v-50e7e244] {\n  quotes: none;\n}\nblockquote[data-v-50e7e244]:before,\nblockquote[data-v-50e7e244]:after,\nq[data-v-50e7e244]:before,\nq[data-v-50e7e244]:after {\n  content: none;\n}\ntable[data-v-50e7e244] {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* custom */\na[data-v-50e7e244] {\n  color: #7e8c8d;\n  -webkit-backface-visibility: hidden;\n  text-decoration: none;\n}\nli[data-v-50e7e244] {\n  list-style: none;\n}\nbody[data-v-50e7e244] {\n  -webkit-text-size-adjust: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nbody[data-v-50e7e244],\nhtml[data-v-50e7e244] {\n  line-height: 1;\n  font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  background: #FFFFFF;\n}\n.news-list-page .news[data-v-50e7e244] {\n  margin: 0.338491rem;\n}\n.news-list-page .news .news-item[data-v-50e7e244] {\n  background-color: #ffffff;\n  padding: 0.357834rem 0.357834rem 0;\n  border-radius: 0.232108rem;\n  margin-bottom: 0.241779rem;\n  display: block;\n}\n.news-list-page .news .news-item .news-img[data-v-50e7e244] {\n  width: 8.549323rem;\n  height: 3.646035rem;\n  display: block;\n}\n.news-list-page .news .news-item .news-dec[data-v-50e7e244] {\n  height: 0.98646rem;\n  line-height: 0.98646rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.news-list-page .news .news-item .news-dec .news-title[data-v-50e7e244] {\n  -webkit-box-flex: 7;\n      -ms-flex: 7;\n          flex: 7;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.news-list-page .news .news-item .news-dec .news-time[data-v-50e7e244] {\n  -webkit-box-flex: 3;\n      -ms-flex: 3;\n          flex: 3;\n  color: #b2b2b2;\n  text-align: right;\n}"],sourceRoot:""}])},d0LK:function(e,a,t){var n=t("b+/W");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);t("rjj0")("383f77f7",n,!0)}});
//# sourceMappingURL=10.f0a2308cfa395f679c6f.js.map