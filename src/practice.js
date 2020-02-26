require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

knexInstance.from('amazong_products').select('*')
  .select('product_id', 'name', 'price', 'category')
  .from('amazong_products')
  .where({name: 'Point of view gun'})
  .first()
  .then(result => {
    console.log(result);
  });

const qry = knexInstance
  .select('product_id', 'name', 'price', 'category')
  .from('amazong_products')
  .where({ name: 'Point of view gun' })
  .first()
  .toQuery()
  // .then(result => {
  //   console.log(result)
  // })

console.log(qry);


console.log('knex and driver installed correctly');

function mostPopularVideosForDays(days) {
  knexInstance
    .select('video_name', 'region')
    .count('date_viewed AS views')
    .where(
      'date_viewed',
      '>',
      knexInstance.raw('now() - "?? days"::INTERVAL', days)
    )
    .from('whopipe_video_views')
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'region', order: 'ASC' },
      { column: 'views', order: 'DESC' },
    ])
    .then(result => {
      console.log(result);
    });
}
  
//mostPopularVideosForDays(30);

knexInstance
  .from('blogful_articles')
  .select('*')
  .then(result => {console.log(result);
  });


