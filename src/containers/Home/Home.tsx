import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import config from "../../config";
import SearchInput from "../../components/SearchInput";

import useDebounce from "../../hooks/useDebounce";
import BooksList from "../../components/BooksList/BooksList";
import styled from "styled-components";
import Spinner from "../../components/Spinner";

const PAGE_LIMIT = 20;

export function Home() {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, handleSetSearchQuery] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const handleSearch = useCallback(() => {
    setLoadingData(true);
    setSearchError("");
    fetch(
      `${config.SEARCH_API}${debouncedSearchTerm}&page=${page}&limit=${PAGE_LIMIT}`
    )
      .then((response) => response.json())
      .then(({ docs, numFound }) => {
        setTotalRecords(numFound);
        setSearchError("");
        setLoadingData(false);
        setSearchResults(docs);
      })
      .catch((e) => {
        setPage(1);
        setTotalRecords(0);
        setSearchError("There was an error while performing this search.");
        setLoadingData(false);
        setSearchResults([]);
      });
  }, [debouncedSearchTerm, page]);

  useEffect(() => {
    if (debouncedSearchTerm.length && debouncedSearchTerm.length > 3) {
      handleSearch();
    }
  }, [debouncedSearchTerm, page, handleSearch]);

  return (
    <>
      <SearchInput
        searchQuery={searchQuery}
        handleSetSearchQuery={handleSetSearchQuery}
      />
      <StyledContainer>
        {searchResults.length ? (
          <ReactPaginate
            onPageChange={({ selected }) => {
              setPage(selected === 0 ? 1 : selected + 1);
            }}
            containerClassName={"pagination"}
            initialPage={page - 1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            activeClassName={"active"}
            pageCount={Math.ceil(totalRecords / PAGE_LIMIT)}
          />
        ) : null}
        {loadingData ? <Spinner /> : <BooksList books={searchResults} />}
        {searchError ? <div>{searchError}</div> : null}
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  margin: 0 1rem 1rem;
  .pagination {
    display: inline-block;
    padding: 0;
    li {
      display: inline-block;
      margin: 0 1rem;
      a {
        cursor: pointer;
        outline: none;
      }
      &:first-child {
        margin: 0;
      }
      &.disabled {
        opacity: 0.6;
      }
      &.active {
        font-weight: bold;
      }
    }
  }
`;
