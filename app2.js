var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm',
'2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

var pikePlace = {
  locationName: 'Pike Place Market',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  avgCupsPerCustomer: 1.2,
  avgPoundsPerCustomer: 0.34,
  poundsPerCup: 16,
  beansPerHour: [], // = beansNeededForCupsPerHour + poundPackagesPerHour
  customersPerHour: [],
  cupsPerHour: [], // also calc bean use
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  dailyCustomerTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  //Number of customers per hour
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var customers = Math.floor(Math.random() * (max - min + 1) + min);
      this.customersPerHour.push(customers);
      this.dailyCustomerTotal += customers;
    }
  },
//Number of cups per hour
  calcCupsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var cups = Math.ceil(this.customersPerHour[i] * this.avgCupsPerCustomer);
      this.cupsPerHour.push(cups);
      this.dailyCupsTotal += cups;
    }
  },
//Number of pounds to go
  calcPoundsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var pounds = Math.ceil(this.customersPerHour[i] * (this.avgPoundsPerCustomer));
      this.poundPackagesPerHour.push(pounds);
      this.dailyPoundPackagesTotal += pounds;

    }
  },
  //Number of pounds per cup
  calcBeansPerCupsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var poundsCup = (this.cupsPerHour[i] / this.poundsPerCup);
      this.beansNeededForCupsPerHour.push(poundsCup);

    }
  },
  //Number of total beans per hour (cup + to go)
  calcBeansPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var beans = (this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i]);
      this.beansPerHour.push(beans);
      this.dailyBeansNeeded += beans;
    }
  },
//Call functions defined above
  render:function() {
    pikePlace.calcCustomersPerHour(pikePlace.minCustomersHour, pikePlace.maxCustomersHour);
    pikePlace.calcCupsPerHour(pikePlace.avgCupsPerCustomer, pikePlace.customersPerHour);
    pikePlace.calcPoundsPerHour(pikePlace.avgPoundsPerCustomer, pikePlace.customersPerHour);
    pikePlace.calcBeansPerCupsPerHour(pikePlace.poundsPerCup, pikePlace.cupsPerHour);
    pikePlace.calcBeansPerHour(pikePlace.poundPackagesPerHour, pikePlace.beansNeededForCupsPerHour);

    var ulElement = document.getElementById('pike');
    for (var i = 0; i < hours.length; i++) {
      //create a <li>
      //give that <li> content
      //append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = (hours[i] + ': ' + ' ' + parseFloat(this.beansPerHour[i].toFixed(1)) + ' lbs [' + this.customersPerHour[i] + ' Customers, ' + this.cupsPerHour[i] + ' cups ' + '(' + parseFloat(this.beansNeededForCupsPerHour[i].toFixed (1)) + ' lbs ' + this.poundPackagesPerHour[i] + ' lbs to-go] ');
      ulElement.appendChild(liElement);

    }

    var liTotal = document.createElement('li');
    liTotal.textContent = ('Total Customers at ' + this.locationName + ' ' + this.dailyCustomerTotal);
    ulElement.appendChild(liTotal);

    var liCups = document.createElement('li');
    liCups.textContent = ('Total Cups sold at ' + this.locationName + ' ' + this.dailyCupsTotal);
    ulElement.appendChild(liCups);

    var liPoundPkg = document.createElement('li');
    liPoundPkg.textContent = ('Total Pound Packages sold at ' + this.locationName + ' ' + this.dailyPoundPackagesTotal);
    ulElement.appendChild(liPoundPkg);

    var liTotalBeans = document.createElement('li');
    liTotalBeans.textContent = ('The Total pounds of beans needed at ' + this.locationName + ' ' + this.dailyBeansNeeded);
    ulElement.appendChild(liTotalBeans);
  }
};
pikePlace.render();
console.log(pikePlace);

var capitolHill = {
  locationName: 'Capitol Hill',
  minCustomersHour: 12,
  maxCustomersHour: 28,
  avgCupsPerCustomer: 3.2,
  avgPoundsPerCustomer: 0.03,
  poundsPerCup: 16,
  beansPerHour: [], // = beansNesededForCupsPerHour + poundPackagesPerHour
  customersPerHour: [],
  cupsPerHour: [], // also calc bean use
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  dailyCustomerTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  //Number of customers per hour
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var customers = Math.floor(Math.random() * (max - min + 1) + min);
      this.customersPerHour.push(customers);
      this.dailyCustomerTotal += customers;
    }
  },
//Number of cups per hour
  calcCupsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var cups = Math.ceil(this.customersPerHour[i] * this.avgCupsPerCustomer);
      this.cupsPerHour.push(cups);
      this.dailyCupsTotal += cups;
    }
  },
//Number of pounds to go
  calcPoundsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var pounds = Math.ceil(this.customersPerHour[i] * (this.avgPoundsPerCustomer));
      this.poundPackagesPerHour.push(pounds);
      this.dailyPoundPackagesTotal += pounds;

    }
  },
  //Number of pounds per cup
  calcBeansPerCupsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var poundsCup = (this.cupsPerHour[i] / this.poundsPerCup);
      this.beansNeededForCupsPerHour.push(poundsCup);
      this.dailyBeansNeeded += poundsCup;

    }
  },
  //Number of total beans per hour (cup + to go)
  calcBeansPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var beans = (this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i]);
      this.beansPerHour.push(beans);
      this.dailyBeansNeeded += beans;
    }
  },
//Call functions defined above
  render:function() {
    capitolHill.calcCustomersPerHour(capitolHill.minCustomersHour, capitolHill.maxCustomersHour);
    capitolHill.calcCupsPerHour(capitolHill.avgCupsPerCustomer, capitolHill.customersPerHour);
    capitolHill.calcPoundsPerHour(capitolHill.avgPoundsPerCustomer, capitolHill.customersPerHour);
    capitolHill.calcBeansPerCupsPerHour(capitolHill.poundsPerCup, capitolHill.cupsPerHour);
    capitolHill.calcBeansPerHour(capitolHill.poundPackagesPerHour, capitolHill.beansNeededForCupsPerHour);

    var ulElement = document.getElementById('capitol');
    for (var i = 0; i < hours.length; i++) {
      //create a <li>
      //give that <li> content
      //append the <li> to the <ul>
      var liElement = document.createElement('li');
      var litotalCustomers = document.createElement('li');
      liElement.textContent = (hours[i] + ': ' + ' ' + parseFloat(this.beansPerHour[i].toFixed(1)) + ' lbs [' + this.customersPerHour[i] + ' Customers, ' + this.cupsPerHour[i] + ' cups ' + '(' + parseFloat(this.beansNeededForCupsPerHour[i].toFixed (1)) + ' lbs) ' + this.poundPackagesPerHour[i] + ' lbs to-go] ');
      ulElement.appendChild(liElement);

    }
    var liTotal = document.createElement('li');
    liTotal.textContent = ('Total Customers at ' + this.locationName + ' ' + this.dailyCustomerTotal);
    ulElement.appendChild(liTotal);

    var liCups = document.createElement('li');
    liCups.textContent = ('Total Cups sold at ' + this.locationName + ' ' + this.dailyCupsTotal);
    ulElement.appendChild(liCups);

    var liPoundPkg = document.createElement('li');
    liPoundPkg.textContent = ('Total Pound Packages sold at ' + this.locationName + ' ' + this.dailyPoundPackagesTotal);
    ulElement.appendChild(liPoundPkg);

    var liTotalBeans = document.createElement('li');
    liTotalBeans.textContent = ('The Total pounds of beans needed at ' + this.locationName + ' ' + this.dailyBeansNeeded);
    ulElement.appendChild(liTotalBeans);
  }
};
capitolHill.render();
console.log(capitolHill);

var publicLibrary = {
  locationName: 'Seattle Public Library',
  minCustomersHour: 9,
  maxCustomersHour: 45,
  avgCupsPerCustomer: 2.6,
  avgPoundsPerCustomer: 0.02,
  poundsPerCup: 16,
  beansPerHour: [], // = beansNeededForCupsPerHour + poundPackagesPerHour
  customersPerHour: [],
  cupsPerHour: [], // also calc bean use
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  dailyCustomerTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  //Number of customers per hour
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var customers = Math.floor(Math.random() * (max - min + 1) + min);
      this.customersPerHour.push(customers);
      this.dailyCustomerTotal += customers;
    }
  },
//Number of cups per hour
  calcCupsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var cups = Math.ceil(this.customersPerHour[i] * this.avgCupsPerCustomer);
      this.cupsPerHour.push(cups);
      this.dailyCupsTotal += cups;
    }
  },
//Number of pounds to go
  calcPoundsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var pounds = Math.ceil(this.customersPerHour[i] * (this.avgPoundsPerCustomer));
      this.poundPackagesPerHour.push(pounds);
      this.dailyPoundPackagesTotal += pounds;

    }
  },
  //Number of pounds per cup
  calcBeansPerCupsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var poundsCup = (this.cupsPerHour[i] / this.poundsPerCup);
      this.beansNeededForCupsPerHour.push(poundsCup);

    }
  },
  //Number of total beans per hour (cup + to go)
  calcBeansPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var beans = (this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i]);
      this.beansPerHour.push(beans);
      this.dailyBeansNeeded += beans;
    }
  },
//Call functions defined above
  render:function() {
    publicLibrary.calcCustomersPerHour(publicLibrary.minCustomersHour, publicLibrary.maxCustomersHour);
    publicLibrary.calcCupsPerHour(publicLibrary.avgCupsPerCustomer, publicLibrary.customersPerHour);
    publicLibrary.calcPoundsPerHour(publicLibrary.avgPoundsPerCustomer, publicLibrary.customersPerHour);
    publicLibrary.calcBeansPerCupsPerHour(publicLibrary.poundsPerCup, publicLibrary.cupsPerHour);
    publicLibrary.calcBeansPerHour(publicLibrary.poundPackagesPerHour, publicLibrary.beansNeededForCupsPerHour);

    var ulElement = document.getElementById('spl');
    for (var i = 0; i < hours.length; i++) {
      //create a <li>
      //give that <li> content
      //append the <li> to the <ul>
      var liElement = document.createElement('li');
      var litotalCustomers = document.createElement('li');
      liElement.textContent = (hours[i] + ': ' + ' ' + parseFloat(this.beansPerHour[i].toFixed(1)) + ' lbs [' + this.customersPerHour[i] + ' Customers, ' + this.cupsPerHour[i] + ' cups ' + '(' + parseFloat(this.beansNeededForCupsPerHour[i].toFixed (1)) + ' lbs) ' + this.poundPackagesPerHour[i] + ' lbs to-go] ');
      ulElement.appendChild(liElement);

    }
    var liTotal = document.createElement('li');
    liTotal.textContent = ('Total Customers at ' + this.locationName + ' ' + this.dailyCustomerTotal);
    ulElement.appendChild(liTotal);

    var liCups = document.createElement('li');
    liCups.textContent = ('Total Cups sold at ' + this.locationName + ' ' + this.dailyCupsTotal);
    ulElement.appendChild(liCups);

    var liPoundPkg = document.createElement('li');
    liPoundPkg.textContent = ('Total Pound Packages sold at ' + this.locationName + ' ' + this.dailyPoundPackagesTotal);
    ulElement.appendChild(liPoundPkg);

    var liTotalBeans = document.createElement('li');
    liTotalBeans.textContent = ('The Total pounds of beans needed at ' + this.locationName + ' ' + this.dailyBeansNeeded);
    ulElement.appendChild(liTotalBeans);
  }
};
publicLibrary.render();
console.log(publicLibrary);

var southLakeUnion = {
  locationName: 'South Lake Union',
  minCustomersHour: 5,
  maxCustomersHour: 18,
  avgCupsPerCustomer: 1.3,
  avgPoundsPerCustomer: 0.04,
  poundsPerCup: 16,
  beansPerHour: [], // = beansNeededForCupsPerHour + poundPackagesPerHour
  customersPerHour: [],
  cupsPerHour: [], // also calc bean use
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  dailyCustomerTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  //Number of customers per hour
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var customers = Math.floor(Math.random() * (max - min + 1) + min);
      this.customersPerHour.push(customers);
      this.dailyCustomerTotal += customers;
    }
  },
//Number of cups per hour
  calcCupsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var cups = Math.ceil(this.customersPerHour[i] * this.avgCupsPerCustomer);
      this.cupsPerHour.push(cups);
      this.dailyCupsTotal += cups;
    }
  },
//Number of pounds to go
  calcPoundsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var pounds = Math.ceil(this.customersPerHour[i] * (this.avgPoundsPerCustomer));
      this.poundPackagesPerHour.push(pounds);
      this.dailyPoundPackagesTotal += pounds;

    }
  },
  //Number of pounds per cup
  calcBeansPerCupsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var poundsCup = (this.cupsPerHour[i] / this.poundsPerCup);
      this.beansNeededForCupsPerHour.push(poundsCup);

    }
  },
  //Number of total beans per hour (cup + to go)
  calcBeansPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var beans = (this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i]);
      this.beansPerHour.push(beans);
      this.dailyBeansNeeded += beans;
    }
  },
//Call functions defined above
  render:function() {
    southLakeUnion.calcCustomersPerHour(southLakeUnion.minCustomersHour, southLakeUnion.maxCustomersHour);
    southLakeUnion.calcCupsPerHour(southLakeUnion.avgCupsPerCustomer, southLakeUnion.customersPerHour);
    southLakeUnion.calcPoundsPerHour(southLakeUnion.avgPoundsPerCustomer, southLakeUnion.customersPerHour);
    southLakeUnion.calcBeansPerCupsPerHour(southLakeUnion.poundsPerCup, southLakeUnion.cupsPerHour);
    southLakeUnion.calcBeansPerHour(southLakeUnion.poundPackagesPerHour, southLakeUnion.beansNeededForCupsPerHour);

    var ulElement = document.getElementById('slu');
    for (var i = 0; i < hours.length; i++) {
      //create a <li>
      //give that <li> content
      //append the <li> to the <ul>
      var liElement = document.createElement('li');
      var litotalCustomers = document.createElement('li');
      liElement.textContent = (hours[i] + ': ' + ' ' + parseFloat(this.beansPerHour[i].toFixed(1)) + ' lbs [' + this.customersPerHour[i] + ' Customers, ' + this.cupsPerHour[i] + ' cups ' + '(' + parseFloat(this.beansNeededForCupsPerHour[i].toFixed (1)) + ' lbs) ' + this.poundPackagesPerHour[i] + ' lbs to-go] ');
      ulElement.appendChild(liElement);

    }
    var liTotal = document.createElement('li');
    liTotal.textContent = ('Total Customers at ' + this.locationName + ' ' + this.dailyCustomerTotal);
    ulElement.appendChild(liTotal);

    var liCups = document.createElement('li');
    liCups.textContent = ('Total Cups sold at ' + this.locationName + ' ' + this.dailyCupsTotal);
    ulElement.appendChild(liCups);

    var liPoundPkg = document.createElement('li');
    liPoundPkg.textContent = ('Total Pound Packages sold at ' + this.locationName + ' ' + this.dailyPoundPackagesTotal);
    ulElement.appendChild(liPoundPkg);

    var liTotalBeans = document.createElement('li');
    liTotalBeans.textContent = ('The Total pounds of beans needed at ' + this.locationName + ' ' + this.dailyBeansNeeded);
    ulElement.appendChild(liTotalBeans);
  }
};
southLakeUnion.render();
console.log(southLakeUnion);

var seaTac = {
  locationName: 'Sea-Tac Airport',
  minCustomersHour: 28,
  maxCustomersHour: 44,
  avgCupsPerCustomer: 1.1,
  avgPoundsPerCustomer: 0.41,
  poundsPerCup: 16,
  beansPerHour: [], // = beansNeededForCupsPerHour + poundPackagesPerHour
  customersPerHour: [],
  cupsPerHour: [], // also calc bean use
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  dailyCustomerTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  //Number of customers per hour
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var customers = Math.floor(Math.random() * (max - min + 1) + min);
      this.customersPerHour.push(customers);
      this.dailyCustomerTotal += customers;
    }
  },
//Number of cups per hour
  calcCupsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var cups = Math.ceil(this.customersPerHour[i] * this.avgCupsPerCustomer);
      this.cupsPerHour.push(cups);
      this.dailyCupsTotal += cups;
    }
  },
//Number of pounds to go
  calcPoundsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var pounds = Math.ceil(this.customersPerHour[i] * (this.avgPoundsPerCustomer));
      this.poundPackagesPerHour.push(pounds);
      this.dailyPoundPackagesTotal += pounds;

    }
  },
  //Number of pounds per cup
  calcBeansPerCupsPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var poundsCup = (this.cupsPerHour[i] / this.poundsPerCup);
      this.beansNeededForCupsPerHour.push(poundsCup);

    }
  },
  //Number of total beans per hour (cup + to go)
  calcBeansPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++) {
      var beans = (this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i]);
      this.beansPerHour.push(beans);
      this.dailyBeansNeeded += beans;
    }
  },
//Call functions defined above
  render:function() {
    seaTac.calcCustomersPerHour(seaTac.minCustomersHour, seaTac.maxCustomersHour);
    seaTac.calcCupsPerHour(seaTac.avgCupsPerCustomer, seaTac.customersPerHour);
    seaTac.calcPoundsPerHour(seaTac.avgPoundsPerCustomer, seaTac.customersPerHour);
    seaTac.calcBeansPerCupsPerHour(seaTac.poundsPerCup, seaTac.cupsPerHour);
    seaTac.calcBeansPerHour(seaTac.poundPackagesPerHour, seaTac.beansNeededForCupsPerHour);

    var ulElement = document.getElementById('seatac');
    for (var i = 0; i < hours.length; i++) {
      //create a <li>
      //give that <li> content
      //append the <li> to the <ul>
      var liElement = document.createElement('li');
      var litotalCustomers = document.createElement('li');
      liElement.textContent = (hours[i] + ': ' + parseFloat(this.beansPerHour[i].toFixed(1)) + ' lbs [' + this.customersPerHour[i] + ' Customers, ' + this.cupsPerHour[i] + ' cups ' + '(' + parseFloat(this.beansNeededForCupsPerHour[i].toFixed (1)) + ' lbs) ' + this.poundPackagesPerHour[i] + ' lbs to-go] ');
      ulElement.appendChild(liElement);

    }
    var liTotal = document.createElement('li');
    liTotal.textContent = ('Total Customers at ' + this.locationName + ' ' + this.dailyCustomerTotal);
    ulElement.appendChild(liTotal);

    var liCups = document.createElement('li');
    liCups.textContent = ('Total Cups sold at ' + this.locationName + ' ' + this.dailyCupsTotal);
    ulElement.appendChild(liCups);

    var liPoundPkg = document.createElement('li');
    liPoundPkg.textContent = ('Total Pound Packages sold at ' + this.locationName + ' ' + this.dailyPoundPackagesTotal);
    ulElement.appendChild(liPoundPkg);

    var liTotalBeans = document.createElement('li');
    liTotalBeans.textContent = ('The Total pounds of beans needed at ' + this.locationName + ' ' + this.dailyBeansNeeded);
    ulElement.appendChild(liTotalBeans);
  }
};
seaTac.render();
console.log(seaTac);
