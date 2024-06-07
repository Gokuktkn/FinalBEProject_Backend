import { itemModel } from "../models/item.model.js";
import cloudinaryService from "../service/cloudinary.service.js";
import { convertTagsToHtml } from "../utils/regex.js";
import fs from 'fs';

const filePath = fs.realpathSync('./');

class itemHandler {
    async getAllItems(req, res, next) {
        try {
            const allItems = await itemModel.find({ deleted: false })
            if (allItems.length === 0) {
                res.status(404).json({
                    message: "No item in database available",
                    status: 404,
                    data: null
                })
            }
            res.status(200).json({
                message: "Successfully",
                status: 200,
                data: {
                    items: allItems
                }
            })
        }
        catch (e) {
            next(e)
        }
    }
    async getItemType(req, res, next) {
        try {
            const type = req.params.type;
            const items = await itemModel.find({ food_type: type, deleted: false })
            if (items.length === 0) {
                res.status(404).json({
                    message: "No item in database available",
                    status: 404,
                    data: null
                })
            }
            res.status(200).json({
                message: "Successfully",
                status: 200,
                data: {
                    items,
                }
            })
        }
        catch (e) {
            next(e)
        }
    }
    async getItem(req, res, next) {
        try {
            const name = req.query.name;
            const items = await itemModel.find({
                itemName: {
                    $regex: name,
                    $options: 'i'
                }
            })
            if (items.length === 0) {
                res.status(404).json({
                    message: "No item in database available",
                    status: 404,
                    data: null
                })
            }
            res.status(200).json({
                message: "Successfully",
                status: 200,
                data: {
                    items,
                }
            })
        }
        catch (e) {
            next(e)
        }
    }
    async createItem(req, res, next) {
        const { itemName, price, discount, variants, description, food_type } = req.body;
        const files = req.files;

        try {
            const data = await cloudinaryService.postMultipleImages(files.map(e => filePath + '\\' + e.path), 'food_img')
            await files.map(e => fs.unlinkSync(filePath + '\\' + e.path))

            const ID = await itemModel.countDocuments();

            const newDescription = convertTagsToHtml(description, data.map(e => e.url))

            const newItem = await itemModel.create({
                itemName,
                price,
                discount,
                variants: JSON.parse(variants),
                description : newDescription,
                images: data.map(e => e.url),
                food_type,
                ID: ID + 1,
                deleted: false
            })

            res.json({
                message: 'Successfully created new item',
                status: 201,
                data: {
                    item: {
                        itemName: newItem.itemName,
                        price: newItem.price,
                        discount: newItem.discount,
                        variants: newItem.variants,
                        description: newItem.description,
                        images: newItem.images,
                        food_type: newItem.food_type
                    }
                }
            })
        }
        catch (e) {
            next(e)
        }
    }
}

const itemController = new itemHandler();
export default itemController