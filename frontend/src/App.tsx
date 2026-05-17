
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
        "https://leadzen-backend-hj7j.onrender.com"
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-5">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            LeadZen CRM
          </h1>

          <p className="text-gray-400 mt-2">
            Smart Lead Analytics Dashboard
          </p>
        </div>

        <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300">
          AI Insights Enabled
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg">
          <p className="text-gray-400">Total Leads</p>
          <h2 className="text-4xl font-bold mt-3">
            {analytics.totalLeads || 0}
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg">
          <p className="text-gray-400">Instagram</p>
          <h2 className="text-4xl font-bold mt-3 text-pink-400">
            {analytics.instagramLeads || 0}
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg">
          <p className="text-gray-400">Google</p>
          <h2 className="text-4xl font-bold mt-3 text-green-400">
            {analytics.googleLeads || 0}
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg">
          <p className="text-gray-400">Qualified</p>
          <h2 className="text-4xl font-bold mt-3 text-blue-400">
            {analytics.qualifiedLeads || 0}
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg">
          <p className="text-gray-400">Non Qualified</p>
          <h2 className="text-4xl font-bold mt-3 text-red-400">
            {analytics.nonQualifiedLeads || 0}
          </h2>
        </div>
      </div>

      {/* Add Lead Form */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-10 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          Add New Lead
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Lead Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-blue-500"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-blue-500"
            required
          />

          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-blue-500"
          >
            <option value="instagram">Instagram</option>
            <option value="google">Google</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-blue-500"
          >
            <option value="qualified">Qualified</option>
            <option value="non-qualified">Non Qualified</option>
          </select>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
          >
            Add Lead
          </button>
        </form>
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6">
            Lead Sources
          </h2>

          <div className="w-full h-[350px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >
                  <Cell fill="#3B82F6" />
                  <Cell fill="#A855F7" />
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl lg:col-span-2 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6">
            Lead Management
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-700 text-gray-400">
                <th className="text-left py-4">Name</th>
                <th className="text-left py-4">Phone</th>
                <th className="text-left py-4">Source</th>
                <th className="text-left py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead: any) => (
                <tr
                  key={lead._id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-all"
                >
                  <td className="py-4">{lead.name}</td>
                  <td className="py-4">{lead.phone}</td>
                  <td className="py-4 capitalize">
                    {lead.source}
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        lead.status === "qualified"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
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
    </div>
  );
}

export default App;
