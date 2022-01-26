const Community = require("../models/community");
const Tags = require("../models/tags");
const Categories = require("../models/categories");

const router = require("express").Router();

const {userRegisterValidator, userById} = require("../middlewares/user");
const {verifyToken} = require("../middlewares/auth");

// CREATE TAGS

router.post("/tags");

// GET TAGS

router.get("/tags", async (req, res) => {
  try {
    let tags;

    tags = await Tags.find();

    res.status(200).json(tags);

} catch (err) {
    res.status(500).json(err);
    return res.status(403).json({
        error: "Prosím přihlašte se",
    })
  }
});

// GET CATEGORIES

router.get("/categories", async (req, res) => {
  try {
    let categories;

    categories = await Categories.find();

    res.status(200).json(categories);

} catch (err) {
    res.status(500).json(err);
    return res.status(403).json({
        error: "Prosím přihlašte se",
    })
  }
});

// UPDATE TAGS

router.put("/tags/:id", async (req, res) => {
  try {
    const updatedProduct = await Tags.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE CATEGORIES

router.put("/categories/:id", async (req, res) => {
  try {
    const updatedProduct = await Categories.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE

router.post("/", async (req, res) => {
  const newProduct = new Community(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Community.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Community.findByIdAndDelete(req.params.id);
    res.status(200).json("Community has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CoMMUNITY
router.get("/find/:id", async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    res.status(200).json(community);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL COMMUNITIES
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let communities;

    if (qNew) {
      communities = await Community.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      communities = await Community.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      communities = await Community.find();
    }

    res.status(200).json(communities);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;