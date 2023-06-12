import React,{ useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa';
import reactLogo from './assets/react.svg'
// import lightImage from "./assets/images/bg-desktop-light.jpg"
// import darkImage from "./assets/images/bg-desktop-dark.jpg"
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
 const [item,setItem]=useState("")
 const[itemList,setItemList]=useState([])
 const [itemCount, setItemCount] = useState(0);
 const [filter, setFilter] = useState('all');

 const handleInput=(e)=>{
   setItem(e.target.value)
 }
const handleSubmit=(e)=>{
  e.preventDefault()
  if(!item){
    alert("Please input a todo")
  }
  else{
    const myItem={
      id:Math.floor(Math.random()*100),
      value:item
    }
    setItemList((prevList=>[...prevList,myItem]))
    setItemCount(itemCount+1)
    setItem("")
  }
}
  const[theme,setTheme]=useState("light")
  const toggleLight=()=>{
    setTheme(theme==="light"?"dark":"light")
  }
  const handleDelete = (id) => {
    setItemList(prevList => prevList.filter(item => item.id !== id));
    setItemCount(itemCount - 1);
  };
  const handleCheckboxChange = (id) => {
    setItemList(prevList =>
      prevList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked
          };
        }
        return item;
      })
      
    );
    // setItemCount(itemCount - 1);
    
  };
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };
  const filteredItemList = itemList.filter((item) => {
    if (filter === 'active') {
      return !item.checked;
    } else if (filter === 'completed') {
      return item.checked;
    }
    return true;
  });
  
  

  return (
    
    <div className={`${theme==="light"?"light":"dark"} theme`}>
     
     <section className="sect-one">
      <div className="header">
        <h1>TODO</h1>
        <div className='icon'>{theme==="light"?( <FaMoon onClick={toggleLight}/>):
       (<FaSun onClick={toggleLight}/>)}

        </div>
      </div>
      <div className="input--list">
        <form onSubmit={handleSubmit} style={{backgroundColor:theme==="light"?"hsl(236, 33%, 92%)":"hsl(235, 24%, 19%)"}}>
         <button></button>
         <input type="text" placeholder="Create a new todo" onChange={handleInput} value={item} style={{backgroundColor:theme==="light"?"hsl(236, 33%, 92%)":"hsl(235, 24%, 19%)"}}/>
        </form>
        <section className="sect-two" style={{backgroundColor:theme==="light"?"hsl(236, 33%, 92%)":"hsl(235, 24%, 19%)"}}>
         <ul style={{listStyleType:'none'}}>{itemList.map((myItem)=>(
           <li key={myItem.id} style={{borderBottom:theme==="dark"?"0.1rem solid hsl(233, 14%, 35%)":"0.1rem solid hsl(236, 9%, 61%)"}}>
           <input type="checkbox" checked={myItem.checked} onChange={() => handleCheckboxChange(myItem.id)}/>
           <span className={myItem.checked ? 'item-checked' : ''}>{myItem.value}</span>
           <span className="delete-icon" onClick={() => handleDelete(myItem.id)}>X</span>
           </li>))}
          </ul>
          <div className="footer">
           <p>{itemCount} items left</p>
           <div className="footerSub">
             <button className="footer-btn" onClick={()=>handleFilter("all")}>All</button>
             <button className="footer-btn" onClick={()=>handleFilter("active")}> Active </button>
             <button className="footer-btn" onClick={()=>handleFilter("completed")}> Completed</button>
            </div>
            <p>Clear Completed</p>
           </div>
        </section>
      </div>
     </section>

    </div>
  )
}

export default App
