import React from 'react';
import PageTitle from '../components/pagetitle/PageTitle';
import HotPick from '../components/hotpick/HotPick';
import { useContractRead } from 'wagmi';
import Market from '../assets/deployment/MarketPlace.json'


function Explore02() {
    const { data: nftlitts } = useContractRead({
        address: Market.address,
        abi: [{
            "inputs": [],
            "name": "getNFTs",
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
        functionName: 'getNFTs',
        watch: true,
        enabled: true,
    })


    return (
        <div className='page-explore'>
            <PageTitle title='Marketplace' />
            <HotPick data={nftlitts} />
        </div>
    );
}

export default Explore02;