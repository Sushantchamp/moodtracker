import API from '../src/api';

const moodEmoji = {
  happy: '😊',
  neutral: '😐',
  sad: '😢',
  stressed: '😣'
};

function fmtDate(d) {
  return new Date(d).toLocaleString();
}

export default function JournalList({ journals = [], onDelete, refresh }) {

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    try {
      await API.delete(`/journals/${id}`);
      onDelete(id);
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  if (!journals.length) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-600">No entries yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {journals.map(entry => (
        <div key={entry._id} className="bg-blue-100 p-3 rounded shadow flex justify-between items-start">
          <div>
            <div className="text-sm text-gray-600">{fmtDate(entry.date)}</div>
            <div className="mt-1 text-gray-900">{entry.text}</div>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="inline-flex items-center px-2 py-1 bg-cyan-700 cursor-pointer hover:bg-cyan-800 text-white rounded transition-all duration-300 ease-in-out">
                {moodEmoji[entry.mood] || '😐'} {entry.mood}
              </span>
              <span className="inline-flex items-center px-2 py-1 cursor-pointer bg-violet-700 hover:bg-violet-800 text-white transition-all duration-300 ease-in-out rounded">
                Sentiment: {entry.sentimentScore >= 0 ? `+${entry.sentimentScore}` : entry.sentimentScore}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => handleDelete(entry._id)}
              className="text-red-600 text-sm hover:bg-red-600 hover:text-white px-3 py-1 rounded transition-all duration-300 ease-in-out"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
