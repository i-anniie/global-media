import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import ArticleCard from "@/components/ArticleCard";
import { motion } from "framer-motion";
import Link from "next/link";

interface Article {
  title: string;
  description?: string;
  urlToImage?: string;
}
const TopArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopHeadlines = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
        );
        setArticles(response.data.articles);
      } catch (err) {
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopHeadlines();
  }, []);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="py-20 flex justify-center items-center">{error}</div>
    );
  return (
    <section className="main-container py-6 space-y-4">
      <h1 className="text-3xl font-bold">Top Headlines</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ArticleCard index={index} article={article} />
          </motion.div>
        ))}
      </div>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link href="/articles">
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
            Show More
          </button>
        </Link>
      </motion.div>
    </section>
  );
};

export default TopArticles;
