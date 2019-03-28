const repoSchema = mongoose.Schema({
  id: Number,
  username: String,
  body: String,
  score: Number,
  pros: {
    reliability: Boolean,
    durability: Boolean,
    looks: Boolean,
    performance: Boolean
  },
  cons: {
    reliability: Boolean,
    durability: Boolean,
    looks: Boolean,
    performance: Boolean
  },
  likes: Number,
  dislikes: Number,
  productId: Number
});