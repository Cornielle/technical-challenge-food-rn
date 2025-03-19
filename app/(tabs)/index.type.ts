export interface FoodsProps {
    id: string
    name: string
    category: string
    dishes?:[]
}

export interface FoodDishesProps {
    title: string;
    data: FoodsProps[];
  };