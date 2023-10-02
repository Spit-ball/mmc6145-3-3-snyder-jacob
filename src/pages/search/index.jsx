import BookPreview from "../../components/bookPreview";
import { useState, useRef, useEffect } from "react";
import styles from "./style.module.css";

export default function Search() {
  // stores search results
  const [bookSearchResults, setBookSearchResults] = useState();
  // stores value of input field
  const [query, setQuery] = useState("React");
  // compare to query to prevent repeat API calls
  const [previousQuery, setPreviousQuery] = useState();
  // used to prevent rage clicks on form submits
  const [fetching, setFetching] = useState(false);

  // TODO: When the Search Page loads, use useEffect to fetch data from:
  // https://www.googleapis.com/books/v1/volumes?langRestrict=en&maxResults=16&q=YOUR_QUERY
  // Use a query of "React"

  useEffect(() => {
    setFetching(true);
    async function grabData() {
      const response = await fetch(
        "https://www.googleapis.com/books/v1/volumes?langRestrict=en&maxResults=16&q=React"
      );
      const data = await response.json();
      if (data && data.items) {
        setBookSearchResults(data.items);
      }
      setFetching(false);
      setPreviousQuery(query);
    }
    grabData();
  }, []);

  // TODO: Write a submit handler for the form that fetches data from:
  // https://www.googleapis.com/books/v1/volumes?langRestrict=en&maxResults=16&q=YOUR_QUERY
  // and stores the "items" property in the result to the bookSearchResults variable
  // This function MUST prevent repeat searches if:
  // fetch has not finished
  // the query is unchanged

  async function handleSubmit(e) {
    e.preventDefault();
    //passes test but still searches an empty string
    if (fetching == true || query == previousQuery || query === "") {
      return;
    }
    setFetching(true);
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?langRestrict=en&maxResults=16&q=${query}`
    );
    const data = await res.json();
    if (data && data.items) {
      setBookSearchResults(data.items);
    }
    setFetching(false);
    setPreviousQuery(query);
  }

  const inputRef = useRef();
  const inputDivRef = useRef();

  return (
    <main className={styles.search}>
      <h1>Book Search</h1>
      {/* TODO: add an onSubmit handler */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="book-search">
          Search by author, title, and/or keywords:
        </label>
        <div ref={inputDivRef}>
          {/* TODO: add value and onChange props to the input element based on query/setQuery */}
          <input
            ref={inputRef}
            type="text"
            name="book-search"
            id="book-search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      {
        // if loading, show the loading component
        // else if there are search results, render those
        // else show the NoResults component
        fetching ? (
          <Loading />
        ) : bookSearchResults?.length ? (
          <div className={styles.bookList}>
            {/* TODO: render BookPreview components for each search result here based on bookSearchResults */}
            {bookSearchResults.map((bookData) => (
              <BookPreview
                key={bookData.id}
                title={bookData.volumeInfo.title}
                authors={bookData.volumeInfo.authors}
                thumbnail={bookData.volumeInfo.imageLinks?.thumbnail}
                previewLink={bookData.volumeInfo.previewLink}
              />
            ))}
          </div>
        ) : (
          <NoResults
            {...{ inputRef, inputDivRef, previousQuery }}
            clearSearch={() => setQuery("")}
          />
        )
      }
    </main>
  );
}

function Loading() {
  return <span className={styles.loading}>Loading...⌛</span>;
}

function NoResults({ inputDivRef, inputRef, previousQuery, clearSearch }) {
  function handleLetsSearchClick() {
    inputRef.current.focus();
    if (previousQuery) clearSearch();
    if (inputDivRef.current.classList.contains(styles.starBounce)) return;
    inputDivRef.current.classList.add(styles.starBounce);
    inputDivRef.current.onanimationend = function () {
      inputDivRef.current.classList.remove(styles.starBounce);
    };
  }
  return (
    <div className={styles.noResults}>
      <p>
        <strong>
          {previousQuery
            ? `No Books Found for "${previousQuery}"`
            : "Nothing to see here yet. 👻👀"}
        </strong>
      </p>
      <button onClick={handleLetsSearchClick}>
        {previousQuery ? `Search again?` : `Let's find a book! 🔍`}
      </button>
    </div>
  );
}
