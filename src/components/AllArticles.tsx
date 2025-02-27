import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import ArticleCard from "@/components/ArticleCard";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSearchKeyword } from "@/redux/slices/searchSlice";

const categories = [
  "general",
  "business",
  "technology",
  "sports",
  "health",
  "entertainment",
  "science",
];

const AllArticles = (data?: any) => {
  const dispatch = useDispatch();
  const searchKeyword = useSelector((state: RootState) => state.search.keyword);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("general");
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setArticles([]);
    setPage(1);
  }, [category, searchKeyword]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError("");

      try {
        const url = searchKeyword
          ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(
              searchKeyword
            )}&page=${page}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
          : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;

        const response = await axios.get(url);
        setArticles((prevArticles) => [
          ...prevArticles,
          ...response.data.articles,
        ]);
      } catch (err) {
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, page, searchKeyword]);

  const lastArticleRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const handleClearSearch = () => {
    dispatch(setSearchKeyword(""));
  };
  return (
    <section className="main-container py-6 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        <h1 className="text-2xl md:text-3xl font-bold text-start">
          {searchKeyword
            ? `Search Results for "${searchKeyword}"`
            : "News Articles"}
        </h1>

        {searchKeyword && (
          <button
            onClick={handleClearSearch}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Clear Search
          </button>
        )}
      </div>

      {!searchKeyword && (
        <div className="grid grid-cols-2 md:grid-cols-7 gap-2 md:gap-4 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-md ${
                category === cat ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      )}

      {error && <div className="text-red-500">{error}</div>}

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        key={searchKeyword || category}
      >
        {articles.map((article, index) => {
          if (index === articles.length - 1) {
            return (
              <motion.div
                key={index}
                ref={lastArticleRef}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ArticleCard index={index} article={article} />
              </motion.div>
            );
          }
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ArticleCard index={index} article={article} />
            </motion.div>
          );
        })}
      </motion.div>

      {loading && <Loader />}
    </section>
  );
};

export default AllArticles;
