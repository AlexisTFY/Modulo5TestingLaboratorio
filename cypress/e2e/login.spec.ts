describe('Login specs', () => {

    it('Visit the login page', () => {
        // Arrange

        // Act
        cy.visit('/');

        // Assert
    })

    it('Should name input has the focus when it clicks on it', () => {
        // Arrange

        // Act
        cy.visit('/');
        cy.findByRole('textbox').click();

        // Assert
        cy.findByRole('textbox').should('have.focus');
    })

    it('Should show an alert with a message when type invalid credentials', () => {
        // Arrange
        const user = 'admin';
        const password = 'invalid';

        // Act
        cy.visit('/');
        cy.findByRole('textbox').as('userInput');
        cy.findByLabelText('Contraseña *').as('passwordInput');

        cy.get('@userInput').type(user);
        cy.get('@passwordInput').type(password);
        cy.findAllByRole('button', {name:'Login'}).click();

        // Assert
        cy.get('@userInput').should('have.value', user);
        cy.get('@passwordInput').should('have.value', password);
        cy.findAllByText('Usuario y/o password no válidos');
    })

    it('Should navigate to app home when type valid credentials', () => {
        // Arrange
        const user = 'admin';
        const password = 'test';
    
        // Act
        cy.visit('/');
        cy.findByRole('textbox').as('userInput');
        cy.findByLabelText('Contraseña *').as('passwordInput');

        cy.get('@userInput').type(user);
        cy.get('@passwordInput').type(password);
        cy.findAllByRole('button', {name:'Login'}).click();
    
        // Assert
        cy.url().should('contain', '/submodule-list');
      });

})