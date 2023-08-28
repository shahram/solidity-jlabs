import { ethers } from "./ethers-5.6.esm.min.js"
import { abi } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")

connectButton.onclick = connect
fundButton.onclick = fund

console.log(ethers)

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }

        // document.getElementById("connectButton").innerHTML = "Connected!"
        connectButton.innerHTML = "Connected!!"
    } else {
        connectButton.innerHTML = "Please Install MetaMask!"
    }
}
// fund function
async function fund(ethAmount) {
    console.log(`Funding with ${ethAmount}...`)

    if (typeof window.ethereum !== "undefined") {
        // Provider / connection to the blockchain
        // signer / wallet / someone with some gas
        // contract tha we are interacting with
        // ^ ABI & Address
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.ContractFactory()
    }
}
