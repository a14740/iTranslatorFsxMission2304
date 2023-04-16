// ==UserScript==
// @name         iTranslatorFsxMission2304
// @version      20230416
// @author       IMQSQ
// @homepage     https://www.hezibuluo.com/159129.html
// @namespace    https://www.hezibuluo.com/159129.html
// @description  👆👆👆 FSX任务文档翻译，修复飞行计划文件。支持8种语言互相翻译（中、英、法、日、德、俄、韩、西班牙），全面支持 Google 谷歌翻译、百度翻译、彩云小译、有道翻译、阿里翻译、必应翻译、搜狗翻译、爱词霸翻译。👆👆👆
// @license      AGPL-3.0-or-later
// @require      https://lib.baomitu.com/limonte-sweetalert2/10.16.6/sweetalert2.all.min.js
// @require      https://lib.baomitu.com/crypto-js/3.3.0/crypto-js.min.js
// @require      https://lib.baomitu.com/jquery/3.6.0/jquery.min.js
// @grant        unsafeWindow
// @grant        GM_info
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_openInTab
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @compatible   chrome
// @connect      sssam.com
// @connect      ooopn.com
// @connect      qq.com
// @connect      so.com
// @connect      00ew.com
// @connect      bing.com
// @connect      00vh.com
// @connect      baidu.com
// @connect      iciba.com
// @connect      sogou.com
// @connect      youdao.com
// @connect      taobao.com
// @connect      google.com
// @connect      alibaba.com
// @connect      ydstatic.com
// @connect      caiyunai.com
// @connect      googleapis.com
// @connect      *
// @match        file:///*iTranslatorFsxMission2304.html
// @run-at      document-idle
// ==/UserScript==
/*str2gbk*/
let table;function initGbkTable(){const ranges=[[0xA1,0xA9,0xA1,0xFE],[0xB0,0xF7,0xA1,0xFE],[0x81,0xA0,0x40,0xFE],[0xAA,0xFE,0x40,0xA0],[0xA8,0xA9,0x40,0xA0],[0xAA,0xAF,0xA1,0xFE],[0xF8,0xFE,0xA1,0xFE],[0xA1,0xA7,0x40,0xA0],];const codes=new Uint16Array(23940);let i=0;for(const[b1Begin,b1End,b2Begin,b2End]of ranges){for(let b2=b2Begin;b2<=b2End;b2++){if(b2!==0x7F){for(let b1=b1Begin;b1<=b1End;b1++){codes[i++]=b2<<8|b1}}}}table=new Uint16Array(65536);table.fill(0xFFFF);const str=new TextDecoder('gbk').decode(codes);for(let i=0;i<str.length;i++){table[str.charCodeAt(i)]=codes[i]}}const NodeJsBufAlloc=typeof Buffer==='function'&&Buffer.allocUnsafe;const defaultOnAlloc=NodeJsBufAlloc?(len)=>NodeJsBufAlloc(len):(len)=>new Uint8Array(len);const defaultOnError=()=>63;function str2gbk(str,opt={}){if(!table){initGbkTable()}const onAlloc=opt.onAlloc||defaultOnAlloc;const onError=opt.onError||defaultOnError;const buf=onAlloc(str.length*2);let n=0;for(let i=0;i<str.length;i++){const code=str.charCodeAt(i);if(code<0x80){buf[n++]=code;continue}const gbk=table[code];if(gbk!==0xFFFF){buf[n++]=gbk;buf[n++]=gbk>>8}else if(code===8364){buf[n++]=0x80}else{const ret=onError(i,str);if(ret===-1){break}if(ret>0xFF){buf[n++]=ret;buf[n++]=ret>>8}else{buf[n++]=ret}}}return buf.subarray(0,n)}

(function() {
    'use strict';
    var translationEngine ="必应翻译";
    var tgoing, random, lang, odata = {}, tdata = {}, kdata = {}, result = {}, initOption = {}, $ = jQuery, doc = $(document), site = document.URL.toString();
    const def = {
        t_crx : "b29vcG4uY29tL3N0YXRpYy9jcng=",
        t_req : "aHR0cDovL2Mub29vcG4uY29tL2FwaT90eXBlPWluZm8mY2lkPWl0cmFuc2xhdG9y",
        t_tua : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.119 Safari/537.36",
        t_ydt : "&smartresult=dict&client=fanyideskweb&bv=11b89db74b56b4ba918674d36e95a672&doctype=json&version=2.1&keyfrom=fanyi.web&action=FY_BY_REALTlME",
        t_tip : "脚本安装成功，请重新刷新网页使用吧！功能简介如下：\r\n\r\n(1) 多功能网页翻译工具，支持多种翻译引擎\r\n\r\n(2) 快捷键翻译：选中文字，按 T 翻译，按 Y 取消（快捷键可修改）\r\n\r\n(3) 独立面板翻译：可显示多个翻译结果，支持 8 种语言互相翻译\r\n\r\n(4) 可自定义更换翻译结果显示位置，自定义更换翻译字体颜色"
    };

    let toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
    let base = {
        d(str) { return decodeURIComponent(escape(atob(str))) },
        e(str) { return btoa(unescape(encodeURIComponent(str))) },
        decode(str) { return decodeURIComponent(str) },
        encode(str) { return encodeURIComponent(str) },
        setV(name, value) { GM_setValue(name, value) },
        getV(name) { return GM_getValue(name) },
        delV(name) { GM_deleteValue(name) },
        isType(obj) { return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase(); },
        get(url, type) {
            return new Promise((resolve,reject) => {
                GM_xmlhttpRequest({
                    method: "GET", url,
                    headers: { "User-Agent": def.t_tua },
                    responseType: type || 'json',
                    onload: (res) => { resolve(res.response || res.responseText) },
                    onerror: (e) => { reject(e) }
                });
            });
        },
        post(url, data, headers, h) {
            if (this.isType(data) === 'object') { data = JSON.stringify(data); }
            headers === undefined || headers.length == 0 ? headers = h === undefined ? { "Content-Type":"application/x-www-form-urlencoded" } : { "Content-Type":"application/json", "User-Agent": def.t_tua }:'';
            return new Promise((resolve,reject) => {
                GM_xmlhttpRequest({
                    method: "POST", url, data, headers,
                    responseType: "json",
                    onload: (res) => { resolve(res.response || res.responseText) },
                    onerror: (e) => { reject(e) }
                });
            });
        },

        async getBaseURL(){
            var rUrl = base.d(def.t_req);
            var tdata_times = base.getV('tdata_times');
            if( tdata_times === undefined || new Date().getTime() - tdata_times > 2.5e8 ){
                result = await base.get ( rUrl );
                if( tdata_times === undefined ){ alert(def.t_tip); location.reload() }
                if( result.version > GM_info.script.version ) base.setV("newVersion", result.website);
                base.setV('tdata_times', new Date().getTime());
                base.setV('tdata', result.info);
            }
            if( base.getV('odata') ) odata = base.getV('odata');
            if( base.getV('tdata') ) tdata = JSON.parse( base.d( base.getV('tdata') ) );
            if( base.getV('kdata') === undefined || base.getV('kdata_time') === undefined || new Date().getTime() - base.getV('kdata_time') > 7.2e6 ) upToken.all();
        },

    };

    let func = {
        tk(a,b){
            if(b === undefined) return;
            var d = b.split("."); b = Number(d[0]) || 0;
            for (var e = [], f = 0, g = 0; g < a.length; g++) {
                var k = a.charCodeAt(g);
                128 > k ? e[f++] = k : (2048 > k ? e[f++] = k >> 6 | 192 : (55296 == (k & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (k = 65536 + ((k & 1023) << 10) + (a.charCodeAt(++g) & 1023), e[f++] = k >> 18 | 240, e[f++] = k >> 12 & 63 | 128) : e[f++] = k >> 12 | 224, e[f++] = k >> 6 & 63 | 128), e[f++] = k & 63 | 128);
            }
            a = b; for (f = 0; f < e.length; f++)a = this.Fo(a+e[f], "+-a^+6");
            a = this.Fo(a, "+-3^+b+-f"); a ^= Number(d[1]) || 0;
            0 > a && (a = (a & 2147483647) + 2147483648); a %= 1E6;
            return a.toString() + "." + (a ^ b);
        },
        Fo(a, b) {
            for (var c = 0; c < b.length - 2; c += 3) {
                var d = b.charAt(c + 2);
                d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d);
                d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
                a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d;
            }
            return a;
        },
        caide(t) {
            function ee(t) { return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(t) }
            t = t.split("").map(function(t) { return - 1 < ee(t) ? "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm" [ee(t)] : t }).join("");
            return base.d(t).toString();
        }
    };

    let upToken = {
        async bing(){
            var res = await base.get( tdata.bing+'/translator' );
            kdata.ig = res.match(/IG:"([A-Za-z0-9]+)"/)[1];
            [, kdata.key, kdata.token] = res.match(/var params_AbusePreventionHelper\s*=\s*\[([0-9]+),\s*"([^"]+)",[^\]]*\];/);
            kdata.iid = $(res).find("#rich_tta").attr("data-iid");
            base.setV("kdata", kdata );
        },
        async ali(){
            var csrf = await base.get(tdata.csrf);
            kdata.csrf = csrf.token;
            base.setV("kdata", kdata );
        },
        async bdt(){
            var res = await base.get(tdata.bdt);
            kdata.gtk = /window\.gtk = ['"](.*?)['"]/.exec(res)[1];
            kdata.btoken = /token: ['"](.*?)['"]/.exec(res)[1];
            base.setV("kdata", kdata );
        },
        async cai(){
            kdata.caid = CryptoJS.MD5(Math.random().toString()).toString();
            var data = {"browser_id": kdata.caid };
            var header = { "Content-Type": "application/json", "X-Authorization": "token:"+tdata.cait, "origin": "https://fanyi.caiyunapp.com" };
            var res = await base.post(tdata.cai+'/user/jwt/generate',data,header);
            kdata.jwt = res.jwt;
            base.setV("kdata", kdata );
        },
        async ydt(){
            var r = await base.get("https://fanyi.youdao.com");
            var n = r.match(/<script.*?src="(http[^"]+fanyi\.min\.js)"/);
            var p = await base.get(n[1]);
            kdata.ydt = p.match(/sign: n\.md5\("fanyideskweb" \+ e \+ i \+ "([^"]+)"\)/)[1];
            base.setV("kdata", kdata );
        },
        async qqt(){
            var res = await base.post(tdata.qqt+'/reauth12f','','',1);
            kdata.qtv = res.qtv;
            kdata.qtk = res.qtk;
            base.setV("kdata", kdata );
        },
        all(){
            this.bing(); this.ali(); this.bdt(); this.cai(); base.setV("kdata_time", new Date().getTime() );
        }
    };

    let utils = {
        trans :'',
        async getTransInfo(e,node,engine){
            this.trans =''; //let strTrans ='';
            var t_num = 0, ele = $(".itranslator_span");
            ele.each((i,v) => { let m = parseInt( $(v).attr("value") ); if( m > t_num ) t_num = m; });
            if( base.getV("newVersion") ){ alert("iTranslator 发现新版本，请及时更新脚本！"); GM_openInTab( base.getV("newVersion"), { active: true }); base.delV("newVersion"); }
            if( e ){
                var sp, tspan = document.createElement("span"), eng = engine ? engine : odata.itran_engine, num = { "必应翻译": 2500, "有道翻译": 600 };
                if( !engine || e.length > 5e3 ) { $(tspan).addClass("itranslator_span").attr("value",++t_num).text(" "+odata.itran_engine+"等待中... "); node.insertNode(tspan); }
                if( e.length > 5e3 ){
                    $(tspan).text(" 字数过多，翻译暂不可用，请减少字数重试...");
                } else {
                    tspan=engine===undefined?tspan:node; sp=engine===undefined?' ':'';
                    if( !num[eng] || e.length < num[eng] ){
                        await utils.getTransText(e,tspan,eng);
                    } else {
                        $(tspan).text(sp+eng+"只能翻译"+num[eng]+"字符以内，请减少字数重试...");
                    }
                }
            } else { $(".itranslator_span[value=" + t_num + "]").remove() }
          return this.trans;
        },
        async getTransText(e,node,eng){
            var tapi, url, data, header, sign, num = 0, res = "", resTxt = "", ee = e.replace(/[，：“”‘’{}【】。、・=「」『』（）〔〕［］－～？！……]/g,''),
            tolang = { "自动检测":"auto", "中文":"zh", "英语":"en", "法语":"fr", "日语":"ja", "德语":"de", "俄语":"ru", "韩语":"ko", "西班牙":"es" },
            langZH = { "有道翻译":"zh-CHS", "谷歌翻译":"zh-CN", "必应翻译":"zh-Hans", "搜狗翻译":"zh-CHS"}, bde = {"日语":"jp", "韩语":"kor", "法语":"fra", "西班牙":"spa"};
            tgoing = true; kdata = base.getV('kdata'); e = e.replace(/\r|\n|\r\n/g,' ');
            lang = ( /[\u4E00-\u9FA5]/g.test(ee) && !/[\u0800-\u4e00]/g.test(ee) ) ? "en" : "zh";
            lang = odata.itran_tolang === '自动检测' ? lang : tolang[odata.itran_tolang]; if(lang === "zh" && langZH[eng] ) lang = langZH[eng];
            switch( eng ){
                case "彩云小译": while ( !resTxt.length && num < 2){
                    data = {"source":e,"trans_type":"auto2"+lang,"request_id":"web_fanyi","media":"text","os_type":"web","dict":true,"cached":true,"replaced":true,"detect":true,"browser_id":kdata.caid};
                    header = { "X-Authorization": "token:"+tdata.cait, "T-Authorization": kdata.jwt, "User-Agent": def.t_tua };
                    res = await base.post(tdata.cai+'/translator',data,header); resTxt = res.target ? func.caide(res.target) : '';
                    !resTxt.length && await upToken.cai(); num++ }; utils.transOutput(resTxt,node); break;
                case "百度翻译": while ( !resTxt.length && num < 2){
                    if( bde[odata.itran_tolang] ) lang = bde[odata.itran_tolang];
                    var e_r = e.length>30?(e.substr(0,10)+e.substr(~~(e.length/2)-5,10)+e.substr(-10)):e;
                    data = `from=auto&to=${lang}&query=${base.encode(e)}&simple_means_flag=3&sign=${func.tk(e_r,kdata.gtk)}&token=${kdata.btoken}&domain=common`;
                    res = await base.post(tdata.bdt+'/v2transapi',data); resTxt = res.trans_result ? res.trans_result.data[0].dst : '';
                    !resTxt.length && await upToken.bdt(); num++ }; utils.transOutput(resTxt,node); break;
                case "阿里翻译": while ( !resTxt.length && num < 2){
                    data = `srcLang=auto&tgtLang=${lang}&domain=general&_csrf=${kdata.csrf}&query=${base.encode(e)}`;
                    res = await base.post(tdata.ali,data); resTxt = res.data ? res.data.translateText : '';
                    !resTxt.length && await upToken.ali(); num++ }; utils.transOutput(resTxt,node); break;
                case "必应翻译": while ( !resTxt.length && num < 2){
                    url = `${tdata.bing}/ttranslatev3?isVertical=1&&IG=${kdata.ig}&IID=${kdata.iid}`;
                    data = `fromLang=auto-detect&to=${lang}&token=${kdata.token}&key=${kdata.key}&text=${base.encode(e)}`;
                    res = await base.post(url,data); resTxt = res[0] ? res[0].translations[0].text : '';
                    !resTxt.length && await upToken.bing(); num++ }; utils.transOutput(resTxt,node); break;
                /*case "腾讯翻译": while ( !resTxt.length && num < 2){ if(lang == "zh") lang = "zh-CN";
                    data = `source=auto&target=${lang}&sourceText=${base.encode(e)}&qtv=${base.encode(kdata.qtv)}&qtk=${base.encode(kdata.qtk)}&sessionUuid=translate_uuid${new Date().getTime()}`;
                    header = { "Host":"fanyi.qq.com", "Origin":"https://fanyi.qq.com", "Content-Type": "application/x-www-form-urlencoded", "Referer": "https://fanyi.qq.com/", "User-Agent": def.t_tua }
                    res = await base.post(tdata.qqt+'/translate',data,header); console.log(res); resTxt = res.translate.records ? res.translate.records[0].targetText : '';
                    !resTxt.length && await upToken.qqt(); num++ }; utils.transOutput(resTxt,node);
                    break;*/
                case "有道翻译":
                    /* while ( !resTxt.length && num < 2){
                    var lts = "" + new Date().getTime(), salt = lts + Math.floor(10 * Math.random()); sign = CryptoJS.MD5("fanyideskweb" + e + salt + kdata.ydt);
                    data = `i=${base.encode(e)}&salt=${salt}&sign=${sign}<s=${lts}${def.t_ydt}&from=AUTO&to=${lang}`;
                    res = await base.post(tdata.ydt,data,header); if(res.translateResult){ for( var i in res.translateResult[0] ) resTxt += res.translateResult[0][i].tgt };
                    !resTxt.length && await upToken.ydt(); num++ }; utils.transOutput(resTxt,node); break;*/
                    data = "type=AUTO&inputtext=" + base.encode(e); res = await base.post(tdata.ydm,data);
                    resTxt = $(res).find("#translateResult li").text() ? $(res).find("#translateResult li").text() : '';
                    utils.transOutput(resTxt,node); break;
                case "谷歌翻译":
                    tapi = Math.random() > 0.5 ? tdata.ggt : tdata.gmt;
                    url = tapi + lang + "&q=" + base.encode(e); setTimeout(() => { tgoing = false; }, 3e3);
                    $.getJSON(url, (res) => { if( res ) for(const i in res[0]) resTxt += res[0][i][0]; utils.transOutput(resTxt,node) }); break;
                case "搜狗翻译":
                    utils.transOutput( '', node, tdata.sgt + base.encode(e) + '&transto=' + lang, "#trans-result" ); break;
                default:
                    sign = CryptoJS.MD5( tdata.ticb + e.replace(/(^\s*)|(\s*$)/g, "") ).toString().substring(0,16);
                    data = `from=auto&t=${lang}&q=${base.encode(e)}`; res = await base.post(tdata.icb + sign,data);
                    resTxt = res.content ? res.content.out : ''; utils.transOutput(resTxt,node); break;
            }
        },
        async transOutput(e,node,url,s){
          //this.trans ='';
            var sp = $(node).is(".itranslator_span")?' ':'';
            if ( url && url.length > 0 ) {
                var res = await base.get(url);
                if(res) e += $(res).find(s).text(); tgoing = false;
                e.length > 0 ? $(node).text(sp+e+sp) : $(node).text(sp+"翻译暂不可用，请稍后重新尝试...");
            } else {
                tgoing = false; e.length > 0 ? this.trans=e : $(node).text(sp+"翻译暂不可用，请稍后重新尝试...");
            }
            setTimeout(() => { tgoing = false; }, 3e3);
          //console.log(this.trans);
        },
    }

  let downloadBlob = (blob, fileName) => {
    try {
        const href = window.URL.createObjectURL(blob); //创建下载的链接
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            // 谷歌浏览器 创建a标签 添加download属性下载
            const downloadElement = document.createElement("a");
            downloadElement.href = href;
            downloadElement.target = "_blank";
            downloadElement.download = fileName;
            document.body.appendChild(downloadElement);
            downloadElement.click(); // 点击下载
            document.body.removeChild(downloadElement); // 下载完成移除元素
            window.URL.revokeObjectURL(href); // 释放掉blob对象
        }
    } catch (e) { console.log("下载失败"); }
  };

    async function replaceSaveFile(fileText,fname,gbkEncoding){
      let ft =fileText.replaceAll(/([NSWE]\d{1,3})([^\x00-\x7F]|[\?])/gm,function(){return arguments[1]+"*"});
      if(gbkEncoding) ft =str2gbk(ft);
      let blob = new Blob([ft]);
      downloadBlob(blob, fname);
    }

    async function getXmlTrans(readerResult,fname){
      let parser=new DOMParser();
      let fileDoc=parser.parseFromString(readerResult,"text/xml");
      let nodeList=fileDoc.getElementsByTagName("Text");
      for(let e of nodeList){
            let str = e.textContent;
            if (/[\u4E00-\u9FFF]/.test(str)){
                //console.log('有中文，未翻译 '+str);
            } else{
                let strTrans =await utils.getTransInfo(str,'Trans',translationEngine);
                if(strTrans){
                  let isNextLine =" ";
                  if(str.length>50) isNextLine ="\n  ";
                  e.textContent = str+isNextLine+strTrans; }
            }
      }
      //console.log(fileDoc);
      let fileText =(new XMLSerializer()).serializeToString(fileDoc);
      fileText=fileText.replace("?><","?>\n\n<");
      console.log(fname+' 翻译完成');
      replaceSaveFile(fileText,fname);
    }

    async function getHtmlTrans(readerResult,fname){
      let parser=new DOMParser();
      let fileDoc=parser.parseFromString(readerResult,"text/html");
      let nodeList=fileDoc.getElementsByTagName("p");
      for(let e of nodeList){
            let str = e.innerText;
            if (/[\u4E00-\u9FFF]/.test(str)){
                //console.log('有中文，未翻译 '+str);
            } else{
              str =str.replace(/[\n ]+$/g,'');
              let strTrans =await utils.getTransInfo(str,'Trans',translationEngine);
              if(strTrans){
                let isNextLine =" ";
                if(str.length>50) isNextLine ="\n  ";
                e.innerText = str+isNextLine+strTrans; }
            }
      }
      //fileDoc.getElementsByTagName("META")[0].content="text/html; charset=UTF-8"
      let fileText =fileDoc.getElementsByTagName("*")[0].innerHTML;
      console.log(fname+' 翻译完成');
      let blob = new Blob([fileText]);
      downloadBlob(blob, fname);
    }

    async function getFltTrans(readerResult,fname){
      let fileText =readerResult;
      let strTrans =fileText.match(/(?<=Description=).+/)[0];
      //
      if (!/[\u4E00-\u9FFF]/.test(strTrans)){
        strTrans =await utils.getTransInfo(strTrans,'Trans',translationEngine);
        //console.log(strTrans);
        if(strTrans) fileText=fileText.replace(/(?<=Description=).+/, strTrans);
      }

      console.log(fname+' 翻译完成');
      replaceSaveFile(fileText,fname,'gbk');
    }

  base.getBaseURL();

  var fileAmount;
  let div=document.createElement("div");
  div.innerHTML='<br>FSX任务文档翻译，修复飞行计划文件。<input type="file" multiple accept="text/xml,text/html,.pln,.flt" id="infiles">';
  document.body.prepend(div);

        //获取到选中的文件
  var openFile = document.querySelector('#infiles')
  openFile.onchange = function () {
      let files = this.files;
      for (let i=0;i<files.length;i++){
        let file =files[i];
        let reader = new FileReader();
        let fileExtension=file.name.substring(file.name.lastIndexOf("."));
        switch(fileExtension.toLowerCase()){
                case ".htm":
                case ".html":
                  reader.readAsText(file);
                  reader.onload = function () {
                    let encoding =reader.result.match(/(?<=charset=).+(?=\")/i)[0];
                    if(encoding.toLowerCase() == 'utf-8'){console.log(file.name); getHtmlTrans(reader.result,file.name); } else{
                      reader.readAsText(file,encoding);
                      reader.onload = function () { console.log(file.name);let ft= reader.result.replace(/(?<=charset *= *).+(?= *\")/i,'UTF-8');getHtmlTrans(ft,file.name);}
                      } }
                   break;
                case ".xml":
                  reader.readAsText(file);
                  reader.onload = function () {
                    let encoding =reader.result.match(/(?<=encoding *= *\").+(?= *\")/i)[0];
                    if(encoding.toLowerCase() == 'utf-8'){ getXmlTrans(reader.result,file.name); } else{
                      reader.readAsText(file,encoding);
                      reader.onload = function () { let ft= reader.result.replace(/(?<=encoding *= *\").+(?= *\")/i,'UTF-8');getXmlTrans(ft,file.name);}
                    } }
                  break;
                case ".flt":
                  reader.readAsText(file,"gbk");
                  reader.onload = function () { getFltTrans(reader.result,file.name); }
                  break;
                case ".pln":
                  reader.readAsText(file);
                  reader.onload = function () { replaceSaveFile(reader.result,file.name); }
                  break;
          }
      }
    //alert("All Done.");
  }

//utils.getTransInfo('Welcome to beautiful Geneva, Switzerland. Today is a gorgeous day to be taking your first mountain flight in the Swiss Alps. Your roundtrip will take you over two mountain passes, an airport in a steep sided canyon and another airport in the heart of the Alps. Your instructor has already done the pre-flight check and is waiting for you inside the airplane. *** This is part 1 of 3. Visit www.vertical-studios.net to download the other parts. ***','trans',"必应翻译");
  console.log('iTranslatorMOD230408  OK');

})();