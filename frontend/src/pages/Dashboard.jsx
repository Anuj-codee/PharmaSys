import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard");
        setDashboard(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
          "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const stats = dashboard.summary;

  const cards = [
    {
      label: "Total Medicines",
      value: stats.totalMedicines
    },
    {
      label: "Stock Units",
      value: stats.totalStockUnits
    },
    {
      label: "Low-Stock Medicines",
      value: stats.lowStockMedicines
    },
    {
      label: "Expired Batches",
      value: stats.expiredBatches
    },
    {
      label: "Expiring Soon",
      value: stats.expiringSoonBatches
    },
    {
      label: "Sales Today",
      value: stats.salesToday
    },
    {
      label: "Revenue Today",
      value: `₹${stats.revenueToday.toFixed(2)}`
    }
  ];

  return (
    <div>
      <h1>Pharmacy Dashboard</h1>

      <div>
        {cards.map((card) => (
          <div key={card.label}>
            <h3>{card.label}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div>

      <hr />

      <h2>Recent Sales</h2>

      {dashboard.recentSales.length === 0 ? (
        <p>No sales recorded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {dashboard.recentSales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.invoiceNumber}</td>
                <td>
                  {new Date(
                    sale.saleDate
                  ).toLocaleDateString()}
                </td>
                <td>{sale.items.length}</td>
                <td>₹{sale.totalAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr />

      <h2>Recent Purchases</h2>

      {dashboard.recentPurchases.length === 0 ? (
        <p>No purchases recorded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Supplier</th>
              <th>Date</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {dashboard.recentPurchases.map((purchase) => (
              <tr key={purchase._id}>
                <td>{purchase.invoiceNumber}</td>
                <td>
                  {purchase.supplier?.name || "Unknown"}
                </td>
                <td>
                  {new Date(
                    purchase.purchaseDate
                  ).toLocaleDateString()}
                </td>
                <td>
                  ₹{purchase.totalAmount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
