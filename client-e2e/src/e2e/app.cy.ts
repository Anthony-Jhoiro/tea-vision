import { getGreeting } from '../support/app.po';

describe('client-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('smoke test', () => {
    getGreeting().contains('My Tea Collection');
  });
});
