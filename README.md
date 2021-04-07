# Sandwich Delivery 

## Pre-requisites: 
- install node and npm

## Step 1: For installing app for the first time
```
npm install
```

## Step 2: For Starting app 

```
npm start
```

## Step 3: For running tests 

```
npm run test
```

## Features in the project. 

1. User can create an order
2. User can customize an order. (Validations for Order name, Atleast Sandwich selection is taken care)
3. User can select multiple quantity by clicking a Sandwich.
4. User can Filter orders w.r.t order status: i.e. pending, completed
5. User can checkout an order with a single click of a button.

## Testing
1. Added few unit tests for Helper methods

## Some library contributions
1. Created a Re-usable Dynamic Table, creates a Table based on input data and column config.
2. Created a Re-usable Input, renders text input based on input element config. 
    - It Validates required input field and displays error message from input config.
    - We can extend further and add more validations in the input config if required.
(Further this can be enhanced to add other input types like Select, Radio,... )

###UML of the Project 
<img width="801" alt="Screen Shot 2021-03-20 at 10 07 36 PM" src="https://user-images.githubusercontent.com/28673434/113895705-d9f64600-97e6-11eb-8616-94ff72c22c17.png">
