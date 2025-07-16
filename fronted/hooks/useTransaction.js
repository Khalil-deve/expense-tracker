import { useState, useEffect } from "react";

export default function useTransaction(type, shouldReload = false) {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await fetch(`/dash/${type}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // optional if used
        },
      });
      const json = await response.json();
      setData(json[`${type}`] || []);
    } catch (err) {
      console.error(`Failed to fetch ${type}:`, err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [shouldReload]);

  return [data, fetchData];
}
