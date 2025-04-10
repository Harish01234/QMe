'use client'
import React, { useState, useEffect } from 'react'
import { vapi } from '@/lib/vapi.sdk'

const Interview = () => {
  const [interviewStatus, setInterviewStatus] = useState('Waiting to start...')
  const [isInterviewActive, setIsInterviewActive] = useState(false)

  const startInterview = () => {
    try {
      vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!)
      setIsInterviewActive(true)
      setInterviewStatus('Interview in progress')
    } catch (error) {
      console.log('VAPI start error:', error)
      setInterviewStatus('Error starting interview')
    }
  }

  const endInterview = () => {
    try {
      vapi.stop()
      setIsInterviewActive(false)
      setInterviewStatus('Interview ended')
    } catch (error) {
      console.log('VAPI end error:', error)
    }
  }

  useEffect(() => {
    // Set up only the necessary event listeners
    vapi.on("call-start", () => {
      console.log("Call has started.")
      setInterviewStatus('Interview in progress')
      setIsInterviewActive(true)
    })
    
    vapi.on("call-end", () => {
      console.log("Call has ended.")
      setInterviewStatus('Interview ended')
      setIsInterviewActive(false)
    })
    
    // No error listener - we'll handle state changes through the call-end event
    
    // Clean up event listeners on component unmount
    return () => {
      vapi.removeAllListeners("call-start")
      vapi.removeAllListeners("call-end")
    }
  }, [])

  return (
    <div className="bg-violet-900 w-full h-screen flex flex-col items-center justify-center">
      <div className="bg-violet-800 p-10 rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <h1 className="text-5xl font-bold text-red-400 text-center mb-12">
          AI Mock Interview
        </h1>
        
        <div className="flex flex-col gap-4 mb-8">
          <button
            onClick={startInterview}
            disabled={isInterviewActive}
            className={`py-4 px-6 rounded-xl text-lg font-medium transition-all duration-300 ${
              isInterviewActive 
                ? 'bg-violet-700 text-violet-400 cursor-not-allowed' 
                : 'bg-violet-600 text-white hover:bg-violet-500 hover:shadow-lg'
            }`}
          >
            Start Interview
          </button>
          
          <button
            onClick={endInterview}
            disabled={!isInterviewActive}
            className={`py-4 px-6 rounded-xl text-lg font-medium transition-all duration-300 ${
              !isInterviewActive 
                ? 'bg-red-800 text-red-200 cursor-not-allowed' 
                : 'bg-red-600 text-white hover:bg-red-500 hover:shadow-lg'
            }`}
          >
            End Interview
          </button>
        </div>
        
        <div className="text-center mt-8 bg-violet-700 py-4 px-6 rounded-xl">
          <p className="text-lg font-medium text-white">
            Status: <span className="text-red-300">{interviewStatus}</span>
          </p>
        </div>
      </div>
      
      <div className="mt-10 text-violet-300 text-center px-4">
        <p>Your AI interviewer will guide you through the interview process.</p>
        <p>Speak clearly and take your time to answer the questions.</p>
      </div>
    </div>
  )
}

export default Interview