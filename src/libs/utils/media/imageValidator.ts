import { GetProp, UploadProps } from 'antd';
import { FileTypesList, StartsWithFileType } from '@/types/file-types.type';
import { ValidateFileSizeProps, validateFileSize } from './validateFileSIze';
import { validateFileType } from './validateFileType';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type Props = Pick<ValidateFileSizeProps, 'minMb' | 'maxMb'> & {
  file: FileType;
  imageValidTypes: StartsWithFileType<FileTypesList, 'image'>[];
};

export const imageValidator = ({
  file,
  imageValidTypes,
  maxMb = 2,
  minMb = 0,
}: Props) => {
  const isValidFileType = validateFileType({
    fileType: file.type,
    validTypes: imageValidTypes,
  });

  const isValidFileSize = validateFileSize({
    fileSize: file.size,
    maxMb,
    minMb,
  });

  return isValidFileType && isValidFileSize;
};
