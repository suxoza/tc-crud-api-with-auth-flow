/// <reference types="cypress" />


var randomEmail = require('random-email');
const email = randomEmail()
const password = 'test_password'

let token = ''
let postId = 0


describe('Posts - Create', () => {
    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:5000/api/user/register',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'name': 'some name',
                'email': email,
                'password': password
            }
          }).then(responce => {
            token = responce.body.userToken
          })
    })

    it("Test Post create", () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:5000/api/post',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+token
            },
            body: {
                'title': 'some',
                'description': 'something',
            }
          }).then(responce => {
            postId = responce.body._id
            expect(responce.body.title).to.include('some')
          })
    })

})

describe('Posts - Update', () => {
    it("Test Post Update", () => {
        console.log('----------postId = ', postId)
        cy.request({
            method: 'PATCH',
            url: `http://localhost:5000/api/post/${postId}`,
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+token
            },
            body: {
                'title': 'some changed',
                'description': 'something',
            }
          }).then(responce => {
            expect(responce.body.title).to.include('some changed')
          })
    })
})

describe('Posts - Delete', () => {
    it("Test Post Delete", () => {
        console.log('----------postId = ', postId)
        cy.request({
            method: 'DELETE',
            url: `http://localhost:5000/api/post/${postId}`,
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+token
            }
          }).then(responce => {
            expect(responce.body.affected).equal(1)
          })
    })
})