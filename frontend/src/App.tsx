import axios from "axios";
import { useEffect, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function App() {
  const [analytics, setAnalytics] = useState<any>({});
  const [leads, setLeads] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    source: "instagram",
    status: "qualified",
  });

  useEffect(() => {
    fetchAnalytics();
    fetchLeads();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(
        "https://leadzen-backend-hj7j.onrender.com/api/leads/analytics"
      );

      setAnalytics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLeads = async () => {
    try {
      const res = await axios.get(
        "https://leadzen-backend-hj7j.onrender.com/api/leads"
      );

      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://leadzen-backend-hj7j.onrender.com/api/leads",
        formData
      );

      fetchAnalytics();
      fetchLeads();

      setFormData({
        name: "",
        phone: "",
        source: "instagram",
        status: "qualified",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const chartData = [
    {
      name: "Instagram",
      value: analytics.instagramLeads || 0,
    },
    {
      name: "Google",
      value: analytics.googleLeads || 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Lead Analytics Dashboard
      </h1>

      {/* Add Lead Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Add New Lead
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="instagram">
              Instagram
            </option>

            <option value="google">
              Google
            </option>

            <option value="other">
              Other
            </option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="qualified">
              Qualified
            </option>

            <option value="non-qualified">
              Non Qualified
            </option>
          </select>

          <button
            type="submit"
            className="bg-black text-white p-3 rounded-lg md:col-span-4"
          >
            Add Lead
          </button>
        </form>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Total Leads
          </h2>

          <p className="text-3xl font-bold">
            {analytics.totalLeads || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Instagram
          </h2>

          <p className="text-3xl font-bold">
            {analytics.instagramLeads || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Google</h2>

          <p className="text-3xl font-bold">
            {analytics.googleLeads || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Qualified
          </h2>

          <p className="text-3xl font-bold">
            {analytics.qualifiedLeads || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Non Qualified
          </h2>

          <p className="text-3xl font-bold">
            {analytics.nonQualifiedLeads || 0}
          </p>
        </div>
      </div>

      {/* Leads Table */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">
          All Leads
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">
                  Name
                </th>

                <th className="p-3 text-left">
                  Phone
                </th>

                <th className="p-3 text-left">
                  Source
                </th>

                <th className="p-3 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead: any) => (
                <tr
                  key={lead._id}
                  className="border-b"
                >
                  <td className="p-3">
                    {lead.name}
                  </td>

                  <td className="p-3">
                    {lead.phone}
                  </td>

                  <td className="p-3 capitalize">
                    {lead.source}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        lead.status ===
                        "qualified"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">
          Lead Sources
        </h2>

        <div className="w-full h-[400px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={140}
                label
              >
                <Cell fill="#3B82F6" />
                <Cell fill="#10B981" />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;