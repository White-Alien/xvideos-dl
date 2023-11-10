const axios = require("axios")
const cheerio = require("cheerio")
const entities = require("entities");
const FormData = require('form-data');
const qs = require('qs');
const pkg = require('./package.json'),

msg = 'Not Allowed Cracked Version..'
async function package() {
if (pkg.name != 'private-scraper') {
throw new Error(msg)
}
}
package()

module.exports.searchVideo = async (val) => {
 package()
 if (val.proxy === false || typeof val.proxy == "undefined"){
  try {
   var obj = {
    k: val.search,
    sort: val.sort,
    datef: val.filterDate,
    durf: val.filterDuration,
    quality: val.filterQuality,
    vw: val.viewWatched,
    p: val.pagination - 1,
    top: ''
   }
   Object.keys(obj).forEach(key => {
    if (obj[key] === (undefined || "undefined")) {
     delete obj[key];
    }
   });
   query = qs.stringify(obj);
   let url = `http://www.xvideos2.com/?${query}`
   var {data} = await axios(url)
   $ = cheerio.load(data)
   let videosContainer = $("div[id='content'] div[class='mozaique cust-nb-cols'] div[class='thumb-block  ']");
   let arr = [];
   videosContainer.each((idx, el) => {
    let obj = {};
    obj.video = "https:\/\/www.xvideos2.com"+$(el).children("div[class='thumb-inside']").children("div[class='thumb']").children("a").attr("href");
    obj.thumbnail = $(el).children("div[class='thumb-inside']").children("div[class='thumb']").children("a").children("img").attr("data-src");
    obj.title = $(el).children("div[class='thumb-under']").children("p").children("a").attr("title");
    obj.duration = $(el).children("div[class='thumb-under']").children("p").children("a").children("span[class='duration']").text();
    obj.uploaderName = $(el).children("div[class='thumb-under']").children("p[class='metadata']").children("span").children("span").children("a").children("span[class='name']").text();
    obj.uploaderProfile = "https:\/\/www.xvideos2.com"+$(el).children("div[class='thumb-under']").children("p[class='metadata']").children("span").children("span").children("a").attr("href");
    arr.push(obj);
   });
   return arr
  }
  catch (e){
   return e.response
  }
 } else if (val.proxy === true) {
  try {
   var obj = {
    k: val.search,
    sort: val.sort,
    datef: val.filterDate,
    durf: val.filterDuration,
    quality: val.filterQuality,
    vw: val.viewWatched,
    p: val.pagination - 1,
    top: ''
   }
   Object.keys(obj).forEach(key => {
    if (obj[key] === (undefined || "undefined")) {
     delete obj[key];
    }
   });
   query = qs.stringify(obj)
   query = "http://www.xvideos2.com/?"+query
   var bodyFormData = new FormData();
   bodyFormData.append('url', query);
   let html = await axios({
    method: "post",
    url: "https://zend2.com/index.php",
    data: bodyFormData,
    headers: {
     "Content-Type": "multipart/form-data"
    }
   })
   $ = cheerio.load(html.data)
   let videosContainer = $("div[id='content'] div[class='mozaique cust-nb-cols'] div[class='thumb-block  ']");
   let arr = [];
   videosContainer.each((idx, el) => {
    let obj = {};
    obj.video = $(el).children("div[class='thumb-inside']").children("div[class='thumb']").children("a").attr("href");
    obj.title = $(el).children("div[class='thumb-under']").children("p").children("a").attr("title");
    obj.duration = $(el).children("div[class='thumb-under']").children("p").children("a").children("span[class='duration']").text();
    obj.uploaderName = $(el).children("div[class='thumb-under']").children("p[class='metadata']").children("span").children("span").children("a").children("span[class='name']").text();
    obj.uploaderProfile = $(el).children("div[class='thumb-under']").children("p[class='metadata']").children("span").children("span").children("a").attr("href");
    arr.push(obj);
   });
   return arr
  }
  catch (e){
   return e.response
  }
 }
}

module.exports.getVideoData = async (val) => {
 package()
 if (val.proxy === false || typeof val.proxy == "undefined"){
  try {
   var {data} = await axios(val.videoUrl)
   $ = cheerio.load(data)
   let obj = {}
   obj.Default_Quality = $($("div[id='html5video'] div[id='html5video_base'] div").children("a")[0]).attr("href")
   obj.Low_Quality = $($("div[id='html5video'] div[id='html5video_base'] div").children("a")[1]).attr("href")
   obj.HD_Quality = $($("div[id='html5video'] div[id='html5video_base'] div").children("a")[2]).attr("href")
   obj.UHD_Quality = $($("script")[8]).text().split("setVideoHLS")[1].split("('")[1].split("')")[0]
   let arr = [JSON.parse($($("script")[2]).text().replace(/@/g,""))]
   arr[0].contentUrl = obj
   arr[0].name = entities.decodeHTML(arr[0].name)
   arr[0].description = entities.decodeHTML(arr[0].description)
   arr[0].interactionStatistic.userInteractionCount = arr[0].interactionStatistic.userInteractionCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" Views";
   const {type,context,duration, ...newObj} = arr[0]
   return {...newObj}
  }
  catch (e){
   return e.response
  }
 } else if (val.proxy === true){
  try {
   var {data} = await axios.get(val.videoUrl)
   $ = cheerio.load(data)
   var arr = [JSON.parse($($("script")[2]).text().replace(/@/g,""))]
   arr[0].name = entities.decodeHTML(arr[0].name)
   arr[0].description = entities.decodeHTML(arr[0].description)
   const {type,context,duration, ...newObj} = arr[0]
   return {...newObj}
  }
  catch (e){
   return e.response
  }
 }
}

module.exports.mediafire = async (url) => {
    package()
    const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/','')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
    const $ = cheerio.load(res.data);
    const link = $('#downloadButton').attr('href');
    const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ','').replaceAll('\n','');
    const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text()
    const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ','');
    let mime = '';
    let rese = await axios.head(link)
    mime = rese.headers['content-type']
    return { name ,size ,date ,mime ,link };        
}

module.exports.fbdl = async (Link) => {
    package()
    return new Promise (async (resolve, reject) => {
	const BodyForm = {
	url: Link
	}
	await axios({
	url: "https://www.getfvid.com/downloader",
	method: "POST",
	data:  new URLSearchParams(Object.entries(BodyForm)),
	headers: {
	"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
	"accept-language": "en-US,en;q=0.9,id;q=0.8",
	"cache-control": "max-age=0",
	"content-type": "application/x-www-form-urlencoded",
	"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
	'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
	}
	}).then(respon => {
	const $ = cheerio.load(respon.data)
	let HD = $("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered").find('div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a').attr('href')
	let Normal = $("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered").find('div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(2) > a').attr("href")
	let AU = $("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(3) > a").attr("href")
    let tt = $("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-5.no-padd > div > h5 > a").text()
	const result = {
	status: true,
	author: "Nimesh Official",
	result: {
    Title: tt,
	HD: HD,
	SD: Normal,
    Audio: AU
	}
	}
	resolve(result)
	}).catch(reject)
	})
}

module.exports.ringtone = async (text) => {
    return new Promise((resolve, reject) => {
        axios.get('https://meloboom.com/en/search/'+text)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let hasil = []
            $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function (a, b) {
                hasil.push({ title: $(b).find('h4').text(), source: 'https://meloboom.com/'+$(b).find('a').attr('href'), audio: $(b).find('audio').attr('src') })
            })
            resolve(hasil)
        })
    })
}

module.exports.ssweb = async (url, device = 'desktop') => {
    return new Promise((resolve, reject) => {
         const base = 'https://www.screenshotmachine.com'
         const param = {
           url: url,
           device: device,
           cacheLimit: 0
         }
         axios({url: base + '/capture.php',
              method: 'POST',
              data: new URLSearchParams(Object.entries(param)),
              headers: {
                   'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
         }).then((data) => {
              const cookies = data.headers['set-cookie']
              if (data.data.status == 'success') {
                   axios.get(base + '/' + data.data.link, {
                        headers: {
                             'cookie': cookies.join('')
                        },
                        responseType: 'arraybuffer'
                   }).then(({ data }) => {
                       result = {
                           status: 200,
                           result: data
                       }
                        resolve(result)
                   })
              } else {
                   reject({ status: 404, statuses: `Link Error`, message: data.data })
              }
         }).catch(reject)
    })
      }
