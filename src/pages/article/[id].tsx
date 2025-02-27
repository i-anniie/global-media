import { useRouter } from "next/router";
import PublicLayout from "@/layout";
import { motion } from "framer-motion";

const NewsDetail = () => {
  const router = useRouter();
  const { title, description, urlToImage, content, source, publishedAt, url } =
    router.query;

  const titleStr = Array.isArray(title) ? title[0] : title;
  const descriptionStr = Array.isArray(description)
    ? description[0]
    : description;
  const urlToImageStr = Array.isArray(urlToImage) ? urlToImage[0] : urlToImage;
  const contentStr = Array.isArray(content) ? content[0] : content;
  const sourceStr = Array.isArray(source) ? source[0] : source;
  const publishedAtStr = Array.isArray(publishedAt)
    ? publishedAt[0]
    : publishedAt;
  const urlStr = Array.isArray(url) ? url[0] : url;

  if (!titleStr) return <div className="text-center py-10">Loading...</div>;

  return (
    <PublicLayout>
      <motion.section
        className="main-container md:min-h-[61rem] lg:min-h-[42rem] py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4">{titleStr}</h1>
        {urlToImageStr && (
          <img
            src={urlToImageStr}
            alt={titleStr}
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
        )}
        <p className="text-gray-700 my-4">{contentStr || descriptionStr}</p>
        <p className="text-sm text-gray-500">
          <strong>Source:</strong> {sourceStr} | <strong>Published:</strong>{" "}
          {publishedAtStr}
        </p>
        {urlStr && (
          <a
            href={urlStr}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            Read More
          </a>
        )}
      </motion.section>
    </PublicLayout>
  );
};

export default NewsDetail;
