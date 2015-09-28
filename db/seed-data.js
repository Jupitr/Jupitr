var userController = require('./userController');

var firstNames = ['Noah', 'Emma', 'Liam', 'Olivia', 'Mason', 'Sophia', 'Jacob', 
  'Isabella', 'William', 'Ava', 'Ethan', 'Mia', 'Michael', 'Emily', 'Alex',
   'Abigail', 'Madison', 'James', 'Charlotte', 'Daniel', 'Harper', 'Joe', 'Monica',
   'Richard', 'Bertram', 'Dinesh', 'Jared', 'Erlich', 'Laurie', 'Russ', 'Nelson'];

var lastNames = ['Smith', 'Doe', 'Miller', 'Penny', 'Tabor', 'Lee', 'Balestra',
  'Savage', 'Machen', 'Cruz', 'Potter', 'Jones', 'Peoples', 'Rourke', 'Hendricks',
  'Gilfoyle', 'Bighetti', 'Hanneman', 'Belson', 'Hall', 'Bachman', 'Lopez'];
  
var zips = ['94121', '94110', '94014', '94132', '94133', '10014', '10128',
  '90210', '90004', '98105', '98111', '97201', '73301', '02108', '33101',
  '72201', '19019', '80123', '20009', '94107', '94703', '94606', '95015'];

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
  var website = 'http://www.' + handle + '.com'
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
  
  var currentEmployer = {
    company: pickRandom(companies),
    role: pickRandom(roles),
    startdate: new Date(),
    enddate: new Date()
  };
  
  var priorEmployer1 = {
    company: pickRandom(companies),
    role: pickRandom(roles),
    startdate: new Date(),
    enddate: new Date()
  };

  var priorEmployer2 = {
    company: pickRandom(companies),
    role: pickRandom(roles),
    startdate: new Date(),
    enddate: new Date()
  };
  
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
    technologies: technologies 
  };
  
}

// console.log(generateRandomUser());

module.exports = generateRandomUser;
