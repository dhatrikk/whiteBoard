const mongoose = require("mongoose");

const canvasSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    elements: {
      type: [{ type: mongoose.Schema.Types.Mixed }],
    },
    sharedwith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    timestamps: true,
    collection: "Canvas",
  }
);

canvasSchema.statics.getAllCanvas = async function (email) {
  const user = await mongoose.model("Users").findOne({ email: email });
  if (!user) {
    throw new Error("User not found");
  }
  const canvases = await this.find({
    $or: [{ sharedwith: user._id }, { owner: user._id }],
  });
  if (!canvases) {
    throw new Error("Canvas not found");
  }
  return canvases;
};

canvasSchema.statics.createCanvas = async function (email, name) {
  const user = await mongoose.model("Users").findOne({ email: email });
  if (!user) {
    throw new Error("User not found");
  }
  const newUser = await new this({
    owner: user._id,
    name: name,
    elements: [],
    sharedwith: [],
  }).save();
  return newUser;
};

canvasSchema.statics.loadCanvas = async function (email, id) {
  const user = await mongoose.model("Users").findOne({ email: email });
  if (!user) {
    throw new Error("User not found");
  }
  const canvas = await this.findOne({
    _id: id,
    $or: [{ sharedwith: user._id }, { owner: user._id }],
  });
  if (!canvas) {
    throw new Error("Canvas not found");
  }
  return canvas;
};

canvasSchema.statics.updateCanvas = async function (email, id, elements) {
  const user = await mongoose.model("Users").findOne({ email: email });
  if (!user) {
    throw new Error("User not found");
  }
  const canvas = await this.findOne({
    _id: id,
    $or: [{ owner: user._id }, { sharedwith: user._id }],
  });
  if (!canvas) {
    throw new Error("Canvas not found");
  }
  canvas.elements = elements;
  const updatedCanvas = await canvas.save();
  return updatedCanvas;
};

canvasSchema.statics.deleteCanvas = async function (email, id) {
  const user = await mongoose.model("Users").findOne({ email: email });
  if (!user) {
    throw new Error("User not found");
  }
  const canvas = await this.findOneAndDelete({
    _id: id,
    $or: [{ owner: user._id }, { sharedwith: user._id }],
  });
  if (!canvas) {
    throw new Error("Canvas not found");
  }
  return canvas;
};

canvasSchema.statics.shareCanvas = async function (email, id, shareEmail) {
  const user = await mongoose.model("Users").findOne({ email: email });
  if (!user) {
    throw new Error("user not found");
  }
  const canvas = await this.findOne({
    _id: id,
    owner: user._id,
  });
  if (!canvas) {
    throw new Error("Canvas not found");
  }
  const shareUser = await mongoose.model("Users").findOne({ email: shareEmail });
  if (!shareUser) {
    throw new Error("Share user not found");
  }
  // Check if already shared
  if (canvas.sharedwith.includes(shareUser._id)) {
    throw new Error("Canvas already shared with this user");
  }

  // Add to sharedwith array
  canvas.sharedwith.push(shareUser._id);
  const updatedCanvas = await canvas.save();

  return updatedCanvas;
};

const canvasModel = mongoose.model("Canvas", canvasSchema);

module.exports = canvasModel;
