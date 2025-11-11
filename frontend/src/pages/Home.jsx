import React, { useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Home(){
  const { user } = useContext(AuthContext);
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      const res = await api.get('/recommendations', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setRecs(res.data);
    };
    fetch();
  }, [user]);

  return (
    <div>
      <h1>Recommended Tracks</h1>
      {recs.length === 0 ? <p>No recommendations yet</p> : (
        <ul>
          {recs.map(t => <li key={t._id}>{t.title} — {t.artist} ({t.genres.join(', ')})</li>)}
        </ul>
      )}
    </div>
  );
}
