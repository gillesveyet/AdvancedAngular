import { AppPage } from './app.po';

describe('angular-fundamentals App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to the Angular Fundamentals Git Search!');
  });
});
