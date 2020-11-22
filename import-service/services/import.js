import csv from 'csv-parser';

import { BaseService } from '../../lib/service';
import { AwsS3 } from '../../lib/aws';

const { S3_IMPORT_BUCKET } = process.env;

class ImportService extends BaseService {
  constructor() {
    super();
  }

  async getImportProductSignedUrl(filename) {
    const params = {
      Bucket: S3_IMPORT_BUCKET,
      Key: `uploaded/${filename.endsWith('.csv') ? filename : `${filename}.csv`}`,
      Expires: 60,
      ContentType: 'text/csv',
    };

    return AwsS3.getSignedUrl('putObject', params);
  }

  async parseProductCsv(records) {
    for (const record of records) {
      const uploadedObjectParams = {
        Bucket: S3_IMPORT_BUCKET,
        Key: record.s3.object.key,
      };

      const readable = AwsS3.getObject(uploadedObjectParams).createReadStream();

      for await (const parsedChunk of readable.pipe(csv())) {
        console.log('PARSED PRODUCT CSV: ', parsedChunk);
      }

      await AwsS3.copyObject({
        Bucket: S3_IMPORT_BUCKET,
        CopySource: `${S3_IMPORT_BUCKET}/${uploadedObjectParams.Key}`,
        Key: uploadedObjectParams.Key.replace('uploaded', 'parsed'),
      });

      await AwsS3.deleteObject({
        Bucket: S3_IMPORT_BUCKET,
        Key: uploadedObjectParams.Key,
      });
    }
  }
}

export default new ImportService();
