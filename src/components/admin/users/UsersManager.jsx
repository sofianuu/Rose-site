import React, { useState } from 'react';
import { Search } from 'lucide-react';
import UsersList from './UsersList';
import UsersCards from './UsersCards';

const UsersManager = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (items) => {
    if (!searchTerm.trim()) return items;
    
    return items.filter(item => 
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };

  const handleDelete = (userId) => {
    if (window.confirm('Ești sigur că vrei să ștergi acest utilizator?')) {
      // Aici ar fi logica de ștergere din backend
      alert(`Utilizatorul cu ID-ul ${userId} a fost șters cu succes!`);
    }
  };

  const filteredUsers = handleSearch(users);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Caută utilizatori..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <UsersList users={filteredUsers} handleDelete={handleDelete} />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <UsersCards users={filteredUsers} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default UsersManager;