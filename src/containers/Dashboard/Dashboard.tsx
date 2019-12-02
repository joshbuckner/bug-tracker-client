import React, { useEffect, useState } from "react";
import Prism from "prismjs";
// @ts-ignore
import ReactTable from "react-table-v6";
import { AuthContext } from "../../App/App";
import "react-table-v6/react-table.css";
import "../../assets/prism.css"
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  const { state: authState } = React.useContext(AuthContext);
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => {
    Prism.highlightAll()
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
    // console.log(authState);
  }, [authState]);
  const formatTime = (iso:any) => {
    const date = new Date(iso); 
    return `${String(date.getMonth())}/${String(date.getDate())}/${String(date.getFullYear()).substring(2)} - ${String(date.getHours())}:${String(date.getMinutes())}:${date.getSeconds() > 9 ? String(date.getSeconds()) : '0' + String(date.getSeconds())}`
  }
  return (
    <div className="Dashboard">
      <h2>Dashboard</h2>
      <div className="Dashboard__installation">
        <div className="Dashboard__code-container">
          <h5 style={{margin: 0, display: "inline"}}>Access Token</h5>
          <div className="Dashboard__code-token"><pre><code>{authState.user.token}</code></pre></div>
        </div>
        <div className="Dashboard__code-container">
          <h5 style={{margin: 0, display: "inline"}}>Snippet</h5>
          <div className="Dashboard__code-snippet"><pre><code className="language-javascript">{`<script>window.onerror=async function(e,n,o,t,a){const s={date:new Date,message:e,file:n,line:o,column:t,error:a},c=await fetch("http://localhost:8080/api/event/${authState.user.access_token}",{method:"POST",body:JSON.stringify(s),headers:{"Content-Type":"application/json"}}),i=await c.json();console.log("Success:",i)};</script>`}</code></pre></div>
        </div>
      </div>
      <div className="Dashboard__table-container">
        <ReactTable
          data={events}
          columns={[
            {
              id: 'date',
              Header: 'Date',
              accessor: (d:any) => formatTime(d.date) // String-based value accessors!
            },
            {
              Header: 'Message',
              accessor: 'message'
            },
            {
              Header: 'File',
              accessor: 'file'
            },
            {
              Header: 'Line',
              accessor: 'line'
            },
            {
              Header: 'Column',
              accessor: 'column'
            },
            {
              id: 'error',
              Header: 'Stack Trace',
              accessor: (e:any) => e.error ? e.error : "N/A"
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    </div>
  );
};

export default Dashboard;
