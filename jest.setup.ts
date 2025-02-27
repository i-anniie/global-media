import "@testing-library/jest-dom";
import { server } from './src/mocks/server';

// Start the mock server before tests
beforeAll(() => server.listen());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Close the server after all tests
afterAll(() => server.close());
