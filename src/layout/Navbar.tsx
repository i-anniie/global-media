import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSearchKeyword } from "@/redux/slices/searchSlice";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Dialog } from "@mui/material";
import { motion } from "framer-motion";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchKeyword = useSelector((state: RootState) => state.search.keyword);
  const [inputValue, setInputValue] = useState(searchKeyword);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showNav, setShowNav] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
    setSearchHistory(storedHistory);
  }, []);

  const handleSearch = (value?: string) => {
    const searchValue = value?.trim() || inputValue.trim();

    if (!searchValue) return;

    dispatch(setSearchKeyword(searchValue));

    const updatedHistory = [
      searchValue,
      ...searchHistory.filter((item) => item !== searchValue),
    ].slice(0, 5);

    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    setInputValue("");
    setOpenSearchModal(false);
    setShowSearchHistory(false);
    router.push(`/articles`);
  };

  const handleDeleteHistory = (index: number) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <>
      <motion.section
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="sticky top-0 z-[999] hidden bg-black text-white h-16 md:flex justify-center items-center shadow"
      >
        <aside className="main-container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="border-r-2 pr-6 text-lg md:text-xl lg:text-2xl font-bold"
            >
              GM
            </Link>
            <div className="space-x-4">
              <Link href="/">Home</Link>
              <Link href="/articles">Articles</Link>
            </div>
          </div>

          <div className="relative w-full flex justify-end items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setShowSearchHistory(true)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="p-1 text-black rounded-md w-1/2"
              placeholder="Search News..."
            />
            {inputValue && (
              <button
                onClick={() => setInputValue("")}
                className="absolute right-8 text-gray-500 hover:text-black"
              >
                <AiOutlineClose />
              </button>
            )}
            <button
              onClick={() => handleSearch()}
              className="absolute right-3 text-black"
            >
              <FaSearch />
            </button>

            {showSearchHistory && searchHistory.length > 0 && (
              <ul className="absolute top-full right-0 mt-2 w-1/2 bg-white shadow-lg border rounded-md z-10">
                <h4 className="text-gray-500 text-sm px-3 pt-2">
                  Recent Searches
                </h4>
                {searchHistory.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between p-2 border-b items-center text-black hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setInputValue(item);
                      handleSearch(item);
                    }}
                  >
                    <span className="flex-1">{item}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteHistory(index);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <AiOutlineClose />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </motion.section>

      <motion.section
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-[999] block bg-white md:hidden"
      >
        <div className="main-container flex items-center justify-between py-4 shadow">
          <Link href="/" className="text-xl font-bold">
            GM
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpenSearchModal(true)}>
              <FaSearch size={20} />
            </button>
            <div
              onClick={() => setShowNav(!showNav)}
              className="cursor-pointer z-20"
            >
              {showNav ? (
                <AiOutlineClose size={22} className="text-red-700" />
              ) : (
                <AiOutlineMenu size={22} />
              )}
            </div>
          </div>
        </div>

        <div
          className={`absolute top-0 left-0 z-10 flex h-screen w-screen bg-black/20 transition-transform duration-500 ${
            showNav ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={() => setShowNav(false)}
        >
          <div className="z-20 w-[65vw] bg-white py-4 px-3">
            <Link
              href="/"
              className="text-2xl font-bold block text-center pb-4"
            >
              Global News
            </Link>
            <hr />
            <div className="flex flex-col gap-4 pt-4 items-center">
              <Link href="/">Home</Link>
              <Link href="/articles">Articles</Link>
            </div>
          </div>
        </div>
      </motion.section>

      <Dialog
        open={openSearchModal}
        onClose={() => setOpenSearchModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <div className="p-4 bg-white rounded-md">
          <div className="flex justify-between items-center">
            <h4 className="text-gray-500 text-sm">Recent Searches</h4>
            <button
              onClick={() => setOpenSearchModal(false)}
              className="text-gray-500 hover:text-black"
            >
              <AiOutlineClose className="text-xl" />
            </button>
          </div>

          <div className="relative mt-2">
            <div className="flex items-center border p-2 rounded-md">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-2 outline-none"
                placeholder="Search News..."
                onFocus={() => setShowSearchHistory(true)}
              />
              <button
                onClick={() => handleSearch()}
                className="ml-2 text-blue-600"
              >
                <FaSearch />
              </button>
            </div>

            {showSearchHistory && searchHistory.length > 0 && (
              <ul className="mt-2 bg-gray-100 shadow-md rounded-md max-h-[200px] overflow-y-auto">
                {searchHistory.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between p-2 border-b items-center hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setInputValue(item);
                      handleSearch(item);
                    }}
                  >
                    <span className="flex-1">{item}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteHistory(index);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <AiOutlineClose />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Navbar;
