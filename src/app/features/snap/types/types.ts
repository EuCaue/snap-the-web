export type ImageFormat = {format: 'png' | 'jpg' | 'webp'};

export type SnapData = {
  snapUrl: string;
  showSnappedImage: boolean;
};

export type SnapOptions = {
  viewport: string;
  captureFullPage: boolean;
  imageFormat: ImageFormat;
};
