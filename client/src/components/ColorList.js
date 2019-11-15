import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        const updatedColors = colors.map(color => {
          if (color.id === colorToEdit.id) {
            return res.data
          } else {
            return color
          }
        })
        updateColors(updatedColors)
      })
      .catch(err => console.log('saveEdit error', err))
  };

  const deleteColor = colorToDelete => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${colorToDelete.id}`, colorToDelete.id)
      .then(res => {
        const deletedColor = colors.filter(color => {
          return colorToDelete.id !==color.id
        })
        updateColors(deletedColor)
      })
      .catch(err => console.log('delete error', err))
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/colors', colorToAdd)
      .then(res => updateColors(res.data))
      .catch(err => console.log('add color error', err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* <div className="spacer" /> */}
        <form onSubmit={addColor}>
          <legend>add color</legend>
            <label>
              color name:
              <input
                onChange={e =>
                  setColorToAdd({ ...colorToAdd, color: e.target.value })
                }
                value={colorToAdd.color}
              />
            </label>
            <label>
              hex code:
              <input
                onChange={e =>
                  setColorToAdd({
                    ...colorToAdd,
                    code: { hex: e.target.value }
                  })
                }
                value={colorToAdd.code.hex}
              />
            </label>
            <div className="button-row">
              <button type="submit">add</button>
              {/* <button onClick={() => setEditing(false)}>cancel</button> */}
            </div>
          </form>    
        </div>
  );
};

export default ColorList;
