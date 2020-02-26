const knex = require('knex');
require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function getAllWithText(searchTerm) {
  db
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(data => console.log(data))
    .catch(err => console.log(err))
    .finally(() => db.destroy);
}

function getAllPaginated(pageNumber) {
  const productsPerPage = 6;
  const offset = productsPerPage * (pageNumber - 1);
  db
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => console.log(result))
    .catch(err => console.log(err))
    .finally(() => db.destroy);
}

function getAllAfterDate(daysAgo) {
  db
    .select('category')
    .from('shopping_list')
    .where('date_added','>', db.raw(`now()-'?? days'::INTERVAL`, daysAgo))
    .then(result => console.log(result))
    .catch(err => console.log(err))
    .finally(() => db.destroy);
}

function totalCostForCategory() {
  db
    .select('category')
    .sum('price')
    .from('shopping_list')
    .groupBy('category')
    .then(result => console.log(result))
    .catch(err => console.log(err))
    .finally(() => db.destroy);
}

totalCostForCategory();