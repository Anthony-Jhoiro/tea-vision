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

function getPWADismissDrawerButton() {
  return cy.contains(translate('pwa_install.dismissButton'));
}

describe('PWA Install', () => {
  it('should display PWA install drawer', () => {
    cy.visit('/');
    cy.window().trigger('beforeinstallprompt', {
      prompt() {
        // I am empty but I am happy with it!
      },
    });

    getPopoverTitle().should('be.visible');
    getPWAInstallButton().should('be.visible');
    getPWADismissDrawerButton().should('be.visible');
    getPopoverDescription().should('be.visible');
  });

  it('should install PWA on click', () => {
    cy.visit('/');
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
    cy.visit('/');
    let hasBeenCalled = false;
    cy.window().trigger('beforeinstallprompt', {
      prompt() {
        hasBeenCalled = true;
      },
    });

    getPopoverTitle().should('be.visible');

    getPWADismissDrawerButton().click();

    getPopoverTitle()
      .should('not.exist')
      .then(
        () =>
          expect(hasBeenCalled, 'Install method should not have been called').to
            .be.false,
      );
  });

  it('should not display the drawer if already refused', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('lastPwaDismiss', new Date().toISOString());
    });

    cy.visit('/');

    cy.window().trigger('beforeinstallprompt', {
      prompt() {
        // I am empty but I am happy with it!
      },
    });

    getPopoverTitle().should('not.exist');
    getPWAInstallButton().should('not.exist');
    getPWADismissDrawerButton().should('not.exist');
    getPopoverDescription().should('not.exist');
  });

  it('should display the drawer if refused more than a week ago', () => {
    cy.window().then((win) => {
      win.localStorage.setItem(
        'lastPwaDismiss',
        new Date(
          new Date().getTime() - (1000 * 60 * 60 * 24 * 7 + 1),
        ).toISOString(),
      );
    });

    cy.visit('/');

    cy.window().trigger('beforeinstallprompt', {
      prompt() {
        // I am empty but I am happy with it!
      },
    });

    getPopoverTitle().should('be.visible');
    getPWAInstallButton().should('be.visible');
    getPWADismissDrawerButton().should('be.visible');
    getPopoverDescription().should('be.visible');
  });
});
