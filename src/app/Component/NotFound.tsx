import React from 'react';

interface NotFoundProps {
  pokemon: boolean;
}

export const NotFound = (props: NotFoundProps) => (
  <div className='notFound'>
    {
      props.pokemon ?
        <h1>Pokemon Not Found</h1>
        :
        <>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </>
    }
  </div>
);
