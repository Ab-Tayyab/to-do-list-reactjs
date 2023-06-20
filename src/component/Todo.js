import React, { useState } from 'react'
import { Box, List, ListItem, OutlinedInput, ListItemText, InputAdornment, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import todo from './todo.png'
import bg from './bg.webp'
import './Todo.css'
const Todo = () => {
    const [inputData, setInputData] = useState("")
    const [allData, setAllData] = useState([])
    const [toggleButton, setToggleButton] = useState(true)
    const [error, setError] = useState("")
    const [isEdit, setIsEdit] = useState(null)

    const submitData = (e) => {
        e.preventDefault()
        if (!inputData) {
            setError("Please enter your task")
        }
        else if (!toggleButton && inputData) {
            setAllData(
                allData.map((elem) => {
                    if (elem.id === isEdit) {
                        return { ...elem, name: inputData }
                    }
                    return elem
                })
            )
            setToggleButton(true)
            setInputData("")
            setIsEdit(null)
        }
        else {
            const newData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setAllData([...allData, newData])
            setInputData("")
            setError("")
        }
    }

    const edit = (item, i) => {
        const updatedItem = allData.find((ele) => {
            return ele.id == i;
        })
        console.log(updatedItem)
        setToggleButton(false)
        setInputData(item)
        setIsEdit(i)
    }

    return (
        <Box style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', minHeight: "100vh" }} >
            <Box className='todo-parent' >
                <Box className='first-child'>
                    <img className='img' src={todo} alt="image" />
                    <form>
                        <OutlinedInput className='input'
                            placeholder='Enter Your Task'
                            type="text"
                            name="name"
                            onChange={(e) => { setInputData(e.target.value) }}
                            value={inputData}
                            style={{
                                border: "1px solid white",
                                marginTop: "20px",
                                color: 'white',
                                '&::placeholder': {
                                    color: 'white',
                                },
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton edge="end" background="transparent">
                                        {
                                            toggleButton ?
                                                <AddIcon className='add-icone addd-icone' onClick={submitData} /> :
                                                <EditIcon className='edit-icone' onClick={submitData} />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            }
                        />

                        <h1 className='error'>{error}</h1>
                    </form>
                </Box>
                <Box sx={{
                    width: "350px"
                }}>
                    {
                        allData.map((item, i) => {
                            return (
                                <List className='list' >
                                    <ListItem className=''
                                        secondaryAction={
                                            <Box className='list-box'>
                                                < EditIcon className='edit-icone'
                                                    onClick={
                                                        () => {
                                                            edit(item.name, item.id)
                                                        }
                                                    } />
                                                <DeleteIcon className='add-icone dlt-icone'
                                                    onClick={
                                                        () => {
                                                            allData.splice(i, 1)
                                                            setAllData([...allData])
                                                        }
                                                    } />
                                            </Box>
                                        }>
                                        <ListItemText
                                            key={i}
                                            primary={item.name}
                                        />
                                    </ListItem>
                                </List>
                            )
                        })
                    }
                </Box>
            </Box>
        </Box >
    )
}
export default Todo