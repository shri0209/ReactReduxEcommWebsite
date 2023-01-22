export const ADD = (item) =>{
    return{
        type:"ADD_CART",
        payload:item
    }
}


// REMOVE ITEMS FROM CART
export const DLT = (id) =>{
    return{
        type:"RMV_CART",
        payload:id
    }
}

//Reduce Quantity of item in cart
export const REMOVE = (item) =>{
    return{
        type:"RMV_ONE",
        payload:item
    }
}