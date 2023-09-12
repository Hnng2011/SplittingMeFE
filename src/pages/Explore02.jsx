import React from 'react';
import PageTitle from '../components/pagetitle/PageTitle';
import HotPick from '../components/hotpick/HotPick';
import { useAccount } from 'wagmi';


function Explore02() {
    const { address } = useAccount()

    return (
        <div className='page-explore'>
            <PageTitle title='Marketplace' />
            <HotPick data={null} />
        </div>
    );
}

export default Explore02;