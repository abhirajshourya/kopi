import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export const TimeEntryModel = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4(),
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}