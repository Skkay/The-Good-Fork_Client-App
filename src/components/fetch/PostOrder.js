import axios from "axios";

import getFetchingOption from './options';

const postOrder = (token, cartData, extraInfo, eatIn, datePickup, discountId, reservationId) => {
  const options = getFetchingOption(token);
  const menuIds = []; 
  const foodIds = []; 
  const drinkIds = []; 
  
  if (cartData[0].data) {
    cartData[0].data.forEach(menu => {
      menuIds.push(menu.id);
    });
  }
  if (cartData[1].data) {
    cartData[1].data.forEach(food => {
      foodIds.push(food.id);
    });
  }
  if (cartData[2].data) {
    cartData[2].data.forEach(drink => {
      drinkIds.push(drink.id);
    });
  }

  return axios({
    method: "POST",
    url: "http://192.168.1.18/3proj_api/public/api/orders",
    withCredentials: true,
    data: {
      eatIn: eatIn,
      datePickup: datePickup,
      menuIds: menuIds,
      foodIds: foodIds,
      drinkIds: drinkIds,
      extraInformations: extraInfo,
      discountId: discountId,
      reservationId: reservationId,
      orderedByStaff: false
    },
    headers: {
      'accept': options.headers.accept,
      'Authorization': options.headers.Authorization
    }
  });
}

export default postOrder;
