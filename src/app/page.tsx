
"use client";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import React, { useEffect } from "react";
import fetch from "node-fetch";

function getUserData() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/data").then((res) => {
      const data = res.json();
      
      data.then((res) => {
        resolve(res);
      });
    });
  });
}

export default function Home() {
  
  const data = getUserData().then((res) => {
    return res;
  });
  
  const [ state, setState ] = React.useState(data);

  useEffect(() => {
    const interval = setInterval(() => {
      getUserData().then((res) => {
        console.log(res);
        
        setState(res as any);
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-5">
      <Navbar userData={state} />
      <Sidebar userData={state} />
    </main>
  )
}
