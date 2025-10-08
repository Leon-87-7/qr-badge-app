import { useState } from 'react';
import BadgeForm from './components/BadgeFrom';
import BadgeDisplay from './components/BadgeDisplay';
import type { BadgeResponse } from './components/types';
import './App.css';

function App() {
  const [badge, setBadge] = useState<BadgeResponse | null>(null);

  return (
    <div className="min-h-screen bg-background-body">
      <header className="bg-gradient-header text-text px-8 py-8 text-center text-sm shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">QR Code Badge Generator</h1>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-background p-8 rounded-lg shadow-lg">
          <BadgeForm onBadgeGenerated={setBadge} />
        </div>

        <div className="bg-background p-8 rounded-lg shadow-lg">
          <BadgeDisplay badge={badge} />
        </div>
      </main>
    </div>
  );
}

export default App;
