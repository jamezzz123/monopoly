export type path = {
  start: number;
  end: number;
};
export interface Player {
  id: string;
  image: string;
  link: string;
  location: number;
  name: string;
  bankBalance: number;
  properties: number[];
  path: path;
  dominateColor: string;
}
