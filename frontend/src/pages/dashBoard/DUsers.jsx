import React, { useEffect, useState } from "react";
import { adminService } from "../../api/admin.service";
import AdminLayout from "./AdminDashboard";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await adminService.getAllUsers();
      if (res.success) setUsers(res.data);
    }
    fetchUsers();
  }, []);

  return (
    <>
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
          Users Info
        </h3>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/30 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <th className="px-6 py-4 font-semibold rounded-tl-2xl">
                Username
              </th>
              <th className="px-6 py-4 font-semibold text-center">Email</th>
              <th className="px-6 py-4 font-semibold text-center">
                Phone Number
              </th>
              <th className="px-6 py-4 font-semibold text-center rounded-tr-2xl">
                Profession
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-slate-50/50" : "bg-white/40"
                } hover:bg-indigo-50`}
              >
                <td className="px-6 py-4 font-medium text-slate-800">
                  {user.username}
                </td>
                <td className="px-6 py-4 text-center text-slate-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-center text-slate-700">
                  {user.phno}
                </td>
                <td className="px-6 py-4 text-center text-slate-700">
                  {user.profession}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
