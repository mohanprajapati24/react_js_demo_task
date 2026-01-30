// import './App.css';
// import { useRef, useState } from 'react';

// function App() {

//   const [name, setName] = useState('');

//   const nameRef = useRef();

//   const handleChange = (e) => {
//     // console.log('----------E------------- ', e.target);
//     setName(e.target.value)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(`-------------name------------`, name)
//   }

//   const handleSubmitRef = (e) => {
//     e.preventDefault();
//     console.log(`-------------NAME REF------------`, nameRef.current.value)
//   }

//   return (
//     <>
//       <h1>React Test</h1>
//       <form>
//         <input className='name' name="name" type='text' value={name} onChange={(e) => handleChange(e)}>
//         </input>

//         <button type='submit' onClick={handleSubmit}>Submit</button>

//         <input className='nameref' name="nameref" type='text' ref={nameRef}>
//         </input>

//         <button type='submit' onClick={handleSubmitRef}>Submit ref</button>
//       </form>
//     </>
//   );
// }

// export default App;



function App() {

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;

    console.log("Name without state & ref:", name);
  };

  return (
    <>
      <h1>React Test</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;

