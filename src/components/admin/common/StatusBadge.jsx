const StatusBadge = ({ status }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'Activ':
        return 'bg-green-100 text-green-800';
      case 'Inactiv':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${getStatusClasses()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;