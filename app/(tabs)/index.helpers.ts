import { FoodDishesProps, FoodsProps } from "./index.type"

export const sortFoods = (filteredFoods: FoodDishesProps[])=> { 
    return filteredFoods.map((dish) => ({
        ...dish,
        data: dish.data.sort((a:{name:string}, b:{name:string}) => a.name.localeCompare(b.name)),
    }))
}


export const foodsFilter = (foodsFormatted:FoodDishesProps[], searchQuery: string) => { 
    return foodsFormatted.map((food: FoodDishesProps) => ({
        ...food,
        data: food.data.filter((dish: FoodsProps) =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
  }))
}