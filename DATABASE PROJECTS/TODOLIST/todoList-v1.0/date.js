exports.getDate = function() {
  let date = new Date();
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric"
  }
  return date.toLocaleDateString("en-US", options);
};


exports.getDay = function () {
  let date = new Date();
  let options = {
    weekday: "long"
  }
  return date.toLocaleDateString("en-US", options);
}


console.log(module);

/****************** Without Simplified version *****************/

// module.exports.getDate = getDate;
//
// function getDate() {
//   let date = new Date();
//   let options = {
//     weekday: "long",
//     month: "long",
//     day: "numeric"
//   }
//   return date.toLocaleDateString("en-US", options);
// }
//
//
// module.exports.getDay = getDay;
// function getDay() {
//   let date = new Date();
//   let options = {
//     weekday: "long"
//   }
//   return date.toLocaleDateString("en-US", options);
// }
//
//
// console.log(module);
