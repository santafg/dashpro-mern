import React, { useEffect, useState } from "react";
import axios from "axios";

import Inten from "./vizs/Inten";
import Likelihood from "./vizs/Likelihood";
import Topic from "./vizs/Topic";
import Relevance from "./vizs/Relevance";
import Country from "./vizs/Country";
import Region from "./vizs/Region";
import Startyear from "./vizs/Startyear";
import Endyear from "./vizs/Endyear";
const Visulization = () => {
  const [userList, setuserList] = useState([]);
  const [loading, setloading] = useState(true);

  const getList = async () => {
    try {
      const res = await axios.get("/get");
      setuserList(res.data);
      setloading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div className="vizContainer">
        <div className="vizHead">
          <h1>Charts</h1>
        </div>
        {loading ? (
          <div id="loading">
            <div className="loader"></div>
          </div>
        ) : (
        <div className="vizscrol">
        <div className="vizBox">
          <div className="firstCol">
            <Likelihood list={userList} />
            <Relevance list={userList} />
            <Topic list={userList} />
          </div>
          <div className="secondCol">
            <div className="upperSection">
              <Inten list={userList} />
              <Startyear list={userList} />
              <Endyear list={userList} />
            </div>
            <div className="lowerSection">
              <Region list={userList} />
              <Country list={userList} />
            </div>
          </div>
        </div>
        </div>
        )}
      </div>
    </>
  );
};

export default Visulization;
