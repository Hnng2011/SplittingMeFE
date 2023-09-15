import React, { useState, useEffect } from 'react'
import './mlm.css'
import { usePrepareContractWrite, useContractWrite, useAccount, useContractRead, useWaitForTransaction, useSignMessage } from 'wagmi'
import axios from 'axios';
import TokenSaleAdd from '../../assets/deployment/TokenSale.json'
import USDTAdd from '../../assets/deployment/USDT.json'
import lv1 from '../../assets/images/icon/level1.png'
import lv2 from '../../assets/images/icon/level2.png'
import lv3 from '../../assets/images/icon/level3.png'
import lv4 from '../../assets/images/icon/level4.png'
import tok1 from '../../assets/images/icon/token1.png'
import tok2 from '../../assets/images/icon/token2.png'
import tok3 from '../../assets/images/icon/token3.png'
import tok4 from '../../assets/images/icon/token4.png'
import tag1 from '../../assets/images/icon/tag1.png'
import tag2 from '../../assets/images/icon/tag2.png'
import tag3 from '../../assets/images/icon/tag3.png'
import tag4 from '../../assets/images/icon/tag4.png'
import value1 from '../../assets/images/icon/value1.png'
import value2 from '../../assets/images/icon/value2.png'
import value3 from '../../assets/images/icon/value3.png'
import value4 from '../../assets/images/icon/value4.png'
import { formatEther, parseEther } from 'viem'
import { useLocation } from 'react-router-dom'
import { ethers } from "ethers";
const { ethereum } = window


const getnonce = async (msg, getMsg, address) => {
    const headers = {
        'ngrok-skip-browser-warning': '69240',
    };

    axios.get(`https://55e3-2405-4802-900b-5590-5b0e-b02a-d1b7-599.ngrok-free.app/referral?user_address=${address}`, {
        headers: headers,
    })
        .then((response) => {
            getMsg({ ...msg, ...response.data })
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

const sign = async (message, setMsghash) => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const sig = await signer.signMessage(String(message));
    setMsghash(sig)
}

function sign_ref_server(user_address, referral_address, signature, nonce) {
    var formdata = new FormData();
    formdata.append("user_address", user_address);
    formdata.append("referral_address", referral_address);
    formdata.append("signature", signature);
    formdata.append("nonce", nonce);

    var requestOptions = {
        method: 'PUT',
        body: formdata,
        redirect: 'follow',
        headers: {
            'ngrok-skip-browser-warning': '449'
        }
    };

    fetch("https://55e3-2405-4802-900b-5590-5b0e-b02a-d1b7-599.ngrok-free.app/referral", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


const Mlm = () => {
    const { address, isConnected } = useAccount()
    const [msg, getMsg] = useState({})
    const [msghash, setMsghash] = useState('')
    const [price, setPrice] = useState('')
    const [priceList, setPriceList] = useState([])
    const location = useLocation()

    const copy = () => {
        navigator.clipboard.writeText(window.location.href.split('?')[0] + `?user_address=${address}`)
    }

    const { data: slot } = useContractRead({
        address: TokenSaleAdd.address,
        abi: [{
            "inputs": [],
            "name": "checkSlotBasic",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },],
        functionName: 'checkSlotBasic',
        watch: true,
    });
    const { data: price1 } = useContractRead({
        address: TokenSaleAdd.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_packageName",
                    "type": "uint256"
                }
            ],
            "name": "getPrice",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }],
        functionName: 'getPrice',
        args: ['0'],
        select: (data) => formatEther(data)
    })
    const { data: price2 } = useContractRead({
        address: TokenSaleAdd.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_packageName",
                    "type": "uint256"
                }
            ],
            "name": "getPrice",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }],
        functionName: 'getPrice',
        args: ['1'],
        select: (data) => formatEther(data)
    })
    const { data: price3 } = useContractRead({
        address: TokenSaleAdd.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_packageName",
                    "type": "uint256"
                }
            ],
            "name": "getPrice",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }],
        functionName: 'getPrice',
        args: ['2'],
        select: (data) => formatEther(data)
    })
    const { data: price4 } = useContractRead({
        address: TokenSaleAdd.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_packageName",
                    "type": "uint256"
                }
            ],
            "name": "getPrice",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }],
        functionName: 'getPrice',
        args: ['3'],
        select: (data) => formatEther(data)
    })
    const { data: allowance } = useContractRead({
        address: USDTAdd.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }],
        functionName: "allowance",
        args: [address, TokenSaleAdd.address],
        enabled: Boolean(address) && Number(price),
        watch: true,
        select: (data) => formatEther(data)
    })
    const { config: buyPackage } = usePrepareContractWrite({
        address: TokenSaleAdd.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_packageName",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_usdtSend",
                    "type": "uint256"
                }
            ],
            "name": "buyPackage",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        functionName: "buyPackage",
        args: [priceList?.indexOf(price), parseEther((price) || '0')],
        enabled: Boolean(Number(allowance) >= Number(price)),
    })
    const { config: usdtApprove } = usePrepareContractWrite({
        address: USDTAdd.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        functionName: "approve",
        args: [TokenSaleAdd.address, parseEther((price) || '0')],
        enabled: Boolean(price),
    })

    const { data: buypack, write: buypackage, isLoading } = useContractWrite(buyPackage)
    const { data: usdtapprove, write: approve, isLoading: Approving } = useContractWrite(usdtApprove)
    const { isLoading: buyloading, isSuccess: buysucces } = useWaitForTransaction({
        hash: buypack?.hash,
    })
    const { isLoading: approveloading, isSuccess: approvesucces } = useWaitForTransaction({
        hash: usdtapprove?.hash,
    })

    const buy = (id) => {
        if (Number(priceList[id]) === Number(price)) {
            if (Number(allowance) < Number(price)) {
                approve?.()
            }
            else {
                const referalValue = new URLSearchParams(location.search).get("user_address");

                if (referalValue && (referalValue !== address) && address) {
                    getnonce(msg, getMsg, address)
                }
                else {
                    buypackage?.()
                }
            }
        }
        else {
            setPrice(priceList?.[id]);
        }
    }

    useEffect(() => {
        setPriceList([price1, price2, price3, price4])
    }, [price1, price2, price3, price4])

    useEffect(() => {
        if (Boolean(msg?.data)) {
            sign(msg?.data?.message, setMsghash)
        }
    }, [msg])

    useEffect(() => {
        if (msghash) {
            buypackage?.()
        }
    }, [msghash])

    useEffect(() => {
        if (msghash && buysucces) {
            // const apiUrl = 'https://c767-125-235-238-29.ngrok-free.app/point/referral';
            // const referal = new URLSearchParams(location.search).get("user_address");
            // const data = {
            //     user_address: String(address),
            //     referral_address: String(referal),
            //     signature: String(msghash),
            //     nonce: String(msg?.data?.nonce),
            // };
            // const headers = {
            //     'Content-Type': 'application/json',
            //     'Accept:': 'application/json',
            // };
            // axios.put(apiUrl, data, { headers })
            //     .then(response => {
            //         console.log('Yêu cầu PUT thành công:', response.data);
            //     })
            //     .catch(error => {
            //         console.error('Lỗi trong quá trình PUT:', error);
            //     });

            const referal = new URLSearchParams(location.search).get("user_address")
            sign_ref_server(String(address), String(referal), String(msghash), String(msg?.data?.nonce))
        }

    }, [buyloading])

    useEffect(() => {
        if (Number(allowance) < Number(price)) {
            approve?.()
        }
        else {
            const referalValue = new URLSearchParams(location.search).get("user_address");

            if (referalValue && (referalValue !== address) && address) {
                getnonce(msg, getMsg, address)
            }

            else {
                buypackage?.()
            }
        }
    }, [price])

    const statusstyle = {
        width: `calc(${Number(slot) * 50 / 10000}% + 1%)` /*100%*/
    }

    return (
        <div className="mlm-container">
            <div className="mlm">
                <div className='outer'>
                    <div className="mlm-bg">S</div>
                    <div className="mlm-content">
                        <div className='mlm-head'>Bronze</div>
                        <div className='mlm-price'>1000$</div>
                        <div className='mlm-details'>
                            <div><img src={lv2} /> Level : <span>2</span></div>
                            <div><img src={tok2} />Tokens : <span>100.100 Tokens</span></div>
                            <div><img src={tag2} />Price : <span>$0.00999/Token</span></div>
                            <div><img src={value2} />Cap : <span> $99.9M</span></div>
                        </div>
                        <div className='mlm-buy'>
                            <button disabled={!isConnected || (approveloading && !approvesucces) || Approving || isLoading || (buyloading && !buysucces)} onClick={() => buy(1)}> {(isLoading || (buyloading && !buysucces)) ? 'Buying...' : ((approveloading && !approvesucces) || Approving) ? 'Approving' : 'Buy Now'}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mlm">
                <div className='outer'>
                    <div className="mlm-bg">S</div>
                    <div className="mlm-content">
                        <div className='mlm-head'>Silver</div>
                        <div className='mlm-price'>2000$</div>
                        <div className='mlm-details'>
                            <div><img src={lv3} /> Level : <span>3</span></div>
                            <div><img src={tok3} /> Tokens : <span>200.400 Tokens</span></div>
                            <div><img src={tag3} />Price : <span>$0.00998/Token</span></div>
                            <div><img src={value3} />Cap : <span> $99.8M</span></div>
                        </div>
                        <div className='mlm-buy'>
                            <button disabled={!isConnected || (approveloading && !approvesucces) || Approving || isLoading || (buyloading && !buysucces)} onClick={() => buy(2)}> {(isLoading || (buyloading && !buysucces)) ? 'Buying...' : ((approveloading && !approvesucces) || Approving) ? 'Approving' : 'Buy Now'}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mlm">
                <div className='outer'>
                    <div className="mlm-bg">S</div>
                    <div className="mlm-content">
                        <div className='mlm-head'>Gold</div>
                        <div className='mlm-price'>4500$</div>
                        <div className='mlm-details'>
                            <div><img src={lv4} /> Level : <span>4</span></div>
                            <div> <img src={tok4} /> Tokens : <span>452.261 Tokens</span></div>
                            <div><img src={tag4} />Price : <span>$0.00995/Token</span></div>
                            <div><img src={value4} />Cap : <span> $99.5M</span></div>
                        </div>
                        <div className='mlm-buy'>
                            <button disabled={!isConnected || (approveloading && !approvesucces) || Approving || isLoading || (buyloading && !buysucces)} onClick={() => buy(3)}> {(isLoading || (buyloading && !buysucces)) ? 'Buying...' : ((approveloading && !approvesucces) || Approving) ? 'Approving' : 'Buy Now'}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mlm">
                <div className='outer'>
                    <div className="mlm-bg">S</div>
                    <div className="mlm-content">
                        <div className='hot'>Hot
                        </div>
                        <div className='mlm-head'>Basic</div>
                        <div className='mlm-price'>
                            100%
                            <div id='statusbar'>10$ for 10000 User <div className='status' style={statusstyle}></div><div>{String(slot)} User Buy</div></div>
                        </div>
                        <div className='mlm-details'>
                            <div><img src={lv1} />Level : <span>1</span></div>
                            <div><img src={tok1} /> Tokens : <span>100.100 Tokens</span></div>
                            <div><img src={tag1} />Price : <span>$0.00999/Token</span></div>
                            <div><img src={value1} />Cap : <span> $100M</span></div>
                        </div>
                        <div className='mlm-buy'>
                            <button disabled={!isConnected || (approveloading && !approvesucces) || Approving || isLoading || (buyloading && !buysucces)} onClick={() => buy(0)}> {(isLoading || (buyloading && !buysucces)) ? 'Buying...' : ((approveloading && !approvesucces) || Approving) ? 'Approving...' : 'Buy Now'}</button>
                        </div>
                    </div>
                </div>
            </div>

            {address && <div className='getreflink' onClick={() => copy()}>Get Referal Link</div>}
        </div>
    )
}

export default Mlm