import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useContractWrite, usePrepareContractWrite, useContractRead } from 'wagmi'
import AddSlot from '../assets/deployment/FactoryToken.json'
import AddSlotAbi from '../assets/artifacts/contracts/FactoryToken.sol/FactoryToken.json'
import checkNFTAbi from '../assets/artifacts/contracts/NFT.sol/NFTSplittingME.json'
import checkNFT from '../assets/deployment/NFTSplittingME.json'
import TokenAbi from '../assets/artifacts/contracts/CampaignTypesTokenERC20.sol/CampaignTypesTokenERC20.json'
import './mint.css'


const TokenMint = ({ data }) => {
    const { address } = useAccount()
    const [nameToken, setNameToken] = useState("")
    const [symbolToken, setSymbolToken] = useState("")
    const [quantityToken, setQuantityToken] = useState('')


    const { data: nftused } = useContractRead({
        address: AddSlot.address,
        abi: [AddSlotAbi.abi[7]],
        functionName: 'campaignsByID',
        args: [data]
    })

    const { data: name } = useContractRead({
        address: nftused?.[1],
        abi: [TokenAbi.abi[13]],
        functionName: 'name',
    })

    const { data: symbol } = useContractRead({
        address: nftused?.[1],
        abi: [TokenAbi.abi[16]],
        functionName: 'symbol',
    })

    const { config } = usePrepareContractWrite({
        address: AddSlot.address,
        abi: [AddSlotAbi.abi[9]],
        functionName: 'createNewCampaign',
        args: [nameToken, symbolToken, data]
    })

    const { config: minttoken } = usePrepareContractWrite({
        address: nftused?.[1],
        abi: [TokenAbi.abi[12]],
        functionName: 'mint',
        args: [address, quantityToken]
    })


    const handlequant = (e) => {
        const regex = /^[0-9]+$/;
        if (regex.test(e.target.value)) {
            setQuantityToken(e.target.value)
        }

        if (e.target.value === '') {
            setQuantityToken(e.target.value)
        }
    }

    const { write, isLoading: isLoading } = useContractWrite(config)
    const { write: mint, isLoading: isLoading2 } = useContractWrite(minttoken)

    return (
        <div className='list_mint_token'>
            {
                (String(nftused?.[2])) !== data && <>
                    <img src="https://lp-cms-production.imgix.net/image_browser/Ho%20Chi%20Minh%20City%20skyline.jpg?auto=format&w=1440&h=810&fit=crop&q=75" alt="splittingme" />
                    <div className='name_mint_token'>
                        <div>NFT id:</div>
                        <div>{data}</div>
                    </div>
                    <div className='quantity_mint_token_nft'>
                        <div> Token Name: </div>
                        <input id="mintinput" type="text" value={nameToken} placeholder={'VD:Binance'} onChange={e => setNameToken(e.target.value)} />
                    </div>
                    <div className='quantity_mint_token'>
                        <div> Token Symbol:</div>
                        <input id="mintinput" type="text" value={symbolToken} placeholder='VD:BNB' onChange={e => setSymbolToken(e.target.value)} />
                    </div>
                    <button className='mint_btn' onClick={() => write?.()}>{isLoading ? 'Creating..' : 'Create'}</button>
                </>
            }

            {
                (String(nftused?.[2])) === data && (String(nftused?.[2])) !== '0' && <>
                    <img src="https://cdn-icons-png.flaticon.com/512/566/566295.png" alt="splittingme" />
                    <div className='name_mint_token'>
                        <div>Token Name:</div>
                        <div>{name}</div>
                    </div>
                    <div className='quantity_mint_token_nft'>
                        <div> Token Symbol: </div>
                        <div>{symbol}</div>
                    </div>
                    <div className='quantity_mint_token'>
                        <div> Token Quantity:</div>
                        <input id="mintinput" type="text" value={quantityToken} placeholder='VD:100BNB' onChange={e => handlequant(e)} />
                    </div>
                    <button disabled={quantityToken === ''} className='mint_btn' onClick={() => mint?.()}>{isLoading2 ? 'Minting..' : 'Mint'}</button>
                </>
            }
        </div >
    )
}

const Mint = () => {
    const [mode, setMode] = useState('NFT')
    const [addAdress, setAddAdress] = useState("")
    const [findAdress, setFindAdress] = useState("")
    const { address } = useAccount()

    const { config: addSlot } = usePrepareContractWrite({
        address: AddSlot.address,
        abi: [AddSlotAbi.abi[4]],
        functionName: 'addSlotMintNFT',
        args: [addAdress],
    })

    const { config: mintNFT } = usePrepareContractWrite({
        address: AddSlot.address,
        abi: [AddSlotAbi.abi[12]],
        functionName: 'mintNFT',
        args: ['https://lh3.googleusercontent.com/-Hdb99Sdv6V0/WE6NERQq7hI/AAAAAAAASBM/4pWAd08vrzMz4cJd5tmXvNXro8-v6HrUwCLcB/s0/lay-link-goole-photo_001.png'],
    })

    const { data: data } = useContractRead({
        address: AddSlot.address,
        abi: [AddSlotAbi.abi[15]],
        functionName: 'slotMintNFT',
        args: [findAdress],
    })

    const { data: data3 } = useContractRead({
        address: AddSlot.address,
        abi: [AddSlotAbi.abi[15]],
        functionName: 'slotMintNFT',
        args: [address],
    })

    const { data: data2 } = useContractRead({
        address: checkNFT.address,
        abi: [checkNFTAbi.abi[11]],
        functionName: 'getAllNFT',
        args: [address],
    })

    const { isLoading: isLoading, isSuccess: isSuccess, write: write } = useContractWrite(addSlot)
    const { isLoading: isLoading3, isSuccess: isSuccess3, write: write3 } = useContractWrite(mintNFT)

    const handleMintNFT = () => {
        write3?.()
    }

    const handleChangeMode = (mode) => {
        setMode(mode)
    }

    const handleAddAddress = () => {
        if (addAdress) {
            write?.()
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
                    <img src='https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1280x720.png' alt='Splittingme' />
                    <button disabled={String(data3) === '0'} onClick={() => handleMintNFT()}> {isLoading3 ? 'Pending' : String(data3) === '0' ? 'No Slot Left' : 'Mint'}</button>
                    <div> {isSuccess3 ? "Success" : ''}</div>
                </div>
            }

            {
                mode === 'Token' && <div className='mint_token'>
                    <div className='mint_token header'>Token Mint List</div>
                    {
                        data2?.map((data) => (
                            <TokenMint key={String(data)} data={data.toString()} />
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
                    <label className='.header'>Status: {data ? `${String(data)} mint times` : ""}</label>

                </div>
            }
        </div >
    )
}

export default Mint