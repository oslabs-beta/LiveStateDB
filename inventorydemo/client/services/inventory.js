//helper functions for all requests to inventory router
module.exports = inventoryFunctions = {
  
  getAllInventory: () => {
    return fetch('/inventory/all')
      .then(data => data.json())
  },

  getSingleInventory: (id) => {
    return fetch('/inventory/getOne/' + id)
      .then(data => data.json())
  },

  createInventory: (item, quantitiy, description, price) => {
    return fetch('/inventory/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item: item,
        quantitiy: quantitiy,
        description: description,
        price: price,
      })
    });
  },

  changeSingleInventoryField: (id, field, value) => {
    return fetch('/inventory/changeSingleField', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        field: field,
        value: value,
      })
    })
  }
}