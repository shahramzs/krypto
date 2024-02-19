import React, {useState, useEffect} from "react";
import { contractABI, contractAddress } from '../Utils/Constants';
import { ethers } from "ethers";


export const TransactionsContext = React.createContext();

const { ethereum } = window;

// ethers 5.7.2 web3 4.2.1
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });

    return transactionContract
}


// ethers 6.11.1
const getEthereumContract2 = async() => {
    let signer2 = null;
    let provider2;
    let transactionContract2;

    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults")
        provider2 = ethers.getDefaultProvider()
    } else {
        provider2 = new ethers.BrowserProvider(window.ethereum)
        signer2 = await provider2.getSigner();
        transactionContract2 = new ethers.Contract(contractAddress,contractABI, signer2)
    }

    console.log({
        provider2,
        signer2,
        transactionContract2
    });
}


export const TransactionProvider = ({children}) => {

    const [currentAccount, setCurrenttAccount] = useState('');
    const [formData, setFormData ] = useState({addressTo: '', amount: '', keyword: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e,name) => {
        setFormData((prevState) => ({...prevState, [name]:e.target.value}))
    }

    const checkIfWalletIsConnected = async() => {

        try{
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if(accounts.length){
                setCurrenttAccount(accounts[0])
    
                // getAllTransactions();
            }else{
                console.log("No Accounts Found.")
            }

        }catch(e){
            console.error(e);
            throw new Error("No Ethereum Objects Found.")
        }

       
    }

    const connectWallet = async() => {
        try{
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrenttAccount(accounts[0])
        }catch(e){
            console.error(e);
            throw new Error("No Ethereum Objects Found.")
        }
    }


    const sendTransaction = async () => {
        try{
            if(!ethereum) return alert("Please install metamask");

            //get the data from the form.....
            const {addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 GWEI
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true)
            console.log(`Loading - ${transactionHash.hash}`)
            await transactionHash.wait();
            setIsLoading(false)
            console.log(`Success - ${transactionHash.hash}`)

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());

        }catch(e){
            console.error(e);
            throw new Error("No Ethereum Objects Found.")
        }

    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, []);

    return (
        <TransactionsContext.Provider value={{connectWallet, currentAccount, formData, handleChange, sendTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}