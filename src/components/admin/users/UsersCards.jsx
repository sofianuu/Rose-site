import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const UsersCards = ({ users, handleDelete }) => {
  return (
    <div className="space-y-4">
      {users.map(user => (
        <div key={user.id} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm font-medium text-gray-600">Nume</p>
              <p className="text-base font-semibold">{user.name}</p>
            </div>
            <StatusBadge status={user.status} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-base truncate">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Rol</p>
              <p className="text-base">{user.role}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t flex justify-end space-x-3">
            <button className="text-blue-600 hover:text-blue-800">
              <Edit size={20} />
            </button>
            <button 
              className="text-red-600 hover:text-red-800"
              onClick={() => handleDelete(user.id)}
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersCards;