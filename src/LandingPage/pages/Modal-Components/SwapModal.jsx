import React, { useState, useContext } from "react";
import "./SwapModal.css";
import {
  InfoOutlineIcon,
  CloseIcon,
  StarIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";

import { CryptoContext } from "../CreateContext/CryptoContext";

const SwapModal = ({ isOpen, onClose, onSelectToken }) => {
  const { cryptoData, getSearchResult, searchData, getCoinData } =
    useContext(CryptoContext);
  const [loading, setLoading] = useState(false); // New state for loading
  const tokens = cryptoData;

  const [searchValue, setSearchValue] = useState("");

  const [starredTokens, setStarredTokens] = useState([]);

  // Function to handle star icon click for a specific token
  const handleStarClick = (token) => {
    if (starredTokens?.includes(token.id)) {
      // Token is already starred, so unstar it
      setStarredTokens(starredTokens?.filter((id) => id !== token.id));
    } else {
      // Token is not starred, so star it
      setStarredTokens([...starredTokens, token.id]);
    }
  };

  const getSearchSelectToken = async (token) => {
    setLoading(true);
    const coinData = await getCoinData(token.id); // Wait for the coin data to be fetched

    if (coinData !== undefined) {
      const searchToken = {
        current_price: coinData.market_data.current_price.usd,
        symbol: coinData.symbol,
        image: coinData.image.small,
      };
      // console.log("searchToken", searchToken);

      // Call onSelectToken only after the data is available
      onSelectToken(searchToken);
      onClose();
    }

    setLoading(false);
  };

  let handleInput = (e) => {
    e.preventDefault();
    const query = e.target.value;
    setSearchValue(query);
    setLoading(true); // Set loading to true when starting search

    getSearchResult(query).finally(() => {
      setLoading(false); // Set loading to false when search is completed
    });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent className="ModalBox">
        <div className="ModalHeader">
          <div className="ModalHeader1">
            <p>Select a Token</p>
            &nbsp;
            <div>
              <InfoOutlineIcon mt="6px" w={18} h={18} color="white" />
            </div>
          </div>
          <div className="ModalHeader2">
            <div>
              <CloseIcon onClick={onClose} w={18} h={18} color="white" />
            </div>
          </div>
        </div>
        <p className="Search-Kyp">
          You can search and select{" "}
          <span style={{ fontWeight: "bold", color: "white" }}>any token</span>{" "}
          on KyberSwap.
        </p>

        <div className="InputSearchDiv">
          <div className="SearchInput-FlexDiv">
            <input
              type="text"
              className="TokenInputSearch text-[12px]"
              placeholder="Search by token, name, or symbol of address"
              value={searchValue}
              onChange={handleInput}
            />
            &nbsp;
            <SearchIcon  w={18} h={18} color="white" className="mt-2 mr-2" />
          </div>
        </div>

        <div className="Modal-IconBox">
          <div className="IconBody-Width">
            {tokens?.slice(0, 8)?.map((token) => (
              <div
                key={token.id}
                className="Icon-Body"
                onClick={() => {
                  onSelectToken(token);
                  onClose();
                }}
              >
                <div>
                  <img src={token?.image}  alt={token?.symbol}/>
                </div>
                &nbsp;
                <p className="uppercase">{token?.symbol}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="All-Imported">
          <div>
            <p style={{ color: "green" }}>All</p>
          </div>

          <div>
            <p>Imported</p>
          </div>
        </div>
        <div className="CryptoList-Body">
          {loading ? (
            <p style={{ color: "white", fontSize: "20px" }}>Loading...</p> // Show loading message while fetching data
          ) : searchValue && searchData?.length > 0 ? (
            searchData?.map((token) => (
              <div key={token.id} className="CryptoList-Flex">
                <div
                  onClick={() => {
                    getSearchSelectToken(token);
                  }}
                  className="CryptoList-FlexB1"
                >
                  <div>
                    <img width="35px" src={token?.thumb} alt={token?.name} />
                  </div>
                  &nbsp;
                  <div>
                    <h5>{token?.name}</h5>
                    <p className="uppercase">{token?.symbol}</p>
                  </div>
                </div>
                <div className="CryptoList-FlexB2">
                  <StarIcon
                    mt="5px"
                    w={20}
                    mr="5px"
                    h={20}
                    onClick={() => handleStarClick(token)}
                    color={
                      starredTokens.includes(token.id) ? "yellow" : "white"
                    }
                  />
                  <InfoOutlineIcon mt="5px" w={20} h={20} color="white" />
                </div>
              </div>
            ))
          ) : searchValue && searchData?.length === 0 ? (
            <p
              style={{ color: "white", fontSize: "20px", fontStyle: "italic" }}
            >
              No tokens found
            </p>
          ) : (
            tokens.map((token) => (
              <div key={token?.id} className="CryptoList-Flex">
                <div
                  onClick={() => {
                    onSelectToken(token);
                    onClose();
                  }}
                  className="CryptoList-FlexB1"
                >
                  <div>
                    <img width="35px" src={token?.image} alt={token?.symbol} />
                  </div>
                  &nbsp;&nbsp;
                  <div>
                    <h5>{token?.name}</h5>
                    <p className="uppercase">{token?.symbol}</p>
                  </div>
                </div>
                <div className="CryptoList-FlexB2">
                  <StarIcon
                    mt="5px"
                    mr="5px"
                    w={20}
                    h={20}
                    onClick={() => handleStarClick(token)}
                    color={
                      starredTokens.includes(token?.id) ? "yellow" : "white"
                    }
                  />
                  <InfoOutlineIcon mt="5px" w={20} h={20} color="white" />
                </div>
              </div>
            ))
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default SwapModal;
