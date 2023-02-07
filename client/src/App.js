import { useState, useEffect } from 'react';
import './App.css';
import { TestModel } from './components/TestModel';
import CustomTypewriter from './components/Typewriter';
import './normal.css';

import { Outlet, Link } from "react-router-dom";


function App() {

  const [engineList, setEngineList] = useState([]);
  // select engine
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [showSelect, setShowSelect] = useState(false);

  useEffect(() => {
      // fetch for requested model 
      
  }, [selectedEngine])

  useEffect(() => {
    getEngineList();
    setSelectedEngine(engineList[0]);
    console.log(engineList);
  }, [])

  const getEngineList = async () => {
    fetch('http://localhost:8000/models', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(async (data) => {
        console.log('engine list: ', data.data);
        setEngineList(data.data)
      })
  }


  if (!engineList.length) {
    return (
      <div className={`App`}>
        <h2 style={{ color: 'white' }}>Loading...</h2>
      </div>
    )
  }

  return (
    <div className={`App ${showSelect && 'type-writer-container'}`}>
      {
        engineList.length > 0 ?
          <>
            <CustomTypewriter showSelect={showSelect} setShowSelect={setShowSelect} />
            <div className='content'>
              <div className="chat-container">
                {
                  showSelect && (
                    <>
                      <select class="custom-select" onChange={(e) => setSelectedEngine(e.target.value)}>
                        <option selected disabled>Please Select</option>
                        {engineList.map(engine =>
                          <option
                            className="select-item"
                            key={engine.id}
                            value={engine.id}
                          >
                            {engine.id}
                          </option>
                        )}
                      </select>
                      {
                        selectedEngine && <button
                          className='select-model-button'>
                          <Link to={`models/${selectedEngine}`}>Test {selectedEngine}</Link></button>
                      }
                    </>
                  )
                }
              </div>
            </div>
          </>
          : ''
      }
    </div>
  );
}

export default App;
