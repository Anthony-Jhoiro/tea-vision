import { translate } from '../support/i18n';

function getPopoverTitle() {
  return cy.contains(translate('pwa_install.title'));
}

function getPopoverDescription() {
  return cy.contains(translate('pwa_install.description'));
}

function getPWAInstallButton() {
  return cy.contains(translate('pwa_install.installButton'));
}

function getPWADismissPopoverButton() {
  return cy.contains(translate('pwa_install.dismissButton'));
}

describe('PWA Install', () => {
  beforeEach(() => cy.visit('/'));

  it('should display PWA install popover', () => {
    cy.window().trigger('beforeinstallprompt', {
      prompt() {
        // I am empty but I am happy with it!
      },
    });

    getPopoverTitle().should('be.visible');
    getPWAInstallButton().should('be.visible');
    getPWADismissPopoverButton().should('be.visible');
    getPopoverDescription().should('be.visible');
  });

  it('should install PWA on click', () => {
    let hasBeenCalled = false;
    cy.window().trigger('beforeinstallprompt', {
      prompt() {
        hasBeenCalled = true;
      },
    });

    getPopoverTitle().should('be.visible');

    getPWAInstallButton().click();

    getPopoverTitle()
      .should('not.exist')
      .then(
        () =>
          expect(hasBeenCalled, 'Install method should have been called').to.be
            .true,
      );
  });

  it('should dismiss on click dismiss button', () => {
    let hasBeenCalled = false;
    cy.window().trigger('beforeinstallprompt', {
      prompt() {
        hasBeenCalled = true;
      },
    });

    getPopoverTitle().should('be.visible');

    getPWADismissPopoverButton().click();

    getPopoverTitle()
      .should('not.exist')
      .then(
        () =>
          expect(hasBeenCalled, 'Install method should not have been called').to
            .be.false,
      );
  });
});
