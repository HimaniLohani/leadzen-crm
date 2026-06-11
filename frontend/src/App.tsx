import axios from "axios";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Analytics {
  totalLeads?: number;
  instagramLeads?: number;
  googleLeads?: number;
  qualifiedLeads?: number;
  nonQualifiedLeads?: number;
  conversionRate?: number;
  revenue?: number;
  activeDeals?: number;
  leadTrend?: number;
  conversionTrend?: number;
  revenueTrend?: number;
  dealsTrend?: number;
}

interface Lead {
  _id: string;
  name: string;
  phone: string;
  source: string;
  status: string;
}

function App() {
  const [analytics, setAnalytics] = useState<Analytics>({});
  const [leads, setLeads] = useState<Lead[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    source: "instagram",
    status: "qualified",
  });

  const fetchData = async () => {
    try {
      const [analyticsRes, leadsRes] = await Promise.all([
        axios.get("https://leadzen-backend-hj7j.onrender.com/api/leads/analytics"),
        axios.get("https://leadzen-backend-hj7j.onrender.com/api/leads"),
      ]);
      setAnalytics(analyticsRes.data);
      setLeads(leadsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      await axios.delete(
        `https://leadzen-backend-hj7j.onrender.com/api/leads/${id}`
      );
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      fetchData();
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

  const growthData = [
    { month: "Jan", leads: 40 },
    { month: "Feb", leads: 65 },
    { month: "Mar", leads: 80 },
    { month: "Apr", leads: 70 },
    { month: "May", leads: 110 },
    { month: "Jun", leads: 130 },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 bg-[#050816] border-r border-white/10 flex-col justify-between fixed h-screen">
        <div>
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              LeadZen AI
            </h1>
          </div>

          <div className="p-4 space-y-3">
            <button className="w-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl px-4 py-3 text-left">
              Dashboard
            </button>

            <button className="w-full hover:bg-white/5 rounded-xl px-4 py-3 text-left text-gray-400">
              Leads
            </button>

            <button className="w-full hover:bg-white/5 rounded-xl px-4 py-3 text-left text-gray-400">
              Analytics
            </button>

            <button className="w-full hover:bg-white/5 rounded-xl px-4 py-3 text-left text-gray-400">
              Reports
            </button>

            <button className="w-full hover:bg-white/5 rounded-xl px-4 py-3 text-left text-gray-400">
              Settings
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="font-semibold">Himani Lohani</p>
            <p className="text-gray-400 text-sm">leadzencrm@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 lg:ml-64 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-5xl font-bold">Lead Analytics Dashboard</h1>
            <p className="text-gray-400 mt-3">Smart AI Powered CRM Analytics</p>
          </div>

          <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
            + Add Lead
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-600/10 border border-blue-500/20 p-6 rounded-3xl">
            <p className="text-gray-400">Total Leads</p>
            <h2 className="text-5xl font-bold mt-4">{analytics.totalLeads || 0}</h2>
            <p className="text-green-400 mt-3">↑ 12.5% this month</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-pink-600/10 border border-purple-500/20 p-6 rounded-3xl">
            <p className="text-gray-400">Instagram Leads</p>
            <h2 className="text-5xl font-bold mt-4 text-pink-400">
              {analytics.instagramLeads || 0}
            </h2>
            <p className="text-green-400 mt-3">↑ 8.2% growth</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/40 to-emerald-600/10 border border-green-500/20 p-6 rounded-3xl">
            <p className="text-gray-400">Google Leads</p>
            <h2 className="text-5xl font-bold mt-4 text-green-400">
              {analytics.googleLeads || 0}
            </h2>
            <p className="text-green-400 mt-3">↑ 15.8% growth</p>
          </div>

          <div className="bg-gradient-to-br from-orange-900/40 to-red-600/10 border border-orange-500/20 p-6 rounded-3xl">
            <p className="text-gray-400">Qualified Leads</p>
            <h2 className="text-5xl font-bold mt-4 text-orange-400">
              {analytics.qualifiedLeads || 0}
            </h2>
            <p className="text-red-400 mt-3">↓ 3.1% this week</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
          {/* Area Chart */}
          <div className="bg-[#0B0F1A] border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-2">Conversion Metrics</h2>
            <p className="text-gray-400 mb-8">Lead generation over time</p>

            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="#A855F7"
                    fillOpacity={1}
                    fill="url(#colorLeads)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-[#0B0F1A] border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-2">Lead Sources</h2>
            <p className="text-gray-400 mb-8">Acquisition channel analytics</p>

            <div className="h-[350px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
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
        </div>

        {/* Add Lead */}
        <div className="bg-[#0B0F1A] border border-white/10 rounded-3xl p-8 mb-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Add New Lead</h2>
              <p className="text-gray-400 mt-2">Manage and track customer leads</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Lead Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
              required
            />

            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
            >
              <option value="instagram">Instagram</option>
              <option value="google">Google</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
            >
              <option value="qualified">Qualified</option>
              <option value="non-qualified">Non Qualified</option>
            </select>

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
            >
              Add Lead
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-[#0B0F1A] border border-white/10 rounded-3xl p-8 overflow-x-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Lead Management</h2>
              <p className="text-gray-400 mt-2">Track and manage your pipeline</p>
            </div>

            <input
              type="text"
              placeholder="Search leads..."
              className="bg-black border border-white/10 rounded-2xl px-5 py-3 outline-none"
            />
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="text-left py-5">Lead</th>
                <th className="text-left py-5">Phone</th>
                <th className="text-left py-5">Source</th>
                <th className="text-left py-5">Status</th>
                <th className="text-left py-5">Action</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead: Lead) => (
                <tr
                  key={lead._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-all"
                >
                  <td className="py-5 font-semibold">{lead.name}</td>
                  <td className="py-5 text-gray-300">{lead.phone}</td>
                  <td className="py-5 capitalize">{lead.source}</td>
                  <td className="py-5">
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
                  <td className="py-5">
                    <button
                      onClick={() => deleteLead(lead._id)}
                      className="px-4 py-2 rounded-full text-sm font-semibold bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all duration-200"
                    >
                      Delete
                    </button>
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