import React from 'react';
import '../styles/Home.css';
import ContactCard from './ContactCard';
import contributors from '../../contributors';

const Home = () => {
  
  const contactcards = [];
  contributors.map((contributor, index) => contactcards.push(<ContactCard key={'contributor' + index} contributor={contributor} />))

  console.log(contactcards);

  return (
    <div className='Home'>
      <div className='tagline'>
        <div className='main-tagline'>Bold tagline</div>
        <div className='sub-tagline'>Smaller description</div>
      </div>
      <div className='main-section'>
        <div className='sub-section'>
          <div>Bold tagline</div>
          <div>Smaller description</div>
        </div>
        <div className='sub-section'>
          Gif of demo?
        </div>
      </div>
      <div className='main-section'>
        <div className='sub-section'>
          Gif of npm install?
        </div>
        <div className='sub-section'>
          <div>Bold tagline</div>
          <div>Smaller description</div>
        </div>
      </div>
      <div className='contributors'>
        {contactcards}
      </div>
    </div>
  )
}

export default Home