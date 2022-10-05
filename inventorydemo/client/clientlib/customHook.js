const [ inventoryList, setInventoryList ] = useState({});
  const [ userId, setUserId ] = useState(uuid());
  

  useEffect(() => {
    //adding list of params to query
    //   const params = {
    //     type: 'public',
    //     app_id: APP_ID,
    //     app_key: APP_KEY,
    //     q: id,
    // }
    // fetch(URL + new URLSearchParams(params))
    // const source = new EventSource(`/event/?id=${userId}`);

    //return object from message 
    // { type: (get, update, insert, delete)
    //   data: if get --> normal query response 
    //         else --> change stream
    // }
    const source = new EventSource(`/event/?id=${userId}&db=inventoryDemo&collection=inventoryitems&query={}`);
    source.onmessage = e => {
      console.log(JSON.parse(e.data));
      const parsedMessage = JSON.parse(e.data);
      // const updatedInventoryList = JSON.parse(JSON.stringify(InventoryList));
      setInventoryList((previousInventoryList) => 
      {
        const updatedInventoryList = JSON.parse(JSON.stringify(previousInventoryList));
        updatedInventoryList[parsedMessage.documentKey._id].quantity = parsedMessage.updateDescription.updatedFields.quantity;
        return updatedInventoryList;
      });
    }

  }, [userId])