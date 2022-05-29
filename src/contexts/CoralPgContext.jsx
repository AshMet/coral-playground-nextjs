/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ethers } from "ethers";
import { createContext, useState, useEffect } from "react";
import { useMoralis, useMoralisQuery, useMoralisWeb3Api } from "react-moralis";

import {
  coralOctoAbi,
  coralUserNftAbi,
  coralPlaygroundMarketAbi,
  coralOctoAddress,
  coralUserNftAddress,
  coralPlaygroundMarketAddress,
} from "../lib/constants/constants";

export const CoralPgContext = createContext();

export const CoralPgProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formattedAccount, setFormattedAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [ethBalance, setEthBalance] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [amountDue, setAmountDue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [etherscanLink, setEtherscanLink] = useState("");
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [assets, setAssets] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [ownedItems, setOwnedItems] = useState([]);

  const {
    authenticate,
    isAuthenticated,
    enableWeb3,
    Moralis,
    user,
    isWeb3Enabled,
  } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const {
    data: userData,
    error: userDataError,
    isLoading: userDataIsLoading,
  } = useMoralisQuery("_User");

  const {
    data: assetsData,
    error: assetsDataError,
    isLoading: assetsDataIsLoading,
  } = useMoralisQuery("DivePhoto");

  useEffect(async () => {
    console.log(assetsData);
    await enableWeb3();
    await getAssets();
    // await getOwnedAssets();
  }, [userData, assetsData, assetsDataIsLoading, userDataIsLoading]);

  useEffect(async () => {
    if (!isWeb3Enabled) {
      await enableWeb3();
    }
    await listenToUpdates();

    if (isAuthenticated) {
      // await getBalance();
      await getEthBalance();
      const currentUsername = await user?.get("nickname");
      setUsername(currentUsername);
      const account = await user?.get("ethAddress");
      setCurrentAccount(account);
      const formatAccount = `${account.slice(0, 5)}...${account.slice(-5)}`;
      setFormattedAccount(formatAccount);
    } else {
      setCurrentAccount("");
      setFormattedAccount("");
      // setBalance("");
      setEthBalance("");
    }
  }, [
    isWeb3Enabled,
    isAuthenticated,
    ethBalance,
    setEthBalance,
    authenticate,
    currentAccount,
    setUsername,
    user,
    username,
  ]);

  const connectWallet = async () => {
    await enableWeb3();
    await authenticate();
  };

  const buyTokens = async () => {
    if (!isAuthenticated) {
      await connectWallet();
    }

    const amount = ethers.BigNumber.from(tokenAmount);
    const price = ethers.BigNumber.from("100000000000000");
    const calcPrice = amount.mul(price);

    console.log(coralOctoAddress);

    const options = {
      contractAddress: coralOctoAddress,
      functionName: "mint",
      abi: coralOctoAbi,
      msgValue: calcPrice,
      params: {
        amount,
      },
    };
    const transaction = await Moralis.executeFunction(options);
    const receipt = await transaction.wait();
    setIsLoading(false);
    console.log(receipt);
    setEtherscanLink(
      `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
    );
  };

  const handleSetUsername = () => {
    if (user) {
      if (nickname) {
        user.set("nickname", nickname);
        user.save();
        setNickname("");
      } else {
        console.log("Can't set empty nickname");
      }
    } else {
      console.log("No user");
    }
  };

  // const getBalance = async () => {
  //   try {
  //     if (!isAuthenticated || !currentAccount) return;
  //     const options = {
  //       contractAddress: coralOctoAddress,
  //       functionName: "balanceOf",
  //       abi: coralOctoAbi,
  //       params: {
  //         account: currentAccount,
  //       },
  //     };

  //     if (isWeb3Enabled) {
  //       const response = await Moralis.executeFunction(options);
  //       console.log(response.toString());
  //       setBalance(response.toString());
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getEthBalance = async () => {
    try {
      if (!isAuthenticated || !currentAccount) return;
      const options = {
        chain: "mumbai",
        address: user?.get("ethAddress"),
      };

      if (isWeb3Enabled) {
        const response = await Web3Api.account.getNativeBalance(options);
        console.log(response.toString());
        if (response?.balance) {
          const ethBalanceValue = Web3Api.Moralis.Units.FromWei(
            response.balance
          );
          setEthBalance(ethBalanceValue);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyAsset = async (price, asset) => {
    try {
      if (!isAuthenticated) return;
      console.log("price: ", price);
      console.log("asset: ", asset.name);
      console.log(userData);

      const options = {
        type: "erc20",
        amount: price,
        receiver: coralOctoAddress,
        contractAddress: coralOctoAddress,
      };

      const transaction = await Moralis.transfer(options);
      const receipt = await transaction.wait();

      if (receipt) {
        // You can do this but it's not necessary with Moralis hooks!
        // const query = new Moralis.Query('_User')
        // const results = await query.find()

        const res = userData[0].add("ownedAsset", {
          ...asset,
          purchaseDate: Date.now(),
          etherscanLink: `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`,
        });

        await res.save().then(() => {
          alert("You've successfully purchased this asset!");
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAssets = async () => {
    try {
      await enableWeb3();
      // const query = new Moralis.Query("DivePhoto");
      // const results = await query.find();
      setAssets(assetsData);
    } catch (error) {
      console.log(error);
    }
  };

  const listenToUpdates = async () => {
    const query = new Moralis.Query("EthTransactions");
    const subscription = await query.subscribe();
    subscription.on("update", async (object) => {
      console.log("New Transactions");
      console.log(object);
      setRecentTransactions([object]);
    });
  };

  const getOwnedAssets = async () => {
    try {
      // const query = new Moralis.Query("_User");
      // const results = await query.find();

      if (userData[0]) {
        setOwnedItems((prevItems) => [
          ...prevItems,
          userData[0].attributes.ownedAsset,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CoralPgContext.Provider
      value={{
        formattedAccount,
        isAuthenticated,
        buyTokens,
        // getBalance,
        getEthBalance,
        // balance,
        ethBalance,
        setTokenAmount,
        tokenAmount,
        amountDue,
        setAmountDue,
        isLoading,
        setIsLoading,
        setEtherscanLink,
        etherscanLink,
        buyAsset,
        currentAccount,
        nickname,
        setNickname,
        username,
        setUsername,
        handleSetUsername,
        assets,
        recentTransactions,
        ownedItems,
      }}
    >
      {children}
    </CoralPgContext.Provider>
  );
};
