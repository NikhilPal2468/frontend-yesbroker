import { useCallback, useState } from "react";
import debounce from "./debounce";

const useDebounceQuery = () => {
  const [query, setQuery] = useState("");

  const request = debounce((value) => {
    setQuery(value);
  }, 400);

  const debounceQuery = useCallback((value) => request(value), []);

  return { debounceQuery, query };
};

export default useDebounceQuery;
