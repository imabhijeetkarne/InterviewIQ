import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App';
import Step3Report from '../components/Step3Report';

function InterviewReport() {
  const {id} = useParams()
  const [report,setReport] = useState(null);
   
  useEffect(()=>{
    const fetchReport = async () => {
      if (!id) {
        console.log("No interview ID provided");
        return;
      }

      try {
        console.log("Fetching report for interview ID:", id);
        console.log("API URL:", ServerUrl + "/api/interview/report/" + id);
        
        const result = await axios.get(ServerUrl + "/api/interview/report/" + id , {withCredentials:true})

        console.log("API Response:", result.data);
        console.log("Response status:", result.status);
        setReport(result.data)
      } catch (error) {
        console.log("Error fetching report:", error);
        console.log("Error response:", error.response?.data);
        console.log("Error status:", error.response?.status);
      }
    }

    fetchReport()
   }, [id])

    if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading Report...
        </p>
      </div>
    );
  }

  return <Step3Report report={report}/>
}

export default InterviewReport
