import React, { useState } from 'react'
import { Box, List, ListItem, OutlinedInput, ListItemText, InputAdornment, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import todo from './todo.png'

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
        <div style={{
            width: "350px",
            margin: "auto",
            marginTop: "50px"
        }}>
            <Box sx={{
                width: "350px"
            }}>
                <img src={todo} alt="" width="350" />
                <form>
                    <OutlinedInput
                        sx={{
                            width: "350px"
                        }}
                        placeholder='Enter Your Task'
                        type="text"
                        name="name"
                        onChange={(e) => { setInputData(e.target.value) }}
                        value={inputData}

                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end">
                                    {
                                        toggleButton ?
                                            <AddIcon
                                                sx={{
                                                    "&:hover": {
                                                        color: 'red'
                                                    }
                                                }}
                                                onClick={submitData} /> : <EditIcon
                                                sx={{
                                                    "&:hover": {
                                                        color: 'red'
                                                    }
                                                }}
                                                onClick={submitData} />
                                    }
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                    <h1 style={{
                        color: "red"
                    }}>
                        {error}
                    </h1>
                </form>
            </Box>
            <Box sx={{
                width: "350px"
            }}>
                {
                    allData.map((item, i) => {
                        return (
                            <List sx={{
                                background: "blue",
                                color: "white",
                                marginBottom: "5px",
                                "&:hover": {
                                    color: 'red',
                                    background: "black"
                                }
                            }}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end"
                                            sx={{
                                                width: "80px",
                                                justifyContent: "space-between",
                                            }}>
                                            <EditIcon
                                                sx={{
                                                    color: "white",
                                                    "&:hover": {
                                                        color: 'red'
                                                    }
                                                }}
                                                onClick={
                                                    () => {
                                                        edit(item.name, item.id)
                                                    }
                                                } />
                                            <DeleteIcon
                                                sx={{
                                                    color: "white",
                                                    "&:hover": {
                                                        color: 'red'
                                                    }
                                                }}
                                                onClick={
                                                    () => {
                                                        allData.splice(i, 1)
                                                        setAllData([...allData])
                                                    }
                                                } />
                                        </IconButton>
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
        </div>
    )
}
export default Todo