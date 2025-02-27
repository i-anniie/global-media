import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://newsapi.org/v2/top-headlines', async () => {
    return HttpResponse.json({
      status: "ok",
      articles: [
        { title: "Test Article 1", description: "This is a test article." },
        { title: "Test Article 2", description: "This is another test article." },
      ],
    });
  }),
];
