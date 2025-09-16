import { useState } from 'react';
import API from '../src/api';
import PromptGenerator from './PromptGenerator';

const MOODS = [
  { key: 'happy', label: 'Happy', emoji: '😊' },
  { key: 'neutral', label: 'Neutral', emoji: '😐' },
  { key: 'sad', label: 'Sad', emoji: '😢' },
  { key: 'stressed', label: 'Stressed', emoji: '😣' }
];

export default function JournalForm({ onAdd }) {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('happy');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert('Write something first');
      return;
    }
    setLoading(true);
    try {
      const res = await API.post('/journals', { text, mood });
      onAdd(res.data);
      setText('');
      setMood('happy');
    } catch (err) {
      console.error(err);
      alert('Could not save entry');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <PromptGenerator />
      <form onSubmit={handleSubmit} className="bg-gray-200 p-4 rounded-b shadow">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write your entry for today..."
          className="w-full p-3 border rounded mb-3 resize-none h-28"
        />
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm text-gray-600 mr-2">Mood</label>
            <select
              value={mood}
              onChange={e => setMood(e.target.value)}
              className="p-2 border rounded hover:bg-white transition-all duration-300 ease-in"
            >
              {MOODS.map(m => (
                <option key={m.key} value={m.key}>
                  {m.emoji} {m.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 transition-all duration-300 ease-in-out text-white px-4 py-2 rounded disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </form>
    </>
  );
}
