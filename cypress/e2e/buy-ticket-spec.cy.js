const getDateInfo = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return {
    day: date.getDate(),
    month: date.toLocaleString('default', { month: 'long' }),
    year: date.getFullYear()
  };
};

/*got idea from https://github.com/cypress-io/cypress/issues/2845 */
const selectDateFromPicker = (pickerInputId, calendarRootId, offsetDays) => {
  const targetDate = getDateInfo(offsetDays);

  cy.get(`#${pickerInputId}`).click(); // Open the calendar

  // Ensure the calendar is visible
  cy.get(`#${calendarRootId}`).should('be.visible');

  // Navigate to correct month/year if needed
  const nextButton = `#${calendarRootId} .picker__nav--next`;

  const clickNextUntilMatch = () => {
    cy.get(`#${calendarRootId} .picker__month`).then(($m) => {
      cy.get(`#${calendarRootId} .picker__year`).then(($y) => {
        const currentMonth = $m.text().trim();
        const currentYear = parseInt($y.text().trim(), 10);

        if (currentMonth !== targetDate.month || currentYear !== targetDate.year) {
          cy.get(nextButton).click();
          clickNextUntilMatch();
        }
      });
    });
  };

  cy.get(`#${calendarRootId} .picker__month`).then(($month) => {
    cy.get(`#${calendarRootId} .picker__year`).then(($year) => {
      const isSameMonth = $month.text().trim() === targetDate.month;
      const isSameYear = parseInt($year.text().trim(), 10) === targetDate.year;

      if (!isSameMonth || !isSameYear) {
        clickNextUntilMatch();
      }
    });
  });

  // Click the actual date
  cy.get(`#${calendarRootId} .picker__day`)
    .not('.picker__day--disabled')
    .contains(new RegExp(`^${targetDate.day}$`))
    .click();
};


const getFormattedDate = (offsetDays) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
  };


describe('Buy Tickets Flow', () => {
  const departingFrom = 'Lagos';
  const arrivingAt = 'Porto Campanha';


  const departDate = getFormattedDate(3);
  const returnDate = getFormattedDate(5);

  beforeEach(() => {
    cy.visit('https://www.cp.pt/passageiros/en/buy-tickets');
  });

  it('should fill the form, cancel, and validate data is preserved', () => {
  cy.get('input[name="textBoxPartida"]')
    .clear()
    .type(departingFrom)
    .wait(1000)
    .type('{enter}');

  cy.get('input[name="textBoxChegada"]')
    .clear()
    .type(arrivingAt)
    .wait(1000)
    .type('{enter}');

    // Select "from date" - 3 days from today
    selectDateFromPicker('datepicker-first', 'datepicker-first_root', 3);

    // Select "return date" - 5 days from today
    selectDateFromPicker('datepicker-second', 'datepicker-second_root', 5);

    cy.get('input[type="submit"]').click();

    cy.origin('https://venda.cp.pt', () => {
      cy.url().should('include', '/bilheteira/comprar/');
      cy.get('#exitButton').click();
    });
   
    // Now validate the fields still contain original values
    cy.get('input[name="textBoxPartida"]').should('have.value', departingFrom);
    cy.get('input[name="textBoxChegada"]').should('have.value', arrivingAt);
    cy.get('#datepicker-first').should('have.value', departDate);
    cy.get('#datepicker-second').should('have.value', returnDate);
  });
});