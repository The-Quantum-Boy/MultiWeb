
  
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";


import React , {useContext,useState,useEffect} from "react";
import { AppContext } from "../App";
export default function VoiceSearch() {

    const {setSearch,setSearchText} = useContext(AppContext)

    const commands = [
      {
        command: 'I would like to order',
        callback: () => console.log(`Your order is for`)
      },
      {
        command: 'The weather is :condition today',
        callback: (condition) => console.log(`Today, the weather is ${condition}`)
      },
      {
        command: 'My top sports are * and *',
        callback: (sport1, sport2) => console.log(`#1: ${sport1}, #2: ${sport2}`)
      },
      {
        command: 'Pass the salt (please)',
        callback: () => console.log('My pleasure')
      },
      {
        command: ['Hello', 'Hi'],
        callback: ({ command }) => console.log(`Hi there! You said: "${command}"`),
        matchInterim: true
      },
      {
        command: 'Beijing',
        callback: (command, spokenPhrase, similarityRatio) => console.log(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
        // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.2
      },
      {
        command: ['eat', 'sleep', 'leave','blogs'],
        callback: (command) => console.log(`Best matching command: ${command}`),
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.1,
        bestMatchOnly: true
      },
      {
        command: 'clear',
        callback: ({ resetTranscript }) => resetTranscript()
      }
    ]
    

    const {
      transcript,
      resetTranscript,
      listening,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition({commands});

    
    useEffect(() => {
      setSearchText(transcript)
      setTimeout(() => {
        if(!listening){
          setSearch(false)
          setSearchText('')
          // resetTranscript();
        }
      }, 1500);
    }, [listening, resetTranscript, setSearch, setSearchText, transcript])
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }


    const start = () =>{
        setSearch(true);
        // SpeechRecognition.startListening({ continuous: true });
        // console.log("Now listening...");
        // return () => {
        //   SpeechRecognition.stopListening();
        //   console.log("Stopped Listening");
        // };
        SpeechRecognition.startListening();
    }

    return (
      <div>
        
        <button onClick={start}>Start</button>
        
        {/* <button onClick={resetTranscript}>Reset</button> */}
        {/* <p>{transcript}</p> */}
      </div>
    );
  }
