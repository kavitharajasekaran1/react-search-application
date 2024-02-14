import React, { useEffect, useState } from "react";
import "./Search.css";

function Search() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  useEffect(() => {
    if (searchQuery) {
      let searched = setTimeout(() => {
        setSearched(
          users.filter((user) => {
            return Object.values(user)
              .join("")
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          })
        );
      }, 1000);
      return () => clearTimeout(searched);
    } else {
      setUsers(users);
    }
  });
  return (
    <div>
      <input
        className="search-query"
        placeholder="search"
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <div className="grid-main">
        {searchQuery.length
          ? searched.map((search) => {
              return (
                <div className="grid-child">
                  <h2>{search.name}</h2>
                  <p>{search.username}</p>
                </div>
              );
            })
          : users.map((user) => {
              return (
                <div className="grid-child">
                  <h2>{user.name}</h2>
                  <p>{user.username}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default Search;
