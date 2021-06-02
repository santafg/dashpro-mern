import React, { useEffect, useState } from "react";
import axios from "axios";

const Datalist = () => {
  const [userList, setuserList] = useState([]);
  const [searchList, setsearchList] = useState([]);
  const [search, setsearch] = useState({
    end_year: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    country: "",
  });
  const [loading, setloading] = useState(true);

  const inputEvent = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setsearch({ ...search, [name]: value });
  };

  const getList = async () => {
    try {
      const res = await axios.get("/get");
      setuserList(res.data);
      setsearchList(res.data);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  const searcEvent = () => {
    if (search.end_year !== "") {
      const newList = userList.filter((list) => {
        return list.end_year.toLowerCase().indexOf(search.end_year) > -1;
      });
      setsearchList(newList);
    } else {
      setsearchList(userList);
    }
  };
  const searcEvent1 = () => {
    if (search.topic !== "") {
      const newList = userList.filter((list) => {
        return list.topic.toLowerCase().indexOf(search.topic) > -1;
      });
      setsearchList(newList);
    } else {
      setsearchList(userList);
    }
  };
  const searcEvent2 = () => {
    if (search.sector !== "") {
      const newList = userList.filter((list) => {
        return list.sector.toLowerCase().indexOf(search.sector) > -1;
      });
      setsearchList(newList);
    } else {
      setsearchList(userList);
    }
  };

  const searcEvent3 = () => {
    if (search.region !== "") {
      const newList = userList.filter((list) => {
        return list.region.toLowerCase().indexOf(search.region) > -1;
      });
      setsearchList(newList);
    } else {
      setsearchList(userList);
    }
  };
  const searcEvent4 = () => {
    if (search.pestle !== "") {
      const newList = userList.filter((list) => {
        return list.pestle.toLowerCase().indexOf(search.pestle) > -1;
      });
      setsearchList(newList);
    } else {
      setsearchList(userList);
    }
  };
  const searcEvent5 = () => {
    if (search.source !== "") {
      const newList = userList.filter((list) => {
        return list.source.toLowerCase().indexOf(search.source) > -1;
      });
      setsearchList(newList);
    } else {
      setsearchList(userList);
    }
  };
  const searcEvent6 = () => {
    if (search.country !== "") {
      const newList = userList.filter((list) => {
        return list.country.toLowerCase().indexOf(search.country) > -1;
      });
      setsearchList(newList);
    } else {
      setsearchList(userList);
    }
  };
  useEffect(() => {
    searcEvent();
  }, [search.end_year]);
  useEffect(() => {
    searcEvent1();
  }, [search.topic]);
  useEffect(() => {
    searcEvent2();
  }, [search.sector]);
  useEffect(() => {
    searcEvent3();
  }, [search.region]);
  useEffect(() => {
    searcEvent4();
  }, [search.pestle]);
  useEffect(() => {
    searcEvent5();
  }, [search.source]);
  useEffect(() => {
    searcEvent6();
  }, [search.country]);
  return (
    <>
      <div className="tableContainer">
        <h1 className="h1">Data Table</h1>
        <div className="inputsDiv">
          <input
            onChange={inputEvent}
            value={search.end_year}
            name="end_year"
            placeholder="search by end year..."
            type="text"
          />
          <input
            onChange={inputEvent}
            value={search.topic}
            name="topic"
            placeholder="search by topic..."
            type="text"
          />
          <input
            onChange={inputEvent}
            value={search.sector}
            name="sector"
            placeholder="search by sector..."
            type="text"
          />
          <input
            onChange={inputEvent}
            value={search.region}
            name="region"
            placeholder="search by region..."
            type="text"
          />
          <input
            onChange={inputEvent}
            value={search.pestle}
            name="pestle"
            placeholder="search by pestle..."
            type="text"
          />
          <input
            onChange={inputEvent}
            value={search.source}
            name="source"
            placeholder="search by source..."
            type="text"
          />
          <input
            onChange={inputEvent}
            value={search.country}
            name="country"
            placeholder="search by country..."
            type="text"
          />
        </div>
        <div id="resuts">
          <h1>{searchList.length} Results found !</h1>
        </div>
        <table>
          <tr className="heading">
            <th style={{ width: "12%" }}>End year</th>
            <th style={{ width: "12%" }}>Topics</th>
            <th style={{ width: "12%" }}>Sector</th>
            <th style={{ width: "11.8%" }}>Region</th>
            <th style={{ width: "12%" }}>Pestle</th>
            <th style={{ width: "15.1%" }}>Source</th>
            <th style={{ width: "9%" }}>Country</th>
          </tr>
        </table>
        {loading ? (
          <div id="loading">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="tableBox">
            <table className="theTable">
              {searchList && searchList.length > 0
                ? searchList.map((user, i) => {
                    return (
                      <tr key={i}>
                        <td>{user.end_year}</td>
                        <td>{user.topic}</td>
                        <td>{user.sector}</td>
                        <td>{user.region}</td>
                        <td>{user.pestle}</td>
                        <td>{user.source}</td>
                        <td>{user.country}</td>
                      </tr>
                    );
                  })
                : (
                  <h1>No data matched...</h1>
                )}
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Datalist;
