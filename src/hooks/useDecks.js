import { useEffect, useMemo, useState } from "react";
import { query, orderByChild, onValue, equalTo } from "firebase/database";
import { deckRef } from "../firebase";

const useDecks = (deckIdList) => {
  const [loading, setLoading] = useState(false);
  const [decks, setDecks] = useState({});

  useEffect(() => {
    if (!deckIdList || !deckIdList.length) {
      return;
    }
    setLoading(true);
    const unsubscribes = deckIdList.map((deckId) => {
      let selector = query(
        deckRef,
        orderByChild("m_nDeckCode"),
        equalTo(deckId)
      );
      return onValue(selector, (snapshot) => {
        let deck = {};
        if (snapshot.exists()) {
          const values = snapshot.val();
          const items = Object.keys(values).map((i) => values[i]);
          if (items.length > 0) {
            console.log("decks", deckId, items);
            deck = items[0];
          }
        }
        setDecks((decks) => ({ ...decks, [deckId]: deck }));
        setLoading(false);
      });
    });
    return () => unsubscribes.map((i) => i());
  }, [deckIdList]);

  const cardCount = useMemo(() => {
    return Object.values(decks).reduce(
      (prev, deck) => prev + (deck.m_lstCardCode?.length || 0),
      0
    );
  }, [decks]);

  return {
    loading,
    decks,
    cardCount,
  };
};

export default useDecks;
