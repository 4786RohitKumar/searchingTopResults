const Data = require("../Model/Results");
// console.log(Data);

const AddItems = async (req, res, next) => {
  try {
    const data = new Data(req.body);
    const saveData = await data.save();
    res.status(201).json(saveData);
  } catch (err) {
    next(err);
  }
};

const getResults = async (req, res, next) => {
  try {
    const getData = await Data.find();
    const resultData = getData.splice(0, 10).map((item) => {
      return {
        name: item.name,
        base_unit: item.base_unit,
        last: item.last,
        buy: item.buy,
        sell: item.sell,
        volume: item.volume,
      };
    });

    res.status(200).send({
      message: "Top 10 results fetched successfully",
      data: resultData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  AddItems: AddItems,
  getResults: getResults,
};
