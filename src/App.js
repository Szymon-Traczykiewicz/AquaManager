import React, { useState, useEffect } from 'react';
import './App.css';
import Ripples from 'react-ripples';
import Card from './UI/Card';
import Button from './UI/Button';

const initialVarius = {
  temperature: '123',
  light1status: false,
  light2status: false,
  pump1status: false,
  pump2status: false,
  pump3status: false,
  filterStatus: false,
  waterRelease: false,
};

const initialState = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

function App() {
  const [state, setState] = useState(initialState);
  const [varius, setVarius] = useState(initialVarius);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    // Simulation of downloading data from the server
    setTimeout(() => {
      setVarius({
        temperature: '25',
        light1status: true,
        light2status: false,
        pump1status: true,
        pump2status: false,
        pump3status: true,
        filterStatus: true,
        waterRelease: false,
      });
    }, 1000); // Simulation delay: 1 second (1000 ms)

    // Simulation of weekday status initialization
    setTimeout(() => {
      setState({
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: true,
        saturday: false,
        sunday: true,
      });
    }, 2000); // Simulation delay: 2 sec (2000 ms)
  }, []);

  const simulatePostData = (key, value) => {
// Simulation of sending data to the server

      setVarius((prevVarius) => ({ ...prevVarius, [key]: value }));

  };

  const toggleStatus = (key) => {
    const newValue = !varius[key];
    // Symulacja wysyłania danych na serwer
    simulatePostData(key, newValue);

    if (key === 'waterRelease') {
      // Zatrzymaj poprzedni timer, jeśli istnieje
      if (varius.waterReleaseTimer) {
        clearTimeout(varius.waterReleaseTimer);
      }
    // Set a new timer for 15 seconds
      const timer = setTimeout(() => {
        setVarius((prevVarius) => ({
          ...prevVarius,
          waterRelease: false,
          waterReleaseTimer: null,
        }));
      }, 15000); 
      setVarius((prevVarius) => ({ ...prevVarius, waterReleaseTimer: timer }));
    }
  };

  const toggleDay = (key) => {
    setState((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  const onSaveDays = () => {
    setTimeout(() => {
      const checkDays = [
        state.sunday,
        state.monday,
        state.tuesday,
        state.wednesday,
        state.thursday,
        state.friday,
        state.saturday,
      ];
      console.log(checkDays);
    }, 500);
  };


  const dayButtons = [
    { id: 1, key: 'monday', label: 'Poniedziałek', shortLabel: 'Pn' },
    { id: 2, key: 'tuesday', label: 'Wtorek', shortLabel: 'Wt' },
    { id: 3, key: 'wednesday', label: 'Środa', shortLabel: 'Śr' },
    { id: 4, key: 'thursday', label: 'Czwartek', shortLabel: 'Cz' },
    { id: 5, key: 'friday', label: 'Piątek', shortLabel: 'Pt' },
    { id: 6, key: 'saturday', label: 'Sobota', shortLabel: 'Sb' },
    { id: 0, key: 'sunday', label: 'Niedziela', shortLabel: 'Nd' },
  ];

  const actionButtons = [
    { key: 'filterStatus', url: 'Server url', labelOn: '✔   Włącz filtr', labelOff: '✘   Wyłącz filtr' },

    { key: 'pump1status', url: 'Server url', labelOn: '✔   Włącz pompę 1', labelOff: '✘   Wyłącz pompę 1' },

    { key: 'light1status', url: 'Server url', labelOn: '✔   Włącz lampę 1', labelOff: '✘   Wyłącz lampę 1' },

    { key: 'pump2status', url: 'Server url', labelOn: '✔   Włącz pompę 2', labelOff: '✘   Wyłącz pompę 2' },

    { key: 'light2status', url: 'Server url', labelOn: '✔   Włącz lampę 2', labelOff: '✘   Wyłącz lampę 2' },

    { key: 'pump3status', url: 'Server url', labelOn: '✔   Włącz pompę 3', labelOff: '✘   Wyłącz pompę 3' },

    { key: 'waterRelease', url: 'Server url', labelOn: '✔   Wypuść wodę', labelOff: '✘   Zatrzymaj wodę' },
  ];


  return (


<Card className = 'ContainerApp'>
      <div className='MainHeader'>
        <span className='MainText'>Włączanie pomp</span>
      </div>

      <div className='HeaderAndButton'>

        <div className='Header'>
          <span className='TxtHeader'>Dni tygodnia</span>
        </div>

        <div className='ButtonSaveDays'>
          <Ripples
            rippleradius={10} duration={1500}
            spread={10} 
          >
            <span
              className='TxtButtonSaveDays'
              onClick={onSaveDays}
            >Zapisz dni</span>
          </Ripples>
        </div>

      </div>
      <div className='CheckDayArea'>


  {dayButtons.map((day) => (
  <div key={day.id} className="SingleDay">
    <Ripples
      key={day.id}
      className="ripple"
      rippleradius={10}
      color={state[day.key] ? '#EAEEF3' : '#f9f9f9'}
      duration={150}
      spread={10}
    >
      <span
          className={`TxtSingleDay ${state[day.key] ? 'active' : ''}`}
          onClick={() => toggleDay(day.key)}
          style={{
            color: state[day.key] ? '#fff' : '#414141',
            backgroundColor: state[day.key] ? '#2D81FF' : '#F9F9F9',
          }}
        >
          {windowWidth <= 400 ? day.shortLabel : day.label}
        </span>
    </Ripples>
  </div>
))}

  
      </div>

      {/* //////////////////////////////////////////// ALL BUTTONS/////////////////////////////////////////////// */}

      <div className='ButtonsArea'>

        {actionButtons.map((button) => (
          <div key={button.key} className = 'SingleButton'
            style={{ 
              backgroundColor: varius[button.key] ? '#2D81FF' : '#F9F9F9',  
            }}>
            <Ripples
              // className='ripple'
              rippleradius={10}
              color={'#f9f9f9'}
              duration={150} spread={10} 
            >

          <Button
                   style={{ 
 
              color: varius[button.key] ? '#fff' : '#414141', 
            }}
            key={button.key}
            labelOn={button.labelOn}
            labelOff={button.labelOff}
            status={varius[button.key]}
            onClick={(newStatus) => toggleStatus(button.key, button.url, newStatus)}
          />
            </Ripples>
          </div>
        ))}

      </div>

{/* ///////////// STATUS AREA ///////////// */}
      <div className='HeaderAndButton'><span className='TxtHeader'>Status</span></div>
      <div className='ResponseArea'>

        <div className='Column1'>
          <div className='SingleResponse'>
            <div className='Label'>
              <span className='TxtLabel'>Temperatura:</span>
            </div>
            <div className='ResponseLabel'>
              <span className='TxtResponseLabel'> {varius.temperature} ℃</span>
            </div>
          </div>
          <div className='SingleResponse'>
            <div className='Label'>
              <span className='TxtLabel'>Filtr:</span>
            </div>
            <div className='ResponseLabel'>
              <span className='TxtResponseLabel'
                style={{ color: varius.filterStatus ? '#2D81FF' : '#000000' }}>
                {varius.filterStatus ? 'włączono' : 'wyłączono'}
              </span>
            </div>
          </div>
          <div className='SingleResponse'>
            <div className='Label'>
              <span className='TxtLabel'>Lampa 1:</span>
            </div>
            <div className='ResponseLabel'>
              <span className='TxtResponseLabel'
                style={{ color: varius.light1status ? '#2D81FF' : '#000000' }}>
                {varius.light1status ? 'włączono' : 'wyłączono'}
              </span>
            </div>
          </div>
          <div className='SingleResponse'>
            <div className='Label'>
              <span className='TxtLabel'>Lampa 2:</span>
            </div>
            <div className='ResponseLabel'>
              <span className='TxtResponseLabel'
                style={{ color: varius.light2status ? '#2D81FF' : '#000000' }}>
                {varius.light2status ? 'włączono' : 'wyłączono'}
              </span>
            </div>
          </div>
        </div>



        <div className='Column2'>
          <div className='SingleResponse'>
            <div className='Label'>
              <span className='TxtLabel'>Pompa 1:</span>
            </div>
            <div className='ResponseLabel'>
              <span className='TxtResponseLabel'
                style={{ color: varius.pump1status ? '#2D81FF' : '#000000' }}>
                {varius.pump1status ? 'włączono' : 'wyłączono'}
              </span>
            </div>
          </div>
          <div className='SingleResponse'>
            <div className='Label'>
              <span className='TxtLabel'>Pompa 2:</span>
            </div>
            <div className='ResponseLabel'>
              <span className='TxtResponseLabel'
                style={{ color: varius.pump2status ? '#2D82FF' : '#000000' }}>
                {varius.pump2status ? 'włączono' : 'wyłączono'}
              </span>
            </div>
          </div>
          <div className='SingleResponse'>
            <div className='Label'>
              <span className='TxtLabel'>Pompa 3:</span>
            </div>
            <div className='ResponseLabel'>
              <span className='TxtResponseLabel'
                style={{ color: varius.pump3status ? '#2D82FF' : '#000000' }}>
                {varius.pump3status ? 'włączono' : 'wyłączono'}
              </span>
            </div>
          </div>
          <div className='SingleResponse'>
            <div className='Label'>
              <span className='TxtLabel'>Wypuszczanie wody:</span>
            </div>
            <div className='ResponseLabel'>
              <span className='TxtResponseLabel'
                style={{ color: varius.waterRelease ? '#2D82FF' : '#000000' }}>
                {varius.waterRelease ? 'włączono' : 'wyłączono'}
              </span>
            </div>
          </div>
        </div>

      </div>


    </Card>

  );
}

export default App;
