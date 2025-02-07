const AppError = require('./appError');

const makeCrud = (objectName, Model) => ({
  create: async (req, res, next) => {
    const newInstance = await Model.create(req.body);

    res.status(200).json({
      status: 'success',
      data: { [objectName]: newInstance },
    });
  },
  read: async (req, res, next) => {
    const results = await Model.find();

    res.status(200).json({
      status: 'success',
      results: results.length,
      data: {
        [objectName+'s']: results
      }
    })
  },
  readOne: async (req, res, next) => {
    const id = req.params.id;
    const result = await Model.findById(id);

    if (!result) {
      return next(new AppError(404, `${objectName} with id ${id} not found`));
    }

    res.status(200).json({
      status: 'success',
      data: {
        [objectName]: result
      }
    });
  },
  update: async (req, res, next) => {
    const id = req.params.id;
    const updatedInstance = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedInstance) {
      return next(new AppError(404, `${objectName} with id ${id} not found`));
    };

    res.status(200).json({
      status: 'success',
      data: {
        [objectName]: updatedInstance
      }
    });
  },
  delete: async (req, res, next) => {
    const id = req.params.id;
    const result = await Model.findByIdAndDelete(id);
  
    if (!result) {
      return next(new AppError(404, `${objectName} with id ${id} not found`));
    };
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  }
});

module.exports = makeCrud;
