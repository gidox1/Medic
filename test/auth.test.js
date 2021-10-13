const expect = require('chai').expect;
const request = require('supertest');
const init = require('./init/index');

beforeAll(async () => {
  //create connection
  await init.connect();
})

beforeEach(() => {
  init.cleanDatabase();
});

afterAll(async () => {
  await init.closeConnection()
})

//Write tests here
describe('Create user', () => {

})