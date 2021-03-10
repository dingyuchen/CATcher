import { Injectable } from '@angular/core';
import { GithubService } from './github.service';
import { uuid } from '../../shared/lib/uuid';
import { throwError } from 'rxjs';

const SUPPORTED_VIDEO_FILE_TYPES = ['mp4', 'mov'];
export const SUPPORTED_FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png', 'docx', 'gz', 'log', 'pdf', 'pptx', 'txt', 'xlsx', 'zip']
                                    .concat(SUPPORTED_VIDEO_FILE_TYPES);
export const FILE_TYPE_SUPPORT_ERROR = 'We don\'t support that file type.' +
  ' Try again with ' + SUPPORTED_FILE_TYPES.join(', ') + '.';

@Injectable({
  providedIn: 'root',
})
export class UploadService {

  constructor(private githubService: GithubService) {}

  uploadFile(base64File: string | ArrayBuffer, userFilename: string) {
    let base64String: string;
    if (base64File instanceof ArrayBuffer) {
      base64String = String.fromCharCode.apply(null, new Uint16Array(base64File));
    } else {
      base64String = base64File;
    }
    const fileType = this.getFileExtension(userFilename);

    if (SUPPORTED_FILE_TYPES.includes(fileType.toLowerCase())) {
      base64String = base64String.split(',')[1];
      const onlineFilename = uuid();
      return this.githubService.uploadFile(`${onlineFilename}.${fileType}`, base64String);
    } else {
      return throwError(FILE_TYPE_SUPPORT_ERROR);
    }
  }

  getFileExtension(fileName: string): string {
    return fileName.split('.').pop();
  }

  isVideoFile(fileName): boolean {
    const fileType = this.getFileExtension(fileName);
    return SUPPORTED_VIDEO_FILE_TYPES.includes(fileType.toLowerCase());
  }

  isSupportedFileType(fileName): boolean {
    const fileType = this.getFileExtension(fileName);
    return SUPPORTED_FILE_TYPES.includes(fileType.toLowerCase());
  }
}
