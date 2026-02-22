// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract FleetManagement {

event VehicleRegistered(string vehicleId);
event DriverRegistered(string driverId);
event VehicleAssigned(uint vehicleIndex, uint driverIndex);
event MaintenanceAdded(uint vehicleIndex);


    address public owner;

    struct Vehicle {
        string vehicleId;
        string model;
        bool isActive;
    }

    mapping(uint => Vehicle) public vehicles;
    uint public vehicleCount;
    
   function getVehicleCount() public view returns (uint) {
    return vehicleCount;
}

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function registerVehicle(string memory _vehicleId, string memory _model)
        public
    {
        vehicles[vehicleCount] = Vehicle(_vehicleId, _model, true);
emit VehicleRegistered(_vehicleId);
        vehicleCount++;
    }

    function deactivateVehicle(uint _vehicleIndex)
        public
        onlyOwner
    {
        vehicles[_vehicleIndex].isActive = false;
    }

    function getVehicle(uint _vehicleIndex)
        public
        view
        returns (string memory, string memory, bool)
    {
        Vehicle memory v = vehicles[_vehicleIndex];
        return (v.vehicleId, v.model, v.isActive);
    }

struct Driver {
    string driverId;
    string name;
    string licenseNo;
    bool isActive;
}

mapping(uint => Driver) public drivers;
uint public driverCount;

function registerDriver(
    string memory _driverId,
    string memory _name,
    string memory _licenseNo
)
    public
    onlyOwner
{
    drivers[driverCount] = Driver(_driverId, _name, _licenseNo, true);
    emit DriverRegistered(_driverId);
    driverCount++;
}

function deactivateDriver(uint _driverIndex)
    public
    onlyOwner
{
    drivers[_driverIndex].isActive = false;
}


mapping(uint => uint) public vehicleToDriver;

function assignDriverToVehicle(uint _vehicleIndex, uint _driverIndex)
    public
    onlyOwner
{
    require(vehicles[_vehicleIndex].isActive, "Vehicle inactive");
    require(drivers[_driverIndex].isActive, "Driver inactive");

    vehicleToDriver[_vehicleIndex] = _driverIndex;
    emit VehicleAssigned(_vehicleIndex, _driverIndex);
}

struct Route {
    string routeId;
    string source;
    string destination;
}

mapping(uint => Route) public routes;
uint public routeCount;

mapping(uint => uint) public vehicleToRoute;

function createRoute(
    string memory _routeId,
    string memory _source,
    string memory _destination
)
    public
    onlyOwner
{
    routes[routeCount] = Route(_routeId, _source, _destination);
    routeCount++;
}

function assignRouteToVehicle(uint _vehicleIndex, uint _routeIndex)
    public
    onlyOwner
{
    vehicleToRoute[_vehicleIndex] = _routeIndex;
}

struct Maintenance {
    string description;
    uint timestamp;
}

mapping(uint => Maintenance[]) public maintenanceLogs;

function addMaintenanceLog(uint _vehicleIndex, string memory _desc)
    public
    onlyOwner
{
    maintenanceLogs[_vehicleIndex].push(
        Maintenance(_desc, block.timestamp)
    );
   emit MaintenanceAdded(_vehicleIndex);
}


}

