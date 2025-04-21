import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for homepage navigation
import pokemon from '../../../public/pokemon.jpg';

function NotFoundPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <div style={{ marginBottom: '30px', fontSize: '1.5em' }}>
        Oops! The page you were looking for could not be found.
      </div>
      <img
        src={pokemon}
        className="w-full max-w-md h-auto rounded-lg shadow-md mb-4"
        alt="Sad Pokemon"
      />
      <div>
        <button
          onClick={() => window.history.back()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336', // Error color
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
            marginBottom: '20px', // Adding gap between buttons
          }}
        >
          Go Back
        </button>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff', // Primary color
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;


