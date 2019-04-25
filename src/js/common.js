var button = document.getElementById("load-btn");
var app = document.getElementById("app");
var ulCameToTheParty = document.createElement("div");
var ulEatPizza = document.createElement("div");
var pVisitors = document.createElement("h3");
var pVisitorsEatPizza = document.createElement("h3");
var pWate = document.createElement("h4");
var count = 0;
var countEatPizza = 0;
var circle = document.createElement("ul");
var div1 = document.createElement("div");
var div2 = document.createElement("div");
app.appendChild(pWate);
app.appendChild(div1);
app.appendChild(div2);
div1.className = "div1";
div2.className = "div2";
button.className = "";

function getVisitors(count, countEatPizza) {
  pVisitors.innerHTML = "How many people came to the party: " + count;
  pVisitorsEatPizza.innerHTML = "How many people eat pizza: " + countEatPizza;
}
getVisitors(count, countEatPizza);

function getData(data) {
  circle.className = "circle";
  div1.appendChild(pVisitors);
  div1.appendChild(ulCameToTheParty);
  div2.appendChild(pVisitorsEatPizza);
  div2.appendChild(ulEatPizza);
  for (let dataIndex = 0; dataIndex < data.length; ++dataIndex) {
    const liCameToTheParty = document.createElement("p");
    ulCameToTheParty.appendChild(liCameToTheParty);
    if (data[dataIndex].eatsPizza === true) {
      const li = document.createElement("p");
      ulEatPizza.appendChild(li);
      li.appendChild(document.createTextNode(data[dataIndex].name));
      countEatPizza += 1;
    }
    liCameToTheParty.appendChild(document.createTextNode(data[dataIndex].name));
    count += 1;
  }
  getLoading();
  getLiCircle(countEatPizza);
  return app;
}
function getLoading() {
  button.className = "";
  pWate.innerHTML = "";
  getVisitors(count, countEatPizza);
}
function load() {
  pWate.innerHTML = "waiting...";
  button.className = "loading";
  count = 0;
  countEatPizza = 0;
}
function getLiCircle(countEatPizza) {
  var visitors = countEatPizza;
  var skewYValue = 0;
  if (visitors > 4 && visitors < 8) {
    skewYValue = -30;
  } else if (visitors > 6 && visitors < 12) {
    skewYValue = -45;
  } else if (visitors > 10) {
    skewYValue = -60;
  }
  var degrees = 360 / visitors;
  var countLi = 0;
  for (let i = 0; i < visitors; ++i) {
    const liCircle = document.createElement("li");
    liCircle.style.transform =
      "rotate(" + countLi + "deg) skewY(" + skewYValue + "deg)";
    countLi += degrees;
    circle.appendChild(liCircle);
    var divText = document.createElement("div");
    divText.className = "text";
    divText.textContent = `${i + 1}`;
    liCircle.appendChild(divText);
  }
}
document.getElementById("load-btn").addEventListener("click", function() {
  if (
    circle &&
    ulEatPizza &&
    ulCameToTheParty &&
    count > 0 &&
    countEatPizza > 0
  ) {
    pVisitors.innerHTML = "";
    pVisitorsEatPizza.innerHTML = "";
    ulEatPizza.innerHTML = "";
    ulCameToTheParty.innerHTML = "";
    circle.innerHTML = "";
    circle.remove();
    count = 0;
    countEatPizza = 0;
  }
  load();
  fetch("https://gp-js-test.herokuapp.com/pizza")
    .then(response => response.json())
    .then(function(data) {
      setTimeout(() => {
        getVisitors(count, countEatPizza);
        app.appendChild(circle);
        return getData(data.party);
      }, 1000);
    });
});