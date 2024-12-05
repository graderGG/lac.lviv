const Datastore = require('nedb');
const fs = require('fs');

const dbFileName = 'lvivarc.json';
const db = new Datastore({ filename: dbFileName, autoload: true });

if (fs.existsSync(dbFileName)) {
 fs.stat(dbFileName, (err, stats) => {
  if (err) {
   console.error(err);
   return;
  }
  if (stats.size > 0) {
   throw new Error(`Помилка: файл ${dbFileName} вже існує і непустий)!`);
  }
 });
}

let n = 0;
let data = fs.readFileSync('lvivarcSource.json');
let list = JSON.parse(data);

for (let i = 0; i < list.length; i++) {
 let obj = list[i];
 db.insert(obj, (err, newDoc) => {
  n++;
  if (i == list.length - 1) {
   console.log(`Успішно створено файл БД ${dbFileName} з ${n} документами.`);
  }
 });
}
