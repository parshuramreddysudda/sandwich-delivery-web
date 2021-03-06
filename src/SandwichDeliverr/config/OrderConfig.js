const OrderConfig = {
    "inventory": {
      "bread": 40,
      "lettuce": 20,
      "tomato": 20,
      "cheese": 10,
      "bacon": 10,
      "turkey": 5
    },
    "menu": [
      {
        "name": "Vegetarian",
        "price": 8.99,
        "ingredients": {
          "bread": 2,
          "lettuce": 2,
          "tomato": 2,
          "cheese": 2
        }
      },
      {
        "name": "BLT",
        "price": 9.99,
        "ingredients": {
          "bread": 3,
          "lettuce": 1,
          "tomato": 1,
          "bacon": 2
        }
      },
      {
        "name": "Turkey",
        "price": 10.99,
        "ingredients": {
          "bread": 2,
          "lettuce": 1,
          "tomato": 1,
          "cheese": 1,
          "turkey": 1
        }
      }
    ]
  }
  export default OrderConfig;