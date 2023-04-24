import React from 'react';
import '../styles/Home.css';
import ContactCard from './ContactCard';
import contributors from '../../contributors';
import ModalImage from "react-modal-image";

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
            In real time. To multiple clients.
          </p>
        </div>
      </div>

      <div className='main-section-a'>
        <div className='sub-section'>
          <div className='sub-section-heading'>Powered by MongoDB change streams and WebSockets</div>
          <div>
            <p>
              <a href='https://medium.com/@stephaniepage/livestatedb-5244b41e7419' target='_blank' rel='noreferrer noopener'>Learn more</a> about LiveStateDB, diagrams included!
            </p>
          </div>
        </div>
        <div className='sub-section'>
            <ModalImage className='modal'
              small={'website/build/assets/diagram1.png'}
              large={'website/build/assets/diagram1.png'}
              imageBackgroundColor={'rgb(247, 247, 247)'}
            />
            <ModalImage className='modal'
              small={'website/build/assets/diagram2.png'}
              large={'website/build/assets/diagram2.png'}
              imageBackgroundColor={'rgb(247, 247, 247)'}
            />
        </div>
      </div>

      <div className='main-section-b'>
        <div className='sub-section'>
          <div className='sub-section-heading'>Try it out</div>
          <div>
            <p>
              Explore the pre-built demo! Open a storefront demo and multiple inventory manager demos.  Notice that as you alter the inventory in any client the quantity changes across each client.
            </p>   
            <p>
              This is the power of LiveStateDB!     
            </p>
          <div className='demo-launch-buttons'>
            <button onClick={() => openInNewTab('http://livestatedb.com/storedemo')}>Storefront Demo</button>
            <button onClick={() => openInNewTab('http://livestatedb.com/inventorydemo')}>Inventory Manager Demo</button>
            <p> Download the <a href='https://www.npmjs.com/search?q=livestatedb' target='_blank' rel='noreferrer noopener'>NPM packages</a> and try for yourself!
            </p>  
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