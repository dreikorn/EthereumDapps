pragma solidity ^0.4.22;

contract PublicLedger {

  Property[] public propertyTable;

  struct Property {
    address propertyContract;
    string geoLocation;
    string description;
    address seller;
    address newOwner;
  }

  constructor() public{
  }

  function propertyTableSize() public view returns (uint) {
    return propertyTable.length;
}

  function registerProperty(address _propertyContract, address _newOwner, string _geoLocation, string _description, address _oldOwner) public {
    propertyTable.push( Property({
      propertyContract: _propertyContract,
      geoLocation: _geoLocation,
      description: _description,
      newOwner: _newOwner,
      seller: _oldOwner
    }));
  }
}
