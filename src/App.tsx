import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CardList from './components/CardList';
import AddCard from './components/AddCard';
import PersonList from './components/PersonList';
import CompanyList from './components/CompanyList';
import InteractionList from './components/InteractionList';
import Analytics from './components/Analytics';
import { BusinessCard } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCard, setSelectedCard] = useState<BusinessCard | null>(null);

  const handleCardSelect = (card: BusinessCard) => {
    setSelectedCard(card);
    // Here you could navigate to a card detail page
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'cards':
        return <CardList onCardSelect={handleCardSelect} />;
      case 'add-card':
        return <AddCard />;
      case 'persons':
        return <PersonList />;
      case 'companies':
        return <CompanyList />;
      case 'interactions':
        return <InteractionList />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderCurrentPage()}
      </Layout>
    </Router>
  );
}

export default App;