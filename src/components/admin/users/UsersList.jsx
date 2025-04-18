import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const UsersList = ({ users, handleDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Nume</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Rol</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="px-6 py-3">{user.id}</td>
              <td className="px-6 py-3">{user.name}</td>
              <td className="px-6 py-3">{user.email}</td>
              <td className="px-6 py-3">{user.role}</td>
              <td className="px-6 py-3">
                <StatusBadge status={user.status} />
              </td>
              <td className="px-12 py-4 flex">
                <div className="flex space-x-2">
                  <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(user.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;