// export default () => ({
//   app: {
//     port: parseInt(process.env.PORT, 10) || 3000,
//   },
// });

import { DataSource } from 'typeorm';
import databaseConfig from './database.config';

export const AppDataSource = new DataSource(databaseConfig);
