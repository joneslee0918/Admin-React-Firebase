import { CopyIcon } from "@chakra-ui/icons";
import { CartIcon } from "components/icons/Icons";
import useDecks from "hooks/useDecks";

const Deck = ({ deckInfo }) => {
  const { cardCount } = useDecks(deckInfo);

  return (
    <div>
      <div>
        <CopyIcon mt={-1} mr={1} />
        <span>{deckInfo?.length || 0}</span>
      </div>
      <div>
        <CartIcon mt={-1} mr={1} />
        <span>{cardCount}</span>
      </div>
    </div>
  );
};

export default Deck;
