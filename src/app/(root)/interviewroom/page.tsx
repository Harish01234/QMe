'use client'

import React, { useEffect, useState } from 'react'
import { vapi } from '@/lib/vapi.sdk' // adjust the import if needed

const Interview = () => {
  const [interviewStatus, setInterviewStatus] = useState('Waiting to start...')
  const [isInterviewActive, setIsInterviewActive] = useState(false)
  const [transcripts, setTranscripts] = useState<string[]>([])

  const startInterview = () => {
    try {
      vapi.start({
        transcriber: {
          provider: 'deepgram',
          model: 'nova-2',
          language: 'en-US',
        },
        model: {
          provider: 'openai',
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.',
            },
          ],
        },
        voice: {
          provider: 'playht',
          voiceId: 'jennifer',
        },
        name: 'My Inline Assistant',
      })

      setIsInterviewActive(true)
      setInterviewStatus('Interview in progress')
    } catch (error) {
      console.error('VAPI start error:', error)
      setInterviewStatus('Error starting interview')
    }
  }

  const endInterview = () => {
    try {
      vapi.stop()
      setIsInterviewActive(false)
      setInterviewStatus('Interview ended')
    } catch (error) {
      console.error('VAPI end error:', error)
    }
  }

  useEffect(() => {
    const handleMessage = (message: any) => {
      console.log('VAPI message:', message)

      if (message.type === 'conversation-update' && Array.isArray(message.conversation)) {
        const formattedTranscript: string[] = []

        message.conversation.forEach((item: any) => {
          if (item.role === 'user') {
            formattedTranscript.push(`User: ${item.content}`)
          } else if (item.role === 'assistant') {
            formattedTranscript.push(`Assistant: ${item.content}`)
          }
        })

        setTranscripts(formattedTranscript)
      }
    }

    const handleCallStart = () => {
      console.log('Call has started.')
      setInterviewStatus('Interview in progress')
      setIsInterviewActive(true)
    }

    const handleCallEnd = () => {
      console.log('Call has ended.')
      setInterviewStatus('Interview ended')
      setIsInterviewActive(false)
    }

    vapi.on('message', handleMessage)
    vapi.on('call-start', handleCallStart)
    vapi.on('call-end', handleCallEnd)

    return () => {
      vapi.removeAllListeners('message')
      vapi.removeAllListeners('call-start')
      vapi.removeAllListeners('call-end')
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

      <div className="bg-violet-800 mt-6 p-6 rounded-xl max-w-xl w-full text-white">
        <h2 className="text-xl font-bold mb-4 text-red-300">Transcript</h2>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {transcripts.map((line, index) => (
            <p key={index} className="text-sm whitespace-pre-wrap">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Interview
