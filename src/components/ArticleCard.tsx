// import Link from "next/link";

// const ArticleCard = ({ article }: any) => {
//   return (
//     <Link
//       href={{
//         pathname: `/article/${encodeURIComponent(article.title)}`,
//         query: {
//           title: article.title,
//           description: article.description || "Not available",
//           urlToImage: article.urlToImage || "",
//           content: article.content || "Not available",
//           source: article.source?.name || "Unknown",
//           publishedAt: article.publishedAt || "Not available",
//           url: article.url || "",
//         },
//       }}
//       passHref
//     >
//       {/* <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition h-[25rem] flex flex-col gap-2 cursor-pointer">
//         <img
//           src={article.urlToImage}
//           alt={article.title}
//           className="w-full h-48 object-cover text-center rounded-md"
//         />
//         <h2 className="font-semibold text-lg">{article.title}</h2>
//         <p className="text-gray-600 text-sm line-clamp-3">
//           {article.description}
//         </p>
//         <div className="flex items-center gap-1 border-t-2 pt-1">
//           <p className="text-gray-600 text-sm line-clamp-3 border-r-2 pr-1">
//             {article.publishedAt.split("T")[0]}
//           </p>
//           <p className="text-gray-600 text-sm line-clamp-3">
//             By {article.author}
//           </p>
//         </div> */}
//       <div className="border rounded-md shadow-md hover:shadow-lg transition h-[25rem] flex flex-col justify-between cursor-pointer">
//         <div className="space-y-2 p-4">
//           <img
//             src={article.urlToImage}
//             alt={article.title}
//             className="w-full h-48 object-cover text-center rounded-md"
//           />
//           <h2 className="font-semibold text-lg">{article.title}</h2>
//           <p className="text-gray-600 text-sm line-clamp-3">
//             {article.description}
//           </p>
//         </div>
//         <div className="flex items-center gap-1 border-t-2 pt-1 px-2">
//           <p className="text-gray-600 text-sm line-clamp-3 border-r-2 pr-1">
//             {article.publishedAt.split("T")[0]}
//           </p>
//           <p className="text-gray-600 text-sm line-clamp-3">
//             By {article.author}
//           </p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ArticleCard;

import Link from "next/link";

const ArticleCard = ({ article }: any) => {
  return (
    <Link
      href={{
        pathname: `/article/${encodeURIComponent(article.title)}`,
        query: {
          title: article.title,
          description: article.description || "Not available",
          urlToImage: article.urlToImage || "",
          content: article.content || "Not available",
          source: article.source?.name || "Unknown",
          publishedAt: article.publishedAt || "Not available",
          url: article.url || "",
        },
      }}
      passHref
    >
      <div className="common-transition border rounded-md shadow-md hover:shadow-xl cursor-pointer bg-white overflow-hidden flex flex-col h-[25rem] p-2">
        {/* Article Image */}
        <div className="relative w-full h-52 rounded-md">
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover text-center rounded-md"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-700">
              No Image Available
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="font-semibold text-lg line-clamp-2">
            {article.title}
          </h2>
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">
            {article.description}
          </p>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center bg-gray-100 text-gray-700 text-xs px-4 py-2 border-t rounded-md">
          <p>
            {article.publishedAt
              ? article.publishedAt.split("T")[0]
              : "Unknown Date"}
          </p>
          <p className="truncate">{article.source?.name || "Unknown Source"}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
