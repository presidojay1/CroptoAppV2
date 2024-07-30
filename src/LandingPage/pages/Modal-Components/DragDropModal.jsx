import React, { useState, useContext } from "react";
import "./DragDropModal.css";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CloseIcon, DragHandleIcon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { CryptoContext } from "../CreateContext/CryptoContext";
const ItemType = {
  CHAIN: "chain",
};

const DraggableChain = ({
  isOpen,
  onClose,
  handleTokenSelect,
  chain,
  index,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.CHAIN,
    item: { chain, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div
      onClick={() => {
        handleTokenSelect(chain);
        onClose();
      }}
      ref={drag}
      style={{ opacity }}
      className="DropModalIcon-Body"
    >
      <div style={{ display: "flex" }}>
        <div>
          <img src={chain.image} alt={chain.Name} />
        </div>
        &nbsp;
        <p>{chain.name}</p>
      </div>
      <div className="Hover-Appear">
        <DragHandleIcon w={18} h={18} color="grey" />
      </div>
    </div>
  );
};

const DroppableContainer = ({
  children,
  chains,
  setChains,
  otherChains,
  setOtherChains,
}) => {
  const [isOver, setIsOver] = useState(false);

  const [{ isOverCurrent }, drop] = useDrop({
    accept: ItemType.CHAIN,
    drop: (item) => {
      if (!chains.some((chain) => chain.id === item.chain.id)) {
        setChains((prev) => [...prev, item.chain]);
        setOtherChains((prev) =>
          prev.filter((chain) => chain.id !== item.chain.id)
        );
      }
    },
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver(),
    }),
    hover: (item, monitor) => {
      setIsOver(monitor.isOver());
    },
  });

  return (
    <div ref={drop} className="DropDownModal-IconBox">
      <div className="DropDownIconBody-Width">
        {chains.length === 0 && !isOver && (
          <div className="EmptyMessage">Drag and drop your favourite items</div>
        )}
        {children}
      </div>
    </div>
  );
};

const DragDropModal = ({ isOpen, onClose, handleTokenSelect }) => {
  const { cryptoData } = useContext(CryptoContext);
  const tokens = cryptoData;
  const initialFavoriteChains = [];

  const initialChainList = tokens.map((token) => ({
    id: token.id,
    name: token?.name,
    image: token?.image,
    symbol: token?.symbol,
    current_price: token?.current_price,
  }));

  const [favoriteChains, setFavoriteChains] = useState(initialFavoriteChains);
  const [chainList, setChainList] = useState(initialChainList);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent className="DragDrop-ModalBox">
          <div className="ModalHeader">
            <div className="ModalHeader1">
              <p>Select a Chain</p>
            </div>
            <div className="ModalHeader2">
              <div>
                <CloseIcon onClick={onClose} w={18} h={18} color="white" />
              </div>
            </div>
          </div>

          <DndProvider backend={HTML5Backend}>
            <div className="Favourite-ChainDiv">
              <p>Favourite Chains(s)</p>
              &nbsp;
              <div className="DragDrop-GreyLine"></div>
            </div>
            <DroppableContainer
              chains={favoriteChains}
              setChains={setFavoriteChains}
              otherChains={chainList}
              setOtherChains={setChainList}
            >
              {favoriteChains.map((chain, index) => (
                <DraggableChain
                  isOpen={isOpen}
                  onClose={onClose}
                  handleTokenSelect={handleTokenSelect}
                  key={chain.id}
                  chain={chain}
                  index={index}
                />
              ))}
            </DroppableContainer>

            <div className="Favourite-ChainDiv">
              <p>Chains List</p>
              &nbsp;
              <div className="DragDrop-GreyLine"></div>
            </div>
            <DroppableContainer
              chains={chainList}
              setChains={setChainList}
              otherChains={favoriteChains}
              setOtherChains={setFavoriteChains}
            >
              {chainList.map((chain, index) => (
                <DraggableChain
                  isOpen={isOpen}
                  onClose={onClose}
                  handleTokenSelect={handleTokenSelect}
                  key={chain.id}
                  chain={chain}
                  index={index}
                />
              ))}
            </DroppableContainer>
          </DndProvider>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DragDropModal;
