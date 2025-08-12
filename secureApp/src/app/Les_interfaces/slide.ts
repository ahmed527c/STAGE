export interface Slide {
      type: 'image' | 'video';
      title: string;
      src: string;
      description?: string;
      btnText: string;
}
