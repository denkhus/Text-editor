export interface Annotation {
   coords: {
    top: number;
    left: number;
  };
  text?: string;
  image?: string;
}

export interface Page {
  number: number;
  imageUrl: string;
}

export interface Document {
  name: string;
  pages: Page[]
  annotations?: Annotation[];
}
