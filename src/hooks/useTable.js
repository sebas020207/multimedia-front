import { useState, useEffect } from "react";
import useAxios from "./useAxios";

const useTable = ({ endpoint = "", fakeElements = [] }) => {
  const [elements, setElements] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [extraParams, setExtraParams] = useState({});
  const { get } = useAxios();

  useEffect(() => {
    if (fakeElements.length > 0) {
      setElements(fakeElements);
    } else if (endpoint) {
      search();
    }
  }, []);

  useEffect(() => {
    search();
  }, [searchItem, extraParams]);

  const search = async () => {
    const params = {
      ...extraParams,
    };
    if (searchItem.length > 2) {
      params.search_item = searchItem;
    }

    try {
      const response = await get(endpoint, { params });
      if (response.data && Array.isArray(response.data)) {
        setElements(response.data);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onChangeSearchItem = (event) => {
    const value = event.target.value;
    setSearchItem(value);
  };

  const addExtraParams = (extra) =>
    setExtraParams({ ...extraParams, ...extra });

  const reset = () => {
    setSearchItem('');
    setExtraParams({});    
  }

  const removeExtraParam = (key) => {
    const params = {...extraParams};
    delete params[key];
    setExtraParams(params);
  }

  return {
    elements,
    searchItem,
    onChangeSearchItem,
    addExtraParams,
    extraParams,
    reset,
    search,
    removeExtraParam
  };
};

export default useTable;
