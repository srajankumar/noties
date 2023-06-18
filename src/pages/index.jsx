import React from "react";

const Home = () => {
  const [textnotes, setTextnotes] = React.useState([]);
  const [textNotes, setTextNotes] = React.useState("");
  const [head, setHead] = React.useState("");
  const [textNotesEditing, setTextNotesEditing] = React.useState(null);
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

    const timestamp = new Date().toLocaleString();
    const newTextNotes = {
      id: new Date().getTime(),
      heading: head.trim(),
      text: textNotes.trim(),
      completed: false,
      timestamp: timestamp,
    };
    if (newTextNotes.text.length > 0 && newTextNotes.heading.length > 0) {
      setTextnotes([...textnotes].concat(newTextNotes));
      setTextNotes("");
      setHead("");
    } else {
      alert("Invalid title or body");
      setTextNotes("");
      setHead("");
    }
  }

  function deleteTextNotes(id) {
    let updatedTextnotes = [...textnotes].filter(
      (textNotes) => textNotes.id !== id
    );
    setTextnotes(updatedTextnotes);
    localStorage.setItem("textnotes", JSON.stringify(updatedTextnotes));
  }

  function submitEdits(id) {
    const updatedTextnotes = [...textnotes].map((textNotes) => {
      if (textNotes.id === id) {
        textNotes.text = editingText;
        textNotes.heading = editingHead;
      }
      return textNotes;
    });
    setTextnotes(updatedTextnotes);
    setTextNotesEditing(null);
  }

  function handleEditClick(textNotes) {
    setTextNotesEditing(textNotes.id);
    setEditingText(textNotes.text);
    setEditingHead(textNotes.heading);
  }

  return (
    <div className="main h-auto flex bg-slate-400 " id="note-list">
      <div className="lhs md:pt-0 pt-2 w-1/3 px-4">
        <h1 className="mainhead text-center py-5 md:p-5 text-[#efebe7] text-2xl font-bold ">
          Noties
        </h1>
        <form className="flex flex-col " onSubmit={handleSubmit}>
          <input
            className="inp p-2 rounded border-0 text-[#efebe7]"
            type="text"
            placeholder="Title"
            onChange={(e) => setHead(e.target.value)}
            value={head}
          />
          <div className="p-1"></div>
          <textarea
            className="inp textBody h-auto p-2 rounded text-[#efebe7]"
            type="text"
            placeholder="Body"
            onChange={(e) => setTextNotes(e.target.value)}
            value={textNotes}
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
        {textnotes.map((textNotes) => (
          <div
            key={textNotes.id}
            className="note rounded bg-slate-100 text-[#2a5d25] p-5 max-w-screen"
          >
            <div className="note-heading text-xl font-bold">
              {textNotes.id === textNotesEditing ? (
                <input
                  type="text"
                  className="w-full bg-transparent text-gray-900 px-1 "
                  placeholder="Edit Heading"
                  onChange={(e) => setEditingHead(e.target.value)}
                  value={editingHead}
                />
              ) : (
                textNotes.heading
              )}
            </div>
            <div className="py-1" />
            <div className="note-timestamp text-gray-500 text-xs">
              {textNotes.timestamp}
            </div>
            <div className="py-2" />
            <hr />
            <div className="py-2" />
            <div className="note-text break-words">
              {textNotes.id === textNotesEditing ? (
                <textarea
                  type="text"
                  className="w-full h-fit bg-transparent text-gray-900 px-1 "
                  placeholder="Edit TextNotes"
                  onChange={(e) => setEditingText(e.target.value)}
                  value={editingText}
                />
              ) : (
                <div className="pb-3">{textNotes.text}</div>
              )}
            </div>

            <div className="flex text-black justify-between textNotes-actions">
              {textNotes.id === textNotesEditing ? (
                <button
                  className="font-semibold"
                  onClick={() => submitEdits(textNotes.id)}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="font-semibold text-gray-900"
                  onClick={() => handleEditClick(textNotes)}
                >
                  Edit
                </button>
              )}

              <button
                className="font-semibold text-red-500"
                onClick={() => deleteTextNotes(textNotes.id)}
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
