import { useState, useCallback } from "react";
import { query, orderByChild, equalTo, onValue } from "firebase/database";
import { clientRef } from "../firebase";

const useClients = () => {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);

  const findByName = useCallback((name) => {
    const selector = query(
      clientRef,
      orderByChild("m_strClientName"),
      equalTo(name)
    );
    setLoading(true);
    return onValue(selector, (snapshot) => {
      if (snapshot.exists()) {
        const clients = snapshot.val();
        setClients(clients);
      }
      setLoading(false);
    });
  }, []);

  return { loading, clients, findByName };
};

export default useClients;
