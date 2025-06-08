import { getFormattedDate } from '../utils/dateHelpers';

describe('Buy Tickets Flow', () => {
  const departingFrom = 'Lagos';
  const arrivingAt = 'Porto Campanha';

  const departDate = getFormattedDate(3);
  const returnDate = getFormattedDate(5);

  it('should fill the form, cancel, and validate data is preserved', () => {
    cy.visit('https://www.cp.pt/passageiros/en/buy-tickets');
  
    cy.get('input[name="textBoxPartida"]').clear().type(departingFrom).wait(1000).type('{enter}');
    cy.get('input[name="textBoxChegada"]').clear().type(arrivingAt).wait(1000).type('{enter}');

    cy.selectDateFromPicker('datepicker-first', 'datepicker-first_root', 3);
    cy.selectDateFromPicker('datepicker-second', 'datepicker-second_root', 5);

    cy.get('input[type="submit"]').click();

    cy.origin('https://venda.cp.pt', () => {
      cy.url().should('include', '/bilheteira/comprar/');
      cy.get('#exitButton').click();
    });

    cy.get('input[name="textBoxPartida"]').should('have.value', departingFrom);
    cy.get('input[name="textBoxChegada"]').should('have.value', arrivingAt);
    cy.get('#datepicker-first').should('have.value', departDate);
    cy.get('#datepicker-second').should('have.value', returnDate);
  });
});
