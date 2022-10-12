module.exports = (sequelize, DataTypes) =>
  sequelize.define("reply", {
    name: {
      type: DataTypes.STRING,
      allowNull : false
      
    },

    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }

  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });