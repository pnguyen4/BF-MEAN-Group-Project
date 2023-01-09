import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class S3ServiceService {
  private bucket: S3Client;

  constructor(private http: HttpClient) {
    this.bucket = new S3Client({
      credentials: {
        accessKeyId: environment.AWS_ACCESS_KEY_ID,
        secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
      },
      region: environment.AWS_REGION,
    });
  }

  async uploadFile(file: File, uniquename: string) {
    const params = {
      Bucket: 'bfmean2022',
      Key: uniquename,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type
    };

    try {
      const response = await this.bucket.send(new PutObjectCommand(params));
      console.log("SUCCESS", response);
    } catch(error) {
      console.log("FAILURE", error);
    }
  }

}
