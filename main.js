const fs = require("fs");
const path = require("path");

/* write */
function writeFile(obj) {
  /* create folder */
  mkdir("subtitle/" + obj.title);
  /* set file route */
  let file = path.resolve(
    __dirname,
    `./subtitle/${obj.title}/${obj.title}_p${obj.num}.srt`
  );
  let num = 1;
  let str = "《MC一条小团团》\n\n";
  /* loop assignment content */
  for (let item of obj.body) {
    str += `${num}
${formatDuring(item.from)} --> ${formatDuring(item.to)}
${item.content}\n\n`;
    num++;
  }
  /* write content */
  fs.writeFile(file, str, { encoding: "utf8" }, (err) => {
    if (err) {
      console.log("p" + obj.num + "fail: " + err);
    } else {
      console.log("subtitle p" + obj.num + " write success");
    }
  });
}
/**
 * @description Find out if a folder exists and create one without
 * @param {string} folderpath folder route
 * @returns {null}
 */
const mkdir = async function (folderpath) {
  try {
    const pathArr = folderpath.split("/");
    let _path = "";
    for (let i = 0; i < pathArr.length; i++) {
      if (pathArr[i]) {
        _path += `${pathArr[i]}/`;
        if (!fs.existsSync(_path)) {
          fs.mkdirSync(_path);
        }
      }
    }
  } catch (e) {}
};
/**
 * @description format time;
 * @param {number} msss In seconds;
 * @returns {string} return format '00:00:00,000';
 */
function formatDuring(msss) {
  let mss = msss * 1000;
  //     var days = parseInt(mss / (1000 * 60 * 60 * 24));
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = (mss % (1000 * 60)) / 1000;
  seconds = seconds.toFixed(3);
  let arr = seconds.split(".");
  return (
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    arr[0].padStart(2, "0") +
    "," +
    arr[1]
  );
}
/* expose method */
module.exports = { writeFile };
