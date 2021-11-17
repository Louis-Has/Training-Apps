import axios from "axios";
import useSWR from "swr";
import moment from "moment";
import ContentEditable from "react-contenteditable";
import { useImmer } from "use-immer";
import { useInput, useDiv } from "../../hooks";
import { useEffect, useMemo } from "react";

export default function All({ scope, tip }) {
  const fetcher = (url) => axios.post(url).then((res) => res.data);
  const { data, error, mutate } = useSWR(`/todosData/:${scope}`, fetcher);

  let todayDate = moment().format("YYYY-M-D");

  let addTodoTitle = useInput();
  let addTodoDate = useInput(todayDate);

  let [currentTodo, setCurrentTodo] = useImmer();
  let [todosData, setTodosData] = useImmer([]);
  let title = useDiv("title", "标题", todosData, currentTodo, changeTodoData);
  let content = useDiv(
    "content",
    "描述",
    todosData,
    currentTodo,
    changeTodoData
  );

  useEffect(() => {
    setTodosData(data);
  });

  //切换的时候把 currentTodo 清零
  useMemo(() => setCurrentTodo(), [scope]);

  // console.log(todosData);
  if (error) return "failed to load";
  if (!todosData) return "loading";

  // useEffect(() => {
  //   axios.post(`/todosData/:${scope}`).then((res) => {
  //     // console.log(res.data);
  //     setTodosData(res.data);
  //   });
  // }, []);

  async function addtodo() {
    let todoitem = {
      title: addTodoTitle.value.value,
      date: addTodoDate.value.value,
    };
    try {
      await axios.post(`/todosData/:${scope}/addtodo`, todoitem).then((res) => {
        mutate();
      });
      addTodoTitle.setValue("");
      addTodoDate.setValue(todayDate);
    } catch (e) {
      console.log(e);
    }
  }

  async function changeTodoData(idx, att, val) {
    let todoitem = {
      todoId: todosData[idx].todoId,
      att: att,
      val: val,
    };
    try {
      await axios
        .post(`/todosData/:${scope}/changeTodoData/`, todoitem)
        .then(() => {
          mutate();
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function todoDate() {
    return isNaN(currentTodo) ? todayDate : todosData[currentTodo].date;
  }

  return (
    <div className="todosbar">
      <div className="todosmain">
        <h2>{tip}</h2>
        <div className="addtodo bar">
          <input
            type="text"
            placeholder="添加任务,回车即可保存"
            {...addTodoTitle.value}
            onKeyPress={(event) => {
              if (event.code === "Enter") addtodo();
            }}
          />
          <input type="date" {...addTodoDate.value} />
        </div>
        <div className="todos">
          {todosData.map((todo, idx) => (
            <div
              className={`${currentTodo === idx ? "active" : ""} todobar`}
              key={todo.todoId}
            >
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={(e) => {
                  changeTodoData(idx, "isDone", e.target.checked ? 1 : 0);
                }}
              />
              <span
                className="title"
                onClick={() => {
                  setCurrentTodo(idx);
                  console.log(idx);
                }}
              >
                {todo.title}
              </span>
              <span
                className="date"
                style={{ color: todo.date < todayDate ? "#C10913" : "" }}
              >
                {todo.date}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="detail">
        <input
          type="date"
          className="date"
          value={isNaN(currentTodo) ? todayDate : todosData[currentTodo].date}
          onChange={(e) => {
            changeTodoData(currentTodo, "date", e.target.value);
            console.log(e.target.value);
          }}
        />
        <ContentEditable {...title}></ContentEditable>
        <ContentEditable {...content}></ContentEditable>
        <ContentEditable
          className="selection"
          html={"收集箱"}
          disabled={isNaN(currentTodo) ? true : false}
        ></ContentEditable>
      </div>
    </div>
  );
}
