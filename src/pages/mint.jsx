import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useContractWrite, usePrepareContractWrite, useContractRead, useWaitForTransaction } from 'wagmi'
import AddSlot from '../assets/deployment/FactoryToken.json'
import NFTSpl from '../assets/deployment/NFTSplittingME.json'
import './mint.css'
import { useDebounce } from 'use-debounce';

function MintTokenList(data) {
    const { address } = useAccount()

    const { data: name } = useContractRead({
        address: data?.data,
        abi: [{
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },],
        functionName: 'name',
        enabled: Boolean(data?.data)
    })

    const { data: symbol } = useContractRead({
        address: data?.data,
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
        enabled: Boolean(data?.data)
    })

    const { data: quantity } = useContractRead({
        address: data?.data,
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
        enabled: Boolean(data?.data)
    })

    return { name, symbol, quantity }
}

function Minttoken(data) {
    const [quantityToken, setQuantityToken] = useState('')
    const { name, symbol, quantity } = MintTokenList(data)
    const { address } = useAccount()
    const [finalquantityToken] = useDebounce(quantityToken, 800)

    const { config: minttoken } = usePrepareContractWrite({
        address: data.data,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },],
        functionName: 'mint',
        args: [address, finalquantityToken],
        enabled: Boolean(finalquantityToken)
    })

    const { write: mint, isLoading, data: datamint } = useContractWrite(minttoken)
    const { isLoading: mintloading } = useWaitForTransaction({
        hash: datamint?.hash,
    })

    const handleinput = (e) => {
        if (e.target.name === 'quantity') {
            const regex = /^[0-9]+$/;
            if (regex.test(e.target.value)) {
                setQuantityToken(e.target.value)
            }

            if (e.target.value === '') {
                setQuantityToken(e.target.value)
            }
        }
    }

    const showtokencontract = () => {
        navigator.clipboard.writeText(String(data.data))
    }

    return (
        <div className='list_mint_token'>
            <div className='contract' onClick={() => showtokencontract()}>
                <div className='contract-header'>Copy Contract</div>
                <img src="https://cdn-icons-png.flaticon.com/512/566/566295.png" alt="splittingme" />
            </div>
            <div className='name_mint_token'>
                <div>Token Name:</div>
                <div>{name}</div>
            </div>
            <div className='quantity_mint_token_nft'>
                <div> Token Symbol: </div>
                <div>{symbol}</div>
            </div>
            <div className='quantity_mint_token_nft'>
                <div> Token Quantity: </div>
                <div>{String(quantity)}</div>
            </div>
            <div className='quantity_mint_token'>
                <div> Tokens To Mint:</div>
                <input name='quantity' id="mintinput" type="text" value={quantityToken} placeholder='VD:1000' onChange={e => handleinput(e)} />
            </div>
            <button disabled={quantityToken === ''} className='mint_btn' onClick={() => mint?.()}>{(isLoading || mintloading) ? 'Minting..' : 'Mint'}</button>
        </div>
    )
}

const NFTcreate = ({ data }) => {
    const [nameToken, setNameToken] = useState('')
    const [symbolToken, setSymbolToken] = useState('')
    const [finalnameToken] = useDebounce(nameToken, 800)
    const [finalsymbolToken] = useDebounce(symbolToken, 800)


    const { data: approved } = useContractRead({
        address: NFTSpl.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }],
        functionName: 'getApproved',
        args: [data],
        enabled: Boolean(data),
    })

    const { config: createCampaign } = usePrepareContractWrite({
        address: AddSlot.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_symbol",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_NFTID",
                    "type": "uint256"
                }
            ],
            "name": "createNewCampaign",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        functionName: 'createNewCampaign',
        args: [finalnameToken, finalsymbolToken, data],
        enabled: Boolean(finalnameToken && finalsymbolToken)
    })

    const { config: approvenft } = usePrepareContractWrite({
        address: NFTSpl.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        functionName: 'approve',
        args: [AddSlot.address, data],
        enabled: Boolean(data),
    })

    const handleinput = (e) => {
        if (e.target.name === 'tokenname') {
            if ((e.target.value).length <= 15) {
                setNameToken(e.target.value);
            }
        }

        else if (e.target.name === 'tokensymbol') {
            if ((e.target.value).length <= 7) {
                setSymbolToken(e.target.value);
            }
        }
    }

    const { write: create, isLoading, data: createcam } = useContractWrite(createCampaign)

    const { write: approve, data: approvedd, isLoading: approveload } = useContractWrite(approvenft)

    const { isLoading: createloading } = useWaitForTransaction({
        hash: createcam?.hash,
    })

    const { isLoading: approveloading } = useWaitForTransaction({
        hash: approvedd?.hash,
    })

    const handlecreat = () => {
        if (approved === '0x0000000000000000000000000000000000000000') {
            approve?.()
        }
        else {
            create?.()
        }
    }

    return (
        <>
            <div className='list_mint_token'>
                <img src="https://lp-cms-production.imgix.net/image_browser/Ho%20Chi%20Minh%20City%20skyline.jpg?auto=format&w=1440&h=810&fit=crop&q=75" alt="splittingme" />

                <div className='name_mint_token'>
                    <div>NFT id:</div>
                    <div>{data}</div>
                </div>
                <div className='quantity_mint_token_nft'>
                    <div> Token Name: </div>
                    <input name='tokenname' id="mintinput" type="text" value={nameToken} placeholder={'VD:Binance'} onChange={e => handleinput(e)} />
                </div>
                <div className='quantity_mint_token'>
                    <div> Token Symbol:</div>
                    <input name='tokensymbol' id="mintinput" type="text" value={symbolToken} placeholder='VD:BNB' onChange={e => handleinput(e)} />
                </div>
                <button className='mint_btn' onClick={() => handlecreat()}>{(isLoading || createloading) ? 'Creating..' : (approveloading || approveload) ? 'Approving' : 'Create'}</button>
            </div>
        </>
    )

}

const Mint = () => {
    const [mode, setMode] = useState('NFT')
    const [addAdress, setAddAdress] = useState(null)
    const [findAdress, setFindAdress] = useState(null)
    const { address } = useAccount()

    const { config: addSlot } = usePrepareContractWrite({
        address: AddSlot.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "addSlotMintNFT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        functionName: 'addSlotMintNFT',
        args: [addAdress],
        enabled: Boolean(addAdress)
    })

    const { config: mintNFT } = usePrepareContractWrite({
        address: AddSlot.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_tokenURI",
                    "type": "string"
                }
            ],
            "name": "mintNFT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        functionName: 'mintNFT',
        args: ['nullish'],
    })

    const { data: SlotCheck } = useContractRead({
        address: AddSlot.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "slotMintNFT",
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
        functionName: 'slotMintNFT',
        args: [findAdress],
        enabled: Boolean[findAdress]
    })

    const { data: Slot } = useContractRead({
        address: AddSlot.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "slotMintNFT",
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
        functionName: 'slotMintNFT',
        args: [address],
        enabled: Boolean[address]
    })

    const { data: NFTList } = useContractRead({
        address: NFTSpl.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "getAllNFT",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }],
        functionName: 'getAllNFT',
        args: [address],
        enabled: Boolean[address]
    })

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

    const { isLoading, isSuccess, write: addslot } = useContractWrite(addSlot)
    const { isLoading: isLoading3, isSuccess: isSuccess3, write: mintnft } = useContractWrite(mintNFT)

    const handleChangeMode = (mode) => {
        setMode(mode)
    }

    const handleAddAddress = () => {
        if (addAdress) {
            addslot?.()
        }
    }
    return (

        <div className='mint_container' >
            <div className='NFTswicthToken'>
                <button onClick={() => handleChangeMode('NFT')} className={mode === 'NFT' ? 'active_switch' : ''}>Mint NFT</button>
                <button onClick={() => handleChangeMode('Token')} className={mode === 'Token' ? 'active_switch' : ''}>Mint Token</button>
                {address === '0x96998C9ce6b5f179829E9CFE2d4B1505E43d7F1e' && <button onClick={() => handleChangeMode('Admin')} className={mode === 'Admin' ? 'active_switch' : ''}>Admin</button>}
            </div>

            {
                mode === 'NFT' &&
                <div className='mint_nft'>
                    <i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i><i class="rain"></i>
                    <img src='https://cdn.dribbble.com/users/260537/screenshots/3981198/dribbble_animation.gif' alt='Splittingme' />
                    <button disabled={String(Slot) === '0'} onClick={() => mintnft?.()}> {isLoading3 ? 'Pending' : String(Slot) === '0' ? 'No Slot Left' : 'Mint'}</button>
                    <div> {isSuccess3 ? "Success" : ''}</div>
                </div>
            }

            {
                mode === 'Token' && <div className='mint_token'>
                    <div className='mint_token header'>Token Mint List</div>
                    {
                        NFTList?.map((data) => (
                            String(data) !== '0' && <NFTcreate key={String(data)} data={String(data)} />
                        ))
                    }
                    {
                        TokenList?.map((data) => (
                            String(data) !== '0' && <Minttoken key={String(data)} data={data} />
                        ))
                    }
                </div>
            }

            {
                mode === 'Admin' &&
                <div className='mint_nft'>
                    <label className='.header'>Add Address to Mint</label>
                    <input type="text" name="addAdress" value={addAdress} onChange={e => setAddAdress(e.target.value)} />
                    <label className='.header'>Status: {isSuccess ? "Add Success" : ""}</label>
                    <button onClick={() => handleAddAddress()}>{isLoading ? 'Pending...' : 'Add Address'}</button>

                    <label className='.header'>Check Address to Mint</label>
                    <input type="text" name="addAdress" value={findAdress} onChange={e => setFindAdress(e.target.value)} />
                    <label className='.header'>Status: {SlotCheck ? `${String(SlotCheck)} mint times` : ""}</label>
                </div>
            }
        </div >
    )
}

export default Mint