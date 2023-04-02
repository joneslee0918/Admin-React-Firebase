import { useCallback, useEffect, useState } from "react";
import {
  query,
  orderByChild,
  onValue,
  startAfter,
  endBefore,
  startAt,
  endAt,  
  equalTo,
  limitToFirst,
  limitToLast,
} from "firebase/database";
import { clientRef } from "../firebase";

const useClients = () => {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [cursor, setCursor] = useState(0);
  const [direction, setDirection] = useState(0);
  const [searchName, setSearchName] = useState(null);
  const [sortBy, setSortBy] = useState("m_nClientCode");
  const [sortOrder, setSortOrder] = useState(0);
 
  useEffect(() => {
    setLoading(true);
    let selector = null;
    if (searchName) {
      selector = query(
        clientRef,
        orderByChild("m_strClientName"),
        startAt(searchName),
        endAt(searchName +"\uf8ff")
      );
    } else if (sortOrder === 0) {
      if(direction === 0)
        selector = query(
          clientRef,
          orderByChild(sortBy),
          startAfter(cursor),
          limitToFirst(10)
        );
      else if (direction === 1)
        selector = query(
          clientRef,
          orderByChild(sortBy),
          endBefore(cursor),
          limitToFirst(10)
        );
      else if (direction === 2)
        selector = query(
          clientRef,
          orderByChild(sortBy),
          startAt(0),
          limitToFirst(10)
        );
    } else if (sortOrder === 1) {
       if (direction === 0)
          selector = query(
            clientRef,
            orderByChild(sortBy),
            startAfter(cursor),
            limitToLast(10)
          );
      else if (direction === 1)
        selector = query(
          clientRef,
          orderByChild(sortBy),
          endBefore(cursor),
          limitToLast(10)
        );
      else if (direction === 2)
        selector = query(
          clientRef,
          orderByChild(sortBy),
          startAt(0),
          limitToLast(10)
        );
    }
    return onValue(selector, (snapshot) => {
      if (snapshot.exists()) {
        const items = snapshot.val();
        const clients = Object.keys(items).map((i) => items[i]);
        setClients(clients);
        
      } else {
        setClients([]);
      }
      setLoading(false);
    });
  }, [cursor, searchName, sortBy, sortOrder]);
  const gotoFirst = useCallback(() => {
    if (clients && clients.length > 0) {
      prevPage();
    }
  }, [clients, sortBy, pageIndex]);
  const gotoLast = useCallback((index) => {
    if (clients && clients.length > 0) {
      // const latCode = index ;
      // // setDirection(3);
      // setPageIndex(index + 1 );
      nextPage();
    }
  }, [clients, sortBy, pageIndex]);
  const nextPage = useCallback(() => {
    if (clients && clients.length > 0) {
      const latCode = clients[clients.length - 1][sortBy];
      setDirection(0);
      setCursor(latCode);
      setPageIndex(pageIndex + 1);
    }
  }, [clients, sortBy, pageIndex]);
  const prevPage = useCallback(() => {
    if (clients && clients.length > 0) {
      const latCode = clients[0][sortBy];
      setDirection(1);
      setCursor(latCode);
      setPageIndex(pageIndex - 1);
    }
  }, [clients, sortBy, pageIndex]);

  const updateSorting = useCallback(
    (_sortBy) => {
      if (_sortBy == "m_nOrb") return;
      setCursor(0);
      console.log("soi1", sortBy);
      console.log("sortOrder====",sortOrder);

      if (sortBy !== _sortBy) {
        setSortBy(_sortBy);
        setSortOrder(0);
      } else if (sortOrder === 0) {
        setSortOrder(1);
      } else if (sortOrder === 1) {
        setSortBy("m_nClientCode");
        setSortOrder(0);
      }
    },
    [sortBy, sortOrder]
  );
  
  const setRefresh = useCallback(() => {
      setSearchName("");
      setDirection(2);
      setCursor(clients[0][sortBy]);    
      setSortBy("m_nClientCode");
      setSortOrder(0)
      setPageIndex(0);
    }, [clients, sortBy, pageIndex]);

  return {
    loading,
    clients,
    pageIndex,
    nextPage,
    prevPage,
    gotoFirst,
    gotoLast,
    setSearchName,
    setRefresh,
    sortBy,
    sortOrder,
    updateSorting,
  };
};

export default useClients;
