import { message } from 'antd';

type ImagePreviewParams = {
  file: FileList;
};

export const imagePreview = ({ file }: ImagePreviewParams) => {
  if (!file) {
    message.error(`There is no picture for pre-viewing`);
  }
  const image = URL.createObjectURL(file[0]);
  
  return image;
};
