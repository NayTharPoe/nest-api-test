import { ConfigService } from '@nestjs/config/dist';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongooseConfigFactory = (
  configService: ConfigService,
): MongooseModuleOptions => ({
  uri: `mongodb+srv://${configService.get('DB_NAME')}:${configService.get(
    'DB_PASS',
  )}@cluster0.79dkm2w.mongodb.net/Item?retryWrites=true&w=majority`,
});
