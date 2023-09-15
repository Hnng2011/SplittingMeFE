import { ethers } from 'ethers'
import { getGlobalState, setGlobalState } from './store'

const { ethereum } = window

async function get_signature(message) {
    const signature = await signer.signMessage(message);
    return signature;
}
