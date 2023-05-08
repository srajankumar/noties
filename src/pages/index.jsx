import React from "react";

const Home = () => {
  const [textnotes, setTextnotes] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [head, setHead] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  const [editingHead, setEditingHead] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("textnotes");
    const loadedTextnotes = JSON.parse(json);
    if (loadedTextnotes) {
      setTextnotes(loadedTextnotes);
    }
  }, []);

  React.useEffect(() => {
    if (textnotes.length > 0) {
      const json = JSON.stringify(textnotes);
      localStorage.setItem("textnotes", json);
    }
  }, [textnotes]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      heading: head.trim(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 && newTodo.heading.length > 0) {
      setTextnotes([...textnotes].concat(newTodo));
      setTodo("");
      setHead("");
    } else {
      alert("Invalid title or body");
      setTodo("");
      setHead("");
    }
  }

  function deleteTodo(id) {
    let updatedTextnotes = [...textnotes].filter((todo) => todo.id !== id);
    setTextnotes(updatedTextnotes);
    localStorage.setItem("textnotes", JSON.stringify(updatedTextnotes));
  }

  function submitEdits(id) {
    const updatedTextnotes = [...textnotes].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
        todo.heading = editingHead;
      }
      return todo;
    });
    setTextnotes(updatedTextnotes);
    setTodoEditing(null);
  }

  function handleEditClick(todo) {
    setTodoEditing(todo.id);
    setEditingText(todo.text);
    setEditingHead(todo.heading);
  }

  return (
    <div className="main h-auto flex bg-slate-400 " id="todo-list">
      <div className="lhs md:pt-0 pt-2 bg-gray-800 w-1/3 px-4">
        <h1 className="mainhead text-center py-5 md:p-5 text-black text-xl md:text-3xl font-extrabold ">
          Noties
        </h1>
        <form className="flex flex-col " onSubmit={handleSubmit}>
          <input
            className="inp p-2 rounded text-black"
            type="text"
            placeholder="Title"
            onChange={(e) => setHead(e.target.value)}
            value={head}
          />
          <div className="p-1"></div>
          <textarea
            className="inp textBody h-auto p-2 rounded text-black"
            type="text"
            placeholder="Body"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button
            className="btn text-center md:text-base text-xs p-2 rounded my-4"
            type="submit"
          >
            Add new Note
          </button>
        </form>
      </div>

      <div className="rhs flex flex-wrap bg-slate-600 w-full md:p-16 pt-10">
        {textnotes.map((todo) => (
          <div
            key={todo.id}
            className="todo rounded bg-slate-100 text-black p-5 max-w-screen"
          >
            <div className="todo-heading text-xl font-bold">
              {todo.id === todoEditing ? (
                <input
                  type="text"
                  className="w-full bg-transparent text-gray-900 px-1 "
                  placeholder="Edit Heading"
                  onChange={(e) => setEditingHead(e.target.value)}
                  value={editingHead}
                />
              ) : (
                todo.heading
              )}
            </div>
            <div className="py-2" />
            <hr />
            <div className="py-2" />
            <div className="todo-text break-words">
              {todo.id === todoEditing ? (
                <textarea
                  type="text"
                  className="w-full h-fit bg-transparent text-gray-900 px-1 "
                  placeholder="Edit Todo"
                  onChange={(e) => setEditingText(e.target.value)}
                  value={editingText}
                />
              ) : (
                <div className="pb-3">{todo.text}</div>
              )}
            </div>

            <div className="flex justify-between todo-actions">
              {todo.id === todoEditing ? (
                <button
                  className="font-semibold"
                  onClick={() => submitEdits(todo.id)}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="font-semibold"
                  onClick={() => handleEditClick(todo)}
                >
                  Edit
                </button>
              )}

              <button
                className="font-semibold text-red-500"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
