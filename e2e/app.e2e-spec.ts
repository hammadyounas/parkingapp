import { ParkingappPage } from './app.po';

describe('parkingapp App', () => {
  let page: ParkingappPage;

  beforeEach(() => {
    page = new ParkingappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
