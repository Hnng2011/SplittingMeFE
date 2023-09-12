import React from 'react';
import './style.css';

function Pool({ datas }) {
    return (
        <div className='grid-container'>

            {datas.map((data, idx) => (
                <div key={idx} className='grid-items'>
                    <div className='grid-item'>
                        <img className="imaging" src={data.url} alt={data.name} />
                        <div className='name'>{data.name}</div>
                    </div>
                    <div className='grid-item'>
                        <div className='title'>Total Stake : </div>
                        <div className='total'>{data.Total} NFTs</div>
                    </div>
                    <div className='grid-item'>
                        <div className='title'>APR : </div>
                        <div className='apr'>{data.APR} %</div>
                    </div>
                    <div className='grid-item'>
                        <div className='title'>Day Stake : </div>
                        <div className='period'>{data.Period} days</div>
                    </div>

                    <div className='grid-item'>
                        <div className='title'>Your Reward : </div>
                        <div className='period'>{data.earn} SPM</div>
                    </div>
                    <div className='grid-item'>
                        <button className='stake'>Stake</button>
                        <button className='harvest'>Harvest</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Pool;
