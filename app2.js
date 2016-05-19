//storeLoc,minCust,maxCust,cupsHR,poundsHR

// Declare variable
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var allKiosks = [];

//constructor
function Kiosk(storeLoc, minCustHr, maxCustHr, avgPounds, avgCups) {
 // defined by client
  this.storeLoc = storeLoc;
  this.minCustHr = minCustHr;
  this.maxCustHr = maxCustHr;
  this.avgCups = avgCups;
  this.avgPounds = avgPounds;
// per hour information
  this.customersPerHour = [];
  this.cupsPerHour = [];
  this.beansNeededForCupsPerHour = [];
  this.poundPackagesPerHour = [];
  this.beansPerHour = [];
  this.baristasNeededPerHour = [];
// daily information
  this.dailyCustomerTotal = 0;
  this.dailyCupsTotal = 0;
  this.dailyPoundPackagesTotal = 0;
  this.dailyBeansNeeded = 0;
  this.dailyBaristasNeeded = 0;

  allKiosks.push(this);
}

//-------------DEFINING PER HOUR AND DAILY------------------------------
//Number of customers per hour = random number; whole number
Kiosk.prototype.calcCustomersPerHour = function(min,max) {
  for (var i = 0; i < hours.length; i++) {
    var customers = Math.floor(Math.random() * (max - min + 1)) + min;
    this.customersPerHour.push(customers);
    this.dailyCustomerTotal += customers;
  }
};
// Number of cups per hour = customers * average cups; round to two decimals
Kiosk.prototype.calcCupsPerHour = function() {
  for (var i = 0; i < hours.length; i++) {
    var cups = parseFloat((this.customersPerHour[i] * this.avgCups).toFixed(2));
    this.cupsPerHour.push(cups);
    this.dailyCupsTotal += cups;
  }
};
//Number of pounds to go = customers * average pounds to go; round to two decimals
Kiosk.prototype.calcPoundsPerHour = function() {
  for (var i = 0; i < hours.length; i++) {
    var pounds = parseFloat((this.customersPerHour[i] * this.avgPounds).toFixed(2));
    this.poundPackagesPerHour.push(pounds);
    this.dailyPoundPackagesTotal += pounds;
  }
};
//Number of pounds per hour from cups = cups per hour/ 16; round to two decimals
Kiosk.prototype.calcBeansPerCupsPerHour = function() {
  for (var i = 0; i < hours.length; i++) {
    var poundsCup = parseFloat((this.cupsPerHour[i] / 16).toFixed(2));
    this.beansNeededForCupsPerHour.push(poundsCup);
    this.dailyBeansNeededForCupsPerHour += poundsCup;//updated naming convention
  }
};
//Number of total beans per hour = pounds to go + pounds per cup; round to two decimals
Kiosk.prototype.calcBeansPerHour = function() {
  for (var i = 0; i < hours.length; i++) {
    var beans = parseFloat((this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i]).toFixed(2));
    this.beansPerHour.push(beans);
    this.dailyBeansNeeded += beans;
  }
};
//Number of baristas necessary per hour = ((num of cups per hour*2min) + (pounds per hour*2min))/60min; round up to whole number
Kiosk.prototype.calcBaristasNeededPerHour = function() {
  for (var i = 0; i < hours.length; i++) {
    var baristas = Math.ceil(((this.cupsPerHour[i] * 2) + (this.poundPackagesPerHour[i] * 2)) / 60);
    this.baristasNeededPerHour.push(baristas);
    this.dailyBaristasNeeded += baristas;
  }
};
//Call function
Kiosk.prototype.render = function(){
  this.calcCustomersPerHour(this.minCustHr, this.maxCustHr);
  this.calcCupsPerHour();
  this.calcBeansPerCupsPerHour();
  this.calcPoundsPerHour();
  this.calcBeansPerHour();
  this.createRows();
};

//Name of table and html id
var beansTable = document.getElementById('beans-table');

//----------------CREATE HEADERS--------------------------------
//Create header and combine blank (storeLoc), daily total, hours
function createHeader(){
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');

//Blank header for store locations rows
  var thElement = document.createElement('th');
  thElement.textContent = '';
  trElement.appendChild(thElement);

//Daily location total headers
  var thElement = document.createElement('th');
  thElement.textContent = 'Daily Location Total';
  trElement.appendChild(thElement);

//Loop to add hours header
  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = hours[i];
    trElement.appendChild(thElement);
  }
//Append to table
  beansTable.appendChild(trElement);
}
// -----------CREATE STORE LOC ROWS ----------------
//Create rows for storeLoc and append data
Kiosk.prototype.createRows = function() {
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = this.storeLoc;
  trElement.appendChild(tdElement);

//Daily beans total rounded to one decimal and append data
  var tdElement = document.createElement('td');
  tdElement.textContent = parseFloat(this.dailyBeansNeeded.toFixed(2));
  trElement.appendChild(tdElement);

//Hourly beans (loop) rounded to one decimal and append data
  for (var i = 0; i < hours.length; i++) {
    var tdElement = document.createElement('td');
    tdElement.textContent = this.beansPerHour[i];
    trElement.appendChild(tdElement);
  }
  //Append to table
  beansTable.appendChild(trElement);
};
//----------CREATE TOTALS ROW-----------------------------------------------
//Total row below storeLoc, can't use prototype because not calling this.[something]
function createTotalsRow() {
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = 'Totals';
  trElement.appendChild(tdElement);

//Calculate sums for totals line
  var allKiosksTotals = 0;
  for (var i = 0; i < allKiosks.length; i++) {
    var sumAllKiosks = Math.round(allKiosks[i].dailyBeansNeeded);
    allKiosksTotals += sumAllKiosks;
  }
  var tdElement = document.createElement('td');
  tdElement.textContent = allKiosksTotals;
  trElement.appendChild(tdElement);

  var totalsData = 0;
  //Loop for hours (headers)
  for (var i = 0; i < hours.length; i++){
    //Loop for location (rows)
    for (var j = 0; j < allKiosks.length; j++) {
      totalsData += parseFloat((allKiosks[j].beansPerHour[i]).toFixed(2));//why does rounding not work?
    }
    var tdElement = document.createElement('td');
    tdElement.textContent = totalsData;
    trElement.appendChild(tdElement);
  }
  beansTable.appendChild(trElement);
}

//Variables per location
var pikePlace = new Kiosk('Pike Place Market',14, 35, 0.34, 1.2);
var capHill = new Kiosk('Capitol Hill', 12, 28, .03, 3.2);
var publicLib = new Kiosk('Seattle Public Library', 9, 45, .02, 2.6);
var southLake = new Kiosk('South Lake Union', 5, 18, .04, 1.3);
var seaTac = new Kiosk('Sea-Tac Airport', 28, 44, .41, 1.1);

//Definition of rows
createHeader();
pikePlace.render();
capHill.render();
publicLib.render();
southLake.render();
seaTac.render();
createTotalsRow();

//Copied from first table - Update for baristas

//Call function
Kiosk.prototype.renderB = function(){
  this.calcCustomersPerHour(this.minCustHr, this.maxCustHr);
  this.calcCupsPerHour();
  this.calcBeansPerCupsPerHour();
  this.calcPoundsPerHour();
  this.calcBeansPerHour();
  this.calcBaristasNeededPerHour();//added baristas
  this.createRows();
};

//Name of table and html id
var baristasTable = document.getElementById('baristas-table'); //updated baristas

//----------------CREATE HEADERS--------------------------------
//Create header and combine blank (storeLoc), daily total, hours
function createBaristasHeader(){
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');

//Blank header for store locations rows
  var thElement = document.createElement('th');
  thElement.textContent = '';
  trElement.appendChild(thElement);

//Daily location total headers
  var thElement = document.createElement('th');
  thElement.textContent = 'Daily Location Total';
  trElement.appendChild(thElement);

//Loop to add hours header
  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = hours[i];
    trElement.appendChild(thElement);
  }
//Append to table
  baristasTable.appendChild(trElement);
}
// -----------CREATE STORE LOC ROWS ----------------
//Create rows for storeLoc and append data
Kiosk.prototype.createRows = function() {
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = this.storeLoc;
  trElement.appendChild(tdElement);

//Daily baristas total rounded to whole number and append data
  var tdElement = document.createElement('td');
  tdElement.textContent = this.dailyBaristasNeeded;
  trElement.appendChild(tdElement);

//Hourly baristas (loop) rounded to one decimal and append data
  for (var i = 0; i < hours.length; i++) {
    var tdElement = document.createElement('td');
    tdElement.textContent = this.baristasNeededPerHour[i];
    trElement.appendChild(tdElement);
  }
  //Append to table
  baristasTable.appendChild(trElement);
};
//-----------------CREATE TOTALS ROW-----------------------------------
//Total row below storeLoc, can't use prototype because not calling this.[something]
function createTotalsRowBaristas() {
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = 'Totals';
  trElement.appendChild(tdElement);

//Calculate sums for totals line
  var allKiosksTotals = 0;
  for (var i = 0; i < allKiosks.length; i++) {
    var sumAllKiosks = Math.round(((allKiosks[i].dailyCupsTotal * 2) + (allKiosks[i].dailyBeansNeeded * 2)) / 60);
    allKiosksTotals += sumAllKiosks;
  }
  var tdElement = document.createElement('td');
  tdElement.textContent = allKiosksTotals;
  trElement.appendChild(tdElement);

  var totalsData = 0;
  //Loop for hours (headers)
  for (var i = 0; i < hours.length; i++){
    //Loop for location (rows)
    for (var j = 0; j < allKiosks.length; j++) {
  //    totalsData += Math.round(allKiosks[j].baristasNeededPerHour[i]); //HELP! I'm not sure why this doesn't work!
      totalsData += Math.ceil(((allKiosks[j].cupsPerHour[i] * 2) + (allKiosks[j].poundPackagesPerHour[i] * 2)) / 60);
    }
    var tdElement = document.createElement('td');
    tdElement.textContent = totalsData;
    trElement.appendChild(tdElement);
  }
  baristasTable.appendChild(trElement);
}

//Variables per location
var pikePlace = new Kiosk('Pike Place Market',14, 35, 0.34, 1.2);
var capHill = new Kiosk('Capitol Hill', 12, 28, .03, 3.2);
var publicLib = new Kiosk('Seattle Public Library', 9, 45, .02, 2.6);
var southLake = new Kiosk('South Lake Union', 5, 18, .04, 1.3);
var seaTac = new Kiosk('Sea-Tac Airport', 28, 44, .41, 1.1);

//Definition of rows
createBaristasHeader();
pikePlace.renderB();
capHill.renderB();
publicLib.renderB();
southLake.renderB();
seaTac.renderB();
createTotalsRowBaristas();
