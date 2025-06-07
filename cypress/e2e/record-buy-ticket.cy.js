/*  Generated with Cypress Studio to get all the id and class needed needed for cypress testing*/

describe('template spec', () => {
  it('passes', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://www.cp.pt/passageiros/en/buy-tickets');
    cy.get(':nth-child(3) > .input-group > .typeahead').clear('a');
    cy.get(':nth-child(3) > .input-group > .typeahead').type('a');
    cy.get(':nth-child(3) > .input-group > .form-control').clear();
    cy.get(':nth-child(3) > .input-group > .form-control').type('lag');
    cy.get('.dropdown-menu > .active > a').click();
    cy.get('#arrival-date').clear('p');
    cy.get('#arrival-date').type('por');
    cy.get('.input-group > .dropdown-menu > :nth-child(5) > a').click();
    cy.get('#datepicker-first').click();
    cy.get('#datepicker-first_table > tbody > :nth-child(2) > :nth-child(1) > .picker__day').click();
    cy.get('#datepicker-second').click();
    cy.get('#datepicker-second_table > tbody > :nth-child(2) > :nth-child(6) > .picker__day').click();
    cy.get('p > .btn').click();
    /* ==== End Cypress Studio ==== */
  })
})