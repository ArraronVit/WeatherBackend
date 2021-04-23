const asyncHandler = require(`express-async-handler`);
const CitySchema = require('../../models/citySchema');
const router = require("../network/router");

router.get("/favourites", asyncHandler(async (req, res) => {
    const citySchemas = await CitySchema.find({});
    res.send(citySchemas);
}));

router.post("/favourites", asyncHandler(async (req, res) => {
    if (await isExist(req.query.city)) {
        res.statusCode = 400;
        res.send({status: 'ERROR', citySchema: 'already exists'});
    } else {
        const citySchema = new CitySchema({
            city: req.query.city
        });
        await citySchema.save(function (err) {
            if (!err) {
                return res.send({status: 'OK', citySchema: citySchema});
            } else {
                res.statusCode = 500;
            }
        });
    }
}));

router.delete("/favourites", asyncHandler(async (req, res) => {
    const cityFilter = req.query.city;
    await CitySchema.findOneAndDelete({city: cityFilter}).exec();
    return res.send({status: 'OK', citySchema: 'deleted'});
}));

async function isExist(city) {
    return await CitySchema.findOne({city: city}).exec() != null;
}