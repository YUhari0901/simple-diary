import React, { useEffect, useRef, useState } from 'react';
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

function App() {
  const [data,setData]= useState ([])

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
      }
    })
    setData(initData);
  }

  useEffect(()=>{
    getData();
  },[])


  const onCreate = (autor,content,emotion) => {
    const created_date = new Date().getTime();
    const newItem ={
      autor,
      content,
      emotion,
      created_date,
      id:dataId.current,
    }
    dataId.current+=1;
    setData([newItem,...data])
  };

  const onRemove = (targetId) => {
  console.log(`${targetId}가 삭제되었습니다`)
  const newDiaryList = data.filter((it) => it.id !== targetId);
  setData(newDiaryList);
  }

  const onEdit = (targetId,newContent) =>{
    setData (
      data.map((it) => 
        it.id === targetId ? {...it,content:newContent}: it
      )
    )
  }
  return (
    <div className="App">
     <DiaryEditor onCreate={onCreate}/>
     <DiaryList diaryList ={data} onRemove={onRemove} onEdit={onEdit}/>
    </div>
  );
}

export default App;
