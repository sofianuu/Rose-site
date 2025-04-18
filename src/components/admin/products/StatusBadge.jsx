
const StatusBadge = ({ status }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${
      status === 'Activ' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {status}
    </span>
  );
};

export default StatusBadge;