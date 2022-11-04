import React, {useState} from 'react'

export default function AddWorkout() {
    const [Title, setName] = useState('')
    const [CBurn, setcbpm] = useState('')
    const [message, setMessage] = useState('')

   
    const handleNameChange = (e) => {
        console.log('Change event.. ', e.target.value)
        setName(e.target.value)
        //setcbpm(e.target.value)
    }
    const AddWorkout = () => {
        console.log('Add ', Title , CBurn)
        //http post
        fetch('http://localhost:8000/WorkOut', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({Title , CBurn })
        })
        .then(res =>{
            console.log(res);
            if(res.status == 201){
                setMessage('Workout added successfully!')
            }
        })
      
    }
    return (
        <div>
            {message && <div class="alert alert-success" role="alert">
  {message}
</div>}
            
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">WorkOut</span>
                <input  type="text" value={Title} onChange={handleNameChange} className="form-control" placeholder="Enter name" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">CBurn</span>
                <input  type="number" value={CBurn} onChange={(e)=>setcbpm(e.target.value)} className="form-control" placeholder="Enter Calories" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            
            <div className="input-group mb-3">
               <button onClick={AddWorkout} className='btn btn-primary'>Add Workout</button>
            </div>
        </div>
    )
}
