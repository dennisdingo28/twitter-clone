"use client"

import { Search } from "lucide-react";
import SearchUserResults from "./SearchUserResults";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import axios from "axios";
import qs from "query-string";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRef } from "react";

const SearchUserInput = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [userKeyword, setUserKeyword] = useState<string>("");
  const [data, setData] = useState<Array<User>>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    async function getRelatedResults() {
      const queryUrl = qs.stringifyUrl({
        url: "/api/user",
        query: {
          usernameIncluded: userKeyword,
        },
      });
      if (userKeyword.trim() !== "") {
        try {
          setDataLoading(true);
          const relatedUsers = await axios.get(queryUrl);
          setDataLoading(false);
          setData(relatedUsers.data.users);
          setShow(true);
        } catch (err) {
          toast.error((err as Error).message);
          setDataLoading(false);
          setShow(false);
        }
      } else {
        setData([]);
      }
    }
    setTimeout(() => {
      getRelatedResults();
    }, 1000);
  }, [userKeyword]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        event.target &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center gap-2">
        <div className="flex flex-row-reverse gap-5 items-center focus-within:bg-black focus-within:border-lightBlue border border-[#202327] bg-[#202327] px-3 py-2 rounded-full">
          <input
            value={userKeyword}
            onChange={(e) => setUserKeyword(e.target.value)}
            className="bg-transparent outline-none searchInput peer placeholder:text-[#6c7175] text-[.9em] w-full"
            placeholder="Search Twitter"
          />
          <Search
            size={27}
            className="text-[#71767b] peer-focus:text-lightBlue"
          />
        </div>
        <Loader2
          size={19}
          className={`${dataLoading ? "opacity-100 z-10 animate-spin" : "opacity-0 -z-10"
            } duration-150`}
        />
      </div>
      <SearchUserResults
        data={data}
        className={`absolute left-0 -bottom-[2.9rem] w-full rounded-md bg-black shadow-[0px_0px_5px_rgba(255,255,255,.5)] ${(data && data.length > 0) ? "h-[220px] -bottom-[11rem] overflow-y-scroll" : ""
          } ${!show ? "opacity-0 -z-10" : "opacity-100 z-0"
          } duration-200`}
      />
    </div>
  );
};

export default SearchUserInput;
