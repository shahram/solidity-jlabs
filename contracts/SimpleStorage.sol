// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.2 <0.9.0;

contract SimpleStorage {
    uint256 favNumber;

    struct People {
        string name;
        uint256 favNumber;
    }

    People[] public people;
    mapping(string => uint256) nameToFavNumber;

    function store(uint256 _favNumber) public {
        favNumber = _favNumber;
    }

    function retrieve() public view returns (uint256) {
        return favNumber;
    }

    function addPerson(string memory _name, uint256 _favNumber) public {
        people.push(People(_name, _favNumber));
        nameToFavNumber[_name] += _favNumber;
    }
}
