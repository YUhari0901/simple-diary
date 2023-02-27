import { useState } from "react";


const DiaryEditor = () =>{
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
  console.log(state);
  alert('저장성공!')
  }

  return (
  <div className="DiaryEditor">
    <h2>오늘의 일기</h2>
    <div>
      <input type="text" 
      name="autor"
      value={state.autor} 
      onChange={handleChangeState}/>
    </div>
    <div>
      <textarea 
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
export default DiaryEditor;