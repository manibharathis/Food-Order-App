import Header from './components/Layout/Header'
import { useState } from 'react';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './Store/Cart-Provider';
function App() {
  const [showModal,setShowModal]=useState(false)
  const unHideModal=(props)=>{
       setShowModal(true)
  }
  const HideModal=(props)=>{
    setShowModal(false)
  }
  return (
    <CartProvider>
       {showModal&&<Cart onClose={HideModal}/>}
    <Header onClick={unHideModal}/>
   
    <main>
      <Meals/>
    </main>
    </CartProvider>
  );
}

export default App;
