import React, { useEffect, useState } from "react";
import Prism from "prismjs";
// @ts-ignore
import ReactTable from "react-table-v6";
import { AuthContext } from "../../App/App";
import "react-table-v6/react-table.css";
import "../../assets/prism.css"
import "./Dashboard.scss";

interface Events {
  [index: number]: Event
}

interface Event {
  column: string;
  date: string;
  error: null | string;
  event_id: number;
  file: string;
  line: string;
  message: string;
  user_id: number;
}

const Dashboard: React.FC = () => {
  const { state: authState } = React.useContext(AuthContext);
  const [events, setEvents] = useState<Events>([]);
  useEffect(() => {
    Prism.highlightAll()
    const getEvents = async () => {
      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Authorization: authState.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(authState.user),
        redirect: "follow",
        referrer: "no-referrer"
      });
      const json = await response.json();
      setEvents(json.data);
    };
    getEvents();
  }, [authState]);
  const formatTime = (iso: string) => {
    const date = new Date(iso); 
    return `${String(date.getMonth())}/${String(date.getDate())}/${String(date.getFullYear()).substring(2)} - ${String(date.getHours())}:${String(date.getMinutes())}:${date.getSeconds() > 9 ? String(date.getSeconds()) : '0' + String(date.getSeconds())}`
  }
  return (
    <div className="Dashboard">
      <h2>Dashboard</h2>
      <div className="Dashboard__installation">
        <div className="Dashboard__code-container">
          <h5>Access Token</h5>
          <div className="Dashboard__code-token">
            <pre><code>{authState.user.token}</code></pre>
          </div>
        </div>
        <div className="Dashboard__code-container">
          <h5>Snippet</h5>
          <div className="Dashboard__code-snippet">
            <pre><code className="language-javascript">{`<script>window.onerror=async function(e,n,o,t,a){const s={date:new Date,message:e,file:n,line:o,column:t,error:a},c=await fetch("http://localhost:8080/api/event/${authState.user.token}",{method:"POST",body:JSON.stringify(s),headers:{"Content-Type":"application/json"}}),i=await c.json();console.log("Success:",i)};</script>`}</code></pre>
          </div>
        </div>
      </div>
      <div className="Dashboard__table-container">
        <ReactTable
          data={events}
          columns={[
            {
              id: 'date',
              Header: 'Date',
              accessor: (d: { date: string}) => formatTime(d.date)
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
              accessor: (e: { error: string}) => e.error ? e.error : "N/A"
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
