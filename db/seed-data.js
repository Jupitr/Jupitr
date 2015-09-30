var user = require('./userController.js');
var db = require('./config.js');

var firstNames = ['Noah', 'Emma', 'Liam', 'Olivia', 'Mason', 'Sophia', 'Jacob', 
  'Isabella', 'William', 'Ava', 'Ethan', 'Mia', 'Michael', 'Emily', 'Alex',
   'Abigail', 'Madison', 'James', 'Charlotte', 'Daniel', 'Harper', 'Joe', 'Monica',
   'Richard', 'Bertram', 'Dinesh', 'Jared', 'Erlich', 'Laurie', 'Russ', 'Nelson'];

var lastNames = ['Smith', 'Doe', 'Miller', 'Penny', 'Tabor', 'Lee', 'Balestra',
  'Savage', 'Machen', 'Cruz', 'Potter', 'Jones', 'Peoples', 'Rourke', 'Hendricks',
  'Gilfoyle', 'Bighetti', 'Hanneman', 'Belson', 'Hall', 'Bachman', 'Lopez'];
  
var zips = ['94121', '94110', '94014', '94132', '94133', '10014', '10128',
  '90210', '90004', '98105', '98111', '97201', '73301', '02108', '33101',
  '72201', '19019', '80123', '20009', '94107', '94703', '94606', '95015',
  '60611', '60617', '48207', '10003', '48224', '44105', '44112', '53705',
  '53711', '53202', '84601', '84601', '87101', '87105', '77001', '77005',
  '30301', '30305', '37115', '37203', '33601', '33605', '02113', '57702'];

var genders = ['male', 'female'];

var races = ['Asian', 'Caucasion/White', 'Black/African-American', 'Hispanic',
  'Native American', 'Other'];

var techs = ['JavaScript', 'Node', 'MongoDB', 'Express', 'HTML', 'Angular',
  'CSS', 'Java', 'iOS', 'Unix', 'D3', 'Backbone', 'MSQL', 'Fortran', 'vim'];
  
var companies = ['Apple', 'Uber', 'Amazon', 'Google', 'Stripe', 'Hack Reactor',
  'Intel', 'Microsoft', 'eBay', 'Walmart', 'Square', 'JP Morgan Chase',
  'Pied Piper', 'Hooli', 'Aviato'];

var roles = ['Developer', 'Engineer', 'Programmer'];

var projects = ['Purify CSS', 'Otto', 'Mirror', 'Lamp', 'Juiptr', 'Super Duper',
  'ToDoer', 'Orange', 'Cool Project Name', 'Zig Zag', 'Stream Line', 'L7', 
  'Middle-Out Compression', 'Weissman Tester', 'IDKJS', 'JS For Cats'];

var pickRandom = function(list) {
  return list[Math.floor(Math.random() * list.length)];
};

var generateRandomUser = function() {
  var firstName = pickRandom(firstNames)
  var lastName = pickRandom(lastNames);
  var name = firstName + ' ' + lastName;
  var email = firstName + lastName + '@myemail.com';
  var cohort = 'HRRB' + Math.floor(Math.random() * 10);
  var zip = pickRandom(zips);
  var handle = firstName + Math.floor(Math.random() * 1000);
  var githubLogin = handle;
  var githubLink = 'http://www.github.com/' + handle;
  var twitter = '@' + handle;
  var website = 'http://www.' + handle.toLowerCase() + '.com'
  var gender = pickRandom(genders);
  var race = pickRandom(races);
  var thesis = pickRandom(projects);
  var thesisurl = 'http://www.' + thesis.split(' ').join('').toLowerCase() + '.com';
  var greenfield = pickRandom(projects);
  var legacy = pickRandom(projects);
  var technologies = [];
  technologies.push(pickRandom(techs));
  technologies.push(pickRandom(techs));
  technologies.push(pickRandom(techs));
  var currentEmployer = pickRandom(companies);
  var currentEmployerRole = pickRandom(roles);
  var currentEmployerStartDate = new Date();
  var priorEmployer1 = pickRandom(companies);
  var priorEmployer1Role = pickRandom(roles);
  var priorEmployer1StartDate = new Date();
  var priorEmployer1EndDate = new Date();
  var priorEmployer2 = pickRandom(companies);
  var priorEmployer2Role = pickRandom(roles);
  var priorEmployer2StartDate = new Date();
  var priorEmployer2EndDate = new Date();
  var priorEmployer3 = pickRandom(companies);
  var priorEmployer3Role = pickRandom(roles);
  var priorEmployer3StartDate = new Date();
  var priorEmployer3EndDate = new Date();

  return {
    name: name,
    githublogin: githubLogin,
    email: email,
    cohort: cohort,
    zip: zip,
    githublink: githubLink,
    twitter: twitter,
    website: website,
    gender: gender,
    race: race,
    currentemployer: currentEmployer,
    prioremployer1: priorEmployer1,
    prioremployer2: priorEmployer2,
    thesis: thesis,
    thesisurl: thesisurl,
    greenfield: greenfield,
    legacy: legacy,
    technologies: technologies ,
    currentemployer: currentEmployer,
    currentemployerrole: currentEmployerRole,
    currentemployerstartdate: currentEmployerStartDate,
    prioremployer1: priorEmployer1,
    prioremployer1role: priorEmployer1Role,
    prioremployer1startdate: priorEmployer1StartDate,
    prioremployer1enddate: priorEmployer2StartDate,
    prioremployer2: priorEmployer2,
    prioremployer2role: priorEmployer2Role,
    prioremployer2startdate: priorEmployer2StartDate,
    prioremployer2enddate: priorEmployer2EndDate,
    prioremployer3: priorEmployer3,
    prioremployer3role: priorEmployer3Role,
    prioremployer3startdate: priorEmployer3StartDate,
    prioremployer3enddate: priorEmployer3EndDate,
  };
  
}

// console.log(generateRandomUser());

var records = Number(process.argv[2]);

for (var i = 0; i < records; i++) {
  user.addUser(generateRandomUser(), function() {
    console.log('seed record created');
  });
}

setTimeout(function() {
  process.exit();
}, 1000);

module.exports = generateRandomUser;
