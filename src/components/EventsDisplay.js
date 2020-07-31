import React from "react"
import axios from 'axios'


const EventsDisplay = (props) => {
    // iterates over array of object (Calendar.js)
    let eventsList = props.events.map((event, i) => {
        let desc = ""
        if (event.description) {
            desc = event.description.replace(/(<([^>]+)>)/ig, '');
            desc = desc.replace(/&#39;/g, "'")
            desc = desc.replace(/&quot;/g, '')
        }

        let headerOptions = {
                'accept': 'application/json',
                'accept': 'text/json',
                'accept': 'text/javascript',
                'Content-Type': 'application/json'
            }   

        let handleClick = (e) => {
            
            console.log(`ping! ` + Object.keys(e))
            console.log(`e.target: ` + Object.keys(e.currentTarget))
            console.log(`event id is: ${event.id}`)
            axios.post(`${process.env.REACT_APP_API}/v1/favorites/testpost`, {id:`${event.id}`, location:`${event.venue}`, date:`${event.start_time}`,description:`${event.description}`}, {
                headers:headerOptions
            })
            // .then(res => res.json())
            .then(response => {
                console.log(`bingo bongo! `+ JSON.stringify(response.data))
                        })
            .catch(err => {
                console.error(err)
            })
        }
        // let handleClick = (e) => {
            
        //     console.log(`ping! ` + Object.keys(e))
        //     console.log(`e.target: ` + Object.keys(e.currentTarget))
        //     console.log(`event id is: ${event.id}`)
        //     fetch(`${process.env.REACT_APP_API}/v1/favorites/testpost`, {
        //         method:"POST",
        //         body: JSON.stringify({
        //             "id":"chocolates"
        //         }),
        //         headers:headerOptions
        //     })
        //     // .then(res => res.json())
        //     .then(response => {
        //         console.log(`bingo bongo! `+ JSON.stringify(response))
        //                 })
        //     .catch(err => {
        //         console.error(err)
        //     })
        // }
        
        return (
            //console.log('eventsList return: ' + i + event.id)
            <div class="card border mb-3" styles="max-width: 20rem;">
                <div class="card-header">{event.start_time}</div>
                <div class="card-body">
                    <h4 class="card-title">{event.title}</h4>
                    <p class="card-text">{event.venue_address}</p>
                    <p class="card-text">{desc}</p>
                    <button onClick={handleClick} className={`addButton`} id={`${event.id}`}>Add Event to Favorites</button>
                </div>
            </div>
        )
    })

    return (
        <div className="eventDisplay">
            {eventsList}
            {/* {eventsList} */}
        </div>
    );
}

export default EventsDisplay