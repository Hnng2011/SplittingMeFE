import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useContractWrite, usePrepareContractWrite, useContractRead, useWaitForTransaction } from 'wagmi'
import AddSlot from '../assets/deployment/FactoryToken.json'
import AddSlotAbi from '../assets/artifacts/contracts/FactoryToken.sol/FactoryToken.json'
import checkNFTAbi from '../assets/artifacts/contracts/NFT.sol/NFTSplittingME.json'
import checkNFT from '../assets/deployment/NFTSplittingME.json'
import TokenAbi from '../assets/artifacts/contracts/CampaignTypesTokenERC20.sol/CampaignTypesTokenERC20.json'
import './mint.css'
import { useEffect } from 'react';


function MintTokenList(data) {
    const { address } = useAccount()

    const { data: nftused } = useContractRead({
        address: AddSlot.address,
        abi: [AddSlotAbi.abi[7]],
        functionName: 'campaignsByID',
        args: [data],
        enabled: Boolean[data]
    })

    const { data: name } = useContractRead({
        address: nftused?.[1],
        abi: [TokenAbi.abi[13]],
        functionName: 'name',
        enabled: Boolean[nftused?.[1] && String(nftused?.[2]) !== '0']
    })

    const { data: symbol } = useContractRead({
        address: nftused?.[1],
        abi: [TokenAbi.abi[16]],
        functionName: 'symbol',
        enabled: Boolean[nftused?.[1] && String(nftused?.[2]) !== '0']
    })

    const { data: quantity } = useContractRead({
        address: nftused?.[1],
        abi: [TokenAbi.abi[6]],
        functionName: 'balanceOf',
        args: [address],
        enabled: Boolean[nftused?.[1] && String(nftused?.[2]) !== '0']
    })

    return { nftused, name, symbol, quantity }
}

const TokenMint = ({ data }) => {
    const { address } = useAccount()
    const [nameToken, setNameToken] = useState("")
    const [symbolToken, setSymbolToken] = useState("")
    const [quantityToken, setQuantityToken] = useState('')
    const [reload, setReload] = useState(false)

    const { nftused, name, symbol, quantity } = MintTokenList(data)

    const { config: createCampaign } = usePrepareContractWrite({
        address: AddSlot.address,
        abi: [AddSlotAbi.abi[9]],
        functionName: 'createNewCampaign',
        args: [nameToken, symbolToken, data],
        enabled: false,
    })

    const { config: minttoken } = usePrepareContractWrite({
        address: nftused?.[1],
        abi: [TokenAbi.abi[12]],
        functionName: 'mint',
        args: [address, quantityToken],
        enabled: false,
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

        else if (e.target.name === 'tokenname') {
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

    const showtokencontract = () => {
        navigator.clipboard.writeText(String(nftused?.[1]))
    }

    const { write: create, isLoading, data: createcam } = useContractWrite(createCampaign)
    const { write: mint, isLoading: isLoading2, data: minttok } = useContractWrite(minttoken)

    const { isLoading: mintloading, isSuccess: mintsucces } = useWaitForTransaction({
        hash: minttok?.hash,
    })
    const { isLoading: createloading, isSuccess: createsucces } = useWaitForTransaction({
        hash: createcam?.hash,
    })

    useEffect(() => {
        setReload(!reload)
    }, [mintsucces, createsucces])

    return (
        <>
            {

                (String(nftused?.[2])) !== data &&
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
                    <button className='mint_btn' onClick={() => create?.()}>{(isLoading || createloading) ? 'Creating..' : 'Create'}</button>
                </div>
            }

            {
                (String(nftused?.[2])) === data && (String(nftused?.[2])) !== '0' &&
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
                    <button disabled={quantityToken === ''} className='mint_btn' onClick={() => mint?.()}>{(isLoading2 || mintloading) ? 'Minting..' : 'Mint'}</button>
                </div>
            }
        </>
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
        args: ['nullish'],
    })

    const { data: SlotCheck } = useContractRead({
        address: AddSlot.address,
        abi: [AddSlotAbi.abi[15]],
        functionName: 'slotMintNFT',
        args: [findAdress],
        enabled: Boolean[findAdress]
    })

    const { data: Slot } = useContractRead({
        address: AddSlot.address,
        abi: [AddSlotAbi.abi[15]],
        functionName: 'slotMintNFT',
        args: [address],
        enabled: Boolean[address]
    })

    const { data: NFTList } = useContractRead({
        address: checkNFT.address,
        abi: [checkNFTAbi.abi[11]],
        functionName: 'getAllNFT',
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
                            String(data) != '0' && <TokenMint key={String(data)} data={data.toString()} />
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