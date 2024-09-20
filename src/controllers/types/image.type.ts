export interface Image {
    _id?: string;
    filename: string;
    contentType: string;
    size: number;
    uploadDate: Date;
    remoteUrl: string;
  }

  export default Image