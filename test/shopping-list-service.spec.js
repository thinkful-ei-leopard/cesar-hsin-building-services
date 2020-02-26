const ShoppingListEdit = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shoppinglist Service OBJECT', function (){
  let db;

  let testShoppinglist=[
    {
      id:1,
      name: 'eggs',
      price: '2.99',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      checked:false,
      category:'Main'
    },
    {
      id:2,
      name: 'fish',
      price: '6.99',
      date_added: new Date('2020-01-22T16:28:32.615Z'),
      checked:false,
      category:'Main'
    },
    {
      id:3,
      name: 'apple',
      price: '10.99',
      date_added: new Date('2019-01-22T16:28:32.615Z'),
      checked:false,
      category:'Main'
    }
  ];

  before(()=>{
    db= knex({
      client:'pg',
      connection:process.env.TEST_DB_URL,
    });
  });

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context('Given "shopping_list" has data', () =>{
    beforeEach(() =>{
      return db
        .into('shopping_list')
        .insert(testShoppinglist);
    });
    it('getAllItem() resolves all items from "shopping_list" table', () =>{
        return ShoppingListEdit.getAllItems(db)
          .then(actual => {
            expect(actual).to.eql(testShoppinglist);
          });
      });

      it('pullById() resolves all items from "shopping_list" table', () =>{
        const thirdId = 3;
        const thirdTestItem = testShoppinglist[thirdId-1];
        return ShoppingListEdit.getAllItems(db, thirdId)
          .then(actual => {
            expect(actual[2]).to.eql({
              id:thirdId,
              checked:false,
              name: thirdTestItem.name,
              price:thirdTestItem.price,
              date_added:thirdTestItem.date_added,
              category:thirdTestItem.category
            });
          });
      });
    
      it('deleteItem()resolves all items from "shopping_list" table', () =>{
        const itemId=3;
        return ShoppingListEdit.deleteItem(db, itemId)
          .then(allItem => {
            const expected = testShoppinglist.filter(item => item.id !== itemId)
            ShoppingListEdit.getAllItems(db)
              .then(
                  data =>{
                    expect(data).to.eql(expected);
                  }
              )
            
          });
      });
      
      it('updateItem() update an item from "shopping_list" table', () =>{
          const updateId =3
          const newItem ={
              name:'update name',
              price : '15.99',
              date_added: new Date(),
              category:'Main',
              checked:false
          }
          return ShoppingListEdit.updateItem(db, updateId, newItem)
            .then(() => ShoppingListEdit.pullById(db, updateId))
            .then(item =>{
                expect(item).to.eql({
                    id: updateId,
                    ...newItem
                })
            })
    
        
      })
  });

 
  

  context('Given "shopping_list" has no data', ()=>{
      it('getAllItem() resolves an empty array', () =>{
       return ShoppingListEdit.getAllItems(db)
           .then(actual =>{
               expect(actual).to.eql([]);
           });
      });
  });
it('addItem() inserts an article and resolves the article with an "id"', () =>{
    const createItem={
        name: 'new name',
        price: '15.99',
        date_added: new Date('2020-01-01T00:00:00.000Z'), 
        category:'Lunch'
    };
    return ShoppingListEdit.addItem(db, createItem)
      .then(actual =>{
          expect(actual).to.eql({
              id:1,
              checked:false,
              name:createItem.name,
              price:createItem.price,
              date_added: new Date(createItem.date_added),
              category:'Lunch'
          });
      });
});

});

