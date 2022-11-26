import React, { useState } from 'react'
import { Box, List, ListItem, OutlinedInput, ListItemText, InputAdornment, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import todo from './todo.png'

const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const [data, setData] = useState([])
    const [error, setError] = useState("")

    const onChangeHandler = (event) => {
        setInputValue(event.target.value)
    };

    const submitData = (data) => {
        if (inputValue) {
            setError("")
            setData((oldItems) => {
                return (
                    [...oldItems, inputValue]
                )
            })
            data.preventDefault()
            setInputValue("")
        }
        else {
            setError("Please Enter your Task")
        }
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
                    <h1 style={{
                        color:"red"
                    }}>
                        {error}
                    </h1>
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