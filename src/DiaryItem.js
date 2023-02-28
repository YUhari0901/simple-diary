import { useRef, useState } from "react";

const DiaryItem = 
({autor,
  content,
  emotion,
  created_date,
  id,
  onRemove,
  onEdit,
}) =>
  
{
  const [isEdit, setIsEdit] = useState(false);
  const localContentInput = useRef();
  const togleIsEdit = () => setIsEdit(!isEdit);
  const [localContent,setLocalContent] = useState (content);
  const handleRemove =() => {
    if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)){
      onRemove(id);
  }
  };
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content)
  }

  const handleEdit = () =>{
    if (localContent.length <5){
      localContentInput.current.focus();
      return;
    }
    if(window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)){
      onEdit(id, localContent)
      togleIsEdit();
    }
  }
 return <div className="DiaryItem">
  <div className="Info">
    <span>작성자 : {autor} | 감정 점수: {emotion} |</span>
    <br />
      <span className="date">{new Date(created_date).toLocaleString()}</span>
  </div>
  <div className="contents">
    {isEdit ? <><textarea ref={localContentInput} value={localContent} onChange={(e)=> setLocalContent(e.target.value)}/></> : <>{content}</>}
  </div>
    {isEdit? 
    <>
      <button onClick={handleQuitEdit}>수정취소</button>
      <button onClick={handleEdit}>수정완료</button>
    </> :
    <>
      <button onClick={handleRemove}>삭제하기</button>
      <button onClick={togleIsEdit}>수정하기</button>
    </> 
    }
</div>
}

export default DiaryItem; 