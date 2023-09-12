import './swap.css'
import usdc from '../../assets/images/icon/usdc.svg'
import arrow from '../../assets/images/icon/211688_forward_arrow_icon.svg'
import { useState, useRef } from 'react'
import { useContractRead, useAccount } from 'wagmi'
import AddSlot from '../../assets/deployment/FactoryToken.json'
import AddSlotAbi from '../../assets/artifacts/contracts/FactoryToken.sol/FactoryToken.json'
import checkNFTAbi from '../../assets/artifacts/contracts/NFT.sol/NFTSplittingME.json'
import checkNFT from '../../assets/deployment/NFTSplittingME.json'
import TokenAbi from '../../assets/artifacts/contracts/CampaignTypesTokenERC20.sol/CampaignTypesTokenERC20.json'


function Token({ data, address, setBalance, setSymbol, handleAddActiveClass }) {
    const setData = () => {
        setBalance(String(quantity))
        setSymbol(symbol)
        handleAddActiveClass()
    }

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

    return (
        <div onClick={() => setData()} className='tokenlist'>
            <div>Symbol: {symbol}</div>
            <div>Name: {name}</div>
        </div>
    )


}


function TokenList({ address, handleAddActiveClass, setBalance, setSymbol, setActive }) {
    const { data: NFTList } = useContractRead({
        address: checkNFT.address,
        abi: [checkNFTAbi.abi[11]],
        functionName: 'getAllNFT',
        args: [address],
        enabled: Boolean[address]
    })


    return (
        <>
            {
                NFTList?.map((data, index) => (
                    String(data) !== '0' && <div key={index} >
                        <Token data={data} address={address} setBalance={setBalance} setSymbol={setSymbol} handleAddActiveClass={handleAddActiveClass} />
                    </div>
                ))
            }
        </>
    )
}


const Swap = () => {
    const { address } = useAccount()
    const [quantity, setQuantity] = useState('')
    const [balance, setBalance] = useState('')
    const [symbol, setSymbol] = useState('')
    const elementRef = useRef(null);
    const handleAddActiveClass = () => {
        elementRef.current.classList.toggle('active');
    };

    return (
        <div className='swapcontainer'>
            <div class="wrapper">
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
            </div>

            <div className='swap' >
                {
                    <div className='tokencontainer' ref={elementRef}>
                        <TokenList address={address} setBalance={setBalance} setSymbol={setSymbol} handleAddActiveClass={handleAddActiveClass} />
                    </div>
                }
                <div className='input'>
                    <label>Tokens Pay</label>
                    <div className='inputcontent'>
                        <input placeholder='0' value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                        <div id='choosetoken' onClick={() => handleAddActiveClass()}>
                            <img src={usdc} alt='usdc' />
                            <h2>{symbol}</h2>
                            <img className="arrow" src={arrow} alt="down2" />
                        </div>
                    </div>
                    <h3>Balance: {balance} {symbol}</h3>
                </div>
                <div className='input'>
                    <label>You reveive</label>
                    <div className='inputcontent'>
                        <input placeholder='0' disabled></input>
                        <div>
                            <img src={usdc} alt='usdc' />
                            <h2>USDC</h2>
                        </div>
                    </div>

                    <h3>Balance:</h3>
                </div>
                <button>Swap</button>
            </div>
        </div>
    )
}

export default Swap