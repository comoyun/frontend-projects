var generator = new Generator();
var code = document.getElementById("snippet");

document.getElementById("btn").onclick = () => {
  var res = generator.receiveAndAnswer(code.value, "#out")
  generator.say(res, "#out");
  code.value = "";
  code.focus();
}