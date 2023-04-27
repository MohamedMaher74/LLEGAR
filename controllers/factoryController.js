const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Item = require('../models/itemModel');
const Review = require('../models/reviewModel');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc;
    doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    if (Model == Item) {
      if (req.user.id != doc.Owner._id) {
        return next(
          new AppError(
            'You do not have permission to perform this action, Only for the owner of this item',
            401
          )
        );
      }
    }

    if (Model == Review) {
      if (req.user.id != doc.user.id) {
        return next(
          new AppError(
            'You do not have permission to perform this action, Only for the owner of this item',
            401
          )
        );
      }
    }

    await Model.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc;
    doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    if (Model == Item) {
      if (req.user.id != doc.Owner._id) {
        return next(
          new AppError(
            'You do not have permission to perform this action, Only for the owner of this item',
            401
          )
        );
      }
    }

    if (Model == Review) {
      if (req.user.id != doc.user.id) {
        return next(
          new AppError(
            'You do not have permission to perform this action, Only for the owner of this item',
            401
          )
        );
      }
    }

    doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    
    if(Model == Item) {
      doc.Owner = req.user.id;
    }
    
    await doc.save({ validateBeforeSave: false });

    res.status(201).json({
      status: 'success',
      data: {
        item: doc,
      },
    });
  });

exports.getOne = (Model, options) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    // if (popOptions) query = query.populate(popOptions);
    if (options && options.populate) {
      const populates = Array.isArray(options.populate)
        ? options.populate
        : [options.populate];
      populates.forEach((populate) => {
        query.populate(populate);
      });
    }
    const doc = await query;

    if (!doc) {
      return next(new AppError('No item found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.itemId) filter = { item: req.params.itemId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
