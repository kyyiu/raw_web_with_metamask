import { ethers } from "./ethers_5.6.js";

const connectBtn = document.getElementById('connectBtn')
const fundBtn = document.getElementById('fund')
connectBtn.onclick = connect
fundBtn.onclick = fund
async function connect() {
    let tip = ""
    // 有metamask
    if (typeof window.ethereum !== "undefined") {
        // 唤起metamask进行链接
        await window.ethereum.request({method: "eth_requestAccounts"})
        tip = "connected"
    } else {
        tip = "Please install metamsak!"
    }
    connectBtn.innerHTML = tip
}

// fund
async function fund(ethAmount) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // 获取metamask正在链接中的用户
        const signer = provider.getSigner()
        const contract = new ethers.Contract('区块链地址', "区块abi", signer)
        try {
            const tradeRes = await contract.fund({
                value: ethers.utils.parseEther("123")
            })
            await listenForTradeMine(tradeRes, provider)
            console.log('done')
        } catch(e) {
            console.log(e)
        }
    }
}

function listenForTradeMine(tradeRes, provider) {
    return new Promise((res, rej)=>{
        provider.once(tradeRes.hash, (tradeReceipt) => {
            res()
        })
    })
    
}

async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance("区块链地址")
        console.log(ethers.utils.formatEther(balance))
    }
}

async function withdraw() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract('区块链地址', "区块abi", signer)
        try {
            const tradeRes = await contract.withdraw()
            await listenForTradeMine(tradeRes, provider)
        } catch (e) {
            console.log(e)
        }
    }
}