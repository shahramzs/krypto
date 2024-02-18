import React, {useState, useEffect} from "react";
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../Utils/Constants';

export const TransactionsContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.provider.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });
}


export const TransactionProvider = ({children}) => {

    const checkIfWalletIsConnected = async() => {
        if(!ethereum) return alert("Please install metamask");
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log(accounts);
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, []);

    return (
        <TransactionsContext.Provider value={{value:'test'}}>
            {children}
        </TransactionsContext.Provider>
    )
}