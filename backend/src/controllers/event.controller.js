import { Event } from "../models/events.model.js";

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
     
      duration,
      venue,
      date,
      available_seats,
    } = req.body;

    const { category_id} = req.params;

const category = category_id;
    

    if (
      !title ||
      !description ||
      !category ||
      !duration ||
      !venue ||
      !date ||
      !available_seats
    ) {
      return res.status(400).json({
      
        message: "All fields are required",
      });
    }


    let categoryDoc = await Event.findById(category);

    const newEvent = {
      title,
      description,
      category,
      duration,
      venue,
      date,
      available_seats,
    };

    if (categoryDoc) {

      categoryDoc.categories.push(newEvent);
      await categoryDoc.save();
    } else {

      categoryDoc = await Event.create({
        category_name: category,
        categories: [newEvent],
      });
    }

    res.status(201).json({ 
      message: "Event created successfully",
      data: categoryDoc,
    });
  } catch (error) {
    console.error("Create Event Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const { category_id } = req.body;

    const updatedEvent = await Event.findOneAndUpdate(
      { "categories._id": category_id }, 
      {
        $set: {
          "categories.$.title": req.body.title,
          "categories.$.description": req.body.description,
          "categories.$.category": req.body.category,
          "categories.$.duration": req.body.duration,
          "categories.$.venue": req.body.venue,
          "categories.$.date": req.body.date,
          "categories.$.available_seats": req.body.available_seats,
        },
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteEvent = async (req, res) => {
  try {
    const { category_id } = req.params;

    const deletedEvent = await Event.findOneAndUpdate(
      { "categories._id": category_id },
      {
        $pull: {
          categories: { _id: category_id },
        },
      },
      { new: true }
    );

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const { category_id } = req.params;

    const deletedCategory = await Event.findByIdAndDelete(category_id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const updateCategoryName = async (req, res) => {
  try {
    const { category_id } = req.params;
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const updatedCategory = await Event.findByIdAndUpdate(
      category_id,
      { category_name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
 
        message: "Category not found",
      });
    }

    res.status(200).json({
 
      message: "Category name updated successfully",
      data: updatedCategory,
    });
  } catch (error) {

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Category name already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 

export const addCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    const name = category_name.category_name;
    


    if (!name ) {
      return res.status(400).json({
        message: "Category name is required"
      });
    }


    const existingCategory = await Event.findOne({
      category_name:name
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "Category already exists"
      });
    }


    const category = await Event.create({
      category_name: name,
      categories: []
    });

    return res.status(201).json({
      message: "Category created successfully",
      category
    });
  } catch (error) {
    console.error("Add category error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};



export const getAllCategories = async (req, res) => {
    try {
      const data = await Event.find();
  
      res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch data",
        error: error.message,
      });
    }
  };