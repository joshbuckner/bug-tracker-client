import React, { useEffect, useState } from "react";
import { AuthContext } from "../../App/App";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  const { state: authState } = React.useContext(AuthContext);
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => {
    const getEvents = async () => {
      // Default options are marked with *
      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          Authorization: authState.token,
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(authState.user),
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer" // no-referrer, *client
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      setEvents(json.data);
    };
    getEvents();
    // fetch("http://localhost:8080/api/events", {
    //   headers: {
    //     Authorization: `Bearer ${authState.token}`
    //   }
    // });
  }, [authState]);
  return (
    <div className="Dashboard">
      <h2>Dashboard</h2>
      <div className="Dashboard__installation">
        <div className="Dashboard__code-container">
          <h5 style={{margin: 0, display: "inline"}}>Access Token</h5>
          <div className="Dashboard__code"><pre><code>{authState.user.access_token}</code></pre></div>
        </div>
        <div className="Dashboard__code-container">
          <h5 style={{margin: 0, display: "inline"}}>Snippet</h5>
          <div className="Dashboard__code Dashboard__code--snippet"><pre><code>{`<script>window.onerror=async function(e,n,o,t,a){const s={date:new Date,message:e,file:n,line:o,column:t,error:a},c=await fetch("http://localhost:8080/api/event/${authState.user.access_token}",{method:"POST",body:JSON.stringify(s),headers:{"Content-Type":"application/json"}}),i=await c.json();console.log("Success:",i)};</script>`}</code></pre></div>
        </div>
      </div>
      <h4 style={{margin: "0 0 20px"}}>Event List</h4>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Message</th>
            <th className="mobile-hidden">File</th>
            <th style={{width: 40}}>Line</th>
            <th style={{width: 40}}>Column</th>
            <th className="mobile-hidden">Stack Trace</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.event_id}>
              <td>{new Date(event.date).toString()}</td>
              <td>{event.message}</td>
              <td className="mobile-hidden">{event.file}</td>
              <td>{event.line}</td>
              <td>{event.column}</td>
              <td className="mobile-hidden">{event.error ? event.error : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
