const canvasModel = require("../models/canvasmodel");

const getAllCanvas = async (req, res) => {
  const email = req.email;
  try {
    const canvases = await canvasModel.getAllCanvas(email);
    res.status(200).json(canvases);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const createCanvas = async (req, res) => {
  const email = req.email;
  const { name } = req.body;
  try {
    const newCanvas = await canvasModel.createCanvas(email, name);
    res.status(201).json(newCanvas);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const loadCanvas = async (req,res) => {
  const email = req.email;
  const id = req.params.id;
  try {
    const canvas = await canvasModel.loadCanvas(email, id);
    console.log(canvas);
    res.status(200).json(canvas);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

const updateCanvas = async (req,res)=>{
  const email = req.email;
  const id= req.params.id; 
  const {elements} = req.body;
  try {
    const canvas= await canvasModel.updateCanvas(email,id,elements);
    res.status(200).json(canvas);
  } catch (error) {
    res.status(400).json({message: error.message});

  }
}

module.exports = { getAllCanvas, createCanvas, loadCanvas, updateCanvas };
