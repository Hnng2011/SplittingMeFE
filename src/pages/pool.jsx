import React from 'react'
import PageTitle from '../components/pagetitle/PageTitle';
import PoolList from '../components/pool/pool';
import { useState } from 'react';
import { useContractRead, useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import AddSlot from '../assets/deployment/FactoryToken.json'
import FactoryPool from '../assets/deployment/FactoryPool.json'
import USDT from '../assets/deployment/USDT.json'
import { useDebounce } from 'use-debounce';

const datas = [
    { id: 0, name: 'vNFT', APR: 5.56, Total: 118, Period: 30, url: 'https://w7.pngwing.com/pngs/997/942/png-transparent-bnb-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment-icon.png', earn: 0 },
    { id: 0, name: 'vNFT', APR: 5.56, Total: 118, Period: 30, url: 'https://w7.pngwing.com/pngs/997/942/png-transparent-bnb-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment-icon.png', earn: 0 },
    { id: 1, name: 'vNFT', APR: 5.56, Total: 118, Period: 30, url: 'https://w7.pngwing.com/pngs/997/942/png-transparent-bnb-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment-icon.png', earn: 0 }]


function MintTokenList(data) {
    const { address } = useAccount()

    const { data: symbol } = useContractRead({
        address: data,
        abi: [{
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }],
        functionName: 'symbol',
        enabled: Boolean(data)
    })

    const { data: quantity } = useContractRead({
        address: data,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
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
        functionName: 'balanceOf',
        args: [address],
        enabled: Boolean(data)
    })

    return { symbol, quantity }
}

function Minttoken({ data }) {
    const { symbol, quantity } = MintTokenList(data)
    return (
        <>
            <option value={data}>
                {symbol} - Quantity: {String(quantity)}
            </option>
        </>
    )
}

const Pool = () => {
    const [active, setActive] = useState(false)
    const [fee, setFee] = useState('')
    const [ratio, setRatio] = useState('')
    const [token, setToken] = useState('')
    const { address } = useAccount()
    const [valuefee] = useDebounce(fee, 800);
    const [valueratio] = useDebounce(ratio, 800);


    const { data: TokenList } = useContractRead({
        address: AddSlot.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "getAllCampaignsByOwner",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }],
        functionName: 'getAllCampaignsByOwner',
        args: [address],
        enabled: Boolean[address]
    })

    const { config: createNewCampaign } = usePrepareContractWrite({
        address: FactoryPool.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_token0",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_token1",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_swapFee",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_ratio",
                    "type": "uint256"
                }
            ],
            "name": "createNewCampaign",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        functionName: 'createNewCampaign',
        args: [USDT.address, token, valuefee, valueratio],
        enabled: Boolean(token && valuefee && valueratio)
    })

    const { write: createnewcampaign, isLoading: loadingcreatenewcampaign } = useContractWrite(createNewCampaign)

    const handlecreate = () => {
        createnewcampaign?.()
    }

    return (
        <div className='page-explore'>
            <PageTitle title='Pool' />

            {
                active && <>
                    <div className='poolcreatelist'>
                        <h1 onClick={() => setActive(!active)}>Close</h1>
                        <div className='inputpoolcreatelist'>
                            <label>Choose Token</label>
                            <br />
                            <select value={token} onChange={(e) => setToken(e.target.value)}>
                                {
                                    TokenList?.map((data) => (
                                        String(data) !== '0' && <Minttoken key={String(data)} data={data} setToken={setToken} />
                                    ))
                                }
                            </select>
                        </div>
                        <div className='inputpoolcreatelist'>
                            <label>Fee</label>
                            <br />
                            <input value={fee} placeholder={0.3} onChange={(e) => setFee(e.target.value)}></input>
                        </div>
                        <div className='inputpoolcreatelist'>
                            <label>Ratio</label>
                            <br />
                            <input value={ratio} placeholder={3} onChange={(e) => setRatio(e.target.value)}></input>
                        </div>
                        <div className='buttonCreate' onClick={() => handlecreate()}>{loadingcreatenewcampaign ? 'Creating' : 'Create'}</div>
                    </div>
                </>
            }

            <section className={`tf-baner-live-auction style-2 ${active ? 'active' : ''}`}>
                <div className="tf-container pd32">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="banner-liver-auction-wrap">
                                <div className="content">
                                    <div className="heading">
                                        <h2 className="title">Take some NFT to stake</h2>
                                    </div>

                                    <p className="sub-heading">High APR, low risk.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={() => setActive(!active)} className='createpool'><span>+</span> Create Pool</button>
                <PoolList datas={datas} />
            </section>
        </div>
    )
}

export default Pool