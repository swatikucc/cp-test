import { getDateInfo } from '../utils/dateHelpers';

Cypress.Commands.add('selectDateFromPicker', (pickerInputId, calendarRootId, offsetDays) => {
  const targetDate = getDateInfo(offsetDays);

  const clickNextUntilMatch = () => {
    cy.get(`#${calendarRootId} .picker__month`).then(($m) => {
      cy.get(`#${calendarRootId} .picker__year`).then(($y) => {
        const currentMonth = $m.text().trim();
        const currentYear = parseInt($y.text().trim(), 10);

        if (currentMonth !== targetDate.month || currentYear !== targetDate.year) {
          cy.get(`#${calendarRootId} .picker__nav--next`).click();
          clickNextUntilMatch();
        }
      });
    });
  };

  cy.get(`#${pickerInputId}`).click();
  cy.get(`#${calendarRootId}`).should('be.visible');

  cy.get(`#${calendarRootId} .picker__month`).then(($month) => {
    cy.get(`#${calendarRootId} .picker__year`).then(($year) => {
      const isSameMonth = $month.text().trim() === targetDate.month;
      const isSameYear = parseInt($year.text().trim(), 10) === targetDate.year;

      if (!isSameMonth || !isSameYear) {
        clickNextUntilMatch();
      }
    });
  });

  cy.get(`#${calendarRootId} .picker__day`)
    .not('.picker__day--disabled')
    .contains(new RegExp(`^${targetDate.day}$`))
    .click();
});
