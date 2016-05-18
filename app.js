//storeLoc,minCust,maxCust,cupsHR,poundsHR

var allKiosks = [];

function Kiosk(storeLoc,minCustHr,maxCustHr,poundsHr,cupsCr) {
 // Add code
  this.storeLoc = storeLoc;
  this.minCustHr = minCustHr;
  this.maxCustHr = maxCustHr;
  this.poundsHr = poundsHr;
  this.cupsCr = cupsCr;
  allKiosks.push(this);
  //this.render = function(tr);
  // Add functions from app2. here. use this instead of location name
}
//Number of customers per hour
calcCustomersPerHour = function(min,max) {
  for (var i = 0; i < hours.length; i++) {
    var customers = Math.floor(Math.random() * (max - min + 1) + min);
    this.customersPerHour.push(customers);
    this.dailyCustomerTotal += customers;
  }
};
//Number of cups per hour
calcCupsPerHour = function(min,max) {
  for (var i = 0; i < hours.length; i++) {
    var cups = Math.ceil(this.customersPerHour[i] * this.avgCupsPerCustomer);
    this.cupsPerHour.push(cups);
    this.dailyCupsTotal += cups;
  }
};
//Number of pounds to go
calcPoundsPerHour = function(min,max) {
  for (var i = 0; i < hours.length; i++) {
    var pounds = Math.ceil(this.customersPerHour[i] * (this.avgPoundsPerCustomer));
    this.poundPackagesPerHour.push(pounds);
    this.dailyPoundPackagesTotal += pounds;
  }
};
  //Number of pounds per cup
calcBeansPerCupsPerHour = function(min,max) {
  for (var i = 0; i < hours.length; i++) {
    var poundsCup = (this.cupsPerHour[i] / this.poundsPerCup);
    this.beansNeededForCupsPerHour.push(poundsCup);
    this.dailyBeansNeeded += poundsCup;
  }
};
  //Number of total beans per hour (cup + to go)
calcBeansPerHour = function(min,max) {
  for (var i = 0; i < hours.length; i++) {
    var beans = (this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i]);
    this.beansPerHour.push(beans);
    this.dailyBeansNeeded += beans;
  }
};
var beansTable = document.getElementById('beans-table');
var trElement = document.createElement('tr');
var hours = ['','Daily Total','6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm',
'2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

//loop to add headers
for (var i = 0; i < hours.length; i++) {
  var thElement = document.createElement('th');
  thElement.textContent = hours[i];
  trElement.appendChild(thElement);

}

beansTable.appendChild(trElement);
var pikePlace = new Kiosk('Pike Place Market',14, 35, 0.34, 1.2);
var capHill = new Kiosk('Capitol Hill', 12, 28, .03, 3.2);
var publicLib = new Kiosk('Seattle Public Library', 9, 45, .02, 2.6);
var southLake = new Kiosk('South Lake Union', 5, 18, .04, 1.3);
var seaTac = new Kiosk('Sea-Tac Airport', 28, 44, .41, 1.1);

pikePlace.render();
capHill.render();
publicLib.render();
southLake.render();
seaTac.render();

//loop to add rows for locations
for (var j = 0; j < allKiosks.length; j++) {
  var trRow = document.createElement('tr');
  trRow.textContent = storeLoc[i];
  trRow.appendchild(trRow);
}
//beansTable.render(trRow);
//render = function() {
//trRow.calcBeansPerHour(trRow.poundPackagesPerHour, trRow.beansNeededForCupsPerHour);
var trRow = document.createElement('tr');
var thElement = document.createElement('th');
thElement.textContent = pikePlace.storeLoc;
trRow.appendChild(thElement);
beansTable.appendChild(trRow);

var tdElement = document.createElement('td');
tdElement.textcontent = pikePlace.beansPerHour;
trRow.appendChild(tdElement);
beansTable.appendChild(trRow);

for(i = 0; i < hours.length; i++) {
  var tdElement = document.createElement('td');
  tdElement.textContent = this.beansPerHour;
  trRow.appendChild(tdElement);
  beansTable.appendChild(trRow);
};
//  beansTable.appendChild(trRow);

//  var tdTotalBeans = document.createElement('td');

// Render method from the object literals and makee TD with it instaed of LI.
//Change the render method so it can take a TR as a parameter.
