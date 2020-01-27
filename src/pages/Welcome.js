import React from 'react';
import tw from 'tailwind.macro';

const Greeting = tw.div`
  flex-grow
  text-xl text-bold text-red
`;

const Welcome = () => {
  return (
    <Greeting>Welcome</Greeting>
  );
}

export default Welcome;

