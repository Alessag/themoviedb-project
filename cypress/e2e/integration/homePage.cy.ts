/// <reference types="cypress" />

import {
  mockMovie,
  mockMovieApiResponse,
  mockSingleMovieApiResponse,
} from '../../../tests/utils/mock-data';

describe('home page works', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');

    cy.intercept('GET', '**/3/authentication/guest_session/new?**', {
      statusCode: 200,
      body: { success: true, guest_session_id: '1234', expires_at: '' },
    }).as('getSessionToken');

    cy.intercept('GET', '**/3/movie/popular?**', {
      statusCode: 200,
      body: mockMovieApiResponse,
    }).as('getPopularMovies');

    cy.wait('@getSessionToken');
  });

  it('display popular movies', () => {
    cy.wait('@getPopularMovies');

    cy.contains('Popular Movies');
  });

  it('Display search movie', () => {
    cy.wait('@getPopularMovies');

    cy.intercept('GET', '**/3/search/movie?**', {
      statusCode: 200,
      body: mockMovieApiResponse,
    }).as('getSearchMovies');

    cy.get("a[href='/search']").click();

    cy.wait('@getSearchMovies');

    cy.contains('Search Movies');
  });

  it('Show movie details', () => {
    cy.intercept('GET', '**/3/movie/popular?**', {
      statusCode: 200,
      body: mockSingleMovieApiResponse,
    }).as('getSinglePopularMovie');

    cy.wait('@getSinglePopularMovie');

    cy.get('.ant-card-cover').should('have.lengthOf.at.least', 1).click();

    cy.contains(mockMovie.title);
  });
});
