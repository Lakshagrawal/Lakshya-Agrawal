import React, {   useEffect, useState } from 'react'
import Congratulation from './Congratulation';
import {easy_words,hard_words,medium_words} from "../Data"

export default function Home({level}) {
    // console.log(medium_words)
    const [speakText,setSpeakText] = useState("") // word which we have to write
    const [index,setIndex] = useState(0) // at which index in the arrayWord which is speaking
    const [message,setMessage] = useState(""); //this is the text(message) which is the textbox message
    const [voices,setVoices] = useState(null);
    const [currentVoice,setCurrentVoice] = useState(0);
    const [mistakeSay,setMistakeSay] = useState(false);
    const [done,setDone] = useState(false);
    const [arrayWord,setArrayWord] = useState([]);
    const [sizeArray,setSizeArray] = useState(1e9);
    const [loading, setLoading] = useState(false);
    
    const makingArray = async(level)=>{
        let i = 0;
        let array = [];
        let n = 0;
        let quotes = [];
        
        if(level === 1){
            console.log(easy_words)
            array = easy_words;
            n = easy_words.length; // Change easy_words.length() to easy_words.length
            i = Math.floor(Math.random() * (n - 10)); // Use Math.floor to get an integer value
            for(let j = i; j < Math.min(i + 10, easy_words.length); j++){
                quotes.push(array[j]);
                console.log("object "+quotes)
            }
            console.log(quotes);
            setLoading(true);
        }
        else if(level === 2){
            array = medium_words;
            n = array.length;
            i = Math.floor(Math.random() * (n - 10));

            for(let j=i;j<Math.min(i+10,n);j++){
                quotes.push(array[j]);
            }
            console.log(quotes);
            setLoading(true)
        }
        else if(level === 3){
            array = hard_words;
            n = array.length;
            i = (Math.random()*(n-10));
            
            for(let j=i;j<Math.min(i+10,n);j++){
                quotes.push(array[j]);
            }
            console.log(quotes);
            setLoading(true)
        }

        if(quotes !== undefined || quotes != null || quotes.length === 0){
            console.log('object:', quotes)
            setArrayWord(quotes);
            setLoading(false)
        }
    }

    //collecting sentences from the api what to update the code and logic
    useEffect(() => {
        const fetchData = async () => {
            try {
                makingArray(level)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
        // eslint-disable-next-line
    }, []);





    useEffect(()=>{
        if(index < sizeArray)
            setSpeakText(arrayWord[index]);
        else{
            console.log("size of array**: ",index," size of array", sizeArray)
            setDone(true)
        }
        if(arrayWord.length !== 0)
            setSizeArray(arrayWord.length);
        
    },[index,arrayWord,sizeArray])
    

    // if you update speakText then it is going to
    useEffect(()=>{
        speakFunction()
        // eslint-disable-next-line
      },[speakText])

    

    const currentCharcter = ()=>{
        console.log('this is the current charcter index:',index)
        setIndex(index+1);
        setMistakeSay(true)
        //Updating the index value if speakText === message you have write
        console.log("this is the index hello guys, ",index)
    }


    const updateText = (event)=>{
        let messageText = event.target.value;

        console.log('You have type: ',messageText)

        let flag = 0;
        let sz = messageText.length;

        for(let j=0;j<sz;j++){
            if(messageText[j] !== speakText[j]) {
                flag = 1;
                break;
            }
        }
        console.log('flag value: ',flag);

        let speakSize = speakText.length;

        if(flag === 1){
            if(mistakeSay){
                setMistakeSay(false)
                speakFunction();
            }
        }
        else if((sz === speakSize) && (messageText === speakText) ){
            console.log("have find equal")
            currentCharcter(); //************next character ko banana hai */
            setMessage("");
        }else{
            setMessage(messageText);
        }
    }
    
    

    useEffect(() => {
        const handleVoicesChange = () => {
            // When voices change, get the updated list of voices
            const allVoices = window.speechSynthesis.getVoices();
            // console.log('All Voices:', allVoices);
      
            // You may want to update the state with the new voices list
            setVoices(allVoices);
          };
      
          // Attach the event listener
          window.speechSynthesis.onvoiceschanged = handleVoicesChange;
      
          // Clean up the event listener when the component unmounts
          return () => {
            window.speechSynthesis.onvoiceschanged = null;
          };
      }, []);

    
      useEffect(() => {
        // Log the current state of voices when it changes
        // console.log('Updated Voices:',voices);
        // console.log("Current Choose Voices is ",currentVoice)
       console.log('this is the index printing',index)
       console.log("this is the speakText: ",speakText)
      }, [voices,currentVoice,index,speakText]);
    

    const speakFunction = ()=>{
        const msg = new SpeechSynthesisUtterance();
        console.log(index)
        // let text = speakText !== null ? speakText : "";
        let text = "";

        if(speakText !== null && speakText !== ''){
            text= speakText;     
        }else{
            text= "Text empty";    
        }

        try {
            msg.text = text;
            msg.voice = voices[currentVoice];
            window.speechSynthesis.speak(msg)    
            
        } catch (error) {
            console.log("this is the error in speaking text")
            console.log(error)
        }
        
    }

    if(!done)
    {
        return !loading?(
            <div>
                <div className="mb-3 container">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label m-3"><h1>Write your text</h1></label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" value={message || ''} onChange={updateText} rows="10"></textarea>
                    {/* <!-- Example single danger button --> */}
                    <div className="btn-group">
                    <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown"  aria-expanded="false">
                    <i className="fa-solid fa-language"></i> Language
                    </button>
                    <ul className="dropdown-menu">
                        {voices==null?"this is not ":
                            voices.map((e,i)=>
                                <li key={i} className="dropdown-item" onClick={()=>setCurrentVoice(i)} >{e.voiceURI}</li>
                            )
                        }
                        {/* <li><a className="dropdown-item" href="/">{}</a></li> */}
                    </ul>
                    </div>
                    <button type="button" className="btn btn-primary m-3" onClick={()=>{ speakFunction()}}>Replay</button>
                </div>
            </div>
        )
        :<div>Loading please wait</div>
    }
    else{
        return(
           <Congratulation></Congratulation>
        )
    }
}
