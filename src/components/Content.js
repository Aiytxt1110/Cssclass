import React,{ useState,useEffect  } from 'react';
import { FaCopy } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import database from '../Firebase'

function Popup() {
    return (
      <div className='popupcopied'><FaRegCheckCircle/> Copied </div>
    )
  }

export default function Content({value}) {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [constants, setConstants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await database.ref("Constantsprop").orderByChild('type').equalTo(value).once('value');
        const data = snapshot.val();
        if (data) {
          const constantsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setConstants(constantsArray);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from the database:", error);
      }
    };

    fetchData();
  }, [value]);

  const handleClickProvider = (name) => {
    setSelectedProvider(name === selectedProvider ? null : name);
    navigator.clipboard.writeText(name)
    setSelectedProvider(name);
  };

  return (
    <div style={{width:'100%'}}>  
      {loading ? (
               <div className="progress-container">
               <div className="progress-bar"></div>
             </div>
            ) : (
                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Class Name</th>
                                <th>Properties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {constants.map((constant) => (
                                <tr key={constant.id}>
                                    <td onClick={() => handleClickProvider(constant.name)}>{constant.name}
                                        {selectedProvider === constant.name && <Popup />} 
                                    </td>
                                    <td>{constant.proper}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
    </div>
  )
}
