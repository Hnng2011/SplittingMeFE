import React, { useState, useEffect } from 'react'
import './mlm.css'
import { usePrepareContractWrite, useContractWrite, useAccount, useContractRead, useWaitForTransaction } from 'wagmi'
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

const Mlm = () => {
    const { address, isConnected } = useAccount()
    const [packages, setPackages] = useState('')
    const [buying, setBuying] = useState(false)

    const copy = () => {
        navigator.clipboard.writeText(window.location.href.split('?')[0] + `?referal=${address}`)
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

    const { data: price } = useContractRead({
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
        args: [packages],
        enabled: (buying),
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
        enabled: Boolean(address),
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
        args: [packages, parseEther((price) || '0')],
        enabled: Boolean(buying),
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
        enabled: Boolean(buying),
    })

    const { data: buypack, write: buypackage, isLoading, isError } = useContractWrite(buyPackage)
    const { data: usdtapprove, write: approve, isLoading: Approving, isError: isError2 } = useContractWrite(usdtApprove)
    const { isLoading: buyloading, isSuccess: buysucces } = useWaitForTransaction({
        hash: buypack?.hash,
    })
    const { isLoading: approveloading, isSuccess: approvesucces } = useWaitForTransaction({
        hash: usdtapprove?.hash,
    })

    const buy = (id) => {
        setPackages(id);
        setBuying(true);
    }

    useEffect(() => {
        if ((Number(allowance) < Number(price)) && buying) {
            approve?.()
        }
        else {
            if (buying) {
                buypackage?.()
            }

        }

    }, [buying])

    useEffect(() => {
        if (approvesucces) {
            buypackage?.()
        }
    }, [approvesucces])

    useEffect(() => {
        if (buysucces || isError || isError2) {
            setBuying(false)
        }
    }, [buysucces, isError, isError2])

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
                            <button disabled={!isConnected || approveloading || Approving || isLoading} onClick={() => buy(1)}> {(isLoading || buyloading) ? 'Buying...' : (approveloading || Approving) ? 'Approving' : 'Buy Now'}</button>
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
                            <button disabled={!isConnected || approveloading || Approving || isLoading} onClick={() => buy(2)}> {(isLoading || buyloading) ? 'Buying...' : (approveloading || Approving) ? 'Approving' : 'Buy Now'}</button>
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
                            <button disabled={!isConnected || approveloading || Approving || isLoading} onClick={() => buy(3)}> {(isLoading || buyloading) ? 'Buying...' : (approveloading || Approving) ? 'Approving' : 'Buy Now'}</button>
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
                            <button disabled={!isConnected || approveloading || Approving || isLoading} onClick={() => buy(0)}> {(isLoading || buyloading) ? 'Buying...' : (approveloading || Approving) ? 'Approving...' : 'Buy Now'}</button>
                        </div>
                    </div>
                </div>
            </div>

            {address && <div className='getreflink' onClick={() => copy()}>Get Referal Link</div>}
        </div>
    )
}

export default Mlm