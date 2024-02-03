import React, {   useEffect, useState } from 'react'
import Congratulation from './Congratulation';

export default function Home() {
    
    const [speakText,setSpeakText] = useState("")
    const [index,setIndex] = useState(0)
    const [message,setMessage] = useState(""); //this is the text(message) which is the textbox message
    const [voices,setVoices] = useState(null);
    const [currentVoice,setCurrentVoice] = useState(0);
    const [arrayWord,setArrayWord] = useState([]);
    const [done,setDone] = useState(false);
    const [sizeArray,setSizeArray] = useState(1e9);
    const [sentenceArray,setSentenceArray] = useState([]);
    const [sentence,setSentence] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://type.fit/api/quotes");
                const data = await response.json(); 
                const quotes = data.map(item => item.text);
                console.log(quotes);
                setSentenceArray(quotes)
                setLoading(true)
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(()=>{
        let i = Math.floor(Math.random() * sentenceArray.length)
        let temp = sentenceArray[i];
        
        if(temp !== undefined || temp != null){
            console.log('object:', temp)
            setSentence(temp.toLowerCase());
            setLoading(false)
        }
    },[sentenceArray])

    const msg = new SpeechSynthesisUtterance();

    //intial text in the speaking button    
    useEffect(() => {
        console.log("hello lakshya: ",sentence)
        const tempArray = sentence.split(' ').filter(word => word.trim() !== "");
        setArrayWord(tempArray);
        console.log(tempArray);
        console.log('this is the speak array: ',arrayWord)
      }, [sentence]);


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
    

    useEffect(()=>{
        speakFunction(msg)
      },[speakText])

    

    const currentCharcter = ()=>{
        console.log('this is the current charcter index:',index)
        setIndex(index+1);
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
            speakFunction(msg);
            // setMessage(""); // It will clear all the text if there is any error
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
    

    const speakFunction = (msg)=>{
        console.log(index)
        // let text = speakText !== null ? speakText : "";
        let text = "";

        if(speakText !== null && speakText !== ''){
            text= speakText;     
        }
        else{
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
                <div className="mb-3">
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
                    <button type="button" className="btn btn-primary m-3" onClick={()=>{ speakFunction(msg)}}>Replay</button>
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
