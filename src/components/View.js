
import React, { useState, useEffect } from 'react'

import  './View.css';

export default function View() {

  const [workouts, setWorkout] = useState([])
  useEffect(() => {
    fetch('http://localhost:8000/WorkOut')
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setWorkout(data)
      })
  }, [])

  const deleteWorkouts = (id) => {

    let fileteredWorkouts = workouts.filter((workout) => workout.id != id)

    fetch('http://localhost:8000/WorkOut/' + id, {
      method: "DELETE"
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setWorkout(fileteredWorkouts)
      })
  }

  const LetsStart = (id) => {
    
    fetch('http://localhost:8000/WorkOut/' + id, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ startTime: new Date() })
    })
  }

  const Stop = (id, startTime, CBurn) => {
 
    let endTime =  new Date()
    let TotalCBurn = getDifferenceInMinutes(new Date(startTime),endTime,CBurn);
    console.log(TotalCBurn);
    fetch('http://localhost:8000/WorkOut/' + id, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({endTime,TotalCalories: TotalCBurn})
      })
     
  }
  
  function getDifferenceInMinutes(startTime, endTime,CBurn ) {
    const diffInMs = Math.abs((endTime - startTime) * CBurn);
    return diffInMs / (1000 * 60); 
  }
  let workoutList = workouts.map((workout) => {

    return (

      <tr key={workout.id}>
        <th scope="row">{workout.id}</th>
        
        <td>{workout.Title}</td>
        <td>{workout.CBurn}</td>    
        <td>{workout.TotalCalories}</td>   
        {/* <td>{workout.action} */}

        <td><button onClick={() => deleteWorkouts(workout.id)} className='btn btn-danger'>Delete</button></td>
        <td><button onClick={() => LetsStart(workout.id)} className='btn btn-danger'>LetsGo</button></td>
        <td><button onClick={() => Stop(workout.id,workout.StartTime,workout.CBurn)} className='btn btn-secondary'>Stop</button></td>
        
        {/* </td> */}
        
      </tr>

    )

  })


  return (
    <table className="table">
      <thead>
        <tr>
         <th scope="col">Workout Id</th>
          <th scope="col">Title</th>
          <th scope="col">C-Burn</th>
          {/* <th scope="col">Action</th> */}
          <th scope="col">Total Calories</th>
        </tr>
      </thead>
      <tbody>
        {workoutList}
      </tbody>
    </table>
  )
}








