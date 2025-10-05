import { useState } from 'react';
import BadgeForm from './components/BadgeFrom';
import BadgeDisplay from './components/BadgeDisplay';
import type { BadgeResponse } from './components/types';
import './App.css';

function App() {
  const [badge, setBadge] = useState<BadgeResponse | null>(null);

  return (
    <div className="app">
      <header>
        <h1>QR Code Badge Generator</h1>
      </header>

      <main className="container">
        <div className="form-section">
          <BadgeForm onBadgeGenerated={setBadge} />
        </div>

        <div className="display-section">
          <BadgeDisplay badge={badge} />
        </div>
      </main>
    </div>
  );
}

export default App;
