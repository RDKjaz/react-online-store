const sequelize = require('../db')
const { DataTypes } = require('sequelize')

/** Пользователь */
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: false },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

/** Корзина */
const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

/** Товар в корзине */
const BasketDevice = sequelize.define('basket_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

/** Товар */
const Device = sequelize.define('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
})

/** Тип */
const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

/** Брэнд */
const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

/** Рейтинг */
const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false },
})

/** Инфорамция о товаре */
const DeviceInfo = sequelize.define('device_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    description: { type: DataTypes.INTEGER, unique: true, allowNull: false },
})

/** Промежуточная таблица пря связи многие ко многим для типа и бренда  */
const TypeBrand = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

/** Описание связей моделей */
User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo)
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    Type,
    DeviceInfo
}



