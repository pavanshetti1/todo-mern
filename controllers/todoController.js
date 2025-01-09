import todoModel from "../models/todoModel.js";

export const createTodo = async (req, res)=>{
    const {text} = req.body;

    try {
        const newTodo = await todoModel.create({
            text,
            user:req.user._id
        });
        res.status(200).json({message: "Todo created successfully", newTodo});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Error occured in todo creation"});
    }
}

export const getTodo = async (req, res)=>{
    try {
        const todos = await todoModel.find({ user:req.user._id }).sort({createdAt : -1});
        res.status(200).json({message: "Todos fetched successfully", todos});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Error occured in todo fetching"});
    }
}

export const updateTodo = async (req, res)=>{
    try {
        const todo = await todoModel.findByIdAndUpdate(req.params.id, req.body, {new : true});
        res.status(200).json({message: "Todos updated successfully", todo});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Error occured in todo updation"});
    }
}

export const deleteTodo = async (req, res)=>{
    try {
        const todo = await todoModel.findByIdAndDelete(req.params.id);
        if(!todo){
            return res.status(400).json({message: "Todo doesnot exists"});
        }
        res.status(200).json({message: "Todos deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Error occured in todo updation"});
    }
}