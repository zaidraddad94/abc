import React, { useCallback, useRef, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { getAllCountres, editCountry, deleteCountry, addCountry } from "./../../backend/backend_helper"
import { Button } from "reactstrap"

let columns = [{
  selector: 'no',
  name: 'no',
  sort: true,
}, {
  selector: 'name',
  name: 'Name',
  editable: true,
}, {
  selector: 'nameAR',
  name: 'Name arabic',
  editable: true,
}, {
  selector: 'flag',
  name: 'Flag',
  editable: true,
}, {
  selector: 'createAt',
  name: 'Create at',
}, {
  selector: 'currency',
  name: 'Currency',
  editable: true,
}, {
  selector: 'phoneCode',
  name: 'Phone Code',
  editable: true,
}, {
  selector: 'status',
  name: 'Status',
  editable: true,
}, {
  selector: 'timeZone',
  name: 'Time Zone',
  editable: true,
}, {
  selector: 'updateAt',
  name: 'Update At',
}
];

const EditableCell = ({ row, index, column, col, onChange }) => {
  const [value, setValue] = useState(row[column.selector]);

  const handleOnChange = e => {
    setValue(e.target.value);
    onChange?.(e);
  };

  if (column?.editing) {
    return (
      <input
        type={column.type || 'text'}
        name={column.selector}
        style={{ width: '100%' }}
        onChange={handleOnChange}
        value={value}
      />
    );
  }

  if (col.cell) {
    return col.cell(row, index, column);
  }
  return row[column.selector];
};

const CountresTable = ({ getCountries }) => {

  const [innerData, setInnerData] = useState([]);

  useEffect(() => {
    let mounted = true;
    getAllCountres()
      .then(items => {
        if (mounted) {
          console.log(items)
          setInnerData(items)
          getCountries.cb()
        }
      })
    return () => mounted = false;
  }, [getCountries.flag])

  const [editingId, setEditingId] = useState("");
  let formData = useRef({}).current;
  const isEditing = record => record === editingId;

  const formOnChange = event => {
    const nam = event.target.name;
    const val = event.target.value;

    formData = {
      ...formData,
      [nam]: val,
    };
  };

  const edit = record => {
    setEditingId(record);
  };

  const cancel = () => {
    setEditingId(null);
  };

  const save = item => {
    const payload = { ...item, ...formData };
    editCountry(payload, item._id).then(() => {
      getAllCountres()
        .then(items => {
          setInnerData(items)
          setEditingId(null);
        })
    })


  };


  const deleteRow = item => {
    const payload = { ...item, ...formData };
    deleteCountry(item._id).then(() => {
      getAllCountres()
        .then(items => {
          setInnerData(items)
          setEditingId(null);
        })
    })
  };

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      cell: (row, index, column) => {
        const editing = isEditing(index);
        return (
          <EditableCell
            row={row}
            index={index}
            column={{ ...column, editing }}
            col={col}
            onChange={formOnChange}
          />
        );
      },
    };
  });

  const createColumns = useCallback(() => {
    return [
      ...mergedColumns,
      {
        name: 'Actions',
        allowOverflow: true,
        minWidth: '200px',
        cell: (row, index, column, id) => {
          const editable = isEditing(id);
          if (editable) {
            return (
                <div
                  className="btn-group btn-group-lg"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button onClick={() => save(row)} color="primary"><i className="bx bx-save font-size-16 align-middle me-2"></i></Button>
                  <Button onClick={() => deleteRow(row)} color="primary"><i className="bx bx-trash font-size-16 align-middle me-2"></i></Button>
                  <Button onClick={cancel} color="primary"><i className="bx bx-exit font-size-16 align-middle me-2"></i></Button>
                </div>
            );
          }
          return <button
            type="button"
            className="btn btn-success  w-sm"
            onClick={() => edit(index)}
          >
            <i className="bx bx-pencil font-size-16 align-middle me-2"></i>{" "}
          Edit
        </button>
        },
      },
    ];
  }, [mergedColumns]);

  return (
    <DataTable
      responsive={true}
      overflowY={true}
      title=""
      columns={createColumns()}
      data={innerData}
      defaultSortField="title"
    />
  );
};

export default CountresTable
