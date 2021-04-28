const asyncHandler = require(`express-async-handler`);
const router = require("./weather");
const { getFavourites, addFavourite, deleteFavourite } = require("../network/mongoProvider")

router.get("/favourites", asyncHandler(async (req, res) => {
    res.send(await getFavourites());
}));

router.post("/favourites", asyncHandler(async (req, res) => {
    await addFavourite(req, res);
}));

router.delete("/favourites", asyncHandler(async (req, res) => {
   await deleteFavourite(req, res)
}));
