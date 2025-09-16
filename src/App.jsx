import { useEffect, useState } from 'react';
import JournalForm from '../components/JournalForm';
import JournalList from '../components/JournalList';
import MoodChart from '../components/MoodChart';
import StreakTracker from '../components/StreakTracker';
import API from './api';

export default function App() {
  const [journals, setJournals] = useState([]);

  const fetchJournals = async () => {
    try {
      const res = await API.get('/journals');
      setJournals(res.data);
    } catch (err) {
      console.error('Fetch journals error', err);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleAdd = (entry) => {
    setJournals(prev => [entry, ...prev]);
  };

  const handleDelete = (id) => {
    setJournals(prev => prev.filter(j => j._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-700 p-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-semibold text-white">Daily Journal —  Mood Tracker</h1>
          <p className="text-2xl text-white">Add a journal entry, pick a mood. See weekly mood summary.</p>
        </header>

        <JournalForm onAdd={handleAdd} />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <MoodChart journals={journals} days={7} />
            <StreakTracker journals={journals} />
          </div>
          <div className="col-span-1">
            <JournalList journals={journals} onDelete={handleDelete} refresh={fetchJournals} />
          </div>
        </div>
      </div>
    </div>
  );
}
