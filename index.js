var readlineSync = require('readline-sync');
var fs = require('fs');

function loadData() {
    var data = '';
    if(data == '')  {
        data = fs.readFileSync('db.json');
    }
    return JSON.parse(data);
}

var students = loadData();
// console.log(students);

function welcome() {
    console.log('1. Show all student.');
    console.log('2. Creat new student');
    console.log('3. Save & Exit');
    var yourChoice = readlineSync.question('> ')
    switch (yourChoice) {
        case '1':
            showStudent();
            welcome()
            break;
        case '2':
            creatStudent();
            welcome();
            break;
        case '3':
            save();
            break;
        default:
            console.log('Wrong....');
            welcome();
            break;
    }
}

function showStudent() {
    for (var student of students) {
        console.log("Name: " + student.name + ", Age: " + student.age);
    }
}

function creatStudent() {
    var userName = readlineSync.question('What your name? ');
    var userAge = readlineSync.question('How old are you? ');

    var student = {
        name: userName,
        age: parseInt(userAge)
    };

    students.push(student);
}

function save() {
    var content = JSON.stringify(students);
    fs.writeFileSync('db.json', content, { encoding: "utf8"});
}

function main() {
    welcome();
}

main();