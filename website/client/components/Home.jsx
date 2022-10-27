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
          Automatically update state based
          <br></br>
           on database changes.
        </div>
        <div className='sub-tagline'>
          <p>
            In real time. To many clients.
          </p>
        </div>
      </div>

      <div className='main-section-a'>
        <div className='sub-section'>
          <div className='sub-section-heading'>Powered by change streams and sockets</div>
          <div>
            <p>
            These tools allow for an open line of communication between the database, server and clients.
            </p>
          </div>
        </div>
        {/* <div className='sub-section'>
          Diagram?
        </div> */}
      </div>

      <div className='main-section-b'>
        {/* <div className='sub-section'>
          <img className='gif' src="https://s4.gifyu.com/images/osp_gif_example_AdobeExpress.gif" alt="osp_gif_example_AdobeExpress.gif" border="0" width='85%' />
        </div> */}
        <div className='sub-section'>
          <div className='sub-section-heading'>Try it out</div>
          <div>
            <p>
              Explore a pre-built demo, or download
              our npm package to get building yourself.
            </p>
          <div className='demo-launch-buttons'>
            <button onClick={() => openInNewTab('https://livestatedb.com/storedemo')}>Storefront Demo</button>
            <button onClick={() => openInNewTab('https://livestatedb.com/inventorydemo')}>Inventory Manager Demo</button>
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