import React, { useCallback, useEffect, useState } from 'react'
import { Card } from '../UI/Card'
import classes from './AvailableMeals.module.css'
import { MealItem } from './MealItem'
export const AvailableMeals = () => {
  const [meals,setMeals] = useState([]);
  const [error,setError] = useState(null);
  const fetchAvailMeals = useCallback(async()=>{
    setError(null);
    try{
      const response = await fetch('https://meals-378cc-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok){
        throw new Error('Something Went Wrong');
      }
      const data = await response.json();
      const tempmeals = [];
      for(const key in data){
        tempmeals.push({
        id:key,
        description:data[key].description,
        name:data[key].name,
        price:data[key].price
      })
    }
    setMeals(tempmeals);
    }
    catch(err){
      setError(err.message);
    }  
  },[]);
  useEffect(()=>{
    fetchAvailMeals();
  },[fetchAvailMeals]);
  let content;
  if(error){
    console.log(error);
    content = <section className={classes.MealsError}><p>{error}</p></section>
  }
  if(meals.length>0){
    content = meals.map((meal)=>
      <Card>
          <MealItem id={meal.name} title={meal.name} description={meal.description} key={meal.id} price={meal.price}/>
          </Card>
      )
  }
  return (
    <section className={classes.meals}>
        <ul> 
          {content}
        </ul>
    </section>
  )
}
