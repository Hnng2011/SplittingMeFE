import React, { useState, useEffect } from 'react'
import './mlm.css'
import { usePrepareContractWrite, useContractWrite, useAccount, useContractRead } from 'wagmi'
import TokenSale from '../../assets/artifacts/contracts/TokenSale.sol/TokenSale.json'
import TokenSaleAdd from '../../assets/deployment/TokenSale.json'
import USDTAdd from '../../assets/deployment/USDT.json'
import USDT from '../../assets/artifacts/contracts/USDT.sol/USDT.json'

const Mlm = () => {
    const { address, isConnected } = useAccount()
    const [packages, setPackages] = useState(null)
    const [buying, setBuying] = useState(0)

    const price = useContractRead({
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
    });


    const slot = useContractRead({
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
    });


    const allowance = useContractRead({
        address: USDTAdd.USDTAddress,
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
    })

    const { config } = usePrepareContractWrite({
        address: TokenSaleAdd.address,
        abi: [TokenSale.abi[2]],
        functionName: "buyPackage",
        args: [packages, price.data],
    })

    const { config: usdtApprove } = usePrepareContractWrite({
        address: USDTAdd.USDTAddress,
        abi: [USDT.abi[4]],
        functionName: "approve",
        args: [TokenSaleAdd.address, Number(price.data)],
    })

    const { isLoading, write } = useContractWrite(config)
    const { write: approve, isLoading: Approving } = useContractWrite(usdtApprove)

    const buy = (id) => {
        setPackages(id);
        setBuying(buying + 1);
    }

    useEffect(() => {
        if ((allowance.data < price.data) && price.data)
            approve();
        else {
            write?.();
        }
        console.log(allowance.data)
        console.log(buying)
    }, [buying])


    const statusstyle = {
        width: `calc(${Number(slot.data) * 50 / 10000}% + 1%)` /*100%*/
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
                            <div>Level : <span>2</span></div>
                            <div>Tokens : <span>100.100 Tokens</span></div>
                            <div>Price : <span>$0.00999/Token</span></div>
                            <div>Cap : <span> $99.9M</span></div>
                        </div>
                        <div className='mlm-buy'>
                            <button disabled={!isConnected && !write} onClick={() => buy(1)}> {isLoading ? 'Buying...' : Approving ? 'Approving' : 'Buy Now'}</button>
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
                            <div>Level : <span>3</span></div>
                            <div>Tokens : <span>200.400 Tokens</span></div>
                            <div>Price : <span>$0.00998/Token</span></div>
                            <div>Cap : <span> $99.8M</span></div>
                        </div>
                        <div className='mlm-buy'>
                            <button disabled={!isConnected && !write} onClick={() => buy(2)}> {isLoading ? 'Buying...' : Approving ? 'Approving' : 'Buy Now'}</button>
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
                            <div>Level : <span>4</span></div>
                            <div>Tokens : <span>452.261 Tokens</span></div>
                            <div>Price : <span>$0.00995/Token</span></div>
                            <div>Cap : <span> $99.5M</span></div>
                        </div>
                        <div className='mlm-buy'>
                            <button disabled={!isConnected && !write} onClick={() => buy(3)}> {isLoading ? 'Buying...' : Approving ? 'Approving' : 'Buy Now'}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mlm">
                <div className='outer'>
                    <div className="mlm-bg">S</div>
                    <div className="mlm-content">
                        <div className='mlm-head'>Platinum</div>
                        <div className='mlm-price'>10000$</div>
                        <div className='mlm-details'>
                            <div>Level : <span>5</span></div>
                            <div>Tokens : <span>1,010,101 Tokens</span></div>
                            <div>Price : <span>$0.0099/Token</span></div>
                            <div>Cap : <span> $99M</span></div>
                        </div>
                        <div className='mlm-buy'>
                            <button disabled={!isConnected && !write} onClick={() => buy(4)}> {isLoading ? 'Buying...' : Approving ? 'Approving' : 'Buy Now'}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mlm">
                <div className='outer'>
                    <div className="mlm-bg">S</div>
                    <div className="mlm-content">
                        <div className='mlm-head'>Basic</div>
                        <div className='mlm-price'>100$
                            <div>10$ for 10000 User <div className='status' style={statusstyle}></div><div>{(slot.data).toString()} User Buy</div></div>
                        </div>
                        <div className='mlm-details'>
                            <div>Level : <span>1</span></div>
                            <div>Tokens : <span>100.100 Tokens</span></div>
                            <div>Price : <span>$0.00999/Token</span></div>
                            <div>Cap : <span> $100M</span></div>
                        </div>
                        <div className='mlm-buy'>
                            <button disabled={!isConnected && !write} onClick={() => buy(0)}> {isLoading ? 'Buying...' : Approving ? 'Approving' : 'Buy Now'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mlm