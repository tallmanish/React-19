import { useEffect, useOptimistic, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [name, setName] = useState();
  const [skills, setSkills] = useState([]);
  const [optskills, setoptskills] = useOptimistic(skills);

  useEffect(() => {
    getSkills();
  }, [])


  const sleep = (ms) => {
    return new Promise(res => setTimeout(res, ms));
  }

  const getSkills = async () => {
    const url = "http://localhost:3000/skills";
    let response = await fetch(url);
    response = await response.json();
    setSkills(response);
  }

  const addSkills = async () => {
    setoptskills((prev) => [...prev, { name }]);

    const url = "http://localhost:3000/skills";
    let response = await fetch(url, {
      method: "Post",
      body: JSON.stringify({ name })
    });
    await sleep(3000);
    response = await response.json();
    if (response) {
      getSkills();
    }
  }

  return (
    <>
      <div>
        <form action={addSkills}>
          <input type="text" onChange={(e) => setName(e.target.value)} ></input>
          <button >Add skills</button>
        </form>
        <h1>Skills added</h1>
        {
          optskills.map((item, index) => (
            <h4 key={index}>{item.name}</h4>
          ))
        }
      </div>

    </>
  )
}

export default App
