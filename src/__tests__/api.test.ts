/**
 * @jest-environment node
 */

import { fetchNews } from "../utils/api";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("fetches news articles successfully", async () => {
  server.use(
    http.get("https://newsapi.org/v2/top-headlines", async () => {
      return HttpResponse.json({
        status: "ok",
        articles: [
          { title: "Test Article 1", description: "This is a test article." },
        ],
      });
    })
  );

  const data = await fetchNews();
  expect(data.status).toBe("ok");
  expect(data.articles).toHaveLength(1);
});

test("handles API errors correctly", async () => {
  server.use(
    http.get("https://newsapi.org/v2/top-headlines", async () => {
      return new Response(null, { status: 500 });
    })
  );

  await expect(fetchNews()).rejects.toThrow("Failed to fetch news");
});
