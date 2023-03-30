/// <reference types="cypress" />


var randomEmail = require('random-email');
const email = randomEmail()
const password = 'test_password'


describe('Registration Flow', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
    })
    
    it('should be redirected on login page', () => {
        cy.url().should('match', /register/)
    })

    it('should contain name, email, password fields', () => {
        cy.get('#SignUpContaiener').find('input[name="name"]').should('exist')
        cy.get('#SignUpContaiener').find('input[name="email"]').should('exist')
        cy.get('#SignUpContaiener').find('input[name="password"]').should('exist')
    })

    it('form should not be submitted with blank fields', () => {
        cy.get('#SignUpContaiener').find('button[type="submit"]').click()
        cy.wait(800)
        cy.url().should('match', /register/)  
    })

    it('Attempt to send non-valid email', () => {
        cy.get('#SignUpContaiener').find('input[name="name"]').type('some name')
        cy.get('#SignUpContaiener').find('input[name="email"]').type('paliko gmail.com')
        cy.get('#SignUpContaiener').find('input[name="password"]').type(password)
        cy.get('#SignUpContaiener').find('button[type="submit"]').click()
        cy.wait(800)
        cy.url().should('match', /register/)  
    })

    it('Complete Registration Flow', () => {
        cy.get('#SignUpContaiener').find('input[name="name"]').type('some name')
        cy.get('#SignUpContaiener').find('input[name="email"]').type(email)
        cy.get('#SignUpContaiener').find('input[name="password"]').type(password)
        cy.get('#SignUpContaiener').find('button[type="submit"]').click()
        cy.wait(1000)
        cy.url().should('eq', 'http://localhost:5173/')  
    })
})


describe('Authorisation Flow', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login')
    })

    it('should contain email, password fields', () => {
        cy.get('#SingInContainer').find('input[name="email"]').should('exist')
        cy.get('#SingInContainer').find('input[name="password"]').should('exist')
    })

    it('form should not be submitted with blank fields', () => {
        cy.get('#SingInContainer').find('button[type="submit"]').click()
        cy.wait(800)
        cy.url().should('match', /login/)  
    })

    it('Attempt to send non-valid email', () => {
        cy.get('#SingInContainer').find('input[name="email"]').type('paliko gmail.com')
        cy.get('#SingInContainer').find('input[name="password"]').type(password)
        cy.get('#SingInContainer').find('button[type="submit"]').click()
        cy.wait(800)
        cy.url().should('match', /login/)  
    })

    it('Attempt to send wrong email', () => {
        cy.get('#SingInContainer').find('input[name="email"]').type(randomEmail())
        cy.get('#SingInContainer').find('input[name="password"]').type(password)
        cy.wait(800)
        cy.url().should('match', /login/)  
    })

    it('Complete Authorisation Flow', () => {
        cy.get('#SingInContainer').find('input[name="email"]').type(email)
        cy.get('#SingInContainer').find('input[name="password"]').type(password)
        cy.get('#SingInContainer').find('button[type="submit"]').click()
        cy.wait(1000)
        cy.url().should('eq', 'http://localhost:5173/')  
    })

})