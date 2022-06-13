export interface board {
  List: board_property[];
}

type playerOwner = {
  id: string;
  name: string;
  dominateColor: string;
};

export interface board_property {
  id: number;
  label: string;
  price: number;
  icon: string;
  color: string;
  order: string;
  pos: "top" | "bottom";
  board_position: number;

  property: boolean;
  utility: boolean;
  property_color: string;
  rent: {
    rent: number;
    rentWC: number;
    rentH1: number;
    rentH2: number;
    rentH3: number;
    rentH4: number;
  };
  house_cost: number;
  house_count: number;
  hotel_cost: number;
  hotel_count: number;
  property_group: number[];
  owner: null | playerOwner;
}
