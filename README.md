# cypress e2e tests – cp.pt ticket booking flow

This project contains end-to-end tests using cypress to automate the "buy tickets" flow on the cp.pt passenger website.

## project structure

cp-test/  
├── cypress/  
│   ├── e2e/ → buy-ticket-spec.cy.js  
│   └── support/ → commands.js  
├── utils/ → dateHelpers.js  
└── cypress.config.js  

## what it tests

- fills departure and arrival cities  
- selects departure and return dates  
- submits the ticket search form  
- cancels from external booking page  
- checks that form data is preserved  

## how to run

1. install dependencies  
    npm install

2. open cypress test runner  
   npx cypress open  

3. run tests in headless mode  
   npx cypress run  

## custom commands and helpers

- cy.selectDateFromPicker → selects a date in calendar  
- getFormattedDate(offsetdays) → formats a future date  

## requirements

- node.js 14 or above  
- cypress 12 or above  

