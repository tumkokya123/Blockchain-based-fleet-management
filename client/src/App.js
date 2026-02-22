import { useEffect, useState } from "react";
import { getContract } from "./ethereum";

function App() {
  const [contract, setContract] = useState(null);
  const [vehicleCount, setVehicleCount] = useState("0");
  const [vehicleId, setVehicleId] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadBlockchain() {
      const c = await getContract();
      setContract(c);

      const count = await c.getVehicleCount();
      setVehicleCount(count.toString());
    }
    loadBlockchain();
  }, []);

  const registerVehicle = async () => {
    if (!vehicleId || !vehicleType) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const tx = await contract.registerVehicle(vehicleId, vehicleType);
      await tx.wait();

      const count = await contract.getVehicleCount();
      setVehicleCount(count.toString());

      setVehicleId("");
      setVehicleType("");
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", maxWidth: "500px" }}>
      <h1> FLEET MANAGEMENT DASHBOARD</h1>

      <p>
        <b>Total Vehicles Registered:</b> {vehicleCount}
      </p>

      <hr />

      <h3>Register Vehicle</h3>

      <input
        type="text"
        placeholder="Vehicle Number (e.g. KA01AB1234)"
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <input
        type="text"
        placeholder="Vehicle Type (e.g. Truck)"
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <button
        onClick={registerVehicle}
        disabled={loading}
        style={{
          padding: "10px",
          width: "100%",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        {loading ? "Registering..." : "Register Vehicle"}
      </button>
    </div>
  );
}

export default App;


