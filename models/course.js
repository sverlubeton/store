const {Schema, model} = require('mongoose')

const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  display: String,
  core: String,
  RAM: String,
  OC: String,
  video: String,
  color: String,
  keyboard: String,
  harddrive: String,
  ports: String,
  battery: String,
  weight: String,
  price: {
    type: Number,
    required: true
  },
  img: Array,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

courseSchema.method('toClient', function() {
  const course = this.toObject()
  course.id = course._id
  delete course._id
  return course
})

module.exports = model('Course', courseSchema)