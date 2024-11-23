import React, { useEffect, useState } from 'react'
import imageitem from '../Dataimages'

function Memorygame() {
    const [transform, setTransform] = useState(Array(imageitem.length).fill(0))
    const [firstclickid, setFirstclickid] = useState(null)
    const [firstclick, setFirstclick] = useState(null)
    const [secondclick, setsecondclick] = useState(null)
    const[ischecking,setIschecking]=useState(false)
    const[count,setcount]=useState(0)
    const[visibility,setVisibility]=useState('visible')
    const[visibile,setVisible]=useState('hidden')
    const handleclick = (i) => {
        if(ischecking||transform===180) return
        if(firstclick===null){
            setFirstclick(i)
        }
        else if(secondclick===null){
            setsecondclick(i)
        }
        setTransform((prev) => {
            const newTrans = [...prev]
            newTrans[i] = newTrans[i] = 180;
            return newTrans;
        })
    }
    
    const shuffleArray = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };
    const generateRandomPositions = () => {
        return shuffleArray(imageitem);
    };
    const [shuffledImages, setShuffledImages] = useState(generateRandomPositions());

    useEffect(()=>{
        if(firstclick!==null&&secondclick!==null){
         setIschecking(true)
         const firstid=shuffledImages[firstclick].id
         const secondid=shuffledImages[secondclick].id
        
        if(firstid===secondid){
            setIschecking(false)
            setFirstclick(null)
            setsecondclick(null)
            setcount(count+1)
        }
        else{
                setTimeout(()=>{
                    setTransform((prev) => {
                        const newTrans = [...prev]
                        newTrans[firstclick] =0;
                        newTrans[secondclick] =0;
                        return newTrans;
                        
                    })
                    setFirstclick(null)
                    setsecondclick(null)
                    setIschecking(false)
    
                },1000)
        }
        }
    },[firstclick,secondclick,shuffledImages,ischecking])
    useEffect(() => {
        if (count === 8) {
            setVisibility('hidden');
            setVisible('visible')
        }
    }, [count]);
    return (
        <>
            <div className='Scoredetail'>
                <span>
                    <h1 style={{ color: "#F9629F" }}>Memory Game For Fun</h1>
                </span>
            </div>
            <div className='hone'>
                <h1 className='h1' style={{visibility:`${visibile}`}}  >Game Over!!!!!</h1>
            </div>
            <div className="component" style={{visibility:`${visibility}`}}>
                {
                    shuffledImages.map((card, i) =>
                        <div className="cardholder" onClick={() => handleclick(i)}>

                            <div className="cardinner"
                                style={{
                                    transform: `rotateY(${transform[i]}deg)`,
                                }}>
                                <div className="cardback">
                                    <img src={card.image} alt="" />
                                </div>
                                <div className="cardfront">
                                </div>
                            </div>
                        </div>
                    )}

            </div>
        </>
    )
}

export default Memorygame