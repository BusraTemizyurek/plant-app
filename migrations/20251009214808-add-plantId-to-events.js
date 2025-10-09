"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      // 1) Add the column as NULLable so existing rows don't break
      await queryInterface.addColumn(
        "events",
        "plantId",
        { type: Sequelize.INTEGER, allowNull: true },
        { transaction: t }
      );

      // 2) Backfill existing rows with plantId = 2
      await queryInterface.sequelize.query(
        'UPDATE "events" SET "plantId" = 2 WHERE "plantId" IS NULL;',
        { transaction: t }
      );

      // 3) Add FK constraint: events.plantId -> plants.id
      await queryInterface.addConstraint("events", {
        fields: ["plantId"],
        type: "foreign key",
        name: "events_plantId_fkey",
        references: { table: "plants", field: "id" },
        onUpdate: "cascade",
        onDelete: "restrict",
        transaction: t,
      });

      // 4) Enforce NOT NULL now that data is valid
      await queryInterface.changeColumn(
        "events",
        "plantId",
        { type: Sequelize.INTEGER, allowNull: false },
        { transaction: t }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      // Loosen to nullable so we can drop FK safely
      await queryInterface.changeColumn(
        "events",
        "plantId",
        { type: Sequelize.INTEGER, allowNull: true },
        { transaction: t }
      );

      // Drop FK (ignore if it's already gone)
      try {
        await queryInterface.removeConstraint("events", "events_plantId_fkey", {
          transaction: t,
        });
      } catch (_) {}

      // Finally drop the column
      await queryInterface.removeColumn("events", "plantId", {
        transaction: t,
      });
    });
  },
};
