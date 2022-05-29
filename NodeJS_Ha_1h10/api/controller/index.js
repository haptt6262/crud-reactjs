const ItemModel = require("../model/index")

exports.getItem = async (req, res) => {
    try {
        const listItem = await ItemModel.find()
        res.json({ listItem: listItem, message: 'Success' })
    } catch (error) {
        res.send({ error: error.message })
    }
}

exports.addItem = async (req, res) => {
    try {
        const name = req.body
        await ItemModel.create(name)
        res.json({ message: 'Success' })
    } catch (error) {
        res.send({ error: error.message })
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id
        await ItemModel.findByIdAndDelete(id)
        res.json({ message: 'Success' })
    } catch (error) {
        res.send({ error: error.message })
    }
}

exports.updateItem = async (req, res) => {
    try {
        const id = req.params.id
        const name = req.body.name
        await ItemModel.findByIdAndUpdate(id, { name })
        res.json({ message: 'Success' })
    } catch (error) {
        res.send({ error: error.message })
    }
}

exports.paginationItem = async (req, res) => {
    try {
        const activePage = parseInt(req.query.activePage)
        const limit = parseInt(req.query.limit)
        const totalItems = await ItemModel.countDocuments()
        const totalPage = Math.ceil(totalItems / limit)
        const skip = (activePage - 1) * limit
        const listItem = await ItemModel.find().skip(skip).limit(limit)
        res.json({ listItem: listItem, totalPage: totalPage, message: 'Success' })
    } catch (error) {
        res.send({ error: error.message })
    }
}

exports.searchPaginationItem = async (req, res) => {
    try {
        const activePage = parseInt(req.query.activePage)
        const limit = parseInt(req.query.limit)
        const textSearch = req.query.textSearch
        const totalItems = await ItemModel.countDocuments({ name: { $regex: textSearch, $options: "i" } })
        const totalPage = Math.ceil(totalItems / limit)
        const skip = (activePage - 1) * limit
        const listItem = await ItemModel.find({ name: { $regex: textSearch, $options: "i" } }).skip(skip).limit(limit)
        res.json({ listItem: listItem, totalPage: totalPage, message: 'Success' })
    } catch (error) {
        res.send({ error: error.message })
    }
}