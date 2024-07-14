// models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required:true,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
  }]
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
