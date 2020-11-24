"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class purchases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.budget_categories.hasMany(purchases, {
        foreignKey: "id",
      });
      purchases.belongsTo(models.budget_categories, {
        foreignKey: "category_id",
      });
    }
  }
  purchases.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "budget_categories",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      purchase_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      purchase_notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "purchases",
    }
  );
  return purchases;
};
