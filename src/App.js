import React,{ useState,useEffect  } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Select from 'react-select';
import Content from './components/Content'
import Classnamecopy from './components/Classnamecopy'
import database from './Firebase'

export default function App() {
  // const [selectedOption, setSelectedOption] = useState(null);
  // const [options, setOptions] = useState([]);
  // useEffect(() => {
  //   const uniqueTypes = [...new Set(Constantsprop.map(item => item.type))];
  //   const sortedOptions = uniqueTypes.sort((a, b) => a.localeCompare(b));
  //   const formattedOptions = sortedOptions.map(option => ({
  //     value: option,
  //     label: option
  //   }));
  //   setOptions(formattedOptions);
  //   if (formattedOptions.length > 0) {
  //     setSelectedOption(formattedOptions[0]);
  //   }
  // }, []);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const snapshot = await database.ref("Constantsprop").once('value');
        const types = new Set();
        snapshot.forEach((childSnapshot) => {
          const type = childSnapshot.val().type;
          if (type) {
            types.add(type);
          }
        });
        const formattedOptions = Array.from(types).map(option => ({
          value: option,
          label: option
        })).sort((a, b) => a.label.localeCompare(b.label));
        setOptions(formattedOptions);
        if (formattedOptions.length > 0) {
          setSelectedOption(formattedOptions[0]);
        }
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log("Selected Option:", selectedOption);
  };
  return (
    <div className="container">      
      <div className='header'>
        <h1>CSS Classname</h1>
        <div className="menu">
          <Select 
            className='input' 
            options={options} 
            value={selectedOption} 
            onChange={handleChange} 
            placeholder="Select an Classname"/>
        </div>
        <hr style={{width:'100%', padding:'0 20px'}}/>
        <div style={{textAlign:'left'}}>
          <h3>To fuether enhance the desig of the website, we don't have to new CSS files or multiple CSS classes</h3>
          <p>Just&nbsp;<Classnamecopy/>&nbsp;to copy/paste them into the CSS file and apply class here</p>
      {selectedOption && <Content value={selectedOption.value} />}  
              
        </div> 
      </div>
    </div>
  );
}