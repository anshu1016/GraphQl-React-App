import { useCallback, useEffect, useState } from "react";
import { github } from "./db.js";
import { githubQuery } from "./query.js";
import RepoList from "./RepoList.jsx";
import NavButtons from "./NavButtons.jsx";
import SearchBox from "./SearchBox.jsx";
import Footer from "./Footer.jsx";
import { FaSun, FaMoon } from "react-icons/fa"; // Importing icons for day/night mode

function App() {
  const [userName, setUserName] = useState("");
  const [repoList, setRepoList] = useState(null);
  const [pageCount, setPageCount] = useState(10); // Items per page
  const [queryString, setQueryString] = useState(""); // Set to empty string for default search
  const [totalCount, setTotalCount] = useState(null);
  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [paginationString, setPaginationString] = useState("");
  const [paginationKeyword, setPaginationKeyword] = useState("first");

  // Debounce function to limit API calls when typing
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchData = useCallback(() => {
    const query = githubQuery({
      queryString,
      paginationKeyword,
      pageCount,
      paginationString,
    });

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify({ query }), // Wrapping query correctly in body
    })
      .then((res) => res.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repoList = data.data.search.edges;
        const total = data.data.search.repositoryCount;
        const start = data.data.search.pageInfo?.startCursor;
        const end = data.data.search.pageInfo?.endCursor;

        setUserName(viewer.name);
        setRepoList(repoList);
        setTotalCount(total);
        setStartCursor(start);
        setEndCursor(end);
        setHasNextPage(data.data.search.pageInfo?.hasNextPage);
        setHasPreviousPage(data.data.search.pageInfo?.hasPreviousPage);
      })
      .catch((err) => console.log("Fetch Error:", err));
  }, [pageCount, queryString, paginationString, paginationKeyword]);

  useEffect(() => {
    // Fetch last 10 updated repositories on initial load
    setQueryString(""); // Reset queryString for default search
    fetchData();
  }, [fetchData]);

  // Debounced function to handle query change
  const handleQueryChange = useCallback(
    debounce((newQuery) => {
      setQueryString(newQuery);
      fetchData(); // Trigger the fetch after query change
    }, 500), // Delay by 500ms
    [fetchData]
  );

  // Theme toggle (Day/Night)
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`app ${
        darkMode ? "bg-slate-950 text-white" : "bg-white text-black"
      } min-h-screen flex flex-col`}
    >
      {/* Background for light mode */}
      {!darkMode && (
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
        </div>
      )}
      {/* Background for dark mode */}
      {darkMode && (
        <div className="relative h-full w-full">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
      )}
      {/* Toggle Day/Night Mode with icons */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white rounded-md flex items-center"
      >
        {darkMode ? (
          <FaSun className="text-lg" />
        ) : (
          <FaMoon className="text-lg" />
        )}
      </button>
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-4xl font-bold mb-4">
          {userName ? `${userName} Repositories` : "Repositories"}
        </h1>
        <NavButtons
          start={startCursor}
          end={endCursor}
          next={hasNextPage}
          previous={hasPreviousPage}
          onPage={(mykeyword, myString) => {
            setPaginationKeyword(mykeyword);
            setPaginationString(myString);
          }}
          darkMode={darkMode} // Pass darkMode
        />
        {/* Search Box */}
        <SearchBox
          totalCount={totalCount}
          pageCount={pageCount}
          queryString={queryString}
          onTotalChange={setPageCount}
          onQueryChange={handleQueryChange} // Use the debounced function
          darkMode={darkMode} // Pass darkMode
        />
        {/* Dynamic Heading */}
        <h2 className="text-2xl font-semibold mb-4">
          {queryString
            ? `Repositories for "${queryString}":`
            : "Last 10 Updated Repositories:"}
        </h2>
        {/* Repo List */}
        {repoList?.length > 0 ? (
          repoList.map((repo) => (
            <RepoList repo={repo.node} key={repo.node.id} darkMode={darkMode} /> // Pass darkMode
          ))
        ) : (
          <p>No repositories found for this value.</p>
        )}
        {/* Pagination Controls */}
        <NavButtons
          start={startCursor}
          end={endCursor}
          next={hasNextPage}
          previous={hasPreviousPage}
          onPage={(mykeyword, myString) => {
            setPaginationKeyword(mykeyword);
            setPaginationString(myString);
          }}
          darkMode={darkMode} // Pass darkMode
        />
      </div>
      <Footer /> {/* Sync Footer Background */}
    </div>
  );
}

export default App;
