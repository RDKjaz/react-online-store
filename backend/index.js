require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
    try {
        //Установка подулючения к БД
        await sequelize.authenticate()
        //Сверка состояния БД со схемой БД
        await sequelize.sync()
        //Сервер прослушивает порт
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

start()