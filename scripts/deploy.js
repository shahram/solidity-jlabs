// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// const ethers = require("ethers")
// const fs = require("fs-extra")
// require("dotenv").config()

const { ethers, run, network } = require("hardhat")

async function main() {
    // let provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    // let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    // const simplesStorageFactory = await ethers.getContractFactory("SimpleStorage")

    // const abi = fs.readFileSync("./artifacts/compiled/SimpleStorage.abi", "utf8")
    // const bin = fs.readFileSync("./artifacts/compiled/SimpleStorage.bin", "utf8")
    const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    // const contractFactory = new ethers.ContractFactory(abi, bin, wallet)
    console.log("Deploying contract! Please wait.")

    // const nonce = await contractFactory.nonce
    // const contract = await contractFactory.deploy({ nonce: nonce })
    // const deploymentReceipt = await contract.waitForDeployment()

    const simpleStorage = await simpleStorageFactory.deploy()
    // await simpleStorage.deployed()    //<--- not working!

    simpleStorage.deployed
    // console.log(`Contract deployed: ${simpleStorageReceipt.toString()}`)

    // console.log(`Contract deployed to: ${await contract.getAddress()}`)
    console.log(`Deployed contract to: ${await simpleStorage.getAddress()}`)

    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deploymentTransaction().wait(6)
        console.log("Waiting for block confirmation...")
        // await simpleStorage.waitForDeployment()
        await verify(await simpleStorage.getAddress(), [])
    }

    // let currentFavNumber = await contract.retrieve()
    // console.log(`Current number: ${currentFavNumber}`)
    // console.log("Updating favorite number, please wait ...")
    // await contract.store(10)
    // let newFavNumber = await contract.retrieve()
    // console.log(`Updated favorite number ${newFavNumber.toString()}`)

    const currentValue = await simpleStorage.retrieve()
    console.log(currentValue.toString())

    const transactionResponse = await simpleStorage.store(1000)
    await transactionResponse.wait(1)

    const newSimpleStorage = await simpleStorage.retrieve()
    console.log(newSimpleStorage.toString())
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(error)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
