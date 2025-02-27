export const fetchNews = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return response.json();
};
