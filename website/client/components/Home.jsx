import React from 'react';
import '../styles/Home.css';
import ContactCard from './ContactCard';
import contributors from '../../contributors';

const Home = () => {
  
  const contactcards = [];
  contributors.map((contributor, index) => contactcards.push(<ContactCard key={'contributor' + index} contributor={contributor} />))

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='Home'>

      <div className='tagline'>
        <div className='main-tagline'>
          Keep state updated
          <br></br>
          without querying your database.
        </div>
        <div className='sub-tagline'>
          <p>
            LiveStateDB is a database subscription API that makes state reflect data it's subscribed to. In real time.
          </p>
        </div>
      </div>

      <div className='main-section-a'>
        <div className='sub-section'>
          <div className='sub-section-heading'>Powered by change streams and sockets</div>
          <div>
            <p>
              Maybe we want to provide a simple overview
              of how this technology works.
            </p>
          </div>
        </div>
        <div className='sub-section'>
          Diagram?
        </div>
      </div>

      <div className='main-section-b'>
        <div className='sub-section'>
          Gif of demo?
        </div>
        <div className='sub-section'>
          <div className='sub-section-heading'>Try it out</div>
          <div>
            <p>
              Explore a pre-built demo, or download
              our npm package to get building yourself.
            </p>
          <div className='demo-launch-buttons'>
            <button onClick={() => openInNewTab('http://localhost:3000/storedemo')}>Storefront Demo</button>
            <button onClick={() => openInNewTab('http://localhost:3000/inventorydemo')}>Inventory Manager Demo</button>
          </div>
          </div>
        </div>
      </div>

      <div className='contributors'>
        <div className='sub-section-heading'>
          Contributors
        </div>
        <div className='contact-cards'>
        {contactcards}
        </div>
      </div>

    </div>
  )
}

export default Home