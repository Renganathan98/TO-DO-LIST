import { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { FcFullTrash } from "react-icons/fc";
import '../css/content.css'

const Content = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [taskDescription, setTaskDescription] = useState()
    const [editId, setEditID] = useState(0)
    const [tableData, setTableData] = useState([{
        "id": 1,
        "Task": "Create a to do list app",
        "Status": false
    }, {
        "id": 2,
        "Task": "Learn React",
        "Status": false
    }])



    const handleCheck = (id) => {
        const tableDataList = tableData.map((item) => {
            return (item.id === id ? { ...item, Status: !item.Status } : item)
        })

        setTableData(tableDataList)
    }

    const handleNewTskButton = () => {
        setIsModalOpen(!isModalOpen)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleTextareaChange = (e) => {
        setTaskDescription(e.target.value)
    }

    const handleDeleteTask = (id) => {
        setTableData(tableData.filter((task) => { return (task.id !== id) }))
    }

    const handleEditTask = (id) => {
        const editData = tableData.find((task) => { return (task.id === id) })
        setTaskDescription(editData.Task)
        setEditID(id)
        setIsModalOpen(true)
    }

    const handleSaveNewTask = () => {
        if (taskDescription?.length >= 1) {
            if (!editId) {
                const newTask = {
                    "id": tableData.length + 1,
                    "Task": taskDescription,
                    "Status": false
                }
                setTableData([...tableData, newTask])
            }
            else {
                const editedTask = tableData.map((task) => {
                    return (task.id === editId ? { ...task, Task: taskDescription } : task)
                })
                setTableData(editedTask)
                setEditID(0)
            }
            setTaskDescription('')
        }
        setIsModalOpen(false)
    }

    return (
        <>
            <div className="table_display">
                <div style={{ 'direction': 'rtl' }}>
                    <button className='button_style' onClick={() => handleNewTskButton()}>Add new task</button>
                </div>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <div>
                                <span className="close" onClick={() => closeModal()}>&times;</span>
                            </div>
                            <label><b>Task description</b></label>
                            <textarea className='modal-contect-input' value={taskDescription}
                                onChange={handleTextareaChange}></textarea>
                            <div style={{ 'direction': 'rtl' }}>
                                <button className='button_style' onClick={() => handleSaveNewTask()}>Save</button>
                            </div>
                        </div>
                    </div>
                )}
                {tableData.length ? <table>
                    <thead>
                        {tableData.length > 0 &&
                            <tr>
                                {Object.keys(tableData[0]).map((key) => { return (<th>{key}</th>) })}
                                <th>Action</th>
                            </tr>}
                    </thead>
                    <tbody>
                        {
                            tableData.map((row) => {
                                return (<tr key={row.id}>
                                    {Object.values(row).map((value,i) => {
                                        return (
                                            <td className={row?.Status===true && i ==1 ? "text-strike":""}>
                                                {typeof value === 'boolean' ? <input onChange={() => handleCheck(row.id)} type='checkbox' ></input> : value}
                                            </td>
                                        )
                                    })}
                                    <td >
                                        <span style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                            <FcFullTrash onClick={() => handleDeleteTask(row.id)} />
                                            <FaEdit onClick={() => handleEditTask(row.id)} />
                                        </span>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table> : <p style={{ 'display': 'flex', 'justifyContent': 'center', 'fontWeight': 'bold' }}>No task</p>}
            </div>
        </>
    )
}

export default Content