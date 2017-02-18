import { AfrLifestylePage } from './app.po';

describe('afr-lifestyle App', function() {
  let page: AfrLifestylePage;

  beforeEach(() => {
    page = new AfrLifestylePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
