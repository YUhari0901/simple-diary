import React,{ useEffect,useRef, useState } from "react";


const DiaryEditor = ({onCreate}) =>{
  useEffect(()=>{
    console.log("DiaryEditor 렌더");
  });

  const autorInput = useRef();
  const contentsInput =useRef();


  const [state, setState] =useState({
    autor:"",
    contents:"",
    emotion:"1"
  }
  )

  const handleChangeState = (e) =>{
    setState({
      ...state,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit =(e) =>{
    if(state.autor.length <1){
     autorInput.current.focus();
      //focus
    }
    if(state.contents.length<5){
      contentsInput.current.focus()
      //focus
    }

    onCreate(state.autor, state.contents, state.emotion);
    alert('저장성공!')
    setState({
      autor:"",
      contents:"",
      emotion:"1",
    })
  }

  return (
  <div className="DiaryEditor">
    <h2>오늘의 일기</h2>
    <div>
      <input 
      ref={autorInput}
      type="text" 
      name="autor"
      value={state.autor} 
      onChange={handleChangeState}/>
    </div>
    <div>
      <textarea 
      ref={contentsInput}
      name="contents"
      value={state.contents} 
      onChange={handleChangeState} />
    </div>
    <div>
      <select name="emotion" value={state.emotion} onChange={handleChangeState}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <div>
        <button onClick={handleSubmit}>
          일기 저장하기
        </button>
      </div>
    </div>
  </div>

  )
};
export default React.memo(DiaryEditor);