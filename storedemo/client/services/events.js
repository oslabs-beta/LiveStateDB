import { changeSingleInventoryField, getSingleInventory } from './inventory'

//helper functions for events

const handleIncremementClickHelper = async (id, field, value) => {
  //wait for result of calling function to increment DB
  await changeSingleInventoryField(id, field, value)
  //then call the fucntion that gets inventory of single item from DB (update)
  return getSingleInventory(id)
}

const handleDecrementClickHelper = async (id, field, value) => {
  //wait for result of calling function to decrement DB
  await changeSingleInventoryField(id, field, value)
  //then call the fucntion that gets inventory of single item from DB (update)
  return getSingleInventory(id)
}

export {
  handleIncremementClickHelper,
  handleDecrementClickHelper,
}
