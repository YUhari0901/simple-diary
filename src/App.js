import React, {useMemo, useEffect, useRef, useCallback, useReducer } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


// https:jsonplaceholder.typicode.com/comments

// const dummyList = [
// {
//   id:1,
//   autor:"로이",
//   contents:"터그 놀이 해줘",
//   emotion:5,
//   created_date: new Date().getTime(),
// },

// {
//   id:2,
//   autor:"페가수스",
//   contents:"놀아줘",
//   emotion:3,
//   created_date: new Date().getTime(),
// },
// {
//   id:3,
//   autor:"델크리스토",
//   contents:"간식줘",
//   emotion:5,
//   created_date: new Date().getTime(),
// },
// {
//   id:4,
//   autor:"로이 파라다",
//   contents:"누나 무릎 최고",
//   emotion:5,
//   created_date: new Date().getTime(),
// }
// ]
const reducer = (state,action) =>{
  switch(action.type){
    case 'INIT':{
      return action.data
    }
    case 'CREATE':{
      const created_date =new Date().getTime();
      const newItem={
        ...action.data,
        created_date
      }
      return [newItem, ...state]
    }
    case 'REMOVE':{
      return state.filter((it) => it.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map ((it) =>  it.id === action.targetId ? {...it,content:action.newContent}: it)
    }
    default : 
    return state; 
  }
}

function App() {
  // const [data,setData]= useState ([])

  const [data, dispatch]= useReducer(reducer, [])


  const dataId = useRef (0);

  const getData =async() =>{
    const res = await fetch ("https://jsonplaceholder.typicode.com/comments").then((res) => res.json());

    const initData = res.slice(0, 20).map((it)=>{
      return {
        autor:it.email,
        content:it.body,
        emotion:Math.floor(Math.random()*5)+1,
        created_date:new Date().getTime(),
        id:dataId.current++ 
      };
    });
    dispatch({type:'INIT', data: initData});
  };

  useEffect(()=>{
    getData();
  },[])


  const onCreate = useCallback((autor,content,emotion) => {
    dispatch({type:'CREATE', data:{autor,content,emotion,id:dataId.current}})
    const created_date = new Date().getTime();
    dataId.current+=1;

  },[]);

  const onRemove = useCallback((targetId) => {
    dispatch ({type:'REMOVE', targetId})
    },[])

  const onEdit = useCallback((targetId,newContent) =>{
    dispatch ({type:'EDIT', targetId, newContent})
   },[])

const getDiaryAnalysis = useMemo(() => 
{
  console.log("일기 분석 시작!");

  const goodCount = data.filter((it)=>it.emotion >= 3).length;
  const badCount =data.length -goodCount;
  const goodRation = (goodCount / data.length) * 100;
  return {goodCount,badCount,goodRation};
},[data.length]);

const {goodCount, badCount,goodRation } = getDiaryAnalysis;


  return (
    <div className="App">
     <DiaryEditor onCreate={onCreate}/>
     <div>전체 일기: {data.length}</div>
     <div>기분 좋은 일기 개수: {goodCount}</div>
     <div>기분 나쁜 일기 개수: {badCount}</div>
     <div>기분 좋은 일기 비율: {goodRation}</div>
    <DiaryList diaryList ={data} onRemove={onRemove} onEdit={onEdit}/>
    </div>
  );
}

export default App;
