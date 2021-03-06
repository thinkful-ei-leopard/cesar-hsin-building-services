const ShoppingListEdit = {
  getAllItems(knex){
    return knex
      .select('*')
      .from('shopping_list');
  },
  addItem(knex, newItem){
    return knex
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      .then(rows => rows[0]);
  },
  pullById(knex, id){
    return knex 
      .from('shopping_list')
      .select('*')
      .where('id',id)
      .first();
  },
  deleteItem(knex, id){
    return knex('shopping_list')
      .where({id})
      .delete();
  },
  updateItem(knex, id, newItem){
    return knex('shopping_list')
      .where({id})
      .update(newItem);
  },
 
  
};
  



module.exports = ShoppingListEdit;

