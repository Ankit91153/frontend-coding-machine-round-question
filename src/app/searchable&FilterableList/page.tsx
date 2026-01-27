"use client";
import { debounce } from "@/utils/debounce";
import { useProductFetch } from "@/utils/productFetch";
import React, { ChangeEvent, useMemo, useState } from "react";

const SearchableAndFilterableList = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [skip, setSkip] = useState(0);

  const { data, loading, total } = useProductFetch(query, skip);

  const debounedQuery = useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
        setSkip(0);
      }, 500),
    [],
  );

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounedQuery(e.target.value)
  };

  return (
    <div className="w-full h-full flex justify-center mt-10">
      <div>
        <div className="mb-10">Search and Filter</div>
        <div>
          <input
            type="text"
            name="search"
            value={search}
            onChange={changeHandler}
            className="border"
            placeholder="Search Product"
          />
        </div>
        <div>
          <button disabled={skip <= 0} onClick={() => setSkip(prev => prev + 10)}>
            Prev
          </button>
          <button disabled={skip >= total} onClick={() => setSkip(prev => Math.max(0, prev - 10))
}>
            Next
          </button>
        </div>
        {loading ? (
          <>Loading....</>
        ) : (
          <div>
            {data.length > 0 ? (
              data?.map((data: any) => {
                return (
                  <div className="flex">
                    <div>
                      <img src={data.thumbnail} alt="" />
                    </div>
                    <div>
                      <h1>{data?.title}</h1>
                      <p>{data?.description}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>EMPTY PRODUCT </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableAndFilterableList;
