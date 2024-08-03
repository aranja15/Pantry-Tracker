'use client'
import Image from "next/image";
import {useState, useEffect} from "react";
import {firestore} from "@/firebase";
import {Box, Typography, Modal, Stack, TextField, Button} from "@mui/material";
import {collection, deleteDoc, doc, getDocs, query, getDoc, setDoc} from "firebase/firestore";
import {palette} from "@mui/system"

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState()
  const [itemName, setItemName] = useState('')

  const updateDatabase = async () => {
    const snapshot = query(collection(firestore, 'Inventory'))
    const doc = await getDocs(snapshot)
    console.log(doc)
    const inventoryList = []
    doc.docs.map(doc => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    });
    setInventory(inventoryList)
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'Inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const{Quantity} = docSnap.data()
      if(Quantity === 1) {await deleteDoc(docRef)}
      else {await setDoc(docRef, {Quantity: Quantity - 1})}
    }
    await updateDatabase()
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'Inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const{Quantity} = docSnap.data()
      await setDoc(docRef, {Quantity: Quantity + 1})
    }
    else {
      await setDoc(docRef, {Quantity: 1})
    }
    await updateDatabase()
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    updateDatabase()
  }, [])

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2} >
      <Typography variant='h1'>
        Pantry Tracker
      </Typography>
      <Modal open={open} onClose={handleClose}> 
        <Box position = "absolute" 
        top = "50%" 
        left = "50%" 
        sx = {{transform : "translate(-50%,-50%)"}}
        width = {400} 
        bgcolor = "white" 
        border = "3px solid #000" 
        boxShadow = {24} 
        p = {4} 
        display = "flex" 
        flexDirection = "column" 
        gap = {3}>
          <Typography variant = "h5">Add Pantry Item</Typography>
          <Stack width = "100%" direction = "row" spacing = {2}>
            <TextField
            variant="outlined"
            fullWidth
            valur = {itemName}
            onChange = {(e)=>setItemName(e.target.value)}
            />
            <Button 
            variant="contained"
            color = "inherit"
            onClick = {()=>{addItem(itemName) 
              setItemName('') 
              handleClose()}}>
                Add
              </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="outlined"  onClick={()=>{handleOpen()}}>
        Add New Item
      </Button>
      <Box border = "2px solid #333">
        <Box 
        width="800px"
        height = "100px"
        bgcolor="#0390fc"
        alignItems="center"
        justifyContent="center"
        display="flex"
        >
          <Typography variant = "h2" >Pantry Items</Typography>
        </Box>
      <Stack width = "800px" height = "300px" spacing = {2} overflow="auto">
        {
          inventory.map(({name, Quantity})=>(
            <Box 
            key={name} 
            width="100%"
            minHeight="150px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="white"
            padding={4}
            >
              <Typography variant = "h3" textAlign="center">
                {name}
              </Typography>
              <Typography variant = "h3"  textAlign="center">
                {Quantity}
              </Typography>
              <Stack direction = "row" spacing = {2}>
                <Button variant="contained" color="success" onClick={()=>{addItem(name)}}>+</Button>
                <Button variant="contained" color="error" onClick={()=>{removeItem(name)}}>-</Button>
              </Stack>
            </Box>
          ))}
      </Stack>
      </Box>
    </Box>
  );
}
