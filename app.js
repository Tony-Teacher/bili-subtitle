/* import request function */
const axios = require("axios");
/* import write file method */
const { writeFile } = require("./main");

/**
 * variable
 */
// bilibili video url
// ====================- replace -========================
const REPLACE_URL =
  "https://www.bilibili.com/video/BV1Pf4y177Vp?seid=15249322987164438078";
// ======================- end -==========================

// subtitle array
const array = [];
// url keyword
let keyword = "";

/**
 * method
 */
/* get url keyword */
function handleUrl() {
  let str = "".concat(REPLACE_URL);
  str = str.split("?")[0];
  keyword = str.split("/").pop();
  getAllCid();
}
/* get video all cid */
function getAllCid() {
  axios
    .get(
      `https://api.bilibili.com/x/player/pagelist?bvid=${keyword}&jsonp=jsonp`
    )
    .then((res) => {
      let data = res.data;
      let arr = [];
      if (data.code === 0) {
        arr = data.data;
        getSubtitleArr(arr);
      }
    });
}
/* synchronization get request */
function getSubtitleArr(arr) {
  let num = 0;
  arr.forEach(async (item, index) => {
    await requestSubArr(item, index);
    if (num === arr.length - 1) {
      if (array.length) return getSubtitleText();
      else return console.log("No subtitles found");
    }
    num++;
  });
}
/* subtitle array request */
function requestSubArr(item, index) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.bilibili.com/x/web-interface/view?bvid=${keyword}&cid=${item.cid}`
      )
      .then((res) => {
        let data = res.data;
        if (data.code === 0) {
          if (data.data.subtitle.allow_submit) {
            array[index] = {
              url: data.data.subtitle.list[0].subtitle_url,
              title: data.data.title,
            };
          }
          resolve();
        } else {
          console.error("request error");
          reject();
        }
      });
  });
}
/* synchronization get text */
function getSubtitleText() {
  array.forEach(async (item, index) => {
    await request(item, index + 1);
  });
}
/* request subtitle file, get text */
function request(item, index) {
  return new Promise((resolve, reject) => {
    if (!item) resolve();
    axios.get(item.url).then((res) => {
      res.data.title = item.title;
      res.data.num = index;
      /* write file */
      writeFile(res.data);
      resolve();
    });
  });
}

/* main function */
handleUrl();
/**
 * https://api.bilibili.com/x/v2/dm/subtitle/show?oid=421659398&subtitle_id=50639405965202432
 * 字幕接口
 * https://i0.hdslb.com/bfs/subtitle/907fdde7a738dc475706502433b668e31330725e.json
 * 总接口
 * https://api.bilibili.com/x/web-interface/view?bvid=BV1Pf4y177Vp&cid=421651183
 * 语言
 * https://api.bilibili.com/x/v2/dm/subtitle/lans?type=1&oid=421659398
 */
