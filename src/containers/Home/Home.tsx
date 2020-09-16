import React, { useEffect, useState } from "react";
import config from "../../config";

import SearchInput from "../../components/SearchInput";

import useDebounce from "../../hooks/useDebounce";
import BooksList from "../../components/BooksList/BooksList";

export function Home() {
  const [page, setPage] = useState<number>(0);
  const [searchQuery, handleSetSearchQuery] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const handleSearch = (searchQuery: string) => {
    setLoadingData(true);
    setSearchError("");
    setPage(0);
    fetch(config.SEARCH_API + searchQuery)
      .then((response) => response.json())
      .then(({ docs }) => {
        setSearchError("");
        setLoadingData(false);
        setSearchResults(docs);
        console.log(docs);
      })
      .catch((e) => {
        setSearchError("There was an error while performing this search.");
        setLoadingData(false);
        setSearchResults([]);
      });
  };

  useEffect(() => {
    console.log(debouncedSearchTerm);
    if (debouncedSearchTerm.length && debouncedSearchTerm.length > 3) {
      handleSearch(searchQuery);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <SearchInput
        searchQuery={searchQuery}
        handleSetSearchQuery={handleSetSearchQuery}
      />
      {loadingData ? (
        <div>loading data</div>
      ) : (
        <BooksList books={searchResults} />
      )}
    </>
  );
}
