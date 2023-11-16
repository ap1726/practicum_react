beforeEach(() => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");
  
  // Устанавливаем токены:
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie('accessToken', 'test-accessToken')
  });

Cypress.config("defaultCommandTimeout", 40000);

describe('check make order', function() {

    it('d-n-d и оформление заказа', function() {
        cy.visit('http://localhost:3000');

        let dropZone = 'section[class^="burger-constructor_main"]';
        cy.get('#bun > div a:first-child').first().trigger('dragstart');
        cy.get(dropZone).trigger('drop');

        cy.get('#sauce > div a:first-child').first().trigger('dragstart');
        cy.get(dropZone).trigger('drop');

        cy.get('#main > div a:first-child').first().trigger('dragstart');
        cy.get(dropZone).trigger('drop');
  
        cy.contains('Оформить заказ').click();
        cy.get("h2[class^=order-details_title_]").contains("123").should("exist");
    });
}); 

describe('check ingredients details modal', function() {
    it('Открытие модального окна деталей ингредиента', function() {
        cy.visit('http://localhost:3000');
        cy.get('#bun > div a:first-child').first().click();
        cy.get("div[class^=ingredient-details_caption_]").contains("булка");

    });
}); 


    