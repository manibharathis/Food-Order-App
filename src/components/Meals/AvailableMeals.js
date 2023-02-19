import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import {useEffect ,useState} from 'react';
  const AvailableMeals=(props)=>{
    // const DUMMY_MEALS1 = [
    //     {
    //       id: 'm1',
    //       name: 'Sushi',
    //       description: 'Finest fish and veggies',
    //       price: 22.99,
    //     },
    //     {
    //       id: 'm2',
    //       name: 'Schnitzel',
    //       description: 'A german specialty!',
    //       price: 16.5,
    //     },
    //     {
    //       id: 'm3',
    //       name: 'Barbecue Burger',
    //       description: 'American, raw, meaty',
    //       price: 12.99,
    //     },
    //     {
    //       id: 'm4',
    //       name: 'Green Bowl',
    //       description: 'Healthy...and green...',
    //       price: 18.99,
    //     },
    //   ];
      let [dummyMeals,setdummyMeals]=useState([])
      let [isError,setIsError]=useState(false)
      
      useEffect(() => {
        const fetchMeals=async()=>{
          const response=await(fetch("https://react-http-783d8-default-rtdb.firebaseio.com/meals.json"))
                          .catch((err)=>{
                            setIsError(true)
                          })
         const data=await response.json()
         console.log(data)
         const m=[]
         for(let d in data){
           data[d].map(e=>m.push(e)
           )
         }
           
         setdummyMeals(m)
         
       }
        fetchMeals();
      },[]);
      
       console.log("dm "+dummyMeals)
      const mealsList=dummyMeals.map((e)=><MealItem id={e.id} key={e.id} name={e.name}description={e.description} price={e.price}/>)
      return(
        <section className={classes.meals}>
          {isError?<p className={classes.fetchError}>failed to fetch.. please try again later </p>:
            <Card>
            <ul> 
                 {dummyMeals.length>0?mealsList:<p>loading...</p>}
            </ul>
            </Card>}
        </section>
      )
  }
  export default AvailableMeals