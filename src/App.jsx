import { useState, useEffect } from 'react'
import './App.css'
import dice from "./assets/images/icon-dice.svg"
import dividerm from './assets/images/pattern-divider-mobile.svg'
import dividerd from './assets/images/pattern-divider-desktop.svg'

function App() {
  const [id, setId] = useState("");
  const [advice, setAdvice] = useState(null);

  const fetchAdvice = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setId(data.slip.id);
      setAdvice(data.slip.advice); 
    } catch (error) {
      console.error('Error fetching advice:', error);
    }
  };
  
  useEffect(() => {
    fetchAdvice(); 
  }, []);

  return (
    <div className='w-full h-screen flex justify-center items-center font-Manrope'>
      <div className='w-[90%] max-w-[540px] h-fit bg-DarkGrayishBlue py-10 relative flex flex-col justify-center items-center rounded-xl'>
        <p className='text-[14px] tracking-widest text-NeonGreen'>ADVICE #{id}</p>
        <h1 className='w-[85%] my-5 text-[25px] text-LightCyan text-center font-semibold'>“{advice}”</h1>
        <img className='mb-5 tablet:hidden' src={dividerm} alt="Divider Logo" />
        <img className='hidden mb-5 tablet:block' src={dividerd} alt="" />
        <button className='bg-NeonGreen absolute bottom-[-25px] p-4 rounded-full' onClick={fetchAdvice}>
          <img src={dice} alt="Dice" />
        </button>
      </div>
    </div>
  )
}

export default App
