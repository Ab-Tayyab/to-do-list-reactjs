import React, { useState } from 'react'
import { Box, List, ListItem, OutlinedInput, ListItemText, InputAdornment, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import todo from './todo.png'

const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const [data, setData] = useState([])

    const onChangeHandler = (event) => {
        if(inputValue==null)
        {
            alert("Enter value")
        }
        else
        {

            setInputValue(event.target.value)
        }
    };

    const submitData = (data) => {
        setData((oldItems) => {
            return (
                [...oldItems, inputValue]
            )
        })
        data.preventDefault()
        setInputValue("")
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
                        onChange={onChangeHandler}
                        value={inputValue}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end">
                                    <AddIcon
                                        sx={{
                                            "&:hover": {
                                                color: 'red'
                                            }
                                        }}
                                        onClick={submitData} />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    
                </form>
            </Box>
            <Box sx={{
                width: "350px"
            }}>
                {
                    data.map((item, i) => {
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
                                                        setInputValue(item)
                                                        data.splice(i, 1)
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
                                                        data.splice(i, 1)
                                                        setData([...data])
                                                    }
                                                } />
                                        </IconButton>
                                    }>
                                    <ListItemText
                                        key={i}
                                        primary={item}
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