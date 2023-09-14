import React, { useState } from 'react';
import './style.css';
import { useContractRead, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import FactoryPool from '../../assets/deployment/FactoryPool.json'
import USDT from '../../assets/deployment/USDT.json'
import { useEffect } from 'react';
import { parseEther, formatEther } from 'viem';

function Poolitem({ data, address }) {
    const { data: Pooltoken } = useContractRead({
        address: FactoryPool.address,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "campaigns",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "campaignAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "token0",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "token1",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }],
        args: [data],
        functionName: 'campaigns',
        enabled: Boolean(data)
    })
    const { data: tokenname } = useContractRead({
        address: Pooltoken?.[3],
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
        enabled: Boolean(Pooltoken)
    })
    const { data: tokenbalance } = useContractRead({
        address: Pooltoken?.[3],
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
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
        select: (data) => formatEther(data),
        watch: true,
        enabled: Boolean(Pooltoken)
    })
    const { data: usdtbalance } = useContractRead({
        address: USDT.address,
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
        select: (data) => formatEther(data),
        watch: true,
        enabled: Boolean(Pooltoken),
    })
    const { data: usdttotal } = useContractRead({
        address: data,
        abi: [{
            "inputs": [],
            "name": "poolusdtToken",
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
        functionName: "poolusdtToken",
        enabled: Boolean(data),
        select: (data) => formatEther(data),
        watch: true,
    })
    const { data: tokentotal } = useContractRead({
        address: data,
        abi: [{
            "inputs": [],
            "name": "poolToken1",
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
        functionName: "poolToken1",
        enabled: Boolean(data),
        watch: true,
    })
    const { data: allowancetoken } = useContractRead({
        address: Pooltoken?.[3],
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
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
        args: [address, data],
        enabled: Boolean(address),
        watch: true,
        select: (data) => formatEther(data)
    })
    const { data: allowanceusdt } = useContractRead({
        address: USDT.address,
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
        args: [address, data],
        enabled: Boolean(address),
        watch: true,
        select: (data) => formatEther(data)
    })
    const { data: ballanceyouadd } = useContractRead({
        address: data,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balancesAddPool",
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
        functionName: "balancesAddPool",
        args: [address],
        enabled: Boolean(address),
        watch: true,
        select: (data) => formatEther(data)
    })

    const { config: TokenApprove } = usePrepareContractWrite({
        address: Pooltoken?.[3],
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
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
        args: [data, parseEther(String((tokenbalance || '0')))],
        enabled: Boolean(Number(allowancetoken) < 100),
    })

    const { config: usdtApprove } = usePrepareContractWrite({
        address: USDT.address,
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
        args: [data, parseEther(String((usdtbalance || '0')))],
        enabled: Boolean(Number(allowanceusdt) < 100),
    })

    const { data: tokenapprove, write: approvetoken, isLoading: loadapprovetoken } = useContractWrite(TokenApprove)
    const { data: usdtapprove, write: approveusdt, isLoading: loadapproveusdt } = useContractWrite(usdtApprove)
    const { isLoading: LoadingTokenApprove, isSuccess: SuccesTokenApprove } = useWaitForTransaction({
        enabled: Boolean(address),
        hash: tokenapprove?.hash,
    })
    const { isLoading: LoadingUSDTApprove, isSuccess: SuccesUSDTApprove } = useWaitForTransaction({
        enabled: Boolean(address),
        hash: usdtapprove?.hash,
    })

    const { config: AddPool } = usePrepareContractWrite({
        address: data,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_token1",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "addPoolToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        functionName: "addPoolToken",
        args: [Pooltoken?.[3], parseEther('100')],
    })
    const { config: FramPool } = usePrepareContractWrite({
        address: data,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_tokenUSDT",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "FramPool",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        functionName: "FramPool",
        args: [USDT.address, parseEther(('100'))],
    })
    const { config: WithDraw } = usePrepareContractWrite({
        address: data,
        abi: [{
            "inputs": [],
            "name": "withdrawPool",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        functionName: "withdrawPool",
        enabled: false,
    })

    const { data: addpool, write: add, isLoading: loadadd } = useContractWrite(AddPool)
    const { data: frampool, write: fram, isLoading: loadfram } = useContractWrite(FramPool)
    const { data: withdraw, write: draw, isLoading: loaddraw } = useContractWrite(WithDraw)

    const { isLoading: AddPoolLoading } = useWaitForTransaction({
        enabled: Boolean(address),
        hash: addpool?.hash,
    })
    const { isLoading: FramPoolLoading } = useWaitForTransaction({
        enabled: Boolean(address),
        hash: frampool?.hash,
    })
    const { isLoading: withdrawLoading } = useWaitForTransaction({
        enabled: Boolean(address),
        hash: withdraw?.hash,
    })

    const handle = (e) => {
        if (e === 'add') {
            if (Number(allowancetoken) < 100) {
                approvetoken?.()
            }
            else {
                add?.()
            }
        }
        else {
            if (Number(allowanceusdt) < 100) {
                approveusdt?.()
            }

            else {
                fram?.()
            }
        }
    }

    useEffect(() => {
        if (SuccesTokenApprove) {
            add?.()
        }

        else if (SuccesUSDTApprove) {
            fram?.()
        }
    }, [SuccesTokenApprove, SuccesUSDTApprove])


    return (
        <div className='grid-items'>
            < div className='grid-item item1' >
                <img className="imaging" src='https://upload.wikimedia.org/wikipedia/commons/9/92/Backyardpool.jpg' alt={data.name} />
                <div className='name'>{data}</div>
            </div >
            <div className='grid-item item2'>
                <div className='title'>Liquidty Pool : </div>
                <div className='total'>{tokenname}/USDT - {formatEther(String(tokentotal))}/{String(usdttotal)} </div>
            </div>
            <div className='grid-item item3'>
                {Pooltoken?.[0] === address && <button disabled={(LoadingUSDTApprove || loadapproveusdt || FramPoolLoading || loadfram)} className='stake' onClick={() => handle('add')}> {(loadadd || AddPoolLoading || loadapprovetoken || LoadingTokenApprove) ? 'Adding...' : 'Add Pool'}</button>}
                <button disabled={!address || (loadadd || AddPoolLoading || loadapprovetoken || LoadingTokenApprove)} className='stake' onClick={() => handle('fram')}> {(LoadingUSDTApprove || loadapproveusdt || FramPoolLoading || loadfram) ? 'Framing...' : 'Fram Pool'}</button>
                <button disabled={!address || !Number(ballanceyouadd?.data) > 0} onClick={() => draw?.()} className='harvest'>{(loaddraw || withdrawLoading) ? 'Withdrawing..' : 'Withdraw'}</button>
            </div>
        </div >
    )
}

function Pool({ datas, address }) {
    return (
        <div className='grid-container'>
            {datas?.map((data, idx) => (
                <div key={idx}>
                    <Poolitem data={data} idx={idx} address={address} />
                </div>
            ))}
        </div>
    );
}

export default Pool;
